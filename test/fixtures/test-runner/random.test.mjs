// https://github.com/nodejs/node/blob/HEAD/test/fixtures/test-runner/random.test.mjs
import test from '#node:test'

test('this should fail', () => {
  throw new Error('this is a failing test')
})
