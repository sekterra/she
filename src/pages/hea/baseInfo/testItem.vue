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
          <b-col sm="11" class="px-0">
            <y-data-table 
              :headers="gridHeaderItemOptions"
              :items="gridItemData"
              :editable="editable"
              :excel-down="true"
              :print="true"
              :rows="5"
              :cellClick="true"
              v-model="heaTestItem"
              label="건강검진항목 목록"
              ref="dataTable"
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
                      :editable="editable"
                      :comboItems="comboTestClassItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      type="edit"
                      name="heaTestClassCd"
                      label="건강검진검사"
                      v-model="heaTestItem.heaTestClassCd"
                      v-validate="'required'"
                      :state="validateState('heaTestClassCd')"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    name="heaTestItemNm"
                    label="건강검진항목명"
                    v-model="heaTestItem.heaTestItemNm"
                    v-validate="'required'"
                    :state="validateState('heaTestItemNm')"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="8"
                      :editable="editable"
                      :comboItems="comboResultTypeItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      name="heaResultTypeCd"
                      label="결과타입"
                      v-model="heaTestItem.heaResultTypeCd"
                      v-validate="'required'"
                      :state="validateState('heaResultTypeCd')"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="8"
                      :editable="editable"
                      :maxlength="15"
                      ui="bootstrap"
                      name="unit"
                      label="단위"
                      v-model="heaTestItem.unit"
                      >
                      </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-number
                    :width="8"
                    :editable="editable"
                    :maxlength="5"
                    :hasSeperator="false"
                    ui="bootstrap"
                    name="sortOrder"
                    label="출력순서"
                    v-model="heaTestItem.sortOrder"
                    >
                    </y-number>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
                    <!-- <y-radio
                      :width="8"
                      :editable="editable"
                      :comboItems="radioItems"
                      itemText="useName"
                      itemValue="useYn"
                      ui="bootstrap"
                      name="radioValue"
                      label="사용여부"
                      v-model="heaTestItem.useYn"
                    /> -->
                    <y-switch
                      :width="8"
                      :editable="editable"
                      true-value="Y"
                      false-value="N"
                      ui="bootstrap"
                      label="사용여부"
                      name="radioValue"
                      selectText="사용"
                      unselectText="미사용"
                      v-model="heaTestItem.useYn"
                    >
                  </y-switch>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :editable="editable"
                      :maxlength="150"
                      ui="bootstrap"
                      name="specRef"
                      label="참고치"
                      v-model="heaTestItem.specRef"
                    />
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :editable="editable"
                      :maxlength="150"
                      ui="bootstrap"
                      name="itemExplan"
                      label="분석항목설명"
                      v-model="heaTestItem.remark"
                    />
                  </b-col>
                </b-row>
                <div class="float-right mt-3" >
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
                      :param="heaTestItem"
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
                      :param="heaTestItem"
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
  name: 'y-test-item',
  props: {
  },
  data: () => ({
    heaTestItem: {
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
      useYn: '',
    },
    baseWidth: 9,
    editable: true,
    isSubmit: false,
    isSubmit2: false,
    radioItems: null,
    gridItemData: [],
    gridHeaderItemOptions: [],
    comboTestClassItems: [],
    comboResultTypeItems: [],
    insertUrl: '',
    saveUrl: '',
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
        { text: '사용여부', name: 'useYn', width: '10%', align: 'center' },
      ];

      this.getComboItems('HEA_RESULT_TYPE');
      this.getComboItems('HEA_TEST_CLASS');
      this.getItemList();
    },

    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.options.url, codeGroupCd);
      this.$http.type = 'GET';
      // this.$http.param = {
      //   "codeGroupCd": codeGroupCd
      // };
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_RESULT_TYPE') 
        {
          this.comboResultTypeItems = _result.data;
        }
        else
        {
          this.comboTestClassItems = _result.data;
        }
      }, (_error) => {
        console.log(_error);
      });
    },

    ReceivesData (data) {
      Object.assign(this.heaTestItem, data);
      this.heaTestItem.useYn = data.useYn === '사용' ? 'Y' : 'N';
    },

    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.isSubmit2 = true;
      this.saveUrl = transactionConfig.testItem.edit.url;
    },
    beforeInsert () {
      this.checkValidation();
      this.insertUrl = transactionConfig.testItem.insert.url;
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
    getItemList () {
      this.$http.url = selectConfig.testItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        "heaTestClassCd": ''
      };
      this.$http.request((_result) => {
        console.log(JSON.parse(JSON.stringify(_result.data)));
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
      this.isSubmit2 = false;
    },
    btnInsertClickedCallback (_result) {
      this.getItemList();
      this.isSubmit = false;
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.heaTestItem, this.$options.data().heaTestItem);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>
