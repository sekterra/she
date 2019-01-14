/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const heaRouter = {
  // TODO : 1 Level
  path: '/hea',
  component: Layout,
  redirect: '/hea/baseInfo/',
  name: 'health',
  meta: {
    title: 'health',
    icon: 'peoples'
  },
  // TODO : 2 Level
  children: [
    // 기준 정보 메뉴
    {
      path: 'baseInfo',
      // component: () => import('@/pages/hea/BaseInfo/index'), // Parent router-view
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'baseInfo',
      meta: { title: 'baseInfo' },
      redirect: '/hea/baseInfo/baseInfoOrgan',
      // TODO : 3 Level
      children: [
        {
          path: 'baseInfoTest',
          component: () => import('@/pages/hea/baseInfo/baseInfoTest'),
          name: 'baseInfoTest',
          meta: { title: 'baseInfoTest' },
        },
        {
          path: 'baseInfoOrgan',
          component: () => import('@/pages/hea/baseInfo/baseInfoOrgan'),
          name: 'baseInfoOrgan',
          meta: { title: 'baseInfoOrgan' }
        },
        {
          path: 'disease',
          component: () => import('@/pages/hea/baseInfo/disease'),
          name: 'disease',
          meta: { title: 'disease' },
        },
      ]
    },
    // 건강검진
    {
      path: 'checkup',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'checkup',
      meta: { title: 'checkup' },
      redirect: '/hea/checkup/checkupPlan',
      // TODO : 3 Level
      children: [
        {
          path: 'checkupPlan',
          component: () => import('@/pages/hea/checkup/checkupPlan'),
          name: 'checkupPlan',
          meta: { title: 'checkupPlan' }
        },
        {
          path: 'checkupResult',
          component: () => import('@/pages/hea/checkup/checkupResult'),
          props: (route) => ({ query: route.query.pk }),
          name: 'checkupResult',
          meta: { title: 'checkupResult' },
        },
        {
          path: 'checkupResultDetail',
          component: () => import('@/pages/hea/checkup/checkupResultDetail'),
          name: 'checkupResultDetail',
          meta: { title: 'checkupResultDetail' },
        },
        {
          path: 'diagnoseResultHistory',
          component: () => import('@/pages/hea/checkup/diagnoseResultHistory'),
          name: 'diagnoseResultHistory',
          meta: { title: 'diagnoseResultHistory' },
        },
        {
          path: 'diagnoseResultUpload',
          component: () => import('@/pages/hea/checkup/diagnoseResultUpload'),
          name: 'diagnoseResultUpload',
          meta: { title: 'diagnoseResultUpload' },
        },
        {
          path: 'checkupUser',
          component: () => import('@/pages/hea/checkup/checkupUser'),
          name: 'checkupUser',
          meta: { title: 'checkupUser' },
        },
        {
          path: 'checkupUserStatus',
          component: () => import('@/pages/hea/checkup/checkupUserStatus'),
          name: 'checkupUserStatus',
          meta: { title: 'checkupUserStatus' },
        },
        {
          path: 'interviewResultUpload',
          component: () => import('@/pages/hea/checkup/interviewResultUpload'),
          name: 'interviewResultUpload',
          meta: { title: 'interviewResultUpload' },
        },
        {
          path: 'reserveChange',
          component: () => import('@/pages/hea/checkup/reserveChange'),
          name: 'reserveChange',
          meta: { title: 'reserveChange' },
        },
        {
          path: 'checkupStatus',
          component: () => import('@/pages/hea/checkup/checkupStatus'),
          name: 'checkupStatus',
          meta: { title: 'checkupStatus' },
        },
        {
          path: 'checkupOrgCalendar',
          component: () => import('@/pages/hea/checkup/checkupOrgCalendar'),
          name: 'checkupOrgCalendar',
          meta: { title: 'checkupOrgCalendar' },
        },
        {
          path: 'suspectSend',
          component: () => import('@/pages/hea/checkup/suspectSend'),
          name: 'suspectSend',
          meta: { title: 'suspectSend' },
        },
      ]
    },
    // 건강관리실
    {
      path: 'infirmary',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'infirmary',
      meta: { title: 'infirmary' },
      redirect: '/hea/infirmary/generalBusiness',
      // TODO : 3 Level
      children: [
        {
          path: 'generalBusiness',
          component: () => import('@/pages/hea/infirmary/generalBusiness'),
          name: 'generalBusiness',
          meta: { title: 'generalBusiness' }
        },
        {
          path: 'suspectUser',
          component: () => import('@/pages/hea/infirmary/suspectUser'),
          name: 'suspectUser',
          meta: { title: 'suspectUser' },
        },
        {
          path: 'suspectUserPopup',
          component: () => import('@/pages/hea/infirmary/suspectUserPopup'),
          name: 'suspectUserPopup',
          meta: { title: 'suspectUserPopup' },
        },
        {
          path: 'historySearch',
          component: () => import('@/pages/hea/infirmary/historySearch'),
          name: 'historySearch',
          meta: { title: 'historySearch' },
        },
        {
          path: 'infirmaryPrescribe',
          component: () => import('@/pages/hea/infirmary/infirmaryPrescribe'),
          name: 'infirmaryPrescribe',
          meta: { title: 'infirmaryPrescribe' },
        },
      ]
    },
    // 약품관리
    {
      path: 'drug',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'drug',
      meta: { title: 'drug' },
      redirect: '/hea/drug/drugManage',
      // TODO : 3 Level
      children: [
        {
          path: 'drugManage',
          component: () => import('@/pages/hea/drug/drugManage'),
          name: 'drugManage',
          meta: { title: 'drugManage' }
        },
      ]
    },
    // 보건 홈
    {
      path: 'user',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'user',
      meta: { title: 'user' },
      redirect: '/hea/user/checkupHistory',
      // TODO : 3 Level
      children: [
        {
          path: 'checkupReserve',
          component: () => import('@/pages/hea/user/checkupReserve'),
          name: 'checkupReserve',
          meta: { title: 'checkupReserve' },
        },
        {
          path: 'checkupHistory',
          component: () => import('@/pages/hea/user/checkupHistory'),
          name: 'checkupHistory',
          meta: { title: 'checkupHistory' }
        },
        // {
        //   path: 'infirmaryHistory',
        //   component: () => import('@/pages/hea/user/infirmaryHistory'),
        //   name: 'infirmaryHistory',
        //   meta: { title: 'infirmaryHistory' },
        // },
        {
          path: 'suspectHistory',
          component: () => import('@/pages/hea/user/suspectHistory'),
          name: 'suspectHistory',
          meta: { title: 'suspectHistory' },
        },
        {
          path: 'checkupResultConsent',
          component: () => import('@/pages/hea/user/checkupResultConsent'),
          name: 'checkupResultConsent',
          meta: { title: 'checkupResultConsent' },
        },
      ]
    },
    // 작업환경관리
    {
      path: 'workingEnvManage',
      component: () => import('@/router/routeLevel'), // Parent router-view
      name: 'workingEnvManage',
      meta: { title: 'workingEnvManage' },
      redirect: '/hea/workingEnvManage/hazard',
      // TODO : 3 Level
      children: [
        {
          path: 'hazard',
          component: () => import('@/pages/hea/workingEnvManage/hazard'),
          name: 'hazard',
          meta: { title: 'hazard' }
        },
      ]
    },
  ]
}

export default heaRouter
