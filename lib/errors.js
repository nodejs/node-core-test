// https://github.com/nodejs/node/blob/adaf60240559ffb58636130950262ee3237b7a41/lib/internal/errors.js

'use strict'

const assert = require('assert')
const { lazyInternalUtilInspect } = require('./primordials')

function inspectWithNoCustomRetry (obj, options) {
  const utilInspect = lazyInternalUtilInspect()

  try {
    return utilInspect.inspect(obj, options)
  } catch {
    return utilInspect.inspect(obj, { ...options, customInspect: false })
  }
}

class ERR_TEST_FAILURE extends Error {
  constructor (error, failureType) {
    assert(
      typeof failureType === 'string',
      "The 'failureType' argument must be of type string."
    )

    let msg = error?.message ?? error

    if (typeof msg !== 'string') {
      msg = inspectWithNoCustomRetry(msg)
    }

    super(msg)

    this.failureType = error?.failureType ?? failureType
    this.cause = error
    this.code = 'ERR_TEST_FAILURE'
  }
}

const kIsNodeError = 'kIsNodeError'

module.exports = {
  codes: {
    ERR_TEST_FAILURE
  },
  inspectWithNoCustomRetry,
  kIsNodeError
}
