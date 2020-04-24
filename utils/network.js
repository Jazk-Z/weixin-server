const axios = require('axios')
const axiosRetry = require('axios-retry')
const https = require('https')
const httpHelper = require('http')
const reqSource = (baseUrl) => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 8000,
    httpAgent: new httpHelper.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true })
  })
  axiosRetry(instance, { retries: 3, retryDelay: () => 1000 })
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      console.log('axios request: ', error)
      return
    }
  )
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log('axios request: ', error)
    }
  )
  const get = async (path, params, headers, opt) => {
    return instance.get(path, {
      ...opt,
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        ...headers
      },
      params
    })
  }
  const post = async (path, data, headers, opt) => {
    return instance.post(path, data, {
      ...opt,
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        ...headers
      }
    })
  }
  const put = async (path, data, headers, opt) => {
    return instance.put(path, data, {
      ...opt,
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        ...headers
      }
    })
  }
  const del = async (path, data, headers, opt) => {
    return instance.delete(path, {
      ...opt,
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        ...headers
      },
      data
    })
  }
  return { get, post, put, del }
}
module.exports = reqSource
