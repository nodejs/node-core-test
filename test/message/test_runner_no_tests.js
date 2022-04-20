// https://github.com/nodejs/node/blob/HEAD/test/message/test_runner_no_tests.js
// Flags: --no-warnings
'use strict'
require('../common')
const test = require('#node:test')

// No TAP output should be generated.
console.log(test.name)
