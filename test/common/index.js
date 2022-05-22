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

module.exports = {
  expectsError
}
