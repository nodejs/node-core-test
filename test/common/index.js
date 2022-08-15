// https://github.com/nodejs/node/blob/1aab13cad9c800f4121c1d35b554b78c1b17bdbd/test/common/index.js
const assert = require('assert')
const path = require('path')
const util = require('util')
const noop = () => {}

const { bin } = require('../../package.json')

process.execPath = path.resolve(__dirname, '..', '..', bin.test)

const mustCallChecks = []

function runCallChecks (exitCode) {
  if (exitCode !== 0) return

  const failed = mustCallChecks.filter(function (context) {
    if ('minimum' in context) {
      context.messageSegment = `at least ${context.minimum}`
      return context.actual < context.minimum
    }
    context.messageSegment = `exactly ${context.exact}`
    return context.actual !== context.exact
  })

  failed.forEach(function (context) {
    console.log('Mismatched %s function calls. Expected %s, actual %d.',
      context.name,
      context.messageSegment,
      context.actual)
    console.log(context.stack.split('\n').slice(2).join('\n'))
  })

  if (failed.length) process.exit(1)
}

function mustCall (fn, exact) {
  return _mustCallInner(fn, exact, 'exact')
}

function getCallSite (top) {
  const originalStackFormatter = Error.prepareStackTrace
  Error.prepareStackTrace = (err, stack) => // eslint-disable-line n/handle-callback-err
    `${stack[0].getFileName()}:${stack[0].getLineNumber()}`
  const err = new Error()
  Error.captureStackTrace(err, top)
  // With the V8 Error API, the stack is not formatted until it is accessed
  err.stack // eslint-disable-line no-unused-expressions
  Error.prepareStackTrace = originalStackFormatter
  return err.stack
}

function mustNotCall (msg) {
  const callSite = getCallSite(mustNotCall)
  return function mustNotCall (...args) {
    const argsInfo = args.length > 0
      ? `\ncalled with arguments: ${args.map((arg) => util.inspect(arg)).join(', ')}`
      : ''
    assert.fail(
      `${msg || 'function should not have been called'} at ${callSite}` +
      argsInfo)
  }
}

function _mustCallInner (fn, criteria = 1, field) {
  if (process._exiting) { throw new Error('Cannot use common.mustCall*() in process exit handler') }
  if (typeof fn === 'number') {
    criteria = fn
    fn = noop
  } else if (fn === undefined) {
    fn = noop
  }

  if (typeof criteria !== 'number') { throw new TypeError(`Invalid ${field} value: ${criteria}`) }

  const context = {
    [field]: criteria,
    actual: 0,
    stack: util.inspect(new Error()),
    name: fn.name || '<anonymous>'
  }

  // Add the exit listener only once to avoid listener leak warnings
  if (mustCallChecks.length === 0) process.on('exit', runCallChecks)

  mustCallChecks.push(context)

  const _return = function () { // eslint-disable-line func-style
    context.actual++
    return fn.apply(this, arguments)
  }
  // Function instances have own properties that may be relevant.
  // Let's replicate those properties to the returned function.
  // Refs: https://tc39.es/ecma262/#sec-function-instances
  Object.defineProperties(_return, {
    name: {
      value: fn.name,
      writable: false,
      enumerable: false,
      configurable: true
    },
    length: {
      value: fn.length,
      writable: false,
      enumerable: false,
      configurable: true
    }
  })
  return _return
}

// Useful for testing expected internal/error objects
function expectsError (validator, exact) {
  return mustCall((...args) => {
    if (args.length !== 1) {
      // Do not use `assert.strictEqual()` to prevent `inspect` from
      // always being called.
      assert.fail(`Expected one argument, got ${util.inspect(args)}`)
    }
    const error = args.pop()
    const descriptor = Object.getOwnPropertyDescriptor(error, 'message')
    // The error message should be non-enumerable
    assert.strictEqual(descriptor.enumerable, false)

    assert.throws(() => { throw error }, validator)
    return true
  }, exact)
}

if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout !== 'function') {
  // `AbortSignal.timeout` is not available on Node.js 14.x, we need to polyfill
  // it because some tests are using it. End-users don't need to it.

  class AbortError extends Error {
    constructor (message = 'The operation was aborted', options = undefined) {
      super(message, options)
      this.code = 23
    }
  }

  AbortSignal.timeout = function timeout (delay) {
    const ac = new AbortController()
    setTimeout(() => ac.abort(new AbortError(
      'The operation was aborted due to timeout')), delay).unref()
    return ac.signal
  }
}

if (typeof AbortSignal !== 'undefined' && (process.version.startsWith('v14.') || process.version.startsWith('v16.'))) {
  // Implementation of AbortSignal and AbortController differ slightly with the
  // v18.x one, creating some difference on the TAP output which makes the tests
  // fail. We are overriding the built-ins to make the test pass, however that's
  // not necessary to do for the library to work (i.e. end-users don't need it).

  const defaultAbortError = new Error('This operation was aborted')
  defaultAbortError.code = 20

  AbortSignal.abort = function abort (reason = defaultAbortError) {
    const controller = new AbortController()
    controller.abort(reason)
    return controller.signal
  }
  const nativeAbort = AbortController.prototype.abort
  AbortController.prototype.abort = function abort (reason = defaultAbortError) {
    this.signal.reason = reason
    nativeAbort.call(this, reason)
  }
}

module.exports = {
  expectsError,
  isWindow: process.platform === 'win32',
  mustCall,
  mustNotCall
}
