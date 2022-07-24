// https://github.com/nodejs/node/blob/d83446b4c4694322e12d2b7d22592f2be674e580/lib/internal/validators.js
function isUint32 (value) {
  return value === (value >>> 0)
}

function validateNumber (value, name, min = undefined, max) {
  if (typeof value !== 'number') { throw new TypeError(`Expected ${name} to be a number, got ${value}`) }

  if ((min != null && value < min) || (max != null && value > max) ||
      ((min != null || max != null) && Number.isNaN(value))) {
    throw new RangeError(`Expected ${name} to be ${
      `${min != null ? `>= ${min}` : ''}${min != null && max != null ? ' && ' : ''}${max != null ? `<= ${max}` : ''}`
    }, got ${value}`)
  }
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
  validateAbortSignal,
  validateNumber
}
