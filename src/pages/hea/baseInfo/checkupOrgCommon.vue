<!--
  목적 : 검진기관 기준정보 - 공통검진(탭)
  Detail : 검진기관별(검진유형별 검사종류별) 공통검진항목 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header" >
              <y-label label="검색" />
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                title="검색"
                color="green"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckupOrganSearchItems"
                :disabled="disabled"
                itemText="heaCheckupOrgNm"
                itemValue="heaCheckupOrgNo"
                ui="bootstrap"
                type="edit"
                name="heaCheckupOrgNoSearch"
                label="건강검진기관"
                v-model="searchParam.heaCheckupOrgNo"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                placeholder="년도를 선택해주세요."
                type="year"
                label="건강검진년도"
                name="yearSearch"
                v-model="searchParam.year"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckupTypeSearchItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                name="heaCheckupTypeCdSearch"
                label="검진유형"
                v-model="searchParam.heaCheckupTypeCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDelete"
              color="red"
              title="삭제"
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
            :use-paging="true"
            v-model="selectedValue"
            label="검진종류 - 공통 검진항목 목록"
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
            <y-label label="검진종류 - 공통 검진항목 상세" icon="user-edit" color-class="cutstom-title-color" />
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
                  />
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
                    label="검진기관"
                    v-model="checkupOrgCommon.heaCheckupOrgNo"
                    v-validate="'required'"
                    :state="validateState('heaCheckupOrgNo')"
                  />
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-datepicker
                    :width="6"
                    :required="true"
                    :disabled="disabled"
                    placeholder="년도를 선택해주세요."
                    type="year"
                    label="검진년도"
                    name="year"
                    v-model="checkupOrgCommon.year"
                    v-validate="'required'"
                    :state="validateState('year')"
                  />
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-select
                    :width="9"
                    :comboItems="comboCheckupTypeItems"
                    :required="true"
                    :disabled="disabled"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="edit"
                    name="heaCheckupTypeCd"
                    label="검진유형"
                    v-model="checkupOrgCommon.heaCheckupTypeCd"
                    v-validate="'required'"
                    :state="validateState('heaCheckupTypeCd')"
                  >
                  </y-select>
                </b-col>
              </b-row>
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
              <y-data-table 
              :height="gridTestItemRightOptions.height"
              :headers="gridTestItemRightOptions.header"
              :items="gridTestItemRightOptions.data"
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
                :param="checkupOrgCommon"
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
                :param="checkupOrgCommon"
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
  name: 'y-checkup-org-common',
  props: {
    paneName: {
      type: String,
      default: ''
    },
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
      deleteHeaCheckupTestItems: [],
      insertHeaCheckupTestItems: [],
    },
    searchTestItemParam: {
      heaTestClassCd: '',
      heaCheckupOrgNo: 0,
      year: '',
      heaCheckupTypeCd: '',
      useYn: '',
      optionalYn: '',
      heaTestItemNm: '',
    },
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    searchParam: {
      heaCheckupOrgNo: 0,
      year: '',
      heaCheckupTypeCd: '',
      optionalYn: 'N',
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
    optionalYn: '',
    heaTestClassCd: '',
    heaTestItemTempCd: [],
    receiveSelectValues: [],
    selectedItems: [],
    comboCheckupTypeItems: [],
    comboTestClassTypeItems: [],
    comboTestItems: [],
    comboSelectedTestItemItems: [],
    comboCheckupOrganItems: [],
    comboCheckupOrganSearchItems: [],
    comboCheckupTypeSearchItems: [],
    yearItems: [],
    baseWidth: 9,
    disabled: false,
    editable: true,
    insertable: true,
    isInsert: false,
    isEdit: false,
    isDelete: false,
    editUrl: '',
    insertUrl: '',
    deleteUrl: '',
    searchUrl: '',
    selectedValue: [],
    deleteValue: null,
  }),
  watch: {
    /**
     * searchTestItemParam.heaTestClassCd 에 값 setting
     * 검진검사 watch
     * val : 검진검사 바뀐 정보
     * oldVal : 검진검사 바뀌기 전 정보
     */
    'heaTestClassCd': {
      handler: function (value, oldVal) {
        this.searchTestItemParam.heaTestClassCd = value;
      },
    },
    /**
     * setSelectedTestItem 호출
     * 검진기관 watch
     * val : 검진기관 바뀐 정보
     * oldVal : 검진기관 바뀌기 전 정보
     */
    'checkupOrgCommon.heaCheckupOrgNo': {
      handler: function (value, oldVal) {
        this.setSelectedTestItem(null); 
      },
    },
    /**
     * setSelectedTestItem 호출
     * 검진년도 watch
     * val : 검진년도 바뀐 정보
     * oldVal : 검진년도 바뀌기 전 정보
     */
    'checkupOrgCommon.year': {
      handler: function (value, oldVal) {
        this.setSelectedTestItem(null); 
      },
    },
    /**
     * setSelectedTestItem 호출
     * 검진유형 watch
     * val : 검진유형 바뀐 정보
     * oldVal : 검진유형 바뀌기 전 정보
     */
    'checkupOrgCommon.heaCheckupTypeCd': {
      handler: function (value, oldVal) {
        this.setSelectedTestItem(null); 
      },
    },
    // 해당 tab 들어올 때마다 그리드 사이즈 조정
    paneName (val) {
      this.setGridSize();      
    }
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
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // URL setting
      this.searchUrl = selectConfig.checkupOrgTestItem.list.url;
      this.editUrl = transactionConfig.checkupOrgTestItem.edit.url;
      this.insertUrl = transactionConfig.checkupOrgTestItem.insert.url;
      this.deleteUrl = transactionConfig.checkupOrgTestItem.delete.url;
      // 검진종류-공통 검진항목 목록 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검진기관', name: 'heaCheckupOrgNm', width: '25%', align: 'left' },
        { text: '검진년도', name: 'year', width: '15%', align: 'center' }, 
        { text: '검진유형', name: 'heaCheckupTypeNm', width: '17%' },
        { text: '검진검사', name: 'heaTestClassNm', width: '15%' },
        { text: '검진항목', name: 'heaTestItemNm', width: '20%' },
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
      this.getComboItems('HEA_CHECKUP_TYPE'); // 검진유형
      this.getComboItems('HEA_TEST_CLASS'); // 검진검사
      this.getComboCheckupOrgItems(); // 검진검사
      this.getList(); // 검진종류-공통 검진항목 목록 조회
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공통 마스터 정보 조회 (검진유형, 검진검사)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'HEA_TEST_CLASS') {
          this.comboTestClassTypeItems = this.$_.clone(_result.data);
          this.comboTestClassTypeItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
          this.heaTestClassCd = '';
        } else {
          this.comboCheckupTypeItems = this.$_.clone(_result.data);
          this.comboCheckupTypeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.checkupOrgCommon.heaCheckupTypeCd = '';
          this.comboCheckupTypeSearchItems = this.$_.clone(_result.data);
          this.comboCheckupTypeSearchItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
          this.searchParam.heaCheckupTypeCd = '';
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 검진기관 조회
     */
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
        this.comboCheckupOrganSearchItems = this.$_.clone(_result.data);
        this.comboCheckupOrganSearchItems.splice(0, 0, { 'heaCheckupOrgNo': 0, 'heaCheckupOrgNm': '전체' });
        this.searchParam.heaCheckupOrgNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 검진항목 조회
     */
    getComboTestItems () {
      if (this.checkupOrgCommon.heaCheckupOrgNo <= 0)
      {
        // window.alert('검진기관을 선택해주세요');
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '검진기관을 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      } 
      else if (!this.checkupOrgCommon.year) 
      {
        // window.alert('검진년도를 선택해주세요');
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '검진년도를 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      else if (!this.checkupOrgCommon.heaCheckupTypeCd) 
      {
        // window.alert('검진유형을 선택해주세요');
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '검진유형을 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }

      this.searchTestItemParam.heaCheckupOrgNo = this.checkupOrgCommon.heaCheckupOrgNo;
      this.searchTestItemParam.year = this.$_.clone(this.$comm.moment(this.checkupOrgCommon.year).format('YYYY'));
      this.searchTestItemParam.heaCheckupTypeCd = this.checkupOrgCommon.heaCheckupTypeCd;
      this.searchTestItemParam.useYn = 'Y';
      this.searchTestItemParam.optionalYn = 'Y';  // 선택검진에 저장된 항목들만 제거한다.
      this.searchTestItemParam.heaTestItemNm = this.heaTestItemNm;
      
      this.$http.url = selectConfig.testItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchTestItemParam;
      this.$http.request((_result) => {
        this.gridTestItemRightOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * setSelectedTestItem 호출
     * 검진종류-공통 검진항목 목록 row 클릭시 마다 발생
     * data : 클릭한 row 정보
     */
    selectedRow (data) {
      this.setSelectedTestItem(data);
    },
    /**
     * 선택된 검진항목 목록 조회
     * data : Object (검진년도, 기관번호, 유형코드, 검사코드)
     */
    setSelectedTestItem (data) {
      if (data === null)
      {
        data = {
          year: this.checkupOrgCommon.year,
          heaCheckupTypeCd: this.checkupOrgCommon.heaCheckupTypeCd,
          heaCheckupOrgNo: this.checkupOrgCommon.heaCheckupOrgNo,
          heaTestClassCd: this.checkupOrgCommon.heaTestClassCd,
        };
      }

      if (data.heaCheckupOrgNo > 0
        && data.year !== ''
        && data.heaCheckupTypeCd !== '') {
        setTimeout(() => {
          if (data.heaTestClassCd !== null && data.heaTestClassCd !== undefined) this.heaTestClassCd = data.heaTestClassCd;
        }, 300);
        this.$http.url = selectConfig.checkupOrgTestItem.list.url;
        this.$http.type = 'GET';
        this.$http.param = {
          'year': data.year,
          'heaCheckupTypeCd': data.heaCheckupTypeCd, // 01
          'heaCheckupOrgNo': data.heaCheckupOrgNo,
          'optionalYn': 'N'
        };
        this.$http.request((_result) => {
          if (_result.data.length > 0)
          {
            this.insertable = false;
            this.editable = true;
            this.checkupOrgCommon = this.$_.clone(_result.data[0]);
            this.gridTestItemLeftOptions.data = this.$_.clone(_result.data);
            this.receiveSelectValues = this.$_.clone(_result.data);
          }
          else
          {
            this.gridTestItemLeftOptions.data = [];
            this.insertable = true;
            this.editable = false;
          }
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', _error);
        });
      }
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      var receiveData = this.$_.map(this.receiveSelectValues, 'heaTestItemCd');
      this.checkupOrgCommon.deleteHeaCheckupTestItems = [];
      this.checkupOrgCommon.insertHeaCheckupTestItems = [];
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result)
        {
          // 삭제 된 검사항목
          this.$_.forEach(receiveData, (_item) => {
            if (this.$_.indexOf(this.$_.map(this.gridTestItemLeftOptions.data, 'heaTestItemCd'), _item) === -1)
            {
              this.checkupOrgCommon.deleteHeaCheckupTestItems.push(_item);
            }
          });

          // 추가 된 검사항목
          this.$_.forEach(this.$_.map(this.gridTestItemLeftOptions.data, 'heaTestItemCd'), (_item) => {
            if (this.$_.indexOf(receiveData, _item) === -1)
            {
              this.checkupOrgCommon.insertHeaCheckupTestItems.push(_item);
            }
          });
          this.checkupOrgCommon.year = this.$_.clone(this.$comm.moment(this.checkupOrgCommon.year).format('YYYY'));

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
          if (this.gridTestItemLeftOptions.data.length <= 0) 
          {
            // window.alert("항목을 하나이상 선택하세요.");
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '항목을 하나이상 선택하세요.',
              type: 'warning',  // success / info / warning / error
            });
            return;
          }

          this.checkupOrgCommon.year = this.$_.clone(this.$comm.moment(this.checkupOrgCommon.year).format('YYYY'));
          this.checkupOrgCommon.heaTestItemCd = this.$_.map(this.gridTestItemLeftOptions.data, 'heaTestItemCd').toString();
          
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
    /** 검진종류 - 공통 검진항목 목록 조회 **/
    getList () {
      this.$http.url = selectConfig.checkupOrgTestItem.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 250;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = (window.innerHeight - this.$refs.editBox.clientHeight - 250) <= 250 ? defaultHeight : (window.innerHeight - this.$refs.editBox.clientHeight - 250);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검진종류 - 공통 검진항목 목록 조회 및 선택된 검진항목 목록 리스트 저장
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      this.getList();
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });

      this.receiveSelectValues = this.$_.clone(this.gridTestItemLeftOptions.data);
      this.getComboTestItems(); 
      this.isEdit = false;
    },
    /**
     * 검진종류 - 공통 검진항목 목록 조회 및 선택된 검진항목 목록 리스트 저장
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.getList();
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.receiveSelectValues = this.$_.clone(this.gridTestItemLeftOptions.data);
      this.getComboTestItems(); 
      this.isInsert = false;
    },
    /**
     * 검진종류 - 공통 검진항목 목록 조회
     *  삭제 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnDeleteClickedCallback (_result) {
      this.getList();
      // window.alert("삭제되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isDelete = false;
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
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      Object.assign(this.$data.checkupOrgCommon, this.$options.data().checkupOrgCommon);
      this.checkupOrgCommon.heaCheckupOrgNo = '';
      this.checkupOrgCommon.heaCheckupTypeCd = '';
      this.comboTestItems = [];
      this.heaTestClassCd = '';
      this.gridTestItemLeftOptions.data = [];
      this.editable = false;
      this.disabled = false;
      this.insertable = true;
      this.$validator.reset();
    },
    /**
     * 검색박스 숨기기/보이기 처리 후 setGridSize 호출
     */
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    /**
     * 검색 조건에 따른 데이터 조회 후 검진종류 - 공통 검진항목 목록에 리스트 적용
     * _result : backend에서 return하는 데이터
     */
    btnSearchClickedCallback (_result) {
      this.gridOptions.data = this.$_.clone(_result.data);
    },
    /**
     * 검진항목 목록에 선택된 정보를 선택된 검진항목 목록으로 이동
     */
    btnMoveClicked () {
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
      this.getComboTestItems();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>