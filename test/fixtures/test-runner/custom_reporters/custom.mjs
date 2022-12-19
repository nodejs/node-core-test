// https://github.com/nodejs/node/blob/a1b27b25bb01aadd3fd2714e4b136db11b7eb85a/test/fixtures/test-runner/custom_reporters/custom.mjs
export default async function * customReporter (source) {
  const counters = {}
  for await (const event of source) {
    counters[event.type] = (counters[event.type] ?? 0) + 1
  }
  yield 'custom.mjs '
  yield JSON.stringify(counters)
}
