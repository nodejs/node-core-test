// https://github.com/nodejs/node/blob/d83446b4c4694322e12d2b7d22592f2be674e580/test/parallel/test-runner-option-validation.js

'use strict'
require('../common')
const assert = require('assert')
const test = require('node:test');

// eslint-disable-next-line symbol-description
[Symbol(), {}, [], () => {}, 1n, true, '1'].forEach((timeout) => {
  assert.throws(() => test({ timeout }), { code: 'ERR_INVALID_ARG_TYPE' })
});
[-1, -Infinity, NaN, 2 ** 33, Number.MAX_SAFE_INTEGER].forEach((timeout) => {
  assert.throws(() => test({ timeout }), { code: 'ERR_OUT_OF_RANGE' })
});
[null, undefined, Infinity, 0, 1, 1.1].forEach((timeout) => {
  // Valid values should not throw.
  test({ timeout })
})
