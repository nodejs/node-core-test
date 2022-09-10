// https://github.com/nodejs/node/blob/a165193c5c8e4bcfbd12b2c3f6e55a81a251c258/lib/internal/util/inspector.js
const {
  ArrayPrototypeSome,
  RegExpPrototypeExec
} = require('#internal/per_context/primordials')

const { validatePort } = require('#internal/validators')

const kMinPort = 1024
const kMaxPort = 65535
const kInspectArgRegex = /--inspect(?:-brk|-port)?|--debug-port/
const kInspectMsgRegex = /Debugger listening on ws:\/\/\[?(.+?)\]?:(\d+)\/|Debugger attached|Waiting for the debugger to disconnect\.\.\./

let _isUsingInspector
function isUsingInspector () {
  // Node.js 14.x does not support Logical_nullish_assignment operator
  _isUsingInspector = _isUsingInspector ??
    (ArrayPrototypeSome(process.execArgv, (arg) => RegExpPrototypeExec(kInspectArgRegex, arg) !== null) ||
    RegExpPrototypeExec(kInspectArgRegex, process.env.NODE_OPTIONS) !== null)
  return _isUsingInspector
}

let debugPortOffset = 1
function getInspectPort (inspectPort) {
  if (!isUsingInspector()) {
    return null
  }
  if (typeof inspectPort === 'function') {
    inspectPort = inspectPort()
  } else if (inspectPort == null) {
    inspectPort = process.debugPort + debugPortOffset
    if (inspectPort > kMaxPort) { inspectPort = inspectPort - kMaxPort + kMinPort - 1 }
    debugPortOffset++
  }
  validatePort(inspectPort)

  return inspectPort
}

function isInspectorMessage (string) {
  return isUsingInspector() && RegExpPrototypeExec(kInspectMsgRegex, string) !== null
}

module.exports = {
  isUsingInspector,
  getInspectPort,
  isInspectorMessage
}
