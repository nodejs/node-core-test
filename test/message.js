'use strict'

// const test = require('..')
const fs = require('fs/promises')
const { extname, join } = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const assert = require('assert')

const main = async () => {
  const { isMatch } = await import('matcher')

  const dir = join(__dirname, 'message')
  for (const fileName of await fs.readdir(dir)) {
    if (extname(fileName) === '.js') {
      const filePath = join(dir, fileName)
      const expected = await fs.readFile(
        filePath.replace('.js', '.out'),
        'utf8'
      )
      let actual
      try {
        const res = await promisify(exec)(`node ${filePath}`)
        actual = res.stdout.trim()
      } catch (err) {
        actual = err.stdout.trim()
      }
      try {
        assert(isMatch(actual, expected, actual))
      } catch (err) {
        console.error('expected:')
        console.error(expected)
        console.error('actual:')
        console.error(actual)
        throw err
      }
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
