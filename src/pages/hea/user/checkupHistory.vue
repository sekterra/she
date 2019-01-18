<!--
  목적 : 보건 홈 - 건강검진 이력
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card">
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
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :range="true"
                label="기간"
                name="period"
                v-model="searchParam.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="heaCheckupClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="건강검진 종류"
                name="heaCheckupClassCd"
                v-model="searchParam.heaCheckupClassCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 건강검진 이력 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="건강검진 이력"
            :headers="checkupHistoryGridHeaderOptions"
            :items="checkupHistoryGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            ref="dataTable"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'y-healthExamHist',
  props: {
  },
  data: () => ({
    searchParam: {
      period: null,
      heaCheckupClassCd: null,
    },
    baseWidth: 8,
    editable: true,
    searchUrl: '',
    heaCheckupClassItems: [],
    checkupHistoryGridData: [],
    checkupHistoryGridHeaderOptions: []
  }),
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.init();
    this.getComboItems('HEA_CHECKUP_CLASS');
    this.getDataList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    /** Call API service **/
    init () {
      // URL Setting
      // this.searchUrl = selectConfig.infirmary.list.url;

      // 건강검진 이력 그리드 헤더 설정
      this.checkupHistoryGridHeaderOptions = [
        { text: 'NO', name: 'rowNum', width: '12%', align: 'center' },
        { text: '건강검진 일자', name: 'heaCheckedYmd', width: '25%', align: 'center' },
        { text: '분류', name: 'heaCheckupClassNm', width: '23%', align: 'center' },
        { text: '건강검진 명칭', name: 'heaCheckupPlanNm', width: '33%', align: 'left' },
        { text: '건강검진 기관', name: 'heaCheckupOrgNm', width: '25%', align: 'left' },
        { text: '사후관리 판정', name: 'heaFollowUpCd', width: '25%', align: 'center' },
        { text: '사후관리 소견', name: 'heaFollowUpRemark', width: '30%', align: 'left' },
        { text: '업무적합 판정', name: 'heaWorkableCd', width: '30%', align: 'left' }
      ];
    },
    // 건강검진 종류
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';

      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_CHECKUP_CLASS') 
        {
          this.heaCheckupClassItems = _result.data;
        }
      }, (_error) => {
        console.log(_error);
      });
    },
    getDataList () {
      this.$http.url = selectConfig.checkupHistory.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.checkupHistoryGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    /** button 관련 이벤트 **/
    btnSearchCallback () {
      this.getDataList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '에러가 발생하였습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>