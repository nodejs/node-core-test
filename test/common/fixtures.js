// https://github.com/nodejs/node/blob/adaf60240559ffb58636130950262ee3237b7a41/test/common/fixtures.js
'use strict'

const path = require('path')

const fixturesDir = path.join(__dirname, '..', 'fixtures')

function fixturesPath (...args) {
  return path.join(fixturesDir, ...args)
}

module.exports = {
  path: fixturesPath
}
