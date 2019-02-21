/* eslint-disable */
import { loginByUsername, logout, getUserInfo, loginByUserAccount, getUserMenus } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER: (state, user) => {
      state.user = user
    },
  },

  actions: {
    // 사용자 이름 로그인
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 사용자 계정 로그인
    LoginByUserAccount({ commit }, userInfo) {
      const userId = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUserAccount(userId, userInfo.password).then(response => {
          const data = response.data;
          console.log('::::::::::::: login:' + data + ' :::::::::::::');
          // 원본
          // commit('SET_TOKEN', data.token)
          // setToken(response.data.token)
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve()
        }).catch(error => {
          // console.log(error);
          console.log('::::::::::::: login error:' + error + ' :::::::::::::');
          window.alert('Not login');
          reject(error)
        })
      });
    },

    // 사용자 정보 얻기
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // mockjs는 맞춤 상태 코드를 지원하지 않으므로 다음과 같이 Interupt 가능
            reject('error')
          }
          const data = response.data

          if (data.auths && data.auths.length > 0) { // 사용자 roles 확인
            commit('SET_ROLES', data.auths)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.user.userNm)
          commit('SET_USER', data.user)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)

          // TODO : 원본 소스
          // if (data.roles && data.roles.length > 0) { // 사용자 roles 확인
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }

          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 사용자 계정 로그인
    GetUserMenus({ commit }, state) {
      const userId = this.state.user.user.userId.trim()
      return new Promise((resolve, reject) => {
        getUserMenus(userId).then(response => {
          const data = response.data;
          resolve(data)
        }).catch(error => {
          // console.log(error);
          console.log('::::::::::::: login error:' + error + ' :::::::::::::');
          window.alert('Not login');
          reject(error)
        })
      });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
