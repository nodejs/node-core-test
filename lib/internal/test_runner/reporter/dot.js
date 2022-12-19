// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/lib/test/reporter/dot.js
'use strict'

module.exports = async function * dot (source) {
  let count = 0
  for await (const { type } of source) {
    if (type === 'test:pass') {
      yield '.'
    }
    if (type === 'test:fail') {
      yield 'X'
    }
    if ((type === 'test:fail' || type === 'test:pass') && ++count % 20 === 0) {
      yield '\n'
    }
  }
  yield '\n'
}
