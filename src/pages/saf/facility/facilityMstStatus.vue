<!--
  목적 : 설비관리 > 설비유형별 설비현황
  Detail : 설비유형별로 관리부서별 설비현황을 조회
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
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="deptCd"
                label="관리부서"
                v-model="searchParam.deptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="processNoItems"
                itemText="processNm"
                itemValue="processNo"
                ui="bootstrap"
                label="공정"
                name="processNo"
                v-model="searchParam.processNo"
              />
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
            label="유형별 설비 현황"
            @selectedRow="selectedRow"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>

    <!-- 팝업 설정 -->
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  name: 'y-facility-mst',
  props: {
  },
  data: () => ({
    searchParam: {
      deptCd: '', // 관리부서 코드
      processNo: 0, // 공정
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
      width: '60%',
      top: '10px',
      param: {},
      closeCallback: null,
    },
    baseWidth: 9,
    comboDeptItems: [], // 관리부서
    processNoItems: [], // 공정
    searchUrl: '',
  }),
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
      this.searchUrl = selectConfig.saf.facilityMstStatus.list.url;      

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '관리부서', name: 'deptNm', width: '150px', align: 'left' },
        { text: '공정', name: 'processNm', width: '150px', align: 'left' },
        { text: '소방설비', name: 'fctype001', width: '130px', align: 'right' },
        { text: '고압설비', name: 'fctype002', width: '150px', align: 'right' },
        { text: '위험물설비', name: 'fctype003', width: '150px', align: 'right' },
        { text: '유해위험기계기구', name: 'fctype004', width: '150px', align: 'right' },
      ];
      this.getDeptItems(); // 관리부서
      this.getProcessNoItems(); // 공정
      this.getList(); // 안전점검결과 목록 조회
      this.setGridSize(); // 그리드 사이즈 조절
    },
    // 관리부서 조회
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 공정
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': 0, 'processNm': '전체' });
        this.processNoItems = _result.data;
        this.searchParam.processNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 안전점검결과 목록 조회 **/
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
    // 그리드 row click 이벤트
    selectedRow (data) {
      if (data === null) return;
      this.btnPopupClickedCallback(data);
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 320;
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
    // 검색
    btnSearchClickedCallback () {
      this.getList();
    },
    // 유형별 설비현황 상세 팝업
    btnPopupClickedCallback (data) {
      this.popupOptions.target = () => import(`${'./facilityMstStatusDetail.vue'}`);
      this.popupOptions.title = '유형별 설비현황 상세';
      this.popupOptions.visible = true;
      this.popupOptions.width = '85%';
      this.popupOptions.top = '10px';
      this.popupOptions.param = {
        'deptCd': data ? data.deptCd : '',
        'deptNm': data ? data.deptNm : '',
        'processNo': data ? data.processNo : 0,
        'processNm': data ? data.processNm : '',
      };
      this.popupOptions.closeCallback = this.closePopup;
    },
    // 팝업 닫기
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getDataList();
    },
    // 버튼 에러 처리용 공통함수
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>