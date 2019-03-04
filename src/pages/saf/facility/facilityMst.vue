<!--
  목적 : 설비유형별 설비관리
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
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboFacilityTypeItems"
                itemText="safFacilityTypeNm"
                itemValue="safFacilityTypeCd"
                ui="bootstrap"
                name="deptCd"
                label="설비유형"
                v-model="searchParam.safFacilityTypeCd"
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
                type="search"
                label="공정"
                name="processNo"
                v-model="searchParam.processNo"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="설비코드"
                name="safFacilityCd"
                v-model="searchParam.safFacilityCd"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="설비명"
                name="facilityNm"
                v-model="searchParam.facilityNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="관리번호"
                name="facilityMgrNum"
                v-model="searchParam.facilityMgrNum"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="설치위치"
                name="installLocate"
                v-model="searchParam.installLocate"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="관리부서"
                name="deptCd"
                v-model="searchParam.deptCd"
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
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              title="신규등록"
              color="orange"
              @btnClicked="btnPopupClickedCallback" 
            />
          </div>
          <y-data-table 
            label="유형별 설비 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            :rows="3"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @tableLinkClicked="tableLinkClicked"
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
export default {
  name: 'facility-mst',
  props: {
  },
  data () {
    return {
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        safFacilityTypeCd: '',
        processNo: 0,
        deptCd: '',
        safFacilityCd: '',
        facilityNm: '',
        facilityMgrNum: '',
        installLocate: ''
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
      processNoItems: [], // 공정
      comboDeptItems: [], // 관리부서
      searchUrl: '',
    };
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
  methods: {
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.saf.facilityMst.list.url;

      this.getFacilityTypeItems(); // 설비유형
      this.getProcessNoItems(); // 공정
      this.getDeptItems();  // 관리부서
      this.getDataList();  // 설비 grid
      this.setGridSize(); // 그리드 사이즈 조절

      // 설비 grid 헤더 설정
      this.gridOptions.header = [
        { text: '설비유형', name: 'safFacilityTypeNm', width: '150px', align: 'center' },
        { text: '공정', name: 'processNm', width: '120px', align: 'center' },
        { text: '설비코드', name: 'safFacilityCd', width: '110px', align: 'center' },
        { text: '설비명', name: 'facilityNm', width: '200px', align: 'left', type: 'link' },
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
    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
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

    // 그리드 row click 이벤트
    tableLinkClicked (header, data) {
      this.btnPopupClickedCallback(data);
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    
    /** Button Event **/
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    // 검색
    btnSearchClickedCallback (_result) {
      this.getDataList();
    },
    // 신규등록 팝업
    btnPopupClickedCallback (data) {
      this.popupOptions.target = () => import(`${'./createFacilityMst.vue'}`);
      this.popupOptions.title = '유형별 설비 등록';
      this.popupOptions.visible = true;
      this.popupOptions.width = '80%';
      this.popupOptions.top = '10px';
      this.popupOptions.param = {
        'safFacilityCd': data ? data.safFacilityCd : ''
      };
      this.popupOptions.closeCallback = this.closePopup;
    },
    // 신규등록 팝업 닫기
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getDataList();
    },
    /** /Button Event **/
  }
};
</script>