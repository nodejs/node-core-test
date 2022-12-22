// https://github.com/nodejs/node/blob/12c0571c8fece32d274eaf0ae197c0eb1948fe11/test/common/fixtures.js
'use strict'

const path = require('path')
const { pathToFileURL } = require('url')

const fixturesDir = path.join(__dirname, '..', 'fixtures')

function fixturesPath (...args) {
  return path.join(fixturesDir, ...args)
}
function fixturesFileURL (...args) {
  return pathToFileURL(fixturesPath(...args))
}

module.exports = {
  path: fixturesPath,
  fileURL: fixturesFileURL
}
