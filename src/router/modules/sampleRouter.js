/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const sampleRouter = {
  // TODO : 1 Level
  path: '/sample',
  component: Layout,
  redirect: 'noredirect',
  name: 'sample',
  meta: {
    title: 'sample',
    icon: 'component'
  },
  // TODO : 2 Level
  children: [
    // 기초 정보 메뉴
    {
      path: 'edit',
      component: () => import('@/pages/sample/edit'),
      name: 'edit',
      meta: { title: 'editSample' }
    },
  ]
}

export default sampleRouter
