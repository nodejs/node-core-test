// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/test/message/test_runner_no_tests.js
// Flags: --no-warnings
'use strict'
require('../common')
const test = require('#node:test')

// No TAP output should be generated.
console.log(test.name)
