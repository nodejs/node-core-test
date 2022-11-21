// https://github.com/nodejs/node/blob/f8ce9117b19702487eb600493d941f7876e00e01/lib/internal/errors.js

'use strict'

const {
  ArrayPrototypeFilter,
  ArrayPrototypeJoin,
  ArrayPrototypeUnshift,
  Error,
  ErrorCaptureStackTrace,
  ObjectDefineProperty,
  ObjectDefineProperties,
  ObjectIsExtensible,
  ObjectGetOwnPropertyDescriptor,
  ObjectPrototypeHasOwnProperty,
  ReflectApply,
  SafeMap,
  SafeWeakMap,
  StringPrototypeIncludes,
  StringPrototypeMatch,
  StringPrototypeStartsWith,
  StringPrototypeSlice,
  Symbol,
  SymbolFor
} = require('#internal/per_context/primordials')

const kIsNodeError = Symbol('kIsNodeError')

const messages = new SafeMap()
const codes = {}

const overrideStackTrace = new SafeWeakMap()
let userStackTraceLimit
const nodeInternalPrefix = '__node_internal_'

// Lazily loaded
let assert

let internalUtilInspect = null
function lazyInternalUtilInspect () {
  if (!internalUtilInspect) {
    internalUtilInspect = require('#internal/util/inspect')
  }
  return internalUtilInspect
}

let buffer
function lazyBuffer () {
  if (buffer === undefined) { buffer = require('buffer').Buffer }
  return buffer
}

function isErrorStackTraceLimitWritable () {
  const desc = ObjectGetOwnPropertyDescriptor(Error, 'stackTraceLimit')
  if (desc === undefined) {
    return ObjectIsExtensible(Error)
  }

  return ObjectPrototypeHasOwnProperty(desc, 'writable')
    ? desc.writable
    : desc.set !== undefined
}

function inspectWithNoCustomRetry (obj, options) {
  const utilInspect = lazyInternalUtilInspect()

  try {
    return utilInspect.inspect(obj, options)
  } catch {
    return utilInspect.inspect(obj, { ...options, customInspect: false })
  }
}

// A specialized Error that includes an additional info property with
// additional information about the error condition.
// It has the properties present in a UVException but with a custom error
// message followed by the uv error code and uv error message.
// It also has its own error code with the original uv error context put into
// `err.info`.
// The context passed into this error must have .code, .syscall and .message,
// and may have .path and .dest.
class SystemError extends Error {
  constructor (key, context) {
    const limit = Error.stackTraceLimit
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = 0
    super()
    // Reset the limit and setting the name property.
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = limit
    const prefix = getMessage(key, [], this)
    let message = `${prefix}: ${context.syscall} returned ` +
                  `${context.code} (${context.message})`

    if (context.path !== undefined) { message += ` ${context.path}` }
    if (context.dest !== undefined) { message += ` => ${context.dest}` }

    captureLargerStackTrace(this)

    this.code = key

    ObjectDefineProperties(this, {
      [kIsNodeError]: {
        value: true,
        enumerable: false,
        writable: false,
        configurable: true
      },
      name: {
        value: 'SystemError',
        enumerable: false,
        writable: true,
        configurable: true
      },
      message: {
        value: message,
        enumerable: false,
        writable: true,
        configurable: true
      },
      info: {
        value: context,
        enumerable: true,
        configurable: true,
        writable: false
      },
      errno: {
        get () {
          return context.errno
        },
        set: (value) => {
          context.errno = value
        },
        enumerable: true,
        configurable: true
      },
      syscall: {
        get () {
          return context.syscall
        },
        set: (value) => {
          context.syscall = value
        },
        enumerable: true,
        configurable: true
      }
    })

    if (context.path !== undefined) {
      // TODO(BridgeAR): Investigate why and when the `.toString()` was
      // introduced. The `path` and `dest` properties in the context seem to
      // always be of type string. We should probably just remove the
      // `.toString()` and `Buffer.from()` operations and set the value on the
      // context as the user did.
      ObjectDefineProperty(this, 'path', {
        get () {
          return context.path != null
            ? context.path.toString()
            : context.path
        },
        set: (value) => {
          context.path = value
            ? lazyBuffer().from(value.toString())
            : undefined
        },
        enumerable: true,
        configurable: true
      })
    }

    if (context.dest !== undefined) {
      ObjectDefineProperty(this, 'dest', {
        get () {
          return context.dest != null
            ? context.dest.toString()
            : context.dest
        },
        set: (value) => {
          context.dest = value
            ? lazyBuffer().from(value.toString())
            : undefined
        },
        enumerable: true,
        configurable: true
      })
    }
  }

  toString () {
    return `${this.name} [${this.code}]: ${this.message}`
  }

  [SymbolFor('nodejs.util.inspect.custom')] (recurseTimes, ctx) {
    return lazyInternalUtilInspect().inspect(this, {
      ...ctx,
      getters: true,
      customInspect: false
    })
  }
}

function makeSystemErrorWithCode (key) {
  return class NodeError extends SystemError {
    constructor (ctx) {
      super(key, ctx)
    }
  }
}

function makeNodeErrorWithCode (Base, key) {
  return function NodeError (...args) {
    const limit = Error.stackTraceLimit
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = 0
    const error = new Base()
    // Reset the limit and setting the name property.
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = limit
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
    captureLargerStackTrace(error)
    error.code = key
    return error
  }
}

/**
 * This function removes unnecessary frames from Node.js core errors.
 * @template {(...args: any[]) => any} T
 * @type {(fn: T) => T}
 */
function hideStackFrames (fn) {
  // We rename the functions that will be hidden to cut off the stacktrace
  // at the outermost one
  const hidden = nodeInternalPrefix + fn.name
  ObjectDefineProperty(fn, 'name', { value: hidden })
  return fn
}

// Utility function for registering the error codes. Only used here. Exported
// *only* to allow for testing.
function E (sym, val, def, ...otherClasses) {
  // Special case for SystemError that formats the error message differently
  // The SystemErrors only have SystemError as their base classes.
  messages.set(sym, val)
  if (def === SystemError) {
    def = makeSystemErrorWithCode(sym)
  } else {
    def = makeNodeErrorWithCode(def, sym)
  }

  if (otherClasses.length !== 0) {
    otherClasses.forEach((clazz) => {
      def[clazz.name] = makeNodeErrorWithCode(clazz, sym)
    })
  }
  codes[sym] = def
}

function getMessage (key, args, self) {
  const msg = messages.get(key)

  if (assert === undefined) assert = require('#internal/assert')

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

const captureLargerStackTrace = hideStackFrames(
  function captureLargerStackTrace (err) {
    const stackTraceLimitIsWritable = isErrorStackTraceLimitWritable()
    if (stackTraceLimitIsWritable) {
      userStackTraceLimit = Error.stackTraceLimit
      Error.stackTraceLimit = Infinity
    }
    ErrorCaptureStackTrace(err)
    // Reset the limit
    if (stackTraceLimitIsWritable) Error.stackTraceLimit = userStackTraceLimit

    return err
  })

// Hide stack lines before the first user code line.
function hideInternalStackFrames (error) {
  overrideStackTrace.set(error, (error, stackFrames) => {
    let frames = stackFrames
    if (typeof stackFrames === 'object') {
      frames = ArrayPrototypeFilter(
        stackFrames,
        (frm) => !StringPrototypeStartsWith(frm.getFileName() || '',
          'node:internal')
      )
    }
    ArrayPrototypeUnshift(frames, error)
    return ArrayPrototypeJoin(frames, '\n    at ')
  })
}

class AbortError extends Error {
  constructor (message = 'The operation was aborted', options = undefined) {
    super(message, options)
    this.code = 'ABORT_ERR'
    this.name = 'AbortError'
  }
}

module.exports = {
  AbortError,
  codes,
  inspectWithNoCustomRetry,
  kIsNodeError
}

E('ERR_TAP_LEXER_ERROR', function (errorMsg) {
  hideInternalStackFrames(this)
  return errorMsg
}, Error)
E('ERR_TAP_PARSER_ERROR', function (errorMsg, details, tokenCausedError, source) {
  hideInternalStackFrames(this)
  this.cause = tokenCausedError
  const { column, line, start, end } = tokenCausedError.location
  const errorDetails = `${details} at line ${line}, column ${column} (start ${start}, end ${end})`
  return errorMsg + errorDetails
}, SyntaxError)
E('ERR_TAP_VALIDATION_ERROR', function (errorMsg) {
  hideInternalStackFrames(this)
  return errorMsg
}, Error)
E('ERR_TEST_FAILURE', function (error, failureType) {
  hideInternalStackFrames(this)
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
E('ERR_INVALID_ARG_TYPE',
  (name, expected, actual) => `Expected ${name} to be ${expected}, got type ${typeof actual}`,
  TypeError)
E('ERR_INVALID_ARG_VALUE', (name, value, reason = 'is invalid') => {
  let inspected
  try {
    inspected = String(value)
  } catch {
    inspected = `type ${typeof value}`
  }
  if (inspected.length > 128) {
    inspected = `${StringPrototypeSlice(inspected, 0, 128)}...`
  }
  const type = StringPrototypeIncludes(name, '.') ? 'property' : 'argument'
  return `The ${type} '${name}' ${reason}. Received ${inspected}`
}, TypeError, RangeError)
E('ERR_OUT_OF_RANGE',
  (name, expected, actual) => `Expected ${name} to be ${expected}, got ${actual}`,
  RangeError)
