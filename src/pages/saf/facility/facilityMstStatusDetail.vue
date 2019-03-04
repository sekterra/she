<!--
  목적 : 설비유형별 설비현황 상세
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>

  <b-container fluid>
    <b-row ref="searchBox">
      <!-- 검색조건 -->
      <b-col sm="12">
        <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색"/>
            </div>
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
              <y-btn
                title="닫기"
                @btnClicked="btnClosePopup" 
                />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="1" md="1" lg="1" xl="1" class="col-xxl-1">
              <y-label label="관리부서" />
            </b-col>
            <b-col sm="3" md="3" lg="3" xl="3" class="col-xxl-2">
              <y-label :label="searchParam.deptNm" :fieldable="true" />
            </b-col>
            <b-col sm="1" md="1" lg="1" xl="1" class="col-xxl-1">
              <y-label label="공정" />
            </b-col>
            <b-col sm="3" md="3" lg="3" xl="3" class="col-xxl-2">
              <y-label :label="searchParam.processNm" :fieldable="true" />
            </b-col>
            <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :comboItems="comboFacilityTypeItems"
                itemText="safFacilityTypeNm"
                itemValue="safFacilityTypeCd"
                ui="bootstrap"
                name="deptNm"
                label="설비유형"
                v-model="searchParam.safFacilityTypeCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 설비 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="설비유형별 관리부서별 상세 현황"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :rows="3"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="selectedRow"
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
  name: 'facility-mst-status-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        deptCd: '',
        deptNm: '',
        processNo: 0,
        processNm: '',
        safFacilityTypeCd: '',
      },
    },
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        deptCd: '',
        deptNm: '',
        processNo: 0,
        processNm: '',
        safFacilityTypeCd: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: '210'
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
      baseWidth: 8,
      comboFacilityTypeItems: [], // 설비유형 
      searchUrl: '',
    };
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.saf.facilityMst.list.url;

      this.searchParam.deptCd = this.popupParam.deptCd;
      this.searchParam.deptNm = this.popupParam.deptNm;
      this.searchParam.processNo = this.popupParam.processNo;
      this.searchParam.processNm = this.popupParam.processNm;
      this.getFacilityTypeItems(); // 설비유형

      setTimeout(() => {
        this.getDataList();  // 설비 grid
      }, 200);

      // 설비 grid 헤더 설정
      this.gridOptions.header = [
        { text: '설비유형', name: 'safFacilityTypeNm', width: '150px', align: 'center' },
        { text: '공정', name: 'processNm', width: '120px', align: 'center' },
        { text: '설비코드', name: 'safFacilityCd', width: '110px', align: 'center' },
        { text: '설비명', name: 'facilityNm', width: '200px', align: 'left' },
        { text: '관리번호', name: 'facilityMgrNum', width: '110px', align: 'center' },
        { text: '설치위치', name: 'installLocate', width: '120px', align: 'left' },
        { text: '관리부서', name: 'deptNm', width: '120px', align: 'left' },
        { text: '용량', name: 'vol', width: '100px', align: 'right' },
        { text: '설치일자', name: 'installYmd', width: '110px', align: 'center' },
        { text: '안전관리자', name: 'safMgrPsn', width: '110px', align: 'center' },
      ];
    },
    // 설비유형
    getFacilityTypeItems () {
      this.$http.url = selectConfig.saf.refInfoFacilityType.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'safFacilityTypeCd': '', 'safFacilityTypeNm': '전체' });
        this.comboFacilityTypeItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 설비 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** Button Event **/
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
    },
    // 검색
    btnSearchClickedCallback (_result) {
      this.getDataList();
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
  }
};
</script>