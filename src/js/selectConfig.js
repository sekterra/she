/**
 * 조회용 config
 */
let selectConfig = {
  menus: {
    list: {
      url: '/menus',
      // param: {}
    },
    get: {
      url: '/menus/{0}'
    }
  },
  apiContents: {
    list: {
      url: '/menus/{0}/api_contents',
      // param: {}
    }
  },
  checkupOrgTestItem: {
    list: {
      url: '/api/hea/baseinfo/checkuporgtestitems'
    }
  },
  checkupOrg: {
    list: {
      url: '/api/hea/baseinfo/checkuporgs'
    },
    get: {
      url: '/api/hea/baseinfo/checkuporg/{0}'
    }
  },
  testItem: {
    list: {
      url: '/api/hea/baseinfo/testitems'
    },
    get: {
      url: '/api/hea/baseinfo/testitem/{0}'
    }
  },
  checkupTestItem: {
    list: {
      url: '/api/hea/baseinfo/checkuptestitems'
    }
  },
  codeMaster: {
    list: {
      url: '/api/manage/codemaster/codemasters'
    },
    get: {
      url: '/api/manage/codemaster/codemaster/{0}'
    },
    getSelect: {
      url: '/api/manage/codemaster/getselect/{0}'
    },
    allList: { 
      url: '/api/manage/codeallmasters' 
    },
  },
  disease: {
    list: {
      url: '/api/hea/baseinfo/diseases'
    },
    get: {
      url: '/api/hea/baseinfo/disease/{0}'
    }
  },
  checkupResult: {
    list: {
      url: '/api/hea/checkup/checkupresults'
    },
    get: {
      url: '/api/hea/checkup/checkupresult/{0}/{1}'
    }
  },
  checkupResultDiag: {
    list: {
      url: '/api/hea/checkup/checkupresultdiags'
    }
  },
  testItemResult: {
    list: {
      url: '/api/hea/checkup/testitemresults'
    }
  },
  drugManage: {
    list: {
      url: '/api/hea/drug/drugmanages'
    },
    get: {
      url: '/api/hea/drug/drugmanage/{0}'
    }
  },
  infirmaryPrescribe: {
    list: {
      url: '/api/hea/infirmary/infirmaryprescribes'
    },
    get: {
      url: '/api/hea/infirmary/infirmaryprescribe/{0}'
    }
  },
  infirmaryUsageHistory: {
    list: {
      url: '/api/hea/infirmary/infirmaryusagehistorys'
    },
    get: {
      url: '/api/hea/infirmary/infirmaryusagehistory'
    },
  },
  infirmaryUsage: {
    get: {
      url: '/api/hea/infirmary/infirmaryusage/{0}'
    },
  },
  prescribeHistory: {
    list: {
      url: '/api/hea/infirmary/prescribehistorys'
    },
  },
  checkupHistory: {
    list: {
      url: '/api/hea/infirmary/checkuphistorys'
    },
  },
  suspectUser: {
    list: {
      url: '/api/hea/infirmary/suspectusers',
      all: {
        url: '/api/hea/infirmary/suspectusersofall'
      },
      hist: {
        url: '/api/hea/infirmary/suspectuserhists'        
      }
    },
  },
  interviewItem: {
    list: {
      url: '/api/hea/baseinfo/interviewitems'
    },
    get: {
      url: '/api/hea/baseinfo/interviewitem/{0}'
    }
  },
  hazard: {
    list: {
      url: '/api/hea/workingenvmanage/hazards'
    },
    get: {
      url: '/api/hea/workingenvmanage/hazard/{0}'
    }
  },
  consult: {
    list: {
      url: '/api/hea/infirmary/consults'
    },
    get: {
      url: '/api/hea/infirmary/consult/{0}'
    }
  },
  checkupPlan: {
    list: {
      url: '/api/hea/checkup/checkupplans'
    },
    get: {
      url: '/api/hea/checkup/checkupplan/{0}'
    }
  },
  checkupPlanOrg: {
    list: {
      url: '/api/hea/checkup/checkupplanorgs'
    }
  },  
  checkupReserve: {
    list: {
      url: '/api/hea/checkup/checkupreserves'
    },
    get: {
      url: '/api/hea/checkup/checkupreserve'
    },
    orgStatus: {
      url: '/api/hea/checkup/checkupreserveorgstatus'
    }
  },
  checkupPlanOrgTestItem: {
    list: {
      url: '/api/hea/checkup/checkupplanorgtestitems'
    }
  },
  rsrvDate: {
    list: {
      url: '/api/hea/checkup/rsrvdates'
    }
  },
  checkupStatus: {
    list: {
      url: '/api/hea/checkup/checkupstatuses'
    }
  },
  checkupUser: {
    list: {
      url: '/api/hea/checkup/checkupusers'      
    }
  },
  checkupUserNoTarget: {
    list: {
      url: '/api/hea/checkup/checkupusersnotarget'      
    }
  },

  // 시스템 관리 Config
  manage: {
    dept: {
      list: { url: 'api/manage/depts' },
    },
    user: {
      list: { url: 'api/manage/users' },
    },
    loginuser: {
      get: {
        url: 'api/manage/loginuserinfo'
      }
    },
    process: {
      list: { url: '/api/manage/processes' },
      get: { url: '/api/manage/process/{0}' }
    },
    codeMaster: {
      list: { url: '/api/manage/codemasters' },
      get: { url: '/api/manage/codemaster/{0}' },
      getSelect: { url: '/api/manage/codemaster/getselect/{0}' },
      allList: { url: '/api/manage/codeallmasters' },
    },
    codeGroup: {
      list: { url: '/api/manage/codegroups' },
      get: { url: '/api/manage/codegroup/{0}' }
    }
  },

  // 환경 Config
  env: {
    com: {
      baseInfo: {
        codeGroup: {
          list: { url: '/api/env/com/baseinfo/codegroups' },
          get: { url: '/api/env/com/baseinfo/codegroup/{0}' }
        },
        codeMaster: {
          list: { url: '/api/env/com/baseinfo/codemasters' },
          get: { url: '/api/env/com/baseinfo/codemaster/{0}/{1}' }
        }
      }
    },
    air: {
      baseInfo: {
        codeGroup: {
          list: { url: '/api/env/air/baseinfo/codegroups' },
          get: { url: '/api/env/air/baseinfo/codegroup/{0}' }
        },
        codeMaster: {
          list: { url: '/api/env/air/baseinfo/codemasters' },
          get: { url: '/api/env/air/baseinfo/codemaster/{0}/{1}' }
        },
        testItem: {
          list: { url: '/api/env/air/baseinfo/testitems' },
          get: { url: '/api/env/air/baseinfo/testitem/{0}' }
        },
        outlet: {
          list: { url: '/api/env/air/baseinfo/outlets' },
          get: { url: '/api/env/air/baseinfo/outlet/{0}' }          
        },
        fuel: {
          list: { url: '/api/env/air/baseinfo/fuels' },
          get: { url: '/api/env/air/baseinfo/fuel/{0}' }          
        },
        ingredient: {
          list: { url: '/api/env/air/baseinfo/ingredients' },
          get: { url: '/api/env/air/baseinfo/ingredient/{0}' }          
        }
      },
      facility: {
        discharge: {
          list: { url: '/api/env/air/facility/dischargefacilities' },
          get: { url: '/api/env/air/facility/dischargefacility/{0}' }          
        },
        prevention: {
          list: { url: '/api/env/air/facility/preventionfacilities' },
          get: { url: '/api/env/air/facility/preventionfacility/{0}' }          
        },
        preventionChangeHistory: {
          list: { url: '/api/env/air/facility/preventionfacilitychangehistories' },
          get: { url: '/api/env/air/facility/preventionfacilitychangehistory/{0}/{1}' }          
        },
        preventionMaintenanceHistory: {
          list: { url: '/api/env/air/facility/preventionfacilitymaintenancehistories' },
          get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' }
        },
      },
      operationLog: {
        list: { url: '/api/env/air/operation/operationlogs' },
        get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' },
        outletCheckResult: { 
          get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' } 
        },
        prevnetionFacilityPwrcCheckResult: { 
          get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' } 
        },
        outletTestItemResult: { 
          get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' } 
        },
        fuelCheckResult: { 
          get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' } 
        },
        IngredientCheckResult: { 
          get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' } 
        },
      }
    },
    waste: {
      baseInfo: {
        codeGroup: {
          list: { url: '/api/env/waste/baseinfo/codegroups' },
          get: { url: '/api/env/waste/baseinfo/codegroup/{0}' }
        },
        codeMaster: {
          list: { url: '/api/env/waste/baseinfo/codemasters' },
          get: { url: '/api/env/waste/baseinfo/codemaster/{0}/{1}' }
        },
        wasteDisposalMethod: {
          list: { url: '/api/env/waste/baseinfo/wastedisposalmethods' },
          get: { url: '/api/env/waste/baseinfo/wastedisposalmethod/{0}' }
        },
        wasteClass: {
          list: { url: '/api/env/waste/baseinfo/wasteclasses' },
          get: { url: '/api/env/waste/baseinfo/wasteclass/{0}' }
        },
        waste: {
          list: { url: '/api/env/waste/baseinfo/wastes' },
          get: { url: '/api/env/waste/baseinfo/waste/{0}' }
        },
        disposalCompany: {
          list: { url: '/api/env/waste/baseinfo/disposalcompanies' },
          get: { url: '/api/env/waste/baseinfo/disposalcompany/{0}' }
        }
      }
    },
    water: {
      baseInfo: {
        codeGroup: {
          list: { url: '/api/env/water/baseinfo/codegroups' },
          get: { url: '/api/env/water/baseinfo/codegroup/{0}' }
        },
        codeMaster: {
          list: { url: '/api/env/water/baseinfo/codemasters' },
          get: { url: '/api/env/water/baseinfo/codemaster/{0}/{1}' }
        },
        supply: {
          list: { url: '/api/env/water/baseinfo/supply/supplys' },
          get: { url: '/api/env/water/baseinfo/supply/supply/{0}' }
        },
        discharge: {
          list: { url: '/api/env/water/baseinfo/discharge/discharges' },
          get: { url: '/api/env/water/baseinfo/discharge/discharge/{0}' }
        },
        testItem: {
          list: { url: '/api/env/water/baseinfo/testitem/testitems' },
          get: { url: '/api/env/water/baseinfo/testitem/testitem/{0}' }
        },
        monPos: {
          list: { url: '/api/env/water/baseinfo/monpos/monposs' },
          get: { url: '/api/env/water/baseinfo/monpos/monpos/{0}' }
        },
        ingredient: {
          list: { url: '/api/env/water/baseinfo/ingredient/ingredients' },
          get: { url: '/api/env/water/baseinfo/ingredient/ingredient/{0}' }
        },
        chemical: {
          list: { url: '/api/env/water/baseinfo/chemical/chemicals' },
          get: { url: '/api/env/water/baseinfo/chemical/chemical/{0}' }
        },
        chemInHist: {
          list: { url: '/api/env/water/baseinfo/cheminhist/cheminhists' },
          get: { url: '/api/env/water/baseinfo/cheminhist/cheminhist/{0}' }
        },
      },
      facility: {
        wasteDischFac: {
          list: { url: '/api/env/water/facility/wastedischfac/wastedischfacs' },
          get: { url: '/api/env/water/facility/wastedischfac/wastedischfac/{0}' }
        },
        pwrMeter: {
          list: { url: '/api/env/water/facility/pwrmeter/pwrmeters' },
          get: { url: '/api/env/water/facility/pwrmeter/pwrmeter/{0}' }
        },
        aerationTank: {
          list: { url: '/api/env/water/facility/aerationtank/aerationtanks' },
          get: { url: '/api/env/water/facility/aerationtank/aerationtank/{0}' }
        },
        guided: {
          list: { url: '/api/env/water/facility/guided/guideds' },
          get: { url: '/api/env/water/facility/guided/guided/{0}' }
        },
        preventFac: {
          list: { url: '/api/env/water/facility/preventfac/preventfacs' },
          get: { url: '/api/env/water/facility/preventfac/preventfac/{0}' }
        },
        preventFacBreakHist: {
          list: { url: '/api/env/water/facility/preventfacbreakhist/preventfacbreakhists' },
          get: { url: '/api/env/water/facility/preventfacbreakhist/preventfacbreakhist/{0}' }
        },
      },
      operationLog: {
        dailyReport: {
          list: { url: '/api/env/water/operationlog/operation/dailyreports' },
          get: { url: '/api/env/water/operationlog/operation/dailyreport/{0}' }
        },
        suplChkResult: {
          list: { url: '/api/env/water/operationlog/operation/suplchkresults' },
        },
        dischChkResult: {
          list: { url: '/api/env/water/operationlog/operation/dischchkresults' },
        },
        chemChkResult: {
          list: { url: '/api/env/water/operationlog/operation/chemchkresults' },
        },
        pwrcChkResult: {
          list: { url: '/api/env/water/operationlog/operation/pwrcchkresults' },
        },
        aerationTankChkResult: {
          list: { url: '/api/env/water/operationlog/operation/aerationtankchkresults' },
        },
      },
    }
  },

  // 안전 Config
  saf: {
    checkKind: {
      list: {
        url: '/api/saf/baseinfo/getcheckkindlist'
      },
      get: {
        url: '/api/saf/baseinfo/getcheckkinditem/{0}'
      }
    },
    checkItem: {
      list: {
        url: '/api/saf/baseinfo/getcheckitemlist'
      },
      get: {
        url: '/api/saf/baseinfo/getcheckitem/{0}'
      },
      getSelect: {
        url: '/api/saf/baseinfo/getcombocheckkindlist'
      }
    },
    wkodChkItem: {
      list: {
        url: '/api/saf/wkod/wkodchkitems'
      },
      get: {
        url: '/api/saf/wkod/wkodchkitem/{0}'
      }
    },
    wkodMatMst: {
      list: {
        url: '/api/saf/wkod/wkodmatmsts'
      },
      get: {
        url: '/api/saf/wkod/wkodmatmst/{0}'
      }
    },
    wkodMaster: {
      list: {
        url: '/api/saf/wkod/wkodmasters'
      },
      get: {
        url: '/api/saf/wkod/wkodmaster/{0}'
      },
      getTabData: {
        url: '/api/saf/wkod/wkodmastertabdata/{0}'
      }
    },
    checkResult: {
      list: {
        url: '/api/saf/check/checkresults'
      },
      get: {
        url: '/api/saf/check/checkresult/{0}'
      },
    },
    checkInspector: {
      list: {
        url: '/api/saf/check/checkinspectors'
      },
      get: {
        url: '/api/saf/check/checkinspector/{0}'
      },
    },
    checkItemResult: {
      list: {
        url: '/api/saf/check/checkitemresults'
      },
      get: {
        url: '/api/saf/check/checkitemresult/{0}'
      },
    },
    facilityMst: {
      list: {
        url: '/api/saf/facility/facilitymsts'
      },
    },
    facilityCheckResult: {
      list: {
        url: '/api/saf/facility/facilitycheckresults'
      },
    },
    facilityType: {
      list: {
        url: '/api/saf/facility/facilitytype'
      },
    },
    facilityCheckInspector: {
      list: {
        url: '/api/saf/facility/facilitycheckinspectors'
      },
      get: {
        url: '/api/saf/facility/facilitycheckinspector/{0}'
      },
    },
    accident: {
      list: {
        url: '/api/saf/accident/accidents'
      },
      get: {
        url: '/api/saf/accident/accident/{0}'
      },
    },
    accidentOccType: {
      list: {
        url: '/api/saf/accident/accidentocctypes'
      },
      get: {
        url: '/api/saf/accident/accidentocctype/{0}'
      },
    },
    facilityItemResult: {
      list: {
        url: '/api/saf/facility/facilityitemresults'
      },
      get: {
        url: '/api/saf/facility/facilityitemresult/{0}'
      },
    },
    noAccidentResult: {
      list: {
        url: '/api/saf/noaccident/noaccidents'
      },
    },
    spe: {
      list: {
        url: '/api/saf/spe/facilitytypes'
      },
    },
    refInfoFacilityType: {
      list: {
        url: '/api/saf/baseinfo/getfacilitytypelist'
      },
      get: {
        url: '/api/saf/baseinfo/getfacilitytype/{0}'
      },
    },
    refInfoFacilityTypeItem: {
      list: {
        url: '/api/saf/baseinfo/getfacilitytypeitemlist'
      },
      get: {
        url: '/api/saf/baseinfo/getfacilitytypeitem/{0}'
      },
    },
    facilityCheckItem: {
      list: {
        url: '/api/saf/baseinfo/getfacilitycheckitemlist'
      },
      get: {
        url: '/api/saf/baseinfo/getfacilitycheckitem/{0}'
      },
    },
    holiday: {
      list: {
        url: '/api/saf/baseinfo/getholidaylist'
      },
      get: {
        url: '/api/saf/baseinfo/getholiday/{0}'
      },
    },
    eduResult: {
      list: {
        url: '/api/saf/education/getedueresultlist'
      },
      get: {
        url: '/api/saf/education/getedueresult/{0}'
      },
      getUser: {
        url: '/api/saf/education/getedueresultuser/{0}'
      }
    },
    edueStatus: {
      list: {
        url: '/api/saf/education/geteduestatuslist'
      },
    }
  },
  // 메뉴 트리 기초 정보
  menuTreeBases: {
    list: {
      url: '/api/common/menutreebases'
    }
  },
  // 권한 그룹
  authGrp: {
    list: {
      url: '/api/manage/authgrps'
    },
    get: {
      url: '/api/manage/authgrp/{0}'
    }
  },
  authGrpMenu: {
    list: {
      url: '/api/manage/authgrpmenus/{0}'
    }
  },
  userAuthGrp: {
    list: {
      url: '/api/manage/userauthgrps'
    }
  },
  userMenu: {
    list: {
      url: '/api/manage/usermenus'
    },
    get: {
      url: '/api/manage/usermenus/'
    }
  }
};

export default selectConfig;
