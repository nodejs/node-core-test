// https://github.com/nodejs/node/blob/87170c3f9271da947a7b33d0696ec4cf8aab6eb6/test/message/test_runner_test_name_pattern_with_only.js
// Flags: --no-warnings --test-only --test-name-pattern=enabled
'use strict'
const common = require('../common')
const { test } = require('#node:test')

test('enabled and only', { only: true }, common.mustCall(async (t) => {
  await t.test('enabled', common.mustCall())
  await t.test('disabled', common.mustNotCall())
}))

test('enabled but not only', common.mustNotCall())
test('only does not match pattern', { only: true }, common.mustNotCall())
test('not only and does not match pattern', common.mustNotCall())
