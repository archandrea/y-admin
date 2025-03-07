/**
 * @description 函数防抖
 * @param {Function} func - 需要防抖的函数
 * @param {number} wait - 防抖延迟时间(ms)
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 经过防抖处理的函数
 * @example
 * const debouncedFn = debounce(() => {
 *   console.log('处理函数')
 * }, 300, false)
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 计算距离上一次触发时间的时间间隔
    const last = +new Date() - timestamp

    // 如果间隔小于设定时间且大于0，重新设定定时器
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

/**
 * @description 函数节流
 * @param {Function} fn - 需要节流的函数
 * @param {number} wait - 节流时间间隔(ms)
 * @returns {Function} 经过节流处理的函数
 * @example
 * const throttledFn = throttle(() => {
 *   console.log('处理函数')
 * }, 300)
 */
export function throttle(fn, wait) {
  let time;
  let pre = 0;
  return function (...args) {
    const this_ = this
    // 获取当前时间戳
    const cur = +new Date()
    // 计算剩余等待时间
    const remaining = wait - (cur - pre)
    
    if (remaining <= 0) {
      // 如果没有剩余时间，立即执行
      pre = cur
      fn.apply(this_, args)
      // 清除可能存在的定时器
      if (time) {
        clearTimeout(time)
        time = null
      }
    } else if (!time) {
      // 设置定时器，在剩余时间后执行
      time = setTimeout(() => {
        pre = +new Date()
        time = null
        fn.apply(this_, args)
      }, remaining)
    }
  }
}

/**
 * @description 二分查找算法
 * @param {Array} list - 要搜索的有序数组
 * @param {*} value - 要查找的值
 * @param {string} [prop] - 如果数组元素是对象，指定用于比较的属性
 * @returns {number} 目标值的索引或最接近的较小值的索引
 * @example
 * // 简单数组查找
 * const idx = binarySearch([1,3,5,7,9], 5) // 返回 2
 * // 对象数组查找
 * const idx = binarySearch([{age:1},{age:3}], 3, 'age') // 返回 1
 */
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

// 获取文档宽度用于响应式计算
const documentWidth = document.documentElement.clientWidth

/**
 * @description 根据当前屏幕宽度计算响应式尺寸值
 * @param {number} val - 原始尺寸值
 * @param {number} [initWidth=1920] - 初始设计稿宽度
 * @returns {number} 计算后的响应式尺寸值
 * @example
 * const fontSize = nowSize(16) // 根据屏幕宽度计算字体大小
 */
export function nowSize(val, initWidth = 1920) {
  return val * (documentWidth / initWidth);
}

/**
 * @description 为元素添加CSS类名
 * @param {HTMLElement} ele - 目标DOM元素
 * @param {string} cls - 要添加的类名
 * @example
 * addClass(document.body, 'dark-theme')
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * @description 移除元素的CSS类名
 * @param {HTMLElement} ele - 目标DOM元素
 * @param {string} cls - 要移除的类名
 * @example
 * removeClass(document.body, 'dark-theme')
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @description 检查元素是否包含指定的CSS类名
 * @param {HTMLElement} ele - 目标DOM元素
 * @param {string} cls - 要检查的类名
 * @returns {boolean} 是否包含指定类名
 * @example
 * if (hasClass(document.body, 'dark-theme')) {
 *   // 执行操作
 * }
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * @description 触发文件上传并处理选择结果
 * @param {Object} option - input元素的配置选项
 * @param {Function} callback - 文件选择后的回调函数
 * @example
 * uploadFile({
 *   accept: '.jpg,.png',
 *   multiple: true
 * }, (files) => {
 *   console.log('选择的文件:', files)
 * })
 */
export function uploadFile(option, callback) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '*'
  input.multiple = false; // 是否允许多选
  
  // 应用自定义配置
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

/**
 * @description 文件下载函数(防抖处理)
 * @param {string} url - 下载地址
 * @param {boolean} [flag=true] - 是否添加baseURL前缀
 * @param {Function} [callback] - 下载完成后的回调函数
 * @example
 * downloadFile('/api/file/123', true, (url) => {
 *   console.log('文件下载完成:', url)
 * })
 */
export const downloadFile = debounce(function (url, flag = true, callback) {
  window.open(flag ? process.env.VUE_APP_BASE_API + url : url, '_blank')
  callback && callback(url)
}, 1000, true)

/**
 * @description 将对象转换为URL查询字符串
 * @param {Object} query - 查询参数对象
 * @returns {string} 格式化后的查询字符串
 * @example
 * const str = getQueryString({name: 'test', age: 18})
 * // 返回: 'name=test&age=18'
 */
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

/**
 * @description 从字符串中提取模板参数
 * @param {string} str - 要解析的字符串
 * @param {RegExp} [reg=/\$\{([^}(${)])+?\}/g] - 匹配参数的正则表达式
 * @returns {Array} 匹配到的参数数组
 * @example
 * const params = extractParamsFromStr('Hello ${name}, age: ${age}')
 * // 返回匹配到的 ${name} 和 ${age} 数组
 */
export function extractParamsFromStr(str, reg = /\$\{([^}(${)])+?\}/g) {
  if (!str?.matchAll) {
    return []
  }
  const matches = Array.from(str.matchAll(reg))
  return matches
}

/**
 * @description 生成随机ID（简版）
 * @param {number} n - 随机ID的长度
 * @returns {string} 随机ID
 * @example
 * const id = generateId() // 返回一个8位随机ID
 */
// TODO: 生成随机ID（复杂版）
export function generateId(n = 8) {
  let id = ''
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < n; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}