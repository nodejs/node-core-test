// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/test/fixtures/test-runner/custom_reporters/custom.cjs
const { Transform } = require('node:stream')

const customReporter = new Transform({
  writableObjectMode: true,
  transform (event, encoding, callback) {
    this.counters = this.counters ?? {}
    this.counters[event.type] = (this.counters[event.type] ?? 0) + 1
    callback()
  },
  flush (callback) {
    this.push('custom.cjs ')
    this.push(JSON.stringify(this.counters))
    callback()
  }
})

module.exports = customReporter
