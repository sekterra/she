<!--
  목적 : 건강관리실 - 관리대상 유소견자 지정(팝업)
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
                :comboItems="processItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                label="공정"
                name="processNo"
                v-model="searchParam.processNo"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="deptItems"
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
                label="사번"
                name="userId"
                v-model="searchParam.userId"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="edit"
                label="성명"
                name="userNm"
                v-model="searchParam.userNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="heaHazardItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                label="유해인자"
                name="heaHazardCd"
                v-model="searchParam.heaHazardCd"
              >
              </y-select>
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
            label="유소견자 지정 목록"
            title="유소견자 지정 목록"
            ref="dataTable"
            :headers="gridHeaderOptions"
            :items="gridData"
            :editable="editable"
            :excel-down="true"
            :print="true">
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
    <div class="float-right mt-3">
      <y-btn
        v-if="editable"
        :action-url="saveUrl"
        :param="param"
        :is-submit="isSubmit"
        type="save"
        title="저장"
        color="primary"
        size="small"
        action-type="PUT"
        beforeSubmit = "beforeSubmit"
        @beforeSubmit="beforeSubmit"
        @btnClicked="btnSaveClickedCallback" 
        @btnClickedErrorCallback="btnClickedErrorCallback"
      />
      <y-btn
        v-if="editable"
        type="search"
        title="목록"
        color="primary"
        size="small"
        @btnClicked="$emit('close')"
      />
    </div>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'suspect-user-popup',
  props: {
  },
  data () {
    return {
      searchParam: {
        processNo: '',
        deptCd: '',
        userId: '',
        userNm: '',
        heaHazardCd: '',
      },
      param: {
      },
      baseWidth: 8,
      editable: true,
      isSubmit: false,
      processItems: [],
      deptItems: [],
      heaHazardItems: [],
      searchUrl: '',
      gridData: [],
      gridHeaderOptions: [],
      saveUrl: '',
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
    this.getItems();
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
        { text: '사번', name: 'userId', width: '10%', align: 'center' },
        { text: '성명', name: 'userNm', width: '10%', align: 'center' },
        { text: '검진일', name: 'heaDrugNm', width: '10%', align: 'left' },
        { text: '관리대상지정일', name: 'c2', width: '10%', align: 'center' },
        { text: '공정', name: 'processNm', width: '10%', align: 'center' },
        { text: '부서', name: 'deptNm', width: '10%', align: 'center' },
        { text: '검진기관', name: 'heaCheckupOrgNm', width: '10%', align: 'center' },
        { text: '판정', name: 'c3', width: '10%', align: 'center' },
        { text: '질환', name: 'c4', width: '10%', align: 'center' },
      ];
    },
    getItems () {
      setTimeout(() => {
        this.processItems = [
          { code: '', codeNm: '전체' },
        ];
        this.deptItems = [
          { code: '', codeNm: '전체' },
        ];
        this.heaHazardItems = [
          { code: '', codeNm: '전체' },
        ];
      }, 2000);
    },
    /** /초기화 관련 함수 **/
    
    getDataList () {
      // this.$http.url = selectConfig.prescribeHistorys.list.url;
      // this.$http.type = 'GET';
      // this.$http.param = this.searchParam;
      // this.$http.request((_result) => {
      //   //  console.log(JSON.parse(JSON.stringify(_result.data)));
      //   this.gridData = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
    },
    
    beforeSubmit () {
      this.isSubmit = true;
      // this.saveUrl = transactionConfig.해당주소.edit.url;
    },

    /** Button Event **/
    btnSaveClickedCallback (_result) {
      // this.테이블데이터호출();
      this.isSubmit = false;
      // this.$emit('APP_REQUEST_SUCCESS', '저장 버튼이 클릭 되었습니다.');
    },
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