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
          edit: { url: '/api/env/air/facility/preventionfacilitychangehistory' },
          delete: { url: '/api/env/air/facility/preventionfacilitychangehistory' }
        },
        preventionMaintenanceHistory: {
          insert: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory' },
          edit: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory' },
          delete: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory' }
        }        
      },
      operationLog: {
        insert: { url: '/api/env/air/operation/operationlog' },
        edit: { url: '/api/env/air/operation/operationlogresult' },
        outletCheckResult: { 
          edit: { url: '/api/env/air/operation/outletcheckresults' } 
        },
        prevnetFacPwrcChkResult: { 
          edit: { url: '/api/env/air/operation/preventionfacilitypowercheckresults' } 
        },
        outletTestItemResult: { 
          edit: { url: '/api/env/air/operation/outlettestitemresults' } 
        },
        fuelCheckResult: { 
          edit: { url: '/api/env/air/operation/fuelcheckresults' } 
        },
        ingredientCheckResult: { 
          edit: { url: '/api/env/air/operation/ingredientcheckresults' } 
        },
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
      },
      operationLog: {
        disposalRequest: {
          insert: { url: '/api/env/waste/disposal/disposalrequest' },
          edit: { url: '/api/env/waste/disposal/disposalrequest' },
          delete: { url: '/api/env/waste/disposal/disposalrequest/{0}' }
        },
        disposalResult: {
          insert: { url: '/api/env/waste/disposal/disposalresult' },
          edit: { url: '/api/env/waste/disposal/disposalresult' },
          delete: { url: '/api/env/waste/disposal/disposalresult/{0}' },
          complete: { url: '/api/env/waste/disposal/disposalresultcomplete' },
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
          delete: { url: '/api/env/water/baseinfo/cheminhist/cheminhist' },
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
          delete: { url: '/api/env/water/facility/preventfacbreakhist/preventfacbreakhist' }
        },
      },
      operationLog: {
        dailyReport: {
          edit: { url: '/api/env/water/operationlog/operation/dailyreport' },
        },
        suplChkResult: {
          edit: { url: '/api/env/water/operationlog/operation/suplchkresult' },
        },
        dischChkResult: {
          edit: { url: '/api/env/water/operationlog/operation/dischchkresult' },
        },
        chemChkResult: {
          edit: { url: '/api/env/water/operationlog/operation/chemchkresult' },
        },
        pwrcChkResult: {
          edit: { url: '/api/env/water/operationlog/operation/pwrcchkresult' },
        },
        aerationTankChkResult: {
          edit: { url: '/api/env/water/operationlog/operation/aerationtankchkresult' },
        },
        ingrChkResult: {
          edit: { url: '/api/env/water/operationlog/operation/ingrchkresult' },
        },
        testItemResult: {
          edit: { url: '/api/env/water/operationlog/operation/testitemresult' },
        },
        dischRunTm: {
          edit: { url: '/api/env/water/operationlog/operation/dischruntm' },
        },
        preventRunTm: {
          edit: { url: '/api/env/water/operationlog/operation/preventruntm' },
        },
        operationLog: {
          insert: { url: '/api/env/water/operationlog/operation/operationlog' },
        },
      }
    }
  },
  // 기초정보 Config
  baseInfo: {
    chemical: {
      insert: {
        url: '/api/baseinfo/chemical/createchemical',
      },
      edit: {
        url: '/api/baseinfo/chemical/updatechemical',
      }
    },
    chemprod: {
      insert: {
        url: '/api/baseinfo/chemprod/createchemprod',
      },
      edit: {
        url: '/api/baseinfo/chemprod/updatechemprod',
      }
    },
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
      },
      delete: {
        url: '/api/saf/wkod/wkodmaster'
      },
    },
    imprAct: {
      insert: {
        url: '/api/saf/impract/impract'
      },
      edit: {
        url: '/api/saf/impract/impract'
      },
      delete: {
        url: '/api/saf/impract/impract'
      },
    },
    checkResult: {
      insert: {
        url: '/api/saf/check/checkresult',
      },
      edit: {
        url: '/api/saf/check/checkresult',
      },
      delete: {
        url: '/api/saf/check/checkresult/{0}',
      },
      deletes: {
        url: '/api/saf/check/checkresults',
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
      edit: {
        url: '/api/saf/facility/facilitycheckresult',
      },
      delete: {
        url: '/api/saf/facility/facilitycheckresult/{0}',
      },
      deletes: {
        url: '/api/saf/facility/facilitycheckresults',
      },
    },
    facilityMst: {
      insert: {
        url: '/api/saf/facility/facilitymst',
      },
      edit: {
        url: '/api/saf/facility/facilitymst',
      },
      delete: {
        url: '/api/saf/facility/facilitymst/{0}'
      }
    },
    spe: {
      insert: {
        url: '/api/saf/spe/spe',
      },
      edit: {
        url: '/api/saf/spe/spe',
      },
      delete: {
        url: '/api/saf/wkod/wkodmaster'
      }
    },
    speRqst: {
      finish: {
        url: '/api/saf/spe/finishsperqst',
      },
      insert: {
        url: '/api/saf/spe/sperqst',
      },
      edit: {
        url: '/api/saf/spe/sperqst',
      },
      delete: {
        url: '/api/saf/spe/sperqst/{0}'
      },
    },
    speGive: {
      finish: {
        url: '/api/saf/spe/finishspegive',
      },
      insert: {
        url: '/api/saf/spe/spegive',
      },
      edit: {
        url: '/api/saf/spe/spegive',
      },
      delete: {
        url: '/api/saf/spe/spegive/{0}'
      },
    },
    speIn: {
      insert: {
        url: '/api/saf/spe/createspein',
      },
      edit: {
        url: '/api/saf/spe/updatespein',
      },
      delete: {
        url: '/api/saf/spe/deletespein',
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
    },
    accident: {
      insert: {
        url: '/api/saf/accident/accident'
      },
      edit: {
        url: '/api/saf/accident/accident'
      },
      delete: {
        url: '/api/saf/accident/accident/{0}'
      },
    },
    accidentCauMeas: {
      delete: {
        url: '/api/saf/accident/accidentcaumeas/{0}/{1}'
      },
    },
    nearmiss: {
      insert: {
        url: '/api/saf/accident/createnearmiss'
      },
      edit: {
        url: '/api/saf/accident/updatenearmiss'
      },
      delete: {
        url: '/api/saf/accident/deletenearmiss'
      },
      editComple: {
        url: '/api/saf/accident/complenearmiss'
      },
    }
  },
  
  // 직무위험성평가 Config
  rsa: {
    workArea: {
      insert: {
        url: '/api/rsa/baseinfo/workarea'
      },
      edit: {
        url: '/api/rsa/baseinfo/workarea'
      },
      delete: {
        url: '/api/rsa/baseinfo/workarea/{0}'
      },
    },
    assessType: {
      insert: {
        url: '/api/rsa/baseinfo/assesstype'
      },
      edit: {
        url: '/api/rsa/baseinfo/assesstype'
      },
    },
    assessEstablish: {
      insert: {
        url: '/api/rsa/assess/assessestablish'
      },
      edit: {
        url: '/api/rsa/assess/assessestablish'
      },
      delete: {
        url: '/api/rsa/assess/assessestablish/{0}'
      },
    },
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
  user: {
    insert: {
      url: '/api/manage/user'
    },
    update: {
      url: '/api/manage/user'
    },
    // 사용자 암호변경
    password: {
      url: '/api/manage/password/{0}'
    }
  },
  login: {
    insert: {
      url: 'api/manage/login'
    }
  },
  attachFile: {
    insert: {
      url: '/api/attachfile/uploadfiles'
    }
  }
};

export default transactionConfig;
