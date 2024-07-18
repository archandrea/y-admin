import { debounce } from '@/utils'

const debouncedHandlers = {}

export default {
  inserted(el, binding) {
    const { evtHandler, delay = 800, immediate = true } = binding.value

    let fn
    if (typeof (fn = binding.value) === 'function' ||
      typeof (fn = evtHandler) === 'function') {
      const debounced = debounce(fn, delay, immediate)
      el.addEventListener('click', debounced)
      debouncedHandlers.click = debounced
    } else {
      for (const evt in evtHandler) {
        const debounced = debounce(evtHandler[evt], delay, immediate)
        el.addEventListener(evt, debounced)
        debouncedHandlers[evt] = debounced
      }
    }
  },
  unbind(el, binding) {
    for (const evt in debouncedHandlers) {
      el.removeEventListener(evt, debouncedHandlers[evt])
    }
  }
}
