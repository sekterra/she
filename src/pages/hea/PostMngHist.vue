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
        <b-card>
          <div slot="header">
            <strong>검색 </strong> 
          </div>
          <b-row>
            <b-col sm="6">
              <y-durationpicker
                :editable="editable"
                label="기간"
                name="duration"
                default-type="today"
                v-validate="'required'"
                v-model="demo.duration"
                data-vv-name="duration"
                :error-msg="errors.first('duration')"
                >
              </y-durationpicker>
            </b-col>
          </b-row>
          <div slot="footer">
            <div class="text-right">
              <y-btn
                :action-url="saveUrl"
                :param="searchParam"
                type="search"
                title="검색"
                action-type="get"
                @btnClicked="btnSearchCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- 사후관리 이력 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <y-data-table 
          :headers="postMngHistGridHeaderOptions"
          :items="postMngHistGridData"
          :editable="editable"
          :excel-down="true"
          :print="true"
          title="사후관리 이력"
          ref="dataTable"
          >
        </y-data-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-postMngHist',
  props: {
  },
  data: () => ({
    demo: {
      duration: null,
      examPk: null,
    },
    postMngHistGridData: [],
    postMngHistGridHeaderOptions: [],
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
      this.postMngHistGridHeaderOptions = [
        { text: 'NO', name: 'no', width: '40%', align: 'center' },
        { text: '검진년도', name: 'year', width: '40%', align: 'center' },
        { text: '검진종류', name: 'exam_type', width: '40%', align: 'center' },
        { text: '부서', name: 'dept', width: '40%', align: 'center' },
        { text: '검진일자', name: 'exam_dt', width: '30%', align: 'center' },
        { text: '검진병원', name: 'exam_organ', width: '15%', align: 'center' },
        { text: '판정', name: 'exam_judge', width: '40%', align: 'center' },
        { text: '사후관리소견', name: 'post_mng_opinion', width: '30%', align: 'center' },
        { text: '질환명', name: 'disease_nm', width: '15%', align: 'center' }
      ];
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.postMngHistGridData = [
          { no: '2', year: '2017', exam_type: '종합검진', dept: '경영기획팀', exam_dt: '2017-10-15', exam_organ: '서울대병원', exam_judge: 'D2', post_mng_opinion: '근무중치료', disease_nm: '간염증상' },
          { no: '1', year: '2016', exam_type: '종합검진', dept: '수행1팀', exam_dt: '2016-08-15', exam_organ: '서울대병원', exam_judge: 'D2', post_mng_opinion: '근무중치료', disease_nm: '간염증상' }
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