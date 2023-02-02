'use strict'

const replaceAll = require('string.prototype.replaceall')

exports.hardenRegExp = (re) => re
exports.ArrayFrom = (it, mapFn) => Array.from(it, mapFn)
exports.ArrayIsArray = Array.isArray
exports.ArrayPrototypeConcat = (arr, ...el) => arr.concat(...el)
exports.ArrayPrototypeFilter = (arr, fn) => arr.filter(fn)
exports.ArrayPrototypeFind = (arr, fn) => arr.find(fn)
exports.ArrayPrototypeForEach = (arr, fn, thisArg) => arr.forEach(fn, thisArg)
exports.ArrayPrototypeIncludes = (arr, el, fromIndex) => arr.includes(el, fromIndex)
exports.ArrayPrototypeJoin = (arr, str) => arr.join(str)
exports.ArrayPrototypeMap = (arr, mapFn) => arr.map(mapFn)
exports.ArrayPrototypePop = arr => arr.pop()
exports.ArrayPrototypePush = (arr, ...el) => arr.push(...el)
exports.ArrayPrototypeReduce = (arr, fn, originalVal) => arr.reduce(fn, originalVal)
exports.ArrayPrototypeShift = arr => arr.shift()
exports.ArrayPrototypeSlice = (arr, offset) => arr.slice(offset)
exports.ArrayPrototypeSome = (arr, fn) => arr.some(fn)
exports.ArrayPrototypeSort = (arr, fn) => arr.sort(fn)
exports.ArrayPrototypeSplice = (arr, offset, len, ...el) => arr.splice(offset, len, ...el)
exports.ArrayPrototypeUnshift = (arr, ...el) => arr.unshift(...el)
exports.Boolean = Boolean
exports.Error = Error
exports.ErrorCaptureStackTrace = (...args) => Error.captureStackTrace(...args)
exports.FunctionPrototype = Function.prototype
exports.FunctionPrototypeBind = (fn, obj, ...args) => fn.bind(obj, ...args)
exports.FunctionPrototypeCall = (fn, obj, ...args) => fn.call(obj, ...args)
exports.MathMax = (...args) => Math.max(...args)
exports.Number = Number
exports.NumberIsInteger = Number.isInteger
exports.NumberIsNaN = Number.isNaN
exports.NumberParseInt = (str, radix) => Number.parseInt(str, radix)
exports.NumberMIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER
exports.NumberMAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER
exports.ObjectAssign = (target, ...sources) => Object.assign(target, ...sources)
exports.ObjectCreate = obj => Object.create(obj)
exports.ObjectDefineProperties = (obj, props) => Object.defineProperties(obj, props)
exports.ObjectDefineProperty = (obj, key, descr) => Object.defineProperty(obj, key, descr)
exports.ObjectEntries = obj => Object.entries(obj)
exports.ObjectFreeze = obj => Object.freeze(obj)
exports.ObjectGetOwnPropertyDescriptor = (obj, key) => Object.getOwnPropertyDescriptor(obj, key)
exports.ObjectGetPrototypeOf = obj => Object.getPrototypeOf(obj)
exports.ObjectIsExtensible = obj => Object.isExtensible(obj)
exports.ObjectPrototypeHasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property)
exports.ObjectSeal = (obj) => Object.seal(obj)
exports.ReflectApply = (target, self, args) => Reflect.apply(target, self, args)
exports.Promise = Promise
exports.PromiseAll = iterator => Promise.all(iterator)
exports.PromisePrototypeThen = (promise, thenFn, catchFn) => promise.then(thenFn, catchFn)
exports.PromiseResolve = val => Promise.resolve(val)
exports.PromiseRace = val => Promise.race(val)
exports.Proxy = Proxy
exports.RegExp = RegExp
exports.RegExpPrototypeSymbolSplit = (reg, str) => reg[Symbol.split](str)
exports.SafeArrayIterator = class ArrayIterator {constructor (array) { this.array = array }[Symbol.iterator] () { return this.array.values() }}
exports.SafeMap = Map
exports.SafePromiseAll = (array, mapFn) => Promise.all(mapFn ? array.map(mapFn) : array)
exports.SafePromiseAllReturnArrayLike = (array, mapFn) => Promise.all(mapFn ? array.map(mapFn) : array)
exports.SafePromiseRace = (array, mapFn) => Promise.race(mapFn ? array.map(mapFn) : array)
exports.SafeSet = Set
exports.SafeWeakMap = WeakMap
exports.SafeWeakSet = WeakSet
exports.String = String
exports.StringPrototypeEndsWith = (haystack, needle, index) => haystack.endsWith(needle, index)
exports.StringPrototypeIncludes = (str, needle) => str.includes(needle)
exports.StringPrototypeIndexOf = (str, needle, offset) => str.indexOf(needle, offset)
exports.StringPrototypeMatch = (str, reg) => str.match(reg)
exports.StringPrototypeRepeat = (str, times) => str.repeat(times)
exports.StringPrototypeReplace = (str, search, replacement) =>
  str.replace(search, replacement)
exports.StringPrototypeReplaceAll = replaceAll
exports.StringPrototypeStartsWith = (haystack, needle, index) => haystack.startsWith(needle, index)
exports.StringPrototypeSlice = (str, ...args) => str.slice(...args)
exports.StringPrototypeSplit = (str, search, limit) => str.split(search, limit)
exports.StringPrototypeSubstring = (str, ...args) => str.substring(...args)
exports.StringPrototypeToUpperCase = str => str.toUpperCase()
exports.StringPrototypeTrim = str => str.trim()
exports.Symbol = Symbol
exports.SymbolFor = repr => Symbol.for(repr)
exports.ReflectApply = (target, self, args) => Reflect.apply(target, self, args)
exports.ReflectConstruct = (target, args, newTarget) => Reflect.construct(target, args, newTarget)
exports.ReflectGet = (target, property, receiver) => Reflect.get(target, property, receiver)
exports.RegExpPrototypeExec = (reg, str) => reg.exec(str)
exports.RegExpPrototypeSymbolReplace = (regexp, str, replacement) =>
  regexp[Symbol.replace](str, replacement)
