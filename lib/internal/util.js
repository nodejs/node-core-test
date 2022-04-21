// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/lib/internal/util.js
'use strict'

const {
  types: { isNativeError }
} = require('util')

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
