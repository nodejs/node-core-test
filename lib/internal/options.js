// https://github.com/nodejs/node/blob/54819f08e0c469528901d81a9cee546ea518a5c3/lib/internal/options.js

'use strict'

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))

function getOptionValue (optionName) {
  return argv[optionName.slice(2)] // remove leading --
}

module.exports = {
  getOptionValue
}
