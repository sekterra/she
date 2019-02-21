<!--
  목적 : 보건 홈 - 검진 이력
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card">
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
                  @btnClicked="btnSearchCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :range="true"
                label="기간"
                name="heaCheckedPeriod"
                v-model="searchParam.heaCheckedPeriod"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="heaCheckupClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="검진 종류"
                name="heaCheckupClassCd"
                v-model="searchParam.heaCheckupClassCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검진 이력 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="검진 이력"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
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
  name: 'y-healthExamHist',
  props: {
  },
  data: () => ({
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    searchParam: {
      heaCheckedPeriod: null,
      heaCheckupClassCd: null,
    },
    gridOptions: {
      header: [],
      data: [],
      height: '560'
    },
    baseWidth: 8,
    editable: true,
    searchUrl: '',
    heaCheckupClassItems: [],
  }),
  beforeMount () {
    this.init();
    this.getComboItems();
    this.getDataList();
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
      this.searchUrl = selectConfig.checkupHistory.list.url;

      // 검진 이력 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검진 일자', name: 'heaCheckedYmd', width: '23%', align: 'center' },
        { text: '분류', name: 'heaCheckupClassNm', width: '25%', align: 'center' },
        { text: '검진 명칭', name: 'heaCheckupPlanNm', width: '40%', align: 'left' },
        { text: '검진 기관', name: 'heaCheckupOrgNm', width: '25%', align: 'left' },
        { text: '사후관리 판정', name: 'heaFollowUpCd', width: '25%', align: 'center' },
        { text: '사후관리 소견', name: 'heaFollowUpRemark', width: '30%', align: 'left' },
        { text: '업무적합 판정', name: 'heaWorkableCd', width: '25%', align: 'center' }
      ];
    },
    // 검진 종류
    getComboItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_CHECKUP_CLASS');
      this.$http.type = 'GET';

      this.$http.request((_result) => {
        this.heaCheckupClassItems = this.$_.clone(_result.data);
        this.heaCheckupClassItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.searchParam.heaCheckupClassCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 검진이력 그리드
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
    /** button 관련 이벤트 **/
    // 검색
    btnSearchCallback () {
      this.getDataList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '에러가 발생하였습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>