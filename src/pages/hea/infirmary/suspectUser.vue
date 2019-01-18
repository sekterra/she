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
          <div class="float-right">
            <y-btn
              v-if="editable"
              type="save"
              title="관리대상 지정 및 해제"
              size="small"
              color="primary"
              @btnClicked="btnPopupClickedCallback" 
            />
          </div>
          <b-row class="mb-3"></b-row>
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
          <div class="float-right">
            <y-btn
              v-if="editable&&deleteMode"
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDeleteSubmit"
              type="delete"
              title="삭제"
              size="small"
              color="danger"
              action-type="delete"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <b-row class="mb-3"></b-row>
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
                  <y-datepicker 
                    :width="baseWidth"
                    :editable="editable"
                    label="상담일"
                    name="date"
                    v-model="consult.visitYmd"
                    default="today"
                    v-validate="'required'"
                    data-vv-name="date"
                    :error-msg="errors.first('visitYmd')"
                    :required="true"
                    :state="validateState('heaDrugNm')"
                  >
                  </y-datepicker>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    ui="bootstrap"
                    :disabled="true"
                    label="상담자"
                    name="userNm"
                    v-model="consult.userNm"
                    :required="true"
                    v-validate="'required'"
                    :state="validateState('userNm')"
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
                  >
                  </y-textarea>
                </b-col>
              </b-row>
              <div class="float-right mt-3">
                <y-btn
                  v-if="editable"
                  type="clear"
                  title="초기화"
                  size="small"
                  color="info"
                  @btnClicked="btnClearClickedCallback" 
                />
                <y-btn
                  v-if="editable"
                  :action-url="insertUrl"
                  :param="consult"
                  :is-submit="isInsertSubmit"
                  type="save"
                  title="신규등록"
                  size="small"
                  color="warning"
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
                  type="save"
                  title="수정"
                  size="small"
                  color="warning"
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
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :width="popupOptions.width"        
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :top="popupOptions.top" >
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closePopup" />
    </el-dialog>
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
        width: '90%',
        top: '10px',
        param: {}
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
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getSuspectUsers();
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
        { text: '사용자명', name: 'userNm', width: '15%', align: 'center' },
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
    },
    /** /초기화 관련 함수 **/

    getSuspectUsers () {
      this.$http.url = selectConfig.suspectUser.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.suspectUserGridData = _result.data;
      }, (_error) => {
        console.log(_error);
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
        console.log(_error);
      });

      this.consult.userId = data.userId;
      this.consult.userNm = data.userNm;
      this.consult.deptCd = data.deptCd;
      this.static.userId = data.userId;
      this.static.userNm = data.userNm;
      this.static.deptCd = data.deptCd;

      this.deleteMode = true;
    },
    getConsult (data) {
      Object.assign(this.consult, data);
      this.updateMode = true;
    },
    beforeInsert () {
      if (window.confirm("등록하시겠습니까?"))
      {
        this.checkValidationInsert();
        this.insertUrl = transactionConfig.consult.insert.url;
      }
    },
    beforeEdit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationEdit();
        this.editUrl = transactionConfig.consult.edit.url;
      }
    },
    beforeDelete () {
      console.log(this.selectedValue.length);
      if (this.selectedValue.length === 0) 
      {
        window.alert("항목을 선택해주세요.");
        return;
      }
      this.deleteUrl = transactionConfig.consult.delete.url;
      this.deleteValue = {
        'data': Object.values(this.$_.clone(this.selectedValue))
      };
      this.isDeleteSubmit = true;
    },
    /** validation checking **/
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsertSubmit = _result;
        if (!this.isInsertSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsertSubmit = false;
      });
    },
    checkValidationEdit () {
      this.$validator.validateAll().then((_result) => {
        this.isEditSubmit = _result;
        if (!this.isEditSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEditSubmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/

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
      alert('등록되었습니다.');
    },
    btnEditClickedCallback (_result) {
      this.getConsults(this.static);
      this.isEditSubmit = false;
      alert('수정되었습니다.');
    },
    btnDeleteClickedCallback (_result) {
      this.getConsults(this.static);
      this.btnClearClickedCallback();
      this.isDeleteSubmit = false;
      alert('삭제되었습니다.');
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.consult, this.$options.data().consult);
      this.$validator.reset();
      this.updateMode = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
      this.consult.userId = this.static.userId;
      this.consult.userNm = this.static.userNm;
      this.consult.deptCd = this.static.deptCd;
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      this.isEditSubmit = false;
      window.alert("ERROR.. 담당자에게 연락바랍니다.");
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnPopupClickedCallback () {
      this.popupOptions.target = () => import(`${'./suspectUserPopup.vue'}`);
      this.popupOptions.title = '관리대상 유소견자 지정';
      this.popupOptions.visible = true;
    },
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getSuspectUsers();
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