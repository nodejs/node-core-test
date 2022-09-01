#!/usr/bin/env node

const { argv } = require('#internal/options')

argv['test-name-pattern'] = true

require('./node-core-test.js')
