import Vue from 'vue'
import axios from 'axios'
import { handleRequestHeader, handleAuth, handleNetworkError, handleUnauthorized, handleAuthError, handleGeneralError, handleErrMsg } from './handlers.js'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// Full config:  https://github.com/axios/axios#request-config

const config = {
  baseURL: process.env.VUE_APP_BASE_API || '',
  timeout: 5 * 1000, // Timeout
}

// 高封装
const service = axios.create(config)

service.interceptors.request.use(
  (config) => {
    // config = handleRequestHeader(config)
    // config = handleAuth(config)
    // console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    // console.log('axios-response',response)
    if (response.status !== 200) return Promise.reject(response)
    const flag = handleGeneralError(response.data?.code, response.data?.msg)
    if (!flag) return Promise.reject(response)
    return response.data
  },
  (error) => {
    // console.log('axios-response-error',error)
    if (error?.response.status === 401) {
      handleAuthError(error?.response)
    } else {
      handleNetworkError(error?.response.status)
    }
    return Promise.reject(error)
  }
)


// 低封装
const _axios = axios.create(config)

_axios.interceptors.request.use(
  (config) => {
    // config = handleRequestHeader(config)
    // config = handleAuth(config)
    // console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


Object.defineProperties(Vue.prototype, {
  $api: {
    get() {
      return service
    }
  },
  $axios: {
    get() {
      return _axios
    }
  },
})

export default service