/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const envRouter = {
  // TODO : 1 Level
  path: '/env',
  component: Layout,
  redirect: '/env',
  name: 'environment',
  meta: {
    title: '환경',
    icon: 'peoples'
  },
  // TODO : 2 Level
  children: [
    {
      path: 'com',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'com',
      meta: { title: '공용코드' },
      redirect: '/env/common/baseInfo/codeMaster', 
      // TODO : 3 Level
      children: [
        {
          path: 'baseInfo',
          component: () => import('@/pages/env/common/baseInfo/codeMaster'),
          name: 'baseInfo',
          meta: { title: '공용코드', navi: '환경 > 기준정보 >' },
        }
      ] 
    },
    {
      path: 'air',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'air',
      meta: { title: '대기' },
      redirect: '/env/air/baseInfo/codeMaster',
      // TODO : 3 Level
      children: [
        {
          path: 'baseInfo',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'baseInfo',
          meta: { title: '기준정보' },
          redirect: '/env/air/baseInfo/codeMaster',
          // TODO : 4 Level
          children: [
            {
              path: 'codeMaster',
              component: () => import('@/pages/env/air/baseInfo/codeMaster'),
              name: 'codeMaster',
              meta: { title: '대기코드', navi: '환경 > 대기 > 기준정보 >' },
            },
            {
              path: 'testItem',
              component: () => import('@/pages/env/air/baseInfo/testItem'),
              name: 'testItem',
              meta: { title: '검사항목', navi: '환경 > 대기 > 기준정보 >' },
            },
            {
              path: 'outlet',
              component: () => import('@/pages/env/air/baseInfo/outlet'),
              name: 'outlet',
              meta: { title: '배출구', navi: '환경 > 대기 > 기준정보 >' },
            },
            {
              path: 'fuel',
              component: () => import('@/pages/env/air/baseInfo/fuel'),
              name: 'fuel',
              meta: { title: '연료', navi: '환경 > 대기 > 기준정보 >' },
            },
            {
              path: 'ingredient',
              component: () => import('@/pages/env/air/baseInfo/ingredient'),
              name: 'ingredient',
              meta: { title: '원료', navi: '환경 > 대기 > 기준정보 >' },
            }
          ]      
        },
        {
          path: 'facility',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'facility',
          meta: { title: '시설관리' },
          redirect: '/env/air/facility/discharge',
          // TODO : 4 Level
          children: [
            {
              path: 'discharge',
              component: () => import('@/pages/env/air/facility/discharge'),
              name: 'discharge',
              meta: { title: '배출시설', navi: '환경 > 대기 > 시설관리 >' },
            },
            {
              path: 'prevention',
              component: () => import('@/pages/env/air/facility/preventBase'),
              name: 'prevention',
              meta: { title: '방지시설', navi: '환경 > 대기 > 시설관리 >' },
            }
          ]      
        },
        {
          path: 'operationLog',
          component: () => import('@/pages/env/air/operationLog/operationLog'),
          name: 'operationLog',
          meta: { title: '운영관리', navi: '환경 > 대기 >' },
        },
        {
          path: 'operationStatus',
          component: () => import('@/pages/env/air/operationStatus/operationStatus'),
          name: 'operationStatus',
          meta: { title: '운영현황', navi: '환경 > 대기 >' },
        },
      ]      
    },
    {
      path: 'water',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'water',
      meta: { title: '수질' },
      redirect: '/env/water/baseInfo/codeMaster',
      // TODO : 3 Level
      children: [
        {
          path: 'baseInfo',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'baseInfo',
          meta: { title: '기준정보' },
          redirect: '/env/air/baseInfo/codeMaster',
          // TODO : 4 Level
          children: [
            {
              path: 'codeMaster',
              component: () => import('@/pages/env/water/baseInfo/codeMaster'),
              name: 'codeMaster',
              meta: { title: '수질코드', navi: '환경 > 수질 > 기준정보 >' },
            },
            {
              path: 'supply',
              component: () => import('@/pages/env/water/baseInfo/supply'),
              name: 'supply',
              meta: { title: '공급수', navi: '환경 > 수질 > 기준정보 >' },
            },
            {
              path: 'discharge',
              component: () => import('@/pages/env/water/baseInfo/discharge'),
              name: 'discharge',
              meta: { title: '배출수', navi: '환경 > 수질 > 기준정보 >' },
            },
            {
              path: 'testItem',
              component: () => import('@/pages/env/water/baseInfo/testItem'),
              name: 'testItem',
              meta: { title: '검사항목', navi: '환경 > 수질 > 기준정보 >' },
            },
            {
              path: 'monPos',
              component: () => import('@/pages/env/water/baseInfo/monPos'),
              name: 'monPos',
              meta: { title: '측정위치', navi: '환경 > 수질 > 기준정보 >' },
            }
          ]
        },
        {
          path: 'facility',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'facility',
          meta: { title: '시설관리' },
          redirect: '/env/water/facility/prevention',
          // TODO : 4 Level
          children: [
            {
              path: 'prevention',
              component: () => import('@/pages/env/water/facility/preventBase'),
              name: 'prevention',
              meta: { title: '오염방지시설', navi: '환경 > 수질 > 시설관리 >' },
            },
            {
              path: 'wasteDischarge',
              component: () => import('@/pages/env/water/facility/wasteDischarge'),
              name: 'wasteDischarge',
              meta: { title: '폐수배출시설', navi: '환경 > 수질 > 시설관리 >' },
            },
            {
              path: 'pwrMeter',
              component: () => import('@/pages/env/water/facility/pwrMeter'),
              name: 'pwrMeter',
              meta: { title: '전력량계시설', navi: '환경 > 수질 > 시설관리 >' },
            },
            {
              path: 'aerationTank',
              component: () => import('@/pages/env/water/facility/aerationTank'),
              name: 'aerationTank',
              meta: { title: '폭기조시설', navi: '환경 > 수질 > 시설관리 >' },
            },
            {
              path: 'guided',
              component: () => import('@/pages/env/water/facility/guided'),
              name: 'guided',
              meta: { title: '지도점검관리', navi: '환경 > 수질 > 시설관리 >' },
            },
          ]
        },
        {
          path: 'ingrChem',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'ingrChem',
          meta: { title: '원료/약품관리' },
          redirect: '/env/water/ingrChem/ingredient',
          // TODO : 4 Level
          children: [
            {
              path: 'ingredient',
              component: () => import('@/pages/env/water/ingrChem/ingredient'),
              name: 'ingredient',
              meta: { title: '원료(첨가제)', navi: '환경 > 수질 > 원료/약품관리 >' },
            },
            {
              path: 'chemical',
              component: () => import('@/pages/env/water/ingrChem/chemBase'),
              name: 'chemical',
              meta: { title: '약품', navi: '환경 > 수질 > 원료/약품관리 >' }, 
            },
            {
              path: 'chemicalStatus',
              component: () => import('@/pages/env/water/ingrChem/chemicalStatus'),
              name: 'chemicalStatus',
              meta: { title: '약품사용량현황', navi: '환경 > 수질 > 원료/약품관리 >' }, 
            },
          ]
        },
        {
          path: 'operationLog',
          component: () => import('@/pages/env/water/operationLog/operationLog'),
          name: 'operationLog',
          meta: { title: '운영관리', navi: '환경 > 수질 >' },
        },
        {
          path: 'operationStatus',
          component: () => import('@/pages/env/water/operationStatus/operationStatus'),
          name: 'operationStatus',
          meta: { title: '운영현황', navi: '환경 > 수질 >' },
        }
      ]
    },
    {
      path: 'waste',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'waste',
      meta: { title: '폐기물' },
      redirect: '/env/waste/baseInfo/codeMaster',
      // TODO : 3 Level
      children: [
        {
          path: 'baseInfo',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'baseInfo',
          meta: { title: '기준정보' },
          redirect: '/env/waste/baseInfo/codeMaster',
          // TODO : 4 Level
          children: [
            {
              path: 'codeMaster',
              component: () => import('@/pages/env/waste/baseInfo/codeMaster'),
              name: 'codeMaster',
              meta: { title: '폐기물코드', navi: '환경 > 폐기물 > 기준정보 >' },
            },
            {
              path: 'waste',
              component: () => import('@/pages/env/waste/baseInfo/wasteBase'),
              name: 'waste',
              meta: { title: '폐기물', navi: '환경 > 폐기물 > 기준정보 >' },
            },
            {
              path: 'dispoCompany',
              component: () => import('@/pages/env/waste/baseInfo/dispoCompany'),
              name: 'dispoCompany',
              meta: { title: '처리/운반업체', navi: '환경 > 폐기물 > 기준정보 >' },
            },
          ]
        },        
        {          
          path: 'operationLog',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'operationLog',
          meta: { title: '운영관리' },
          redirect: '/env/waste/operationLog/wstGen',
          // TODO : 4 Level
          children: [
            {
              path: 'dispoRequest',
              component: () => import('@/pages/env/waste/operationLog/dispoRequest'),
              name: 'dispoRequest',
              meta: { title: '폐기물처리 요청', navi: '환경 > 폐기물 > 운영관리 >' }
            },
            {
              path: 'dispoResult',
              component: () => import('@/pages/env/waste/operationLog/dispoResult'),
              name: 'dispoResult',
              meta: { title: '폐기물처리 결과', navi: '환경 > 폐기물 > 운영관리 >' }
            },
            {
              path: 'operationLog',
              component: () => import('@/pages/env/waste/operationLog/dailyReport'),
              name: 'operationLog',
              meta: { title: '관리대장', navi: '환경 > 폐기물 > 운영관리 >' },
            },
          ]
        },
        {
          path: 'operationStatus',
          component: () => import('@/router/routeSubLevel'), // Parent router-view
          name: 'operationStatus',
          meta: { title: '운영현황' },
          redirect: '/env/waste/operationStatus/wstGen',
          // TODO : 4 Level
          children: [
            {
              path: 'wstGenStatus',
              component: () => import('@/pages/env/waste/operationStatus/wstGenStatus'),
              name: 'wstGen',
              meta: { title: '폐기물발생', navi: '환경 > 폐기물 > 운영현황 >' },
            },
            {
              path: 'wstDispoStatus',
              component: () => import('@/pages/env/waste/operationStatus/wstDispoStatus'),
              name: 'wstDispoStatus',
              meta: { title: '폐기물처리', navi: '환경 > 폐기물 > 운영현황 >' },
            }
          ]
        }      
      ]
    }
  ]
}

export default envRouter
