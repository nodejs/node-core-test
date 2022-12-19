// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/lib/internal/test_runner/tests_stream.js
'use strict'
const {
  ArrayPrototypePush,
  ArrayPrototypeShift
} = require('#internal/per_context/primordials')
const { Readable } = require('readable-stream')

class TestsStream extends Readable {
  #buffer
  #canPush

  constructor () {
    super({ objectMode: true })
    this.#buffer = []
    this.#canPush = true
  }

  _read () {
    this.#canPush = true

    while (this.#buffer.length > 0) {
      const obj = ArrayPrototypeShift(this.#buffer)

      if (!this.#tryPush(obj)) {
        return
      }
    }
  }

  fail (nesting, testNumber, name, details, directive) {
    this.#emit('test:fail', { __proto__: null, name, nesting, testNumber, details, ...directive })
  }

  ok (nesting, testNumber, name, details, directive) {
    this.#emit('test:pass', { __proto__: null, name, nesting, testNumber, details, ...directive })
  }

  plan (nesting, count) {
    this.#emit('test:plan', { __proto__: null, nesting, count })
  }

  getSkip (reason = undefined) {
    return { __proto__: null, skip: reason ?? true }
  }

  getTodo (reason = undefined) {
    return { __proto__: null, todo: reason ?? true }
  }

  start (nesting, name) {
    this.#emit('test:start', { __proto__: null, nesting, name })
  }

  diagnostic (nesting, message) {
    this.#emit('test:diagnostic', { __proto__: null, nesting, message })
  }

  #emit (type, data) {
    this.emit(type, data)
    this.#tryPush({ type, data })
  }

  #tryPush (message) {
    if (this.#canPush) {
      this.#canPush = this.push(message)
    } else {
      ArrayPrototypePush(this.#buffer, message)
    }

    return this.#canPush
  }
}

module.exports = { TestsStream }
