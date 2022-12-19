#!/usr/bin/env node
'use strict'

const Module = require('node:module')
const path = require('node:path')
const { pathToFileURL } = require('node:url')
const minimist = require('minimist')

const { argv } = require('#internal/options')

const stringArgs = ['test-name-pattern', 'test-reporter', 'test-reporter-destination']

Object.assign(argv, minimist(process.argv.slice(2), {
  boolean: ['test', 'test-only'],
  string: stringArgs,
  default: Object.prototype.hasOwnProperty.call(argv, 'test') ? { test: argv.test } : undefined
}))

stringArgs.forEach((arg) => {
  if (typeof argv[arg] === 'string') {
    argv[arg] = [argv[arg]]
  } else if (!Array.isArray(argv[arg])) {
    argv[arg] = []
  }
})

process.argv.splice(1, Infinity, ...argv._)
if (argv.test) {
  require('#internal/main/test_runner')
} else {
  const entryPointPath = path.resolve(argv._[0])
  try {
    loadMainModule(entryPointPath)
  } catch (err) {
    if (err.code !== 'ERR_REQUIRE_ESM') throw err

    // Override process exit code logic to handle TLA:

    let shouldOverwriteExitCode = true
    const { exit: originalExitFunction } = process
    process.exit = function exit (code) {
      if (code === undefined && shouldOverwriteExitCode) {
        process.exitCode = 0
      }
      Reflect.apply(originalExitFunction, process, arguments)
    }
    Object.defineProperty(process, 'exitCode', {
      get: () => 13,
      set (val) {
        shouldOverwriteExitCode = false
        delete process.exitCode
        process.exitCode = val
      },
      configurable: true,
      enumerable: true
    })

    // Import module

    import(pathToFileURL(entryPointPath)).then(() => {
      if (shouldOverwriteExitCode) process.exitCode = 0
    }, (err) => {
      console.error(err)
      process.exit(1)
    })
  }
}

/**
 * Loads a module as a main module, enabling the `require.main === module` pattern.
 * https://github.com/nodejs/corepack/blob/5ff6e82028e58448ba5ba986854b61ecdc69885b/sources/nodeUtils.ts#L24
 */
function loadMainModule (id) {
  const modulePath = Module._resolveFilename(id, null, true)

  const module = new Module(modulePath, undefined)

  module.filename = modulePath
  module.paths = Module._nodeModulePaths(path.dirname(modulePath))

  Module._cache[modulePath] = module

  process.mainModule = module
  module.id = '.'

  try {
    return module.load(modulePath)
  } catch (error) {
    delete Module._cache[modulePath]
    throw error
  }
}
