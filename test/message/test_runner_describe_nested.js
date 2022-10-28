// https://github.com/nodejs/node/blob/3e57891ee2fde0971e18fc383c25acf8f90def05/test/message/test_runner_describe_nested.js
// Flags: --no-warnings
'use strict'
require('../common')
const { describe, it } = require('#node:test')

describe('nested - no tests', () => {
  describe('nested', () => {
    it('nested', () => {})
  })
})
