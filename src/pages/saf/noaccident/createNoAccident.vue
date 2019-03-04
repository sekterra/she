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
                :param="noAccident"
                :is-submit="isInsertSubmit"
                title="저장"
                color="orange"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editable&&updateMode&&(!isInActiveYn)"
                :action-url="editUrl"
                :param="noAccident"
                :is-submit="isEditSubmit"
                title="저장"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn title="닫기" @btnClicked="btnClosePopup" />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :disabled="isInActiveYn"
                :required="true"
                default="today"
                label="무재해시작일"
                name="startYmd"
                :clearable="true"
                v-model="noAccident.startYmd"
                v-validate="'required'"
                :state="validateState('startYmd')"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :disabled="isInActiveYn"
                :required="true"
                default="today"
                label="무재해달성예정일"
                name="endSchYmd"
                :clearable="true"
                v-model="noAccident.endSchYmd"
                v-validate="'required'"
                :state="validateState('endSchYmd')"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                <y-switch
                  :width="10"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  :disabled="isInActiveYn"
                  label="사용여부"
                  name="useYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="noAccident.useYn"
                  v-validate="'required'"
                  :error-msg="errors.first('useYn')"
                  :state="validateState('useYn')"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-switch
                  :width="8"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  :disabled="isInActiveYn"
                  label="무재해 인시"
                  name="mhUseYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="noAccident.mhUseYn"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-number
                  :width="baseWidth"
                  :editable="editable"
                  ui="bootstrap"
                  :disabled="isInActiveYn"
                  label="목표인시"
                  name="targetMh"
                  v-model="noAccident.targetMh"
                  :required="true"
                  v-validate="'required'"
                  :state="validateState('targetMh')"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-number
                  :width="baseWidth"
                  :editable="editable"
                  :disabled="updateMode||isInActiveYn"
                  ui="bootstrap"
                  label="초기인시"
                  name="initMh"
                  v-model="noAccident.initMh"
                />                 
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                  <b-col sm="4">
                        <y-label label="근무인원(명)"/>
                  </b-col>
                  <b-col sm="8">
                    <b-row>
                      <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                         <y-number
                          :width="6"
                          ui="bootstrap"
                          :disabled="isInActiveYn"
                          label="정규직"
                          name="dayMancntCpy"
                          v-model="noAccident.dayMancntCpy"
                          >
                        </y-number>
                      </b-col>
                      <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                         <y-number
                          :width="6"
                          ui="bootstrap"
                          :disabled="isInActiveYn"
                          label="협력업체"
                          name="dayMancntCon"
                          v-model="noAccident.dayMancntCon"
                          >
                      </y-number>
                      </b-col>
                    </b-row>            
                  </b-col>
                </b-row>               
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                  <b-col sm="4">
                        <y-label label="기본인시(시간)"/>
                  </b-col>
                  <b-col sm="8">
                    <b-row>
                      <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                        <y-number
                        :width="6"
                        ui="bootstrap"
                        :disabled="isInActiveYn"
                        label="평일"
                        name="normMh"
                        v-model="noAccident.normMh"
                        >
                        </y-number>
                      </b-col>
                      <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                        <y-number
                        :width="6"
                        ui="bootstrap"
                        :disabled="isInActiveYn"
                        label="휴일"
                        name="holiMh"
                        v-model="noAccident.holiMh"
                        >
                        </y-number>
                      </b-col>
                    </b-row>     
                  </b-col>
                </b-row>  
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                 <y-switch
                  :width="8"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  :disabled="isInActiveYn"
                  label="무재해 일"
                  name="dayUseYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="noAccident.dayUseYn"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-number
                    :width="baseWidth"
                    ui="bootstrap"
                    :disabled="isInActiveYn"
                    label="목표일"
                    name="targetMh"
                    v-model="noAccident.targetDays"
                    >
                </y-number>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-number
                    :width="baseWidth"
                    ui="bootstrap"
                    :disabled="updateMode||isInActiveYn"
                    label="초기일"
                    name="initDays"
                    v-model="noAccident.initDays"
                    >
                </y-number>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                  <b-col sm="4">
                        <y-label label="기본일(일수)"/>
                  </b-col>
                  <b-col sm="8">
                    <b-row>
                      <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                        <y-number
                          :width="6"
                          ui="bootstrap"
                          :disabled="isInActiveYn"
                          label="평일"
                          name="normMh"
                          v-model="noAccident.normalDays"
                          >
                        </y-number>
                      </b-col>
                      <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                        <y-number
                        :width="6"
                        ui="bootstrap"
                        :disabled="isInActiveYn"
                        label="휴일"
                        name="holiMh"
                        v-model="noAccident.holiDays"
                        >
                        </y-number>
                      </b-col>
                    </b-row>        
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                  <y-select
                    :width="8"
                    :comboItems="selNoaccStypeCds"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    :disabled="isInActiveYn"
                    type="search"
                    :required="true"
                    label="무재해 시작 사유"
                    name="noaccStypeCd"
                    v-model="noAccident.noaccStypeCd"
                    v-validate="'required'"
                    :state="validateState('noaccStypeCd')"
                  />
               </b-col>
               <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                  <y-datepicker
                    :width="8"
                    default="today"
                    :disabled="isInActiveYn"
                    label="시작관련일"
                    name="noaccStypeYmd"
                    :clearable="true"
                    v-model="noAccident.noaccStypeYmd"
                  >
                  </y-datepicker>
               </b-col>
               <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                <y-text
                    :width="10"
                    ui="bootstrap"
                    :disabled="isInActiveYn"
                    label="시작 상세 사유"
                    name="remark"
                    v-model="noAccident.remark"
                    >
                </y-text>
              </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <!-- 팝업 설정 -->
    <y-popup :param="popupOptions"></y-popup>
    <!-- 설비 grid -->
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
            <y-data-table 
              label="과거 무재해 이력"
              ref="dataTable"
              grid-type="edit"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :height="gridOptions.height"
              :editable="editable"
              :excel-down="true"
              :print="true"
            >
            </y-data-table>
          </b-col>
        </b-row>
        <div class="float-right mt-3">
          <y-btn
            v-if="editable&&insertMode"
            :param="noAccident"
            title="저장"
            color="orange"
            beforeSubmit = "beforeInsert"
            @beforeInsert="beforeInsert"
            @btnClicked="btnInsertClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            v-if="editable&&updateMode&&(!isInActiveYn)"
            :param="noAccident"
            title="저장"
            color="orange"
            beforeSubmit = "beforeEdit"
            @beforeEdit="beforeEdit"
            @btnClicked="btnEditClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn title="닫기" @btnClicked="btnClosePopup" />
        </div>
      </b-col>
    </b-row>
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
        safNoAccidentNo: 0,
        pageNm: '',
        noAccUseYn: false,
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
      searchParam: {
        duration: []
      },
      component: null,
      noAccident: {
        safNoAccidentNo: 0,
        startYmd: '',
        endSchYmd: '',
        mhUseYn: 'Y',
        targetMh: '',
        initMh: '',
        normMh: '',
        holiMh: '',
        dayMancntCpy: '',
        dayMancntCon: '',
        dayUseYn: '',
        targetDays: '',
        initDays: '',
        normalDays: '',
        holiDays: '',
        remark: '',
        useYn: 'Y',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',
        totalMh: 0,
        totalDays: 0,
        progressMh: 0,
        bydateMh: '',
        noAccidentDays: 0,
        noaccStypeCd: '', 
        noaccStypeNm: '',
        noaccStypeYmd: '',
        updateYn: 0,
      },
      gridOptions: {
        header: [],
        data: [],
        height: '300',
      },
      baseWidth: 8,
      editable: true,
      insertMode: false,
      updateMode: false,
      selNoaccStypeCds: [], // 시작사유 종류
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      isInsertSubmit: false, 
      isEditSubmit: false,
      deleteValue: null,
      recentendSchYmd: null,
      isInActiveYn: false,
    };
  },
  watch: {
    tabIndex () {
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSize);
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      this.insertUrl = transactionConfig.saf.noAccidentResult.insert.url;
      this.editUrl = transactionConfig.saf.noAccidentResult.edit.url;
      this.searchUrl = selectConfig.saf.noAccidentResult.list.url; 
      this.lastviewUrl = selectConfig.saf.noAccidentResult.getNoaccLastView.url;

      // 수정 또는 신규등록 버튼 Mode
      this.noAccident.safNoAccidentNo = this.popupParam.safNoAccidentNo;

      setTimeout(() => {
        this.getNoaccStypeCds(); // 시작사유 종류  
        if (this.popupParam.safNoAccidentNo !== 0) {
          this.getnoAccident();
          this.updateMode = true;
        } else {
          this.getNoAccList();
          this.insertMode = true;
        }
        if ((this.popupParam.noAccUseYn !== 'Y') && this.updateMode) {
          this.isInActiveYn = true;
        }
      }, 100);


      // 교육 결과 목록 grid 헤더 설정
      this.gridOptions.header = [
        { text: '시작일', name: 'startYmd', width: '120px', align: 'center' },
        { text: '달성예정일', name: 'endSchYmd', width: '110px', align: 'center' },
        { text: '인시', child: 
          [
            { text: '초기인시', name: 'initMh', width: '100px', align: 'center' },
            { text: '누적인시', name: 'totalMh', width: '100px', align: 'center' },
            { text: '목표인시', name: 'targetMh', width: '100px', align: 'center' },
            { text: '진행률', name: 'progressMh', width: '120px', align: 'center' },
            { text: '무재해 일', name: 'noAccidentDays', width: '100px', align: 'left' },
            { text: '일별 생성인시', name: 'bydateMh', width: '140px', align: 'center' },
          ]
        },
        { text: '일', child: 
          [
            { text: '초기일', name: 'initDays', width: '100px', align: 'center' },
            { text: '누적일', name: 'totalDays', width: '100px', align: 'center' },
            { text: '목표일', name: 'targetDays', width: '100px', align: 'center' },
          ]
        },
        { text: '무산/시작사유', name: 'remark', width: '140px', align: 'center' },
      ]; 
    },
    getnoAccident () {
      this.$http.url = this.$format(selectConfig.saf.noAccidentResult.get.url, this.popupParam.safNoAccidentNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.noAccident = _result.data;
        this.getNoAccList();
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 조회
    getNoAccList () {
      this.$http.url = this.lastviewUrl;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
        this.recentStartYmd = _result.data[0].startYmd;
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
    // 무재해 시작 사유 종류
    getNoaccStypeCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_NOACC_STYPE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.selNoaccStypeCds = this.$_.clone(_result.data);
        this.selNoaccStypeCds.splice(0, 0, { 'code': null, 'codeNm': '선택하세요.' });
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
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - 260;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    
    /** validation checking(필요없으면 지워주세요) **/
    checkValidationEdit () {
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
    
    /** button 관련 이벤트 **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {

        this.noAccident.updateYn = 0;

        var startYmd1 = this.$comm.convertStringToDate(this.noAccident.startYmd, '-'); 
        var endSchYmd1 = this.$comm.convertStringToDate(this.noAccident.endSchYmd, '-'); 
        var recentStartYmd1 = this.$comm.convertStringToDate(this.recentStartYmd, '-'); 
        var routine = this.$comm.getDatediff(startYmd1, endSchYmd1);
        if (routine < 0) {
          window.getApp.$emit('ALERT', {
            title: '에러',
            message: '달성예정일은 시작일 이전 일 수 없습니다.',
            type: 'error',
          });
          return;
        }  
        var routine2 = this.$comm.getDatediff(recentStartYmd1, startYmd1);
        if (routine2 <= 0) {
          window.getApp.$emit('ALERT', {
            title: '에러',
            message: '시작일은 그리드화면에 나오는 최근 등록한 시작일의 다음날부터 가능합니다.',
            type: 'error',
          });
          return;
        }  
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.checkValidationInsert();
            },
          });
        }
        else {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    beforeEdit () {
      this.$validator.validateAll().then((_result) => {

        this.noAccident.updateYn = 1;

        var startYmd1 = this.$comm.convertStringToDate(this.noAccident.startYmd, '-'); 
        var endSchYmd1 = this.$comm.convertStringToDate(this.noAccident.endSchYmd, '-'); 
        var routine = this.$comm.getDatediff(startYmd1, endSchYmd1);
        if (routine < 0) {
          window.getApp.$emit('ALERT', {
            title: '에러',
            message: '달성예정일은 시작일 이전 일 수 없습니다.',
            type: 'error',
          });
          return;
        }  
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              this.checkValidationEdit();
            },
          });
        }
        else {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.noAccident, this.$options.data().noAccident);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.noAccident.safNoAccidentNo = _result.data;
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