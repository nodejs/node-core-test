const { spawn, spawnSync } = require('node:child_process')
const { join, resolve } = require('node:path')
const assert = require('node:assert')

const test = require('#node:test')

const { bin } = require('../package.json')

const binPath = resolve(__dirname, '..', bin.test)
const nodeDashDashTestPath = resolve(__dirname, '..', bin['node--test'])
const fixturesDir = join(__dirname, 'fixtures', 'node-core-test')

test('should execute the tests when run as node--test --test', () => {
  const args = [nodeDashDashTestPath, '--test', fixturesDir]
  const child = spawnSync(process.execPath, args)

  assert.strictEqual(child.status, 0)
  assert.strictEqual(child.signal, null)
  assert.match(child.stdout.toString(), /\nok 1 - \S+esm\.test\.mjs\r?\n/)
  assert.strictEqual(child.stderr.toString(), '')
})

test('should execute the tests when run as node-core-test --test', () => {
  const args = [nodeDashDashTestPath, '--test', fixturesDir]
  const child = spawnSync(process.execPath, args)

  assert.strictEqual(child.status, 0)
  assert.strictEqual(child.signal, null)
  assert.match(child.stdout.toString(), /\nok 1 - \S+esm\.test\.mjs\r?\n/)
  assert.strictEqual(child.stderr.toString(), '')
})

test('should execute the tests when run as node--test', () => {
  const args = [nodeDashDashTestPath, fixturesDir]
  const child = spawnSync(process.execPath, args)

  assert.strictEqual(child.status, 0)
  assert.strictEqual(child.signal, null)
  assert.match(child.stdout.toString(), /\nok 1 - \S+esm\.test\.mjs\r?\n/)
  assert.strictEqual(child.stderr.toString(), '')
})

test('should not execute the tests when run as node-core-test (without the explicit --test flag)', () => {
  const args = [binPath, fixturesDir]
  const child = spawnSync(process.execPath, args)

  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
  assert.strictEqual(child.stdout.toString(), '')
  assert.match(child.stderr.toString(), /Error: Cannot find module/)
})

test('should handle unfinished TLA "entry point"', () => new Promise((resolve, reject) => {
  // We need to pass `--test-only` here otherwise the script will implicitly add `--test`.
  const cp = spawn(process.execPath, [binPath, join(fixturesDir, 'unfinished-tla.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 13)
    resolve()
  })
}))

test('should handle exitCode changes as node', () => new Promise((resolve, reject) => {
  // We need to pass `--test-only` here otherwise the script will implicitly add `--test`.
  const cp = spawn(process.execPath, [binPath, join(fixturesDir, 'finished-tla-with-explicit-exitCode-modification.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 13)
    resolve()
  })
}))

test('should handle process.exit calls', () => new Promise((resolve, reject) => {
  // We need to pass `--test-only` here otherwise the script will implicitly add `--test`.
  const cp = spawn(process.execPath, [binPath, join(fixturesDir, 'finished-tla-with-explicit-process.exit-call.mjs')], { stdio: 'inherit' })
  cp.on('error', reject)
  cp.on('exit', (code) => {
    assert.strictEqual(code, 0)
    resolve()
  })
}))
