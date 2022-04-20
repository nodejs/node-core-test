// https://github.com/nodejs/node/blob/HEAD/lib/internal/util.js
'use strict'

const {
  types: { isNativeError }
} = require('util')

// https://github.com/nodejs/node/blob/b476b1b91ef8715f096f815db5a0c8722b613678/lib/internal/util.js
function createDeferredPromise () {
  let _resolve
  let _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })

  return { promise, resolve: _resolve, reject: _reject }
}

function isError (e) {
  // An error could be an instance of Error while not being a native error
  // or could be from a different realm and not be instance of Error but still
  // be a native error.
  return isNativeError(e) || e instanceof Error
}

module.exports = {
  createDeferredPromise,
  isError
}
