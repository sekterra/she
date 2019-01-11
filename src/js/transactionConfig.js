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
      url: '/api/hea/drug/drugManage',
    },
    edit: {
      url: '/api/hea/drug/drugManage',
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
};

export default transactionConfig;
