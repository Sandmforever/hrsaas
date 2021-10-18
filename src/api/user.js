import request from '@/utils/request'

export function login(data) {

}

export function getInfo(token) {

}

export function logout() {

}

export function reqLogin(data) {
  return request({
    method: 'post',
    url: '/sys/login', // 这里的 /api 由于开发环境所有接口都要加, 通过baseUrl加
    data
  })
}