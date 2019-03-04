<!--
  목적 : 위험등록부 - KRAS
  Detail : 평가결과 위험등록부에 등록된 KRAS 직무를 조회하는 화면
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
                :width="10"
                ui="bootstrap"
                name="assessNm"
                label="평가명"
                v-model="searchParam.assessNm"
                >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="deptCdItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                type="search"
                label="부서"
                name="deptCd"
                v-model="searchParam.deptCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="processNoItems"
                itemText="processNm"
                itemValue="processNo"
                ui="bootstrap"
                type="search"
                label="공정"
                name="processNo"
                v-model="searchParam.processNo"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                type="year"
                label="평가년도"
                name="assessYear"
                v-model="searchParam.assessYear"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                name="casNo"
                label="CAS NO." 
                v-model="searchParam.casNo"
                >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                name="chemProdNmEn"
                label="취급물질명(ENG)" 
                v-model="searchParam.chemProdNmEn"
                >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                name="chemNmEn"
                label="구성성분명(ENG)" 
                v-model="searchParam.chemNmEn"
                >
              </y-text>
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
              title="삭제"
              color="red"
              @btnClicked="btnDeleteClicked" 
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
            v-model="selectedValue"
            @tableLinkClicked="tableLinkAccidentTitleClicked"
            label="위험등록부(CHARM) 목록"
            >
            <el-table-column
              type="selection"
              slot="selection"
              align="center"
              width="55">
            </el-table-column> 
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
  name: 'y-job-risk-book-charm',
  props: {
  },
  data: () => ({
    searchParam: {
      assessNm: '', // 평가명
      deptCd: '', // 부서
      processNo: '', // 공정
      assessYear: '', // 평가년도
      casNo: '', // CAS NO.
      chemProdNmEn: '', // 취급물질명 (ENG)
      chemNmEn: '', // 구성성분명 (ENG)
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
    editable: false,
    isInsert: false,
    isEdit: false,
    processNoItems: [], // 공정
    deptCdItems: [], // 부서
    selectedValue: [],
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
      this.searchUrl = selectConfig.rsa.jobRiskBookCHARM.list.url;   
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '개선요청상태', name: 'safImprStepNm', width: '120px', align: 'center' },
        { text: '평가명', name: 'assessNm', width: '250px', },
        { text: '부서', name: 'deptNm', width: '130px', },
        { text: '취급공정', name: 'processNm', width: '130px', },
        { text: '취급물질명(KOR)', name: 'jobId', width: '140px', align: 'center' },
        { text: '취급물질명(ENG)', name: 'jobRevNo', width: '140px', align: 'center' },
        { text: '구성성분(KOR)', name: 'riskHazardNmLvlOne', width: '150px', },
        { text: '구성성분(ENG)', name: 'jobNm', width: '150px', type: 'link', },
        { text: 'CAS NO.', name: 'riskHazardNmLvlTwo', width: '130px', },
        { text: '함유량%', name: 'que', width: '130px', },
        { text: '성상', name: 'improve', width: '110px', },
        { text: '유소견자여부', name: 'improve', width: '130px', },
        { text: '평가결과', child: 
          [
            { text: '노출수준', name: 'frequencySize', width: '100px', },
            { text: '유해성', name: 'strongSize', width: '90px', },
            { text: '위험도', name: 'riskSize', width: '90px', },
          ]
        },
        { text: '노출기준초과여부', name: 'userNm', width: '150px', },
        { text: '평가자', name: 'userNm', width: '110px', },
        { text: '평가일자', name: 'assessDate', width: '130px', align: 'center' },
      ];
      this.getProcessNoItems(); // 공정 조회
      this.getDeptCdItems(); // 부서 조회
      // this.getList(); // 위험등록부 목록 조회 
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공정 조회
     */
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': null, 'processNm': '전체' });
        this.processNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /**
     * 부서 조회
     */
    getDeptCdItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': null, 'deptNm': '전체' });
        this.deptCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /**
     * 공통 마스터 정보 조회 (정기/수기)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboRegRegdemItems = this.$_.clone(_result.data);
        this.comboRegRegdemItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
    /**
     * 평가유형 조회
     */
    getComboAssessTypeItems () {
      this.$http.url = selectConfig.rsa.assessType.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboAssessTypeItems = this.$_.clone(_result.data);
        this.comboAssessTypeItems.splice(0, 0, { 'assessTypeNo': '', 'assessNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * showAccidentPopup 호출
     * 사고등록 목록에 사고명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkAccidentTitleClicked (header, data) {
      this.showAccidentPopup(data, false);
    },
    /**
     * 해당 사고 상세보는 팝업 open
     */
    showAccidentPopup (data, flag) {
      // this.popupOptions.target = () => import(`${'./accidentDetail.vue'}`);
      // this.popupOptions.title = flag ? '사고발생등록' : '사고';
      // this.popupOptions.param = {
      //   safAccidentNo: data.safAccidentNo, // 사내사고번호
      //   accidentTitle: data.accidentTitle, // 사고명
      //   accidentNum: data.accidentNum, // 발행번호
      //   accidentStepCd: data.accidentStepCd, // 사내사고진행단계

      //   tabIndex: 0,
      // };
      // this.popupOptions.visible = true;
      // this.popupOptions.closeCallback = this.closePopup;
    },
    /** 위험등록부 목록 검색 **/
    getList () {
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
    // 위험등록부 CHARM 삭제
    btnDeleteClicked () {
    },
    btnSearchClickedCallback () {
      this.getList();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>