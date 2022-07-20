// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/lib/internal/validators.js
function isUint32 (value) {
  return value === (value >>> 0)
}

const validateAbortSignal = (signal, name) => {
  if (signal !== undefined &&
      (signal === null ||
       typeof signal !== 'object' ||
       !('aborted' in signal))) {
    throw new TypeError(`Expected ${name} to be an AbortSignal, got ${signal}`)
  }
}

module.exports = {
  isUint32,
  validateAbortSignal
}
