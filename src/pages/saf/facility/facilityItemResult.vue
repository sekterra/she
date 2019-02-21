<!--
  목적 : 설비점검 관리 - 설비점검결과 - 결과
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
                  label="설비점검결과요약"
                  name="checkResult"
                  v-model="facilityItemResult.checkResult"
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
                    ref="dataTable"
                    :height="gridOptions.height"
                    :headers="gridOptions.header"
                    :items="gridOptions.data"
                    :excel-down="true"
                    :print="true"
                    :useRownum="false"
                    label="설비점검항목별 결과"
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
  name: 'y-facility-item-result',
  props: {
    safFacilityCheckResultNo: 0,
  },
  data: () => ({
    facilityItemResult: {
      safFacilityCheckResultNo: 0,
      // safCheckItemNo: 0,
      checkResult: '',
      remark: '',
    },
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
    'safFacilityCheckResultNo': function (newValue, oldValue) {
      this.facilityItemResult.safFacilityCheckResultNo = this.$_.clone(this.safFacilityCheckResultNo);
      this.getList();
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
      this.searchUrl = selectConfig.saf.facilityItemResult.list.url;      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '점검항목', name: 'safFacilityCheckNm', width: '200px', },
        { text: '점검결과', name: 'checkResult', width: '150px' },
        { text: '비고', name: 'remark', width: '350px', align: 'center' },
      ];
    },
    /** 안전점검결과 목록 조회 **/
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'safCheckRsltNo': this.safCheckRsltNo,
      };
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
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