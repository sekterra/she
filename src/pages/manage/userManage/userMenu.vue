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
      <!-- 검색 -->
      <b-row ref="searchBox">
        <b-col sm="12">
          <b-card header-class="default-card" body-class="default-body-card" class="py-0">
            <div slot="header" >
              <!-- <div class="float-left"> -->
                <y-label label="검색" />
              <!-- </div> -->
              <div class="float-right">
                <y-btn
                  :action-url="userGridOptions.getUrl"
                  :param="searchParam"
                  title="검색"
                  color="green"
                  action-type="get"
                  @btnClicked="btnSearchClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
            </div>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :editable="editable"
                  :comboItems="deptCdItems"
                  itemText="deptNm"
                  itemValue="deptCd"
                  ui="bootstrap"
                  type="search"
                  label="부서"
                  name="deptCd"
                  v-model="searchParam.deptCd"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="8"
                  ui="bootstrap"
                  label="사용자명"
                  name="userNm"
                  v-model="searchParam.userNm"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="8"
                  ui="bootstrap"
                  label="사용자ID"
                  name="userId"
                  v-model="searchParam.userId"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <!-- 사용자 영역 -->
        <b-col sm="12">
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
      </b-row>
      <b-row>
          <b-col sm="12">
            <div class="float-right mt-3" >
              <y-btn
                :is-submit="true"
                type="test"
                title="메뉴 추가"
                size="small"
                color="primary"
                @btnClicked="btnMenuSearchClicked"
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
            :height="300"
            :useRownum="false"
            :span-options="spanOptions"
            label="사용자별 메뉴 목록"
            ref="userMenuDataTable"
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
              <!-- <y-btn 
                v-if="editable"
                :action-url="editUrl"
                :param="menu"
                :is-submit="isEdit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeSubmit"
                @beforeSubmit="beforeSubmit"
                @btnClicked="btnUserAuthSaveClicked" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              /> -->
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
  name: 'user-menu',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
      userMenuGridOptions: {
        header: [],
        data: [],
        selectedItems: [],
        getUrl: '',
        getParams: {
          useYn: 'Y'
        }
      },
      searchUrl: '',
      searchParam: {},
      deptCdItems: [],
      saveUrl: '',
      menuTree: [],
      isUserAuthSave: false,
      isUserMenuSave: false,
      userAuthSaveUrl: '',
      userMenuSaveUrl: '',
      userMenuParam: {},
      spanOptions: {},
      editable: true
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
    window.getApp.$on('POPUP_SEND_DATA', this.popupSelectChanged);
    this.init();
  },
  mounted () {
  },
  beforeDestory () {
    window.getApp.$off('POPUP_SEND_DATA', this.popupSelectChanged);
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // 사용자 조회 정보 할당
      this.userGridOptions.getUrl = selectConfig.manage.user.list.url;
      // 사용자 메뉴 조회 정보 할당
      this.userMenuGridOptions.getUrl = selectConfig.userMenu.list.url;
      // 사용자 메뉴 저장 정보 할당
      this.userMenuSaveUrl = transactionConfig.userMenu.insert.url;
      this.getDeptCdItems();
      this.getUserList();
      // this.getAllMenus();

      this.userGridOptions.header = [
        { text: '사용자ID', name: 'userId', width: '150px', },
        { text: '사용자명', name: 'userNm', width: '150px', },
        { text: '부서명', name: 'deptNm', width: '200px' },
      ];

      this.userMenuGridOptions.header = [
        { text: '사용자ID', name: 'userId', width: '100px', },
        { text: '사용자명', name: 'userNm', width: '100px', },
        { text: '사용자 부서', name: 'deptNm', width: '150px', },
        { text: '메뉴전체경로', name: 'menuFullPath', width: '250px', },
        { text: '메뉴명', name: 'menuNm', width: '100px', },
        { text: '접근권한', name: 'accessYn', width: '50px', align: 'center', type: 'checkbox', useDefault: true, sortable: false },
        { text: '쓰기권한', name: 'writeYn', width: '50px', align: 'center', type: 'checkbox', useDefault: true, sortable: false, relateColumn: 'accessYn' },
        { text: '메뉴레벨', name: 'menuLvl', width: '100px', align: 'center' },
      ];

      this.spanOptions = [
        { index: 0, field: 'userId' },
        { index: 1, field: 'userNm' },
        { index: 2, field: 'deptNm' },
      ];
    },
    // 부서 콤보박스 조회
    getDeptCdItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.deptCdItems = _result.data;
        this.searchParam.deptCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
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
    // 사용자별 메뉴 목록 조회
    getUserMenus (_userIds) {
      if (!_userIds || _userIds.length <= 0) return;
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
     * 사용자 선택 변경 시
     **/
    userGridSelectedRow (_row) {
      // console.log(':::::: userGridSelectedRow :::::::');
      this.getUserMenus([_row.userId]);
      this.$refs.userGrid.$refs.datatable.clearSelection();
    },
    userCheckedChanged () {
      // if (this.userGridOptions.selectedItems.length) {
      //   this.authGrpLabel = defaultAuthGrpLabel;
      //   this.getAuthGrps();
      // }
      console.log(':::::: userCheckedChanged :::::::');
      this.getUserMenus(this.userGridOptions.selectedItems);
    },
    /**
     * 팝업 창에서 확인 버튼을 눌렀을 경우 처리
     */
    popupSelectChanged (_popupData) {
      var menuDatas = this.$_.clone(this.userMenuGridOptions.data);
      var addMenus = [];
      this.$_.forEach(this.userGridOptions.selectedItems, (_item) => {
        this.$_.forEach(_popupData, (__item) => {
          var userMenu = this.$_.clone(__item);

          // TODO : 아래처럼 하지 않으면 순환 참조 오류 발생
          if (userMenu.hasOwnProperty('children')) {
            userMenu.children = null;
            delete userMenu.children;
          }
          if (userMenu.hasOwnProperty('parent')) {
            delete userMenu.parent;
          }
          userMenu.userId = _item.userId;
          userMenu.userNm = _item.userNm;
          userMenu.deptNm = _item.deptNm;
          // 기본적으로 접근 권한이 존재하고, 쓰기 권한은 팝업창의 정보를 그대로 따음
          userMenu.accessYn = 'Y';
          userMenu.authGrpMenuYn = 'N';
          userMenu.createUserId = 'test';
          addMenus.push(userMenu);
        });
      });

      this.$_.forEach(addMenus, (_item) => {
        if (!this.isDuplicatedMenu(_item)) menuDatas.push(_item)
      });

      this.userMenuGridOptions.data = menuDatas;
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 함수
    */
    btnSearchClickedCallback (_result) {
      this.userGridOptions.data = _result.data;
    },
    beforeUserMenuSave () {
      this.setUserMenuParam();
      this.isUserMenuSave = this.userMenuGridOptions.data.length > 0;
      // this.isUserMenuSave = false;
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
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    btnMenuSearchClicked () {
      if (this.userGridOptions.selectedItems.length <= 0) {
        window.getApp.$emit('APP_REQUEST_ERROR', '사용자를 먼저 선택해주세요.');
        return;
      }
      window.getApp.$emit('POPUP_OPEN', {
        isPopupOpen: true,
        id: 'popup',
        label: '메뉴 검색',
        editable: false,
        type: 'menuSearch',
        fullscreen: false,
        getPopupDataFuncName: 'getData',
        childProps: {
          // checkupPlanNo: 10
        }
      });
    },
    /** /Button Event **/
    
    /** 기타 function **/
    /**
     * 존재하는 메뉴인지 확인
     * */
    isDuplicatedMenu (_item) {
      var hasMenu = this.$_.filter(this.userMenuGridOptions.data, (_menu) => {
        return _menu.menuId === _item.menuId && _menu.userId === _item.userId
      }).length > 0;
      return hasMenu;
    },
    setUserMenuParam () {
      var filter = this.$_.filter(this.userMenuGridOptions.data, (_item) => {
        return _item.accessYn === 'Y' || _item.writeYn === 'Y';
      });

      this.userMenuParam = {
        userIds: [],
        userMenus: filter,
        authGrpMenuYn: 'N'
      };
    }
    /** /기타 function **/
  }
};
</script>