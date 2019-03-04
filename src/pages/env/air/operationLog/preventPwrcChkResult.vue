<!--
  목적 : 대기 운영일지-전력사용량
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
            label="전력사용량"
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
    isSavePreventPwrcChkResult: false
  },
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: '300',
        selectedRowData: {
          pwrMeterCntPrev: null,
          pwrMeterCnt: null,
          pwrConsumAmt: null
        },
      },
      editable: true,
      isUpdateSubmit: false,

      envUnitCdItems: [],

      editUrl: '',
      detailUrl: '',
    };
  },
  watch: {
    'gridOptions.selectedRowData.pwrMeterCnt': function (newValue, oldValue) {
      this.gridOptions.selectedRowData.pwrConsumAmt = this.getCalc(this.gridOptions.selectedRowData.pwrMeterCnt, this.gridOptions.selectedRowData.pwrMeterCntPrev);
    },
    isSavePreventPwrcChkResult: function (newValue, oldValue) {
      if (this.isSavePreventPwrcChkResult) {
        this.beforeUpdateSubmit();
      }
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
        this.getEnvUnitCdItems();
      }, 200);
      
      this.editUrl = transactionConfig.env.air.operationLog.prevnetFacPwrcChkResult.edit.url;
      this.detailUrl = selectConfig.env.air.operationLog.prevnetFacPwrcChkResult.get.url;
    },
    initGrid () {
      this.gridOptions.header = [
        { text: '방지시설', name: 'eairPreventFacNm', width: '160px', align: 'center', sortable: false },
        { text: '전력량계 지침', sortable: false, child: 
          [
            { text: '전일', name: 'pwrMeterCntPrev', width: '120px', align: 'center', sortable: false },
            { text: '금일', name: 'pwrMeterCnt', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false }
          ]
        },
        { text: '사용량(kW/h)', name: 'pwrConsumAmt', width: '120px', align: 'right', sortable: false },
        { text: '약품명1', name: 'chemNm1', width: '120px', align: 'center', type: 'text', sortable: false },
        { text: '사용량1', name: 'consumAmt1', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '단위1', name: 'unitNm1', width: '120px', align: 'center', type: 'select', items: this.envUnitCdItems, itemText: 'codeNm', itemValue: 'codeNm', sortable: false },
        { text: '약품명2', name: 'chemNm2', width: '120px', align: 'center', type: 'text', sortable: false },
        { text: '사용량2', name: 'consumAmt2', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '단위2', name: 'unitNm2', width: '120px', align: 'center', type: 'select', items: this.envUnitCdItems, itemText: 'codeNm', itemValue: 'codeNm', sortable: false },
        { text: '약품명3', name: 'chemNm3', width: '120px', align: 'center', type: 'text', sortable: false },
        { text: '사용량3', name: 'consumAmt3', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '단위3', name: 'unitNm3', width: '120px', align: 'center', type: 'select', items: this.envUnitCdItems, itemText: 'codeNm', itemValue: 'codeNm', sortable: false },
      ];

      this.getList();
    },

    getList () {
      this.$http.url = this.$format(this.detailUrl, this.selectedMeasureYmd);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.forEach(item => {
          item.pwrConsumAmt = this.getCalc(item.pwrMeterCnt, item.pwrMeterCntPrev);
        });
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEnvUnitCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'ENV_UNIT');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.envUnitCdItems = _result.data;
        this.initGrid();
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    changeSelectedRow (row) {
      this.gridOptions.selectedRowData = row;
      this.gridOptions.selectedRowData.pwrConsumAmt = this.getCalc(this.gridOptions.selectedRowData.pwrMeterCnt, this.gridOptions.selectedRowData.pwrMeterCntPrev);
    },
    getCalc (pwrMeterCnt, pwrMeterCntPrev) {
      if (pwrMeterCnt != null && pwrMeterCntPrev != null) {
      // 금일검침 - 전일검침
        return (pwrMeterCnt - pwrMeterCntPrev).toFixed(2);
      }
      else if (pwrMeterCnt != null) {
        return Number(pwrMeterCnt).toFixed(2);
      }
      else return '0.00';
    },

    beforeUpdateSubmit () {
      var valid = true;
      if (this.gridOptions.data.length === 0) valid = false;
      this.gridOptions.data.forEach(item => {
        if (item.pwrMeterCnt == null || item.pwrConsumAmt == null || item.pwrMeterCnt === '' || item.pwrConsumAmt === '' || item.pwrConsumAmt < 0) {
          valid = false;
        }
      });

      if (!valid) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '방지시설 정보가 없거나 전력량계 지침(금일) 또는 사용량 정보는 음수일 수 없습니다.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSavePreventPwrcChkResult) this.isUpdateSubmit = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '전력사용량 정보를 저장 하시겠습니까?',
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
      if (this.isSavePreventPwrcChkResult) this.$emit('callbackSaveOperationLog', { 'isSavePreventPwrcChkResult': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '전력사용량 정보를 정상적으로 저장하였습니다.',
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