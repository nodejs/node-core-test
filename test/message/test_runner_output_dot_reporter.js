// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/test/message/test_runner_output_dot_reporter.js
// Flags: --no-warnings
'use strict'
require('../common')
const spawn = require('node:child_process').spawn
spawn(process.execPath,
  ['--no-warnings', '--test-reporter', 'dot', 'test/message/test_runner_output.js'], { stdio: 'inherit' })
