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
            <div slot="buttonGroup" class="float-right">
              <y-btn 
                :action-url="deleteUrl"
                :param="deleteValue"
                :is-submit="isSubmit3"
                type="delete"
                title="삭제"
                size="small"
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
              editable="editable"
              v-model="selectedValue"
              label="검진종류 - 검진항목 목록"
              ref="dataTable"
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
                      :editable="editable"
                      :comboItems="comboCheckupTypeItems"
                      :required="true"
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
                      :editable="editable"
                      :comboItems="comboTestClassTypeItems"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      type="edit"
                      label="건강검진검사"
                      name="heaTestClassCd"
                      v-model="checkupTestItem.heaTestClassCd"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-8">
                    <y-shuttlebox
                      :width="10"
                      :editable="editable"
                      :items="comboTestItems"
                      :needDefaultView="true"
                      itemText="heaTestItemNm"
                      itemValue="heaTestItemCd"
                      ui="bootstrap"
                      label="선택된 건강검진항목"
                      name="heaTestItemCd"
                      v-model="heaTestItemTempCd"
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
                      @btnClicked="btnClearClickedCallback" 
                      />
                    <y-btn
                      v-if="editable"
                      :action-url="insertUrl"
                      :param="checkupTestItem"
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
                    <y-btn
                      v-if="editable"
                      :action-url="saveUrl"
                      :param="checkupTestItem"
                      :is-submit="isSubmit2"
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
      heaCheckupClassCd: '',
      heaTestItemNm: '',
      heaTestItemCd: '',
      heaCheckupTypeCd: '01', // 종합건강검진 유형 해당하지 않는 경우
      heaTestClassCd: '',
    },
    heaTestItemTempCd: [],
    // mutiTestItemSelectValues: [],
    comboCheckupTypeItems: [],
    comboTestClassTypeItems: [],
    comboTestItems: [],
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
    selectedValue: [],
    deleteValue: null,
  }),
  watch: {
    'checkupTestItem.heaTestClassCd': {
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
      // URL setting
      this.deleteUrl = transactionConfig.checkupTestItem.delete.url;
      this.saveUrl = transactionConfig.checkupTestItem.edit.url;
      this.insertUrl = transactionConfig.checkupTestItem.insert.url;
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진종류', name: 'heaCheckupClassNm', width: '25%', align: 'left' },
        { text: '건강검진검사', name: 'heaTestClassNm', width: '25%', align: 'left' }, 
        { text: '건강검진항목', name: 'heaTestItemNm', width: '30%' },
        { text: '출력순서', name: 'sortOrder', width: '12%', align: 'center' }
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
          this.comboCheckupTypeItems = _result.data;
        }
        else
        {
          this.comboTestClassTypeItems = _result.data;
        }
      }, (_error) => {
        console.log(_error);
      });
    },

    getComboTestItems (heaTestClassCd) {
      console.log(heaTestClassCd);
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
        this.comboTestItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },

    ReceivesData (data) {
      this.$http.url = selectConfig.checkupTestItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaCheckupClassCd': data.heaCheckupClassCd,
        'heaCheckupTypeCd': data.heaCheckupTypeCd // 01
      };
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });

      Object.assign(this.checkupTestItem, data);
      // this.checkupTestItem.useYn = data.useYn === '사용' ? 'Y' : 'N';
    },

    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.isSubmit2 = true;
    },
    beforeInsert () {
      this.checkupTestItem.heaTestItemCd = this.heaTestItemTempCd.toString();
      this.checkValidation();
    },
    beforeDelete () {
      this.deleteValue = {
        'data': Object.values(this.$_.clone(this.selectedValue))
      };
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
      this.btnClearClickedCallback();
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.checkupTestItem, this.$options.data().checkupTestItem);
      this.heaTestItemTempCd = []; // suttlebox 우축 리스트 reset을 위한 용도 ** 더 봐야함
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>