import { debounce } from '@/utils'

const debouncedHandlers = {}

export default {
  inserted(el, binding) {
    const { evtHandler, delay = 800, immediate = true } = binding.value

    if (typeof evtHandler === 'function') {
      const debounced = debounce(evtHandler, delay, immediate)
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
