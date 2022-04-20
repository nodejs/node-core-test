// https://github.com/nodejs/node/blob/HEAD/test/parallel/test-runner-cli.js
'use strict'
const assert = require('assert')
const { spawnSync } = require('child_process')
const { join } = require('path')
const fixtures = require('../common/fixtures')
const testFixtures = fixtures.path('test-runner')

const execPath = join(__dirname, '..', '..', 'bin', 'test_runner.js')

{
  // File not found.
  const args = ['a-random-file-that-does-not-exist.js']
  // these should spawn our own bin instead
  const child = spawnSync(execPath, args)

  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
  assert.strictEqual(child.stdout.toString(), '')
  assert(/^Could not find/.test(child.stderr.toString()))
}

{
  // Default behavior. node_modules is ignored. Files that don't match the
  // pattern are ignored except in test/ directories.
  const args = [testFixtures]
  const child = spawnSync(execPath, args)

  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
  assert.strictEqual(child.stderr.toString(), '')
  const stdout = child.stdout.toString()
  assert(/ok 1 - .+index\.test\.js/.test(stdout))
  assert(/not ok 2 - .+random\.test\.mjs/.test(stdout))
  assert(/not ok 1 - this should fail/.test(stdout))
  assert(/ok 3 - .+subdir.+subdir_test\.js/.test(stdout))
  assert(/ok 4 - .+random\.cjs/.test(stdout))
}

{
  // User specified files that don't match the pattern are still run.
  const args = [testFixtures, join(testFixtures, 'index.js')]
  const child = spawnSync(execPath, args)

  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
  assert.strictEqual(child.stderr.toString(), '')
  const stdout = child.stdout.toString()
  assert(/not ok 1 - .+index\.js/.test(stdout))
  assert(/ok 2 - .+index\.test\.js/.test(stdout))
  assert(/not ok 3 - .+random\.test\.mjs/.test(stdout))
  assert(/not ok 1 - this should fail/.test(stdout))
  assert(/ok 4 - .+subdir.+subdir_test\.js/.test(stdout))
}

{
  // Searches node_modules if specified.
  const args = [join(testFixtures, 'node_modules')]
  const child = spawnSync(execPath, args)

  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
  assert.strictEqual(child.stderr.toString(), '')
  const stdout = child.stdout.toString()
  assert(/not ok 1 - .+test-nm\.js/.test(stdout))
}

{
  // The current directory is used by default.
  const args = []
  const options = { cwd: testFixtures }
  const child = spawnSync(execPath, args, options)
  assert.strictEqual(child.status, 1)
  assert.strictEqual(child.signal, null)
  assert.strictEqual(child.stderr.toString(), '')
  const stdout = child.stdout.toString()
  assert(/ok 1 - .+index\.test\.js/.test(stdout))
  assert(/not ok 2 - .+random\.test\.mjs/.test(stdout))
  assert(/not ok 1 - this should fail/.test(stdout))
  assert(/ok 3 - .+subdir.+subdir_test\.js/.test(stdout))
  assert(/ok 4 - .+random\.cjs/.test(stdout))
}
