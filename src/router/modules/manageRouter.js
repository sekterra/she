/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const manageRouter = {
  // TODO : 1 Level
  path: '/manage',
  component: Layout,
  redirect: '/manage/process/',
  name: 'management',
  meta: {
    title: 'management',
    icon: 'peoples'
  },
  // TODO : 2 Level
  children: [
    // 기초 정보 메뉴
    {
      path: 'process',
      component: () => import('@/router/routeLevel'), 
      name: 'process',
      meta: { title: 'process' },
      redirect: '/manage/process/process',
      // TODO : 3 Level
      children: [
        {
          path: 'process',
          component: () => import('@/pages/manage/process/process'),
          name: 'process',
          meta: { title: 'process' }
        }
      ]
    }
  ]
}

export default manageRouter
