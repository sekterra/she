/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const safeRouter = {
  path: '/saf',
  component: Layout,
  redirect: '/saf',
  name: 'safe',
  meta: {
    title: '안전',
    icon: 'peoples'
  },
  children: [
    // 작업허가서
    {
      path: 'wkod',
      component: () => import('@/router/routeLevel'),
      name: 'wkod',
      meta: { title: '작업허가서' },
      redirect: '/saf/baseinfo/index',
      children: [
        {
          path: 'wkodRequest',
          component: () => import('@/pages/saf/wkod/wkodRequest'),
          name: 'wkodRequest',
          meta: { title: '신청', navi: '안전 > 작업허가서 >', wkodStepCd: 'WKS01' }
        },
        {
          path: 'wkodPublic',
          component: () => import('@/pages/saf/wkod/wkodRequest'),
          name: 'wkodPublic',
          meta: { title: '발행', navi: '안전 > 작업허가서 >', wkodStepCd: 'WKS02' },
        },
        {
          path: 'wkodApproval',
          component: () => import('@/pages/saf/wkod/wkodRequest'),
          name: 'wkodApproval',
          meta: { title: '승인', navi: '안전 > 작업허가서 >', wkodStepCd: 'WKS03' },
        },
        {
          path: 'wkodSearch',
          component: () => import('@/pages/saf/wkod/wkodRequest'),
          name: 'wkodSearch',
          meta: { title: '조회및출력', navi: '안전 > 작업허가서 >', wkodStepCd: 'WKS04' },
        },
        {
          path: 'wkodChkItem',
          component: () => import('@/pages/saf/wkod/wkodChkItem'),
          name: 'wkodChkItem',
          meta: { title: '항목관리', navi: '안전 > 작업허가서 >' },
        },
        {
          path: 'wkodMatMst',
          component: () => import('@/pages/saf/wkod/wkodMatMst'),
          name: 'wkodMatMst',
          meta: { title: '취급물질관리', navi: '안전 > 작업허가서 >' },
        }
      ]
    },
    // 안전점건관리
    {
      path: 'safetyCheck',
      component: () => import('@/router/routeLevel'),
      name: 'safetyCheck',
      meta: { title: '안전점검관리' },
      redirect: '/saf/baseinfo/index',
      children: [
        
        {
          path: 'safetyCheckPlan',  
          component: () => import('@/pages/saf/check/checkResultPlan'),
          name: 'safetyCheckPlan',
          meta: { title: '안전점검계획', navi: '안전 > 안전점검관리 >' }
        },
        {
          path: 'safetyCheckResult',
          component: () => import('@/pages/saf/check/checkResult'),
          name: 'safetyCheckResult',
          meta: { title: '안점점검결과', navi: '안전 > 안전점검관리 >' },
        }
      ]
    },
    // 설비관리
    {
      path: 'safFacility',
      component: () => import('@/router/routeLevel'),
      name: 'safFacility',
      meta: { title: '설비관리', navi: '안전 >' },      
      redirect: '/saf/facility/facilityMst',
      children: [
        {
          path: 'safFacilityType',
          component: () => import('@/pages/saf/facility/facilityMst'),
          name: 'safFacilityType',
          meta: { title: '유형별 설비관리', navi: '안전 > 설비관리 >' }
        },
        {
          path: 'facilityMstStatus',
          component: () => import('@/pages/saf/facility/facilityMstStatus'),
          name: 'facilityMstStatus',
          meta: { title: '유형별 설비현황', navi: '안전 > 설비관리 >' },      
        },
      ]
    },
   
    // 설비점검
    {
      path: 'safetyFacilityCheck',
      component: () => import('@/router/routeLevel'),
      name: 'safetyFacilityCheck',
      meta: { title: '설비점검' },
      redirect: '/saf/baseinfo/index',
      children: [
        {
          path: 'facilityCheckResultPlan',
          component: () => import('@/pages/saf/facility/facilityCheckResultPlan'),
          name: 'facilityCheckResultPlan',
          meta: { title: '설비점검계획', navi: '안전 > 설비점검 >' }
        },
        {
          path: 'facilityCheckResult',
          component: () => import('@/pages/saf/facility/facilityCheckResult'),
          name: 'facilityCheckResult',
          meta: { title: '설비점검결과', navi: '안전 > 설비점검 >' },
        }
      ]
    },
    // 안전보호구
    {
      path: 'spe',
      component: () => import('@/router/routeLevel'),
      name: 'spe',
      meta: { title: '안전보호구' },
      redirect: '/saf/spe/spe',
      children: [
        {
          path: 'spe',
          component: () => import('@/pages/saf/spe/spe'),
          name: 'spe',
          meta: { title: '보호구 목록', navi: '안전 > 안전보호구 >' }
        },
        {
          path: 'speRqst',
          component: () => import('@/pages/saf/spe/speRqst'),
          name: 'speRqst',
          meta: { title: '보호구 신청', navi: '안전 > 안전보호구 >' },
        },
        {
          path: 'speGive',
          component: () => import('@/pages/saf/spe/speGive'),
          name: 'speGive',
          meta: { title: '보호구 출고', navi: '안전 > 안전보호구 >' }
        },
        {
          path: 'speIn',
          component: () => import('@/pages/saf/spe/speIn'),
          name: 'speIn',
          meta: { title: '보호구 입고', navi: '안전 > 안전보호구 >' },
        },
        {
          path: 'giveInList',
          component: () => import('@/pages/saf/spe/giveInList'),
          name: 'giveInList',
          meta: { title: '입출고 내역', navi: '안전 > 안전보호구 >' }
        },
        {
          path: 'giveInStatus',
          component: () => import('@/pages/saf/spe/giveInStatus'),
          name: 'giveInStatus',
          meta: { title: '수불 현황', navi: '안전 > 안전보호구 >' },
        }
      ]
    },
    // 안전교육
    {
      path: 'safetyEducation',
      component: () => import('@/router/routeLevel'),
      name: 'safetyEducation',
      meta: { title: '안전교육' },
      redirect: '/saf/safetyEducation/edueResult',
      children: [
        {
          path: 'edueResult',
          component: () => import('@/pages/saf/safetyEducation/edueResult'),
          name: 'edueResult',
          meta: { title: '교육결과관리', navi: '안전 > ' }
        },
        {
          path: 'edueStatus',
          component: () => import('@/pages/saf/safetyEducation/edueStatus'),
          name: 'edueStatus',
          meta: { title: '교육실시현황', navi: '안전 > ' }
        }
      ]
    },
    // 무재해
    {
      path: 'noAccident',
      component: () => import('@/router/routeLevel'),
      name: 'noAccident',
      meta: { title: '사업장무재해' },
      redirect: '/saf/noaccident/noAccidentResult',
      children: [
        {
          path: 'noAccidentResult',
          component: () => import('@/pages/saf/noaccident/noAccidentResult'),
          name: 'noAccidentResult',
          meta: { title: '사업장 무재해', navi: '안전 > ' }
        }
      ]
    },
    // 사고관리
    {
      path: 'accident',
      component: () => import('@/router/routeLevel'),
      name: 'accident',
      meta: { title: '사고관리' },
      redirect: '/saf/baseinfo/index',
      children: [
        {
          path: 'nearmiss',
          component: () => import('@/pages/saf/baseinfo/index'),
          name: 'nearmiss',
          meta: { title: '아차사고', navi: '안전 > 사고관리 >' }
        },
        {
          path: 'accidentOccur',
          component: () => import('@/pages/saf/accident/accidentOccur'),
          name: 'accidentOccur',
          meta: { title: '사고발생등록', navi: '안전 > 사고관리 >' }
        },
        {
          path: 'accidentReception',
          component: () => import('@/pages/saf/accident/accidentReception'),
          name: 'accidentReception',
          meta: { title: '사고접수/확인', navi: '안전 > 사고관리 >' }
        },
        {
          path: 'accidentResult',
          component: () => import('@/pages/saf/accident/accidentResult'),
          name: 'accidentResult',
          meta: { title: '조사결과/개선계획', navi: '안전 > 사고관리 >' }
        },
      ]
    },
    // 안전 기준 정보
    {
      path: 'baseinfo',
      component: () => import('@/router/routeLevel'),
      name: 'baseinfo',
      meta: { title: '안전 기준 정보' },
      redirect: '/saf/baseinfo/checkKind',
      children: [
        {
          path: 'safetyCheckKind',
          component: () => import('@/pages/saf/baseinfo/checkKind'),
          name: 'safetyCheckKind',
          meta: { title: '안전점검종류', navi: '안전 > 안전점검관리 >' }
        }, 
        {
          path: 'safetyCheckItem',
          component: () => import('@/pages/saf/baseinfo/checkItem'),
          name: 'safetyCheckItem',
          meta: { title: '안전점검항목', navi: '안전 > 안전점검관리 >' }
        },
        {
          path: 'facilityType',
          component: () => import('@/pages/saf/baseinfo/facilityType'),
          name: 'facilityType',
          meta: { title: '설비유형 관리', navi: '안전 > 안전 기준 정보 >' }
        },
        {
          path: 'facilityTypeItem',
          component: () => import('@/pages/saf/baseinfo/facilityTypeItem'),
          name: 'facilityTypeItem',
          meta: { title: '설비유형별 관리항목', navi: '안전 > 안전 기준 정보 >' },
        },
        {
          path: 'facilityCheckItem',
          component: () => import('@/pages/saf/baseinfo/facilityCheckItem'),
          name: 'facilityCheckItem',
          meta: {
            title: '설비유형별 점검항목',
            navi: '안전 > 안전 기준 정보 >'
          },
        },
        {
          path: 'holiday',
          component: () => import('@/pages/saf/baseinfo/holiday'),
          name: 'holiday',
          meta: {
            title: '공휴일 관리',
            navi: '안전 > 안전 기준 정보 >'
          },
        }
        

        
      ]
    },
    // 개선관리
    {
      path: 'imprAct',
      component: () => import('@/router/routeLevel'),
      name: 'imprAct',
      meta: { title: '개선관리' },
      redirect: '/saf/imprAct/imprAct',
      children: [
        {
          path: 'imprAct',
          component: () => import('@/pages/saf/imprAct/imprAct'),
          name: 'imprAct',
          meta: { title: '요청/조치 사항', navi: '안전 > 개선관리 >' }
        }
      ]
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
