// https://github.com/nodejs/node/blob/98e9499b55fbc63b2b3db79507ee1475302f9763/lib/internal/test_runner/tap_stream.js
'use strict'

const { Readable } = require('stream')
const { isError } = require('#internal/test_runner/utils')
const {
  ArrayPrototypeForEach,
  ArrayPrototypeJoin,
  ArrayPrototypePush,
  ArrayPrototypeShift,
  ObjectEntries,
  StringPrototypeReplaceAll,
  StringPrototypeSplit,
  RegExpPrototypeSymbolReplace
} = require('#internal/per_context/primordials')
const { inspectWithNoCustomRetry } = require('#internal/errors')

const kFrameStartRegExp = /^ {4}at /
const kLineBreakRegExp = /\n|\r\n/
const inspectOptions = { colors: false, breakLength: Infinity }
let testModule // Lazy loaded due to circular dependency.

function lazyLoadTest () {
  if (!testModule) {
    testModule = require('./test')
  }

  return testModule
}

class TapStream extends Readable {
  constructor () {
    super()
    this._buffer = []
    this._canPush = true
  }

  _read () {
    this._canPush = true

    while (this._buffer.length > 0) {
      const line = ArrayPrototypeShift(this._buffer)

      if (!this._tryPush(line)) {
        return
      }
    }
  }

  bail (message) {
    this._tryPush(`Bail out!${message ? ` ${tapEscape(message)}` : ''}\n`)
  }

  fail (indent, testNumber, description, directive) {
    this._test(indent, testNumber, 'not ok', description, directive)
  }

  ok (indent, testNumber, description, directive) {
    this._test(indent, testNumber, 'ok', description, directive)
  }

  plan (indent, count, explanation) {
    const exp = `${explanation ? ` # ${tapEscape(explanation)}` : ''}`

    this._tryPush(`${indent}1..${count}${exp}\n`)
  }

  getSkip (reason) {
    return `SKIP${reason ? ` ${tapEscape(reason)}` : ''}`
  }

  getTodo (reason) {
    return `TODO${reason ? ` ${tapEscape(reason)}` : ''}`
  }

  details (indent, duration, error) {
    let details = `${indent}  ---\n`

    details += jsToYaml(indent, 'duration_ms', duration)
    details += jsToYaml(indent, null, error)
    details += `${indent}  ...\n`
    this._tryPush(details)
  }

  diagnostic (indent, message) {
    this._tryPush(`${indent}# ${tapEscape(message)}\n`)
  }

  version () {
    this._tryPush('TAP version 13\n')
  }

  _test (indent, testNumber, status, description, directive) {
    let line = `${indent}${status} ${testNumber}`

    if (description) {
      line += ` ${tapEscape(description)}`
    }

    if (directive) {
      line += ` # ${directive}`
    }

    line += '\n'
    this._tryPush(line)
  }

  _tryPush (message) {
    if (this._canPush) {
      this._canPush = this.push(message)
    } else {
      ArrayPrototypePush(this._buffer, message)
    }

    return this._canPush
  }
}

// In certain places, # and \ need to be escaped as \# and \\.
function tapEscape (input) {
  return StringPrototypeReplaceAll(
    StringPrototypeReplaceAll(input, '\\', '\\\\'),
    '#',
    '\\#'
  )
}

function jsToYaml (indent, name, value) {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value !== 'object') {
    const prefix = `${indent}  ${name}: `

    if (typeof value !== 'string') {
      return `${prefix}${inspectWithNoCustomRetry(value, inspectOptions)}\n`
    }

    const lines = StringPrototypeSplit(value, kLineBreakRegExp)

    if (lines.length === 1) {
      return `${prefix}${inspectWithNoCustomRetry(value, inspectOptions)}\n`
    }

    let str = `${prefix}|-\n`

    for (let i = 0; i < lines.length; i++) {
      str += `${indent}    ${lines[i]}\n`
    }

    return str
  }

  const entries = ObjectEntries(value)
  const isErrorObj = isError(value)
  let result = ''

  for (let i = 0; i < entries.length; i++) {
    const { 0: key, 1: value } = entries[i]

    if (isErrorObj && (key === 'cause' || key === 'code')) {
      continue
    }

    result += jsToYaml(indent, key, value)
  }

  if (isErrorObj) {
    const { kTestCodeFailure } = lazyLoadTest()
    const { cause, code, failureType, message, stack } = value
    let errMsg = message ?? '<unknown error>'
    let errStack = stack
    let errCode = code

    // If the ERR_TEST_FAILURE came from an error provided by user code,
    // then try to unwrap the original error message and stack.
    if (code === 'ERR_TEST_FAILURE' && failureType === kTestCodeFailure) {
      errMsg = cause?.message ?? errMsg
      errStack = cause?.stack ?? errStack
      errCode = cause?.code ?? errCode
    }

    result += jsToYaml(indent, 'error', errMsg)

    if (errCode) {
      result += jsToYaml(indent, 'code', errCode)
    }

    if (typeof errStack === 'string') {
      const frames = []

      ArrayPrototypeForEach(
        StringPrototypeSplit(errStack, kLineBreakRegExp),
        frame => {
          const processed = RegExpPrototypeSymbolReplace(
            kFrameStartRegExp,
            frame,
            ''
          )

          if (processed.length > 0 && processed.length !== frame.length) {
            ArrayPrototypePush(frames, processed)
          }
        }
      )

      if (frames.length > 0) {
        const frameDelimiter = `\n${indent}    `

        result += `${indent}  stack: |-${frameDelimiter}`
        result += `${ArrayPrototypeJoin(frames, `${frameDelimiter}`)}\n`
      }
    }
  }

  return result
}

module.exports = { TapStream }
