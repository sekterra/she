/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const safeRouter = {
  path: '/dropzone',
  component: Layout,
  redirect: '/dropzone',
  name: 'safe',
  meta: {
    title: 'safe',
    icon: 'peoples'
  },
  children: [
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'dropzone',
      meta: { title: 'safe' },
      redirect: '/hea/baseInfo/baseInfoOrgan',
      // children: [
      //   {
      //     path: 'baseInfoOrgan',
      //     component: () => import('@/pages/hea/BaseInfo/BaseInfoOrgan'),
      //     name: 'baseInfoOrgan',
      //     meta: { title: 'baseInfoOrgan' }
      //   },
      //   {
      //     path: 'disease',
      //     component: () => import('@/pages/hea/BaseInfo/Disease'),
      //     name: 'disease',
      //     meta: { title: 'disease' },
      //   },
      // ]
    },
  // {
  //   path: 'menu2',
  //   name: 'Menu2',
  //   component: () => import('@/views/nested/menu2/index'),
  //   meta: { title: 'menu2' }
  // }
  ]
}

export default safeRouter
