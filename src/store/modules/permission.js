/* eslint-disable */
import { asyncRouterMap, constantRouterMap } from '@/router'
import _ from 'lodash'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */

function hasPermission(_menus, _path) {
  var path = _path
  if (path.lastIndexOf('/') === path.length - 1) path = path.slice(0, -1)
  return _menus.some((_menu) => {
    var frontEndUrl = _menu.frontEndUrl;
    if (frontEndUrl.lastIndexOf('/') === frontEndUrl.length - 1) frontEndUrl = frontEndUrl.slice(0, -1)
    return path === frontEndUrl
  });
}

// TODO : 원본
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 비동기식 라우팅 테이블을 반복적으로 필터링하고 사용자 역할 사용 권한과 일치하는 라우팅 테이블 반환
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, _menus, _parentPath) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }

    let path = ''
    if (typeof _parentPath != 'undefined')  path = _parentPath + '/' + tmp.path
    else path = tmp.path
    var has = true;
    // has = hasPermission(_menus, path);
    console.log('path:' + path + ', hasPermission:' + has);
    if (has) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, _menus, path)
      }
      res.push(tmp)
    }
    // if (hasPermission(_menus, path)) res.push(tmp)
    //}
  })

  return res
}
// TODO : 원본
// function filterAsyncRouter(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { _menus }= data
        console.log(JSON.stringify(_menus));
        let accessedRouters
        // accessedRouters = asyncRouterMap
        accessedRouters = filterAsyncRouter(asyncRouterMap, _menus)

        // TODO : 원본소스
        // if (roles.includes('admin')) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
