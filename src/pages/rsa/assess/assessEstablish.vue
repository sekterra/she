<!--
  목적 : 평가계획 수립 - 평가계획 수립 관리
  Detail : 평가계획 등록/조회 화면
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
                :width="10"
                ui="bootstrap"
                name="assessNm"
                label="평가명"
                v-model="searchParam.assessNm"
                >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-multi-select
                :width="8"
                :comboItems="comboAssessTypeItems"
                :needDefaultView="true"
                v-model="searchParam.assessTypeNo"
                type="edit"
                itemText="assessNm"
                itemValue="assessTypeNo"
                ui="bootstrap"
                label="평가유형"
                name="assessTypeNoSearch"
              >
              </y-multi-select>
              <!-- <y-select
                :width="8"
                :comboItems="comboAssessTypeItems"
                itemText="assessNm"
                itemValue="assessTypeNo"
                ui="bootstrap"
                name="assessTypeNo"
                label="평가유형"
                v-model="searchParam.assessTypeNo"
              /> -->
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboRegRegdemItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="regRegdemSearch"
                label="정기/수기"
                v-model="searchParam.regRegdem"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
                :width="10"
                ui="bootstrap"
                name="assessDesc"
                label="상세내용" 
                v-model="searchParam.assessDesc"
                >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <!-- <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              title="신규등록"
              color="orange"
              @btnClicked="btnSearchCheckResultOpenPopupClicked" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div> -->
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            @tableLinkClicked="tableLinkAccidentTitleClicked"
            label="평가계획 목록"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
    
    <!-- 등록 -->
    <b-row class="mt-3" ref="editBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="평가계획 상세" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="30"
              :required="true"
              ui="bootstrap"
              name="assessNm"
              label="평가명"
              v-model="riskAssessPlan.assessNm"
              v-validate="'required'"
              :state="validateState('assessNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              :required="true"
              ui="bootstrap"
              label="담당자"
              name="userNm"
              v-model="riskAssessPlan.userNm"
              :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
              @searchUser="btnSearchUserClicked"
              v-validate="'required'"
              :state="validateState('userNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-multi-select
                :width="8"
                :comboItems="comboAssessTypeSaveItems"
                :needDefaultView="true"
                :required="true"
                v-model="riskAssessPlan.assessTypeNo"
                type="edit"
                itemText="assessNm"
                itemValue="assessTypeNo"
                ui="bootstrap"
                label="평가유형"
                name="assessTypeNo"
                v-validate="'required'"
                :state="validateState('assessTypeNo')"
              >
              </y-multi-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboRegRegdemSaveItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="regRegdem"
                label="정기/수기"
                v-model="riskAssessPlan.regRegdem"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                type="assessPriod"
                label="평가기간"
                v-model="riskAssessPlan.assessPriod"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="150"
                ui="bootstrap"
                name="assessDesc"
                label="상세내용"
                v-model="riskAssessPlan.assessDesc"
              />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
              <y-btn
                title="초기화"
                @btnClicked="btnClearClickedCallback" 
                />
              <y-btn
                v-if="!editable"
                :action-url="insertUrl"
                :param="riskAssessPlan"
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
                :param="riskAssessPlan"
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
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-assess-establish',
  props: {
  },
  data: () => ({
    searchParam: {
      assessNm: '', // 평가명
      assessTypeNo: [], // 평가유형
      regRegdem: '', // 정시/수기
      assessDesc: '', // 상세내용
    },
    riskAssessPlan: {
      assessPlanNo: '', // key
      assessNm: '', // 평가명
      userId: '', // 담당자 ID
      userNm: '', // 담당자
      assessTypeNo: [], // 평가유형
      regRegdem: null, // 정시/수기
      assessPriod: [], // 평가 기간
      assessStartDate: '', // 평가 시작일
      assessEndDate: '', // 평가 종료일
      assessDesc: '', // 상세내용
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
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      param: {},
      width: '90%',
      top: '10px',
      closeCallback: null
    },
    editable: false,
    isInsert: false,
    isEdit: false,
    comboAssessTypeItems: [], // 평가유형
    comboAssessTypeSaveItems: [], // 평가유형 (저장시)
    comboRegRegdemItems: [], // 정기/수기
    comboRegRegdemSaveItems: [], // 정기/수기 (저장시)
    searchUrl: '',
    insertUrl: '',
    editUrl: '',
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
    // window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    // window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.searchUrl = selectConfig.rsa.assessEstablish.list.url;   
      this.editUrl = transactionConfig.rsa.assessEstablish.edit.url;
      this.insertUrl = transactionConfig.rsa.assessEstablish.insert.url;
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '평가년도', name: 'assessYear', width: '110px', align: 'center' },
        { text: '정시/수기', name: 'regRegdemNm', width: '110px', align: 'center' },
        { text: '평가유형', name: 'assessTypeNms', width: '110px', align: 'center' },
        { text: '평가명', name: 'assessNm', width: '200px', type: 'link' },
        { text: '시작일', name: 'assessStartDate', width: '150px', align: 'center' },
        { text: '종료일', name: 'assessEndDate', width: '150px', align: 'center' },
      ];
      // 기간 Setting
      var today = this.$comm.getToday();
      // var from = this.$comm.getCalculatedDate(today, '-1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      // var to = this.$comm.getCalculatedDate(today, '1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      setTimeout(() => {
        this.searchParam.period = [today, today];
      }, 100);
      // this.getComboItems('?'); // 정시/수기
      // this.getComboAssessTypeItems(); // 평가유형
      // this.getList(); // 사고등록 목록 조회 
      // this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공통 마스터 정보 조회 (정기/수기)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboRegRegdemItems = this.$_.clone(_result.data);
        this.comboRegRegdemItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.comboRegRegdemSaveItems = this.$_.clone(_result.data);
        this.comboRegRegdemSaveItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
    /**
     * 평가유형 조회
     */
    getComboAssessTypeItems () {
      this.$http.url = selectConfig.rsa.assessType.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboAssessTypeItems = this.$_.clone(_result.data);
        this.comboAssessTypeSaveItems = this.$_.clone(_result.data);
        // this.comboAssessTypeItems.splice(0, 0, { 'assessTypeNo': '', 'assessNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * showAccidentPopup 호출
     * 사고등록 목록에 사고명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkAccidentTitleClicked (header, data) {
      this.showAccidentPopup(data, false);
    },
    /**
     * 해당 사고 상세보는 팝업 open
     */
    showAccidentPopup (data, flag) {
      // this.popupOptions.target = () => import(`${'./accidentDetail.vue'}`);
      // this.popupOptions.title = flag ? '사고발생등록' : '사고';
      // this.popupOptions.param = {
      //   safAccidentNo: data.safAccidentNo, // 사내사고번호
      //   accidentTitle: data.accidentTitle, // 사고명
      //   accidentNum: data.accidentNum, // 발행번호
      //   accidentStepCd: data.accidentStepCd, // 사내사고진행단계

      //   tabIndex: 0,
      // };
      // this.popupOptions.visible = true;
      // this.popupOptions.closeCallback = this.closePopup;
    },
    /** 위험성 평가계획 수립 목록 검색 **/
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
    /**
     *  팝업 안 보이도록 설정 후 getReserveData 호출
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      if (data === null || data === undefined) return;
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getList();
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
    // setGridSize () {
    //   var defaultHeight = 300;
    //   window.getApp.$emit('LOADING_SHOW');
    //   setTimeout(() => { 
    //     var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
    //     this.gridOptions.height = calculatedHeight <= 250 ? defaultHeight : calculatedHeight;
    //     window.getApp.$emit('LOADING_HIDE');
    //   }, 600);
    // },
    /** button 관련 이벤트 **/
    /**
     * 검색박스 숨기기/보이기 처리 후 setGridSize 호출
     */
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      // this.setGridSize();
    },
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    // btnSearchCheckResultOpenPopupClicked () {
    //   var data = {
    //     safAccidentNo: 0, // 사내사고번호
    //     accidentTitle: '', // 사고명
    //     accidentNum: '', // 발행번호
    //     accidentStepCd: '', // 사내사고진행단계 (계획)
    //     accidentYmd: '', // 발생일
    //     accidentHour: '', // 발생시
    //     accidentMinute: '', // 발생분
    //     deptCd: '', // 발생부서코드
    //     area: '', // 발생장소
    //     weatherCd: null, // 날씨코드
    //     accidentTypeEtc: '', // 사고유형기타
    //   };
    //   this.showAccidentPopup(data, true);
    // },
    btnSearchClickedCallback () {
      this.getList();
    },
    btnSearchUserClicked () {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;

      if (data.user) {
        this.riskAssessPlan.userId = data.user.userId;
        this.riskAssessPlan.userNm = data.user.userNm;
      }
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.testItem, this.$options.data().testItem);
      this.$validator.reset();
    },
    /**
     * 평가계획   목록 조회
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
      this.isEdit = false;
    },
    /**
     * 평가계획   목록 조회 및 수정 버튼 보이도록 처리
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.riskAssessPlan.assessPlanNo = this.$_.clone(_result.data);
      this.getList();
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isInsert = false;
      this.editable = true;
    },
    /** end button 관련 이벤트 **/
  }
};
</script>