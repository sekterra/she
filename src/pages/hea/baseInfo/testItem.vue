<!--
  목적 : 검진 기준정보 - 검진항목
  Detail : 검진항목 등록/수정화면
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
              :height="gridOptions.height"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :excel-down="true"
              :print="true"
              :useRownum="false"
              v-model="testItem"
              label="검진항목 목록"
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
                  <y-label label="검진항목 상세" icon="user-edit" color-class="cutstom-title-color" />
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
                      label="검진검사"
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
                    label="검진항목명"
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
                    label="정렬순서"
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
                      title="초기화"
                      @btnClicked="btnClearClickedCallback" 
                    />
                    <y-btn 
                      :action-url="insertUrl"
                      :param="testItem"
                      :is-submit="isInsert"
                      title="신규등록"
                      color="orange"
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
                      title="수정"
                      color="orange"
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
    paneName: {
      type: String,
      default: ''
    },
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
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    gridItemData: [],
    gridHeaderItemOptions: [],
    comboTestClassItems: [],
    comboResultTypeItems: [],
    insertUrl: '',
    editUrl: '',

    period: '',
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
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      // URL setting
      this.editUrl = transactionConfig.testItem.edit.url;
      this.insertUrl = transactionConfig.testItem.insert.url;

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검진검사', name: 'heaTestClassNm', width: '20%', align: 'left', link: 'test' },
        { text: '검진항목', name: 'heaTestItemNm', width: '20%', align: 'left' },
        { text: '단위', name: 'unit', width: '10%', align: 'center' },
        { text: '결과타입', name: 'heaResultTypeNm', width: '10%', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '10%', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '10%', align: 'center' },
      ];

      this.getComboItems('HEA_RESULT_TYPE'); // 결과타입
      this.getComboItems('HEA_TEST_CLASS'); // 검진검사
      this.getItemList(); // 검진항목 목록 조회
    },
    /**
     * 공통 마스터 정보 조회 (결과타입, 검진검사)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_RESULT_TYPE') 
        {
          this.comboResultTypeItems = this.$_.clone(_result.data);
          this.comboResultTypeItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        }
        else
        {
          this.comboTestClassItems = this.$_.clone(_result.data);
          this.comboTestClassItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 검진항목 상세 조회
     * 검진항목 목록 row 클릭시 마다 발생
     * data : 클릭한 row 정보
     */
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.testItem.get.url, data.heaTestItemCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        this.testItem = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          // this.isEdit = window.confirm("수정하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isEdit = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isEdit = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isEdit = false;
      });
    },
    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      var heaTestItemNms = this.$_.map(this.gridOptions.data, 'heaTestItemNm');
      if (this.$_.indexOf(heaTestItemNms, this.testItem.heaTestItemNm) > -1) {
        // window.alert("이미 같은 이름의 검사항목명이 존재합니다.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 검사항목명이 존재합니다.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          // this.isInsert = window.confirm("저장하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isInsert = false;
      });
    },
    /**
     * 필수입력값 유효성 검사
     */
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    /** 검진항목  목록 조회 **/
    getItemList () {
      this.$http.url = selectConfig.testItem.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** button 관련 이벤트 **/
    /**
     * 검진항목  목록 조회
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      this.getItemList();
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
    },
    /**
     * 검진항목  목록 조회 및 수정 버튼 보이도록 처리
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.testItem.heaTestItemCd = this.$_.clone(_result.data);
      this.getItemList();
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isInsert = false;
      this.editable = true;
    },
    /**
     * 수정 버튼 안보여지도록 처리 및 isSubmit false 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.editable = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
      this.btnClearClickedCallback();
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.testItem, this.$options.data().testItem);
      
      // this.testItem.heaTestClassCd = '';
      // this.testItem.heaResultTypeCd = '';
      this.$validator.reset();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>
