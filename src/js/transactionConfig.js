/**
 * 수정용 config
 */
let transactionConfig = {
  menus: {
    insert: {
      url: '/menus',
      param: {
        name: null,
        path: null,
        orderNo: 0
      }
    },
    edit: {
      url: '/menus/{0}'
      // param: {}
    },
    delete: {
      url: '/menus/{0}'
    }
  },
  apiContents: {
    insert: {
      url: '/menus/{0}/api_contents'
    },
    edit: {
      url: '/menus/{0}/api_contents/{1}',
      param: {
        id: null,
        content: null
      }
    },
    delete: {
      url: '/menus/{0}/api_contents/{1}'
    }
  },
  checkupOrg: {
    insert: {
      url: '/api/hea/baseinfo/checkuporg'
    },
    edit: {
      url: '/api/hea/baseinfo/checkuporg',
    },
    delete: {
      url: '/api/hea/baseinfo/checkuporg/{0}'
    }
  },
  testItem: {
    insert: {
      url: '/api/hea/baseinfo/testitem',
    },
    edit: {
      url: '/api/hea/baseinfo/testitem',
    },
  },
  checkupTestItem: {
    insert: {
      url: '/api/hea/baseinfo/checkuptestitem',
    },
    edit: {
      url: '/api/hea/baseinfo/checkuptestitem',
    },
    delete: {
      url: '/api/hea/baseinfo/checkuptestitem',
    }
  },
  drugManage: {
    insert: {
      url: '/api/hea/drug/drugmanage',
    },
    edit: {
      url: '/api/hea/drug/drugmanage',
    },
  },
  checkupOrgTestItem: {
    insert: {
      url: '/api/hea/baseinfo/checkuporgtestitem',
    },
    edit: {
      url: '/api/hea/baseinfo/checkuporgtestitem',
    },
    delete: {
      url: '/api/hea/baseinfo/checkuporgtestitem',
    }
  },
  disease: {
    insert: {
      url: '/api/hea/baseinfo/disease'
    },
    edit: {
      url: '/api/hea/baseinfo/disease'
    },
  },
  hazard: {
    insert: {
      url: '/api/hea/workingenvmanage/hazard',
    },
    edit: {
      url: '/api/hea/workingenvmanage/hazard',
    },
  },
  consult: {
    insert: {
      url: '/api/hea/infirmary/consult'
    },
    edit: {
      url: '/api/hea/infirmary/consult'
    },
    delete: {
      url: '/api/hea/infirmary/consult'
    },
  },
  checkupResultDiag: {
    insert: {
      url: '/api/hea/checkup/checkupresultdiag'
    },
    delete: {
      url: '/api/hea/checkup/checkupresultdiag/{0}/{1}/{2}'
    },
  },
  testItemResult: {
    insert: {
      url: '/api/hea/checkup/testitemresult'
    },
    delete: {
      url: '/api/hea/checkup/testitemresult/{0}/{1}/{2}'
    }
  },
  process: {
    insert: {
      url: '/api/manage/process/process'
    },
    edit: {
      url: '/api/manage/process/process'
    }
  },
  checkupResult: {
    edit: {
      url: '/api/hea/checkup/checkupresult'
    },
    excel: {
      url: '/api/hea/checkup/uploadexcelcheckupresult'
    }
  },
  checkupReserve: {
    insert: {
      url: '/api/hea/checkup/checkupreserve'
    },
    multiInsert: {
      url: '/api/hea/checkup/checkupreserves'
    },
    edit: {
      url: '/api/hea/checkup/checkupreserve'
    },
    multiEdit: {
      url: '/api/hea/checkup/checkupreserves'      
    }
  },
  suspectUser: {
    insert: {
      url: '/api/hea/infirmary/createsuspectuser'
    },
    delete: {
      url: '/api/hea/infirmary/deletesuspectuser'
    }
  },
  checkupPlanOrg: {
    edit: {
      url: '/api/hea/checkup/checkupplanorgs'
    },
  },
  checkupPlan: {
    insert: {
      url: '/api/hea/checkup/checkupplan',
    },
    edit: {
      url: '/api/hea/checkup/checkupplan',
    },
    delete: {
      url: '/api/hea/checkup/checkupplan'
    }
  },
  checkupUser: {
    insert: {
      url: '/api/hea/checkup/checkupusers'      
    },
    delete: {
      url: '/api/hea/checkup/checkupusers' 
    }
  },
  infirmaryUsage: {
    insert: {
      url: '/api/hea/infirmary/infirmaryusage'
    },
    edit: {
      url: '/api/hea/infirmary/infirmaryusage'
    }
  },
  
  // 안전 Config
  wkodChkItem: {
    insert: {
      url: '/api/saf/wkod/wkodChkItem',
    },
    edit: {
      url: '/api/saf/wkod/wkodChkItem',
    }
  },
  wkodMatMst: {
    insert: {
      url: '/api/saf/wkod/wkodMatMst',
    },
    edit: {
      url: '/api/saf/wkod/wkodMatMst',
    }
  },
};

export default transactionConfig;
