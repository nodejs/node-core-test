'use strict'

// https://github.com/nodejs/node/blob/094b2ae9ba2db28254bb09207a58bd9730ff097d/test/parallel/test-runner-exit-code.js

const assert = require('assert')
const { spawnSync } = require('child_process')

if (process.argv[2] === 'child') {
  const test = require('../..')

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
