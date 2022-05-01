// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/test/parallel/test-runner-exit-code.js

'use strict'

require('../common')
const assert = require('assert')
const { spawnSync } = require('child_process')

if (process.argv[2] === 'child') {
  const test = require('#node:test')

  if (process.argv[3] === 'pass') {
    test('passing test', () => {
      assert.strictEqual(true, true)
    })
  } else {
    assert.strictEqual(process.argv[3], 'fail')
    test('failing test', () => {
      assert.strictEqual(true, false)
    })
  }
} else {
  let child = spawnSync(process.execPath, [__filename, 'child', 'pass'])
  assert.strictEqual(child.status, 0)
  assert.strictEqual(child.signal, null)

  child = spawnSync(process.execPath, [__filename, 'child', 'fail'])
  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
}
