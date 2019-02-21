<!--
  목적 : 안전점검 관리 - 안전점검결과 - 결과
  Detail : 안전점검 항목별 점검결과
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
      <b-row>
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="항목별점검결과" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
          <b-card >
            <b-row>
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                <y-textarea
                  :width="10"
                  :maxlength="60"
                  :required="true"
                  ui="bootstrap"
                  label="점검결과요약"
                  name="checkResult"
                  v-model="checkResultDetail.checkResult"
                  v-validate="'required'"
                  :state="validateState('checkResult')"
                />
              </b-col>
            </b-row>
            <!-- 검색 결과 테이블 -->
            <b-row>
              <b-col sm="12">
                <b-col sm="12" class="px-0">
                  <y-data-table 
                    ref="dataItemResultTable"
                    :height="gridOptions.height"
                    :headers="gridOptions.header"
                    :items="gridOptions.data"
                    :excel-down="true"
                    :print="true"
                    label="점검항목별 결과"
                    >
                  </y-data-table>
                </b-col>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-check-item-result',
  props: {
    checkResultDetail: { 
      type: Object,
      default: {
        safCheckRsltNo: 0,
        safCheckKindNo: 0,
        checkResult: '',
        checkItemResults: [],
        // safCheckItemNo: 0,
        // checkResults: [],
        // remarks: [],
      },
    },
  },
  data: () => ({
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    editable: false,
    isInsert: false,
    isEdit: false,
    searchUrl: '',
  }),
  watch: {
    'checkResultDetail.safCheckRsltNo': function (newValue, oldValue) {
      // this.getList();
    },
    'checkResultDetail.safCheckKindNo': function (newValue, oldValue) {
      this.getList();
    },
    'gridOptions.data': {
      handler: function (val, oldVal) {
        this.checkResultDetail.checkItemResults = this.gridOptions.data;
      },
      deep: true
    },
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
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
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.searchUrl = selectConfig.saf.checkItemResult.list.url;      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '점검항목', name: 'safCheckTypeNm', width: '200px', },
        { text: '점검결과', name: 'checkResult', width: '150px', type: 'text' },
        { text: '비고', name: 'remark', width: '350px', align: 'center', type: 'text' },
      ];
    },
    /** 안전점검결과 목록 조회 **/
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'safCheckKindNo': this.checkResultDetail.safCheckKindNo,
      };
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data; // this.$_.clone(_result.data);
        this.checkResultDetail.checkItemResults = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 필수입력값 유효성 검사
     */
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    /** button 관련 이벤트 **/
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>