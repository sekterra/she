<!--
  목적 : 컴포넌트
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
                  :action-url="saveUrl"
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
                v-model="checkupHistory.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="examItems"
                itemText="examType"
                itemValue="examPk"
                ui="bootstrap"
                type="search"
                label="검진종류"
                name="selectValue"
                v-model="checkupHistory.selectValue"
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
            :headers="healthExamHistGridHeaderOptions"
            :items="healthExamHistGridData"
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
export default {
  /* attributes: name, components, props, data */
  name: 'y-healthExamHist',
  props: {
  },
  data: () => ({
    checkupHistory: {
      period: null,
      examPk: null,
      selectValue: null,
    },
    baseWidth: 8,
    editable: true,
    healthExamHistGridData: [],
    healthExamHistGridHeaderOptions: [],
    examItems: []
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.getDeptItems();
    this.init();
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    /** Call API service **/
    /**
     * 검진 종류를 가져옴
     */
    getDeptItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.examItems = [
          { examPk: '1', examType: '종합검진' },
          { examPk: '2', examType: '일반검진' }
        ];
      }, 3000);
    },
    /** /Call API service **/
    init () {
      // 건강관리실 방문이력 그리드 헤더 설정
      this.healthExamHistGridHeaderOptions = [
        { text: 'NO', name: 'no', width: '15%', align: 'center' },
        { text: '년도', name: 'year', width: '15%', align: 'center' },
        { text: '검진종류', name: 'exam_type', width: '20%', align: 'center' },
        { text: '검진일자', name: 'exam_dt', width: '20%', align: 'center' },
        { text: '검진기관', name: 'exam_organ', width: '20%', align: 'left' },
        { text: '판정', name: 'exam_judge', width: '15%', align: 'center' },
        { text: '사후관리소견', name: 'post_mng_opinion', width: '30%', align: 'left' },
        { text: '질환명', name: 'disease_nm', width: '30%', align: 'left' },
        { text: '업무적합성', name: 'work_suit', width: '30%', align: 'left' }
      ];
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.healthExamHistGridData = [
          { no: '3', year: '2018', exam_type: '종합검진', exam_dt: '2018-04-01', exam_organ: '서울대병원', exam_judge: 'C1', post_mng_opinion: '근무중치료', disease_nm: '고혈압', work_suit: '현재조건작업가능' },
          { no: '2', year: '2018', exam_type: '종합검진', exam_dt: '2018-04-01', exam_organ: '서울대병원', exam_judge: 'C2', post_mng_opinion: '근무중치료', disease_nm: '당뇨', work_suit: '현재조건작업가능' },
          { no: '1', year: '2018', exam_type: '종합검진', exam_dt: '2018-04-01', exam_organ: '서울대병원', exam_judge: 'D1', post_mng_opinion: '근무중치료', disease_nm: '고지혈증', work_suit: '현재조건작업가능' }
        ];
      }, 2000);
    },
    /** button 관련 이벤트 **/
    btnSearchCallback () {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '에러가 발생하였습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>