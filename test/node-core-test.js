const { spawn } = require('node:child_process')
const { join, resolve } = require('node:path')
const assert = require('node:assert')

const test = require('#node:test')

const { bin } = require('../package.json')

const binPath = resolve(__dirname, '..', bin['node--test'])
const fixturesDir = join(__dirname, 'fixtures', 'node-core-test')

test('should execute the tests with the --test flag', () => new Promise((resolve, reject) => {
  const cp = spawn(process.execPath, [binPath, '--test', join(fixturesDir, 'esm.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 0)
    resolve()
  })
}))

test('should execute the tests without the --test flag', () => new Promise((resolve, reject) => {
  const cp = spawn(process.execPath, [binPath, join(fixturesDir, 'esm.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 0)
    resolve()
  })
}))

test('should handle unfinished TLA "entry point"', () => new Promise((resolve, reject) => {
  // We need to pass `--test-only` here otherwise the script will implicitly add `--test`.
  const cp = spawn(process.execPath, [binPath, '--test-only', join(fixturesDir, 'unfinished-tla.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 13)
    resolve()
  })
}))

test('should handle exitCode changes as node', () => new Promise((resolve, reject) => {
  // We need to pass `--test-only` here otherwise the script will implicitly add `--test`.
  const cp = spawn(process.execPath, [binPath, '--test-only', join(fixturesDir, 'finished-tla-with-explicit-exitCode-modification.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 13)
    resolve()
  })
}))

test('should handle process.exit calls', () => new Promise((resolve, reject) => {
  // We need to pass `--test-only` here otherwise the script will implicitly add `--test`.
  const cp = spawn(process.execPath, [binPath, '--test-only', join(fixturesDir, 'finished-tla-with-explicit-process.exit-call.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 0)
    resolve()
  })
}))
