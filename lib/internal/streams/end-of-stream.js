'use strict'

let finished
try {
  ({ finished } = require('node:stream/promises'))
} catch {
  // node:stream/promises is not available on Node.js 14.x
  const { finished: eos } = require('node:stream')
  finished = function finished (stream, opts) {
    return new Promise((resolve, reject) => {
      eos(stream, opts, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = { finished }
