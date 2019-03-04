<!--
  목적 : 수검현황
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row xs12 ref="searchBox">
      <b-col>
        <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색" />
            </div>
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                title="검색"
                color="green"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboCheckupPlans"
                itemText="heaCheckupPlanNm"
                itemValue="heaCheckupPlanNo"
                ui="bootstrap"
                type="search"
                label="검진 계획"
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
                v-model="searchParam.reservePeriod"
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
                label="검진 기관 선택"
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
          <div class="float-right mb-1">
                <y-btn
                  v-if="editable"
                  :action-url="saveUrl"
                  :param="searchParam"
                  :is-submit="isSms"
                  title="메일/알림톡/SMS발송"
                  color="blue"
                  action-type="POST"
                  beforeSubmit = "beforeSubmit"
                  @beforeSubmit="beforeSubmit"
                  @btnClicked="btnSmsCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
            </div>
          <y-data-table 
           label="수검 현황"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
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
import selectConfig from '@/js/selectConfig';
export default {
  name: 'y-search',
  props: {
  },
  data: () => ({
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    searchParam: {
      heaCheckupPlanNo: 0,
      reservePeriod: null,
      heaCheckupOrgNos: [],
      statusYn: '',
    },
    gridOptions: {
      header: [],
      data: [],
      height: '480'
    },
    baseWidth: 8,
    editable: true,
    isSms: false,
    saveUrl: '',
    searchUrl: '',
    comboCheckupPlans: [],
    comboCheckupYnItems: [],
    heaCheckupOrgNosItems: [],
    heaCheckupOrgNos: [],
  }),
  watch: {
    // 검진기관 선택 멀티셀렉트
    heaCheckupOrgNos () {
      this.searchParam.heaCheckupOrgNos = this.$_.map(this.heaCheckupOrgNos, 'code');
    }
  },
  beforeMount () {
    this.init();
  },
  mounted () {
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.checkupUser.list.url;

      setTimeout(() => {
        this.comboCheckupYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboCheckupYnItems.push({ 'code': 'Y', 'codeNm': '수검' });
        this.comboCheckupYnItems.push({ 'code': 'N', 'codeNm': '미수검' });

        this.getComboCheckupPlans();
        this.getheaCheckupOrgNosItems();
        this.getDataList();
      }, 200);

      // 수검 현황 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검진 계획', name: 'heaCheckupPlanNm', width: '200px', align: 'center' },
        { text: '예약일자', name: 'reserveYmd', width: '110px', align: 'center' },
        { text: '예약 검진 기관', name: 'heaCheckupOrgNm', width: '130px', align: 'left' },
        { text: '검진 일자', name: 'heaCheckedYmd', width: '110px', align: 'center' },
        { text: '검진받은 기관', name: 'heaCheckedOrgNm', width: '130px', align: 'left' },
        { text: '예약자', name: 'userNm', width: '90px', align: 'center' },
        { text: '수검여부', name: 'statusYn', width: '90px', align: 'center' },
      ];
    },

    // 검진 계획
    getComboCheckupPlans () {
      this.$http.url = selectConfig.checkupPlan.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboCheckupPlans = _result.data;
        this.comboCheckupPlans.splice(0, 0, { 'heaCheckupPlanNo': '0', 'heaCheckupPlanNm': '전체' })
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    // 검진 기관
    getheaCheckupOrgNosItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.heaCheckupOrgNosItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    // 수검현황 그리드
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 250;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    beforeSubmit () {
      this.checkValidation();
    },

    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
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
    // 검색
    btnSearchClickedCallback () {
      this.getDataList();
    },
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    // 메일/알림톡/SMS발송
    btnSmsCallback (_result) {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '발송이 완료되었습니다.');
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '에러가 발생하였습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>