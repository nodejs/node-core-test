// https://github.com/nodejs/node/blob/b476b1b91ef8715f096f815db5a0c8722b613678/doc/api/test.md

'use strict'

const assert = require('assert')
const test = require('.')

test('synchronous passing test', t => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1)
})

test('synchronous failing test', t => {
  // This test fails because it throws an exception.
  assert.strictEqual(1, 2)
})

test('asynchronous passing test', async t => {
  // This test passes because the Promise returned by the async
  // function is not rejected.
  assert.strictEqual(1, 1)
})

test('asynchronous failing test', async t => {
  // This test fails because the Promise returned by the async
  // function is rejected.
  assert.strictEqual(1, 2)
})

test('failing test using Promises', t => {
  // Promises can be used directly as well.
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject(new Error('this will cause the test to fail'))
    })
  })
})

test('callback passing test', (t, done) => {
  // done() is the callback function. When the setImmediate() runs, it invokes
  // done() with no arguments.
  setImmediate(done)
})

test('callback failing test', (t, done) => {
  // When the setImmediate() runs, done() is invoked with an Error object and
  // the test fails.
  setImmediate(() => {
    done(new Error('callback failure'))
  })
})
