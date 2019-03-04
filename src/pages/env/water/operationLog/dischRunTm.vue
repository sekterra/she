<!--
  목적 : 운영일지-배출시설 가동시간
  작성자 : kkc
  Detail : 운영일지-배출시설 가동시간 조회,등록
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
            label="배출시설 가동시간 목록"
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
  name: 'disch-run-tm',
  props: {
    paramMeasureYmd: '',
    measureEditable: false,
    isSaveDischRunTm: false,
  },
  data: () => ({
    gridOptions: {
      header: [],
      data: [],
      height: 300,
    },
    editable: true,
    isUpdate: false,
    editUrl: '',
    searchUrl: '',
  }),
  watch: {
    isSaveDischRunTm: function (newValue, oldValue) {
      if (this.isSaveDischRunTm) {
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
        { text: '폐수배출시설명', name: 'ewtrWasteDischFacNm', width: '180px', align: 'left' },
        { text: '00시', name: 'h00Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '01시', name: 'h01Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '02시', name: 'h02Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '03시', name: 'h03Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '04시', name: 'h04Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '05시', name: 'h05Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '06시', name: 'h06Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '07시', name: 'h07Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '08시', name: 'h08Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '09시', name: 'h09Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '10시', name: 'h10Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '11시', name: 'h11Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '12시', name: 'h12Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '13시', name: 'h13Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '14시', name: 'h14Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '15시', name: 'h15Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '16시', name: 'h16Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '17시', name: 'h17Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '18시', name: 'h18Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '19시', name: 'h19Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '20시', name: 'h20Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '21시', name: 'h21Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '22시', name: 'h22Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
        { text: '23시', name: 'h23Yn', width: '80px', align: 'center', type: 'singlecheckbox' },
      ];

      this.editUrl = transactionConfig.env.water.operationLog.dischRunTm.edit.url;
      this.searchUrl = selectConfig.env.water.operationLog.dischRunTm.list.url;

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
          if (this.isSaveDischRunTm) this.isUpdate = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '배출시설 가동시간 정보를 저장하시겠습니까?',
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
      this.getList();
      if (this.isSaveDischRunTm) this.$emit('callbackSaveOperationLog', { 'isSaveDischRunTm': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '배출시설 가동시간 정보를 정상적으로 저장하였습니다.',
          type: 'success',
        });
      }
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