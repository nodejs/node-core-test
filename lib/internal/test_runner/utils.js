// https://github.com/nodejs/node/blob/98e9499b55fbc63b2b3db79507ee1475302f9763/lib/internal/test_runner/utils.js
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
