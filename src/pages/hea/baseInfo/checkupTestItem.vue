<!--
  목적 : 검진 기준정보 - 검진종류-검진항목
  Detail : 검진종류에 따른 검진검사별 검진항목 등록/수정화면
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
                title="삭제"
                color="red"
                action-type="DELETE"
                beforeSubmit = "beforeDelete"
                @beforeDelete="beforeDelete"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
            <y-data-table 
              :height="gridOptions.height"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :excel-down="true"
              :print="true"
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
      </b-col>
    </b-row>

    <!-- 등록 -->
    <b-row class="mt-3" ref="editBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="검진종류 - 검진항목 상세" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5">
              <b-row>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-select
                    :width="8"
                    :comboItems="comboTestClassTypeItems"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="edit"
                    label="검진검사"
                    name="heaTestClassCd"
                    v-model="heaTestClassCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-text
                  :width="8"
                  ui="bootstrap"
                  name="heaTestItemNm"
                  label="검진항목명" 
                  v-model="heaTestItemNm"
                  >
                </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="1" md="1" lg="1" xl="1" class="col-xxl-1"></b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-select
                :width="9"
                :comboItems="comboCheckupTypeItems"
                :required="true"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                name="heaCheckupClassCd"
                label="검진종류"
                v-model="checkupTestItem.heaCheckupClassCd"
                v-validate="'required'"
                :state="validateState('heaCheckupClassCd')"
              >
              </y-select>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5">
              <div slot="buttonGroup" class="float-right mb-1">
                <y-btn 
                  title="검색"
                  color="blue"
                  @btnClicked="btnSearchTestItemClicked" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
              <!-- this.gridTestItemRightOptions.data.filter(data => !this.heaTestItemNm || data.heaTestItemNm.toLowerCase().includes(this.heaTestItemNm.toLowerCase())) -->
              <y-data-table 
              :height="gridTestItemRightOptions.height"
              :headers="gridTestItemRightOptions.header"
              :items="this.gridTestItemRightOptions.data"
              :excel-down="true"
              :print="true"
              :useRownum="false"
              v-model="testItemRightValue"
              label="검진항목 목록"
              ref="testItemLeftDataTable"
              >
                <el-table-column
                  type="selection"
                  slot="selection"
                  align="center"
                  width="55">
                </el-table-column> 
              </y-data-table>
            </b-col>
            <!-- 가운데 버튼 영역 -->
            <b-col sm="1" md="1" lg="1" xl="1" class="col-xxl-1 text-center">
              <b-row align-v="center" style="height: 100%;">
                  <b-col>
                    <b-row class="mb-2">
                      <b-col>
                        <b-button 
                          @click.stop="btnMoveClicked" 
                        >
                        <f-icon icon="angle-right" />
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                      <b-button 
                        @click.stop="btnDeleteTestItemClicked" 
                        >
                        <f-icon icon="angle-left" />
                      </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-data-table 
              :height="gridTestItemLeftOptions.height"
              :headers="gridTestItemLeftOptions.header"
              :items="gridTestItemLeftOptions.data"
              :excel-down="true"
              :print="true"
              :useRownum="false"
              v-model="testItemLeftValue"
              label="선택된 검진항목 목록"
              ref="testItemRightDataTable"
              >
                <el-table-column
                  type="selection"
                  slot="selection"
                  align="center"
                  width="55">
                </el-table-column> 
              </y-data-table>
            </b-col>
          </b-row>
          <div class="float-right mt-3">
              <y-btn
                title="초기화"
                @btnClicked="btnClearClickedCallback" 
                />
              <y-btn
                v-if="insertable"
                :action-url="insertUrl"
                :param="checkupTestItem"
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
                :param="checkupTestItem"
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
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-checkup-test-item',
  props: {
    paneName: {
      type: String,
      default: ''
    },
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
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    gridTestItemLeftOptions: {
      header: [],
      data: [],
      height: '300'
    },
    gridTestItemRightOptions: {
      header: [],
      data: [],
      height: '300'
    },
    heaTestItemNm: '',
    testItemLeftValue: [],
    testItemRightValue: [],
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
    insertable: true,
    isInsert: false,
    isEdit: false,
    isDelete: false,
    editUrl: '',
    insertUrl: '',
    deleteUrl: '',
    selectedValue: [],
    deleteValue: null,
  }),
  watch: {
    /**
     * selectedRow 호출
     * 검진검사 watch
     * val : 검진검사 바뀐 정보
     * oldVal : 검진검사 바뀌기 전 정보
     */
    'checkupTestItem.heaCheckupClassCd': {
      handler: function (value, oldVal) {
        var data = {
          heaCheckupClassCd: value,
          heaCheckupTypeCd: ''
        }
        this.selectedRow(data); 
      },
    },
    // 해당 tab 들어올 때마다 그리드 사이즈 조정
    paneName (val) {
      this.setGridSize();      
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
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
    // window.getApp.$on('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
    // window.getApp.$off('resize', this.setGridSize);
  },
  destroyed () {
  },
  //* methods */
  methods: {
    init () {
      // URL setting
      this.deleteUrl = transactionConfig.checkupTestItem.delete.url;
      this.editUrl = transactionConfig.checkupTestItem.edit.url;
      this.insertUrl = transactionConfig.checkupTestItem.insert.url;
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검진종류', name: 'heaCheckupClassNm', width: '25%', align: 'left' },
        { text: '검진검사', name: 'heaTestClassNm', width: '25%', align: 'left' }, 
        { text: '검진항목', name: 'heaTestItemNm', width: '30%' },
      ];
      // 선택된 검진항목 목록 그리드 헤더 설정
      this.gridTestItemLeftOptions.header = [
        { text: '검진검사', name: 'heaTestClassNm', width: '150px', align: 'left' },
        { text: '검진항목', name: 'heaTestItemNm', width: '200px', align: 'left' },
      ];
      // 검진항목 목록 그리드 헤더 설정
      this.gridTestItemRightOptions.header = [
        { text: '검진검사', name: 'heaTestClassNm', width: '150px', align: 'left' },
        { text: '검진항목', name: 'heaTestItemNm', width: '200px', align: 'left', filter: 'true' },
      ];

      this.getComboItems('HEA_CHECKUP_CLASS'); // 검진종류
      this.getComboItems('HEA_TEST_CLASS'); // 검진검사    
      this.getList(); // 검진종류 - 검진항목 목록 조회
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공통 마스터 정보 조회 (검진종류, 검진검사)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_CHECKUP_CLASS') 
        {
          this.comboCheckupTypeItems = this.$_.clone(_result.data);
          this.comboCheckupTypeItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        }
        else
        {
          this.comboTestClassTypeItems = this.$_.clone(_result.data);
          this.comboTestClassTypeItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
          this.heaTestClassCd = '';
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 검진항목 조회
     */
    getComboTestItems (heaTestClassCd, heaTestItemNm) {
      this.$http.url = selectConfig.testItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaTestClassCd': heaTestClassCd,
        'heaTestItemNm': heaTestItemNm,
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        this.gridTestItemRightOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 선택된 검진항목 목록 조회
     * 검진종류 - 검진항목 목록 row 클릭시 마다 발생
     * data : 클릭한 row 정보
     */
    selectedRow (data) {
      if (data.heaCheckupClassCd === null || data.heaCheckupClassCd === '') return;

      setTimeout(() => {
        if (data.heaTestClassCd !== null && data.heaTestClassCd !== undefined) this.heaTestClassCd = data.heaTestClassCd;
      }, 300);

      this.$http.url = selectConfig.checkupTestItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaCheckupClassCd': data.heaCheckupClassCd,
        'heaCheckupTypeCd': data.heaCheckupTypeCd // 01
      };
      this.$http.request((_result) => {
        if (_result.data.length > 0)
        {
          this.checkupTestItem = this.$_.clone(_result.data[0]);
          // TODO : shuttlebox의 selectedItems를 사용할 때는 굳이 아래와 같이 별도로 값을 할당 할 필요가 없음
          // 그렇지 않을 경우에는, shuttlebox의 v-model과 연동할 때는 값만 따로 추출한 배열로 값을 할당 해야 함
          this.gridTestItemLeftOptions.data = this.$_.clone(_result.data);
          this.insertable = false;
          this.editable = true;
        }
        else
        {
          this.insertable = true;
          this.editable = false;
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result)
        {
          // if (window.confirm("수정하시겠습니까?"))
          // {
          //   this.checkupTestItem.heaTestItemCd = this.$_.map(this.gridTestItemLeftOptions.data, 'heaTestItemCd').toString();
          //   this.isEdit = true;
          // }

          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.checkupTestItem.heaTestItemCd = this.$_.map(this.gridTestItemLeftOptions.data, 'heaTestItemCd').toString();
              this.isEdit = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isEdit = false;
            }
          });
        }
        else if (!_result) 
        {
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
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result)
        {
          // if (window.confirm("저장하시겠습니까?"))
          // {
          //   this.checkupTestItem.heaTestItemCd = this.heaTestItemTempCd.toString();
          //   this.isInsert = true;
          // }
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.checkupTestItem.heaTestItemCd = this.heaTestItemTempCd.toString();
              this.isInsert = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else if (!_result) 
        {
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
    /** 삭제 하기전 param setting **/
    beforeDelete () {
      if (this.selectedValue.length === 0) 
      {
        // window.alert("항목을 선택해주세요.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '항목을 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }

      // if (window.confirm("삭제하시겠습니까?"))
      // {
      //   this.deleteValue = {
      //     'data': Object.values(this.$_.clone(this.selectedValue))
      //   };
      //   this.isDelete = true;
      // }
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.deleteValue = {
            'data': Object.values(this.$_.clone(this.selectedValue))
          };
          this.isDelete = true;
        },
        // 취소 callback 함수
        cancelCallback: () => {
          this.isDelete = false;
        }
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
    /** 검진종류 - 검진항목 목록 조회 **/
    getList () {
      this.$http.url = selectConfig.checkupTestItem.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = (window.innerHeight - this.$refs.editBox.clientHeight - 300) <= 250 ? defaultHeight : (window.innerHeight - this.$refs.editBox.clientHeight - 300);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검진종류 - 검진항목 목록 조회 및 검진유형, 검진종류 저장
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      this.checkupTestItem.heaCheckupClassCd = this.$_.clone(_result.data.heaCheckupClassCd);
      this.checkupTestItem.heaCheckupTypeCd = this.$_.clone(_result.data.heaCheckupTypeCd);
      this.getList();
      this.isEdit = false;
      this.getComboTestItems(this.heaTestClassCd);
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
    },
    /**
     * 검진종류 - 검진항목 목록 조회 및 검진유형, 검진종류 저장
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.checkupTestItem.heaCheckupClassCd = this.$_.clone(_result.data.heaCheckupClassCd);
      this.checkupTestItem.heaCheckupTypeCd = this.$_.clone(_result.data.heaCheckupTypeCd);
      this.getList();
      this.isInsert = false;
      this.getComboTestItems(this.heaTestClassCd);
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
    },
    /**
     * 검진종류 - 검진항목 목록 조회
     *  삭제 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnDeleteClickedCallback (_result) {
      this.getList();
      this.isDelete = false;
      // window.alert("삭제되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',  // success / info / warning / error
      });
    },
    /**
     * 수정 버튼 안보여지도록 처리 및 isSubmit false 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.isDelete = false;
      this.editable = false;
      this.disabled = false;
      this.btnClearClickedCallback();
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      this.editable = false;
      this.disabled = false;
      this.insertable = true;
      Object.assign(this.$data.checkupTestItem, this.$options.data().checkupTestItem);
      this.heaTestClassCd = '';
      this.checkupTestItem.heaCheckupClassCd = null;
      this.selectedItems = [];
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /**
     * 검진항목 목록에 선택된 정보를 선택된 검진항목 목록으로 이동
     */
    btnMoveClicked (_result) {
      // 1. 추가된 아이템 중 기존 항목이 있는지 체크
      var filteredDuplicatedArray = this.$comm.removeDuplicatedArrayObject(this.gridTestItemLeftOptions.data, this.testItemRightValue, 'heaTestItemCd'); 
      // 2. 선택된 항목중에서 기존에 선택된 항목을 제외한 항목을 가져와서 기존 항목과 합침
      if (filteredDuplicatedArray.length > 0)
      {
        this.gridTestItemLeftOptions.data = this.$_.concat(this.gridTestItemLeftOptions.data, filteredDuplicatedArray);
      } 
    },
    /**
     * 선택된 검진항목 목록에 선택된 정보를 삭제(화면상으로)
     */
    btnDeleteTestItemClicked (_result) {
      this.$_.forEach(this.testItemLeftValue, (item) => {
        this.gridTestItemLeftOptions.data = this.$_.clone(this.$_.reject(this.gridTestItemLeftOptions.data, item));
      });
    },
    /**
     * 검진항목 목록에 검색
     * 검색조건 (검진검사, 검진항목명)
     */
    btnSearchTestItemClicked (_result) {
      this.getComboTestItems(this.heaTestClassCd, this.heaTestItemNm);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>