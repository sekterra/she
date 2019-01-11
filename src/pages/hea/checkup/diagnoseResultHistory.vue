<!--
  목적 : 판정이력 조회
  작성자 : khk
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            ref="dataTable"
            label="건강검진 결과 이력"
            :rows="5"
            :headers="gridResultHeaderOptions"
            :items="gridResultData" 
            :excel-down="true"
            :print="true" />
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
          <div slot="header">
            <strong>종합소견</strong>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="업무수행적합"></y-label></b-col>
              <b-col sm="8">{{checkupResult.heaWorkableNm}}</b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="사후관리"></y-label></b-col>
              <b-col sm="8">{{checkupResult.heaFollowUpNm}}</b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="종합소견"></y-label></b-col>
              <b-col sm="8">{{checkupResult.heaFollowUpRemark}}</b-col>
              </b-row>
            </b-col>
          </b-row>         
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            ref="dataTable"
            label="판정이력"
            :rows="5"
            :headers="gridResultDiagHeaderOptions"
            :items="gridResultDiagData" 
            :excel-down="true"
            :print="true" />
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'diagnose-result-history',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      checkupResult: {
        heaCheckupPlanNo: 0,
        heaCheckupPlanNm: '',
        heaCheckupClassCd: '',
        heaCheckupClassNm: '',
        heaCheckupOrgNo: 0,
        heaCheckupOrgNm: '',
        userId: '',
        userNm: '',
        deptCd: '',
        deptNm: '',
        deptCdOrg: '',
        deptNmOrg: '',
        heaCheckedYmd: '',
        heaCheckupOrgEtc: '',
        heaWorkableCd: '',
        heaWorkableNm: '',
        heaFollowUpCd: '',
        heaFollowUpNm: '',
        heaFollowUpRemark: ''
      },
      checkupResultDiag: {
        heaDiagnoseCd: '',
        heaDiagnoseNm: '',
        heaDiseaseClassCd: '',
        heaDiseaseClassNm: '',
        heaDiseaseCd: '',
        heaDiseaseNm: '',
        heaHazardCd: '',
        heaHazardNmKo: '',
        heaHazardNmEn: ''
      },
      baseWidth: 9,
      editable: true,

      gridResultData: [],
      gridResultHeaderOptions: [],
      gridResultDiagData: [],
      gridResultDiagHeaderOptions: [],    

      resultDetailUrl: '',
      searchResultUrl: '',
      searchResultDiagUrl: ''
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
      }, 200);

      // 그리드 헤더 설정
      this.gridResultHeaderOptions = [
        { text: '검진계획', name: 'heaTestClassNm', width: '25%' },
        { text: '검진종류', name: 'heaTestItemNm', width: '10%', align: 'center' },
        { text: '사번', name: 'prev1YearResult', width: '10%', align: 'center' },
        { text: '성명', name: 'prev2YearResult', width: '10%', align: 'center' },
        { text: '검진일', name: 'charResult', width: '10%', align: 'center' },
        { text: '검진기관', name: 'unit', width: '15%', align: 'center' },
        { text: '판정', name: 'unit', width: '10%', align: 'center' },
        { text: '질환', name: 'unit', width: '10%', align: 'center' }
      ];

      this.gridResultDiagHeaderOptions = [
        { text: '판정', name: 'heaDiagnoseNm', width: '20%', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '40%' },
        { text: '질환', name: 'heaDiseaseNm', width: '20%' },
        { text: '유해인자', name: 'heaHazardNm', width: '20%' }
      ];
      
      this.resultDetailUrl = '';
      this.searchResultUrl = '';
      this.searchResultDiagUrl = '';      

      this.getResultList();
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getResultList (data) {
      this.$http.url = this.$format(this.detailUrl, data.processNo);
      this.$http.type = 'GET'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.process = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getResultDiagList () {
      this.$http.url = this.searchResultDiagUrl;
      this.$http.type = 'GET';      
      this.$http.request((_result) => {
        this.gridResultDiagData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    }, 
    getDetail () {
      this.getResultDiagList();
    },
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
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