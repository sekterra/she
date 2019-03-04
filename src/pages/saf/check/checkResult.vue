<!--
  목적 : 안전점검 관리 - 안전점검결과
  Detail : 안전점검결과 목록 화면으로 이미 등록된 계획을 선택하여 결과를 등록하거나 등록창을 띄워 별도 결과만 등록할 수 있음
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
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
                title="검색"
                color="green"
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
                    :comboItems="comboDeptItems"
                    itemText="deptNm"
                    itemValue="deptCd"
                    ui="bootstrap"
                    name="deptCd"
                    label="주관/대상부서"
                    v-model="searchParam.deptCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-select
                    :width="12"
                    :comboItems="comboTgtDeptItems"
                    itemText="deptNm"
                    itemValue="deptCd"
                    ui="bootstrap"
                    name="tgtDeptCd"
                    v-model="searchParam.tgtDeptCd"
                  >
                  </y-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckKindItems"
                itemText="safCheckKindNm"
                itemValue="safCheckKindNo"
                ui="bootstrap"
                name="safCheckKindNo"
                label="점검종류"
                v-model="searchParam.safCheckKindNo"
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
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              title="무계획결과등록"
              color="orange"
              @btnClicked="btnSearchCheckResultOpenPopupClicked" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            @tableLinkClicked="tableLinkCheckTitleClicked"
            label="안전점검결과 목록"
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
  name: 'y-check-result',
  props: {
  },
  data: () => ({
    searchParam: {
      period: [],
      startDate: '',
      endDate: '',
      tgtDeptCd: '', // 대상부서코드
      deptCd: '', // 주관부서코드
      safCheckKindNo: '', // 점검종류번호
      checkStepCd: '', // 점검진행상태
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
    isEdit: false,
    comboCheckKindItems: [], // 점검종류 
    comboDeptItems: [], // 주관부서
    comboTgtDeptItems: [], // 대상부서
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
      this.searchUrl = selectConfig.saf.checkResult.list.url;      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '진행단계', name: 'checkStepNm', width: '110px', align: 'center' },
        { text: '점검종류', name: 'safCheckKindNm', width: '130px', align: 'center' },
        { text: '점검예정일', name: 'checkSchYmd', width: '150px', align: 'center' },
        { text: '점검일', name: 'checkYmd', width: '150px', align: 'center' },
        { text: '점검명', name: 'checkTitle', width: '250px', type: 'link' },
        { text: '주관부서', name: 'deptNm', width: '130px', },
        { text: '대상부서', name: 'tgtDeptNm', width: '130px', },
        { text: '등록자', name: 'createUserNm', width: '130px', },
        { text: '등록일', name: 'createDt', width: '150px', align: 'center' }
      ];
      this.getComboItems('SAF_CHECK_STEP'); // 진행단계
      this.getComboCheckKindItems(); // 점검종류
      this.getComboDeptItems(); // 점검주관부서, 점검수행부서
      // 기간 Setting
      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(today, '1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      setTimeout(() => {
        this.searchParam.period = [from, to];
        this.getList(); // 안전점검결과 목록 조회
      }, 300);
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공통 마스터 정보 조회 (진행단계)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboCheckStepItems = this.$_.clone(_result.data);
        this.comboCheckStepItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.searchParam.checkStepCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 점검종류 조회
     */
    getComboCheckKindItems () {
      this.$http.url = selectConfig.saf.checkKind.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'facilityUseYn': 'N',
        'useYn': 'Y',
      };
      this.$http.request((_result) => {
        this.comboCheckKindItems = this.$_.clone(_result.data);
        this.comboCheckKindItems.splice(0, 0, { 'safCheckKindNo': '', 'safCheckKindNm': '전체' });
        this.searchParam.safCheckKindNo = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 점검주관부서, 점검수행부서 조회
     */
    getComboDeptItems (codeGroupCd) {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDeptItems = this.$_.clone(_result.data);
        this.comboDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.searchParam.deptCd = '';
        this.comboTgtDeptItems = this.$_.clone(_result.data);
        this.comboTgtDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.searchParam.tempTgtDeptCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * showCheckResultPopup 호출
     * 월별 안전점검결과 목록에 점검명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkCheckTitleClicked (header, data) {
      this.showCheckResultPopup(data, false);
    },
    /**
     * 해당 계획 결과 상세보는 팝업 open
     */
    showCheckResultPopup (data, flag) {
      this.popupOptions.target = () => import(`${'./checkResultDetail.vue'}`);
      this.popupOptions.title = flag ? '안전점검결과 등록' : '안전점검결과';
      this.popupOptions.param = {
        safCheckRsltNo: data.safCheckRsltNo, // 안전점검결과번호
        tgtDeptCd: data.tgtDeptCd, // 대상부서코드
        deptCd: data.deptCd, // 주관부서코드
        checkOrgCd: data.checkOrgCd, // 점검기관코드
        checkYmd: data.checkYmd, // 점검일
        checkSchYmd: data.checkSchYmd, // 점검예정일
        checkTitle: data.checkTitle, // 점검명
        checkResult: data.checkResult, // 결과요약
        checkStepCd: data.checkStepCd, // 점검진행상태코드
        checkStepNm: data.checkStepNm, // 점검진행상태명
        safCheckKindNo: data.safCheckKindNo, // 안전점검종류번호

        flag: flag, // 수정인지 등록인지 판단
      };
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    /** 안전점검결과 목록 조회 **/
    getList () {
      this.searchParam.startDate = this.$_.clone(this.searchParam.period[0]);
      this.searchParam.endDate = this.$_.clone(this.searchParam.period[1]);
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
    btnSearchCheckResultOpenPopupClicked () {
      var data = {
        safCheckRsltNo: 0, // 안전점검결과번호
        tgtDeptCd: null, // 대상부서코드
        deptCd: '', // 주관부서코드
        checkOrgCd: '', // 점검기관코드
        checkYmd: '', // 점검일
        checkSchYmd: '', // 점검예정일
        checkTitle: '', // 점검명
        checkResult: null, // 결과요약
        checkStepCd: '', // 점검진행상태코드
        checkStepNm: '', // 점검진행상태명
        safCheckKindNo: '', // 안전점검종류번호
      };
      this.showCheckResultPopup(data, true);
    },
    btnSearchClickedCallback () {
      this.getList();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>