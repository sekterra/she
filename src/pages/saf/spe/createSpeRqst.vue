<!--
  목적 : 안전보호구 > 보호구 신청 > 신규등록/수정 팝업
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <!-- 보호구 신청 등록 -->
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="보호구 신청" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                v-if="editable"
                :action-url="insertUrl"
                :param="speRqst"
                :is-submit="isFinish"
                title="완료"
                color="black"
                action-type="POST"
                beforeSubmit = "beforeFinish"
                @beforeFinish="beforeFinish"
                @btnClicked="btnFinishClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="this.speRqst.processStepCd !== 'STEP2'"
                :action-url="insertUrl"
                :param="speRqst"
                :is-submit="isInsert"
                title="저장"
                color="orange"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="this.speRqst.processStepCd !== 'STEP2'
                  && this.speRqst.safSpeRqstNo > 0"
                title="삭제"
                color="red"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="btnClosePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :disabled="true"
                default="today"
                label="신청일"
                name="rqstYmd"
                :clearable="true"
                v-model="speRqst.rqstYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :disabled="true"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="신청부서"
                name="rqstDeptCd"
                v-model="speRqst.rqstDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :disabled="true"
                ui="bootstrap"
                label="신청자"
                name="rqstUserNm"
                v-model="speRqst.rqstUserNm"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="100"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="speRqst.remark"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 설비 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="보호구 신청 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :rows="3"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            >
          </y-data-table>
        </b-col>
        <div class="float-right mt-3">
          <y-btn
            v-if="editable"
            title="완료"
            color="black"
            action-type="POST"
            beforeSubmit = "beforeFinish"
            @beforeFinish="beforeFinish"
            @btnClicked="btnFinishClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            v-if="this.speRqst.processStepCd !== 'STEP2'"
            title="저장"
            color="orange"
            @btnClicked="beforeInsert" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn 
            v-if="this.speRqst.processStepCd !== 'STEP2'
              && this.speRqst.safSpeRqstNo > 0"
            title="삭제"
            color="red"
            @btnClicked="btnDeleteClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            title="닫기"
            @btnClicked="btnClosePopup" 
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  name: 'create-spe-rqst',
  props: {
    popupParam: {
      type: Object,
      default: {
        safSpeRqstNo: 0,
        processStepCd: 'STEP1',
      },
    },
  },
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      speRqst: {
        safSpeRqstNo: 0,
        rqstYmd: null,
        rqstDeptCd: '',
        rqstUserNm: '',
        remark: '',
        speRequestDetails: [],
        processStepCd: ''
      },
      baseWidth: 8,
      editable: true,
      comboDeptItems: [], // 관리부서
      searchUrl: '',
      insertUrl: '',
      isInsert: false, 
      isFinish: false,
    };
  },
  watch: {
    'gridOptions.data': {
      handler: function (newValue, oldValue) {
        this.speRqst.speRequestDetails = [];
        this.$_.forEach(this.gridOptions.data, (item) => {
          if (!isNaN(item.rqstNum) && parseInt(item.rqstNum, 10) > 0) this.speRqst.speRequestDetails.push(item);
        });
      },
      deep: true
    },
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  /** methods **/
  methods: {
    init () {
      // 사용자 정보 setting
      this.speRqst.rqstUserNm = '개발자';
      this.speRqst.rqstDeptCd = 'yullin';

      // URL 셋팅
      this.searchUrl = selectConfig.saf.speRqstDtl.list.url;
      this.insertUrl = transactionConfig.saf.speRqst.insert.url;
      this.deleteUrl = transactionConfig.saf.speRqst.delete.url;

      this.getDeptItems();  // 관리부서
      this.getSpeRqst();  // 보호구 신청 상세
      this.getDataList();

      // 완료 또는 저장 버튼 Mode
      this.speRqst.safSpeRqstNo = this.popupParam.safSpeRqstNo;
      this.speRqst.processStepCd = this.popupParam.processStepCd;
      if (this.popupParam.safSpeRqstNo !== 0 && this.speRqst.processStepCd === 'STEP2') {
        this.editable = false;
      } else {
        this.editable = true;
      }

      // 보호구 신청 grid 헤더 설정
      this.gridOptions.header = [
        { text: '보호구종류', name: 'speKindNm', width: '130px', align: 'center' },
        { text: '보호구명', name: 'speNm', width: '200px', align: 'left' },
      ];

      if (this.editable)
      {
        this.gridOptions.header.splice(3, 0, { text: '신청개수', name: 'rqstNum', width: '100px', align: 'center', type: 'number' });
        this.gridOptions.header.splice(4, 0, { text: '단위', name: 'giveUnitNm', width: '90px', align: 'center' });
        this.gridOptions.header.splice(5, 0, { text: '비고', name: 'remark', width: '200px', align: 'center', type: 'text' });
      }
      else
      {
        this.gridOptions.header.splice(3, 0, { text: '신청개수', name: 'rqstNum', width: '100px', align: 'center' });
        this.gridOptions.header.splice(4, 0, { text: '단위', name: 'giveUnitNm', width: '90px', align: 'center' });
        this.gridOptions.header.splice(5, 0, { text: '비고', name: 'remark', width: '200px', align: 'center' });
      }
    },
    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 신청 상세
    getSpeRqst () {
      if (!this.popupParam.safSpeRqstNo) return;
      this.$http.url = this.$format(selectConfig.saf.speRqst.get.url, this.popupParam.safSpeRqstNo);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.speRqst = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 신청 상세 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        safSpeRqstNo: this.popupParam.safSpeRqstNo
      };
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    beforeFinish () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '완료하시겠습니까?',
        type: 'info',
        // 확인 callback 함수
        confirmCallback: () => {
          this.speRqst.processStepCd = 'STEP2';
          this.isFinish = true;
        },
        cancelCallback: () => {
          this.isFinish = false;
        }
      });
    },
    /** Button Event **/
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.speRqst, this.$options.data().speRqst);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 저장
    btnInsertClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
      this.isInsert = false;
    },
    // 완료
    btnFinishClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '완료되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
      this.isFinish = false;
      this.editable = false;
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',
        // 확인 callback 함수
        confirmCallback: () => {
          this.$http.url = this.$format(transactionConfig.saf.speRqst.delete.url, this.speRqst.safSpeRqstNo);
          this.$http.type = 'DELETE';
          this.$http.request((_result) => {
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '삭제되었습니다.',
              type: 'success',
            });
            this.btnClosePopup();
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', _error);
          });
        },
        // 취소 callback 함수
        cancelCallback: () => {
        }
      });
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isFinish = false;
      this.editable = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
  }
};
</script>