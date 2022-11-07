// https://github.com/nodejs/node/blob/06603c44a5b0e92b1a3591ace467ce9770bf9658/test/fixtures/test-runner/extraneous_set_immediate_async.mjs
import test from '#node:test'

test('extraneous async activity test', () => {
  setImmediate(() => { throw new Error() })
})
