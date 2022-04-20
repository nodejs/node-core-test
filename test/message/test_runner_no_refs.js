// https://github.com/nodejs/node/blob/HEAD/test/message/test_runner_no_refs.js
// Flags: --no-warnings
'use strict'
require('../common')
const test = require('#node:test')

// When run alone, the test below does not keep the event loop alive.
test('does not keep event loop alive', async (t) => {
  await t.test('+does not keep event loop alive', async (t) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000).unref()
    })
  })
})
