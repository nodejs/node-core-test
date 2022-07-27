// https://github.com/nodejs/node/blob/26e27424ad91c60a44d3d4c58b62a39b555ba75d/test/fixtures/test-runner/never_ending_async.js
const test = require('#node:test')
const { setTimeout } = require('#timers/promises')

// We are using a very large timeout value to ensure that the parent process
// will have time to send a SIGINT signal to cancel the test.
test('never ending test', () => setTimeout(100_000_000))
