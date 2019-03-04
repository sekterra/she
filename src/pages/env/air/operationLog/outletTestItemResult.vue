<!--
  목적 : 대기 운영일지-배출구별 검사결과
  작성자 : khk
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-label label="계산공식: 배출량계산 팩터 * 가동시간 * 유량 * 측정농도, 저장시 최종 데이터로 자동계산됩니다." />
            <y-btn
              v-if="editable&&measureEditable"
              :action-url="editUrl"
              :param="gridOptions.data"
              :is-submit="isUpdateSubmit"
              title="저장"
              color="orange"
              action-type="put"
              beforeSubmit = "beforeUpdateSubmit"
              @beforeUpdateSubmit="beforeUpdateSubmit"
              @btnClicked="btnUpdateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table 
            ref="dataTable"
            label="배출구별 검사결과"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="changeSelectedRow"
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
  /** attributes: name, components, props, data **/
  name: 'prevent-pwrc-chk-result',
  props: {    
    measureEditable: false,
    selectedMeasureYmd: '',
    isSaveOutletTestItemResult: false,
    isChangeFlowPerDay: false,
  },
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: '300',
        selectedRowData: {
          numResult: null,
          dischAmtPerDay: null,
          flowPerDay: null
        },
      },     

      editable: true,
      isUpdateSubmit: false,

      editUrl: '',
      detailUrl: '',
    };
  },
  watch: {
    'gridOptions.selectedRowData.numResult': function (newValue, oldValue) {
      this.gridOptions.selectedRowData.dischAmtPerDay = this.getCalc(this.gridOptions.selectedRowData.dischAmtCalcFactor, this.gridOptions.selectedRowData.runTm, this.gridOptions.selectedRowData.flowPerDay, this.gridOptions.selectedRowData.numResult);
    },
    isSaveOutletTestItemResult: function (newValue, oldValue) {
      if (this.isSaveOutletTestItemResult) {
        this.beforeUpdateSubmit();
      }
    },
    isChangeFlowPerDay: function (newValue, oldValue) {
      if (newValue) {
        this.getList();
      }
      this.isChangeFlowPerDay = false;
    }
  },
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
  beforeDestory () {
  },
  methods: {
    init () {
      setTimeout(() => {
      }, 200);

      this.gridOptions.header = [
        { text: '배출구', name: 'eairOutletNm', width: '120px', align: 'center', sortable: false },
        { text: '배출량계산 팩터', name: 'dischAmtCalcFactor', width: '120px', align: 'right', sortable: false },
        { text: '검사항목', name: 'eairTestItemNm', width: '120px', align: 'center', sortable: false },
        { text: '측정농도(ppm, mg/S㎥)', name: 'numResult', width: '160px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '일일배출량(kg/day)', name: 'dischAmtPerDay', width: '160px', align: 'right', sortable: false }
      ];
      
      this.editUrl = transactionConfig.env.air.operationLog.outletTestItemResult.edit.url;
      this.detailUrl = selectConfig.env.air.operationLog.outletTestItemResult.get.url;
      
      this.getList();
    },
    getList () {
      var temp = null;
      this.$http.url = this.$format(this.detailUrl, this.selectedMeasureYmd);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    changeSelectedRow (row) {
      this.gridOptions.selectedRowData = row;
      this.gridOptions.selectedRowData.dischAmtPerDay = this.getCalc(this.gridOptions.selectedRowData.dischAmtCalcFactor, this.gridOptions.selectedRowData.runTm, this.gridOptions.selectedRowData.flowPerDay, this.gridOptions.selectedRowData.numResult);
    },
    getCalc (dischAmtCalcFactor, runTm, flowPerDay, numResult) {
      if (flowPerDay != null && numResult != null) {
        return (dischAmtCalcFactor * runTm * flowPerDay * numResult).toFixed(2);
      }
      else return '0.00';
    },

    beforeUpdateSubmit () {
      var valid = true;
      if (this.gridOptions.data.length === 0) valid = false;
      this.gridOptions.data.forEach(item => {
        if (item.numResult == null || item.numResult === '') {
          valid = false;
        }
      });

      if (!valid) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '검사항목 정보가 없거나 측정농도 정보가 없습니다.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSaveOutletTestItemResult) this.isUpdateSubmit = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '배출구별 검사항목 정보를 저장 하시겠습니까?',
              type: 'info',
              confirmCallback: () => {
                this.isUpdateSubmit = true;
              }
            });
          }
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList(); 
      if (this.isSaveOutletTestItemResult) this.$emit('callbackSaveOperationLog', { 'isSaveOutletTestItemResult': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '배출구별 검사항목 정보를 정상적으로 저장하였습니다.',
          type: 'success',
        });
      }
    },
    btnClickedErrorCallback (_result) {
      this.isUpdateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
  }
};
</script>