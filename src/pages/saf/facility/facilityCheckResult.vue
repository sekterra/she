<!--
  목적 : 설비점검 - 설비점검결과
  Detail : 설비점검결과 목록 화면으로 이미 등록된 계획을 선택하여 결과를 등록.
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
          
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header" >
              <y-label label="검색" />
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
              <y-datepicker
                :width="8"
                :range="true"
                label="기간"
                name="period"
                v-model="searchParam.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-select
                    :width="6"
                    :comboItems="comboFacilityTypeItems"
                    itemText="safFacilityTypeNm"
                    itemValue="safFacilityTypeCd"
                    ui="bootstrap"
                    name="safFacilityTypeCd"
                    label="설비유형/명칭"
                    v-model="searchParam.safFacilityTypeCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                    :width="12"
                    ui="bootstrap"
                    name="facilityNm"
                    v-model="searchParam.facilityNm"
                    >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckTypeItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="설비점검종류"
                name="safFacilityCheckCd"
                v-model="searchParam.safFacilityCheckCd"
              >
            </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckStepItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="checkStepCd"
                label="진행단계"
                v-model="searchParam.checkStepCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            label="설비점검결과 목록"
            @tableLinkClicked="tableLinkFacilityNmClicked"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>          
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-facility-check-result-plan',
  props: {
  },
  data: () => ({
    searchParam: {
      safFacilityCheckCd: '', // 설비점검종류
      safFacilityTypeCd: '', // 설비유형코드
      facilityNm: '', // 설비명
      checkStepCd: '', // 점검진행상태
      period: [],
      startYmd: '',
      endYmd: '',
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      param: null,
      width: '90%',
      top: '10px',
      closeCallback: null
    },
    baseWidth: 9,
    editable: false,
    isInsert: false,
    comboCheckTypeItems: [], // 설비점검종류
    comboFacilityTypeItems: [], // 설비유형 
    comboCheckStepItems: [], // 진행단계
    searchUrl: '',
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
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
      // Url Setting
      this.searchUrl = selectConfig.saf.facilityCheckResult.list.url;
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '진행단계', name: 'checkStepNm', width: '130px', align: 'center' },
        { text: '점검종류', name: 'safFacilityCheckNm', width: '110px', align: 'center' },
        { text: '점검예정일', name: 'safFacilityCheckSchYmd', width: '150px', align: 'center' },
        { text: '점검일', name: 'safFacilityCheckYmd', width: '150px', align: 'center' },
        { text: '설비유형', name: 'safFacilityTypeNm', width: '110px', align: 'center' },
        { text: '설비코드', name: 'safFacilityCd', width: '130px', align: 'center' },
        { text: '설비명', name: 'facilityNm', width: '180px', type: 'link' },
        { text: '등록자', name: 'createUserNm', width: '130px', },
        { text: '등록일', name: 'createDt', width: '150px', align: 'center' },
      ];
      // 기간 Setting
      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(today, '1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      setTimeout(() => {
        this.searchParam.period = [from, to];
        this.getComboItems('SAF_CHECK_STEP'); // 진행단계
        this.getComboItems('SAF_FACILITY_CHECK'); // 설비점검종류
        this.getComboFacilityTypeItems(); // 설비유형
        this.getList(); // 설비점검결과 목록 조회
        this.setGridSize(); // 그리드 사이즈 조절
      }, 300);
    },
    /**
     * 공통 마스터 정보 조회 (진행단계, 설비점검종류)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_CHECK_STEP')
        {
          this.comboCheckStepItems = this.$_.clone(_result.data);
          this.comboCheckStepItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
          this.searchParam.checkStepCd = '';
        }
        else if (codeGroupCd === 'SAF_FACILITY_CHECK') 
        {
          this.comboCheckTypeItems = this.$_.clone(_result.data);
          this.comboCheckTypeItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
          this.searchParam.safFacilityCheckCd = '';
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 설비유형 조회
     */
    getComboFacilityTypeItems () {
      this.$http.url = selectConfig.saf.refInfoFacilityType.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        this.comboFacilityTypeItems = this.$_.clone(_result.data);
        this.comboFacilityTypeItems.splice(0, 0, { 'safFacilityTypeCd': '', 'safFacilityTypeNm': '전체' });
        this.searchParam.safFacilityTypeCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 해당 계획 결과 상세보는 팝업 open
     * 설비점검결과 목록에 설비명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkFacilityNmClicked (header, data) {
      this.popupOptions.target = () => import(`${'./facilityCheckResultDetail.vue'}`);
      this.popupOptions.title = '설비점검결과';
      this.popupOptions.param = {
        safFacilityCheckResultNo: data.safFacilityCheckResultNo, // 설비점검결과번호
        safFacilityCheckCd: data.safFacilityCheckCd, // 설비점검종류 코드
        safFacilityCheckNm: data.safFacilityCheckNm, // 설비점검종류
        safFacilityCheckYmd: data.safFacilityCheckYmd, // 설비점검일
        safFacilityCheckSchYmd: data.safFacilityCheckSchYmd, // 설비점검예정일
        safFacilityTypeCd: data.safFacilityTypeCd, // 안전설비유형코드
        safFacilityTypeNm: data.safFacilityTypeNm, // 안전설비유형명
        safFacilityCd: data.safFacilityCd, // 안전설비코드
        facilityNm: data.facilityNm, // 설비명
        checkStepCd: data.checkStepCd, // 점검진행상태
        safFacilityCheckResult: data.safFacilityCheckResult, // 설비점검결과요약
      };
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    /** 설비점검결과 목록 조회 **/
    getList () {
      this.searchParam.startYmd = this.searchParam.period[0];
      this.searchParam.endYmd = this.searchParam.period[1];
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     *  팝업 안 보이도록 설정 후 getReserveData 호출
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      if (data === null || data === undefined) return;
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getList();
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
        this.gridOptions.height = calculatedHeight <= 250 ? defaultHeight : calculatedHeight;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검색박스 숨기기/보이기 처리 후 setGridSize 호출
     */
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     * 설비점검결과 목록 조회
     *  검색 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSearchClickedCallback () {
      this.getList();
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      Object.assign(this.$data.facilityCheckResult, this.$options.data().facilityCheckResult);
      Object.assign(this.$data.searchParam, this.$options.data().searchParam);
      this.$validator.reset();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>