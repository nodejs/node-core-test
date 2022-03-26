// Flags: --no-warnings
'use strict'

// https://github.com/nodejs/node/blob/432d1b50e0432daf7e81dea9a8d6dca64ecde6a4/test/message/test_runner_no_tests.js

const test = require('../..')

// No TAP output should be generated.
console.log(test.name)
