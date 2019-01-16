<!--
  목적 : 건강검진 계획
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
        <div class="float-right">
          <y-btn
            v-if="editable"
            :action-url="deleteUrl"
            :param="checkupPlan"
            :is-submit="isDelete"
            type="delete"
            size="small"
            color="danger"
            icon="el-icon-delete"
            action-type="POST"
            beforeSubmit = "getConfirm"
            @getConfirm="getConfirm"
            @btnClicked="btnDeleteClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
        </div>
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="건강검진 계획 목록"
            :headers="checkupPlanGridHeaderOptions"
            :items="checkupPlanGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :rows="4"
            ref="dataTable"
            >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>

      <b-row class="mt-3">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="건강검진 계획 상세" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
          <b-card>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="baseWidth"
                  :editable="editable"
                  :comboItems="heaCheckupTypes"
                  itemText="heaCheckupTypeName"
                  itemValue="heaCheckupTypePk"
                  ui="bootstrap"
                  type="edit"
                  label="건강검진 종류"
                  name="heaCheckupType"
                  v-model="checkupPlan.heaCheckupType"
                  v-validate="'required'"
                  :state="validateState('heaCheckupType')"
                >
                </y-select>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="7"
                  :editable="7"
                  :maxlength="100"
                  ui="bootstrap"
                  label="건강검진 계획명"
                  name="heaCheckupPlanNm"
                  v-model="checkupPlan.heaCheckupPlanNm"
                  v-validate="'required'"
                  :state="validateState('heaCheckupPlanNm')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                  :width="baseWidth"
                  :editable="editable"
                  :range="true"
                  label="건강검진 기간"
                  name="remark"
                  v-model="checkupPlan.period"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                  :width="7"
                  :editable="editable"
                  label="건강검진 예약 마감일"
                  name="finishYmd"
                  v-model="checkupPlan.finishYmd"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-8">
                <y-shuttlebox
                  :width="10"
                  :editable="editable"
                  :items="heaCheckupOrgItems"
                  itemText="text"
                  itemValue="value"
                  ui="bootstrap"
                  label="건강검진 기관 선택"
                  name="heaCheckupOrg"
                  v-model="checkupPlan.heaDiagnoseCds"
                  >
                </y-shuttlebox>
              </b-col>
            </b-row>
            <div class="float-right mt-3">
              <y-btn
                v-if="editable"
                type="clear"
                title="초기화"
                size="small"
                color="info"
                @btnClicked="btnClearClickedCallback" 
              />
              <y-btn
                v-if="editable"
                :action-url="saveNewUrl"
                :param="hazard"
                :is-submit="isSubmit"
                type="save"
                title="신규등록"
                size="small"
                color="warning"
                action-type="POST"
                beforeSubmit = "beforeSubmit"
                @beforeSubmit="beforeSubmit"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editable"
                :action-url="saveUrl"
                :param="checkupPlan"
                :is-submit="isSave"
                type="save"
                title="수정"
                size="small"
                color="warning"
                action-type="POST"
                beforeSubmit = "beforeSubmit"
                @beforeSubmit="beforeSubmit"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'checkup-plan',  
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      checkupPlan: {
        heaCheckupType: null,
        heaCheckupPlanNm: '',
        duration: null,
        period: null,
        finishYmd: '',
        heaCheckupOrg: []
      },
      baseWidth: 8,
      editable: true,
      heaCheckupTypes: [],
      checkupPlanGridData: [],
      checkupPlanGridHeaderOptions: [],
      heaCheckupOrgItems: [],
      saveUrl: '',
      deleteUrl: '',
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
      isSave: false,  
      isDelete: false,  
      searchParam: {
        heaDiagnoseCds: [],
      }
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
    this.getItems();
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
      // 건강검진 계획 그리드 헤더 설정
      this.checkupPlanGridHeaderOptions = [
        { text: '건강검진 종류', name: 'heaCheckupType', width: '30%', align: 'center' },
        { text: '건강검진 계획', name: 'heaCheckupPlan', width: '30%', align: 'center' },
        { text: '건강검진 일정', name: 'heaCheckupYmd', width: '30%', align: 'center' },
      ];

      // TODO : backend에서 데이터를 조회해 올것
      setTimeout(() => {
        this.heaCheckupOrgItems = [
          { text: '새서울병원', value: '1' },
          { text: '서울대병원', value: '2' },
          { text: '세브란스병원', value: '3' },
          { text: '아산병원', value: '4' },
          { text: '중앙대병원', value: '5' },
          { text: '중앙의료재단', value: '6' },
        ];
      }, 3000);
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.heaCheckupTypes = [
          { heaCheckupTypePk: '1', heaCheckupTypeName: '종합건강검진' },
          { heaCheckupTypePk: '2', heaCheckupTypeName: '일반건강검진' },
          { heaCheckupTypePk: '3', heaCheckupTypeName: '특수건강검진' }
        ];
        this.checkupPlanGridData = [
          { heaCheckupType: '종합건강검진', heaCheckupPlan: '2018년 종합건강검진', heaCheckupYmd: '2018-03-01~2018-04-30' },
          { heaCheckupType: '일반건강검진', heaCheckupPlan: '2018년 일반건강검진', heaCheckupYmd: '2018-04-01~2018-06-23' },
          { heaCheckupType: '특수건강검진', heaCheckupPlan: '2018년 특수건강검진', heaCheckupYmd: '2018-04-01~2018-06-30' }
        ];
      }, 3000);
    },
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
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
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
    /**
    * 버튼 초기화 처리용 공통함수
    */
    btnClearClickedCallback () {
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /**
    * 버튼 삭제 처리용 공통함수
    */
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '삭제 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/

    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>