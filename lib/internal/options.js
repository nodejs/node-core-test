// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/lib/internal/options.js

'use strict'

const argv = Object.create(null)

function getOptionValue (optionName) {
  return argv[optionName.slice(2)] // remove leading --
}

module.exports = {
  argv,
  getOptionValue
}
