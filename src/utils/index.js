/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}



const documentWidth = document.documentElement.clientWidth

// 用于计算echarts配置项的尺寸值
export function nowSize(val, initWidth = 1920) {
  return val * (documentWidth / initWidth);
}

export function uploadFile(option, callback) {
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = '*'
  input.multiple = false; // 多选项
  for (const key in option) {
    input[key] = option[key]
  }

  input.onchange = async (e) => {
    input.blur()
    if (callback && typeof callback === 'function') {
      await callback(input.files)
    }
    input.remove()
  }
  input.click()
}