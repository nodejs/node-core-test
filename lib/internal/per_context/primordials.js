'use strict'

const util = require('util')
const replaceAll = require('string.prototype.replaceall')

exports.ArrayFrom = it => Array.from(it)
// exports.ArrayPrototypeFilter = (arr, fn) => arr.filter(fn)
exports.ArrayPrototypeForEach = (arr, fn) => arr.forEach(fn)
// exports.ArrayPrototypeIncludes = (arr, el) => arr.includes(el)
exports.ArrayPrototypeJoin = (arr, str) => arr.join(str)
exports.ArrayPrototypePush = (arr, el) => arr.push(el)
exports.ArrayPrototypeShift = arr => arr.shift()
exports.ArrayPrototypeSlice = (arr, offset) => arr.slice(offset)
exports.ArrayPrototypeSort = (arr, fn) => arr.sort(fn)
exports.ArrayPrototypeUnshift = (arr, el) => arr.unshift(el)
exports.FunctionPrototype = () => {}
exports.FunctionPrototypeBind = (fn, obj) => fn.bind(obj)
exports.lazyInternalUtilInspect = () => util
exports.Number = Number
exports.ObjectCreate = obj => Object.create(obj)
exports.ObjectDefineProperties = (obj, props) => Object.defineProperties(obj, props)
exports.ObjectEntries = obj => Object.entries(obj)
exports.ReflectApply = (target, self, args) => Reflect.apply(target, self, args)
exports.Promise = Promise
exports.SafeMap = Map
exports.SafeSet = Set
exports.StringPrototypeMatch = (str, reg) => str.match(reg)
// exports.StringPrototypeReplace = (str, search, replacement) =>
//   str.replace(search, replacement)
exports.StringPrototypeReplaceAll = replaceAll
exports.StringPrototypeSplit = (str, search) => str.split(search)
exports.RegExpPrototypeExec = (reg, str) => reg.exec(str)
exports.RegExpPrototypeSymbolReplace = (regexp, str, replacement) =>
  str.replace(regexp, replacement)
