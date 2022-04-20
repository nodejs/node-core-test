// https://github.com/nodejs/node/blob/98e9499b55fbc63b2b3db79507ee1475302f9763/lib/internal/test_runner/utils.js
'use strict'
const { RegExpPrototypeExec } = require('#internal/per_context/primordials')
const { basename } = require('path')
const {
  types: { isNativeError }
} = require('util')
const kSupportedFileExtensions = /\.[cm]?js$/
const kTestFilePattern = /((^test(-.+)?)|(.+[.\-_]test))\.[cm]?js$/

function doesPathMatchFilter (p) {
  return RegExpPrototypeExec(kTestFilePattern, basename(p)) !== null
}

function isSupportedFileType (p) {
  return RegExpPrototypeExec(kSupportedFileExtensions, p) !== null
}

function isError (e) {
  // An error could be an instance of Error while not being a native error
  // or could be from a different realm and not be instance of Error but still
  // be a native error.
  return isNativeError(e) || e instanceof Error
}

module.exports = { isSupportedFileType, doesPathMatchFilter, isError }
