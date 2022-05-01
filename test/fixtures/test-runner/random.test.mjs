// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/test/fixtures/test-runner/random.test.mjs
import test from '#node:test'

test('this should fail', () => {
  throw new Error('this is a failing test')
})
