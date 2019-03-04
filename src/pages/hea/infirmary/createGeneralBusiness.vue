<!--
  목적 : 건강관리실 - 건강관리실 일반업무
  작성자 : kckim
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="일반업무 등록" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                title="닫기"
                @btnClicked="closePopupUsage" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker 
                :width="baseWidth"
                :editable="editable"
                label="방문일"
                name="visitYmd"
                v-model="infirmaryUsage.visitYmd"
                default="today"
                :end="today"
                :required="true"
                v-validate="'required'"
                :error-msg="errors.first('visitYmd')"
                :state="validateState('visitYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :clearable="true"
                ui="bootstrap"
                name="userNm"
                label="방문자"
                disabled="disabled"
                v-model="infirmaryUsage.userNm"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
                :required="true"
                v-validate="'required'"
                :state="validateState('userNm')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="heaTreatCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                label="진료내역"
                name="heaTreatCd"
                v-model="infirmaryUsage.heaTreatCd"
              >
              </y-select>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="600"
                ui="bootstrap"
                label="주호소 및 증상"
                name="symptom"
                v-model="infirmaryUsage.symptom"
                :rows="2"
              >
              </y-textarea>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="600"
                ui="bootstrap"
                label="간호 및 상담내용"
                name="consult"
                v-model="infirmaryUsage.consult"
                :rows="2"
              >
              </y-textarea>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="특이사항"
                name="remark"
                v-model="infirmaryUsage.remark"
                :rows="2"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="mt-2">
          <b-col sm="12">
            <y-label label="약품 처방" icon="user-edit" color-class="cutstom-title-color"/>
          </b-col>
        </b-row>
        <b-col sm="12" class="px-0">
          <y-data-table 
            title="약품 처방"
            ref="dataTable"
            grid-type="edit"
            :headers="drugGridHeaderOptions"
            :items="drugGridData"
            :rows="5"
            :editable="editable"
            :excel-down="true"
            :print="true">
          </y-data-table>
        </b-col>
        <div class="float-right mt-3">
          <y-btn
            v-if="editable"
            title="초기화"
            @btnClicked="btnClearClickedCallback" 
          />
          <y-btn
            v-if="editable&&insertMode"
            :action-url="insertUrl"
            :param="infirmaryUsage"
            :is-submit="isInsertSubmit"
            title="신규등록"
            color="orange"
            action-type="POST"
            beforeSubmit = "beforeInsert"
            @beforeInsert="beforeInsert"
            @btnClicked="btnInsertClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            v-if="editable&&updateMode"
            :action-url="editUrl"
            :param="infirmaryUsage"
            :is-submit="isEditSubmit"
            title="수정"
            color="orange"
            action-type="PUT"
            beforeSubmit = "beforeEdit"
            @beforeEdit="beforeEdit"
            @btnClicked="btnEditClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
        </div>
      </b-col>
    </b-row>
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'create-general-business',
  props: {
    popupParam: {
      type: Object,
      default: {
        heaInfirmaryUsageNo: 0,
        pageNm: '',
      },
    },
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      infirmaryUsage: {
        heaInfirmaryUsageNo: 0,
        userId: null,
        userNm: '',
        deptCd: '',
        visitYmd: '',
        heaTreatCd: '',
        symptom: '',
        consult: '',
        remark: '',
        createUserId: '',
        creatDt: '',
        updateUserId: '',
        updateDt: '',
        prescribeList: [],
      },
      isInsertSubmit: false, 
      isEditSubmit: false,
      baseWidth: 8,
      editable: true,
      insertMode: false,
      updateMode: false,
      heaTreatCdItems: [],
      drugItems: [],
      drugNo: '',
      drugGridData: [],
      drugGridHeaderOptions: [],
      insertUrl: '',
      editUrl: '',
      comboUserItems: [],
      today: '',
    };
  },
  watch: {
    'infirmaryUsage.visitYmd': function (newValue, oldValue) {
      if (newValue < this.today && this.tempYmd !== newValue && newValue !== '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '과거 날짜를 선택하였습니다.',
          type: 'warning',  // success / info / warning / error
        });
        this.tempYmd = this.today;
      }
    },
    'testItemResult.heaTestItemCd': function (newValue, oldValue) {
      this.getTestItem();
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
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
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.drugGridHeaderOptions = [
        { text: '약품명', name: 'heaDrugNm', width: '15%', align: 'left' },
        { text: '사용량', name: 'amount', width: '10%', align: 'center', type: 'text' },
        { text: '단위', name: 'unit', width: '8%', align: 'center' },
        { text: '현재 재고량', name: 'amountCurr', width: '8%', align: 'center' },
      ];

      // 수정 또는 신규등록 버튼 Mode
      this.infirmaryUsage.heaInfirmaryUsageNo = this.popupParam.heaInfirmaryUsageNo;
      if (this.popupParam.heaInfirmaryUsageNo !== 0) {
        this.getInfirmaryUsage();
        this.updateMode = true;
      } else {
        this.getDrugList();
        this.insertMode = true;
      }
      // 오늘 날짜 구하기
      this.today = this.$comm.getToday();
      
      this.insertUrl = transactionConfig.infirmaryUsage.insert.url;
      this.editUrl = transactionConfig.infirmaryUsage.edit.url;

      this.getHeaTreatCdItems();
      this.getUserItems();
    },
    /** /초기화 관련 함수 **/
    
    getUserItems () {
      this.$http.url = selectConfig.manage.user.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'userId': null, 'userNm': '선택하세요' });
        this.comboUserItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getHeaTreatCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_TREAT');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaTreatCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDrugList () {
      this.$http.url = selectConfig.drugManage.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        useYn: 'Y'
      };
      this.$http.request((_result) => {
        this.drugGridData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getInfirmaryUsage () {
      this.$http.url = this.$format(selectConfig.infirmaryUsage.get.url, this.popupParam.heaInfirmaryUsageNo);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.infirmaryUsage = _result.data;
        this.drugGridData = this.infirmaryUsage.prescribeList;
        
        this.tempYmd = this.infirmaryUsage.visitYmd;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    beforeInsert () {
      if (this.infirmaryUsage.userNm === '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '방문자를 선택해 주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '건강관리실 일반업무 정보를 저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.infirmaryUsage.prescribeList = this.drugGridData;
              this.isInsertSubmit = true;
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
    beforeEdit () {
      if (this.infirmaryUsage.userNm === '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '방문자를 선택해 주세요.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '건강관리실 일반업무 정보를 수정하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.infirmaryUsage.prescribeList = this.drugGridData;
              this.isEditSubmit = true;
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
    /** validation checking **/
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },

    /** Button Event **/
    btnInsertClickedCallback (_result) {
      this.heaInfirmaryUsageNo = _result.data;
      this.isInsertSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '건강관리실 일반업무 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    btnEditClickedCallback (_result) {
      this.isEditSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '건강관리실 일반업무 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      this.isEditSubmit = false;
      this.editable = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      this.closePopupUsage();
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.infirmaryUsage, this.$options.data().infirmaryUsage);
      this.$validator.reset();
      var rowVal = [];
      this.$_.forEach(this.drugGridData, (row) => {
        row.amount = 0;
        rowVal.push(row);
      });
      this.drugGridData = this.$_.clone(rowVal);
    },
    closePopupUsage () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    }, 
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.infirmaryUsage.userNm = data.user.userNm;
        this.infirmaryUsage.userId = data.user.userId;
        this.infirmaryUsage.deptCd = data.user.deptCd;
      }
    },
    /** /Button Event **/
  }
};
</script>