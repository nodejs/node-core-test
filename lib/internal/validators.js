// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/lib/internal/validators.js
function isUint32 (value) {
  return value === (value >>> 0)
}

module.exports = {
  isUint32
}
