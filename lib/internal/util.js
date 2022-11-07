// https://github.com/nodejs/node/blob/3759935ee29d8042d917d3ceaa768521c14413ff/lib/internal/util.js
'use strict'

const {
  ObjectCreate,
  ObjectFreeze,
  ReflectApply
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

function once (callback) {
  let called = false
  return function (...args) {
    if (called) return
    called = true
    return ReflectApply(callback, this, args)
  }
}

const kEmptyObject = ObjectFreeze(ObjectCreate(null))

module.exports = {
  createDeferredPromise,
  isError,
  kEmptyObject,
  once
}
