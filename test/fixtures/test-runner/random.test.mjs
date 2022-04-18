// https://github.com/nodejs/node/blob/adaf60240559ffb58636130950262ee3237b7a41/test/fixtures/test-runner/random.test.mjs
import test from '../../../index.js'

test('this should fail', () => {
  throw new Error('this is a failing test')
})
