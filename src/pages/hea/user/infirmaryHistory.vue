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
        <b-card header-class="default-card">
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
                v-model="infirmaryHistory.period"
              >
              </y-datepicker>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 건강관리실 방문이력 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="건강관리실 방문이력"
            :headers="healthVisitHistGridHeaderOptions"
            :items="healthVisitHistGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :rows="11"
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
  name: 'y-healthVisitHist',
  props: {
  },
  data: () => ({
    infirmaryHistory: {
      period: null
    },
    baseWidth: 9,
    healthVisitHistGridData: [],
    healthVisitHistGridHeaderOptions: [],
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.init();
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // 건강관리실 방문이력 그리드 헤더 설정
      this.healthVisitHistGridHeaderOptions = [
        { text: 'NO', name: 'no', width: '10%', align: 'center' },
        { text: '방문일', name: 'visit_dt', width: '20%', align: 'center' },
        { text: '진료내용', name: 'treat', width: '40%', align: 'left' },
        { text: '주호소 및 증상', name: 'symptom', width: '40%', align: 'left' },
        { text: '간호 및 상담내용', name: 'counsel', width: '40%', align: 'left' },
        { text: '처방내역', name: 'prescription', width: '40%', align: 'left' }
      ];
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.healthVisitHistGridData = [
          { no: '3', visit_dt: '2017-11-01', treat: '아침 진료', symptom: '눈 건조', counsel: '인공눈물 필요', prescription: '안약 처방' },
          { no: '2', visit_dt: '2017-03-01', treat: '저녁 진료', symptom: '소화불량', counsel: '급체', prescription: '소화제 처방' },
          { no: '1', visit_dt: '2016-06-01', treat: '야간 진료', symptom: '골절', counsel: '물리치료', prescription: '근육이완제 처방' }
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