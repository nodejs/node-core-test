// https://github.com/nodejs/node/blob/06603c44a5b0e92b1a3591ace467ce9770bf9658/test/parallel/test-runner-extraneous-async-activity.js
'use strict'
require('../common')
const fixtures = require('../common/fixtures')
const assert = require('assert')
const { spawnSync } = require('child_process')

{
  const child = spawnSync(process.execPath, [
    '--test',
    fixtures.path('test-runner', 'extraneous_set_immediate_async.mjs')
  ])
  const stdout = child.stdout.toString()
  assert.match(stdout, /^# pass 0$/m)
  assert.match(stdout, /^# fail 1$/m)
  assert.match(stdout, /^# cancelled 0$/m)
  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
}

{
  const child = spawnSync(process.execPath, [
    '--test',
    fixtures.path('test-runner', 'extraneous_set_timeout_async.mjs')
  ])
  const stdout = child.stdout.toString()
  assert.match(stdout, /^# pass 0$/m)
  assert.match(stdout, /^# fail 1$/m)
  assert.match(stdout, /^# cancelled 0$/m)
  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
}
