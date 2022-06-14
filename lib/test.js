// https://github.com/nodejs/node/blob/e2225ba8e1c00995c0f8bd56e607ea7c5b463ab9/lib/test.js

'use strict'

const { test, describe, it } = require('#internal/test_runner/harness')

module.exports = test
module.exports.test = test
module.exports.describe = describe
module.exports.it = it
