<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
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
                  :action-url="searchUrl"
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

      <!-- 검색 결과 테이블 -->
      <b-row class="mt-3">
        <b-col sm="12">
            <b-col sm="12" class="px-0">
              <y-data-table 
                :headers="gridOptions.header"
                :height="gridOptions.height"
                :items="gridOptions.data"
                :excel-down="true"
                :print="true"
                :rows="5"
                :cellClick="true"
                label="사용자 목록"
                ref="dataTable"
                @selectedRow="selectedRow"
              />
            </b-col>
        </b-col>
      </b-row>

      <b-row class="mt-3" ref="detailBox">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="사용자 관리" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-card>
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="15"
                  label="사용자ID*"
                  name="userId"
                  v-model="user.userId"
                  v-validate="'required'"
                  :state="validateState('userId')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="100"
                  label="비밀번호*"
                  name="userPwd"
                  v-model="user.userPwd"
                  v-validate="'required'"
                  :state="validateState('userPwd')"
                >
                </y-text>
              </b-col>
             <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="30"
                  label="사용자명*"
                  name="userNm"
                  v-model="user.userNm"
                  v-validate="'required'"
                  :state="validateState('userNm')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="9"
                  :editable="editable"
                  :comboItems="deptCdItems"
                  itemText="deptNm"
                  itemValue="deptCd"
                  ui="bootstrap"
                  type="search"
                  label="부서*"
                  name="deptCd"
                  v-model="user.deptCd"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-radio
                  :width="9"
                  :editable="editable"
                  :comboItems="sexualItems"
                  label="성별*"
                  itemText="codeNm"
                  itemValue="code"
                  ui="bootstrap"
                  name="comSexTypeCd"
                  v-model="user.comSexTypeCd"
                  v-validate="'required'"
                  :state="validateState('comSexTypeCd')"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="20"
                  label="사내전화"
                  name="officeTel"
                  v-model="user.officeTel"
                  v-validate="'required'"
                  :state="validateState('officeTel')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="20"
                  label="휴대전화"
                  name="phoneNo"
                  v-model="user.phoneNo"
                  v-validate="'required'"
                  :state="validateState('phoneNo')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="50"
                  label="Email"
                  name="email"
                  v-model="user.email"
                  v-validate="'required'"
                  :state="validateState('email')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                :width="9"
                :editable="editable"
                label="생년월일"
                name="birthYmd"
                v-model="user.birthYmd"
                v-validate="'required'"
                :state="validateState('birthYmd')"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                :width="9"
                :editable="editable"
                label="입사일"
                name="entryYmd"
                v-model="user.entryYmd"
                v-validate="'required'"
                :state="validateState('entryYmd')"
                />
              </b-col>
              
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-switch
                  :width="9"
                  :editable="editable"
                  :required="true"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="사용여부"
                  name="useYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="user.useYn"
                  v-validate="'required'"
                  :state="validateState('useYn')"
                  >
                </y-switch>
              </b-col>
            </b-row>
          </b-col>
          
        </b-row>
        <b-row>
          <b-col sm="12">
            <div class="float-right mt-3" >
                    <y-btn
                      title="초기화"
                      @btnClicked="btnClearClickedCallback" 
                    />
                    <y-btn 
                      :action-url="insertUrl"
                      :param="user"
                      :is-submit="isInsert"
                      title="신규등록"
                      color="orange"
                      action-type="POST"
                      beforeSubmit="beforeInsert"
                      @beforeInsert="beforeInsert"
                      @btnClicked="btnInsertClickedCallback" 
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
                      @btnClicked="btnSaveClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    /> -->
                  </div>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import YTree from '@/components/YTree';
import arrayToTree from 'array-to-tree';
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
import YTreeDataTable from '@/components/YTreeDataTable'

export default {
  /** attributes: name, components, props, data **/
  name: 'user-manage',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  components: {
    'y-tree': YTree,
    YTreeDataTable
  },
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      user: {
        useYn: 'Y'
      },
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      searchUrl: '',
      searchParam: {},
      deptCdItems: [],
      sexualItems: [],
      isInsert: false,
      insertUrl: '',
      isEdit: false,
      editUrl: '',
      editable: true,
      upMenuLvl: null,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
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
      // this.insertUrl = transactionConfig.user.insert.url;
      this.searchUrl = selectConfig.manage.user.list.url;
      this.getComboItems('HEA_GENDER_TYPE');
      this.getDeptCdItems();
      this.setGridSize();
      this.getUserList();
      

      this.gridOptions.header = [
        { text: '사용자ID', name: 'userId', width: '150px', },
        { text: '사용자명', name: 'userNm', width: '210px', },
        { text: '부서명', name: 'deptNm', width: '200px' },
        { text: '성별', name: 'comSexTypeNm', width: '100px', align: 'center' },
        { text: 'email', name: 'email', width: '250px' },
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' }
      ];

      this.agreeYnItems = [
        { code: 'Y', codeNm: '동의합니다' },
        { code: 'N', codeNm: '동의하지 않습니다' },
      ];
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.height = window.innerHeight - this.$refs.searchBox.clientHeight - 250;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
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
    
    /**
     *  Call API service
    */
    getUserList () {
      this.$http.url = this.searchUrl;
      this.$http.param = this.searchParam;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    checkValidation (_type) {
      var type = null;
      if (_type === 'insert') type = this.isInsert;

      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    /**
     * 등록전 유효성 검사
     */
    beforeInsert () {
      this.checkValidation('insert');
    },
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.user, this.$options.data().user);
      this.$validator.reset();
    },
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnInsertClickedCallback (_result) {
      this.isInsert = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // window.alert('error:' + JSON.stringify(_result));
      // window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    btnSearchClickedCallback (_result) {
      this.gridOptions.data = _result.data;
    },
    /** /Button Event **/
    
    /** 기타 function **/
    /**
     * 공통 마스터 정보 조회
     */
    getComboItems (codeGroupCd) {
      this.$http.url = selectConfig.codeMaster.allList.url;
      this.$http.param = {
        codeGroupCd: codeGroupCd,
        attr1: 'COM'
      };
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.sexualItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    selectedRow () {

    }
    /** /기타 function **/
  }
};
</script>