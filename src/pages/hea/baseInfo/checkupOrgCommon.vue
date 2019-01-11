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
        <!-- <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="건강검진종류 - 공통 건강검진항목" />
            </div>
            <div class="float-right">
              <y-btn 
                :action-url="deleteUrl"
                :param="checkupOrgCommon"
                :is-submit="isSubmit3"
                type="delete"
                size="small"
                color="danger"
                icon="el-icon-delete"
                action-type="DELETE"
                beforeSubmit = "beforeDelete"
                @beforeDelete="beforeDelete"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div> -->
          <b-col sm="10" class="px-0">
            <y-data-table 
              :isShowBtn="true"
              :headers="gridHeaderOptions"
              :items="gridData"
              :excel-down="true"
              :print="true"
              :rows="3"
              label="건강검진종류 - 공통 건강검진항목 목록"
              ref="dataTable"
              editable="editable"
              >
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
                      :editable="editable"
                      :comboItems="comboCheckupOrganItems"
                      :required="true"
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
                    <y-select
                      :width="6"
                      :editable="editable"
                      :comboItems="yearItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      type="search"
                      name="year"
                      label="건강검진년도"
                      v-model="checkupOrgCommon.year"
                      />
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="6"
                      :editable="editable"
                      :comboItems="comboCheckupTypeItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      type="edit"
                      name="heaCheckupTypeCd"
                      label="종합건강검진유형"
                      v-model="checkupOrgCommon.heaCheckupTypeCd"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="6"
                      :editable="editable"
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
                      :editable="editable"
                      :items="comboTestItems"
                      :needDefaultView="true"
                      itemText="heaTestItemNm"
                      itemValue="heaTestItemCd"
                      ui="bootstrap"
                      label="선택된 건강검진항목"
                      name="heaTestItemCd"
                      v-model="heaTestItemCd"
                    >
                    </y-shuttlebox>
                  </b-col>
                </b-row>
                <div class="float-right mt-3">
                    <y-btn
                      v-if="editable"
                      type="clear"
                      title="초기화"
                      size="small"
                      color="info"
                      icon="el-icon-edit"
                      @btnClicked="btnClearClickedCallback" 
                      />
                    <y-btn
                      v-if="editable"
                      :action-url="insertUrl"
                      :param="checkupOrgCommon"
                      :is-submit="isSubmit"
                      type="save"
                      title="신규등록"
                      size="small"
                      color="warning"
                      icon="el-icon-edit"
                      action-type="POST"
                      beforeSubmit = "beforeInsert"
                      @beforeInsert="beforeInsert"
                      @btnClicked="btnInsertClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    />
                    <y-btn
                      v-if="editable"
                      :action-url="saveUrl"
                      :param="checkupOrgCommon"
                      :is-submit="isSubmit2"
                      type="save"
                      title="수정"
                      size="small"
                      color="warning"
                      icon="el-icon-edit-outline"
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
        <!-- </b-card> -->
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
      heaCheckupOrgNo: '',
      heaCheckupOrgNm: '',
      year: '',
      heaCheckupTypeCd: '',
      heaCheckupTypeNm: '',
      heaCheckupClassCd: '',
      heaCheckupClassNm: '',
      heaTestItemNm: '',
      heaTestItemCd: '',
      optionalYn: 'N',
    },
    heaTestClassCd: '',
    heaTestItemCd: [],
    mutiTestItemSelectValues: [],
    comboCheckupTypeItems: [],
    comboTestClassTypeItems: [],
    comboTestItems: [],
    comboSelectedTestItemItems: [],
    comboCheckupOrganItems: [],
    yearItems: [],
    baseWidth: 9,
    editable: true,
    isSubmit: false,
    isSubmit2: false,
    isSubmit3: false,
    gridData: [],
    gridHeaderOptions: [],
    saveUrl: '',
    insertUrl: '',
    deleteUrl: '',
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
      // URL setting
      this.saveUrl = transactionConfig.checkupOrgTestItem.edit.url;
      this.insertUrl = transactionConfig.checkupOrgTestItem.insert.url;
      this.deleteUrl = transactionConfig.checkupOrgTestItem.delete.url;
      // 검진년도
      setTimeout(() => {
        var nowDate = new Date();
        var from = nowDate.getFullYear() + 1;
        for (; from >= nowDate.getFullYear() - 9; from--) {
          this.yearItems.push({ 'code': from, 'codeNm': from + '년' });
        }
      }, 200);

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
      this.$http.url = this.$format(selectConfig.comCodeMaster.get.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_TEST_CLASS') {
          this.comboTestClassTypeItems = _result.data;
        } else {
          this.comboCheckupTypeItems = _result.data;
        }
      }, (_error) => {
        console.log(_error);
      });
    },

    getComboCheckupOrgItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboCheckupOrganItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },

    getComboTestItems (heaTestClassCd) {
      this.$http.url = this.$format(selectConfig.testItem.get.url, heaTestClassCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboTestItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },

    ReceivesData (data) {
      Object.assign(this.checkupTestItem, data);
      // this.checkupTestItem.useYn = data.useYn === '사용' ? 'Y' : 'N';
    },

    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.isSubmit2 = true;
    },
    beforeInsert () {
      this.checkValidation();
    },
    beforeDelete () {
      this.isSubmit3 = true;
    },
    /**
     * 수정전 유효성 검사
     */
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    getList () {
      this.$http.url = this.$format(selectConfig.checkupOrgTestItem.list.url, 'N');
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridData = _result.data;
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
      this.btnClearClickedCallback();
      this.isSubmit2 = false;
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      this.btnClearClickedCallback();
      this.isSubmit = false;
    },
    btnDeleteClickedCallback (_result) {
      this.getList();
      this.btnClearClickedCallback();
      this.isSubmit3 = false;
    },
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;
      this.isSubmit2 = false;
      this.isSubmit3 = false;
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.checkupOrgCommon, this.$options.data().checkupOrgCommon);
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>