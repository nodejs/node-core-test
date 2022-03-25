# node-core-test

[![CI](https://github.com/juliangruber/node-core-test/actions/workflows/ci.yml/badge.svg)](https://github.com/juliangruber/node-core-test/actions/workflows/ci.yml)

This is a user-land port of [`node:test`](https://github.com/nodejs/node/blob/b476b1b91ef8715f096f815db5a0c8722b613678/doc/api/test.md),
the experimental test runner introduced in Node.js 18. This module makes it
available in Node.js 14 and later.

Minimal dependencies, the full test suite is still be ported. Use at your own risk.

If we discover bugs in this implementation, I'm going to report them back to
node core.

## Usage

```js
const assert = require('assert')
const test = require('node-core-test')

test('synchronous passing test', t => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1)
})

test('synchronous failing test', t => {
  // This test fails because it throws an exception.
  assert.strictEqual(1, 2)
})

test('asynchronous passing test', async t => {
  // This test passes because the Promise returned by the async
  // function is not rejected.
  assert.strictEqual(1, 1)
})

test('asynchronous failing test', async t => {
  // This test fails because the Promise returned by the async
  // function is rejected.
  assert.strictEqual(1, 2)
})

test('failing test using Promises', t => {
  // Promises can be used directly as well.
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject(new Error('this will cause the test to fail'))
    })
  })
})

test('callback passing test', (t, done) => {
  // done() is the callback function. When the setImmediate() runs, it invokes
  // done() with no arguments.
  setImmediate(done)
})

test('callback failing test', (t, done) => {
  // When the setImmediate() runs, done() is invoked with an Error object and
  // the test fails.
  setImmediate(() => {
    done(new Error('callback failure'))
  })
})
```

```bash
$ node example.js
TAP version 13
ok 1 - synchronous passing test
  ---
  duration_ms: 0.001514889
  ...
not ok 2 - synchronous failing test
  ---
  duration_ms: 0.002878527
  failureType: 'testCodeFailure'
  error: 'Expected values to be strictly equal:\n\n1 !== 2\n'
  stack: |-
    Test.run (/Users/julian/dev/juliangruber/node-core-test/lib/test.js:347:17)
    Test.processPendingSubtests (/Users/julian/dev/juliangruber/node-core-test/lib/test.js:153:27)
    Test.postRun (/Users/julian/dev/juliangruber/node-core-test/lib/test.js:390:19)
    Test.run (/Users/julian/dev/juliangruber/node-core-test/lib/test.js:352:10)
    processTicksAndRejections (node:internal/process/task_queues:96:5)

...
(run it yourself to see the full output)
...

1..7
# tests 7
# pass 3
# fail 4
# skipped 0
# todo 0
$ echo $?
```

## API

https://github.com/nodejs/node/blob/b476b1b91ef8715f096f815db5a0c8722b613678/doc/api/test.md

## Kudos

Thank you [@aduh95](https://github.com/aduh95) for sharing the new `node:test`
module in the [@transloadit](https://github.com/transloadit) Slack.

## License

MIT
