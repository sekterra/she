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
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              v-if="editable&&measureEditable"
              :action-url="editUrl"
              :param="gridOptions.data"
              :is-submit="isUpdate"
              title="저장"
              color="orange"
              action-type="PUT"
              beforeSubmit = "beforeUpdate"
              @beforeUpdate="beforeUpdate"
              @btnClicked="btnUpdateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table 
            label="공급수 사용량 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="changeSelectedRow"
            >
          </y-data-table>
        </b-col>
        <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3 mt-1">
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
    measureEditable: false,
    isSaveSuplChkResult: false,
  },
  data: () => ({
    totalAmt: '',
    gridOptions: {
      header: [],
      data: [],
      height: 300,
      selectedRowData: {
        meterCntY: null,
        meterCntT: null,
        consumAmt: null
      },
    },
    editable: true,
    isUpdate: false,
    editUrl: '',
    searchUrl: '',
  }),
  watch: {
    'gridOptions.selectedRowData.meterCntT': function (newValue, oldValue) {
      this.gridOptions.selectedRowData.consumAmt = this.getCalc(this.gridOptions.selectedRowData.meterCntY, this.gridOptions.selectedRowData.meterCntT);
      this.totalAmt = 0;
      this.$_.forEach(this.gridOptions.data, (row) => {
        this.totalAmt = parseFloat(this.totalAmt) + ((!row.consumAmt) ? 0 : parseFloat(row.consumAmt));
      });
    },
    isSaveSuplChkResult: function (newValue, oldValue) {
      if (this.isSaveSuplChkResult) {
        this.beforeUpdate();
      }
    }
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

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '공급수분류명', name: 'ewtrSuplClassNm', width: '150px', align: 'left' },
        { text: '공급수명', name: 'ewtrSuplNm', width: '150px', align: 'left' },
        { text: '전일지침(m³)', name: 'meterCntY', width: '100px', align: 'center' },
        { text: '금일지침(m³)', name: 'meterCntT', width: '100px', align: 'center', type: 'number', pointNumber: 2 },
        { text: '사용량(m³/일)', name: 'consumAmt', width: '100px', align: 'center' },
        { text: '검침시간', name: 'chkTime', width: '100px', align: 'center', type: 'text' },
      ];

      this.editUrl = transactionConfig.env.water.operationLog.suplChkResult.edit.url;
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
        _result.data.forEach(item => {
          item.consumAmt = this.getCalc(item.meterCntY, item.meterCntT);
        });
        this.gridOptions.data = _result.data;
        this.totalAmt = 0;
        this.$_.forEach(this.gridOptions.data, (row) => {
          this.totalAmt = parseFloat(this.totalAmt) + ((!row.consumAmt) ? 0 : parseFloat(row.consumAmt));
        });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeUpdate () {
      var flag = false;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSaveSuplChkResult) this.isUpdate = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '공급수 사용량 정보를 저장하시겠습니까?',
              type: 'info',
              confirmCallback: () => {
                this.$_.forEach(this.gridOptions.data, (row) => {
                  if (row.consumAmt < 0) flag = true;
                });
                if (flag === true) {
                  window.getApp.$emit('ALERT', {
                    title: '안내',
                    message: '공급수 사용량이 0보다 작습니다. 다시 입력해 주세요',
                    type: 'warning',
                  });
                } else {
                  this.isUpdate = true;
                }
              },
            });
          }
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    changeSelectedRow (row) {
      this.gridOptions.selectedRowData = row;
      this.gridOptions.selectedRowData.consumAmt = this.getCalc(this.gridOptions.selectedRowData.meterCntY, this.gridOptions.selectedRowData.meterCntT);
      this.totalAmt = 0;
      this.$_.forEach(this.gridOptions.data, (row) => {
        this.totalAmt = parseFloat(this.totalAmt) + ((!row.consumAmt) ? 0 : parseFloat(row.consumAmt));
      });
    },
    getCalc (meterCntY, meterCntT) {
      if (meterCntY != null && meterCntT != null) {
      // 금일검침 - 전일검침
        return (meterCntT - meterCntY).toFixed(2);
      }
      else if (meterCntT != null) {
        return Number(meterCntT).toFixed(2);
      }
      else return '0.00';
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
    btnUpdateClickedCallback (_result) {
      this.isUpdate = false;
      if (this.isSaveSuplChkResult) this.$emit('callbackSaveOperationLog', { 'isSaveSuplChkResult': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '공급수 사용량 정보를 정상적으로 저장하였습니다.',
          type: 'success',
        });
      }
      this.getList();
    },
    btnClickedErrorCallback (_result) {
      this.isUpdate = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>
.container-fluid {
  /* 내부로 들어가므로 padding 제거 */
  padding-right: 0px;
  padding-left: 0px;
}
</style>