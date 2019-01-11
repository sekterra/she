<!--
  목적 : 검진결과/판정 업로드
  작성자 : khk
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-col sm="10" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="업로드 및 저장결과"
            :headers="gridUploadHeaderOptions"
            :items="gridUploadData" 
            :excel-down="true"
            :print="true"
            :rows="4" />
          </b-col>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="10" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="오류정보(실패한 사유에 대한 정보)"
            :headers="gridErrorHeaderOptions"
            :items="gridErrorData" 
            :excel-down="true"
            :print="true"
            :rows="4"/>
          </b-col>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12"> 
        <b-row>
          <b-col sm="12">
            <y-label label="종합소견" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaCheckupPlanNoItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="diseaseCd"
                label="건강검진결과"
                v-model="uploadFile.heaCheckupPlanNo"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="업로드파일"></y-label></b-col>
              <b-col sm="8">
                <input 
                  type="file" 
                  id="file" 
                  ref="file" 
                  v-on:change="changeFile()"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              type="search"
              title="업로드양식 다운로드"
              size="small"
              color="primary"
              icon="el-icon-edit"
              action-type="POST"
              @btnClicked="btnDownloadFormClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              :action-url="uploadUrl"
              :param="uploadFile"
              :is-submit="isUploadSubmit"
              type="save"
              title="업로드및저장"
              size="small"
              color="primary"
              icon="el-icon-edit"
              action-type="POST"
              beforeSubmit = "beforeUploadSubmit"
              @beforeUploadSubmit="beforeUploadSubmit"
              @btnClicked="btnUploadClickedCallback" 
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
  name: 'diagnose-result-upload',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      uploadFile: {
        heaCheckupPlanNo: 0,
        file: null,
      },
      uploadResult: {
        classNm: '',
        totalCount: 0,
        successCount: 0,
        failCount: 0
      },
      errorInfo: {
        classNm: '',
        failRow: 0,
        failMessage: '',
        remark: ''
      },
      baseWidth: 9,
      editable: true,
      isUploadSubmit: false,

      gridUploadData: [],
      gridUploadHeaderOptions: [],
      gridErrorData: [],
      gridErrorHeaderOptions: [],    

      heaCheckupPlanNoItems: [],

      uploadUrl: ''
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
        this.getHeaCheckupPlanNoItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridUploadHeaderOptions = [
        { text: '구분', name: 'classNm', width: '25%', align: 'center' },
        { text: '전체 Row 수', name: 'totalCount', width: '25%', align: 'rigth' },
        { text: '성공 Row 수', name: 'successCount', width: '25%', align: 'rigth' },
        { text: '실패 Row 수', name: 'failCount', width: '25%', align: 'rigth' }
      ];

      this.gridErrorHeaderOptions = [
        { text: '구분', name: 'classNm', width: '20%', align: 'center' },
        { text: '실패 Row 번호', name: 'failRow', width: '20%', align: 'rigth' },
        { text: '실패 사유', name: 'failMessage', width: '20%' },
        { text: '비고', name: 'remark', width: '40%' }
      ];
      
      this.uploadUrl = '';
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getHeaCheckupPlanNoItems () {
      // 검진계획 선택항목 조회
      this.heaCheckupPlanNoItems.push({ 'code': '0', 'codeNm': '선택하세요' });
    },
    changeFile () {
      this.uploadFile.file = this.$refs.file.files[0];
    },
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeUploadSubmit () {
      this.isUploadSubmit = !(this.uploadFile.file == null);
      if (!this.isUploadSubmit) {
        window.alert('선택된 파일이 없습니다.');
      }
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
    btnDownloadFormClickedCallback (_result) {
      window.alert('업로드 양식 다운로드!!');
    },
    btnUploadClickedCallback (_result) {
      this.isUploadSubmit = false;
      this.gridUploadData = _result.data['uploadResult'];
      this.gridErrorData = _result.data['errorInfo'];
      window.alert('업로드 완료 후 실행!!');
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