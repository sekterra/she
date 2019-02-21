/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './components'
import chartsRouter from './charts'
import tableRouter from './table'

const sampleRouter = {
  // TODO : 1 Level
  path: '/sample',
  component: Layout,
  redirect: 'noredirect',
  name: 'sample',
  meta: {
    title: '샘플소스',
    icon: 'component'
  },
  // TODO : 2 Level
  children: [
    // 기초 정보 메뉴
    {
      path: 'autogenerator',
      component: () => import('@/pages/autogenerator/AutoGenerator'),
      name: 'AutoGenerator',          
      meta: { title: '코드생성기', noCache: true }
    },
    {
      path: 'edit',
      component: () => import('@/pages/sample/edit'),
      name: 'edit',
      meta: { title: 'y-Components' }
    },
    componentsRouter,
    chartsRouter,
    tableRouter
  ]
}

export default sampleRouter
