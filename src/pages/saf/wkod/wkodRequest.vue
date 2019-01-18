<!--
  목적 : 작업허가서 신청 목록
  Detail : 작업허가서 신청 목록 화면
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
          <div slot="header" >
            <!-- <div class="float-left"> -->
              <y-label label="검색" />
            <!-- </div> -->
            <div class="float-right">
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                type="save"
                title="등록"
                size="mini"
                color="primary"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                type="search"
                title="검색"
                size="mini"
                color="success"
                icon="el-icon-search"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="작업기간"
                name="workYmd"
                v-model="searchParam.workYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboReqDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="신청부서"
                name="reqDeptCd"
                v-model="searchParam.reqDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboWkodKindItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="작업종류"
                name="wkodKindCd"
                v-model="searchParam.wkodKindCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboPubDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="발행부서"
                name="pubDeptCd"
                v-model="searchParam.pubDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboProcessStepItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="진행단계"
                name="processStep"
                v-model="searchParam.processStep"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              ui="bootstrap"
              label="작업NO"
              name="wkodNum"
              v-model="searchParam.wkodNum"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              ui="bootstrap"
              label="작업명"
              name="workTitle"
              v-model="searchParam.workTitle"
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
              :headers="gridHeaderOptions"
              :items="gridData"
              :excel-down="true"
              :print="true"
              :rows="5"
              :cellClick="true"
              label="신청 현황"
              ref="dataTable"
              @selectedRow="selectedRow"
              >
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
  /* attributes: name, components, props, data */
  name: 'wkod-request',
  props: {
  },
  data: () => ({
    searchParam: {
      workYmd: '',
      reqDeptCd: '',
      wkodKindCd: '',
      pubDeptCd: '',
      processStep: '',
      wkodNum: '',
      workTitle: ''
    },
    baseWidth: 9,
    gridData: [],
    gridHeaderOptions: [],
    comboReqDeptItems: [],
    comboWkodKindItems: [],
    comboPubDeptItems: [],
    comboProcessStepItems: [],
    radioItems: null,
    editUrl: '',
    insertUrl: '',
    searchUrl: '',
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    console.log("::::::::::::::::::::: beforeMount ::::::::::::::::::::  ");
    this.init();
    this.getComboItems('WKOD_KIND'); // 작업종류
    this.getComboItems('WKOD_STEP'); // 작업종류
    this.getDeptItems()
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.wkodMaster.list.url;
        // radio 버튼 셋팅
        this.radioItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '진행단계', name: 'wkodMatClassNm', width: '10%', align: 'center' },
        { text: '작업일자', name: 'wkodMatNm', width: '10%', align: 'center' },
        { text: '작업NO', name: 'sortOrder', width: '10%', align: 'center' },
        { text: '작업종류', name: 'useYnNm', width: '10%', align: 'center' },
        { text: '작업명', name: 'useYnNm', width: '30%' },
        { text: '신청부서', name: 'useYnNm', width: '10%', align: 'center' },
        { text: '신청인', name: 'useYnNm', width: '10%', align: 'center' },
        { text: '발행부서', name: 'useYnNm', width: '10%', align: 'center' }
      ];
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        if (codeGroupCd === 'WKOD_KIND')
        {
          this.comboWkodKindItems = this.$_.clone(_result.data);
        }
        else
        {
          this.comboProcessStepItems = this.$_.clone(_result.data);
        }
      }, (_error) => {
        console.log(_error);
      });
    },
    selectedRow (data) {
      if (data === null) return;
      // this.$http.url = this.$format(selectConfig.wkodMatMst.get.url, data.matMstId);
      // this.$http.type = 'GET';
      // this.$http.request((_result) => {
      //   this.editable = true;
      //   Object.assign(this.wkodMatMst, _result.data);
      // }, (_error) => {
      //   console.log(_error);
      // });
    },
    getDeptItems () {
      this.$http.url = selectConfig.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboReqDeptItems = _result.data;
        this.comboPubDeptItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getList () {
      this.$http.url = selectConfig.wkodMatMst.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      // this.$http.request((_result) => {
      //   this.gridData = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      console.log(this.searchParam);
      // this.getList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
