import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const handleRequestHeader = (config) => {
  return config
}

export const handleAuth = (config) => {
  return config
}

export const handleNetworkError = (errStatus) => {
  console.log('network-error', errStatus)
  let errMessage
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = '错误的请求'
        break
      // case 401:
      //   errMessage = '无权限访问，请重新登陆'
      //   break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误，未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${errStatus}`
    }
  } else {
    errMessage = `无法连接到服务器！`
  }
  handleErrMsg(errMessage)
}

export const handleAuthError = (response) => {
  console.log('auth-error', response.data.code)
  const errMap = {
    '0': '验证失效，请重新登陆'
  }
  const errorCode = response.data.code
  if (Object.prototype.hasOwnProperty.call(errMap, errorCode)) {
    Message({
      showClose: true,
      message: errMap[errorCode],
      type: 'error',
      duration: 1200,
      onClose: () => {
        store.dispatch('user/logout')
      }
    })
    return false
  }
  return true
}

export const handleGeneralError = (errno, errmsg) => {
  console.log('general-error', errno, errmsg)
  if (errno != 1) {
    handleErrMsg(errmsg)
    return false
  }
  return true
}

export const handleErrMsg = (msg) => {
  if (msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'error',
      duration: 1500,
    })
  }
}