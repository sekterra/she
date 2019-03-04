<!--
  목적 : 폐기물-폐기물 처리요청 검색
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header" >
              <y-label label="검색" />
            <div class="float-right">
              <y-btn
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked"
              />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="요청일"
                name="reqYmdPeriod"
                v-model="searchParam.reqYmdPeriod"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="ewstDispoStCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="ewstDispoStCd"
                label="처리상태"
                v-model="searchParam.ewstDispoStCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              title="닫기"
              @btnClicked="closePopup" 
            />
          </div>
          <y-data-table 
            ref="dataTable"
            label="폐기물 처리요청 목록"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data" 
            @selectedRow="selectedRow"
            />
          </b-col>
      </b-col>      
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'dispo-request-search',
  props: {
    popupParam: {
      type: Object,
      default: {
        unselectedComplete: false
      },
    },
  },
  data () {
    return {
      searchParam: {
        reqYmdPeriod: '',
        ewstDispoStCd: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: '250'
      },
      ewstDispoStCdItems: [],      
      searchUrl: '',
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
  beforeDestory () {
  },
  methods: {
    init () {
      // 선택항목 설정
      setTimeout(() => {        
        this.getEwstDispoStCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '폐기물분류', name: 'ewstClassNm', width: '160px', align: 'center' },
        { text: '폐기물', name: 'ewstWasteNm', width: '160px' },
        { text: '요청부서', name: 'reqDeptNm', width: '120px', align: 'center' },
        { text: '요청자', name: 'reqUserNm', width: '120px', align: 'center' },
        { text: '처리상태', name: 'ewstDispoStNm', width: '100px', align: 'center' },
        { text: '발생량', name: 'amtGen', width: '100px', align: 'right' },
        { text: '단위', name: 'envUnitNm', width: '120px', align: 'center' },        
        { text: '비고', name: 'remark', width: '350px' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.searchUrl = selectConfig.env.waste.operationLog.disposalRequest.list.url;

      this.getList();
    },
    
    getList () {
      var items = [];
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';      
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        if (this.popupParam.unselectedComplete) {          
          _result.data.forEach(item => {
            if (!(item.ewstDispoStCd === '91')) {
              items.push(item);
            }
          });
        }
        this.gridOptions.data = items;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    getEwstDispoStCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EWST_DISPO_ST');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '전체' });
        this.ewstDispoStCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
        
    btnSearchClicked () {
      this.getList();
    },
    selectedRow (data) {
      this.$emit('closePopup', { 'success': true, 'dispoReq': data });
    },
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
  }
};
</script>