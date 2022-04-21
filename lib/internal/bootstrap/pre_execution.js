'use strict'

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

function prepareMainThreadExecution () {
  process.argv.splice(1, Infinity, ...argv._)
}

module.exports = {
  prepareMainThreadExecution,
  argv
}
