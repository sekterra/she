<!--
  목적 : 폐기물-관리대장
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
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
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="ewstClassCdItems"
                itemText="ewstClassNm"
                itemValue="ewstClassCd"
                ui="bootstrap"
                name="ewstClassCd"
                label="폐기물분류"
                v-model="searchParam.ewstClassCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-datepicker
                :width="8"
                :editable="editable"
                type="month"
                label="연월"
                name="searchYm"
                v-model="searchParam.searchYm"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row class="mt-3 h-100">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            label="발생내용"
            ref="dataTable"
            :height="gridOptions.amtGen.height"
            :headers="gridOptions.amtGen.header"
            :items="gridOptions.amtGen.data"
            />
          </b-col>
      </b-col>      
    </b-row>

    <b-row class="mt-3 h-100">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            label="자가 처리내용"
            ref="dataTable"
            :height="gridOptions.selfDispo.height"
            :headers="gridOptions.selfDispo.header"
            :items="gridOptions.selfDispo.data"
            />
          </b-col>
      </b-col>      
    </b-row>

    <b-row class="mt-3 h-100">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            label="위탁 처리내용"
            ref="dataTable"
            :height="gridOptions.consignDispo.height"
            :headers="gridOptions.consignDispo.header"
            :items="gridOptions.consignDispo.data"
            />
          </b-col>
      </b-col>      
    </b-row>

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'daily-report',
  components: {
  },
  props: {
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        ewstClassCd: '',
        searchYm: ''
      },
      gridOptions: {
        amtGen: {
          header: [],
          data: [],
          height: 300
        },
        selfDispo: {
          header: [],
          data: [],
          height: 300
        },
        consignDispo: {
          header: [],
          data: [],
          height: 300
        }
      },
      ewstClassCdItems: [],
      searchUrl: {
        amtGen: '',
        selfDispo: '',
        consignDispo: ''
      }
    };
  },
  computed: {
  },
  watch: {
  },
  beforeCreate () {      
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init(); 
  },
  mounted () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  methods: {
    init () {
      this.searchParam.searchYm = this.$comm.moment().format('YYYY-MM-DD');
      // 선택항목 설정
      setTimeout(() => {
        this.searchParam.searchYm = this.$comm.moment().format('YYYY-MM-DD');
        this.getEwstClassCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.amtGen.header = [
        { text: '연월일', name: 'reqYmd', width: '120px', align: 'center' },
        { text: '성질상태', name: 'ewstPhaseNm', width: '100px', align: 'center' },
        { text: '폐기물', name: 'ewstWasteNm', width: '160px', align: 'center' },
        { text: '요청부서', name: 'reqDeptNm', width: '120px', align: 'center' },
        { text: '발생량', name: 'amtGen', width: '100px', align: 'right' },
        { text: '발생량누계', name: 'amtCumulative', width: '160px', align: 'right' },
      ];

      this.gridOptions.selfDispo.header = [
        { text: '연월일', name: 'dispoYmd', width: '120px', align: 'center' },
        { text: '처리량', name: 'amtGen', width: '100px', align: 'right' },
        { text: '중간처분 또는 재활용', child: [
          { text: '처리방법', name: 'midEwstDispoMtdNm', width: '120px', align: 'center' },
          { text: '처리량', name: 'midAmtGen', width: '100px', align: 'right' },
        ] },
        { text: '최종처분', child: [
          { text: '처리방법', name: 'finalEwstDispoMtdNm', width: '120px', align: 'center' },
          { text: '처리량', name: 'finalAmtGen', width: '100px', align: 'right' },
        ] },
        { text: '처리량누계', name: 'amtCumulative', width: '160px', align: 'right' },
      ];

      this.gridOptions.consignDispo.header = [
        { text: '연월일', name: 'dispoYmd', width: '120px', align: 'center' },
        { text: '처리량', name: 'amtGen', width: '100px', align: 'right' },
        { text: '운반업체', name: 'ewstFreightCoNm', width: '160px', align: 'center' },
        { text: '처리업체', name: 'ewstDispoCoNm', width: '160px', align: 'center' },
        { text: '처리방법', name: 'ewstDispoMtdNm', width: '120px', align: 'center' },
        { text: '처리량누계', name: 'amtCumulative', width: '160px', align: 'right' },
      ];

      this.searchUrl.amtGen = selectConfig.env.waste.operationLog.dailyReport.amgGen.list.url;
      this.searchUrl.selfDispo = selectConfig.env.waste.operationLog.dailyReport.selfDispo.list.url
      this.searchUrl.consignDispo = selectConfig.env.waste.operationLog.dailyReport.consignDispo.list.url
    },

    getList () {      
      // 발생내용 조회
      this.$http.url = this.searchUrl.amtGen;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.amtGen.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });

      // 자가 처리내용 조회
      this.$http.url = this.searchUrl.selfDispo;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.selfDispo.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });

      // 위탁 처리내용 조회
      this.$http.url = this.searchUrl.consignDispo;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.consignDispo.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    }, 

    getEwstClassCdItems () {
      this.$http.url = selectConfig.env.waste.baseInfo.wasteClass.list.url;
      this.$http.type = 'get';      
      this.$http.param = {
        'useYn': 'Y'
      }
      this.$http.request((_result) => {
        this.ewstClassCdItems = _result.data;
        if (this.ewstClassCdItems.length > 0) {
          this.searchParam.ewstClassCd = this.ewstClassCdItems[0].ewstClassCd;
          this.getList();
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    
    btnSearchClicked () {
      this.getList();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
    }
  },
};
</script>