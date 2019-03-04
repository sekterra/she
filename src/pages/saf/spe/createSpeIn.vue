<template>
  <b-container fluid>
     <b-row>
      <!-- 보호구 입고 등록 -->
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="보호구 입고 등록" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
               <y-btn
                v-if="!finishCheck"
                :action-url="finishUrl"
                :param="speIn"
                :is-submit="isFinish"
                title="완료"
                color="black"
                :action-type="finishActionType"
                beforeSubmit = "beforeFinish"
                @beforeFinish="beforeFinish"
                @btnClicked="btnFinishClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="insertCheck"
                :action-url="insertUrl"
                :param="speIn"
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
                v-if="editCheck"
                :action-url="editUrl"
                :param="speIn"
                :is-submit="isEdit"
                title="저장"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editCheck"
                :action-url="deleteUrl"
                :param="deleteValue"
                :is-submit="isDelete"
                title="삭제"
                color="red"
                action-type="DELETE"
                beforeSubmit = "beforeDelete"
                @beforeDelete="beforeDelete"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn title="닫기" @btnClicked="btnClosePopup" />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :disabled="finishCheck"
                default="today"
                label="입고일"
                name="inYmd"
                :clearable="true"
                :required="true"
                v-model="speIn.inYmd"
                v-validate="'required'"
                :state="validateState('inYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :disabled="true"
                ui="bootstrap"
                label="등록자"
                name="createUserNm"
                v-model="speIn.createUserNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :disabled="true"
                default="today"
                label="등록일"
                name="createDt"
                :clearable="true"
                v-model="speIn.createDt"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="10"
                :maxlength="50"
                :disabled="finishCheck"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="speIn.remark"
                :rows="2"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 보호구입고 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="입고 목록"
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
                v-if="!finishCheck"
                title="완료"
                color="black"
                beforeSubmit = "beforeFinish"
                @beforeFinish="beforeFinish"
                @btnClicked="btnFinishClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="insertCheck"
                :param="speIn"
                title="저장"
                color="orange"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editCheck"
                :param="speIn"
                title="저장"
                color="orange"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editCheck"
                :param="deleteValue"
                title="삭제"
                color="red"
                beforeSubmit = "beforeDelete"
                @beforeDelete="beforeDelete"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn title="닫기" @btnClicked="btnClosePopup" />
        </div>
      </b-col>
    </b-row>

    <!-- 팝업 설정 -->
    <y-popup :param="popupOptions"></y-popup>
  </b-container> 
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'create-spe-in',
  props: {
    popupParam: {
      type: Object,
      default: {
        safSpeInNo: 0,
        processStepCd: 'STEP1',
        pageNm: '',
      },
    },
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      speIn: {
        inKindCd: '',
        inYmd: null,
        deptCd: '',
        createUserId: '',
        createUserNm: '',
        createDt: '',
        remark: '',
        processStepCd: '',
        speInDetails: [],
      },
      baseWidth: 8,
      editable: true,
      insertMode: false,
      updateMode: false,
      comboGiveKindCds: [], // 지급구분
      comboDeptItems: [], // 수령부서
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      finishActionType: 'POST',
      finishUrl: '',
      isInsert: false, 
      isEdit: false,
      isFinish: false,
      isDelete: false,  
      deleteValue: null,
      insertCheck: false,
      editCheck: false,
      finishCheck: false,
      returnCheck: false,
      deleteCheck: false,
      inNumCnt: 0,
    };
  },
  watch: {
    'gridOptions.data': {
      handler: function (newValue, oldValue) {
        this.speIn.speInDetails = [];
        this.$_.forEach(this.gridOptions.data, (item) => {
          if (!isNaN(item.inNum) && parseInt(item.inNum, 10) > 0) this.speIn.speInDetails.push(item);
        });
      },
      deep: true
    },
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestroy () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.saf.speInDtl.list.url;
      this.editUrl = transactionConfig.saf.speIn.edit.url;
      this.insertUrl = transactionConfig.saf.speIn.insert.url;
      this.deleteUrl = transactionConfig.saf.speIn.delete.url;

      // 사용자 정보 setting
      this.speIn.createUserId = 'dev'
      this.speIn.createUserNm = '개발자';
      this.speIn.createDt = this.$comm.getToday();

      // 수정 또는 신규등록 버튼 Mode
      this.speIn.safSpeInNo = this.popupParam.safSpeInNo;
      this.speIn.processStepCd = this.popupParam.processStepCd;
      if (this.popupParam.safSpeInNo !== 0) {
        this.getSpeIn();  // 보호구 입고 상세
        if (this.speIn.processStepCd !== 'STEP2') {
          this.editCheck = true;
          this.finishCheck = false;
        } else {
          this.finishCheck = true;
          this.gridOptions.header.splice(2, 0, { text: '입고개수', name: 'inNum', width: '100px', align: 'center' });
          this.gridOptions.header.splice(4, 0, { text: '비고', name: 'remark', width: '200px', align: 'center' });
        }
      } else {
        this.finishCheck = false;
        this.insertCheck = true;
      }

      this.getGiveKindCds();  // 지급구분
      this.getDeptItems();  // 수령부서

      setTimeout(() => {
        this.getDataList();  // 입고현황 grid
      }, 200);

      this.gridOptions.header = [
        { text: '보호구종류', name: 'speKindNm', width: '130px', align: 'center' },
        { text: '보호구명', name: 'speNm', width: '200px', align: 'left' },
        { text: '단위', name: 'giveUnitNm', width: '90px', align: 'center' },
      ];
      // 보호구 입고 grid 헤더 설정
      if (this.finishCheck) {
        this.gridOptions.header.splice(2, 0, { text: '입고개수', name: 'inNum', width: '100px', align: 'center' });
        this.gridOptions.header.splice(4, 0, { text: '비고', name: 'remark', width: '200px', align: 'center' });
      }
      else {
        this.gridOptions.header.splice(2, 0, { text: '입고개수', name: 'inNum', width: '100px', align: 'center', type: 'text' });
        this.gridOptions.header.splice(4, 0, { text: '비고', name: 'remark', width: '200px', align: 'center', type: 'text' });
      }
    },
    
    // 지급구분
    getGiveKindCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_GIVE_KIND');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.comboGiveKindCds = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 입고 상세
    getSpeIn () {
      if (!this.popupParam.safSpeInNo) return;
      this.$http.url = this.$format(selectConfig.saf.speInList.get.url, this.popupParam.safSpeInNo);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.speIn = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 입고 상세 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        safSpeInNo: this.popupParam.safSpeInNo
      };
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** /Call API service **/
    
    /** Vue lifecycle: created, mounted, destroyed, etc **/
    beforeInsert () {
      this.$_.forEach(this.speIn.speInDetails, (item) => {
        if (isNaN(item.inNum) || parseInt(item.inNum, 10) <= 0) {
          this.inNumCnt++;
        }
      });
      if (this.inNumCnt === this.speIn.speInDetails.length) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '적어도 하나의 입고 상품 갯수를 입력해야 합니다.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.speIn.processStepCd = 'STEP1';
              this.checkValidationInsert();
            },
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
    beforeEdit () {
      this.$_.forEach(this.speIn.speInDetails, (item) => {
        if (isNaN(item.inNum) || parseInt(item.inNum, 10) <= 0) {
          this.inNumCnt++;
        }
      });
      if (this.inNumCnt === this.speIn.speInDetails.length) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '적어도 하나의 입고 상품 갯수를 입력해야 합니다.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              this.speIn.speInDetails = this.gridOptions.data;
              this.checkValidationEdit();
            },
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
      this.$_.forEach(this.speIn.speInDetails, (item) => {
        if (isNaN(item.inNum) || parseInt(item.inNum, 10) <= 0) {
          this.inNumCnt++;
        }
      });
      if (this.inNumCnt === this.speIn.speInDetails.length) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '적어도 하나의 입고 상품 갯수를 입력해야 합니다.',
          type: 'warning',
        });
        return;
      }

      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '완료하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              this.speIn.speInDetails = this.gridOptions.data;
              if (this.speIn.safSpeInNo === 0) {
                this.finishActionType = "POST";
                this.finishUrl = transactionConfig.saf.speIn.insert.url;
              } else {
                this.finishActionType = "PUT";
                this.finishUrl = transactionConfig.saf.speIn.edit.url;
              }
              this.speIn.processStepCd = 'STEP2';
              this.isFinish = true;
              // this.checkValidationFinish();
            },
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
    beforeDelete () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',  
        confirmCallback: () => {
          this.deleteValue = {
            'data': this.speIn.safSpeInNo
          };
          this.isDelete = true;
        }
      });
    },
    /** validation checking(필요없으면 지워주세요) **/
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    
    /** /validation checking **/
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    checkValidationEdit () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    checkValidationReturn () {
      this.$validator.validateAll().then((_result) => {
        this.isReturn = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isReturn) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isReturn = false;
      });
    },
    checkValidationFinish () {
      this.$validator.validateAll().then((_result) => {
        this.isFinish = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isFinish) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isFinish = false;
      });
    },

    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.speIn, this.$options.data().speIn);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.safSpeInNo = _result.data;
      this.isInsert = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
    },
    // 수정
    btnEditClickedCallback (_result) {
      this.isEdit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
    },
    btnFinishClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '완료되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.btnClosePopup();
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      this.getDataList();
      this.isDelete = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.isFinish = false;
      this.isDelete = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>