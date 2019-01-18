<!--
  목적 : 약품관리 - 약품관리
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
        <b-col sm="12" class="px-0">
          <y-data-table
            label="약품 목록"
            title="약품 목록"
            ref="dataTable"
            gridType="edit"
            :headers="drugGridHeaderOptions"
            :items="drugGridData"
            :editable="editable"
            :rows="5"
            :excel-down="true"
            :print="true"
            @selectedRow="selectedRow"
          >
          </y-data-table>
        </b-col>

        <!-- 등록 -->
        <b-row class="mt-3">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="약품 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    label="약품명"
                    name="heaDrugNm"
                    v-model="heaDrug.heaDrugNm"
                    :required="true"
                    v-validate="'required'"
                    :state="validateState('heaDrugNm')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="15"
                    ui="bootstrap"
                    label="단위"
                    name="unit"
                    v-model="heaDrug.unit"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="5"
                    ui="bootstrap"
                    label="적정 재고량"
                    name="amountLimit"
                    v-model="heaDrug.amountLimit"
                  >
                  </y-number>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="7"
                    ui="bootstrap"
                    label="현재 재고량"
                    name="amountCurr"
                    v-model="heaDrug.amountCurr"
                  >
                  </y-number>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-switch
                    :width="baseWidth"
                    :editable="editable"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="사용여부"
                    name="useYn"
                    selectText="사용"
                    unselectText="미사용"
                    :required="true"
                    v-model="heaDrug.useYn"
                  >
                  </y-switch>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="5"
                    ui="bootstrap"
                    label="출력 순서"
                    name="sortOrder"
                    v-model="heaDrug.sortOrder"
                  >
                  </y-number>
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
                    :param="heaDrug"
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
                    :param="heaDrug"
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
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'drug-manage',
  props: {
  },
  data () {
    return {
      heaDrug: {
        heaDrugNo: 0,
        heaDrugNm: '',
        unit: '',
        amountLimit: '',
        amountCurr: '',
        sortOrder: '',
        useYn: 'Y',
        createUserId: '',
        creatDt: '',
        updateUserId: '',
        updateDt: '',
      },
      baseWidth: 8,
      widthTwoCols: 10,
      editable: true,
      updateMode: false,
      useYnItems: [],
      isInsertSubmit: false,
      isEditSubmit: false,
      editUrl: '',
      insertUrl: '',
      drugGridData: [],
      drugGridHeaderOptions: [],
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
    this.getUseYnItems();
    this.getDrugManages();
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
        { text: '약품', name: 'heaDrugNm', width: '20%', align: 'left' },
        { text: '단위', name: 'unit', width: '10%', align: 'center' },
        { text: '적정 재고량', name: 'amountLimit', width: '10%', align: 'center' },
        { text: '현재 재고량', name: 'amountCurr', width: '10%', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '10%', align: 'center' },
        { text: '출력순서', name: 'sortOrder', width: '10%', align: 'center' },
      ];
    },
    /** /초기화 관련 함수 **/
    getUseYnItems () {
      setTimeout(() => {
        this.useYnItems = [
          { useYn: 'Y', useYnNm: '사용' },
          { useYn: 'N', useYnNm: '미사용' },
        ];
      }, 3000);
    },
    // 약품관리 조회
    getDrugManages () {
      this.$http.url = selectConfig.drugManage.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.drugGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getDrugManage (data) {
      Object.assign(this.heaDrug, data);
      this.updateMode = true;
    },
    beforeInsert () {
      if (window.confirm("등록하시겠습니까?"))
      {
        this.checkValidationInsert();
        this.insertUrl = transactionConfig.drugManage.insert.url;
      }
    },
    beforeEdit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationEdit();
        this.editUrl = transactionConfig.drugManage.edit.url;
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
    /** /validation checking **/
    
    /** Button Event **/
    btnInsertClickedCallback (_result) {
      this.heaDrug.heaDrugNo = _result.data;
      this.getDrugManages();
      this.isInsertSubmit = false;
      this.updateMode = true;
      alert('등록되었습니다.');
    },
    btnEditClickedCallback (_result) {
      this.getDrugManages();
      this.isEditSubmit = false;
      alert('수정되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      this.isEditSubmit = false;
      window.alert("ERROR.. 담당자에게 연락바랍니다.");
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.heaDrug, this.$options.data().heaDrug);
      this.$validator.reset();
      this.updateMode = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    selectedRow (row) {
      this.getDrugManage(row);
    },
    /** /Button Event **/
    
  }
  /** /methods **/
};
</script>