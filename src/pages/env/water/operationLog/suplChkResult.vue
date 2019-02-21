<!--
  목적 : 운영일지-공급수 사용량
  작성자 : kkc
  Detail : 운영일지-공급수 사용량 조회,등록
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <b-row class="mt-3" ref="insertBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="공급수 사용량" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker 
                :width="8"
                :editable="editable"
                label="측정일"
                name="measureYmd"
                v-model="ewtrSuplChkResult.measureYmd"
                :disabled="true"
                :required="true"
                v-validate="'required'"
                :state="validateState('measureYmd')"
              >
              </y-datepicker>
            </b-col>
          </b-row>

          <b-col sm="12" class="px-0">
            <y-data-table 
              label="공급수 사용량 목록"
              ref="dataTable"
              grid-type="edit"
              :editable="editable"
              :height="gridOptions.height"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              >
            </y-data-table>
          </b-col>
          <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3 mt-3">
              <y-text
              :width="8"
              :editable="editable"
              ui="bootstrap"
              label="총사용량(m³/일)"
              disabled="disabled"
              name="totalAmt"
              v-model="totalAmt"
              >
              </y-text>
            </b-col>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              title="초기화"
              @btnClicked="btnClearClickedCallback" 
            />
            <y-btn
              v-if="editable"
              :action-url="insertUrl"
              :param="ewtrSuplChkResult"
              :is-submit="isInsert"
              title="저장"
              color="orange"
              action-type="POST"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
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
  name: 'supl-chk-result',
  props: {
    paramMeasureYmd: '',
  },
  data: () => ({
    ewtrSuplChkResult: {
      measureYmd: '',
      suplChkResultList: [],
    },
    totalAmt: '',
    gridOptions: {
      header: [],
      data: [],
      height: 300
    },
    editable: true,
    isInsert: false,
    insertUrl: '',
    searchUrl: '',
  }),
  watch: {
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
    /** 초기화 관련 함수 **/
    init () {
      setTimeout(() => {
        this.ewtrSuplChkResult.measureYmd = this.paramMeasureYmd;
      }, 200);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '공급수분류명', name: 'ewtrSuplClassNm', width: '15%', align: 'left' },
        { text: '공급수명', name: 'ewtrSuplNm', width: '15%', align: 'left' },
        { text: '전일지침(m³)', name: 'meterCntY', width: '10%', align: 'center' },
        { text: '금일지침(m³)', name: 'meterCntT', width: '10%', align: 'center', type: 'text' },
        { text: '사용량(m³/일)', name: 'consumAmt', width: '10%', align: 'center' },
        { text: '검침시간', name: 'chkTime', width: '10%', align: 'center', type: 'text' },
      ];

      this.insertUrl = transactionConfig.env.water.operationLog.suplChkResult.insert.url;
      this.searchUrl = selectConfig.env.water.operationLog.suplChkResult.list.url;

      this.getList();
    },

    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'measureYmd': this.paramMeasureYmd
      };
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
        this.totalAmt = 0;
        this.$_.forEach(this.gridOptions.data, (row) => {
          this.totalAmt = parseFloat(this.totalAmt) + ((!row.consumAmt) ? 0 : parseFloat(row.consumAmt));
        });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '등록하시겠습니까?',
            type: 'info',
            confirmCallback: () => {
              this.ewtrSuplChkResult.suplChkResultList = this.gridOptions.data;
              this.isInsert = true;
            },
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
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
    btnInsertClickedCallback (_result) {
      this.isInsert = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
      this.getList();
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.ewtrSuplChkResult, this.$options.data().ewtrSuplChkResult);
      this.$validator.reset();
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>