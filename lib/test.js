'use strict'
const { ObjectAssign } = require('#internal/per_context/primordials')
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
