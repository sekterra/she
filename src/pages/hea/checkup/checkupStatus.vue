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
                  :param="searchParam"
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
                  :action-url="searchUrl"
                  :param="searchParam"
                  type="search"
                  title="검색"
                  size="mini"
                  color="success"
                  action-type="get"
                  @btnClicked="btnSearchClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboCheckupPlans"
                itemText="heaCheckupPlanNm"
                itemValue="heaCheckupPlanNo"
                ui="bootstrap"
                type="search"
                label="건강검진 계획"
                name="heaCheckupPlanNo"
                v-model="searchParam.heaCheckupPlanNo"
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
                v-model="searchParam.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-3">
              <y-multi-select
                :width="9"
                :editable="editable"
                :comboItems="heaCheckupOrgNosItems"
                type="edit"
                itemText="heaCheckupOrgNm"
                itemValue="heaCheckupOrgNo"
                ui="bootstrap"
                label="건강검진 기관 선택"
                name="heaCheckupOrgNos"
                v-model="heaCheckupOrgNos"
              >
              </y-multi-select> 
            </b-col>
            <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboCheckupYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="수검여부"
                name="statusYn"
                v-model="searchParam.statusYn"
              >
              </y-select>
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
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-search',
  props: {
  },
  data: () => ({
    searchParam: {
      heaCheckupPlanNo: 0,
      period: null,
      heaCheckupOrgNos: [],
      statusYn: '',
    },
    baseWidth: 8,
    editable: true,
    isSms: false,
    searchGridData: [],
    searchGridHeaderOptions: [],
    saveUrl: '',
    searchUrl: '',
    comboCheckupPlans: [],
    comboCheckupYnItems: [],
    heaCheckupOrgNosItems: [],
    heaCheckupOrgNos: [],
  }),
  watch: {
    heaCheckupOrgNos () {
      this.searchParam.heaCheckupOrgNos = this.$_.map(this.heaCheckupOrgNos, 'code');
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.init();
    
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL Setting
      this.searchUrl = selectConfig.checkupUser.list.url;

      setTimeout(() => {
        this.comboCheckupYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboCheckupYnItems.push({ 'code': 'Y', 'codeNm': '수검' });
        this.comboCheckupYnItems.push({ 'code': 'N', 'codeNm': '미수검' });

        this.getComboCheckupPlans(); // 건강검진 계획
        this.getheaCheckupOrgNosItems(); // 건강검진 기관
        this.getDataList();
      }, 200);

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
        { text: '건강검진 계획', name: 'heaCheckupPlanNm', width: '30%', align: 'center' },
        { text: '예약일자', name: 'reserveYmd', width: '20%', align: 'center' },
        { text: '예약 건강검진 기관', name: 'heaCheckupOrgNm', width: '30%', align: 'left' },
        { text: '건강검진 일자', name: 'heaCheckedYmd', width: '25%', align: 'center' },
        { text: '건강검진받은 기관', name: 'heaCheckedOrgNm', width: '30%', align: 'left' },
        { text: '예약자', name: 'userNm', width: '15%', align: 'center' },
        { text: '수검여부', name: 'statusYn', width: '20%', align: 'center' },
      ];
    },
    /** 초기화 관련 함수 **/

    /** Call API service **/
    // 건강검진 계획
    getComboCheckupPlans () {
      this.$http.url = selectConfig.checkupPlan.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboCheckupPlans = _result.data;
        this.comboCheckupPlans.splice(0, 0, { 'heaCheckupPlanNo': '0', 'heaCheckupPlanNm': '전체' })
      }, (_error) => {
        console.log(_error);
      });
    },
    getheaCheckupOrgNosItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.heaCheckupOrgNosItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.searchGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    change () {
      var selectedValues = this.$_.map(this.vValue, 'code');
      console.log(JSON.stringify(selectedValues));
    },
    /** /Call API service **/

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
    /** button 관련 이벤트 **/
    btnSearchClickedCallback () {
      this.getDataList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    btnClearClickedCallback () {
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      this.getDataList();
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