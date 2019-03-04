<!--
  목적 : 수질-약품사용량 현황
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
                :width="8"
                :editable="editable"
                :range="true"
                type="month"
                label="검색기간"
                name="searchPeriod"
                v-model="searchParam.searchPeriod"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">              
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="ewtrChemNoItems"
                itemText="ewtrChemNm"
                itemValue="ewtrChemNo"
                ui="bootstrap"
                name="ewtrChemNo"
                label="약품"
                v-model="searchParam.ewtrChemNo"
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
            label="약품 사용량/구입량 현황"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :mergeColumns="gridOptions.merge"
            />
          </b-col>
      </b-col>      
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'chemical-status',
  components: {
  },
  props: {
  },
  data () {
    return {
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        searchPeriod: [],
        ewtrChemNo: 0
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300,
        merge: []
      },
      editable: true,
      ewtrChemNoItems: [],

      searchUrl: ''
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
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSize);
  },
  destroyed () {
  },
  methods: {
    init () {
      var nowDate = new Date();
      this.searchParam.searchPeriod.push(nowDate.getFullYear() + '-01-01');
      this.searchParam.searchPeriod.push(nowDate.getFullYear() + '-12-31');

      // 선택항목 설정
      setTimeout(() => {
        this.searchParam.searchPeriod = [];
        this.searchParam.searchPeriod.push(nowDate.getFullYear() + '-01-01');
        this.searchParam.searchPeriod.push(nowDate.getFullYear() + '-12-31');

        this.getEwtrChemNoItems();
      }, 200);

      this.searchUrl = selectConfig.env.water.operationLog.chemicalStatus.list.url;

      this.getHeaders();
      this.getList();
      this.setGridSize();
    },
    
    getHeaders () {
      this.gridOptions.merge = [];
      this.gridOptions.merge.push({ colName: 'ewtr_chem_nm' });

      this.gridOptions.header = [];
      this.gridOptions.header.push({ text: '약품명', name: 'ewtr_chem_nm', width: '160px', align: 'center' });

      var from = this.$comm.moment(this.searchParam.searchPeriod[0]);
      var yearText = from.format('YYYY') + '년';
      var header = { text: yearText, align: 'center', child: [] };
      var monText = '';
      var monHeader = {};
      for (; from <= this.$comm.moment(this.searchParam.searchPeriod[1]); from = from.add('months', 1)) {
        if (yearText !== from.format('YYYY') + '년') {
          this.gridOptions.header.push(this.$_.clone(header));
          yearText = from.format('YYYY') + '년';          
          header = { text: yearText, align: 'center', child: [] }; 
        }
        monText = from.format('M') + '월';
        monHeader = { text: monText, align: 'center', child: [] };
        monHeader.child.push({ text: '사용량', name: 'ym' + from.format('YYYYMM'), width: '120px', align: 'right' });
        monHeader.child.push({ text: '구입량', name: 'buy' + from.format('YYYYMM'), width: '120px', align: 'right' });
        header.child.push(monHeader);
      }
      this.gridOptions.header.push(this.$_.clone(header));
      this.gridOptions.header.push({ text: '사용량 합계', name: 'ymtotal', width: '120px', align: 'right' });
      this.gridOptions.header.push({ text: '구입량 합계', name: 'buytotal', width: '120px', align: 'right' });
      this.gridOptions.header.push({ text: '현 재고량', name: 'amount_curr', width: '120px', align: 'right' });
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {        
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    }, 
    getEwtrChemNoItems () {
      this.$http.url = selectConfig.env.water.baseInfo.chemical.list.url;
      this.$http.type = 'get';      
      this.$http.param = {
        'useYn': 'Y'
      }
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'ewtrChemNo': 0, 'ewtrChemNm': '전체' });
        this.ewtrChemNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 245;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    btnSearchClicked () {
      this.getHeaders();
      this.getList();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 2);
      this.setGridSize();
    },
  },
};
</script>