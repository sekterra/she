<!--
  목적 : 수검현황
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col xs12>
        <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색" />
            </div>
            <div class="float-right">
                <y-btn
                  v-if="editable"
                  :action-url="saveUrl"
                  :param="checkupStatus"
                  :is-submit="isSms"
                  type="save"
                  title="메일/알림톡/SMS발송"
                  size="mini"
                  color="primary"
                  action-type="POST"
                  beforeSubmit = "beforeSubmit"
                  @beforeSubmit="beforeSubmit"
                  @btnClicked="btnSaveClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
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
                :comboItems="examPlans"
                itemText="examPlan"
                itemValue="planPk"
                ui="bootstrap"
                type="search"
                label="검진계획"
                name="examPlanSelect"
                v-model="checkupStatus.examPlanSelect"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :range="true"
                label="예약일"
                name="remark"
                v-model="checkupStatus.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-3">
              <y-multi-select
                :width="9"
                :editable="editable"
                :comboItems="heaCheckupOrgs"
                v-model="checkupStatus.heaCheckupOrg"
                type="edit"
                itemText="heaCheckupOrgName"
                itemValue="heaCheckupOrgPk"
                ui="bootstrap"
                label="건강검진 기관 선택"
                name="heaCheckupOrg"
                v-validate="'required'"
                :state="validateState('heaCheckupOrg')"
              >
              </y-multi-select> 
            </b-col>
            <b-col sm="3" md="3" lg="3" xl="3" class="col-xxl-3">
              <y-switch
                :width="baseWidth"
                :editable="editable"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="수검여부"
                name="checkupStatusSelect"
                selectText="수검"
                unselectText="미수검"
                v-model="checkupStatus.checkupStatusSelect"
              >
            </y-switch>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 수검 현황 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
           label="수검 현황 목록"
            :headers="searchGridHeaderOptions"
            :items="searchGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :rows="9"
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
  </b-container>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-search',
  props: {
  },
  data: () => ({
    checkupStatus: {
      planPk: null,
      searchPk: null,
      period: null,
      examPlanSelect: null,
      checkupStatusSelect: 'Y',
      heaCheckupOrg: [],
    },
    baseWidth: 8,
    editable: true,
    isSms: false,
    searchGridData: [],
    searchGridHeaderOptions: [],
    saveUrl: '',
    examPlans: [],
    checkupStatuses: []
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.getItems();
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
     * 검진 종류를 가져옴
     */
    getItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.examPlans = [
          { planPk: '1', examPlan: '종합검진' },
          { planPk: '2', examPlan: '일반검진' }
        ];
        this.orgItems = [
          { orgPk: '1', orgName: '새서울병원' },
          { orgPk: '2', orgName: '서울대병원' },
          { orgPk: '3', orgName: '세브란스병원' },
          { orgPk: '4', orgName: '중앙의료원' },
        ];
        this.checkupStatuses = [
          { checkupPk: '1', checkupStatus: 'O' },
          { checkupPk: '2', checkupStatus: 'X' }
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
      // 콤보박스 초기 정보 세팅
      this.planItems = [
        { key: '', value: '' },
        { key: 'key1', value: '계획1' },
        { key: 'key2', value: '계획2' },
        { key: 'key3', value: '계획3' },
      ];
      this.searchItems = [
        { key: '', value: '' },
        { key: 'key1', value: 'O' },
        { key: 'key2', value: 'X' },
      ];

      // 수검 현황 그리드 헤더 설정
      this.searchGridHeaderOptions = [
        { text: '예약일자', name: 'rsrv_dt', width: '20%', align: 'center' },
        { text: '예약 검진기관', name: 'rsrv_hospital', width: '30%', align: 'left' },
        { text: '검진일자', name: 'exam_dt', width: '20%', align: 'center' },
        { text: '검진받은 기관', name: 'exam_hospital', width: '30%', align: 'left' },
        { text: '수검여부', name: 'search', width: '15%', align: 'center' },
        { text: '원내전화', name: 'tel', width: '15%', align: 'center' },
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
        this.searchGridData = [
          { rsrv_dt: '2018-03-02', rsrv_hospital: '새서울병원', exam_dt: '2018-09-02', exam_hospital: '세브란스 병원', search: 'Y', tel: '02-555-7033' },
          { rsrv_dt: '2018-03-12', rsrv_hospital: '고려대병원', exam_dt: '2018-06-30', exam_hospital: '고려대병원', search: 'N', tel: '02-574-7033' },
        ];
      }, 2000);
    },
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
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '삭제 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '에러가 발생하였습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>