import { get, post } from '@/http/request'
import { auth } from '@/api/PATH'

// 登陆API

/**
 * 登录
 */
export function login(data) {
  return post(auth.login, data)
}

// 登出
export function logout() {
  return get(auth.logout)
}

// 获取验证码
export function getCodeSrc() {
  return process.env.VUE_APP_BASE_API + '/getcode?_t=' + new Date().getTime()
}

// 获取个人详情
export function getUserInfo() {
  return get(auth.userInfo)
}