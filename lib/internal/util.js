// https://github.com/nodejs/node/blob/a9b1fd3987fae5ad5340859a6088b86179b576c5/lib/internal/util.js
'use strict'

const {
  ObjectCreate,
  ObjectFreeze
} = require('#internal/per_context/primordials')
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

const kEmptyObject = ObjectFreeze(ObjectCreate(null))

module.exports = {
  createDeferredPromise,
  isError,
  kEmptyObject
}
