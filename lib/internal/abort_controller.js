'use strict'

if (typeof AbortController === 'undefined') {
  // Node.js AbortController implementation is behind a CLI flag.
  // This is a minimal mock to make the code work if the native
  // implementation in not available.
  module.exports = {
    AbortController: class AbortController {
      #eventListeners = new Set()
      signal = {
        aborted: false,
        addEventListener: (_, listener) => {
          this.#eventListeners.add(listener)
        },
        removeEventListener: (_, listener) => {
          this.#eventListeners.delete(listener)
        }
      }

      abort () {
        this.signal.aborted = true
        this.#eventListeners.forEach(listener => listener())
      }
    }
  }
} else {
  module.exports = {
    AbortController
  }
}
