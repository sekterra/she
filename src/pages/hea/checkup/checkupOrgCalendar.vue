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
        <b-row>
          <b-col sm="12">
            <b-card no-body class="px-3 py-2 mb-3">
              <b-row class="mt-2">
                <b-col sm="4">
                  <y-label label="검진종류" />
                  : {{checkItem.checkType}}
                </b-col>
                <b-col sm="4">
                  <y-label label="검진계획" />
                  : {{checkItem.checkPlan}}
                </b-col>
                <b-col sm="4">
                  <y-label label="검진일자" />
                  : {{checkItem.checkDate}}
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <div class="float-right">
              <y-btn
                v-if="editable"
                :action-url="saveNewUrl"
                :param="hazard"
                :is-submit="isSubmit"
                type="save"
                size="small"
                color="primary"
                icon="el-icon-edit"
                action-type="POST"
                beforeSubmit = "beforeSubmit"
                @beforeSubmit="beforeSubmit"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
            <b-col sm="12" class="px-0 mt-2">
              <y-data-table
                label="건강검진 기관 일정 목록"
                ui="bootstrap"
                :headers="heaCheckupPlanOrgGridHeaderOptions"
                :items="heaCheckupPlanOrgGridData"
                :rows="14"
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'checkupOrgCalendar',  
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      checkupOrgCalendar: {

      },
      checkItem: {
        checkType: '종합건강검진',
        checkPlan: '2018년 종합건강검진',
        checkDate: '2018-03-01 ~ 2018-04-30'
      },
      editable: true,
      saveUrl: '',
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
      heaCheckupPlanOrgGridData: [],
      heaCheckupPlanOrgGridHeaderOptions: [],
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
      // 그리드 헤더 설정
      this.heaCheckupPlanOrgGridHeaderOptions = [
        { text: '건강검진 기관', name: 'heaCheckupOrgNm', width: '150', fixed: true, align: 'left' },
        { text: '기간', name: 'ymd', width: '250', fixed: true, align: 'center' },
        { text: '일일 예약최대인원', child: 
          [
            { text: '평일', name: 'weekdayMax', width: '100', align: 'right' },
            { text: '토요일', name: 'weekendMax', width: '100', align: 'right' },
          ]
        }
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** /Call API service **/
    
    /** validation checking **/
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
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.heaCheckupPlanOrgGridData = [
          { heaCheckupOrgNm: '서울대병원', ymd: '', weekdayMax: '100', weekendMax: '20' },
        ];
      }, 2000);
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