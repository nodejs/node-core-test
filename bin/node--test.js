#!/usr/bin/env node
'use strict'

const Module = require('node:module')
const path = require('node:path')
const minimist = require('minimist')

const { argv } = require('#internal/options')

Object.assign(argv, minimist(process.argv.slice(2), {
  boolean: ['test', 'test-only']
}))
if (!argv.test && !argv['test-only']) {
  // Assume `--test` was meant if no flag was passed.
  // TODO: emit a deprecation warning.
  argv.test = true
}
process.argv.splice(1, Infinity, ...argv._)
if (argv.test) {
  require('#internal/main/test_runner')
} else {
  loadMainModule(argv._[0])
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
