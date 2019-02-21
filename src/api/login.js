import request from '@/utils/request'
import  selectConfig from '@/js/selectConfig'
import  transactionConfig from '@/js/transactionConfig'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function loginByUserAccount(_userId, _userPwd) {
  const data = {
    userId: _userId,
    userPwd: _userPwd
  }
  return request({
    url: transactionConfig.login.insert.url,
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    // url: '/user/info',
    url: selectConfig.manage.loginuser.get.url,
    method: 'get',
    params: { token }
  })
}

export function getUserMenus(userId) {
  var url = selectConfig.userMenu.get.url + userId
  return request({
    url: url,
    method: 'get'
  })
}

