// https://github.com/nodejs/node/blob/dab492f0444b0a6ae8a41dd1d9605e036c363655/test/parallel/test-runner-concurrency.js

'use strict'
require('../common')
const { describe, it } = require('node:test')
const assert = require('assert')

describe('Concurrency option (boolean) = true ', { concurrency: true }, () => {
  let isFirstTestOver = false
  it('should start the first test', () => new Promise((resolve) => {
    setImmediate(() => { isFirstTestOver = true; resolve() })
  }))
  it('should start before the previous test ends', () => {
    // Should work even on single core CPUs
    assert.strictEqual(isFirstTestOver, false)
  })
})

describe(
  'Concurrency option (boolean) = false ',
  { concurrency: false },
  () => {
    let isFirstTestOver = false
    it('should start the first test', () => new Promise((resolve) => {
      setImmediate(() => { isFirstTestOver = true; resolve() })
    }))
    it('should start after the previous test ends', () => {
      assert.strictEqual(isFirstTestOver, true)
    })
  }
)
