// https://github.com/nodejs/node/blob/59527de13d39327eb3dfa8dedc92241eb40066d5/lib/internal/main/test_runner.js
'use strict'
const {
  prepareMainThreadExecution
} = require('#internal/process/pre_execution')
const { run } = require('#internal/test_runner/runner')

prepareMainThreadExecution(false)
// markBootstrapComplete();

const tapStream = run()
tapStream.pipe(process.stdout)
tapStream.once('test:fail', () => {
  process.exitCode = 1
})
