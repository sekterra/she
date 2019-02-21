<!--
  목적 : 교육 결과 등록/수정
  작성자 : kyc
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <!-- 유형별 설비 상세 -->
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="유형별 설비 등록" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                v-if="editable"
                title="초기화"
                @btnClicked="btnClearClickedCallback" 
              />
              <y-btn
                v-if="updateCompleMode"
                :action-url="editCompleUrl"
                :param="edueResultMaster"
                :is-submit="isEditSubmit"
                title="완료"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEditComple"
                @beforeEditComple ="beforeEditComple"
                @btnClicked="btnEditCompleClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editable&&insertMode"
                :action-url="insertUrl"
                :param="edueResultMaster"
                :is-submit="isInsertSubmit"
                title="신규등록"
                color="orange"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editable&&updateMode"
                :action-url="editUrl"
                :param="edueResultMaster"
                :is-submit="isEditSubmit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="editable&&updateMode"
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
              <y-btn
                  title="닫기"
                  @btnClicked="btnClosePopup" 
                />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :required="true"
                :comboItems="eduCourseCds"
                itemText="codeNm"
                itemValue="code"
                v-validate="'required'"
                ui="bootstrap"
                name="eduCourseCd"
                label="교육과정"
                v-model="edueResult.eduCourseCd"
                :state="validateState('eduCourseCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-radio
                :width="baseWidth"
                :editable="editable"
                :comboItems="eduTypeCds"
                :required="true"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="교육구분*"
                name="eduTypeCds"
                v-model="edueResult.eduTypeCd"
                v-validate="'required'"
                :state="validateState('eduTypeCds')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :required="true"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="deptCd"
                label="주관부서"
                v-model="edueResult.deptCd"
                :state="validateState('detpCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
               <y-text
                :width="10"
                :editable="editable"
                :required="true"
                ui="bootstrap"
                type="search"
                label="교육명"
                name="eduNm"
                v-model="edueResult.eduNm"
                :state="validateState('eduNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :range="true"
                label="교육기간"
                name="duration"
                v-model="edueResult.duration"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="교육시간"
                name="eduTime"
                v-model="edueResult.eduTime"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="교육장소"
                name="eduPlace"
                v-model="edueResult.eduPlace"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="교육강사"
                name="eduTeacher"
                v-model="edueResult.eduTeacher"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="3000"
                ui="bootstrap"
                label="교육내용"
                name="eduContent"
                v-model="edueResult.eduContent"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 탭 -->
    <b-row class="mt-3"></b-row>
    <el-tabs type="border-card" v-model="tabIndex">
      <el-tab-pane
        v-for="(item, i) in tabItems"
        :key="i"
        stretch
        class="default-tab-pane"
      >
        <span slot="label">
          <i class="el-icon-date"></i>
          {{ item.title }}
        </span>
        <keep-alive>
          <component :is="component" v-if="component" :edueResultMaster.sync="edueResultMaster" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <b-row>
      <b-col sm="12">
        <div class="float-right mt-3">
        </div>
      </b-col>
    </b-row>

    <!-- 팝업 설정 -->
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :width="popupOptions.width"
      :top="popupOptions.top">
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="popupOptions.closeCallback" />
    </el-dialog>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from "@/js/transactionConfig";
export default {
  /** attributes: name, components, props, data **/
  name: 'Create-Edue-Result',
  props: {
    popupParam: {
      type: Object,
      default: {
        safEduRsltNo: 0,
        processStepCd: 0,
        pageNm: '',
      },
    },
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      tabItems: [
        { title: '교육결과', url: './edueResultItem' },
        { title: '첨부파일', url: 'fileUploadPage' },
      ],
      component: null,
      tabIndex: 0,
      edueResultMaster: {
        safEduRsltNo: '',
        edueResult: '',
        eduUserId: [],
        eduResultSummary: '',
      },
      edueResult: {
        safEduRsltNo: '',
        eduCourseCd: '',
        eduTypeCd: '',
        eduNm: '',
        eduSYmd: '',
        eduEYmd: '',
        duration: '',
        eduTime: '',
        eduPlace: '',
        eduTeacher: '',
        eduContent: '',
        eduResultSummary: '',
        processStepCd: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',
        deptCd: '',
      },
      eduRsltPsn: {
        safEduRsltNo: '',
        userId: []
      },
      safEduRsltNo: 0,
      baseWidth: 8,
      editable: true,
      insertMode: false,
      updateMode: false,
      updateCompleMode: false,
      comboFacilityTypeItems: [], // 설비유형 
      processNoItems: [], // 공정
      comboDeptItems: [], // 관리부서
      eduCourseCds: [], // 교육과정
      eduTypeCds: [], // 교육구분
      insertUrl: '',
      editUrl: '',
      editCompleUrl: '',
      deleteUrl: '',
      isInsertSubmit: false, 
      isEditSubmit: false,
      isDelete: false,
      deleteValue: null,
    };
  },
  watch: {
    tabIndex () {
      // this.loadComponent();
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/

  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
    this.loadComponent();
  },
  beforeDestroy () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      
      this.insertUrl = transactionConfig.saf.eduResult.insert.url;
      this.editUrl = transactionConfig.saf.eduResult.edit.url;
      this.deleteUrl = transactionConfig.saf.eduResult.delete.url;
      this.editCompleUrl = transactionConfig.saf.eduResult.editComple.url;

      this.insertMode = true;
      this.getDeptItems();  // 관리부서
      this.getEduCourseCds(); // 교육과정
      this.getEduTypeCds();  // 교육구분

      if (this.popupParam.safEduRsltNo !== 0) {
        this.getDetailData(); 
      }
      if (this.popupParam.processStepCd === "STEP1") {
        this.updateCompleMode = true;
      } else {
        this.updateCompleMode = false;
      }

      this.edueResultMaster.safEduRsltNo = this.popupParam.safEduRsltNo;
      // 수정 또는 신규등록 버튼 Mode
      this.edueResult.safEduRsltNo = this.popupParam.safEduRsltNo;
      if (this.popupParam.safEduRsltNo !== 0) {
        this.updateMode = true;
      } else {
        this.insertMode = true;
      }
    },

    getDetailData () {
      this.$http.url = this.$format(selectConfig.saf.eduResult.get.url, this.popupParam.safEduRsltNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        // this.edueResult = this.$_.clone(_result.data);
        
        this.edueResultMaster = this.$_.clone(_result.data);
        this.edueResult = this.edueResultMaster.edueResult;

        if (this.edueResult !== null) { 
          this.edueResult.duration = [this.edueResult.eduSYmd, this.edueResult.eduEYmd] 
          /* if (this.eduResult.processStepCd == "STEP1") {
              this.updateCompleMode = true;
          }  */
        }
       
        
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });

    },

    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.comboDeptItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 교육과정 종류
    getEduCourseCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_EDU_COURSE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.eduCourseCds = this.$_.clone(_result.data);
        this.eduCourseCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 교육구분 종류
    getEduTypeCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_EDU_TYPE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.eduTypeCds = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    // 탭
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url; 
      
      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else this.component = () => import(`${path}`);
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    /*
    * 수정전 유효성 검사
    */
    beforeInsert () {
      
      if (this.edueResult.duration !== "0") {
        this.edueResult.eduSYmd = this.edueResult.duration[0];
        this.edueResult.eduEYmd = this.edueResult.duration[1];
      }
      this.edueResultMaster.edueResult = this.edueResult;
      this.edueResultMaster.edueResult.eduResultSummary = this.edueResultMaster.eduResultSummary;
      
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '추가하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => { this.checkValidationInsert(); }
      });
    },
    beforeEdit () {
      if (this.edueResult.duration !== "null") {
        this.edueResult.eduSYmd = this.edueResult.duration[0];
        this.edueResult.eduEYmd = this.edueResult.duration[1];
      }
      this.edueResultMaster.edueResult = this.edueResult;
      this.edueResultMaster.edueResult.eduResultSummary = this.edueResultMaster.eduResultSummary;

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '수정하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => { this.checkValidationSave(); }
      });
    },
    beforeDelete () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',  
        confirmCallback: () => {
          this.deleteValue = {
            'data': this.edueResult.safEduRsltNo
          };
          this.isDelete = true;
        }
      });
    },
    beforeEditComple () {
      this.edueResultMaster.edueResult = this.edueResult;

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '완료하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => { this.checkValidationSave(); }
      });
    },
    checkValidationSave () {
      this.$validator.validateAll().then((_result) => {
        
        this.isEditSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEditSubmit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEditSubmit = false;
      });
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsertSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsertSubmit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsertSubmit = false;
      });
    },
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.edueResult, this.$options.data().edueResult);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.edueResult.safEduRsltNo = _result.data;
      this.isInsertSubmit = false;

      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    // 수정
    btnEditClickedCallback (_result) {
      this.isEditSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      this.isDelete = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    // 완료
    btnEditCompleClickedCallback (_result) {
      this.isEditSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '완료되었습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    closePopupUsage () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      this.isEditSubmit = false;
      this.editable = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>