// https://github.com/nodejs/node/blob/54819f08e0c469528901d81a9cee546ea518a5c3/lib/internal/options.js

'use strict'

const { argv } = require('#internal/bootstrap/pre_execution')

function getOptionValue (optionName) {
  return argv[optionName.slice(2)] // remove leading --
}

module.exports = {
  getOptionValue
}
