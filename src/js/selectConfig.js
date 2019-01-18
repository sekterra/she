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
    }
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
      url: '/api/hea/infirmary/suspectusers'
    },
  },
  process: {
    list: {
      url: '/api/manage/process/processes'
    },
    get: {
      url: '/api/manage/process/process'
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
  suspectUserPopup: {
    list: {
      url: '/api/hea/infirmary/suspectuserpopups'
    },
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
  dept: {
    list: {
      url: 'api/manage/user/depts'
    },
  },
  user: {
    list: {
      url: 'api/manage/user/users'
    },
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

  // 안전 Config
  wkodChkItem: {
    list: {
      url: '/api/saf/wkod/wkodChkItems'
    },
    get: {
      url: '/api/saf/wkod/wkodChkItem/{0}'
    }
  },
  wkodMatMst: {
    list: {
      url: '/api/saf/wkod/wkodMatMsts'
    },
    get: {
      url: '/api/saf/wkod/wkodMatMst/{0}'
    }
  },
  wkodMaster: {
    list: {
      url: '/api/saf/wkod/wkodMaster'
    },
    get: {
      url: '/api/saf/wkod/wkodMaster/{0}'
    }
  }
};

export default selectConfig;
