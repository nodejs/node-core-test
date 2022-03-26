// https://github.com/nodejs/node/blob/b476b1b91ef8715f096f815db5a0c8722b613678/lib/internal/errors.js

'use strict'

const assert = require('assert')
const { lazyInternalUtilInspect } = require('./primordials')

class ERR_TEST_FAILURE extends Error {
  constructor (error, failureType) {
    const message = error?.message ?? lazyInternalUtilInspect().inspect(error)
    super(message)

    assert(
      typeof failureType === 'string',
      "The 'failureType' argument must be of type string."
    )

    this.failureType = error?.failureType ?? failureType
    this.cause = error
    this.code = 'ERR_TEST_FAILURE'
  }
}

module.exports = {
  codes: {
    ERR_TEST_FAILURE
  }
}
