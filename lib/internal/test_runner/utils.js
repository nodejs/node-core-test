// https://github.com/nodejs/node/blob/e2225ba8e1c00995c0f8bd56e607ea7c5b463ab9/lib/internal/test_runner/utils.js
'use strict'
const { RegExpPrototypeExec } = require('#internal/per_context/primordials')
const { basename } = require('path')
const { createDeferredPromise } = require('#internal/util')
const {
  codes: {
    ERR_TEST_FAILURE
  }
} = require('#internal/errors')

const kMultipleCallbackInvocations = 'multipleCallbackInvocations'
const kSupportedFileExtensions = /\.[cm]?js$/
const kTestFilePattern = /((^test(-.+)?)|(.+[.\-_]test))\.[cm]?js$/

function doesPathMatchFilter (p) {
  return RegExpPrototypeExec(kTestFilePattern, basename(p)) !== null
}

function isSupportedFileType (p) {
  return RegExpPrototypeExec(kSupportedFileExtensions, p) !== null
}

function createDeferredCallback () {
  let calledCount = 0
  const { promise, resolve, reject } = createDeferredPromise()
  const cb = (err) => {
    calledCount++

    // If the callback is called a second time, let the user know, but
    // don't let them know more than once.
    if (calledCount > 1) {
      if (calledCount === 2) {
        throw new ERR_TEST_FAILURE(
          'callback invoked multiple times',
          kMultipleCallbackInvocations
        )
      }

      return
    }

    if (err) {
      return reject(err)
    }

    resolve()
  }

  return { promise, cb }
}

module.exports = {
  createDeferredCallback,
  doesPathMatchFilter,
  isSupportedFileType
}
