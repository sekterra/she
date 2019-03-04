<!--
  목적 : 대기 운영일지-배출구별 점검정보
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
            label="배출구별 점검정보"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
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
  name: 'outlet-chk-result-run-tm',
  props: {
    measureEditable: false,
    selectedMeasureYmd: '',
    isSaveOutletChkResultRunTm: false
  },
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      editable: true,
      isUpdateSubmit: false,

      runTmItems: [],

      editUrl: '',
      detailUrl: '',
    };
  },
  watch: {
    isSaveOutletChkResultRunTm: function (newValue, oldValue) {
      if (this.isSaveOutletChkResultRunTm) {
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
      }, 200);

      var i;
      for (i = 1; i <= 24; i++) {
        this.runTmItems.push({ 'code': String(i), 'codeNm': String(i) });
      }

      this.gridOptions.header = [
        { text: '배출구', name: 'eairOutletNm', width: '160px', align: 'center', sortable: false },
        { text: '가스속도(m/s)', name: 'gasSpeed', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '가스온도(℃)', name: 'gasTemp', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: ' 수분함량(%)', name: 'moistureRatio', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '실측산소농도(%)', name: 'oxygenConc', width: '130px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '표준산소농도(%)', name: 'oxygenConcGen', width: '130px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '유량(S㎥/일)', name: 'flowPerDay', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '가동시간', name: 'runTm', width: '120px', align: 'center', type: 'select', items: this.runTmItems, itemText: 'codeNm', itemValue: 'code', sortable: false },
        { text: '정상여부', name: 'normalYn', width: '120px', align: 'center', type: 'switch', selectText: '정상', unselectText: '비정상', sortable: false },
        { text: '비고', name: 'remark', width: '350px', type: 'text', sortable: false }
      ];
      
      this.editUrl = transactionConfig.env.air.operationLog.outletCheckResult.edit.url;
      this.detailUrl = selectConfig.env.air.operationLog.outletCheckResult.get.url;
      
      this.getList();
    },

    getList () {
      this.$http.url = this.$format(this.detailUrl, this.selectedMeasureYmd);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    beforeUpdateSubmit () {
      var valid = true;
      if (this.gridOptions.data.length === 0) valid = false;
      this.gridOptions.data.forEach(item => {
        if (item.flowPerDay == null || item.runTm == null || item.flowPerDay === '' || item.runTm === '') {
          valid = false;
        }
      });

      if (!valid) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '배출구별 점검정보가 없거나 유량 또는 가동시간 정보가 없습니다.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSaveOutletChkResultRunTm) this.isUpdateSubmit = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '배출구별 점검정보를 저장 하시겠습니까?',
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
      if (this.isSaveOutletChkResultRunTm) this.$emit('callbackSaveOperationLog', { 'isSaveOutletChkResultRunTm': true });
      else {
        this.$emit("changeFlowPerDay");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '배출구별 점검정보를 정상적으로 저장하였습니다.',
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