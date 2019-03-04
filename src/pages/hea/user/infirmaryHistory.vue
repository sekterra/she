<!--
  목적 : 건강상담 이력
  작성자 : kga
  Detail :
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
                v-if="editable"
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked" 
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :range="true"
                label="방문일"
                name="duration"
                v-model="searchParam.duration"
              >
              </y-datepicker>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <b-row class="mb-3"></b-row>
          <y-data-table
            label="건강상담 목록"
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
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'infirmary-history',
  props: {
  },
  data () {
    return {
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      searchParam: {
        duration: null,
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '65%',
        top: '10px',
        param: {},
        closeCallback: null
      },
      baseWidth: 8,
      editable: true,
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
      this.gridOptions.header = [
        { text: '사번', name: 'userId', width: '15px', align: 'center' },
        { text: '사용자명', name: 'userNm', width: '15px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '15px', align: 'center' },
        { text: '방문일', name: 'visitYmd', width: '15px', align: 'center', url: 'true' },
        { text: '진료내역', name: 'heaTreatNm', width: '20px', align: 'left' },
        { text: '주호소 및 증상', name: 'symptom', width: '20px', align: 'left' },
        { text: '간호 및 상담내용', name: 'consult', width: '20px', align: 'left' },
        { text: '특이사항', name: 'remark', width: '20px', align: 'left' },
      ];

      // URL 셋팅
      this.searchUrl = selectConfig.infirmaryUsageHistory.list.url;

      this.getDataList();
      this.setGridSize();
    },
    // 건강상담 목록 그리드
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
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 270;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    // 검색
    btnSearchClicked () {
      this.getDataList();
    },
    // 검색박스 숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    tableLinkClicked (header, data) {
      if (data === null) return;

      this.popupOptions.target = () => import(`${'./getGeneralBusinesses.vue'}`);
      this.popupOptions.title = '건강상담 상세';
      this.popupOptions.param = {
        'heaInfirmaryUsageNo': data.heaInfirmaryUsageNo
      };
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    // 팝업 닫기
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getDataList();
    },
    /** /Button Event **/
  }
};
</script>