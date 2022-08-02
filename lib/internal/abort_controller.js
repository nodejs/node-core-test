'use strict'

if (typeof AbortController === 'undefined') {
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
    AbortController,
    AbortSignal
  }
}
