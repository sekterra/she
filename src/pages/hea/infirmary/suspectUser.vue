<!--
  목적 : 건강관리실 - 유소견자 건강상담
  작성자 : kckim
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 관리대상 유소견자 목록 -->
    <b-row>
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div class="float-right mb-1">
            <y-btn
              v-if="editable"
              title="관리대상 지정 및 해제"
              color="blue"
              @btnClicked="btnPopupClickedCallback" 
            />
          </div>
          <y-data-table
            title="관리대상 유소견자 목록"
            label="관리대상 유소견자 목록"
            ref="dataTable"
            :headers="suspectUserGridHeaderOptions"
            :items="suspectUserGridData"
            :editable="editable"
            :rows="5"
            :excel-down="true"
            :print="true"
            @selectedRow="suspectSelectedRow"
          >
          </y-data-table>
        </b-col>
        <!-- 건강상담 목록 -->
        <b-col sm="12" class="px-0 mt-3">
          <div class="float-right mb-1">
            <y-btn
              v-if="editable&&deleteMode"
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDeleteSubmit"
              title="삭제"
              color="red"
              action-type="delete"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table
            title="건강상담 목록"
            label="건강상담 목록"
            ref="dataTable"
            :headers="consultGridHeaderOptions"
            :items="consultGridData"
            :editable="editable"
            :rows="5"
            v-model="selectedValue"
            :excel-down="true"
            :print="true"
            @selectedRow="consultSelectedRow"
          >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>

        <!-- 등록 -->
        <b-row class="mt-3">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="건강상담 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    ui="bootstrap"
                    disabled="disabled"
                    label="유소견자"
                    name="userNm"
                    v-model="consult.userNm"
                    :required="true"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-datepicker 
                    :width="baseWidth"
                    :editable="editable"
                    label="상담일"
                    name="visitYmd"
                    v-model="consult.visitYmd"
                    default="today"
                    v-validate="'required'"
                    data-vv-name="date"
                    :end="today"
                    :error-msg="errors.first('visitYmd')"
                    :required="true"
                    :state="validateState('visitYmd')"
                  >
                  </y-datepicker>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    ui="bootstrap"
                    label="상담자"
                    name="counselor"
                    v-model="consult.counselor"
                  >
                  </y-text>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-textarea
                    :width="10"
                    :editable="editable"
                    :maxlength="600"
                    ui="bootstrap"
                    label="과거력"
                    name="diseasePast"
                    v-model="consult.diseasePast"
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
                    label="현 병력"
                    name="diseaseCurr"
                    v-model="consult.diseaseCurr"
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
                    label="증상"
                    name="symptom"
                    v-model="consult.symptom"
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
                    label="상담 내용"
                    name="remark"
                    v-model="consult.remark"
                    :rows="2"
                  >
                  </y-textarea>
                </b-col>
              </b-row>
              <div class="float-right mt-3">
                <y-btn
                  v-if="editable"
                  title="초기화"
                  @btnClicked="btnClearClickedCallback" 
                />
                <y-btn
                  v-if="editable"
                  :action-url="insertUrl"
                  :param="consult"
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
                  :param="consult"
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
            </b-card>
          </b-col>
        </b-row>
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
  name: 'suspect-user',
  props: {
  },
  data () {
    return {
      consult: {
        visitYmd: '',
        userId: '',
        diseasePast: '',
        diseaseCurr: '',
        symptom: '',
        remark: '',
        deptCd: '',
        userNm: '',
        heaConsultNo: '',
        counselor: '',
      },
      static: {
        userId: '',
        userNm: '',
        deptCd: '',
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '80%',
        top: '10px',
        param: {},
        closeCallback: null
      },
      isDeleteSubmit: false,
      isInsertSubmit: false,
      isEditSubmit: false,
      baseWidth: 8,
      editable: true,
      updateMode: false,
      deleteMode: false,
      deleteUrl: '',
      editUrl: '',
      insertUrl: '',
      suspectUserGridData: [],
      suspectUserGridHeaderOptions: [],
      consultGridData: [],
      consultGridHeaderOptions: [],
      selectedValue: [],
      deleteValue: null,
      today: '',
      tempYmd: '',
    };
  },
  watch: {
    'consult.visitYmd': function (newValue, oldValue) {
      if (newValue < this.today && this.tempYmd !== newValue && newValue !== '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '과거 날짜를 선택하였습니다.',
          type: 'warning',
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
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // 그리드 헤더 설정
      this.suspectUserGridHeaderOptions = [
        { text: '사번', name: 'userId', width: '10%', align: 'center' },
        { text: '직원명', name: 'userNm', width: '15%', align: 'center' },
        { text: '부서', name: 'deptNm', width: '15%', align: 'center' },
        { text: '관리대상 지정일', name: 'beManagedYmd', width: '15%', align: 'center' },
        { text: '비고', name: 'remark', width: '40%', align: 'left' },
      ];
      this.consultGridHeaderOptions = [
        { text: '상담일', name: 'visitYmd', width: '10%', align: 'center' },
        { text: '과거력', name: 'diseasePast', width: '15%', align: 'left' },
        { text: '현 병력', name: 'diseaseCurr', width: '15%', align: 'left' },
        { text: '증상', name: 'symptom', width: '15%', align: 'left' },
        { text: '상담내용', name: 'remark', width: '15%', align: 'left' },
      ];

      // 오늘 날짜 구하기
      this.today = this.$comm.getToday();

      this.deleteUrl = transactionConfig.consult.delete.url;
      this.editUrl = transactionConfig.consult.edit.url;
      this.insertUrl = transactionConfig.consult.insert.url;

      this.getSuspectUsers();
    },
    /** /초기화 관련 함수 **/

    getSuspectUsers () {
      this.$http.url = selectConfig.suspectUser.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.suspectUserGridData = _result.data;
      }, (_error) => {
      });
    },
    getConsults (data) {
      this.$http.url = selectConfig.consult.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'userId': data.userId
      };
      this.$http.request((_result) => {
        this.consultGridData = _result.data;
      }, (_error) => {
      });

      this.consult.userId = data.userId;
      this.consult.userNm = data.userNm;
      this.consult.deptCd = data.deptCd;
      this.static.userId = data.userId;
      this.static.userNm = data.userNm;
      this.static.deptCd = data.deptCd;

      this.consult.visitYmd = this.$comm.getToday();
      this.deleteMode = true;

      this.tempYmd = this.today;
    },
    getConsult (data) {
      Object.assign(this.consult, data);
      this.updateMode = true;

      this.tempYmd = data.visitYmd;
    },
    beforeInsert () {
      if (this.consult.userNm === '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '유소견자목록에서 직원을 선택해 주세요.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '유소견자 건강상담 정보를 저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsertSubmit = true;
            }
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    beforeEdit () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '유소견자 건강상담 정보를 수정하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isEditSubmit = true;
            }
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    beforeDelete () {
      if (this.selectedValue.length === 0) 
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '유소견자 건강상담 항목을 선택해주세요.',
          type: 'warning',
        });
        return;
      }

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '유소견자 건강상담을 삭제하시겠습니까?',
        type: 'info',
        // 확인 callback 함수
        confirmCallback: () => {
          this.deleteValue = {
            'data': Object.values(this.$_.clone(this.selectedValue))
          };
          this.isDeleteSubmit = true;
        }
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
    btnSearchConsults (_result) {
      this.btnClearClickedCallback();
      this.getConsults(_result);
    },
    btnInsertClickedCallback (_result) {
      this.consult.heaConsultNo = _result.data;
      this.getConsults(this.static);
      this.isInsertSubmit = false;
      this.updateMode = true;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '유소견자 건강상담 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnEditClickedCallback (_result) {
      this.getConsults(this.static);
      this.isEditSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '유소견자 건강상담 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnDeleteClickedCallback (_result) {
      this.getConsults(this.static);
      this.btnClearClickedCallback();
      this.isDeleteSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '유소견자 건강상담을 정상적으로 삭제하였습니다.',
        type: 'success',
      });
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.consult, this.$options.data().consult);
      this.$validator.reset();
      this.updateMode = false;

      this.consult.userId = this.static.userId;
      this.consult.userNm = this.static.userNm;
      this.consult.deptCd = this.static.deptCd;
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      this.isEditSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    btnPopupClickedCallback () {
      this.popupOptions.target = () => import(`${'./suspectUserPopup.vue'}`);
      this.popupOptions.title = '관리대상 유소견자 지정';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getSuspectUsers();
      Object.assign(this.$data.consult, this.$options.data().consult);
      this.$validator.reset();
      this.consultGridData = [];
    },
    suspectSelectedRow (row) {
      this.btnSearchConsults(row);
    },
    consultSelectedRow (row) {
      this.getConsult(row);
    },
    /** /Button Event **/
    
  }
};
</script>