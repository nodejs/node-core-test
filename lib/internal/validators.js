// https://github.com/nodejs/node/blob/HEAD/lib/internal/validators.js
function isUint32 (value) {
  return value === (value >>> 0)
}

module.exports = {
  isUint32
}
