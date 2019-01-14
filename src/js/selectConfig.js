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
      url: '/api/hea/baseinfo/checkuporgtestitems/{0}'
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
  drugManage: {
    list: {
      url: '/api/hea/drug/drugManages'
    },
    get: {
      url: '/api/hea/drug/drugManage/{0}'
    }
  },
  infirmaryPrescribe: {
    list: {
      url: '/api/hea/infirmary/infirmaryPrescribes'
    },
    get: {
      url: '/api/hea/infirmary/infirmaryPrescribe/{0}'
    }
  },
  infirmaryUsageHistory: {
    list: {
      url: '/api/hea/infirmary/infirmaryUsageHistorys'
    },
  },
  prescribeHistory: {
    list: {
      url: '/api/hea/infirmary/prescribeHistorys'
    },
  },
  checkupHistory: {
    list: {
      url: '/api/hea/infirmary/checkupHistorys'
    },
  },
  suspectUser: {
    list: {
      url: '/api/hea/infirmary/suspectUsers'
    },
  },
  process: {
    list: {
      url: '/api/manage/process/processes'
    },
    get: {
      url: '/api/manage/process/process'
    },
    create: {
      url: '/api/manage/process/process'
    },
    update: {
      url: '/api/manage/process/process'
    }
  },
  hazard: {
    list: {
      url: '/api/hea/workingenvmanage/hazards'
    }
  },
};

export default selectConfig;
