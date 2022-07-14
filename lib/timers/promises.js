'use strict'
try {
  module.exports = require('node:timers/promises')
} catch {
  const { promisify } = require('node:util')
  module.exports = {
    setImmediate: promisify(setImmediate),
    setInterval: promisify(setInterval),
    setTimeout: promisify(setTimeout)
  }
}
