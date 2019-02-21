/* eslint-disable */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 현재 사용자가 user_info 정보를 가져 왔는지 확인
        store.dispatch('GetUserInfo').then(result => { // user_info 조회
          console.log(':::::::::::::::: GetUserInfo ::::::::::::::::');
          store.dispatch('GetUserMenus').then(_menus => {
            // TODO : 원본 소스
            // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
            store.dispatch('GenerateRoutes', { _menus }).then(() => { // 역할을 기반으로 액세스 가능한 라우팅 테이블 생성
              router.addRoutes(store.getters.addRouters) // 접근 가능한 라우팅 테이블을 동적으로 추가
              next({ ...to, replace: true }) // addRoutes가 완료되었는지 확인하기위한 해킹 메소드 , set the replace: true so the navigation will not leave a history record
            })
            // next();
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
          // window.alert('로그인 성공');          
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } 
      else {
        // 동적으로 권한을 변경할 필요가 없으며, next ()로 권한 판단 삭제
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
