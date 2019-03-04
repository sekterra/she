/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const rsaRouter = {
  // TODO : 1 Level
  path: '/rsa',
  component: Layout,
  redirect: '/rsa',
  name: 'rsa',
  meta: {
    title: '위험성평가',
    icon: 'peoples'
  },
  // TODO : 2 Level
  children: [
    // 기준정보
    {
      path: 'baseinfo',
      component: () => import('@/router/routeLevel'),
      name: 'baseinfo',
      meta: {
        title: '기준정보'
      },
      redirect: '/rsa/basicinfo/chemicalsMst',
      children: [
        {
          path: 'measurPlace',
          component: () => import('@/pages/baseInfo/baseInfo/index'),
          name: 'measurPlace',
          meta: {
            title: '위험성평가',
            navi: '기초정보 > '
          }
        },
        {
          path: 'workArea',
          component: () => import('@/pages/rsa/baseInfo/workArea'),
          name: 'workArea',
          meta: { title: '작업장소', navi: '위험성평가 > 기초정보 >' }
        },
        {
          path: 'assessType',
          component: () => import('@/pages/rsa/baseInfo/assessType'),
          name: 'assessType',
          meta: {
            title: '평가기법 관리',
            navi: '위험성평가 > 기준정보 >'
          }
        },
        {
          path: 'riskHazard',
          component: () => import('@/pages/rsa/baseInfo/riskHazard'),
          name: 'riskHazard',
          meta: {
            title: '유해위험요인 관리',
            navi: '위험성평가 > 기준정보 >'
          }
        },
      ],
    },
    {
      path: 'assess',
      component: () => import('@/router/routeLevel'),
      name: 'assess',
      meta: {
        title: '평가계획 수립'
      },
      redirect: '/rsa/assess/assessEstablish',
      children: [
        {
          path: 'assessEstablish',
          component: () => import('@/pages/rsa/assess/assessEstablish'),
          name: 'assessEstablish',
          meta: { title: '평가계획 수립 관리', navi: '평가계획 수립 > ' }
        },
      ],
    },
    {
      path: 'assessAction',
      component: () => import('@/router/routeLevel'),
      name: 'assessAction',
      meta: {
        title: '위험성평가 실행'
      },
      redirect: '/rsa/assess/assessAction',
      children: [
        {
          path: 'assessAction',
          component: () => import('@/pages/rsa/assess/assessAction'),
          name: 'assessAction',
          meta: { title: '위험성평가 실행 관리', navi: '위험성평가 실행 >' }
        },
      ],
    },
    {
      path: 'assessResult',
      component: () => import('@/router/routeLevel'),
      name: 'assessResult',
      meta: {
        title: '위험성평가 결과'
      },
      redirect: '/rsa/assess/assessResult',
      children: [
        {
          path: 'assessResult',
          component: () => import('@/pages/rsa/assess/assessResult'),
          name: 'assessResult',
          meta: { title: '위험성평가 결과 관리', navi: '위험성평가 결과 >' }
        },
      ],
    },
    {
      path: 'jobRiskBook',
      component: () => import('@/router/routeLevel'),
      name: 'jobRiskBook',
      meta: {
        title: '위험등록부'
      },
      redirect: '/rsa/jobRiskBook/jobRiskBookTab',
      children: [
        {
          path: 'jobRiskBookTab',
          component: () => import('@/pages/rsa/jobRiskBook/jobRiskBookTab'),
          name: 'jobRiskBookTab',
          meta: { title: '위험등록부', navi: '' }
        },
      ],
    },
    {
      path: 'assessResultTotal',
      component: () => import('@/router/routeLevel'),
      name: 'assessResultTotal',
      meta: {
        title: '평가결과집계'
      },
      redirect: '/rsa/assess/assessResult',
      children: [
        {
          path: 'assessResult',
          component: () => import('@/pages/rsa/assess/assessResult'),
          name: 'assessResult',
          meta: { title: '평가결과집계 관리', navi: '평가결과집계 >' }
        },
      ],
    },
    {
      path: 'workMeasureResult',
      component: () => import('@/router/routeLevel'),
      name: 'workMeasureResult',
      meta: {
        title: '작업환경측정 결과'
      },
      redirect: '/rsa/workMeasureResult/workMeasureResultTab',
      children: [
        {
          path: 'workMeasureResultTab',
          component: () => import('@/pages/rsa/workMeasureResult/workMeasureResultTab'),
          name: 'workMeasureResultTab',
          meta: { title: '작업환경측정 결과', navi: '' }
        },
      ],
    },
  ]
}

export default rsaRouter
