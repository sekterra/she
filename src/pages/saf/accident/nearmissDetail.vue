<!--
  목적 : 사고 등록/접수/조치결과
  Detail : 1. 등록 : 사고 등록 수정 화면으로 사고발생시 발생부서에서 등록.
               2. 접수 : 사고 등록 단계에서 요청된 사고를 접수 및 확인하고 조사여부 검토 후에 조사대상인 경우 조사계획을 세우고, 그 내역을 등록하는 화면.
               3. 조치 : 사고 조사결과를 등록하고 개선사항 발생시 개선요청하는 화면.
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="아차사고 상세" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="editCompletable"
                :action-url="editCompleUrl"
                :param="nearmiss"
                :is-submit="isComple"
                title="완료"
                color="black"
                action-type="PUT"
                beforeSubmit = "beforeEditComple"
                @beforeEditComple ="beforeEditComple"
                @btnClicked="btnEditCompleClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="insertable"
                :action-url="insertUrl"
                :param="nearmiss"
                :is-submit="isInsert"
                title="저장"
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
                :param="nearmiss"
                :is-submit="isEdit"
                title="저장"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="editable"
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
        <b-card >
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :disabled="true"
              ui="bootstrap"
              label="발행번호"
              name="nearmissNum"
              v-model="nearmiss.nearmissNum"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                  <y-datepicker
                    :width="8"
                    :required="true"
                    :disabled="disabled"
                    label="발생일자"
                    name="nearmissYmd"
                    v-model="nearmiss.nearmissYmd"
                    v-validate="'required'"
                    :state="validateState('nearmissYmd')"
                  >
                  </y-datepicker>
                </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6 px-1">
                    <y-select
                      :width="12"
                      :comboItems="comboHourItems"
                      :disabled="disabled"
                      itemText="hourNm"
                      itemValue="hour"
                      ui="bootstrap"
                      name="nearmissHour"
                      v-model="nearmiss.nearmissHour"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6 px-1">
                    <y-select
                      :width="12"
                      :comboItems="comboMinuteItems"
                      :disabled="disabled"
                      itemText="minuteNm"
                      itemValue="minute"
                      ui="bootstrap"
                      name="nearmissMinute"
                      v-model="nearmiss.nearmissMinute"
                    >
                    </y-select>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            </b-col>
             <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-select
                  :width="8"
                  :comboItems="comboDeptItems"
                  :required="true"
                  :disabled="disabled"
                  itemText="deptNm"
                  itemValue="deptCd"
                  ui="bootstrap"
                  name="deptCd"
                  label="발생부서"
                  v-model="nearmiss.deptCd"
                  v-validate="'required'"
                  :state="validateState('deptCd')"
                >
                </y-select>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-text
                :width="8"
                :maxlength="30"
                :disabled="disabled"
                label="발생장소"
                ui="bootstrap"
                name="area"
                v-model="nearmiss.area"
                v-validate="'required'"
                :state="validateState('area')"
                >
                </y-text>
              </b-col>
            </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                  <y-text
                  :width="8"
                  ui="bootstrap"
                  label="부서"
                  :disabled="true"
                  name="showDeptNm"
                  v-model="nearmiss.showDeptNm"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                  <y-text
                  :width="8"
                  label="등록자"
                  ui="bootstrap"
                  :disabled="true"
                  name="showUserNm"
                  v-model="nearmiss.showUserNm"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="150"
              :required="true"
              :disabled="disabled"
              ui="bootstrap"
              label="사고명"
              name="nearmissTitle"
              v-model="nearmiss.nearmissTitle"
              v-validate="'required'"
              :state="validateState('nearmissTitle')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :required="true"
                :disabled="disabled"
                :comboItems="comboOccTypeItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="comboOccTypeItems"
                label="발생유형"
                v-model="nearmiss.occTypeCd"
                v-validate="'required'"
                :state="validateState('comboOccTypeItems')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="50"
              :disabled="disabled"
              ui="bootstrap"
              label="발생유형 기타"
              name="nearmissTypeEtc"
              v-model="nearmiss.nearmissTypeEtc"
              />
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCauTypeItems"
                :required="true"
                :disabled="disabled"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="원인유형"
                name="comboCauTypeItems"
                v-model="nearmiss.cauTypeCd"
                v-validate="'required'"
                :state="validateState('comboCauTypeItems')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                :disabled="disabled"
                ui="bootstrap"
                label="원인유형 기타"
                name="cauTypeEtc"
                v-model="nearmiss.cauTypeEtc"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="true"
                :required="true"
                :maxlength="150"
                :disabled="disabled"
                ui="bootstrap"
                label="발생내용"
                name="contents"
                v-model="nearmiss.contents"
                v-validate="'required'"
                :state="validateState('contents')"
              >
              </y-textarea>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="true"
                :maxlength="150"
                :disabled="disabled"
                ui="bootstrap"
                label="추정원인"
                name="provReason"
                v-model="nearmiss.provReason"
              >
              </y-textarea>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="150"
                :editable="true"
                :disabled="disabled"
                ui="bootstrap"
                label="초기대책"
                name="bgnMeas"
                v-model="nearmiss.bgnMeas"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
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
          <component :is="component" v-if="component" :nearmiss="nearmiss" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-nearmiss-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        
        safNearmissNo: 0, // 아차사고 번호
        nearmissTitle: '', // 아차사고명
        nearmissNum: '', // 발행번호
        processStepCd: '', // 진행단계
        
        nearmissYmd: '', // 발생일
        nearmissHour: '', // 발생시간
        nearmissMinute: '', // 발생분
        deptCd: '', // 부서코드
        area: '', // 발생장소
        occTypeCd: '', // 발생유형코드
        nearmissTypeEtc: '', // 발생유형기타
        contents: '', // 발생내용
        cauTypeCd: '', // 원인유형코드
        cauTypeEtc: '', // 원인유형기타
        bgnMeas: '', // 초기대책
        provReason: '', // 추정원인
        createUserId: '', // 등록자
        createDeptCd: '', // 등록자 부서
        createDt: '', // 작성일
        updateUserId: '', // 수정자
        updateDeptCd: '', // 수정자 부서
        updateDt: '', // 수정일
        showDeptNm: '', // 사용자부서
        showUserNm: '', // 사용자명
      },
    },
  },
  data: () => ({
    // TODO : 현재까지 파악된 바로는 tab은 같은 폴더 또는 하위 폴더의 컴포넌트만 접근이 가능한 것으로 파악됨
    //                즉, 반드시 메인페이지 역할을 하는 vue와 동일 폴더나 하위 폴더에 tabItem 역할을 하는 vue 파일을 위치 시킬 것
    tabItems: [
      { title: '개선사항', url: './nearmissTap' },
      { title: '첨부파일', url: 'fileUploadPage' },
    ],
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
    tabIndex: 0,
    
    insertable: false,
    editable: false,
    editCompletable: false,
    disabled: false,
    isInsert: false,
    isEdit: false,
    isComple: false,
    isDelete: false,
    nearmiss: {
      safNearmissNo: 0, // 아차사고 번호
      nearmissTitle: '', // 아차사고명
      nearmissNum: '', // 발행번호
      processStepCd: '', // 진행단계
      nearmissYmd: '', // 발생일
      nearmissHour: null, // 발생시간
      nearmissMinute: null, // 발생분
      deptCd: null, // 부서코드
      area: '', // 발생장소
      occTypeCd: null, // 발생유형코드
      nearmissTypeEtc: '', // 발생유형기타
      contents: '', // 발생내용
      cauTypeCd: null, // 원인유형코드
      cauTypeEtc: '', // 원인유형기타
      bgnMeas: '', // 초기대책
      provReason: '', // 추정원인
      createUserId: '', // 등록자
      createDeptCd: '', // 등록자 부서
      createDt: '', // 작성일
      updateUserId: '', // 수정자
      updateDeptCd: '', // 수정자 부서
      updateDt: '', // 수정일
      showDeptNm: '', // 사용자부서
      showUserNm: '', // 사용자명
    },
    comboHourItems: [], // 시
    comboMinuteItems: [], // 분
    comboDeptItems: [], // 주관부서
    comboOccTypeItems: [], // 발생유형
    comboCauTypeItems: [], // 원인유형

    insertUrl: "",
    editUrl: "",
    editCompleUrl: "",
    deleteUrl: "",
    deleteValue: null,

    accidentHourMinute: '', // 발생시분
    isEtcOccTypeEtc: false,
    isEtcCauTypeEtc: false,
  }),
  watch: {
    'tabIndex': function (newValue, oldValue) {
      this.loadComponent();
    },
    /* 'nearmiss.occTypeCd': function (newValue, oldValue) {
      if (this.nearmiss !== "" && this.nearmiss.occTypeCd === 'OCC10') { // 기타
        this.isEtcOccTypeEtc = true;
      }
      else
      {
        this.isEtcOccTypeEtc = false;
      }
    },
    'nearmiss.cauTypeCd': function (newValue, oldValue) {
      if (this.nearmiss !== "" && this.nearmiss.cauTypeCd === 'CAU13') { // 기타
        this.isEtcCauTypeEtc = true;
      }
      else
      {
        this.isEtcCauTypeEtc = false;
      }
    }, */
    
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
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // 시 분 setting
        var i = 0;
        var detailItemsCau = "";
        var detailItemsOcc = "";
        for (; i < 24; i++)
        {
          this.comboHourItems.push({
            hourNm: i + '시',
            hour: i
          });
        }
        
        i = 0;
        for (; i < 60; i++)
        {
          this.comboMinuteItems.push({
            minuteNm: i + '분',
            minute: i
          });
        }
      }, 300);

      this.getComboItems('SAF_OCC_TYPE'); // 발생유형
      this.getComboItems('SAF_CAU_TYPE'); // 원인유형
      this.getComboDeptItems(); // 주관부서, 수행부서
      // Url Setting
      this.insertUrl = transactionConfig.saf.nearmiss.insert.url;
      this.editUrl = transactionConfig.saf.nearmiss.edit.url;
      this.editCompleUrl = transactionConfig.saf.nearmiss.editComple.url;
      this.deleteUrl = transactionConfig.saf.nearmiss.delete.url;

      this.getData();



    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;

      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else if (path === 'nearmissTap') this.component = () => import('@/pages/saf/accident/nearmissTap');
      else this.component = () => import(`${path}`);
    },
    /* 데이터 조회 */
    getData () {
      this.$http.url = this.$format(selectConfig.saf.nearmiss.get.url, this.popupParam.safNearmissNo);
      this.$http.type = 'get'; 
      this.$http.request((result) => {
        if (result.data !== "") {
          this.nearmiss = this.$_.clone(result.data);
        }

        // 데이터 조회후 진핸단계에 따른 버튼, 셀렉트 박스 disable 처리
        if (this.nearmiss.processStepCd === 'NEMS1') {
          this.insertable = false
          this.editable = true;
          this.editCompletable = true;
        } else if (this.nearmiss.processStepCd === 'NEMS2' || this.nearmiss.processStepCd === 'NEMS3') {
          this.insertable = false
          this.editable = false; 
          this.editCompletable = false;
          this.disabled = true;
        } else {
          this.insertable = true;
          this.editable = false; 
        }

        this.nearmiss.nearmissYmd = (this.nearmiss.nearmissYmd ? this.nearmiss.nearmissYmd : this.$comm.getToday()); 
        this.nearmiss.nearmissHour = (this.nearmiss.nearmissHour ? this.nearmiss.nearmissHour : '10');
        this.nearmiss.nearmissMinute = (this.nearmiss.nearmissMinute ? this.nearmiss.nearmissMinute : '15');
        this.setDetailData();

        
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });

    },
    // 현재 사용자
    setDetailData () {
      if (this.popupParam.safNearmissNo === 0) {
        this.nearmiss.showDeptNm = "열린기술";
        this.nearmiss.showUserNm = "관리자";
      }
    },

    /**
     * 공통 마스터 정보 조회 ( 발생유형)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_OCC_TYPE')
        {
          this.detailItemsOcc = this.$_.clone(_result.data);
          this.detailItemsOcc.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
          this.comboOccTypeItems = this.detailItemsOcc;
        }
        if (codeGroupCd === 'SAF_CAU_TYPE')
        {
          this.detailItemsCau = this.$_.clone(_result.data);
          this.detailItemsCau.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
          this.comboCauTypeItems = this.detailItemsCau;
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 점검주관부서, 점검수행부서 조회
     */
    getComboDeptItems (codeGroupCd) {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDeptItems = this.$_.clone(_result.data);
        this.comboDeptItems.splice(0, 0, { 'deptCd': null, 'deptNm': '선택하세요' });
        // this.popupParam.deptCd = this.popupParam.deptCd;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.isComple = false;
      this.isDelete = false;

      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },

    /** end button 관련 이벤트 **/
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.isInsert = false;

      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
      this.popupParam.safNearmissNo = this.$_.clone(_result.data);
      this.init();
      // this.closePopupUsage();
    },
    // 수정
    btnEditClickedCallback (_result) {
      this.isEdit = false;
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
      this.isComple = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '완료되었습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    
    /** 완료 하기전 UI단 유효성 검사 **/
    beforeEditComple () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '완료하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationComple();
        }
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '저장하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationSave();
        }
      });
    },
    beforeInsert () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '저장하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationInsert();
        }
      });
    },
    beforeDelete () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.deleteValue = {
            'data': this.nearmiss.safNearmissNo
          };
          this.isDelete = true;
        }
      });
    },
    /**
     * 수정전 유효성 검사
     */
    checkValidationSave () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isEdit = false;
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    /**
     * 완료전 유효성 검사
     */
    checkValidationComple () {
      this.$validator.validateAll().then((_result) => {
        this.isComple = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isComple) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isComple = false;
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isInsert = false;
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },

    closePopupUsage () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },

    // 팝업창 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
  }

  
};
</script>

