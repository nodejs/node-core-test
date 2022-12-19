// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/lib/internal/main/test_runner.js
'use strict'
const {
  prepareMainThreadExecution
} = require('#internal/process/pre_execution')
const { isUsingInspector } = require('#internal/util/inspector')
const { run } = require('#internal/test_runner/runner')
const { setupTestReporters } = require('#internal/test_runner/utils')

prepareMainThreadExecution(false)
// markBootstrapComplete();

let concurrency = true
let inspectPort

if (isUsingInspector()) {
  process.emitWarning('Using the inspector with --test forces running at a concurrency of 1. ' +
  'Use the inspectPort option to run with concurrency')
  concurrency = 1
  inspectPort = process.debugPort
}

const testsStream = run({ concurrency, inspectPort })
testsStream.once('test:fail', () => {
  process.exitCode = 1
})
setupTestReporters(testsStream)
