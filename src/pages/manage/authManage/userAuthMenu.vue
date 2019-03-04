<!--
  목적 : 사용자 권한별 메뉴 컴포넌트
  작성자 : sch
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="">
    <b-container fluid>
      <b-row>
        <!-- 사용자 영역 -->
        <b-col sm="8">
          <y-data-table 
            :headers="userGridOptions.header"
            :height="userGridOptions.height"
            :items="userGridOptions.data"
            :excel-down="true"
            :print="true"
            :rows="5"
            :cellClick="false"
            :useRownum="false"
            label="사용자 목록"
            ref="userGrid"
            v-model="userGridOptions.selectedItems"
            @selectedRow="userGridSelectedRow"
            @selectionChanged="userCheckedChanged"
          >
            <el-table-column
              type="selection"
              slot="selection"
              align="center"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>
        <!-- 권한 그룹 영역 -->
        <b-col sm="4">
          <y-data-table 
            :headers="authGrpGridOptions.header"
            :items="authGrpGridOptions.data"
            :height="300"
            :useRownum="false"
            :label="authGrpLabel"
          >
          </y-data-table>
        </b-col>
      </b-row>
      <b-row>
          <b-col sm="12">
            <div class="float-right mt-3" >
              <y-btn 
                :action-url="userAuthSaveUrl"
                :param="userAuthParam"
                :is-submit="isUserAuthSave"
                title="권한부여"
                color="orange"
                action-type="POST"
                beforeSubmit="beforeUserAuthSave"
                @beforeUserAuthSave="beforeUserAuthSave"
                @btnClicked="btnUserAuthSaveClicked" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
        <!-- 메뉴 영역 -->
        <b-col sm="12">
          <y-data-table
            :headers="userMenuGridOptions.header"
            :items="userMenuGridOptions.data"
            :height="500"
            :useRownum="false"
            :span-options="spanOptions"
            label="사용자별 메뉴 목록"
          >
          </y-data-table>
        </b-col>
      </b-row>
      <b-row>
          <b-col sm="12">
            <div class="float-right mt-3" >
              <y-btn 
                :action-url="userMenuSaveUrl"
                :param="userMenuParam"
                :is-submit="isUserMenuSave"
                title="메뉴권한 수정"
                color="orange"
                action-type="POST"
                beforeSubmit="beforeUserMenuSave"
                @beforeUserMenuSave="beforeUserMenuSave"
                @btnClicked="btnUserMenuSaveClicked" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import arrayToTree from 'array-to-tree'
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig'
import YTreeDataTable from '@/components/YTreeDataTable'
let defaultAuthGrpLabel = '권한그룹 목록';
export default {
  /** attributes: name, components, props, data **/
  name: 'auth-grp-menu',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  components: {
    YTreeDataTable
  },
  props: {
  },
  options: {
    test: 'test attr'
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      userGridOptions: {
        header: [],
        data: [],
        selectedItems: [],
        height: '300',
        getUrl: '',
        getParams: {
          useYn: 'Y'
        }
      },
      authGrpGridOptions: {
        header: [],
        data: [],
        getUrl: '',
        selectedItems: [],
        getParams: {
          useYn: 'Y'
        }
      },
      userMenuGridOptions: {
        header: [],
        data: [],
        selectedItems: [],
        getUrl: '',
        getParams: {
          useYn: 'Y'
        }
      },
      authGrpMenusParam: {}, // 권한 그룹별 메뉴 model
      saveUrl: '',
      menuTree: [],
      isUserAuthSave: false,
      isUserMenuSave: false,
      userAuthSaveUrl: '',
      userAuthParam: {},
      userMenuSaveUrl: '',
      userMenuParam: {},
      spanOptions: {},
      authGrpLabel: defaultAuthGrpLabel,
    };
  },
  computed: {
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // 사용자 조회 정보 할당
      this.userGridOptions.getUrl = selectConfig.manage.user.list.url;
      // 권한 그룹 조회 정보 할당
      this.authGrpGridOptions.getUrl = selectConfig.userAuthGrp.list.url;
      // 사용자 메뉴 조회 정보 할당
      this.userMenuGridOptions.getUrl = selectConfig.userMenu.list.url;
      // 사용자 권한 저장 정보 할당
      this.userAuthSaveUrl = transactionConfig.userAuthGrp.insert.url;
      // 사용자 메뉴 저장 정보 할당
      this.userMenuSaveUrl = transactionConfig.userMenu.insert.url;
      this.getUserList();
      this.getAuthGrps();
      // this.getAllMenus();

      this.userGridOptions.header = [
        { text: '사용자ID', name: 'userId', width: '150px', },
        { text: '사용자명', name: 'userNm', width: '150px', },
        { text: '부서명', name: 'deptNm', width: '200px' },
      ];

      this.authGrpGridOptions.header = [
        { text: '권한그룹명', name: 'authGrpNm', width: '200px' },
        { text: '권한 부여 여부', name: 'settingYn', width: '100px', type: 'checkbox', useDefault: true, align: 'center', sortable: false },
      ];

      this.userMenuGridOptions.header = [
        { text: '사용자ID', name: 'userId', width: '100px', },
        { text: '사용자명', name: 'userNm', width: '100px', },
        { text: '사용자 부서', name: 'deptNm', width: '150px', },
        { text: '메뉴전체경로', name: 'menuFullPath', width: '250px', },
        { text: '메뉴명', name: 'menuNm', width: '100px', },
        { text: '쓰기권한', name: 'writeYn', width: '50px', type: 'checkbox', useDefault: true, align: 'center', sortable: false },
        { text: '메뉴레벨', name: 'menuLvl', width: '100px', align: 'center' },
      ];

      this.spanOptions = [
        { index: 0, field: 'userId' },
        { index: 1, field: 'userNm' },
        { index: 2, field: 'deptNm' },
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    */
    getUserList () {
      this.$http.url = selectConfig.manage.user.list.url;
      this.$http.param = this.userGridOptions.getParams;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.userGridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 기본 권한 그룹 조회
    getAuthGrps () {
      this.$http.url = selectConfig.authGrp.list.url;
      this.$http.param = this.authGrpGridOptions.getParams;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.authGrpGridOptions.data = _result.data;
      });
    },
    // 사용자별 권한 그룹 조회
    getUserAuthGrps () {
      this.$http.url = this.authGrpGridOptions.getUrl;
      this.$http.param = this.authGrpGridOptions.getParams;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.authGrpGridOptions.data = _result.data;
      });
    },
    getAllMenus () {
      this.$http.url = selectConfig.menuTreeBases.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.userMenuGridOptions.data = _result.data;
      });
    },
    // 사용자별 메뉴 목록 조회
    getUserMenus (_userIds) {
      this.$http.url = this.userMenuGridOptions.getUrl;
      this.$http.param = {
        userIds: _userIds
      };
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.userMenuGridOptions.data = _result.data;
      });
    },
    /** /Call API service **/
       
    /** Component Events, Callbacks (버튼 제외) **/
    /**
     * 권한 그룹 그리드 선택
     */
    authGrpGridSelectedRow (_row) {
      this.$http.url = this.$format(selectConfig.authGrpMenu.list.url, _row.authGrpNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.userMenuGridOptions.data = _result.data;
        this.authGrpMenusParam.authGrpNo = _row.authGrpNo;
      });
    },
    userGridSelectedRow (_row) {
      this.authGrpLabel = _row.userNm + '님의 ' + defaultAuthGrpLabel;
      this.authGrpGridOptions.getParams = {
        userId: _row.userId
      };
      this.getUserAuthGrps();
      this.getUserMenus([_row.userId]);
      this.$refs.userGrid.$refs.datatable.clearSelection();
    },
    /** 
     * 사용자 선택 변경 시
     * **/
    userCheckedChanged () {
      // if (this.userGridOptions.selectedItems.length) {
      //   this.authGrpLabel = defaultAuthGrpLabel;
      //   this.getAuthGrps();
      // }
      this.getUserMenus(this.userGridOptions.selectedItems);
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 함수
    */
    beforeUserMenuSave () {
      this.isUserMenuSave = this.userGridOptions.data.length > 0;
      // this.isUserMenuSave = false;
      this.setUserMenuParam();
    },
    beforeUserAuthSave () {
      this.setUserAuthParam();
      if (this.userAuthParam.userIds.length <= 0) {
        window.getApp.$emit('APP_VALID_ERROR', '사용자를 먼저 선택해주세요.');
        return;
      }
      if (this.userAuthParam.userAuthGrps.length <= 0) {
        window.getApp.$emit('APP_VALID_ERROR', '부여할 권한을 선택해주세요.');
        return;
      }
      this.isUserAuthSave = this.userAuthParam.userIds.length > 0 && this.userAuthParam.userAuthGrps.length > 0;
      
    },
    btnUserAuthSaveClicked (_result) {
      this.isUserAuthSave = false;  // 반드시 isUserAuthSave을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      this.getUserMenus(this.userGridOptions.selectedItems);
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    btnUserMenuSaveClicked (_result) {
      this.isUserMenuSave = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isUserMenuSave = false;
      this.isUserAuthSave = false;  // 반드시 isUserAuthSave을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    /**
     * 사용자  권한 파라미터 생성
     * */
    setUserAuthParam () {
      var authGrps = this.$_.filter(this.authGrpGridOptions.data, (_item) => {
        return _item.settingYn === 'Y'
      });

      var userIds = this.$_.map(this.userGridOptions.selectedItems, 'userId');
      var userAuthGrps = [];
      this.$_.forEach(userIds, (_item) => {
        this.$_.forEach(authGrps, (__item) => {
          var userAuthGrp = this.$_.clone(__item);
          userAuthGrp.userId = _item;
          userAuthGrp.createUserId = 'test';
          userAuthGrps.push(userAuthGrp);
        });
      });

      this.userAuthParam = {
        userIds: userIds,
        userAuthGrps: userAuthGrps
      }
    },
    setUserMenuParam () {
      var userIds = this.$_.uniq(this.$_.map(this.userMenuGridOptions.data, 'userId'));
      this.userMenuParam = {
        userIds: userIds,
        userMenus: this.userMenuGridOptions.data,
        authGrpMenuYn: 'Y'
      };
    }
    /** /기타 function **/
  }
};
</script>