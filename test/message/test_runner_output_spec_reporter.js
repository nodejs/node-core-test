// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/test/message/test_runner_output_spec_reporter.js
// Flags: --no-warnings
'use strict'
require('../common')
const spawn = require('node:child_process').spawn
const child = spawn(process.execPath,
  ['--no-warnings', '--test-reporter', 'spec', 'test/message/test_runner_output.js'],
  { stdio: 'pipe' })
// eslint-disable-next-line no-control-regex
child.stdout.on('data', (d) => process.stdout.write(d.toString().replace(/[^\x00-\x7F]/g, '').replace(/\u001b\[\d+m/g, '')))
child.stderr.pipe(process.stderr)
