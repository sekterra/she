<!--
  목적 : 운영일지-약품 사용량
  작성자 : kkc
  Detail : 운영일지-약품 사용량 조회,등록
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
            label="약품 사용량 목록"
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
  name: 'chem-chk-result',
  props: {
    paramMeasureYmd: '',
    measureEditable: false,
    isSaveChemChkResult: false,
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
    initData: [],
    firstFlag: true,
  }),
  watch: {
    isSaveChemChkResult: function (newValue, oldValue) {
      if (this.isSaveChemChkResult) {
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
        { text: '약품명', name: 'ewtrChemNm', width: '15%', align: 'left' },
        { text: '구입량', name: 'buyAmt', width: '10%', align: 'center' },
        { text: '사용량', name: 'consumAmt', width: '10%', align: 'center', type: 'number', pointNumber: 2 },
        { text: '잔고량', name: 'amountCurr', width: '10%', align: 'center' },
      ];

      this.editUrl = transactionConfig.env.water.operationLog.chemChkResult.edit.url;
      this.searchUrl = selectConfig.env.water.operationLog.chemChkResult.list.url;

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
        if (this.firstFlag === true) {
          this.initData = JSON.parse(JSON.stringify(_result.data))
          this.firstFlag = false;
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeUpdate () {
      var flag = false;
      var i = 0;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSaveChemChkResult) this.isUpdate = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '약품 사용량 정보를 저장하시겠습니까?',
              type: 'info',
              confirmCallback: () => {
                for (i = 0; i < this.gridOptions.data.length; i++) {
                  if ((parseFloat(!this.initData[i].amountCurr ? 0 : this.initData[i].amountCurr) + parseFloat(!this.initData[i].consumAmt ? 0 : this.initData[i].consumAmt) - parseFloat(!this.gridOptions.data[i].consumAmt ? 0 : this.gridOptions.data[i].consumAmt)) < 0) flag = true;
                }
                if (flag === true) {
                  window.getApp.$emit('ALERT', {
                    title: '안내',
                    message: '약품 사용량이 잔고량보다 많습니다. 다시 입력해 주세요',
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
      if (this.isSaveChemChkResult) this.$emit('callbackSaveOperationLog', { 'isSaveChemChkResult': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '약품 사용량 정보를 정상적으로 저장하였습니다.',
          type: 'success',
        });
        this.firstFlag = true;
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