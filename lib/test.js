// https://github.com/nodejs/node/blob/7c6682957b3c5f86d0616cebc0ad09cc2a1fd50d/lib/test.js
'use strict'
const { ObjectAssign, ObjectDefineProperty } = require('#internal/per_context/primordials')
const { test, describe, it, before, after, beforeEach, afterEach } = require('#internal/test_runner/harness')
const { run } = require('#internal/test_runner/runner')

module.exports = test
ObjectAssign(module.exports, {
  after,
  afterEach,
  before,
  beforeEach,
  describe,
  it,
  run,
  test
})

let lazyMock

ObjectDefineProperty(module.exports, 'mock', {
  __proto__: null,
  configurable: true,
  enumerable: true,
  get () {
    if (lazyMock === undefined) {
      const { MockTracker } = require('#internal/test_runner/mock')

      lazyMock = new MockTracker()
    }

    return lazyMock
  }
})
