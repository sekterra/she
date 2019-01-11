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
            <y-label label="건강관리실 일반업무 등록" icon="user-edit" color-class="cutstom-title-color" />
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
                default-type="today"
                v-validate="'required'"
                :error-msg="errors.first('date')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-2">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="방문자*"
                name="userNm"
                v-model="infirmaryUsage.userNm"
              >
              </y-text>
            </b-col>
            <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-1">
              <y-btn
                v-if="editable"
                :action-url="userSearchUrl"
                type="search"
                title="조회"
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
                label="업무유형"
                name="heaTreatCd"
                v-model="infirmaryUsage.heaTreatCd"
              >
              </y-select>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="600"
                ui="bootstrap"
                label="주호소 및 증상"
                name="sympton"
                v-model="infirmaryUsage.sympton"
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
                name="counsel"
                v-model="infirmaryUsage.counsel"
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
              v-if="editable"
              :action-url="insertUrl"
              :param="infirmaryUsage"
              :is-submit="isSubmit"
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
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'general-business',
  props: {
  },
  data () {
    return {
      infirmaryUsage: {
        heaInfirmaryUsageNo: '',
        userId: '',
        userNm: '',
        deptCd: '',
        visitYmd: '',
        heaTreatCd: '',
        syspton: '',
        counsel: '',
        remark: '',
        createUserId: '',
        creatDt: '',
        updateUserId: '',
        updateDt: '',
        heaPrescribe: [],
      },
      isSubmit: false, 
      baseWidth: 8,
      editable: true,
      heaTreatCdItems: [],
      drugItems: [],
      drugNo: '',
      drugGridData: [],
      drugGridHeaderOptions: [],
      insertUrl: '',
      userSearchUrl: '',
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
    this.getDrugList();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    getHeaTreatCdItems () {
      this.$http.url = this.$format(selectConfig.comCodeMaster.get.url, 'HEA_TREAT');
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.heaTreatCdItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    /** 초기화 관련 함수 **/
    init () {
      this.drugGridHeaderOptions = [
        { text: '약품명', name: 'heaDrugNm', width: '15%', align: 'left' },
        { text: '사용량', name: 'amount', width: '10%', align: 'center', type: 'text' },
        { text: '단위', name: 'unit', width: '8%', align: 'center' },
        { text: '현 재고량', name: 'amountCurr', width: '8%', align: 'center' },
      ];
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
    beforeInsert () {
      this.checkValidation();
      this.insertUrl = transactionConfig.generalBusiness.insert.url;
    },
    /** validation checking **/
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
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

    /** Button Event **/
    btnInsertClickedCallback (_result) {
      this.isSubmit = false;
    },
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.infirmaryUsage, this.$options.data().infirmaryUsage);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** /Button Event **/
  }
};
</script>