// https://github.com/nodejs/node/blob/26e27424ad91c60a44d3d4c58b62a39b555ba75d/test/fixtures/test-runner/never_ending_sync.js
const test = require('#node:test')

test('never ending test', () => {
  while (true);
})
