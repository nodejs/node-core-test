const {
  ArrayPrototypePush
} = require('#internal/per_context/primordials')
const { validateAbortSignal } = require('#internal/validators')
const { AbortError } = require('#internal/errors')

async function toArray (options) {
  if (options?.signal != null) {
    validateAbortSignal(options.signal, 'options.signal')
  }

  const result = []
  for await (const val of this) {
    if (options?.signal?.aborted) {
      throw new AbortError(undefined, { cause: options.signal.reason })
    }
    ArrayPrototypePush(result, val)
  }
  return result
}

module.exports.promiseReturningOperators = {
  toArray
}
