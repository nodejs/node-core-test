'use strict'

const assert = require('assert')
const test = require('.')

test('synchronous passing test', t => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1)
})

test('asynchronous passing test', async t => {
  // This test passes because the Promise returned by the async
  // function is not rejected.
  assert.strictEqual(1, 1)
})

test('callback passing test', (t, done) => {
  // done() is the callback function. When the setImmediate() runs, it invokes
  // done() with no arguments.
  setImmediate(done)
})
