<!--
  목적 : 건강검진 기준정보 - 건강검진항목
  Detail : 건강검진항목 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 결과 테이블 -->
    <b-row >
      <b-col sm="12">
          <b-col sm="12" class="px-0">
            <y-data-table 
              :headers="gridHeaderItemOptions"
              :items="gridItemData"
              :excel-down="true"
              :print="true"
              :rows="5"
              :cellClick="true"
              v-model="testItem"
              label="건강검진항목 목록"
              ref="dataTable"
              @selectedRow="selectedRow"
              >
            </y-data-table>
          </b-col>

          <!-- 등록 -->
          <b-row class="mt-3">
            <b-col sm="12">
              <b-row>
                <b-col sm="12">
                  <y-label label="건강검진항목 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
               <b-card>
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="8"
                      :comboItems="comboTestClassItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      type="edit"
                      name="heaTestClassCd"
                      label="건강검진검사"
                      v-model="testItem.heaTestClassCd"
                      v-validate="'required'"
                      :state="validateState('heaTestClassCd')"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    name="heaTestItemNm"
                    label="건강검진항목명"
                    v-model="testItem.heaTestItemNm"
                    v-validate="'required'"
                    :state="validateState('heaTestItemNm')"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="8"
                      :comboItems="comboResultTypeItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      name="heaResultTypeCd"
                      label="결과타입"
                      v-model="testItem.heaResultTypeCd"
                      v-validate="'required'"
                      :state="validateState('heaResultTypeCd')"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="8"
                      :maxlength="15"
                      ui="bootstrap"
                      name="unit"
                      label="단위"
                      v-model="testItem.unit"
                      >
                      </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-number
                    :width="8"
                    :maxlength="5"
                    :hasSeperator="false"
                    ui="bootstrap"
                    name="sortOrder"
                    label="출력순서"
                    v-model="testItem.sortOrder"
                    >
                    </y-number>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
                    <y-switch
                      :width="8"
                      true-value="Y"
                      false-value="N"
                      ui="bootstrap"
                      label="사용여부"
                      name="radioValue"
                      selectText="사용"
                      unselectText="미사용"
                      v-model="testItem.useYn"
                    >
                  </y-switch>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :maxlength="150"
                      ui="bootstrap"
                      name="specRef"
                      label="참고치"
                      v-model="testItem.specRef"
                    />
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :maxlength="150"
                      ui="bootstrap"
                      name="itemExplan"
                      label="분석항목설명"
                      v-model="testItem.remark"
                    />
                  </b-col>
                </b-row>
                <div class="float-right mt-3" >
                    <y-btn
                      type="clear"
                      title="초기화"
                      size="small"
                      color="info"
                      @btnClicked="btnClearClickedCallback" 
                    />
                    <y-btn 
                      :action-url="insertUrl"
                      :param="testItem"
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
                      :param="testItem"
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
  name: 'y-test-item',
  props: {
  },
  data: () => ({
    testItem: {
      heaTestItemCd: '',
      heaTestClassCd: null,
      heaTestClassNm: '',
      heaTestItemNm: '',
      unit: '',
      heaResultTypeCd: null,
      heaResultTypeNm: '',
      remark: '',
      specRef: '',
      sortOrder: '',
      useYn: 'Y',
      updateUserId: '',
      createUserId: '',
    },
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    radioItems: null,
    gridItemData: [],
    gridHeaderItemOptions: [],
    comboTestClassItems: [],
    comboResultTypeItems: [],
    insertUrl: '',
    editUrl: '',
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.$nextTick(() => {
      Object.assign(this.$data, this.$options.data());
      this.init();
    });
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // Create User, Update User setting
      this.testItem.updateUserId = 'dev';
      this.testItem.createUserId = 'dev';
      // URL setting
      this.editUrl = transactionConfig.testItem.edit.url;
      this.insertUrl = transactionConfig.testItem.insert.url;
      // radio 버튼 셋팅
      setTimeout(() => {
        this.radioItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 1000);

      // 그리드 헤더 설정
      this.gridHeaderItemOptions = [
        { text: '건강검진검사', name: 'heaTestClassNm', width: '20%', align: 'left', link: 'test' },
        { text: '건강검진항목', name: 'heaTestItemNm', width: '20%', align: 'left' },
        { text: '단위', name: 'unit', width: '10%', align: 'center' },
        { text: '결과타입', name: 'heaResultTypeNm', width: '10%', align: 'center' },
        { text: '출력순서', name: 'sortOrder', width: '10%', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '10%', align: 'center' },
      ];

      this.getComboItems('HEA_RESULT_TYPE');
      this.getComboItems('HEA_TEST_CLASS');
      this.getItemList();
    },

    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      // this.$http.param = {
      //   "codeGroupCd": codeGroupCd
      // };
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_RESULT_TYPE') 
        {
          this.comboResultTypeItems = this.$_.clone(_result.data);
          this.comboResultTypeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.testItem.heaResultTypeCd = '';
        }
        else
        {
          this.comboTestClassItems = this.$_.clone(_result.data);
          this.comboTestClassItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.testItem.heaTestClassCd = '';
        }
      }, (_error) => {
        console.log(_error);
      });
    },

    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.testItem.get.url, data.heaTestItemCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        Object.assign(this.testItem, _result.data);
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
        this.checkValidationInsert();
      }
    },
    /**
     * 수정전 유효성 검사
     */
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
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    getItemList () {
      this.$http.url = selectConfig.testItem.list.url;
      this.$http.type = 'GET';
      // this.$http.param = {
      //   "heaTestClassCd": ''
      // };
      this.$http.request((_result) => {
        this.gridItemData = _result.data;
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
      this.getItemList();
      window.alert("수정되었습니다.");
      this.isEdit = false;
    },
    btnInsertClickedCallback (_result) {
      this.testItem.heaTestItemCd = this.$_.clone(_result.data);
      this.getItemList();
      window.alert("저장되었습니다.");
      this.isInsert = false;
      this.editable = true;
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.editable = false;
      window.alert("ERROR.. 담당자에게 연락바랍니다.");
      this.btnClearClickedCallback();
      // this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.testItem, this.$options.data().testItem);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>
