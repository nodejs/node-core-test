// https://github.com/cjihrig/node/blob/527eb5caa5feae3b748d9c5b74b256edbb40a775/test/message/test_runner_unresolved_promise.js
// Flags: --no-warnings

'use strict'

const test = require('../..')

test('pass')
test('never resolving promise', () => new Promise(() => {}))
test('fail')
