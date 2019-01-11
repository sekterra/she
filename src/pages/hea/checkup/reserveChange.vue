<!--
  목적 : 예약변경
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
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
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="processItems"
                itemText="processName"
                itemValue="processPk"
                ui="bootstrap"
                type="search"
                label="공정"
                name="processValue"
                v-model="reserveChange.processValue"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="deptItems"
                itemText="deptName"
                itemValue="deptPk"
                ui="bootstrap"
                type="search"
                label="부서"
                name="deptValue"
                v-model="reserveChange.deptValue"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :maxlength="20"
                ui="bootstrap"
                label="사원명"
                name="test"
                :appendIcon="icons"
                v-model="reserveChange.empNm"
                @iconCallback="searchUserCallback"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :range="true"
                label="예약일"
                name="remark"
                v-model="reserveChange.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-multi-select
                :width="10"
                :editable="editable"
                :comboItems="heaCheckupOrgs"
                v-model="reserveChange.heaCheckupOrg"
                type="edit"
                itemText="heaCheckupOrgName"
                itemValue="heaCheckupOrgPk"
                ui="bootstrap"
                label="검진기관 선택"
                name="heaCheckupOrg"
                v-validate="'required'"
                :state="validateState('heaCheckupOrg')"
              >
              </y-multi-select> 
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 예약인원 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="예약자 목록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <div class="float-right">
          <y-btn
            v-if="editable"
            :action-url="saveUrl"
            :param="reserveChange"
            :is-submit="isSubmit"
            type="save"
            title="메일/알림톡/SMS 발송"
            size="small"
            color="primary"
            action-type="POST"
            beforeSubmit = "beforeSubmit"
            @beforeSubmit="beforeSubmit"
            @btnClicked="btnSaveClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            v-if="editable"
            type="clear"
            title="변경"
            size="small"
              color="primary"
            @btnClicked="btnClearClickedCallback" 
          />
        </div>
        <b-row>
          <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
            <y-datepicker
              :width="baseWidth"
              :editable="editable"
              label="변경일"
              name="dt"
              v-model="reserveChange.dt"
            >
            </y-datepicker>
            <span class="ml-3"></span>
          </b-col>
          <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
            <y-select
              :width="baseWidth"
              :editable="editable"
              :comboItems="institutions"
              itemText="value"
              itemValue="key"
              ui="bootstrap"
              type="search"
              label="건강검진 기관"
              name="institution"
              v-model="reserveChange.institution"
            >
            </y-select>
          </b-col>
        </b-row>
        <b-col sm="12" class="px-0">
          <y-data-table 
            :headers="rsrvGridHeaderOptions"
            :items="rsrvGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            ref="dataTable"
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
          
    <!-- 예약정보 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="예약인원 목록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
            <y-datepicker
              :width="base"
              :editable="editable"
              type="year"
              label=""
              name="year"
              placeholder=""
              v-model="reserveChange.year"
            >
            </y-datepicker>
          </b-col>
          <y-label label="년" />
          <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2 ml-3">
            <y-datepicker
              :width="12"
              :editable="editable"
              type="month"
              label=""
              name="month"
              placeholder=""
              v-model="reserveChange.month"
            >
            </y-datepicker>
          </b-col>
          <y-label label="월" />
        </b-row>
          <b-col sm="6" class="px-0">
            <y-data-table 
              :headers="rsrvNumGridHeaderOptions"
              :items="rsrvNumGridData"
              :editable="editable"
              :excel-down="true"
              :print="true"
              :rows="3"
              title="예약인원"
              ref="dataTable"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-reserveChange',
  props: {
  },
  data: () => ({
    reserveChange: {
      type: '',
      empNm: '',
      deptPk: null,
      period: null,
      year: null,
      month: null,
      dt: null,
      institution: '',
      processSelect: null,
      heaCheckupOrg: [],
    },
    checkItem: {
      checkType: '종합건강검진',
      checkPlan: '2018년 종합건강검진',
      checkDate: '2018-03-01 ~ 2018-04-30'
    },
    searchParam: {
    },
    icons: [
      { 'icon': 'search', callbackName: 'searchUserCallback' },
      // { 'icon': 'times', callbackName: 'searchUserCallback' }
    ],
    institutions: [],
    baseWidth: 8,
    editable: true,
    isSubmit: false,
    rsrvNumGridData: [],
    rsrvNumGridHeaderOptions: [],
    rsrvGridData: [],
    rsrvGridHeaderOptions: [],
    multiSelectItems: [],
    saveUrl: '',
    deleteUrl: '',
    processItems: [],
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.getItems();
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    /** Call API service **/
    /**
     * 부서 정보를 가져옴
     */
    getItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.processItems = [
          { processPk: '1', processName: '일반공정' },
          { processPk: '2', processName: '특수공정' }
        ];
        this.deptItems = [
          { deptPk: '1', deptName: '경영팀' },
          { deptPk: '2', deptName: 'SDG팀' },
          { deptPk: '3', deptName: '영업팀' },
        ];
        this.institutions = [
          { key: 's1', value: '새서울병원' },
          { key: 's2', value: '서울대병원' },
          { key: 's3', value: '세브란스병원' },
          { key: 's4', value: '중앙의료원' }
        ];
        this.heaCheckupOrgs = [
          { heaCheckupOrgPk: '1', heaCheckupOrgName: '새서울병원' },
          { heaCheckupOrgPk: '2', heaCheckupOrgName: '서울대병원' },
          { heaCheckupOrgPk: '3', heaCheckupOrgName: '세브란스병원' },
          { heaCheckupOrgPk: '4', heaCheckupOrgName: '중앙의료원' },
        ];
      }, 3000);
    },
    /** /Call API service **/
    init () {
      // 예약인원 그리드 헤더 설정
      this.rsrvNumGridHeaderOptions = [
        { text: '일자', name: 'rsrv_dt', width: '40%', align: 'center' },
        { text: '병원', name: 'hospital', width: '40%', align: 'center' },
        { text: '예약인원', name: 'rsrv_num', width: '40%', align: 'center' }
      ];
      // 예약정보 그리드 헤더 설정
      this.rsrvGridHeaderOptions = [
        { text: '부서', name: 'dept', width: '20%', align: 'left' },
        { text: '사번', name: 'emp_no', width: '15%', align: 'center' },
        { text: '사원', name: 'emp_nm', width: '15%', align: 'center' },
        { text: '검진기관', name: 'hospital', width: '20%', align: 'left' },
        { text: '예약일', name: 'rsrv_dt', width: '20%', align: 'center' },
        { text: '입사일', name: 'emp_dt', width: '20%', align: 'center' },
        { text: '휴대전화', name: 'phone', width: '20%', align: 'center' },
        { text: '원내전화', name: 'tel', width: '20%', align: 'center' }
      ];
    },
    /** 저장 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.checkValidation();
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.rsrvNumGridData = [
          { rsrv_dt: '2018-03-11', hospital: '새서울병원', rsrv_num: '2/10' },
          { rsrv_dt: '2018-03-12', hospital: '서울대병원', rsrv_num: '5/10' },
          { rsrv_dt: '2018-03-13', hospital: '서울대병원', rsrv_num: '8/10' },
        ];
        this.rsrvGridData = [
          { dept: '시스템연구소', emp_no: '100000', emp_nm: '홍길동', hospital: '새서울병원', rsrv_dt: '2017-04-01', emp_dt: '2017-01-12', phone: '010-1234-5678', tel: '02-555-7033' },
          { dept: 'EDM팀', emp_no: '100001', emp_nm: '임꺽정', hospital: '새서울병원', rsrv_dt: '2017-04-01', emp_dt: '2017-01-12', phone: '010-1111-1111', tel: '02-555-7034' },
        ];
      }, 2000);
    },

    /** Component Events, Callbacks (버튼 제외) **/
    searchUserCallback () {
      console.log('::::::: searchUserCallback :::::::');
    },
    /** /Component, Callbacks (버튼 제외) **/
    /** button 관련 이벤트 **/
    btnSearchCallback () {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    btnClearClickedCallback () {
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '저장 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '에러가 발생하였습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>