import axios from 'axios'

const instance = axios.create({
  // 开发环境, 找 env.development, 找 VUE_APP_BASE_API 变量
  // 生产环境, 找 env.production,  找 VUE_APP_BASE_API 变量
  baseURL: process.env.VUE_APP_BASE_API, // 环境变量
  timeout: 5000 // request timeout
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  const { message, success } = res
  if (!success) {
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message)) // 业务已经错误了, 应该进catch
  }
  return res
}, function (error) {
  // 对响应错误做点什么, 服务器错误, 400, 404, 500
  console.dir(error) // 便于调试
  Message.error(error.message) // 提示错误消息
  return Promise.reject(error)
})




// 创建了一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
})
// axios的请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
// export default service // 导出axios实例
export default instance