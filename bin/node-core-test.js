// https://github.com/nodejs/node/blob/adaf60240559ffb58636130950262ee3237b7a41/lib/internal/main/test_runner.js

'use strict'

const {
  ArrayFrom,
  ArrayPrototypePush,
  ArrayPrototypeSlice,
  ArrayPrototypeSort,
  Promise,
  SafeSet
} = require('../lib/primordials')
const { spawn } = require('child_process')
const { readdirSync, statSync } = require('fs')
const {
  codes: { ERR_TEST_FAILURE }
} = require('../lib/errors')
const test = require('../lib/harness')
const { kSubtestsFailed } = require('../lib/test')
const { isSupportedFileType, doesPathMatchFilter } = require('../lib/utils')
const { basename, join, resolve } = require('path')

// TODO(cjihrig): Replace this with recursive readdir once it lands.
function processPath (path, testFiles, options) {
  const stats = statSync(path)

  if (stats.isFile()) {
    if (
      options.userSupplied ||
      (options.underTestDir && isSupportedFileType(path)) ||
      doesPathMatchFilter(path)
    ) {
      testFiles.add(path)
    }
  } else if (stats.isDirectory()) {
    const name = basename(path)

    if (!options.userSupplied && name === 'node_modules') {
      return
    }

    // 'test' directories get special treatment. Recursively add all .js,
    // .cjs, and .mjs files in the 'test' directory.
    const isTestDir = name === 'test'
    const { underTestDir } = options
    const entries = readdirSync(path)

    if (isTestDir) {
      options.underTestDir = true
    }

    options.userSupplied = false

    for (let i = 0; i < entries.length; i++) {
      processPath(join(path, entries[i]), testFiles, options)
    }

    options.underTestDir = underTestDir
  }
}

function createTestFileList () {
  const cwd = process.cwd()
  const hasUserSuppliedPaths = process.argv.length > 1
  const testPaths = hasUserSuppliedPaths
    ? ArrayPrototypeSlice(process.argv, 1)
    : [cwd]
  const testFiles = new SafeSet()

  try {
    for (let i = 0; i < testPaths.length; i++) {
      const absolutePath = resolve(testPaths[i])

      processPath(absolutePath, testFiles, { userSupplied: true })
    }
  } catch (err) {
    if (err?.code === 'ENOENT') {
      console.error(`Could not find '${err.path}'`)
      process.exit(1)
    }

    throw err
  }

  return ArrayPrototypeSort(ArrayFrom(testFiles))
}

function runTestFile (path) {
  return test(path, () => {
    return new Promise((resolve, reject) => {
      const args = [...process.execArgv]
      ArrayPrototypePush(args, path)

      const child = spawn(process.execPath, args)
      // TODO(cjihrig): Implement a TAP parser to read the child's stdout
      // instead of just displaying it all if the child fails.
      let stdout = ''
      let stderr = ''
      let err

      child.on('error', error => {
        err = error
      })

      child.stdout.setEncoding('utf8')
      child.stderr.setEncoding('utf8')

      child.stdout.on('data', chunk => {
        stdout += chunk
      })

      child.stderr.on('data', chunk => {
        stderr += chunk
      })

      child.once('exit', (code, signal) => {
        if (code !== 0 || signal !== null) {
          if (!err) {
            err = new ERR_TEST_FAILURE('test failed', kSubtestsFailed)
            err.exitCode = code
            err.signal = signal
            err.stdout = stdout
            err.stderr = stderr
            // The stack will not be useful since the failures came from tests
            // in a child process.
            err.stack = undefined
          }

          return reject(err)
        }

        resolve()
      })
    })
  })
}

;(async function main () {
  const testFiles = createTestFileList()

  for (let i = 0; i < testFiles.length; i++) {
    runTestFile(testFiles[i])
  }
})()
