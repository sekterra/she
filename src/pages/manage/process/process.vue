<!--
  목적 : 작업공정관리
  작성자 : khk
  Detail : 작업공정 조회 및 등록/수정
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            gridType="edit"          
            @editItem="getDetail"
            ref="dataTable"
            label="작업공정 목록"
            :rows="5"
            :headers="gridHeaderOptions"
            :items="gridData"
            :excel-down="true"
            :print="true" />
          </b-col>
      </b-col>      
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="작업공정 등록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>          
          <b-row> 
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                width="8"
                :editable="editable"
                :maxlength="30"
                ui="bootstrap"
                label="작업공정명"
                name="processNm"                
                v-model="process.processNm"
                v-validate="'required'"
                :state="validateState('processNm')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-switch
                  :width="8"
                  :editable="editable"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="사용여부"
                  name="useYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="process.useYn"
                  />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                width="8"
                :editable="editable"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="출력순서"
                name="sortOrder"
                v-model="process.sortOrder"
              />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              type="clear"
              size="small"
              title="초기화"
              color="info"
              @btnClicked="btnClearClickedCallback" 
              />
            <y-btn
              v-if="editable"
              :action-url="insertUrl"
              :param="process"
              :is-submit="isCreateSubmit"
              type="save"
              size="small"
              title="신규등록"
              color="warning"
              action-type="post"
              beforeSubmit = "beforeCreateSubmit"
              @beforeCreateSubmit="beforeCreateSubmit"
              @btnClicked="btnCreateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
              v-if="editable&&updateMode"
              :action-url="editUrl"
              :param="process"
              :is-submit="isUpdateSubmit"
              type="save"
              size="small"
              title="수정"
              color="warning"
              action-type="PUT"
              beforeSubmit = "beforeUpdateSubmit"
              @beforeUpdateSubmit="beforeUpdateSubmit"
              @btnClicked="btnUpdateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
              /> 
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'process',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      process: {
        processNo: 0,
        processNm: null,
        sortOrder: null,
        useYn: 'Y',
        createUserId: '', 
        createUserNm: '',
        createDt: '',
        updateUserId: '',
        updateUserNm: '',
        updateDt: ''
      },
      baseWidth: 9,
      editable: true,
      updateMode: false,
      isCreateSubmit: false,
      isUpdateSubmit: false,
      gridData: [],
      gridHeaderOptions: [],
      useYnItems: [],
      insertUrl: '',
      editUrl: '',
      searchUrl: '',
      detailUrl: '',
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
      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
      // 선택항목 설정
      setTimeout(() => {
        this.useYnItems.push({ 'code': 'Y', 'codeNm': '사용' });
        this.useYnItems.push({ 'code': 'N', 'codeNm': '미사용' });
      }, 200);

      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '작업공정명', name: 'processNm', width: '200px' },
        { text: '정렬순서', name: 'sortOrder', width: '100px' },
        { text: '사용여부', name: 'useYn', width: '100px' },
        { text: '등록일', name: 'createDt', width: '160px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '160px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = selectConfig.process.create.url;
      this.editUrl = selectConfig.process.update.url;
      this.searchUrl = selectConfig.process.list.url;
      this.detailUrl = selectConfig.process.get.url;

      this.getList();
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';      
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getDetail (data) {
      this.$http.url = this.$format(this.detailUrl, data.processNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.process = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    
    /** /Call API service **/    

    /** validation checking(필요없으면 지워주세요) **/
    beforeCreateSubmit () {        
      this.$validator.validateAll().then((_result) => {
        this.process.processNo = 0;
        this.isCreateSubmit = _result;
      }).catch(() => { window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.'); });
    },
    beforeUpdateSubmit () {
      this.$validator.validateAll().then((_result) => {
        this.isUpdateSubmit = _result;
      }).catch(() => { window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.'); });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnClearClickedCallback (_result) {
      this.updateMode = false;
      this.process.processNo = 0;
      this.process.processNm = '';
      this.process.createUserId = '';
      this.process.createUserNm = '';
      this.process.createDt = '';
      this.process.updateUserId = '';
      this.process.updateUserNm = '';
      this.process.updateDt = '';
    },
    btnCreateClickedCallback (_result) {
      this.process.processNo = _result.data;
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.getList();      
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      this.isCreateSubmit = false;
      this.isUpdateSubmit = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>