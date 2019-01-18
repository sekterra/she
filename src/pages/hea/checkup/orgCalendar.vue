<!--
  목적 : 건강검진기관 일정
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
        <b-card no-body class="px-3 py-2">
          <b-row class="mt-2">
            <b-col sm="4">
              <y-label label="검진종류: " /><y-label :label="checkupPlan.heaCheckupClassNm" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진계획: " /><y-label :label="checkupPlan.heaCheckupPlanNm" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진일자: " /><y-label :label="checkupPlan.heaCheckupPlanPeriod" />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row> 

    <b-row class="mt-3">
      <b-col sm="12">                
        <b-col sm="12" class="px-0 mt-2">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
                v-if="editable&&checkupPlan.heaCheckupPlanNo>0"
                :action-url="editUrl"
                :param="gridSelectedRows"
                :is-submit="isEditSubmit"
                type="save"
                title="저장"
                size="small"
                color="primary"
                action-type="put"
                beforeSubmit = "beforeEditSubmit"
                @beforeEditSubmit="beforeEditSubmit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
          </div>
          <y-data-table
            label="건강검진 기관 일정 목록"
            ui="bootstrap"
            :headers="gridHeaderOptions"
            :items="gridData"
            :rows="5"
            v-model="gridSelectedRows"
          >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
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
  name: 'org-calendar',  
  props: {
    selectedCheckupPlanNo: 0
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      checkupPlan: {
        heaCheckupPlanNo: 0,
        heaCheckupPlanNm: '',
        heaCheckupClassNm: '',
        heaCheckupPlanPeriod: ''
      },
      editable: true,
      searchUrl: '',
      detailUrl: '',
      editUrl: '',
      isEditSubmit: false,

      gridHeaderOptions: [],
      gridData: [],
      gridSelectedRows: []
    };
  },
  watch: {
    selectedCheckupPlanNo: function (newValue, oldValue) {      
      this.checkupPlan.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.getDetail();
      this.getList();
    }
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
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진 기관', name: 'heaCheckupOrgNm', width: '25%' },
        { text: '기간', name: 'heaCheckupPlanOrgPeriod', width: '45%', align: 'center', type: 'text' },
        { text: '일일 예약최대인원', child: 
          [
            { text: '평일', name: 'weekdayMax', width: '15%', type: 'number' },
            { text: '토요일', name: 'weekendMax', width: '15%', type: 'number' },
          ]
        }
      ];
      
      this.detailUrl = selectConfig.checkupPlan.get.url;
      this.searchUrl = selectConfig.checkupPlanOrg.list.url;
      this.editUrl = transactionConfig.checkupPlanOrg.edit.url;

      this.checkupPlan.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      if (this.checkupPlan.heaCheckupPlanNo > 0) {
        this.getDetail();
        this.getList();
      }
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.checkupPlan.heaCheckupPlanNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.checkupPlan = _result.data;
      }, (_error) => {         
      });
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get'; 
      this.$http.param = {
        'heaCheckupPlanNo': this.checkupPlan.heaCheckupPlanNo
      };
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {         
      });
    },
    /** /Call API service **/
    
    /** validation checking **/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeEditSubmit () {
      if (this.gridSelectedRows.length > 0) {
        this.isEditSubmit = confirm('건강검진기관 일정을 수정하시겠습니까?');
      }
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnEditClickedCallback (_result) {
      this.isEditSubmit = false;
      this.getList();      
      alert('건강검진기관 일정을 수정하였습니다.'); 
      // window.getApp.emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isEditSubmit = false;       
      alert('작업진행 중 오류가 발생했습니다. 재시도 후 지속적으로 오류 발생시 관리자에게 문의하세요.');
      // window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>