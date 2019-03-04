/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const safeRouter = {
  path: '/baseInfo',
  component: Layout,
  redirect: '/baseInfo',
  name: 'baseInfo',
  meta: {
    title: '기초정보',
    icon: 'peoples'
  },
  children: [
    {
      path: 'workingEnvManage',
      component: () => import('@/router/routeLevel'), 
      name: 'workingEnvManage',
      meta: { title: '유해인자' },
      redirect: '/hea/workingEnvManage/hazard',
      // TODO : 3 Level
      children: [
        {
          path: 'hazard',
          component: () => import('@/pages/hea/workingEnvManage/hazard'),
          name: 'hazard',
          meta: { title: '유해인자', navi: '기초정보 >' },
        }
      ]
    },
    {
      path: 'process',
      component: () => import('@/router/routeLevel'), 
      name: 'process',
      meta: { title: '작업공정' },
      redirect: '/manage/process/process',
      // TODO : 3 Level
      children: [
        {
          path: 'process',
          component: () => import('@/pages/manage/process/process'),
          name: 'process',
          meta: { title: '작업공정', navi: '기초정보 > ' }
        }
      ]
    },
    {
      path: 'measureInfo',
      component: () => import('@/router/routeLevel'), 
      name: 'measureInfo',
      meta: { title: '측정정보' },
      redirect: '/baseInfo/baseInfo/index',
      // TODO : 3 Level
      children: [
        {
          path: 'measurPlace',
          component: () => import('@/pages/baseInfo/baseInfo/index'),
          name: 'measurPlace',
          meta: { title: '측정장소', navi: '기초정보 > ' }
        },
        {
          path: 'measurResult',
          component: () => import('@/pages/baseInfo/baseInfo/index'),
          name: 'measurResult',
          meta: { title: '측정결과', navi: '기초정보 > ' }
        }
      ]
    },
    {
      path: 'chemical',
      component: () => import('@/router/routeLevel'), 
      name: 'chemical',
      meta: { title: '화학물질' },
      redirect: '/baseInfo/chemical/chemicals',
      // TODO : 3 Level
      children: [
        {
          path: 'chemicals',
          component: () => import('@/pages/baseInfo/chemical/chemicals'),
          name: 'chemicals',
          meta: { title: '화학물질', navi: '기초정보 > ' }
        }
      ]
    },
    {
      path: 'chemprod',
      component: () => import('@/router/routeLevel'), 
      name: 'chemprod',
      meta: { title: '취급물질' },
      redirect: '/baseInfo/baseInfo/chemprod',
      // TODO : 3 Level
      children: [
        {
          path: 'chemprod',
          component: () => import('@/pages/baseInfo/chemprod/chemprod'),
          name: 'chemprod',
          meta: { title: '취급물질', navi: '기초정보 > ' }
        }
      ]
    },
    {
      path: 'component',
      component: () => import('@/router/routeLevel'), 
      name: 'component',
      meta: { title: '구성품' },
      redirect: '/baseInfo/baseInfo/index',
      // TODO : 3 Level
      children: [
        {
          path: 'component',
          component: () => import('@/pages/baseInfo/baseInfo/index'),
          name: 'component',
          meta: { title: '구성품', navi: '기초정보 > ' }
        }
      ]
    },
  ]
}

export default safeRouter
