<!--
  목적 : 건강관리실 - 이력검색 - 방문이력(탭)
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
            <div class="float-left">
              <y-label label="검색" />
            </div>
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
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboDeptItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                label="부서"
                name="deptCd"
                v-model="searchParam.deptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="edit"
                label="사용자"
                name="userNm"
                v-model="searchParam.userNm"
              >
              </y-text>
            </b-col>
          </b-row>
      </b-card>
    </b-col>
  </b-row>

  <!-- 검색 결과 테이블 -->
  <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table
            label="방문이력 목록"
            title="방문이력 목록"
            ref="dataTable"
            :headers="gridHeaderOptions"
            :items="gridData"
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
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'infirmary-usage-history',
  props: {
  },
  data () {
    return {
      searchParam: {
        deptCd: '',
        userNm: '',
      },
      baseWidth: 8,
      editable: true,
      isSubmit: false,
      comboDeptItems: [],
      searchUrl: '',
      gridData: [],
      gridHeaderOptions: [],
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
    this.getDataList();
    this.getDeptItems();
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
      this.gridHeaderOptions = [
        { text: '사용자Id', name: 'userId', width: '10%', align: 'center' },
        { text: '사용자명', name: 'userNm', width: '10%', align: 'center' },
        { text: '부서', name: 'deptNm', width: '10%', align: 'center' },
        { text: '방문일', name: 'visitYmd', width: '10%', align: 'center' },
        { text: '진료내역', name: 'heaTreatCd', width: '15%', align: 'left' },
        { text: '주호소 및 증상', name: 'symptom', width: '15%', align: 'left' },
        { text: '간호 및 상담내용', name: 'consult', width: '20%', align: 'left' },
        { text: '특이사항', name: 'remark', width: '20%', align: 'left' },
      ];
    },
    getDeptItems () {
      setTimeout(() => {
        this.comboDeptItems = [
          { code: '', codeNm: '전체' },
          { code: '1', codeNm: '부서' },
        ];
      }, 2000);
    },
    /** /초기화 관련 함수 **/
    
    getDataList () {
      this.$http.url = selectConfig.infirmaryUsageHistory.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        //  console.log(JSON.parse(JSON.stringify(_result.data)));
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },

    /** Button Event **/
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    btnSearchCallback () {
      this.getDataList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    /** /Button Event **/
  }
};
</script>