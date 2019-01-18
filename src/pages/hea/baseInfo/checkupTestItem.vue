<!--
  목적 : 건강검진 기준정보 - 건강검진종류-건강검진항목
  Detail : 건강검진종류에 따른 건강검진검사별 건강검진항목 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 결과 테이블 -->
    <b-row >
      <b-col sm="12">
          <b-col sm="10" class="px-0">
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn 
                :action-url="deleteUrl"
                :param="deleteValue"
                :is-submit="isDelete"
                type="delete"
                title="삭제"
                size="mini"
                color="danger"
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
              label="검진종류 - 검진항목 목록"
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
                  <y-label label="검진종류 - 검진항목 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
              <b-card>
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
                    <y-select
                      :width="8"
                      :comboItems="comboCheckupTypeItems"
                      :required="true"
                      :disabled="disabled"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      type="edit"
                      name="heaCheckupClassCd"
                      label="건강검진종류"
                      v-model="checkupTestItem.heaCheckupClassCd"
                      v-validate="'required'"
                      :state="validateState('heaCheckupClassCd')"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
                    <y-select
                      :width="baseWidth"
                      :comboItems="comboTestClassTypeItems"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      type="edit"
                      label="건강검진검사"
                      name="heaTestClassCd"
                      v-model="heaTestClassCd"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-8">
                    <!-- TODO : 기존 추가된 항목을 직접 등록할 수 있도록 selected-items props 추가  -->
                    <y-shuttlebox
                      :width="10"
                      :items="comboTestItems"
                      :selected-items="selectedItems"
                      :needDefaultView="true"
                      itemText="heaTestItemNm"
                      itemValue="heaTestItemCd"
                      ui="bootstrap"
                      label="선택된 건강검진항목"
                      name="heaTestItemCd"
                      v-model="heaTestItemTempCd"
                    >
                    </y-shuttlebox>
                    <!-- TODO : 테스트 용으로 나중에 삭제 하세요 -->
                    {{heaTestItemTempCd}}
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
                      :param="checkupTestItem"
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
                      :param="checkupTestItem"
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
  name: 'y-checkup-test-item',
  props: {
  },
  data: () => ({
    checkupTestItem: {
      heaCheckupTypeNm: '',
      heaCheckupClassCd: null,
      heaTestItemNm: '',
      heaTestItemCd: '',
      updateUserId: '',
      createUserId: '',
    },
    heaTestClassCd: '',
    heaTestItemTempCd: [],
    // mutiTestItemSelectValues: [],
    comboCheckupTypeItems: [],
    comboTestClassTypeItems: [],
    comboTestItems: [],
    selectedItems: [],
    baseWidth: 9,
    disabled: false,
    editable: false,
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
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // Create User, Update User setting
      this.checkupTestItem.createUserId = 'dev';
      this.checkupTestItem.updateUserId = 'dev';
      // URL setting
      this.deleteUrl = transactionConfig.checkupTestItem.delete.url;
      this.editUrl = transactionConfig.checkupTestItem.edit.url;
      this.insertUrl = transactionConfig.checkupTestItem.insert.url;
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진종류', name: 'heaCheckupClassNm', width: '25%', align: 'left' },
        { text: '건강검진검사', name: 'heaTestClassNm', width: '25%', align: 'left' }, 
        { text: '건강검진항목', name: 'heaTestItemNm', width: '30%' },
        // { text: '출력순서', name: 'sortOrder', width: '12%', align: 'center' }
      ];

      this.getComboItems('HEA_CHECKUP_CLASS'); // 검진종류
      this.getComboItems('HEA_TEST_CLASS'); // 검진검사    
      this.getList();
    },

    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_CHECKUP_CLASS') 
        {
          this.comboCheckupTypeItems = this.$_.clone(_result.data);
          this.comboCheckupTypeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.checkupTestItem.heaCheckupClassCd = '';
        }
        else
        {
          this.comboTestClassTypeItems = this.$_.clone(_result.data);
          this.comboTestClassTypeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.heaTestClassCd = '';
        }
      }, (_error) => {
        console.log(_error);
      });
    },

    getComboTestItems (heaTestClassCd) {
      if (heaTestClassCd === null || heaTestClassCd === '')
      {
        this.comboTestItems = [];
        return;
      } 
      this.$http.url = selectConfig.testItem.list.url;
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
      this.$http.url = selectConfig.checkupTestItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaCheckupClassCd': data.heaCheckupClassCd,
        'heaCheckupTypeCd': data.heaCheckupTypeCd // 01
      };
      this.$http.request((_result) => {
        this.editable = true;
        this.disabled = true;

        this.checkupTestItem = this.$_.clone(_result.data[0]);
        // TODO : shuttlebox의 selectedItems를 사용할 때는 굳이 아래와 같이 별도로 값을 할당 할 필요가 없음
        // 그렇지 않을 경우에는, shuttlebox의 v-model과 연동할 때는 값만 따로 추출한 배열로 값을 할당 해야 함
        // this.heaTestItemTempCd = this.$_.map(_result.data, 'heaTestItemCd');
        this.selectedItems = this.$_.clone(_result.data);
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
        this.checkupTestItem.heaTestItemCd = this.heaTestItemTempCd.toString();
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
      this.$http.url = selectConfig.checkupTestItem.list.url;
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
      this.checkupTestItem.heaCheckupClassCd = this.$_.clone(_result.data.heaCheckupClassCd);
      this.checkupTestItem.heaCheckupTypeCd = this.$_.clone(_result.data.heaCheckupTypeCd);
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
      this.getList();
      this.isEdit = false;
      window.alert("수정되었습니다.");
    },
    btnInsertClickedCallback (_result) {
      this.checkupTestItem.heaCheckupClassCd = this.$_.clone(_result.data.heaCheckupClassCd);
      this.checkupTestItem.heaCheckupTypeCd = this.$_.clone(_result.data.heaCheckupTypeCd);
      this.getList();
      this.isInsert = false;
      window.alert("저장되었습니다.");
    },
    btnDeleteClickedCallback (_result) {
      this.getList();
      this.isDelete = false;
      window.alert("삭제되었습니다.");
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.isDelete = false;
      this.editable = false;
      this.disabled = false;
      this.btnClearClickedCallback();
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      this.editable = false;
      this.disabled = false;
      Object.assign(this.$data.checkupTestItem, this.$options.data().checkupTestItem);
      this.heaTestItemTempCd = []; // suttlebox 우축 리스트 reset을 위한 용도 ** 더 봐야함
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>