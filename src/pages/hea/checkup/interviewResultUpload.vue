<!--
  목적 : 문진결과 Upload
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
    <b-container fluid>
      <b-row>
        <b-col sm="12">
          <b-card header-class="default-card">
            <div slot="header">
              <div class="float-left">
                <y-label label="저장" />
              </div>
              <div class="float-right">
                <y-btn
                  v-if="editable"
                  :action-url="saveUrl"
                  :param="interviewResultUpload"
                  :is-submit="isSubmit"
                  type="save"
                  title="저장"
                  size="mini"
                  color="primary"
                  action-type="POST"
                  beforeSubmit = "beforeSubmit"
                  @beforeSubmit="beforeSubmit"
                  @btnClicked="btnSaveClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
            </div>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="baseWidth"
                  :editable="editable"
                  :comboItems="heaCheckupPlanItems"
                  itemText="heaCheckupPlanName"
                  itemValue="heaCheckupPlanPk"
                  ui="bootstrap"
                  type="search"
                  label="건강검진 계획"
                  name="heaCheckupPlanNo"
                  v-model="interviewResultUpload.heaCheckupPlanNo"
                >
                </y-select>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="baseWidth"
                  :editable="editable"
                  :maxlength="20"
                  ui="bootstrap"
                  label="대상자"
                  name="empNm"
                  :appendIcon="icons"
                  v-model="interviewResultUpload.empNm"
                  @iconCallback="searchUserCallback"
                >
                </y-text>
              </b-col>
              <b-col sm="2">
                <y-label label="Upload 파일" />
              </b-col>
              <b-col sm="4">
                <input 
                  type="file" 
                  id="file" 
                  ref="file" 
                  title="대상자"
                  v-on:change="changeFile()"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'interview-result-upload', 
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      interviewResultUpload: {
        heaCheckupPlanNo: null,
        userNm: '',
      },
      icons: [
        { 'icon': 'search', callbackName: 'searchUserCallback' },
        // { 'icon': 'times', callbackName: 'searchUserCallback' }
      ],
      baseWidth: 8,
      editable: true,
      saveUrl: '',
      selectUrl: '',
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
      heaCheckupPlanItems: [],
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
      this.getItems();
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    /**
     * 아이템 정보를 가져옴
     */
    getItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.heaCheckupPlanItems = [
          { heaCheckupPlanPk: '1', heaCheckupPlanName: '계획A' },
          { heaCheckupPlanPk: '2', heaCheckupPlanName: '계획B' },
        ];
      }, 1000);
    },
    changeFile () {
      this.uploadFile.file = this.$refs.file.files[0];
    },
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeSubmit () {
      this.checkValidation();
    },
    checkValidation () {
      this.validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
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
    searchUserCallback () {
      console.log('::::::: searchUserCallback :::::::');
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 샘플함수
    */
    /**
    * 조회 버튼 처리용 샘플함수
    */
    btnSearchEmpClickedCallback (_result) {
      this.isSubmit = false;
    },
    btnSaveClickedCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>