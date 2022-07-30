// https://github.com/nodejs/node/blob/60da0a1b364efdd84870269d23b39faa12fb46d8/test/parallel/test-runner-option-validation.js

'use strict'
require('../common')
const assert = require('assert')
const test = require('#node:test');

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
});

// eslint-disable-next-line symbol-description
[Symbol(), {}, [], () => {}, 1n, '1'].forEach((concurrency) => {
  assert.throws(() => test({ concurrency }), { code: 'ERR_INVALID_ARG_TYPE' })
});
[-1, 0, 1.1, -Infinity, NaN, 2 ** 33, Number.MAX_SAFE_INTEGER].forEach((concurrency) => {
  assert.throws(() => test({ concurrency }), { code: 'ERR_OUT_OF_RANGE' })
});
[null, undefined, 1, 2 ** 31, true, false].forEach((concurrency) => {
  // Valid values should not throw.
  test({ concurrency })
})
