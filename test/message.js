#!/usr/bin/env node
'use strict'

const { createReadStream, promises: fs } = require('node:fs')
const { extname, join, resolve } = require('node:path')
const { promisify } = require('node:util')
const { exec } = require('node:child_process')
const { createInterface } = require('node:readline')

const { bin } = require('../package.json')
const binPath = resolve(__dirname, '..', bin.test)

const MESSAGE_FOLDER = join(__dirname, './message/')
const WAIT_FOR_ELLIPSIS = Symbol('wait for ellispis')

const TEST_RUNNER_FLAGS = ['--test', '--test-only']

function readLines (file) {
  return createInterface({
    input: createReadStream(file),
    crlfDelay: Infinity
  })
}

const stackTraceStartLine = /^\s+stack: \|-$/
const stackTraceLine = /^\s+\*$/
const stackTraceEndLine = /^\s+\.\.\.$/

const nodejs14NotEmittedWarn = /^# Warning:.*\breject/

// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/test/message/testcfg.py#L53
async function IsFailureOutput (self, output) {
  // Convert output lines to regexps that we can match
  const patterns = []
  for await (const line of readLines(self.expected)) {
    // Our implementation outputs different stack traces than the Node.js implementation.
    if (stackTraceLine.test(line) && patterns[patterns.length - 1] === WAIT_FOR_ELLIPSIS) continue

    // Node.js 14 doesn't emit some warnings
    if (process.version.startsWith('v14.') && nodejs14NotEmittedWarn.test(line)) continue

    // Sometimes Node.js won't have any stack trace, but we would
    if (stackTraceEndLine.test(line) && patterns[patterns.length - 1].toString().endsWith("code: 'ERR_TEST_FAILURE'$")) {
      patterns.push(stackTraceStartLine, WAIT_FOR_ELLIPSIS)
    }

    const pattern = line
      .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      .replace(/\\\*/g, '.*')
    patterns.push(`^${pattern}$`)

    if (stackTraceStartLine.test(line)) {
      // Our implementation outputs different stack traces than the Node.js implementation.
      patterns.push(WAIT_FOR_ELLIPSIS)
    }
  }
  // Compare actual output with the expected
  const outlines = (output.stdout + output.stderr).split('\n').filter(
    (line) => line && !line.startsWith('==') && !line.startsWith('**')
  )

  let waitingForEllipsis = false
  for (let i = 0; i < outlines.length; i++) {
    let regex
    if (patterns[i] === WAIT_FOR_ELLIPSIS) {
      waitingForEllipsis = true
    } else if (!(regex = new RegExp(patterns[i])).test(outlines[i]) && !regex.test(outlines[i].trimEnd())) {
      if (waitingForEllipsis) {
        patterns.splice(i, 0, WAIT_FOR_ELLIPSIS)
        continue
      }
      console.log('match failed', { line: i + 1, expected: patterns[i], actual: outlines[i] })
      console.log(Array.from({ length: Math.min(patterns.length, outlines.length) }, (_, i) => ({ line: i + 1, expected: patterns[i], actual: outlines[i] })).slice(Math.max(0, i - 5), i + 5))
      return true
    } else if (waitingForEllipsis && stackTraceEndLine.test(outlines[i])) {
      waitingForEllipsis = false
    }
  }
  return false
}

const main = async () => {
  const dir = await fs.opendir(MESSAGE_FOLDER)
  for await (const dirent of dir) {
    const ext = extname(dirent.name)
    if (ext === '.js' || ext === '.mjs') {
      if (typeof AbortSignal === 'undefined' && dirent.name.startsWith('test_runner_abort')) {
        console.log('no AbortSignal support, skipping', dirent.name)
        continue
      }
      const filePath = join(MESSAGE_FOLDER, dirent.name)
      const expected = filePath.replace(/\.m?js$/, '.out')
      const testFile = await fs.open(filePath)
      const fileContent = await testFile.read({ length: 512 })
      await testFile.close()
      const flagIndex = fileContent.buffer.indexOf('// Flags: ')
      const flags =
        flagIndex === -1
          ? []
          : fileContent.buffer
            .subarray(
              flagIndex + 10,
              fileContent.buffer.indexOf(10, flagIndex)
            )
            .toString().split(' ')

      const nodeFlags = flags.filter(flag => !TEST_RUNNER_FLAGS.includes(flag)).join(' ')
      const testRunnerFlags = flags.filter(flag => TEST_RUNNER_FLAGS.includes(flag)).join(' ')

      const command = testRunnerFlags.length
        ? `${process.execPath} ${nodeFlags} ${binPath} ${testRunnerFlags} ${filePath}`
        : `${process.execPath} ${nodeFlags} ${filePath}`
      console.log(`Running ${command}`)
      let stdout, stderr
      try {
        const res = await promisify(exec)(command)
        stdout = res.stdout.trim()
        stderr = res.stderr.trim()
      } catch (err) {
        if (err?.stdout == null || err.stderr == null) throw err
        stdout = err.stdout.trim()
        stderr = err.stderr.trim()
      }
      if (await IsFailureOutput({ expected }, { stdout, stderr })) {
        throw new Error()
      }
      console.log('pass')
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
