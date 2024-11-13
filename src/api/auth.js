import { get, post } from '@/http/request'

// 登陆API

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 返回登录请求的Promise对象
 */
export function login(data) {
  return post('/login', data)
}

/**
 * 用户登出
 * @returns {Promise} 返回登出请求的Promise对象
 */
export function logout() {
  return get('/logout')
}

/**
 * 获取验证码图片地址
 * @returns {string} 返回验证码图片的完整URL地址
 */
export function getCodeSrc() {
  return process.env.VUE_APP_BASE_API + '/getcode?_t=' + new Date().getTime()
}

/**
 * 获取当前登录用户信息
 * @returns {Promise} 返回用户信息请求的Promise对象
 */
export function getUserInfo() {
  return get('/userInfo')
}