// Flags: --no-warnings
'use strict'

// https://github.com/nodejs/node/blob/432d1b50e0432daf7e81dea9a8d6dca64ecde6a4/test/message/test_runner_no_refs.js

const test = require('../..')

// When run alone, the test below does not keep the event loop alive.
test('does not keep event loop alive', async t => {
  await t.test('+does not keep event loop alive', async t => {
    return new Promise(resolve => {
      setTimeout(resolve, 1000).unref()
    })
  })
})
