// https://github.com/nodejs/node/blob/659dc126932f986fc33c7f1c878cb2b57a1e2fac/lib/test.js
'use strict'
const { test, describe, it, before, after, beforeEach, afterEach } = require('#internal/test_runner/harness')

module.exports = test
module.exports.test = test
module.exports.describe = describe
module.exports.it = it
module.exports.before = before
module.exports.after = after
module.exports.beforeEach = beforeEach
module.exports.afterEach = afterEach
