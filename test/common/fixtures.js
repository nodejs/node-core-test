// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/test/common/fixtures.js
'use strict'

const path = require('path')

const fixturesDir = path.join(__dirname, '..', 'fixtures')

function fixturesPath (...args) {
  return path.join(fixturesDir, ...args)
}

module.exports = {
  path: fixturesPath
}
