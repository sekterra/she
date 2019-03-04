<!--
  목적 : 운영일지-전력 사용량
  작성자 : kkc
  Detail : 운영일지-전력 사용량 조회,등록
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
            label="전력 사용량 목록"
            ref="dataTable"
            grid-type="edit"
            :editable="editable"
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
  /* attributes: name, components, props, data */
  name: 'pwrc-chk-result',
  props: {
    paramMeasureYmd: '',
    measureEditable: false,
    isSavePwrcChkResult: false,
  },
  data: () => ({
    gridOptions: {
      header: [],
      data: [],
      height: 300
    },
    editable: true,
    isUpdate: false,
    editUrl: '',
    searchUrl: '',
  }),
  watch: {
    isSavePwrcChkResult: function (newValue, oldValue) {
      if (this.isSavePwrcChkResult) {
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
        { text: '전력사용량계명', name: 'ewtrPwrMeterNm', width: '150px', align: 'left' },
        { text: '가동시간', name: 'runTm', width: '100px', align: 'left', type: 'number', pointNumber: 2 },
        { text: '사용량(kWh)', name: 'pwrConsumAmt', width: '120px', align: 'left', type: 'number', pointNumber: 2 },
        { text: '금일폐수 1m³당 소모전력량(kWh/m³)', name: 'pwrcPerDay', width: '120px', align: 'center' },
        { text: '검침시간', name: 'chkTime', width: '120px', align: 'left', type: 'text' },
        { text: '적산전력계 지침', name: 'pwrMeterCnt', width: '120px', align: 'left', type: 'number', pointNumber: 2 },
        { text: '참고사항', name: 'remark', width: '150px', align: 'left', type: 'text' },
      ];

      this.editUrl = transactionConfig.env.water.operationLog.pwrcChkResult.edit.url;
      this.searchUrl = selectConfig.env.water.operationLog.pwrcChkResult.list.url;

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
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeUpdate () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSavePwrcChkResult) this.isUpdate = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '전력 사용량 정보를 저장하시겠습니까?',
              type: 'info',
              confirmCallback: () => {
                this.isUpdate = true;
              },
            });
          }
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
    btnUpdateClickedCallback (_result) {
      this.isUpdate = false;
      if (this.isSavePwrcChkResult) this.$emit('callbackSaveOperationLog', { 'isSavePwrcChkResult': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '전력 사용량 정보를 정상적으로 저장하였습니다.',
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