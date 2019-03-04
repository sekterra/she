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
      get: { url: 'api/manage/user/{0}' }
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
          get: { url: '/api/env/air/facility/preventionfacilitychangehistory/{0}' }          
        },
        preventionMaintenanceHistory: {
          list: { url: '/api/env/air/facility/preventionfacilitymaintenancehistories' },
          get: { url: '/api/env/air/facility/preventionfacilitymaintenancehistory/{0}' }
        },
      },
      operationLog: {
        list: { url: '/api/env/air/operation/operationlogs' },
        get: { url: '/api/env/air/operation/operationlogresult/{0}' },        
        outletCheckResult: { 
          get: { url: '/api/env/air/operation/outletcheckresults/{0}' } 
        },
        prevnetFacPwrcChkResult: { 
          get: { url: '/api/env/air/operation/preventionfacilitypowercheckresults/{0}' } 
        },
        outletTestItemResult: { 
          get: { url: '/api/env/air/operation/outlettestitemresults/{0}' } 
        },
        fuelCheckResult: { 
          get: { url: '/api/env/air/operation/fuelcheckresults/{0}' } 
        },
        ingredientCheckResult: { 
          get: { url: '/api/env/air/operation/ingredientcheckresults/{0}' } 
        },
      },
      operationStatus: { 
        list: { url: '/api/env/air/operation/operationstatus' },
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
      },
      operationLog: {
        disposalRequest: {
          list: { url: '/api/env/waste/disposal/disposalrequests' },
          get: { url: '/api/env/waste/disposal/disposalrequest/{0}' }
        },
        disposalResult: {
          list: { url: '/api/env/waste/disposal/disposalresults' },
          get: { url: '/api/env/waste/disposal/disposalresult/{0}' }
        },
        dailyReport: {
          amgGen: {
            list: { url: '/api/env/waste/operation/operationlogamtgens' }
          },
          selfDispo: {
            list: { url: '/api/env/waste/operation/operationlogselfdisposals' }
          },
          consignDispo: {
            list: { url: '/api/env/waste/operation/operationlogconsigndisposals' }
          }
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
        monPosTestItem: {
          list: { url: '/api/env/water/baseinfo/monpos/monpostestitems' },
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
        ingrChkResult: {
          list: { url: '/api/env/water/operationlog/operation/ingrchkresults' },
        },
        testItemResult: {
          list: { url: '/api/env/water/operationlog/operation/testitemresults' },
        },
        dischRunTm: {
          list: { url: '/api/env/water/operationlog/operation/dischruntms' },
        },
        preventRunTm: {
          list: { url: '/api/env/water/operationlog/operation/preventruntms' },
        },
        chemicalStatus: { 
          list: { url: '/api/env/water/operationlog/operation/chemicalstatus' },
        }
      },
      operationStatus: { 
        list: { url: '/api/env/water/operationlog/operation/operationstatus' },
      }
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
    imprAct: {
      list: {
        url: '/api/saf/impract/impracts'
      },
      get: {
        url: '/api/saf/impract/impract/{0}'
      },
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
      get: {
        url: '/api/saf/facility/facilitymst/{0}'
      },
    },
    facilityMstStatus: {
      list: {
        url: '/api/saf/facility/facilitymststatus'
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
    facilityTypeItem: {
      list: {
        url: '/api/saf/facility/facilitytypeitems'
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
    nearmiss: {
      list: {
        url: '/api/saf/accident/getnearmisslist'
      },
      get: {
        url: '/api/saf/accident/getnearmiss/{0}'
      },
      getImprActList: {
        url: '/api/saf/accident/getimpractlist/{0}'
      }
    },
    spe: {
      list: {
        url: '/api/saf/spe/spes'
      },
      get: {
        url: '/api/saf/spe/spe/{0}'
      },
    },
    speRqst: {
      list: {
        url: '/api/saf/spe/sperqsts'
      },
      get: {
        url: '/api/saf/spe/sperqst/{0}'
      },
    },
    speRqstDtl: {
      list: {
        url: '/api/saf/spe/sperqstdtls'
      },
    },
    speGive: {
      list: {
        url: '/api/saf/spe/spegives'
      },
      get: {
        url: '/api/saf/spe/spegive/{0}'
      },
    },
    speGiveDtl: {
      list: {
        url: '/api/saf/spe/spegivedtls'
      },
    },
    speInList: {
      list: {
        url: '/api/saf/spe/speinlist'
      },
      get: {
        url: '/api/saf/spe/spein/{0}'
      }
    },
    speInDtl: {
      list: {
        url: '/api/saf/spe/speindtls'
      },
    },
    speGiveinList: {
      list: {
        url: '/api/saf/spe/spegiveinlist'
      }
    },
    speGiveinStatus: {
      list: {
        url: '/api/saf/spe/spegiveinstatus'
      }
    },
    accident: {
      list: {
        url: '/api/saf/accident/accidents'
      },
      get: {
        url: '/api/saf/accident/accident/{0}'
      },
      accidentNum: {
        get: {
          url: '/api/saf/accident/accident/accidentnum/{0}'
        },
      },
    },
    accidentInvest: {
      list: {
        url: '/api/saf/accident/accidentinvests'
      },
      get: {
        url: '/api/saf/accident/accidentinvest/{0}'
      },
    },
    accidentVictim: {
      list: {
        url: '/api/saf/accident/accidentvictims'
      },
      get: {
        url: '/api/saf/accident/accidentvictim/{0}'
      },
    },
    accidentInvestPsn: {
      list: {
        url: '/api/saf/accident/accidentinvestpsns'
      },
      get: {
        url: '/api/saf/accident/accidentinvestpsn/{0}'
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
    accidentCauMeas: {
      list: {
        url: '/api/saf/accident/accidentcaumeass'
      },
      get: {
        url: '/api/saf/accident/accidentcaumeas/{0}'
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
      get: {
        url: '/api/saf/noaccident/getnoaccident/{0}'
      },
      getNoaccLastView: {
        url: '/api/saf/noaccident/getnoaccidentlastview'
      },
    },
    // spe: {
    //   list: {
    //     url: '/api/saf/spe/facilitytypes'
    //   },
    // },
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
  // 기초정보 Config
  baseInfo: {
    chemical: {
      list: {
        url: '/api/baseinfo/chemical/chemicals'
      },
      get: {
        url: '/api/baseinfo/getchemicalitem/{0}'
      }
    },
    // 취급물질
    chemprod: {
      list: {
        url: '/api/baseinfo/chemprod/getchemprodlist'
      },
      get: {
        url: '/api/baseinfo/chemprod/getchemprod/{0}'
      },
      chemlist: {
        url: '/api/baseinfo/chemprod/getchemlist/{0}'
      }
    },
  },
  // 메뉴 트리 기초 정보
  menuTreeBases: {
    list: {
      url: '/api/common/menutreebases'
    }
  },
  // 유해인자 트리 기초 정보
  hazardtreebases: {
    list: {
      url: '/api/common/hazardtreebases'
    }
  },
  
  // 직무위험성평가 Config
  rsa: {
    workArea: {
      list: {
        url: '/api/rsa/baseinfo/workareas'
      },
      get: {
        url: '/api/rsa/baseinfo/workarea/{0}'
      }
    },
    assessEstablish: {
      list: {
        url: '/api/rsa/assess/assessestablishs'
      },
      get: {
        url: '/api/rsa/assess/assessestablish/{0}'
      }
    },
    jobRiskBookKRAS: {
      list: {
        url: '/api/rsa/jobriskbook/jobriskbookkrass'
      },
      get: {
        url: '/api/rsa/jobriskbook/jobriskbookkras/{0}'
      }
    },
    jobRiskBookJSA: {
      list: {
        url: '/api/rsa/jobriskbook/jobriskbookjsas'
      },
      get: {
        url: '/api/rsa/jobriskbook/jobriskbookjsa/{0}'
      }
    },
    jobRiskBookCHARM: {
      list: {
        url: '/api/rsa/jobriskbook/jobriskbookcharms'
      },
      get: {
        url: '/api/rsa/jobriskbook/jobriskbookcharm/{0}'
      }
    },
    workMeasureResultChemical: {
      list: {
        url: '/api/rsa/workmeasureresult/workmeasureresultchemicals'
      },
      get: {
        url: '/api/rsa/workmeasureresult/workmeasureresultchemical/{0}'
      }
    },
    workMeasureResultPhysical: {
      list: {
        url: '/api/rsa/workmeasureresult/workmeasureresultphysicals'
      },
      get: {
        url: '/api/rsa/workmeasureresult/workmeasureresultphysical/{0}'
      }
    },
    assessType: {
      list: {
        url: '/api/rsa/baseinfo/assesstypes'
      },
      get: {
        url: '/api/rsa/baseinfo/assesstype/{0}'
      }
    },
    riskHazard: {
      plist: {
        url: '/api/rsa/baseinfo/priskhazard'
      },
      list: {
        url: '/api/rsa/baseinfo/riskhazards'
      },
      get: {
        url: '/api/rsa/baseinfo/riskhazard/{0}'
      }
    },
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
  },
  // 첨부파일
  attachFile: {
    list: {
      url: '/api/attachfile/uploadfiles'
    },
    get: {
      url: '/api/attachfile/uploadfile/{0}'
    },
    zip: {
      url: '/api/attachfile/zipping'
    }
  }
};

export default selectConfig;
