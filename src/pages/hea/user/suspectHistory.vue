<!--
  목적 : v-suspectHistory
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="suspectHistoryDiv">
    <b-container fluid>
      <b-row>
        <b-col sm="12">
          <b-card header-class="default-card">
            <div slot="header">
              <div class="float-left">
                <y-label label="검색" />
              </div>
              <div class="float-right">
                <y-btn
                    :action-url="saveUrl"
                    :param="searchParam"
                    type="search"
                    title="검색"
                    size="mini"
                    color="success"
                    action-type="get"
                    @btnClicked="btnSearchCallback" 
                    @btnClickedErrorCallback="btnClickedErrorCallback"
                  />
              </div>
            </div>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                  :width="baseWidth"
                  :editable="editable"
                  :range="true"
                  label="기간"
                  name="period"
                  v-model="suspectHistory.period"
                >
                </y-datepicker>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- 유소견자 이력 grid-->
      <b-row class="mt-3">
        <b-col sm="12">
          <b-col sm="12" class="px-0">
            <y-data-table 
              label="유소견자 이력"
              :headers="suspectHistoryGridHeaderOptions"
              :items="suspectHistoryGridData"
              :editable="editable"
              :excel-down="true"
              :print="true"
              :rows="6"
              ref="dataTable"
              >
            </y-data-table>
          </b-col>

          <b-row class="mt-3">
            <b-col sm="12">
              <b-row>
                <b-col sm="12">
                  <y-label label="유소견자 이력 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
              <b-card>
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="상담일"
                      name="visitYmd"
                      v-model="suspectHistory.visitYmd"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="상담자"
                      name="userNm"
                      v-model="suspectHistory.userNm"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="유소견자 지정일"
                      name="beManagedYmd"
                      v-model="suspectHistory.beManagedYmd"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="유소견자 제외일"
                      name="notManagedYmd"
                      v-model="suspectHistory.notManagedYmd"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="과거력"
                      name="diseasePast"
                      v-model="suspectHistory.diseasePast"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="현병력"
                      name="diseaseCurr"
                      v-model="suspectHistory.diseaseCurr"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="증상"
                      name="symptom"
                      v-model="suspectHistory.symptom"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :editable="editable"
                      ui="bootstrap"
                      label="상담내용"
                      name="remark"
                      v-model="suspectHistory.remark"
                    >
                    </y-text>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'suspect-history',
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      suspectHistory: {
        period: null,
        visitYmd: '',
        userNm: '',
        beManagedYmd: '',
        notManagedYmd: '',
        diseasePast: '',
        diseaseCurr: '',
        symptom: '',
        remark: '',
      },
      baseWidth: 8,
      editable: true,
      suspectHistoryGridData: [],
      suspectHistoryGridHeaderOptions: [],
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
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
    this.getList();
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
      // 건강관리실 방문이력 그리드 헤더 설정
      this.suspectHistoryGridHeaderOptions = [
        { text: 'NO', name: 'no', width: '15%', align: 'center' },
        { text: '상담일', name: 'visit_ymd', width: '20%', align: 'center' },
        { text: '유소견자 지정일', name: 'be_managed_ymd', width: '30%', align: 'center' },
        { text: '유소견자 제외일', name: 'not_managed_ymd', width: '30%', align: 'center' },
        { text: '과거력', name: 'disease_past', width: '30%', align: 'left' },
        { text: '현 병력', name: 'disease_curr', width: '30%', align: 'left' },
        { text: '증상', name: 'symptom', width: '30%', align: 'left' },
        { text: '상담내용', name: 'remark', width: '30%', align: 'left' }
      ];
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.suspectHistoryGridData = [
          { no: '2', visit_ymd: '2017-04-01', be_managed_ymd: '', not_managed_ymd: '', disease_past: '-', disease_curr: '고혈압', symptom: '증상', remark: '상담내용' },
          { no: '1', visit_ymd: '2017-11-10', be_managed_ymd: '', not_managed_ymd: '', disease_past: '고혈압', disease_curr: '고혈압', symptom: '증상', remark: '상담내용' }
        ];
      }, 2000);
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
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
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    btnSearchCallback () {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
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