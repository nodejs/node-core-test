// https://github.com/nodejs/node/blob/60da0a1b364efdd84870269d23b39faa12fb46d8/lib/internal/validators.js
const {
  ERR_INVALID_ARG_TYPE,
  ERR_OUT_OF_RANGE
} = require('#internal/errors').codes

function isUint32 (value) {
  return value === (value >>> 0)
}

function validateNumber (value, name, min = undefined, max) {
  if (typeof value !== 'number') {
    throw new ERR_INVALID_ARG_TYPE(name, 'a number', value)
  }

  if ((min != null && value < min) || (max != null && value > max) ||
      ((min != null || max != null) && Number.isNaN(value))) {
    throw new ERR_OUT_OF_RANGE(
      name,
      `${min != null ? `>= ${min}` : ''}${min != null && max != null ? ' && ' : ''}${max != null ? `<= ${max}` : ''}`,
      value
    )
  }
}

const validateAbortSignal = (signal, name) => {
  if (signal !== undefined &&
      (signal === null ||
       typeof signal !== 'object' ||
       !('aborted' in signal))) {
    throw new ERR_INVALID_ARG_TYPE(name, 'an AbortSignal', signal)
  }
}

const validateUint32 = (value, name, positive) => {
  if (typeof value !== 'number') {
    throw new ERR_INVALID_ARG_TYPE(name, 'a number', value)
  }
  if (!Number.isInteger(value)) {
    throw new ERR_OUT_OF_RANGE(name, 'an integer', value)
  }
  const min = positive ? 1 : 0
  // 2 ** 32 === 4294967296
  const max = 4_294_967_295
  if (value < min || value > max) {
    throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value)
  }
}

module.exports = {
  isUint32,
  validateAbortSignal,
  validateNumber,
  validateUint32
}
