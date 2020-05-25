import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Toast } from "vant"

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 每个请求头都加上token
      config.headers['access-token'] = `${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 请求响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code != 200) {
      // 401 token 失效
      if (res.code == 30001) {
        // to re-login
        Toast('您的身份认证已过期，请重新登陆！')

        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })

      } else if(res.code ===30003) {
        Toast.fail(res.message)
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } else if(res.code == 30000) {
        Toast.fail(res.message)
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } else {
        Toast.fail(res.message)
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const err = error.response.data
    console.log(err)
    // token失效
    if (err.code === 30001) {
      // to re-login
      Toast('您的身份认证已过期，请重新登陆！')

      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    } else {
      Toast.fail(err.message)
    }

    return Promise.reject(error)
  }
)

export default service
