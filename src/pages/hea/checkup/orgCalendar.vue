<!--
  목적 : 검진기관 일정
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
              <y-label label="검진종류: " /><y-label :label="checkupPlan.heaCheckupClassNm" :fieldable="true" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진계획: " /><y-label :label="checkupPlan.heaCheckupPlanNm" :fieldable="true" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진일자: " /><y-label :label="checkupPlan.heaCheckupPlanPeriod" :fieldable="true" />
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
                title="저장"
                color="blue"
                action-type="put"
                beforeSubmit = "beforeEditSubmit"
                @beforeEditSubmit="beforeEditSubmit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
          </div>
          <y-data-table
            label="검진 기관 일정 목록"
            ui="bootstrap"
            :headers="gridHeaderOptions"
            :items="gridData"
            height="400"
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
    selectedCheckupPlanNo: 0,
    selectedTabIndex: 0
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
    },
    selectedTabIndex: function (newValue, oldValue) {
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
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '검진 기관', name: 'heaCheckupOrgNm', width: '25%' },
        { text: '기간', name: 'startEndYmd', width: '45%', align: 'center', type: 'datepicker', range: true },
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
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getList (recall) {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get'; 
      this.$http.param = {
        'heaCheckupPlanNo': this.checkupPlan.heaCheckupPlanNo
      };
      this.$http.request((_result) => {
        if (typeof recall === 'undefined') {
          this.gridData = _result.data;
          this.getList(false);
        }
        else {
          this.gridData = _result.data;
        }        
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /** /Call API service **/
    
    /** validation checking **/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeEditSubmit () {
      if (this.gridSelectedRows.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '검진기관 일정을 수정하시겠습니까?',
          type: 'info',
          // 확인 callback 함수
          confirmCallback: () => {
            this.isEditSubmit = true;
            this.gridSelectedRows.forEach(item => {
              item.startYmd = item.startEndYmd[0];
              item.endYmd = item.startEndYmd[1];
            });
          }
        });
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '선택된 검강검진기관이 없습니다. 목록 앞단에 선택박스를 확인하세요.',
          type: 'warning',
        });
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
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '검진기관 일정을 수정하였습니다.',
        type: 'success',
      });
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isEditSubmit = false;       
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>