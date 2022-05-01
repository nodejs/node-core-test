#!/usr/bin/env node

const { argv } = require('#internal/options')

argv.test = true

require('./node-core-test.js')
