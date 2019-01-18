/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const safeRouter = {
  path: '/saf',
  component: Layout,
  redirect: '/saf',
  name: 'safe',
  meta: {
    title: 'safe',
    icon: 'peoples'
  },
  children: [
    // 작업허가서
    {
      path: 'wkod',
      component: () => import('@/router/routeLevel'),
      name: 'wkod',
      meta: { title: 'wkod' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'wkodRequest',
          component: () => import('@/pages/saf/wkod/wkodRequest'),
          name: 'wkodRequest',
          meta: { title: 'wkodRequest' }
        },
        {
          path: 'wkodPublic',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'wkodPublic',
          meta: { title: 'wkodPublic' },
        },
        {
          path: 'wkodApproval',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'wkodApproval',
          meta: { title: 'wkodApproval' },
        },
        {
          path: 'wkodSearch',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'wkodSearch',
          meta: { title: 'wkodSearch' },
        },
        {
          path: 'wkodChkItem',
          component: () => import('@/pages/saf/wkod/wkodChkItem'),
          name: 'wkodChkItem',
          meta: { title: 'wkodChkItem' },
        },
        {
          path: 'wkodMatMst',
          component: () => import('@/pages/saf/wkod/wkodMatMst'),
          name: 'wkodMatMst',
          meta: { title: 'wkodMatMst' },
        }
      ]
    },
    // 안전점건관리
    {
      path: 'safetyCheck',
      component: () => import('@/router/routeLevel'),
      name: 'safetyCheck',
      meta: { title: 'safetyCheck' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'safetyCheckPlan',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'safetyCheckPlan',
          meta: { title: 'safetyCheckPlan' }
        },
        {
          path: 'safetyCheckResult',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'safetyCheckResult',
          meta: { title: 'safetyCheckResult' },
        }
      ]
    },
    // 설비관리
    {
      path: 'safetyFacility',
      component: () => import('@/router/routeLevel'),
      name: 'safetyFacility',
      meta: { title: 'safetyFacility' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'safetyFacilityType',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'safetyFacilityType',
          meta: { title: 'safetyFacilityType' }
        }
      ]
    },
    // 설비점검
    {
      path: 'safetyFacilityCheck',
      component: () => import('@/router/routeLevel'),
      name: 'safetyFacilityCheck',
      meta: { title: 'safetyFacilityCheck' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'safetyFacilityCheckPlan',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'safetyFacilityCheckPlan',
          meta: { title: 'safetyFacilityCheckPlan' }
        },
        {
          path: 'safetyFacilityCheckResult',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'safetyFacilityCheckResult',
          meta: { title: 'safetyFacilityCheckResult' },
        }
      ]
    },
    // 안전보호구
    {
      path: 'protectEquip',
      component: () => import('@/router/routeLevel'),
      name: 'protectEquip',
      meta: { title: 'protectEquip' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'protectEquipIndex',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'protectEquipIndex',
          meta: { title: 'protectEquipIndex' }
        },
        {
          path: 'protectEquipRequest',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'protectEquipRequest',
          meta: { title: 'protectEquipRequest' },
        },
        {
          path: 'protectEquipOut',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'protectEquipOut',
          meta: { title: 'protectEquipOut' }
        },
        {
          path: 'protectEquipIn',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'protectEquipIn',
          meta: { title: 'protectEquipIn' },
        },
        {
          path: 'protectEquipInOutHistory',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'protectEquipInOutHistory',
          meta: { title: 'protectEquipInOutHistory' }
        },
        {
          path: 'protectEquipReceipts',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'protectEquipReceipts',
          meta: { title: 'protectEquipReceipts' },
        }
      ]
    },
    // 안전교육
    {
      path: 'safetyEducation',
      component: () => import('@/router/routeLevel'),
      name: 'safetyEducation',
      meta: { title: 'safetyEducation' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'safetyEducationResult',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'safetyEducationResult',
          meta: { title: 'safetyEducationResult' }
        }
      ]
    },
    // 무재해
    {
      path: 'noAccident',
      component: () => import('@/router/routeLevel'),
      name: 'noAccident',
      meta: { title: 'noAccident' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'noAccidentCpy',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'noAccidentCpy',
          meta: { title: 'noAccidentCpy' }
        }
      ]
    },
    // 사고관리
    {
      path: 'accident',
      component: () => import('@/router/routeLevel'),
      name: 'accident',
      meta: { title: 'accident' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'nearmiss',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'nearmiss',
          meta: { title: 'nearmiss' }
        },
        {
          path: 'accident',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'accident',
          meta: { title: 'accident' }
        }
      ]
    },
    // 개선관리
    {
      path: 'improvement',
      component: () => import('@/router/routeLevel'),
      name: 'improvement',
      meta: { title: 'improvement' },
      redirect: '/saf/baseInfo/index',
      children: [
        {
          path: 'improvementRequest',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'improvementRequest',
          meta: { title: 'improvementRequest' }
        },
        {
          path: 'improvementAction',
          component: () => import('@/pages/saf/BaseInfo/index'),
          name: 'improvementAction',
          meta: { title: 'improvementAction' }
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
