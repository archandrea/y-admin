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

export function throttle(fn, wait) {
  let time;
  let pre = 0;
  return function (...args) {
    // 保存this
    const this_ = this
    // 获取当前时间
    const cur = +new Date()
    // 每次都计算剩余时间
    const remaining = wait - (cur - pre)
    // 不用等了就直接执行
    if (remaining <= 0) {
      pre = cur
      fn.apply(this_, args)
      // 考虑到之前可能还有定时器没执行，清除定时器并重置id
      if (time) {
        clearTimeout(time)
        time = null
      }
    } else if (!time) {
      time = setTimeout(() => {
        // 记录当前最新的时间
        pre = +new Date()
        // 定时器会在wait后执行，执行完毕清空time
        time = null
        fn.apply(this_, args)
        // 根据剩余时间执行定时器
      }, remaining)
    }
  }
}

// 二分法查找
// 返回前一个或当前值的idx，必须传入升序排序的list
export function binarySearch(list, value, prop) {
  let start = 0
  let end = list.length - 1
  let mid = Math.ceil(list.length / 2)
  let item = prop ? list[mid][prop] : list[mid]

  while (start < end) {
    if (value === item) {
      return mid
    } else if (value > item) {
      start = mid + 1
    } else {
      end = mid - 1
    }
    mid = Math.ceil((start + end) / 2)
    item = prop ? list[mid][prop] : list[mid]
  }

  if (value >= item) {
    return mid
  } else {
    return mid - 1
  }
}



const documentWidth = document.documentElement.clientWidth

// 用于计算echarts配置项的尺寸值
export function nowSize(val, initWidth = 1920) {
  return val * (documentWidth / initWidth);
}


/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
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

export const downloadFile = debounce(function (url, flag = true, callback) {
  window.open(flag ? process.env.VUE_APP_BASE_API + url : url, '_blank')
  callback && callback(url)
}, 1000, true)


export function getQueryString(query) {
  let res = ''
  for (const key in query) {
    if (query[key]) {
      res += `${key}=${query[key]}&`
    }
  }

  if (res[res.length - 1] === '&') {
    res = res.substr(0, res.length - 1)
  }

  return res
}

export function extractParamsFromStr(str, reg = /\$\{([^}(${)])+?\}/g) {
  if (!str?.matchAll) {
    return []
  }
  const matches = Array.from(str.matchAll(reg))
  return matches
}