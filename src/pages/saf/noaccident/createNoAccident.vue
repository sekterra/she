<!--
  목적 : 사업장 무재해 등록/수정
  작성자 : kth
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <!-- 사업장 무재해 상세 -->
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="무재해 등록" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="editable&&insertMode"
                :action-url="insertUrl"
                :param="edueResultMaster"
                :is-submit="isInsertSubmit"
                title="신규등록"
                color="orange"
                action-type="POST"
              />
              <y-btn
                v-if="editable&&updateMode"
                :action-url="editUrl"
                :param="edueResultMaster"
                :is-submit="isEditSubmit"
                title="수정"
                color="orange"
                action-type="PUT"
              />
              <y-btn title="닫기" @btnClicked="btnClosePopup" />
            </div>
          </b-col>
        </b-row>
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
  name: 'create-noAccident',
  props: {
    popupParam: {
      type: Object,
      default: {
        safFacilityCd: 0,
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
      component: null,
      noAccidentResult: {
        startYmd: '',
        endSchYmd: '',
        mhUseYn: '',
        targetMh: 0,
        initMh: 0,
        normMh: 0,
        holiMh: 0,
        dayMancntCpy: 0,
        dayMancntCon: 0,
        dayUseYn: 0,
        targetDays: 0,
        initDays: 0,
        normalDays: 0,
        holiDays: 0,
        remark: '',
        useYn: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',

      },
      baseWidth: 8,
      editable: true,
      insertMode: false,
      updateMode: false,
      comboFacilityTypeItems: [], // 설비유형 
      processNoItems: [], // 공정
      comboDeptItems: [], // 관리부서
      eduCourseCds: [], // 교육과정
      eduTypeCds: [], // 교육구분
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      isInsertSubmit: false, 
      isEditSubmit: false,
      deleteValue: null,
    };
  },
  watch: {
    tabIndex () {
      this.loadComponent();
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeInsert () {
  },
  beforeEdit () {
  },
  beforeDelete () {
    window.getApp.$emit('CONFIRM', {
      title: '확인',
      message: '삭제하시겠습니까?',
      type: 'info',  
      confirmCallback: () => {
        this.deleteValue = {
          'data': Object.values(this.$_.clone(this.selectedValue))
        };
        this.isDelete = true;
      }
    });
  },
  created () {
  },
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
      this.insertUrl = transactionConfig.saf.noAccidentResult.insert.url;
      this.editUrl = transactionConfig.saf.noAccidentResult.edit.url;
      // this.getFacilityTypeItems(); // 설비유형
     
    },
    // 설비유형
    getFacilityTypeItems () {
      this.$http.url = selectConfig.facilityType.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboFacilityTypeItems = this.$_.clone(_result.data);
        this.comboFacilityTypeItems.splice(0, 0, { 'safCheckKindNo': '', 'safCheckKindNm': '전체' });
        this.facilityMst.safFacilityTypeCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 공정
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': 0, 'processNm': '전체' });
        this.processNoItems = _result.data;
        this.facilityMst.processNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
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
        this.eduTypeCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
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
      Object.assign(this.$data.facilityMst, this.$options.data().facilityMst);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.safFacilityCd = _result.data;
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
      this.getDataList();
      this.isDelete = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
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