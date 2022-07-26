// https://github.com/nodejs/node/blob/60da0a1b364efdd84870269d23b39faa12fb46d8/lib/internal/validators.js
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

const validateUint32 = (value, name, positive) => {
  if (typeof value !== 'number') {
    throw new TypeError(`Expected ${name} to be a number, got ${value}`)
  }
  if (!Number.isInteger(value)) {
    throw new RangeError(`Expected ${name} to be an integer, got ${value}`)
  }
  const min = positive ? 1 : 0
  // 2 ** 32 === 4294967296
  const max = 4_294_967_295
  if (value < min || value > max) {
    throw new RangeError(`Expected ${name} to be ${`>= ${min} && <= ${max}`}, got ${value}`)
  }
}

module.exports = {
  isUint32,
  validateAbortSignal,
  validateNumber,
  validateUint32
}
