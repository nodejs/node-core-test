// https://github.com/nodejs/node/blob/5ec2d7bc5deed26ac640feff279800e39dacc9c0/test/message/test_runner_unresolved_promise.js
// Flags: --no-warnings
'use strict'
require('../common')
const test = require('#node:test')

test('pass')
test('never resolving promise', () => new Promise(() => {}))
test('fail', () => console.log('this should not appear'))
