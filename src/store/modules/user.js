import { reqLogin } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const state = {
  // 一进来优先从缓存中取
  token: getToken() // token字符串
}
// const mutations = {
//   setToken(state, newToken) {
//     state.token = newToken
//   }
// }
const mutations = {
  // 设置token
  setToken(state, newToken) {
    state.token = newToken
    // 设置了 token 的同时, 同步到本地cookies中
    setToken(newToken)
  }
}
const actions = {
  login(context, data) {
    return new Promise((resolve, reject) => {
      // 发送登录请求
      reqLogin(data).then(res => {
        const newToken = res.data
        context.commit('setToken', newToken)
        // 成功resolve
        resolve(res)
      }).catch(error => {
        // 失败reject
        reject(error)
      })
    })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}