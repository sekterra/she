<!--
  목적 : 수질-약품 운영현황
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
                label="검색기간"
                name="searchPeriod"
                v-model="searchParam.searchPeriod"
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
            label="자가측정 현황"
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
  name: 'operation-status',
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
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300,
        merge: []
      },
      editable: true,
      searchUrl: '',
      ewtrMonPosNo: 0,
      monPosTestItemList: [],
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
      this.searchParam.searchPeriod.push(nowDate.getFullYear + '-02-01');
      this.searchParam.searchPeriod.push(nowDate.getFullYear() + '-02-28');

      // 선택항목 설정
      setTimeout(() => {
        this.searchParam.searchPeriod = [];
        this.searchParam.searchPeriod.push(nowDate.getFullYear() + '-02-01');
        this.searchParam.searchPeriod.push(nowDate.getFullYear() + '-02-28');
      }, 200);

      this.searchUrl = selectConfig.env.water.operationStatus.list.url;
      
      this.getMonPosTestItemItems();
      setTimeout(() => {
        this.getHeaders();
        this.getList();
        this.setGridSize();
      }, 300);
    },
    getMonPosTestItemItems () {
      this.$http.url = selectConfig.env.water.baseInfo.monPosTestItem.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'ewtrMonPosNo': this.ewtrMonPosNo
      };
      this.$http.request((_result) => {
        this.monPosTestItemList = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    
    getHeaders () {
      this.ewtrMonPosNo = 0;

      this.gridOptions.header = [];
      this.gridOptions.header.push({ text: '측정일', name: 'ymd', width: '160px', align: 'center' });

      var monPosTestItem = this.monPosTestItemList;
      var i = 0;
      var header = {};
      for (i = 0; i < monPosTestItem.length; i++) {
        header = { text: monPosTestItem[i].ewtrMonPosNm + '(' + monPosTestItem[i].ewtrTestItemNm + ')', name: 'val' + monPosTestItem[i].ewtrMonPosNo + 'n' + monPosTestItem[i].ewtrTestItemCd, width: '120px', align: 'center' };
        this.gridOptions.header.push(this.$_.clone(header));
      }

    },
    getList () {

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