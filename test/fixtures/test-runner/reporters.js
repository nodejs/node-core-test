// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/test/fixtures/test-runner/reporters.js
'use strict'
const test = require('#node:test')

test('nested', { concurrency: 4 }, async (t) => {
  t.test('ok', () => {})
  t.test('failing', () => {
    throw new Error('error')
  })
})

test('top level', () => {})
