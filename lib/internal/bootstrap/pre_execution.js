'use strict'

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2), {
  boolean: ['test', 'test-only']
})

function prepareMainThreadExecution () {
  process.argv.splice(1, Infinity, ...argv._)
}

module.exports = {
  prepareMainThreadExecution,
  argv
}
