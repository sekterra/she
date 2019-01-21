<!--
  목적 : 건강검진기관 기준정보 - 공통건강검진(탭)
  Detail : 건강검진기관별(종합검진유형별 검사종류별) 공통건강검진항목 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 결과 테이블 -->
    <b-row >
      <b-col sm="12">
        <b-col sm="11" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDelete"
              type="delete"
              size="mini"
              color="danger"
              title="삭제"
              action-type="DELETE"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table 
            :headers="gridHeaderOptions"
            :items="gridData"
            :excel-down="true"
            :print="true"
            :rows="5"
            v-model="selectedValue"
            label="건강검진종류 - 공통 건강검진항목 목록"
            ref="dataTable"
            @selectedRow="selectedRow"
            >
            <el-table-column
                type="selection"
                slot="selection"
                align="center"
                width="55">
              </el-table-column> 
          </y-data-table>
        </b-col>

        <!-- 등록 -->
        <b-row class="mt-3">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="건강검진종류 - 공통 건강검진항목 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="6"
                    :comboItems="comboCheckupOrganItems"
                    :required="true"
                    :disabled="disabled"
                    itemText="heaCheckupOrgNm"
                    itemValue="heaCheckupOrgNo"
                    ui="bootstrap"
                    type="edit"
                    name="heaCheckupOrgNo"
                    label="건강검진기관"
                    v-model="checkupOrgCommon.heaCheckupOrgNo"
                    v-validate="'required'"
                    :state="validateState('heaCheckupOrgNo')"
                  >
                  </y-select>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-datepicker
                    :width="6"
                    :required="true"
                    :disabled="disabled"
                    placeholder="년도를 선택해주세요."
                    type="year"
                    label="건강검진년도"
                    name="remark"
                    v-model="checkupOrgCommon.year"
                    v-validate="'required'"
                    :state="validateState('year')"
                  />
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="6"
                    :comboItems="comboCheckupTypeItems"
                    :required="true"
                    :disabled="disabled"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="edit"
                    name="heaCheckupTypeCd"
                    label="종합건강검진유형"
                    v-model="checkupOrgCommon.heaCheckupTypeCd"
                    v-validate="'required'"
                    :state="validateState('heaCheckupTypeCd')"
                  >
                  </y-select>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="6"
                    :comboItems="comboTestClassTypeItems"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="edit"
                    label="건강검진검사"
                    name="heaTestClassCd"
                    v-model="heaTestClassCd"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-shuttlebox
                    :width="9"
                    :items="comboTestItems"
                    :needDefaultView="true"
                    itemText="heaTestItemNm"
                    itemValue="heaTestItemCd"
                    ui="bootstrap"
                    label="건강검진항목 선택"
                    name="heaTestItemTempCd"
                    v-model="heaTestItemTempCd"
                  >
                  </y-shuttlebox>
                </b-col>
              </b-row>
              <div class="float-right mt-3">
                  <y-btn
                    type="clear"
                    title="초기화"
                    size="small"
                    color="info"
                    @btnClicked="btnClearClickedCallback" 
                    />
                  <y-btn
                    :action-url="insertUrl"
                    :param="checkupOrgCommon"
                    :is-submit="isInsert"
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
                    v-if="editable"
                    :action-url="editUrl"
                    :param="checkupOrgCommon"
                    :is-submit="isEdit"
                    type="save"
                    title="수정"
                    size="small"
                    color="warning"
                    action-type="PUT"
                    beforeSubmit = "beforeSubmit"
                    @beforeSubmit="beforeSubmit"
                    @btnClicked="btnSaveClickedCallback" 
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
  /* attributes: name, components, props, data */
  name: 'y-checkup-org-common',
  props: {
  },
  data: () => ({
    checkupOrgCommon: {
      heaCheckupOrgNo: null,
      heaCheckupOrgNm: '',
      year: '',
      heaCheckupTypeCd: null,
      heaCheckupTypeNm: '',
      heaCheckupClassCd: '',
      heaCheckupClassNm: '',
      heaTestItemNm: '',
      heaTestItemCd: '',
      optionalYn: 'N',
      updateUserId: '',
      createUserId: '',
    },
    heaTestClassCd: '',
    heaTestItemTempCd: [],
    mutiTestItemSelectValues: [],
    comboCheckupTypeItems: [],
    comboTestClassTypeItems: [],
    comboTestItems: [],
    comboSelectedTestItemItems: [],
    comboCheckupOrganItems: [],
    yearItems: [],
    baseWidth: 9,
    disabled: false,
    editable: true,
    isInsert: false,
    isEdit: false,
    isDelete: false,
    gridData: [],
    gridHeaderOptions: [],
    editUrl: '',
    insertUrl: '',
    deleteUrl: '',
    selectedValue: [],
    deleteValue: null,
  }),
  watch: {
    'heaTestClassCd': {
      handler: function (value, oldVal) {
        this.getComboTestItems(value); 
      },
    },
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getComboItems('HEA_CHECKUP_TYPE'); // 검진유형
    this.getComboItems('HEA_TEST_CLASS'); // 검진검사
    this.getComboCheckupOrgItems(); // 검진검사
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // Create User, Update User setting
      this.checkupOrgCommon.updateUserId = 'dev';
      this.checkupOrgCommon.createUserId = 'dev';
      // URL setting
      this.editUrl = transactionConfig.checkupOrgTestItem.edit.url;
      this.insertUrl = transactionConfig.checkupOrgTestItem.insert.url;
      this.deleteUrl = transactionConfig.checkupOrgTestItem.delete.url;
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진기관', name: 'heaCheckupOrgNm', width: '25%', align: 'left' },
        { text: '건강검진년도', name: 'year', width: '15%', align: 'center' }, 
        { text: '종합건강검진유형', name: 'heaCheckupTypeNm', width: '17%' },
        { text: '건강검진검사', name: 'heaTestClassNm', width: '15%' },
        { text: '건강검진항목', name: 'heaTestItemNm', width: '20%' },
        // { text: '출력순서', name: 'sortOrder', width: '15%', align: 'center' }
      ];
    },

    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_TEST_CLASS') {
          this.comboTestClassTypeItems = this.$_.clone(_result.data);
          this.comboTestClassTypeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.heaTestClassCd = '';
        } else {
          this.comboCheckupTypeItems = this.$_.clone(_result.data);
          this.comboCheckupTypeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.checkupOrgCommon.heaCheckupTypeCd = '';
        }
      }, (_error) => {
        console.log(_error);
      });
    },

    getComboCheckupOrgItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        this.comboCheckupOrganItems = this.$_.clone(_result.data);
        this.comboCheckupOrganItems.splice(0, 0, { 'heaCheckupOrgNo': '', 'heaCheckupOrgNm': '선택하세요' });
        this.checkupOrgCommon.heaCheckupOrgNo = '';
      }, (_error) => {
        console.log(_error);
      });
    },

    getComboTestItems (heaTestClassCd) {
      this.$http.url = this.$format(selectConfig.testItem.list.url, heaTestClassCd);
      this.$http.type = 'GET';
      this.$http.param = {
        'heaTestClassCd': heaTestClassCd
      };
      this.$http.request((_result) => {
        this.comboTestItems = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });
    },

    selectedRow (data) {
      this.$http.url = selectConfig.checkupOrgTestItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'year': data.year,
        'heaCheckupTypeCd': data.heaCheckupTypeCd, // 01
        'heaCheckupOrgNo': data.heaCheckupOrgNo
      };
      this.$http.request((_result) => {
        this.editable = true;
        this.disabled = true;
        this.checkupOrgCommon = this.$_.clone(_result.data[0]);
        this.heaTestItemTempCd = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });
    },

    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationSave();
      }
    },
    beforeInsert () {
      if (window.confirm("저장하시겠습니까?"))
      {
        this.checkupOrgCommon.year = this.$_.clone(this.$comm.moment(this.checkupOrgCommon.year).format('YYYY'));
        this.checkupOrgCommon.heaTestItemCd = this.heaTestItemTempCd.toString();
        this.checkValidationInsert();
      }
    },
    beforeDelete () {
      if (this.selectedValue.length === 0) 
      {
        window.alert("항목을 선택해주세요.");
        return;
      }

      if (window.confirm("삭제하시겠습니까?"))
      {
        this.deleteValue = {
          'data': Object.values(this.$_.clone(this.selectedValue))
        };
        this.isDelete = true;
      }
    },
    /**
     * 수정전 유효성 검사
     */
    checkValidationSave () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    getList () {
      this.$http.url = selectConfig.checkupOrgTestItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'optionalYn': 'N'
      };
      this.$http.request((_result) => {
        this.gridData = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSaveClickedCallback (_result) {
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
      this.getList();
      window.alert("수정되었습니다.");
      this.isEdit = false;
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      window.alert("저장되었습니다.");
      this.isInsert = false;
    },
    btnDeleteClickedCallback (_result) {
      this.getList();
      window.alert("삭제되었습니다.");
      this.isDelete = false;
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.isDelete = false;
      this.editable = false;
      this.disabled = false;
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.checkupOrgCommon, this.$options.data().checkupOrgCommon);
      this.editable = false;
      this.disabled = false;
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>