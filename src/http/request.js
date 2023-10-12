import service from './axios.js'

export const get = (url, params, clearFn, headers) => {
  return new Promise((resolve) => {
    service({
      method: 'get',
      url,
      params,
      headers,
    })
      .then((result) => {
        let res
        if (clearFn !== undefined) {
          res = clearFn(result.data)
        } else {
          res = result.data
        }
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const post = async (url, data, params, headers) => {
  return new Promise((resolve) => {
    service({
      method: 'post',
      url,
      data,
      params,
      headers: headers || { 'Content-type': 'multipart/form-data' },
    })
      .then((result) => {
        resolve([null, result.data])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}