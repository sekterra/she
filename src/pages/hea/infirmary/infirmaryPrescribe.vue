<!--
  목적 : 건강관리실 처방현황
  작성자 : kckim
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
            <y-label label="검색" />
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
                label="처방기간"
                name="duration"
                v-model="searchParam.duration"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="drugItems"
                itemText="heaDrugNm"
                itemValue="heaDrugNo"
                ui="bootstrap"
                type="search"
                label="약품"
                name="heaDrugNo"
                v-model="searchParam.heaDrugNo"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            label="약품 처방 현황 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
          />
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'infirmary-prescribe',
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
        heaDrugNo: 0,
        duration: null,
      },
      editable: true,
      searchUrl: '',
      baseWidth: 8,
      drugItems: [],
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSize);
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.gridOptions.header = [
        { text: '처방일자', name: 'visitYmd', width: '15%', align: 'center' },
        { text: '부서', name: 'deptNm', width: '10%', align: 'center' },
        { text: '처방인', name: 'userNm', width: '10%', align: 'center' },
        { text: '약품', name: 'heaDrugNm', width: '25%', align: 'left' },
        { text: '사용량', name: 'amount', width: '10%', align: 'center' },
        { text: '단위', name: 'unit', width: '8%', align: 'center' },
      ];
      
      this.searchUrl = selectConfig.infirmaryPrescribe.list.url;

      this.getDrugItems();
      this.getInfirmaryPrescribes();
      this.setGridSize();
    },
    /** /초기화 관련 함수 **/
    
    // 약품 콤보박스
    getDrugItems () {
      this.$http.url = selectConfig.drugManage.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        useYn: 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaDrugNo': '0', 'heaDrugNm': '전체' });
        this.drugItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    // 약품처방 data
    getInfirmaryPrescribes () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
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
    /** Button Event **/
    btnSearchClicked () {
      this.getInfirmaryPrescribes();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    /** /Button Event **/
  }
};
</script>