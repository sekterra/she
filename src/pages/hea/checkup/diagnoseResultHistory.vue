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
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              title="닫기"
              @btnClicked="closePopup" 
            />
          </div>
          <y-data-table 
            label="검진 결과 이력"
            :headers="gridHistoryHeaderOptions"
            :items="gridHistoryData"  
            @selectedRow="selectedRow"
            />
        </b-col>
      </b-col>
    </b-row>

    <b-row class="mt-3">      
      <b-col sm="12">   
        <b-row>
          <b-col sm="12">
            <y-label label="소견" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="업무수행적합"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.heaWorkableNm" fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="사후관리"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.heaWorkableNm" fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
              <b-col sm="2"><y-label label="종합소견"></y-label></b-col>
              <b-col sm="10"><y-label :label="checkupResult.overallOpinion" fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>
          </b-row>         
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="11" class="px-0">
          <y-data-table 
            label="판정목록"
            height="200"
            :headers="gridResultDiagHistoryHeaderOptions"
            :items="gridResultDiagHistoryData" />
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
    popupParam: {
      type: Object,
      default: {
        heaCheckupPlanNo: 0,
        userId: ''
      },
    },
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
        userId: '',
        userNm: '',
        heaCheckupClassCd: '',
        heaCheckupClassNm: '',
        heaWorkableCd: '',
        heaWorkableNm: '',
        heaFollowUpCd: '',
        heaFollowUpNm: '',
        overallOpinion: ''
      },
      selectedData: {
        heaCheckupPlanNo: 0,
        userId: ''
      },
      baseWidth: 9,
      editable: true,

      gridHistoryData: [],
      gridHistoryHeaderOptions: [],
      gridResultDiagHistoryData: [],
      gridResultDiagHistoryHeaderOptions: [],

      detailUrl: '',
      searchUrl: '',
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
      this.checkupResult.heaCheckupPlanNo = this.popupParam.heaCheckupPlanNo;
      this.checkupResult.userId = this.popupParam.userId;
      
      // 그리드 헤더 설정
      this.gridHistoryHeaderOptions = [
        { text: '검진계획', name: 'heaCheckupPlanNm', width: '200px' },
        { text: '검진종류', name: 'heaCheckupClassNm', width: '120px', align: 'center' },
        { text: '사번', name: 'userId', width: '80px', align: 'center' },
        { text: '성명', name: 'userNm', width: '100px', align: 'center' },
        { text: '검진일', name: 'heaCheckedYmd', width: '160px', align: 'center' },
        { text: '검진기관', name: 'heaCheckupOrgNm', width: '160px', align: 'center' },
        { text: '판정', name: 'heaDiagnoseNm', width: '120px', align: 'center' },
        { text: '질환', name: 'heaDiseaseNm', width: '200px', align: 'center' }
      ];
      this.gridResultDiagHistoryHeaderOptions = [
        { text: '판정', name: 'heaDiagnoseNm', width: '15%', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '45%' },
        { text: '질환', name: 'heaDiseaseNm', width: '20%' },
        { text: '유해인자', name: 'heaHazardNm', width: '20%' }
      ];
      
      this.detailUrl = selectConfig.checkupResult.get.url;
      this.searchUrl = selectConfig.checkupResult.list.url;
      this.searchResultDiagUrl = selectConfig.checkupResultDiag.list.url;

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
      this.$http.param = {
        'heaCheckupPlanNo': this.checkupResult.heaCheckupPlanNo,
        'userId': this.checkupResult.userId
      };
      this.$http.request((_result) => {
        this.gridHistoryData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.selectedData.heaCheckupPlanNo, this.selectedData.userId);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.checkupResult = _result.data;
      }, (_error) => {         
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });            
    },
    getResultDiagList () {
      this.$http.url = this.searchResultDiagUrl;
      this.$http.type = 'get';
      this.$http.param = this.selectedData;
      this.$http.request((_result) => {
        this.gridResultDiagHistoryData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    selectedRow (data) {
      this.selectedData.heaCheckupPlanNo = data.heaCheckupPlanNo;
      this.selectedData.userId = data.userId;
      this.getDetail();
      this.getResultDiagList();
    },
    
    /** /Call API service **/
    /** Button Event **/
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup');
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>