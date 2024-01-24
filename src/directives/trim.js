const evt = new Event('input', { bubbles: true, cancelable: true })

export default {
  inserted: el => {
    let inputEle = getInput(el)

    const handler = function (event) {
      const newVal = event.target.value.trim()
      if (event.target.value != newVal) {
        event.target.value = newVal
        inputEle.dispatchEvent(evt)
      }
    }
    el.inputEle = inputEle
    el._blurHandler = handler
    inputEle.addEventListener('blur', handler)
  },
  unbind(el) {
    const { inputEle } = el
    inputEle.removeEventListener('blur', el._blurHandler)
  }
}

function getInput(el) {
  let inputEle
  if (el.tagName !== 'INPUT' || el.tagName !== 'TEXTAREA') {
    inputEle = el.querySelector('input') || el.querySelector('textarea')
  } else {
    inputEle = el
  }
  return inputEle
}
