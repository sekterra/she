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
        <div class="float-right">
          <y-btn
            type="clear"
            title="닫기"
            size="small"
            color="info"
            @btnClicked="closePopup" 
          />
        </div>  
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="일반업무 등록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker 
                :width="baseWidth"
                :editable="editable"
                label="방문일"
                name="date"
                v-model="infirmaryUsage.visitYmd"
                default="today"
                v-validate="'required'"
                :error-msg="errors.first('date')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboUserItems"
                itemText="userNm"
                itemValue="userId"
                ui="bootstrap"
                type="edit"
                label="방문자"
                name="userId"
                v-model="infirmaryUsage.userId"
                :required="true"
                v-validate="'required'"
                :state="validateState('userId')"
              >
              </y-select>
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
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>

        <b-col sm="8" class="px-0">
          <y-data-table 
            title="약품 처방"
            label="약품 처방"
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
            type="clear"
            title="초기화"
            size="small"
            color="info"
            @btnClicked="btnClearClickedCallback" 
          />
          <y-btn
            v-if="editable&&insertMode"
            :action-url="insertUrl"
            :param="infirmaryUsage"
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
            :param="infirmaryUsage"
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
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
            type="clear"
            title="닫기"
            size="small"
            color="info"
            @btnClicked="closePopup" 
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
  /** attributes: name, components, props, data **/
  name: 'create-general-business',
  props: {
    popupParam: {
      type: Object,
      default: {
        heaInfirmaryUsageNo: 0,
      },
    },
  },
  data () {
    return {
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
    this.getHeaTreatCdItems();
    this.getUserItems();
    this.getDrugList();
    if (this.popupParam.heaInfirmaryUsageNo !== 0) {
      this.getInfirmaryUsage();
      this.updateMode = true;
    } else {
      this.insertMode = true;
    }
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
      this.drugGridHeaderOptions = [
        { text: '약품명', name: 'heaDrugNm', width: '15%', align: 'left' },
        { text: '사용량', name: 'amount', width: '10%', align: 'center', type: 'text' },
        { text: '단위', name: 'unit', width: '8%', align: 'center' },
        { text: '현재 재고량', name: 'amountCurr', width: '8%', align: 'center' },
      ];

      this.infirmaryUsage.heaInfirmaryUsageNo = this.popupParam.heaInfirmaryUsageNo;
    },
    /** /초기화 관련 함수 **/
    
    getUserItems () {
      this.$http.url = selectConfig.user.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'userId': null, 'userNm': '선택하세요' });
        this.comboUserItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getHeaTreatCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_TREAT');
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaTreatCdItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getDrugList () {
      this.$http.url = selectConfig.drugManage.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.drugGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getInfirmaryUsage () {
      this.$http.url = this.$format(selectConfig.infirmaryUsage.get.url, this.popupParam.heaInfirmaryUsageNo);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.infirmaryUsage = _result.data;
        this.drugGridData = this.infirmaryUsage.prescribeList;
      }, (_error) => {
        console.log(_error);
      });
    },
    beforeInsert () {
      if (window.confirm("등록하시겠습니까?"))
      {
        this.checkValidationInsert();
        this.infirmaryUsage.prescribeList = this.drugGridData;
        this.insertUrl = transactionConfig.infirmaryUsage.insert.url;
      }
    },
    beforeEdit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationEdit();
        this.infirmaryUsage.prescribeList = this.drugGridData;
        this.editUrl = transactionConfig.infirmaryUsage.edit.url;
      }
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

    /** Button Event **/
    searchUserCallback () {
      console.log('::::::: searchUserCallback :::::::');
    },
    btnInsertClickedCallback (_result) {
      this.heaInfirmaryUsageNo = _result.data;
      this.isInsertSubmit = false;
      alert('등록되었습니다.');
      this.closePopup();
    },
    btnEditClickedCallback (_result) {
      this.isEditSubmit = false;
      alert('수정되었습니다.');
      this.closePopup();
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.infirmaryUsage, this.$options.data().infirmaryUsage);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    /** /Button Event **/
  }
};
</script>