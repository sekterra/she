/**
 * 수정용 config
 */
let transactionConfig = {
  menu: {
    insert: {
      url: '/api/common/menu'
    },
    edit: {
      url: '/api/common/menu/{0}'
      // param: {}
    },
    delete: {
      url: '/api/common/menu/{0}'
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
    multiDelete: {
      url: '/api/hea/checkup/checkupresultdiags'
    },
  },
  testItemResult: {
    insert: {
      url: '/api/hea/checkup/testitemresult'
    },
    delete: {
      url: '/api/hea/checkup/testitemresult/{0}/{1}/{2}'
    },
    multiDelete: {
      url: '/api/hea/checkup/testitemresults'
    },
  },
  interviewItem: {
    insert: {
      url: '/api/hea/baseinfo/interviewitem'
    },
    edit: {
      url: '/api/hea/baseinfo/interviewitem'
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
    },
    delete: {
      url: '/api/hea/infirmary/infirmaryusage'
    }
  },

  // 시스템 관리 Config
  manage: {
    process: {
      insert: { url: '/api/manage/process' },
      edit: { url: '/api/manage/process' }
    },
    codeMaster: {
      insert: { url: '/api/manage/codemaster' },
      edit: { url: '/api/manage/codemaster' }
    },
  },

  // 환경 Config
  env: {
    com: {
      baseInfo: {
        codeMaster: {
          insert: { url: '/api/env/air/baseinfo/codemaster' },
          edit: { url: '/api/env/air/baseinfo/codemaster' }
        }
      }
    },
    air: {
      baseInfo: {
        codeMaster: {
          insert: { url: '/api/env/air/baseinfo/codemaster' },
          edit: { url: '/api/env/air/baseinfo/codemaster' }
        },
        testItem: {
          insert: { url: '/api/env/air/baseinfo/testitem' },
          edit: { url: '/api/env/air/baseinfo/testitem' }
        },
        outlet: {
          insert: { url: '/api/env/air/baseinfo/outlet' },
          edit: { url: '/api/env/air/baseinfo/outlet' }          
        },
        fuel: {
          insert: { url: '/api/env/air/baseinfo/fuel' },
          edit: { url: '/api/env/air/baseinfo/fuel' }          
        },
        ingredient: {
          insert: { url: '/api/env/air/baseinfo/ingredient' },
          edit: { url: '/api/env/air/baseinfo/ingredient' }          
        }
      },
      facility: {
        discharge: {
          insert: { url: '/api/env/air/facility/dischargefacility' },
          edit: { url: '/api/env/air/facility/dischargefacility' }
        },
        prevention: {
          insert: { url: '/api/env/air/facility/preventionfacility' },
          edit: { url: '/api/env/air/facility/preventionfacility' }
        },
        preventionChangeHistory: {
          insert: { url: '/api/env/air/facility/preventionfacilitychangehistory' },
          delete: { url: '/api/env/air/facility/preventionfacilitychangehistory/{0}/{1}' }
        },
        preventionMaintenanceHistory: {
          insert: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory' },
          delete: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory' }
        }        
      },
      operationLog: {
        insert: { url: '/api/env/air/operation/operationlog' },
      }
    },
    waste: {
      baseInfo: {
        codeMaster: {
          insert: { url: '/api/env/waste/baseinfo/codemaster' },
          edit: { url: '/api/env/waste/baseinfo/codemaster' }
        },
        wasteDisposalMethod: {
          insert: { url: '/api/env/waste/baseinfo/wastedisposalmethod' },
          edit: { url: '/api/env/waste/baseinfo/wastedisposalmethod' }
        },
        wasteClass: {
          insert: { url: '/api/env/waste/baseinfo/wasteclass' },
          edit: { url: '/api/env/waste/baseinfo/wasteclass' }
        },
        waste: {
          insert: { url: '/api/env/waste/baseinfo/waste' },
          edit: { url: '/api/env/waste/baseinfo/waste' }
        },
        disposalCompany: {
          insert: { url: '/api/env/waste/baseinfo/disposalcompany' },
          edit: { url: '/api/env/waste/baseinfo/disposalcompany' }
        }
      }
    },
    water: {
      baseInfo: {
        codeMaster: {
          insert: { url: '/api/env/water/baseinfo/codemaster' },
          edit: { url: '/api/env/water/baseinfo/codemaster' }
        },
        supply: {
          insert: { url: '/api/env/water/baseinfo/supply/supply' },
          edit: { url: '/api/env/water/baseinfo/supply/supply' },
        },
        discharge: {
          insert: { url: '/api/env/water/baseinfo/discharge/discharge' },
          edit: { url: '/api/env/water/baseinfo/discharge/discharge' },
        },
        testItem: {
          insert: { url: '/api/env/water/baseinfo/testitem/testitem' },
          edit: { url: '/api/env/water/baseinfo/testitem/testitem' },
        },
        monPos: {
          insert: { url: '/api/env/water/baseinfo/monpos/monpos' },
          edit: { url: '/api/env/water/baseinfo/monpos/monpos' },
        },
        ingredient: {
          insert: { url: '/api/env/water/baseinfo/ingredient/ingredient' },
          edit: { url: '/api/env/water/baseinfo/ingredient/ingredient' },
        },
        chemical: {
          insert: { url: '/api/env/water/baseinfo/chemical/chemical' },
          edit: { url: '/api/env/water/baseinfo/chemical/chemical' },
        },
        chemInHist: {
          insert: { url: '/api/env/water/baseinfo/cheminhist/cheminhist' },
          edit: { url: '/api/env/water/baseinfo/cheminhist/cheminhist' },
        },
      },
      facility: {
        wasteDischFac: {
          insert: { url: '/api/env/water/facility/wastedischfac/wastedischfac' },
          edit: { url: '/api/env/water/facility/wastedischfac/wastedischfac' },
        },
        pwrMeter: {
          insert: { url: '/api/env/water/facility/pwrmeter/pwrmeter' },
          edit: { url: '/api/env/water/facility/pwrmeter/pwrmeter' },
        },
        aerationTank: {
          insert: { url: '/api/env/water/facility/aerationtank/aerationtank' },
          edit: { url: '/api/env/water/facility/aerationtank/aerationtank' },
        },
        guided: {
          insert: { url: '/api/env/water/facility/guided/guided' },
          edit: { url: '/api/env/water/facility/guided/guided' },
        },
        preventFac: {
          insert: { url: '/api/env/water/facility/preventfac/preventfac' },
          edit: { url: '/api/env/water/facility/preventfac/preventfac' },
        },
        preventFacBreakHist: {
          insert: { url: '/api/env/water/facility/preventfacbreakhist/preventfacbreakhist' },
          edit: { url: '/api/env/water/facility/preventfacbreakhist/preventfacbreakhist' },
        },
      },
      operationLog: {
        dailyReport: {
          insert: { url: '/api/env/water/operationlog/operation/dailyreport' },
          edit: { url: '/api/env/water/operationlog/operation/dailyreport' },
        },
        suplChkResult: {
          insert: { url: '/api/env/water/operationlog/operation/suplchkresult' },
        },
        dischChkResult: {
          insert: { url: '/api/env/water/operationlog/operation/dischchkresult' },
        },
        chemChkResult: {
          insert: { url: '/api/env/water/operationlog/operation/chemchkresult' },
        },
        pwrcChkResult: {
          insert: { url: '/api/env/water/operationlog/operation/pwrcchkresult' },
        },
        aerationTankChkResult: {
          insert: { url: '/api/env/water/operationlog/operation/aerationtankchkresult' },
        },
      }
    }
  },
  
  // 안전 Config
  saf: {
    checkKind: {
      insert: {
        url: '/api/saf/baseinfo/createcheckkind',
      },
      edit: {
        url: '/api/saf/baseinfo/updatecheckkind',
      }
    },
    checkItem: {
      insert: {
        url: '/api/saf/baseinfo/createcheckitem',
      },
      edit: {
        url: '/api/saf/baseinfo/updatecheckitem',
      }
    },
    wkodChkItem: {
      insert: {
        url: '/api/saf/wkod/wkodchkitem',
      },
      edit: {
        url: '/api/saf/wkod/wkodchkitem',
      }
    },
    wkodMatMst: {
      insert: {
        url: '/api/saf/wkod/wkodmatmst',
      },
      edit: {
        url: '/api/saf/wkod/wkodmatmst',
      }
    },
    wkodMaster: {
      insert: {
        url: '/api/saf/wkod/wkodmaster',
      },
      edit: {
        url: '/api/saf/wkod/wkodmaster',
      }
    },
    checkResult: {
      insert: {
        url: '/api/saf/check/checkresult',
      },
      edit: {
        url: '/api/saf/check/checkresult',
      }
    },
    refInfoFacilityType: {
      insert: {
        url: '/api/saf/baseinfo/createfacilitytype',
      },
      edit: {
        url: '/api/saf/baseinfo/updatefacilitytype',
      }
    },
    refInfoFacilityTypeItem: {
      insert: {
        url: '/api/saf/baseinfo/createfacilitytypeitem',
      },
      edit: {
        url: '/api/saf/baseinfo/updatefacilitytypeitem',
      }
    },
    facilityCheckResult: {
      insert: {
        url: '/api/saf/facility/facilitycheckresult',
      },
    },
    facilityMst: {
      insert: {
        url: '/api/saf/facility/facilitymst',
      },
      edit: {
        url: '/api/saf/facility/facilitymst',
      }
    },
    spe: {
      insert: {
        url: '/api/saf/spe/spe',
      },
      edit: {
        url: '/api/saf/spe/spe',
      }
    },
    facilityCheckItem: {
      insert: {
        url: '/api/saf/baseinfo/createfacilitycheckitem',
      },
      edit: {
        url: '/api/saf/baseinfo/updatefacilitycheckitem',
      }
    },
    holiday: {
      insert: {
        url: '/api/saf/baseinfo/createholiday',
      },
      edit: {
        url: '/api/saf/baseinfo/updateholiday',
      }
    },
    eduResult: {
      insert: {
        url: '/api/saf/education/createedueresult',
      },
      edit: {
        url: '/api/saf/education/updateedueresult',
      },
      delete: {
        url: '/api/saf/education/deleteedueresult',
      },
      editComple: {
        url: '/api/saf/education/updateeducomple',
      }
    },
    noAccidentResult: {
      insert: {
        url: '/api/saf/noaccident/createnoaccident',
      },
      edit: {
        url: '/api/saf/noaccident/updatenoaccident',
      }
    }
  },
  // 권한 그룹
  authGrp: {
    insert: {
      url: '/api/manage/authgrp'
    },
    edit: {
      url: '/api/manage/authgrp/{0}'
    },
    delete: {
      url: '/api/manage/authgrp/{0}/{1}'
    }
  },
  authGrpMenu: {
    insert: {
      url: '/api/manage/authgrpmenu'
    },
    delete: {
      url: '/api/manage/authgrpmenu'
    }
  },
  userAuthGrp: {
    insert: {
      url: '/api/manage/userauthgrp'
    },
  },
  userMenu: {
    insert: {
      url: '/api/manage/usermenu'
    },
  },
  login: {
    insert: {
      url: 'api/manage/login'
    }
  },
};

export default transactionConfig;
