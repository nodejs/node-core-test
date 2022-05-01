'use strict'

const replaceAll = require('string.prototype.replaceall')

exports.ArrayFrom = (it, mapFn) => Array.from(it, mapFn)
exports.ArrayPrototypeFilter = (arr, fn) => arr.filter(fn)
exports.ArrayPrototypeForEach = (arr, fn, thisArg) => arr.forEach(fn, thisArg)
exports.ArrayPrototypeIncludes = (arr, el, fromIndex) => arr.includes(el, fromIndex)
exports.ArrayPrototypeJoin = (arr, str) => arr.join(str)
exports.ArrayPrototypePush = (arr, ...el) => arr.push(...el)
exports.ArrayPrototypeShift = arr => arr.shift()
exports.ArrayPrototypeSlice = (arr, offset) => arr.slice(offset)
exports.ArrayPrototypeSort = (arr, fn) => arr.sort(fn)
exports.ArrayPrototypeUnshift = (arr, ...el) => arr.unshift(...el)
exports.Error = Error
exports.ErrorCaptureStackTrace = (...args) => Error.captureStackTrace(...args)
exports.FunctionPrototype = Function.prototype
exports.FunctionPrototypeBind = (fn, obj, ...args) => fn.bind(obj, ...args)
exports.Number = Number
exports.ObjectCreate = obj => Object.create(obj)
exports.ObjectDefineProperties = (obj, props) => Object.defineProperties(obj, props)
exports.ObjectDefineProperty = (obj, key, descr) => Object.defineProperty(obj, key, descr)
exports.ObjectEntries = obj => Object.entries(obj)
exports.ObjectGetOwnPropertyDescriptor = (obj, key) => Object.getOwnPropertyDescriptor(obj, key)
exports.ObjectIsExtensible = obj => Object.isExtensible(obj)
exports.ObjectPrototypeHasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property)
exports.ReflectApply = (target, self, args) => Reflect.apply(target, self, args)
exports.Promise = Promise
exports.SafeMap = Map
exports.SafeSet = Set
exports.SafeWeakMap = WeakMap
exports.StringPrototypeMatch = (str, reg) => str.match(reg)
exports.StringPrototypeReplace = (str, search, replacement) =>
  str.replace(search, replacement)
exports.StringPrototypeReplaceAll = replaceAll
exports.StringPrototypeStartsWith = (haystack, needle, index) => haystack.startsWith(needle, index)
exports.StringPrototypeSplit = (str, search, limit) => str.split(search, limit)
exports.Symbol = Symbol
exports.SymbolFor = repr => Symbol.for(repr)
exports.RegExpPrototypeExec = (reg, str) => reg.exec(str)
exports.RegExpPrototypeSymbolReplace = (regexp, str, replacement) =>
  regexp[Symbol.replace](str, replacement)
