/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const manageRouter = {
  // TODO : 1 Level
  path: '/manage',
  component: Layout,
  redirect: '/manage/process/',
  name: 'management',
  meta: {
    title: '시스템관리',
    icon: 'peoples'
  },
  // TODO : 2 Level
  children: [
    // 기초 정보 메뉴
    // {
    //   path: 'process',
    //   component: () => import('@/router/routeLevel'), 
    //   name: 'process',
    //   meta: { title: '작업공정' },
    //   redirect: '/manage/process/process',
    //   // TODO : 3 Level
    //   children: [
    //     {
    //       path: 'process',
    //       component: () => import('@/pages/manage/process/process'),
    //       name: 'process',
    //       meta: { title: '작업공정', navi: '시스템관리 > ' }
    //     }
    //   ]
    // },
    // 메뉴 관리
    {
      path: 'menuManage',
      component: () => import('@/router/routeLevel'), 
      name: 'menuManage',
      meta: { title: 'menu' },
      redirect: '/manage/menuManage/menu',
      // TODO : 3 Level
      children: [
        // 메뉴 관리
        {
          path: 'menu',
          component: () => import('@/pages/manage/menuManage/menu'),
          name: 'menu',
          meta: { title: 'menu' }
        },
        // 권한 관리
        {
          path: 'auth',
          component: () => import('@/pages/manage/authManage/auth'),
          name: 'auth',
          meta: { title: 'auth' }
        },
      ]
    },
    // 기초 정보 메뉴
    {
      path: 'userManage',
      component: () => import('@/router/routeLevel'), 
      name: 'userManage',
      meta: { title: '사용자' },
      redirect: '/manage/userManage/user',
      // TODO : 3 Level
      children: [
        {
          path: 'user',
          component: () => import('@/pages/manage/userManage/user'),
          name: 'user',
          meta: { title: '사용자', navi: '시스템관리 > ' }
        },
        {
          path: 'userMenu',
          component: () => import('@/pages/manage/userManage/userMenu'),
          name: 'userMenu',
          meta: { title: '사용자 메뉴', navi: '시스템관리 > ' }
        }
      ]
    },
  ]
}

export default manageRouter
