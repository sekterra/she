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
    <b-row>
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header">
            <y-label label="검색" />
            <div class="float-right">
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                type="search"
                title="검색"
                size="mini"
                color="success"
                action-type="get"
                @btnClicked="btnSearchCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row>
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
            title="약품 처방 현황 목록"
            ref="dataTable"
            :headers="drugGridHeaderOptions"
            :items="drugGridData"
            :editable="editable"
            :excel-down="true"
            :print="true">
          </y-data-table>
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
      searchParam: {
        heaDrugNo: 0,
        duration: null,
      },
      editable: true,
      searchUrl: '',
      baseWidth: 8,
      drugItems: [],
      drugGridData: [],
      drugGridHeaderOptions: [],
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
    this.getInfirmaryPrescribes();
    this.getDrugItems();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.drugGridHeaderOptions = [
        { text: '처방일자', name: 'visitYmd', width: '15%', align: 'center' },
        { text: '약품', name: 'heaDrugNm', width: '25%', align: 'left' },
        { text: '사용량', name: 'amount', width: '10%', align: 'center' },
        { text: '단위', name: 'unit', width: '8%', align: 'center' },
        { text: '부서', name: 'deptNm', width: '10%', align: 'center' },
        { text: '처방인', name: 'userNm', width: '10%', align: 'center' },
      ];
    },
    /** /초기화 관련 함수 **/
    
    getDrugItems () {
      this.$http.url = selectConfig.drugManage.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaDrugNo': '0', 'heaDrugNm': '전체' });
        this.drugItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },

    // 약품처방 data
    getInfirmaryPrescribes () {
      this.$http.url = selectConfig.infirmaryPrescribe.list.url;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.drugGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },

    /** Button Event **/
    btnClickedErrorCallback (_result) {
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    btnSearchCallback () {
      this.getInfirmaryPrescribes();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    /** /Button Event **/
  }
};
</script>