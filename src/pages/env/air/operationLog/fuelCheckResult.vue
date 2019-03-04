<!--
  목적 : 대기 운영일지-연료사용량
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
            label="연료사용량"
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
  name: 'fuel-check-result',
  props: {
    measureEditable: false,
    selectedMeasureYmd: '',
    isSaveFuelCheckResult: false
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

      editUrl: '',
      detailUrl: '',
    };
  },
  watch: {
    isSaveFuelCheckResult: function (newValue, oldValue) {
      if (this.isSaveFuelCheckResult) {
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

      this.gridOptions.header = [
        { text: '연료명', name: 'eairFuelNm', width: '160px', align: 'center', sortable: false },
        { text: '사용량', name: 'numResult', width: '120px', align: 'center', type: 'number', pointNumber: 2, sortable: false },
        { text: '단위', name: 'envUnitNm', width: '120px', align: 'center', sortable: false },
      ];
      
      this.editUrl = transactionConfig.env.air.operationLog.fuelCheckResult.edit.url;
      this.detailUrl = selectConfig.env.air.operationLog.fuelCheckResult.get.url;
      
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
        if (item.numResult == null || item.numResult === '') {
          valid = false;
        }
      });

      if (!valid) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '연료사용량 정보가 없습니다.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSaveFuelCheckResult) this.isUpdateSubmit = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '연료사용량 정보를 저장 하시겠습니까?',
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
      if (this.isSaveFuelCheckResult) this.$emit('callbackSaveOperationLog', { 'isSaveFuelCheckResult': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '연료사용량 정보를 정상적으로 저장하였습니다.',
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