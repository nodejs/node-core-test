// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/lib/internal/test_runner/utils.js
'use strict'
const { RegExpPrototypeExec } = require('#internal/per_context/primordials')
const { basename } = require('path')
const kSupportedFileExtensions = /\.[cm]?js$/
const kTestFilePattern = /((^test(-.+)?)|(.+[.\-_]test))\.[cm]?js$/

function doesPathMatchFilter (p) {
  return RegExpPrototypeExec(kTestFilePattern, basename(p)) !== null
}

function isSupportedFileType (p) {
  return RegExpPrototypeExec(kSupportedFileExtensions, p) !== null
}

module.exports = { isSupportedFileType, doesPathMatchFilter }
