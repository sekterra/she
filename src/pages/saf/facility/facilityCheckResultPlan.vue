<!--
  목적 : 설비점검 - 설비점검계획
  Detail : 설비점검계획 등록화면으로  설비유형별로 설비를 조회 및 선택하여 설비점검종류와 설비점검예정일을 등록한다.
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row ref="editBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="설비점검계획" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckTypeItems"
                :required="true"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="설비점검종류"
                name="safCheckTypeCd"
                v-model="facilityCheckResult.safCheckTypeCd"
                v-validate="'required'"
                :state="validateState('safCheckTypeCd')"
              >
            </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :required="true"
                label="설비점검예정일"
                name="safFacilityCheckSchYmd"
                v-model="facilityCheckResult.safFacilityCheckSchYmd"
                v-validate="'required'"
                :state="validateState('safFacilityCheckSchYmd')"
              >
              </y-datepicker>
            </b-col>
          </b-row>
          
          <b-row ref="searchBox" class="mt-3">
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
                    <b-row>
                      <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                        <y-select
                          :width="6"
                          :comboItems="comboFacilityTypeItems"
                          itemText="safFacilityTypeNm"
                          itemValue="safFacilityTypeCd"
                          ui="bootstrap"
                          name="safFacilityTypeCd"
                          label="설비유형/공정"
                          v-model="searchParam.safFacilityTypeCd"
                        >
                        </y-select>
                      </b-col>
                      <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                        <y-select
                          :width="12"
                          :comboItems="comboProcessItems"
                          itemText="processNm"
                          itemValue="processNo"
                          ui="bootstrap"
                          name="processNo"
                          v-model="searchParam.processNo"
                        >
                        </y-select>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="8"
                      ui="bootstrap"
                      name="facilityNm"
                      label="설비명" 
                      v-model="searchParam.facilityNm"
                      >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="8"
                      :comboItems="comboDeptItems"
                      itemText="deptNm"
                      itemValue="deptCd"
                      ui="bootstrap"
                      name="deptCd"
                      label="설비관리부서"
                      v-model="searchParam.deptCd"
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
                <y-data-table 
                  ref="dataTable"
                  :height="gridOptions.height"
                  :headers="gridOptions.header"
                  :items="gridOptions.data"
                  :excel-down="true"
                  :print="true"
                  v-model="facilityMstValue"
                  label="설비 목록"
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
          <div class="float-right mt-3" >
            <y-btn
              title="초기화"
              @btnClicked="btnClearClickedCallback" 
            />
            <y-btn 
              :action-url="insertUrl"
              :param="facilityCheckResult"
              :is-submit="isInsert"
              title="신규등록"
              color="orange"
              action-type="POST"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
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
  name: 'y-facility-check-result-plan',
  props: {
  },
  data: () => ({
    facilityCheckResult: {
      safCheckTypeCd: '', // 설비점검종류
      safFacilityCheckSchYmd: '', // 설비점검예정일
      safFacilityCds: [], // 안전설비코드
    },
    searchParam: {
      safFacilityTypeCd: '', // 설비유형코드
      deptCd: '', // 관리부서 코드
      facilityNm: '', // 설비명
      processNo: '', // 공정
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    baseWidth: 9,
    editable: false,
    isInsert: false,
    comboCheckTypeItems: [], // 설비점검종류
    comboFacilityTypeItems: [], // 설비유형 
    comboDeptItems: [], // 관리부서
    comboProcessItems: [], // 공정
    facilityMstValue: [], // 체크된 설비목록
    insertUrl: '',
    searchUrl: '',
  }),
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
      // Url Setting
      this.searchUrl = selectConfig.saf.facilityMst.list.url;
      this.insertUrl = transactionConfig.saf.facilityCheckResult.insert.url;
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '설비유형', name: 'safFacilityTypeNm', width: '150px', },
        { text: '설비코드', name: 'safFacilityCd', width: '130px', },
        { text: '설비명', name: 'facilityNm', width: '150px', },
        { text: '관리부서', name: 'deptNm', width: '150px' },
        { text: '최근설비법정점검일', name: 'lawChkYmd', width: '160px', align: 'center' },
        { text: '설비법정점검예정일', name: 'lawChkSchYmd', width: '160px', align: 'center' },
        { text: '최근설비자체점검일', name: 'selfChkYmd', width: '160px', align: 'center' },
        { text: '설비자체점검예정일', name: 'selfChkSchYmd', width: '160px', align: 'center' },
      ];
      this.getComboItems('SAF_FACILITY_CHECK'); // 설비점검종류
      this.getProcessNoItems(); // 공정
      this.getComboFacilityTypeItems(); // 설비유형
      this.getComboCheckKindItems(); // 설비점검종류
      this.getComboDeptItems(); // 관리부서
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공통 마스터 정보 조회 (설비점검종류)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_FACILITY_CHECK') 
        {
          this.comboCheckTypeItems = this.$_.clone(_result.data);
          this.comboCheckTypeItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
          this.searchParam.safCheckTypeCd = '';
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 공정 조회
     */
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': 0, 'processNm': '전체' });
        this.comboProcessItems = _result.data;
        this.searchParam.processNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 설비유형 조회
     */
    getComboFacilityTypeItems () {
      this.$http.url = selectConfig.saf.refInfoFacilityType.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboFacilityTypeItems = this.$_.clone(_result.data);
        this.comboFacilityTypeItems.splice(0, 0, { 'safFacilityTypeCd': '', 'safFacilityTypeNm': '전체' });
        this.searchParam.safFacilityTypeCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 관리부서 조회
     */
    getComboDeptItems (codeGroupCd) {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDeptItems = this.$_.clone(_result.data);
        this.comboDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.searchParam.deptCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 설비 목록 조회 **/
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          if (this.facilityMstValue.length <= 0)
          {
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '설비목록에서 설비를 한개이상 선택하세요.',
              type: 'warning',  // success / info / warning / error
            });
            return;
          }

          // 안전설비코드
          this.$_.forEach(this.facilityMstValue, (item) => {
            this.facilityCheckResult.safFacilityCds.push(item.safFacilityCd);
          });

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
              window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
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
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 320;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 380;
        this.gridOptions.height = calculatedHeight <= 380 ? defaultHeight : calculatedHeight;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
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
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     * 질환 목록 조회 및 수정버튼 보여지도록 처리
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.facilityMstValue = [];
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isInsert = false;
    },
    btnSearchClickedCallback () {
      this.getList();
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      Object.assign(this.$data.facilityCheckResult, this.$options.data().facilityCheckResult);
      // Object.assign(this.$data.searchParam, this.$options.data().searchParam);
      this.facilityMstValue = [];
      this.$validator.reset();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>