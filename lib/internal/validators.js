// https://github.com/nodejs/node/blob/60da0a1b364efdd84870269d23b39faa12fb46d8/lib/internal/validators.js
const {
  ArrayIsArray,
  ArrayPrototypeIncludes,
  ArrayPrototypeJoin,
  ArrayPrototypeMap,
  NumberIsInteger,
  NumberMAX_SAFE_INTEGER, // eslint-disable-line camelcase
  NumberMIN_SAFE_INTEGER, // eslint-disable-line camelcase
  ObjectPrototypeHasOwnProperty
} = require('#internal/per_context/primordials')
const {
  ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE,
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

const validateOneOf = (value, name, oneOf) => {
  if (!ArrayPrototypeIncludes(oneOf, value)) {
    const allowed = ArrayPrototypeJoin(
      ArrayPrototypeMap(oneOf, (v) =>
        (typeof v === 'string' ? `'${v}'` : String(v))),
      ', ')
    const reason = 'must be one of: ' + allowed
    throw new ERR_INVALID_ARG_VALUE(name, value, reason)
  }
}

const validateArray = (value, name, minLength = 0) => {
  if (!ArrayIsArray(value)) {
    throw new ERR_INVALID_ARG_TYPE(name, 'Array', value)
  }
  if (value.length < minLength) {
    const reason = `must be longer than ${minLength}`
    throw new ERR_INVALID_ARG_VALUE(name, value, reason)
  }
}

function getOwnPropertyValueOrDefault (options, key, defaultValue) {
  return options == null || !ObjectPrototypeHasOwnProperty(options, key)
    ? defaultValue
    : options[key]
}

const validateObject = (value, name, options = null) => {
  const allowArray = getOwnPropertyValueOrDefault(options, 'allowArray', false)
  const allowFunction = getOwnPropertyValueOrDefault(options, 'allowFunction', false)
  const nullable = getOwnPropertyValueOrDefault(options, 'nullable', false)
  if ((!nullable && value === null) ||
        (!allowArray && ArrayIsArray(value)) ||
        (typeof value !== 'object' && (
          !allowFunction || typeof value !== 'function'
        ))) {
    throw new ERR_INVALID_ARG_TYPE(name, 'Object', value)
  }
}

const validateFunction = (value, name) => {
  if (typeof value !== 'function') { throw new ERR_INVALID_ARG_TYPE(name, 'Function', value) }
}

function validateBoolean (value, name) {
  if (typeof value !== 'boolean') { throw new ERR_INVALID_ARG_TYPE(name, 'boolean', value) }
}

const validateInteger =
  (value, name, min = NumberMIN_SAFE_INTEGER, max = NumberMAX_SAFE_INTEGER) => {
    if (typeof value !== 'number') { throw new ERR_INVALID_ARG_TYPE(name, 'number', value) }
    if (!NumberIsInteger(value)) { throw new ERR_OUT_OF_RANGE(name, 'an integer', value) }
    if (value < min || value > max) { throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value) }
  }

module.exports = {
  isUint32,
  validateAbortSignal,
  validateArray,
  validateBoolean,
  validateFunction,
  validateInteger,
  validateNumber,
  validateObject,
  validateOneOf,
  validateUint32
}
