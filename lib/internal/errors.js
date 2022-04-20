// https://github.com/nodejs/node/blob/b476b1b91ef8715f096f815db5a0c8722b613678/lib/internal/errors.js

'use strict'

const assert = require('assert')
const {
  ArrayPrototypeUnshift,
  lazyInternalUtilInspect,
  ObjectDefineProperties,
  ReflectApply,
  SafeMap,
  StringPrototypeMatch
} = require('#internal/per_context/primordials')

function inspectWithNoCustomRetry (obj, options) {
  const utilInspect = lazyInternalUtilInspect()

  try {
    return utilInspect.inspect(obj, options)
  } catch {
    return utilInspect.inspect(obj, { ...options, customInspect: false })
  }
}

const kIsNodeError = 'kIsNodeError'
const messages = new SafeMap()
const codes = {}

function getMessage (key, args, self) {
  const msg = messages.get(key)

  if (typeof msg === 'function') {
    assert(
      msg.length <= args.length, // Default options do not count.
      `Code: ${key}; The provided arguments length (${args.length}) does not ` +
        `match the required ones (${msg.length}).`
    )
    return ReflectApply(msg, self, args)
  }

  const expectedLength =
    (StringPrototypeMatch(msg, /%[dfijoOs]/g) || []).length
  assert(
    expectedLength === args.length,
    `Code: ${key}; The provided arguments length (${args.length}) does not ` +
      `match the required ones (${expectedLength}).`
  )
  if (args.length === 0) { return msg }

  ArrayPrototypeUnshift(args, msg)
  return ReflectApply(lazyInternalUtilInspect().format, null, args)
}

function makeNodeErrorWithCode (Base, key) {
  return function NodeError (...args) {
    const error = new Base()
    const message = getMessage(key, args, error)
    ObjectDefineProperties(error, {
      [kIsNodeError]: {
        value: true,
        enumerable: false,
        writable: false,
        configurable: true
      },
      message: {
        value: message,
        enumerable: false,
        writable: true,
        configurable: true
      },
      toString: {
        value () {
          return `${this.name} [${key}]: ${this.message}`
        },
        enumerable: false,
        writable: true,
        configurable: true
      }
    })
    error.code = key
    return error
  }
}

// Utility function for registering the error codes. Only used here. Exported
// *only* to allow for testing.
function E (sym, val, def) {
  messages.set(sym, val)
  def = makeNodeErrorWithCode(def, sym)
  codes[sym] = def
}

E('ERR_TEST_FAILURE', function (error, failureType) {
  assert(typeof failureType === 'string',
    "The 'failureType' argument must be of type string.")

  let msg = error?.message ?? error

  if (typeof msg !== 'string') {
    msg = inspectWithNoCustomRetry(msg)
  }

  this.failureType = failureType
  this.cause = error
  return msg
}, Error)

module.exports = {
  codes,
  inspectWithNoCustomRetry,
  kIsNodeError
}
