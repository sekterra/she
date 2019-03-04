/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'

const heaRouter = {
  // TODO : 1 Level
  path: '/hea',
  component: Layout,
  redirect: '/hea/baseInfo/',
  name: 'health',
  meta: {
    title: '보건',
    icon: 'peoples'
  },
  // TODO : 2 Level
  children: [
    // 기준정보 메뉴
    {
      path: 'baseInfo',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'baseInfo',
      meta: { title: '기준정보' },
      redirect: '/hea/baseInfo/baseInfoOrgan',
      // TODO : 3 Level
      children: [
        {
          path: 'baseInfoTest',
          component: () => import('@/pages/hea/baseInfo/baseInfoTest'),
          name: 'baseInfoTest',
          meta: { title: '검진', navi: '보건 > 기준정보 >' },
        },
        {
          path: 'baseInfoOrgan',
          component: () => import('@/pages/hea/baseInfo/baseInfoOrgan'),
          name: 'baseInfoOrgan',
          meta: { title: '검진기관', navi: '보건 > 기준정보 >' }
        },
        {
          path: 'disease',
          component: () => import('@/pages/hea/baseInfo/disease'),
          name: 'disease',
          meta: { title: '질환', navi: '보건 > 기준정보 >' },
        },
        // {
        //   path: 'workingEnvManage',
        //   component: () => import('@/pages/hea/workingEnvManage/hazard'),
        //   name: 'workingEnvManage',
        //   meta: { title: '유해인자', navi: '보건 > 기준정보 >' }
        // },
        // {
        //   path: 'interviewItem',
        //   component: () => import('@/pages/hea/baseInfo/interviewItem'),
        //   name: 'interviewItem',
        //   meta: { title: '문진항목', navi: '보건 > 기준정보 >' },
        // },
      ]
    },
    // 검진
    {
      path: 'checkup',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'checkup',
      meta: { title: '검진' },
      redirect: '/hea/checkup/checkupPlan',
      // TODO : 3 Level
      children: [
        {
          path: 'checkupPlan',
          component: () => import('@/pages/hea/checkup/checkupPlan'),
          name: 'checkupPlan',
          meta: { title: '검진계획', navi: '보건 > 검진 >' }
        },
        {
          path: 'checkupOrgCalendar',
          component: () => import('@/pages/hea/checkup/checkupOrgCalendar'),
          name: 'checkupOrgCalendar',
          meta: { title: '검진기관일정', navi: '보건 > 검진 >' },
        },
        {
          path: 'checkupReserve',
          component: () => import('@/pages/hea/checkup/checkupReserve'),
          name: 'checkupReserve',
          meta: { title: '검진예약', navi: '보건 > 검진 >' },
        },
        {
          path: 'checkupStatus',
          component: () => import('@/pages/hea/checkup/checkupStatus'),
          name: 'checkupStatus',
          meta: { title: '수검현황', navi: '보건 > 검진 >' },
        },
        {
          path: 'checkupResult',
          component: () => import('@/pages/hea/checkup/checkupResult'),
          name: 'checkupResult',
          meta: { title: '검진결과', navi: '보건 > 검진 >' },
        }
      ]
    },
    // 건강관리실
    {
      path: 'infirmary',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'infirmary',
      meta: { title: '건강관리실' },
      redirect: '/hea/infirmary/generalBusiness',
      // TODO : 3 Level
      children: [
        {
          path: 'generalBusiness',
          component: () => import('@/pages/hea/infirmary/generalBusiness'),
          name: 'generalBusiness',
          meta: { title: '일반업무', navi: '보건 > 건강관리실 >' }
        },
        {
          path: 'suspectUser',
          component: () => import('@/pages/hea/infirmary/suspectUser'),
          name: 'suspectUser',
          meta: { title: '관리대상유소견자', navi: '보건 > 건강관리실 >' },
        },
        {
          path: 'historySearch',
          component: () => import('@/pages/hea/infirmary/historySearch'),
          name: 'historySearch',
          meta: { title: '이력검색', navi: '보건 > 건강관리실 >' },
        },
        {
          path: 'infirmaryPrescribe',
          component: () => import('@/pages/hea/infirmary/infirmaryPrescribe'),
          name: 'infirmaryPrescribe',
          meta: { title: '약품처방현황', navi: '보건 > 건강관리실 >' },
        },
      ]
    },
    // 약품관리
    {
      path: 'drug',
      component: () => import('@/pages/hea/drug/drugManage'),
      name: 'drug',
      meta: { title: '약품관리', navi: '보건 > ' }
    },
    // 보건 홈
    {
      path: 'user',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'user',
      meta: { title: '보건홈' },
      redirect: '/hea/user/checkupHistory',
      // TODO : 3 Level
      children: [
        {
          path: 'userCheckupReserve',
          component: () => import('@/pages/hea/user/checkupReserve'),
          name: 'userCheckupReserve',
          meta: { title: '검진예약', navi: '보건 > ' },
        },
        {
          path: 'checkupHistory',
          component: () => import('@/pages/hea/user/checkupHistory'),
          name: 'checkupHistory',
          meta: { title: '검진이력', navi: '보건 > ' }
        },
        {
          path: 'infirmaryHistory',
          component: () => import('@/pages/hea/user/infirmaryHistory'),
          name: 'infirmaryHistory',
          meta: { title: '건강상담이력', navi: '보건 > ' },
        },
      ]
    },    
  ]
}

export default heaRouter
