<!--
  목적 : 설비점검결과 등록/상세
  Detail : 설비점검결과 등록/수정 화면
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
            <y-label label="설비점검결과 상세" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn 
                v-if="completeable"
                :action-url="editUrl"
                :param="facilityCheckResultDetail"
                :is-submit="isComplete"
                title="완료"
                color="black"
                action-type="PUT"
                beforeSubmit = "beforeComplete"
                @beforeComplete="beforeComplete"
                @btnClicked="btnCompleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="editable"
                :action-url="editUrl"
                :param="facilityCheckResultDetail"
                :is-submit="isEdit"
                title="저장"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="deleteable"
                color="red"
                title="삭제"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="설비점검종류"
              name="safFacilityCheckNm"
              v-model="facilityCheckResultDetail.safFacilityCheckNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="설비유형"
              name="safFacilityTypeNm"
              v-model="facilityCheckResultDetail.safFacilityTypeNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :disabled="!completeable || this.popupParam.checkStepCd === 'CHS03'"
                label="설비점검일"
                name="safFacilityCheckYmd"
                v-model="facilityCheckResultDetail.safFacilityCheckYmd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="설비예정일"
              name="safFacilityCheckSchYmd"
              v-model="facilityCheckResultDetail.safFacilityCheckSchYmd"
              />
            </b-col>
            <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-datepicker
                    :width="6"
                    :disabled="!completeable || this.popupParam.checkStepCd === 'CHS03'"
                    label="설비점검일/예정일"
                    name="safFacilityCheckYmd"
                    v-model="facilityCheckResultDetail.safFacilityCheckYmd"
                  >
                  </y-datepicker>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-label :label="facilityCheckResultDetail.safFacilityCheckSchYmd"></y-label>
                </b-col>
              </b-row>
            </b-col> -->
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="설비코드"
              name="safFacilityCd"
              v-model="facilityCheckResultDetail.safFacilityCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="설비코드명"
              name="facilityNm"
              v-model="facilityCheckResultDetail.facilityNm"
              />
            </b-col>
            <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-text
                  :width="6"
                  :disabled="true"
                  ui="bootstrap"
                  label="설비코드/명"
                  name="safFacilityCd"
                  v-model="facilityCheckResultDetail.safFacilityCd"
                  >
                  </y-text>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="facilityNm"
                  v-model="facilityCheckResultDetail.facilityNm"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col> -->
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
          <component :is="component" v-if="component" :facilityCheckResultDetail.sync="facilityCheckResultDetail" :tabParam.sync="tabParam" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-2">
          <y-btn 
            v-if="completeable"
            title="완료"
            color="black"
            @btnClicked="beforeComplete" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn 
            v-if="editable"
            title="저장"
            color="orange"
            @btnClicked="beforeEdit" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn 
            v-if="deleteable"
            color="red"
            title="삭제"
            @btnClicked="btnDeleteClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
              title="닫기"
              size="mini"
              @btnClicked="closePopup" 
          />
        </div>  
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-facility-check-result-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        safFacilityCheckResultNo: 0, // 설비점검결과번호
        safFacilityCheckCd: '', // 설비점검종류 코드
        safFacilityCheckNm: '', // 설비점검종류
        safFacilityCheckYmd: '', // 설비점검일
        safFacilityCheckSchYmd: '', // 설비점검예정일
        safFacilityTypeCd: '', // 안전설비유형코드
        safFacilityTypeNm: '', // 안전설비유형명
        safFacilityCd: '', // 안전설비코드
        facilityNm: '', // 설비명
        checkStepCd: '', // 점검진행상태
        safFacilityCheckResult: null, // 설비점검결과요약
      },
    },
  },
  data: () => ({
    // TODO : 현재까지 파악된 바로는 tab은 같은 폴더 또는 하위 폴더의 컴포넌트만 접근이 가능한 것으로 파악됨
    //                즉, 반드시 메인페이지 역할을 하는 vue와 동일 폴더나 하위 폴더에 tabItem 역할을 하는 vue 파일을 위치 시킬 것
    tabItems: [
      { title: '결과', url: './facilityItemResult' },
      { title: '점검자', url: './facilityCheckInspector' },
      { title: '개선사항', url: 'imprActTab' },
      { title: '첨부파일', url: 'fileUploadPage' },
    ],
    component: null,
    tabIndex: 0,
    facilityCheckResultDetail: {
      safFacilityCheckResultNo: 0, // 설비점검결과번호
      safFacilityCheckCd: '', // 설비점검종류 코드
      safFacilityCheckNm: '', // 설비점검종류
      safFacilityCheckYmd: '', // 설비점검일
      safFacilityCheckSchYmd: '', // 설비점검예정일
      safFacilityTypeCd: '', // 안전설비유형코드
      safFacilityTypeNm: '', // 안전설비유형명
      safFacilityCd: '', // 안전설비코드
      facilityNm: '', // 설비명
      checkStepCd: '', // 점검진행상태
      safFacilityCheckResult: null, // 설비점검결과요약

      facilityItemResults: [],
      innerTeamData: [],
      outerTeamData: [],
      facilityCheckInspectors: [],
      isComplete: 0,
      isResult: 0,
    },
    // 개선조치를 위한 변수
    tabParam: {
      imprClassCd: '',
      refTableId: 0,
      editable: true,
    },
    editable: false,
    deleteable: false,
    completeable: false,
    isInsert: false,
    isEdit: false,
    isComplete: false,
    deleteUrl: '',
    editUrl: '',
  }),
  watch: {
    'popupParam.safFacilityCheckResultNo': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckResultNo = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCheckCd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckCd = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCheckNm': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckNm = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCheckYmd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckYmd = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCheckSchYmd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckSchYmd = this.$_.clone(newValue);
    },
    'popupParam.safFacilityTypeCd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityTypeCd = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCd = this.$_.clone(newValue);
    },
    'popupParam.facilityNm': function (newValue, oldValue) {
      this.facilityCheckResultDetail.facilityNm = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCheckResult': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckResult = this.$_.clone(newValue);
    },
    'popupParam.checkStepCd': {
      handler: function (newValue, oldValue) {
        this.facilityCheckResultDetail.checkStepCd = this.$_.clone(newValue);
      },
      deep: true
    },
    'tabIndex': function (newValue, oldValue) {
      this.loadComponent();
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
    this.loadComponent();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      this.facilityCheckResultDetail.checkStepCd = this.popupParam.checkStepCd;
      setTimeout(() => {
        this.popupParam.safFacilityCheckYmd = this.$comm.getToday();
        // 개선조치를 위한 변수 Setting
        this.tabParam.imprClassCd = 'ICL04';
        this.tabParam.refTableId = this.popupParam.safFacilityCheckResultNo;

        this.facilityCheckResultDetail = this.$_.clone(this.popupParam);
        // this.checkResultDetail.safFacilityCheckSchYmd = '(점검예정일 : ' + this.facilityCheckResultDetail.safFacilityCheckSchYmd + ')';
        this.facilityCheckResultDetail.safFacilityCheckSchYmd = this.facilityCheckResultDetail.safFacilityCheckSchYmd ? this.facilityCheckResultDetail.safFacilityCheckSchYmd : '';

        this.setBtnVisible();
      }, 300);
      // Url Setting
      this.editUrl = transactionConfig.saf.facilityCheckResult.edit.url;
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;

      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else if (path === 'imprActTab') this.component = () => import('@/pages/saf/imprAct/imprActTab');
      else this.component = () => import(`${path}`);
    },
    setBtnVisible () {
      if (this.popupParam.checkStepCd === 'CHS01')
      {
        this.tabParam.editable = true;
        this.editable = true;
        this.deleteable = true;
        this.completeable = true;
      }
      else if (this.popupParam.checkStepCd === 'CHS02')
      {
        this.tabParam.editable = true;
        this.editable = true;
        this.deleteable = true;
        this.completeable = true;
      }
      else if (this.popupParam.checkStepCd === 'CHS03')
      {
        this.tabParam.editable = false;
        this.editable = false;
        this.deleteable = false;
        this.completeable = true;
      }
      else if (this.popupParam.checkStepCd === 'CHS04')
      {
        this.tabParam.editable = false;
        this.editable = false;
        this.deleteable = false;
        this.completeable = false;
      }
    },
    beforeComplete () {
      this.saveCheckResult(1, '완료');
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      this.saveCheckResult(0, '저장');
    },
    saveCheckResult (completeable, alertTitle) {
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          if (!this.facilityCheckResultDetail.safFacilityCheckResult)
          {
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '설비점검결과요약을 입력해주세요.',
              type: 'warning',  // success / info / warning / error
            });
            return;
          }

          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: alertTitle + '하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.facilityCheckResultDetail.facilityCheckInspectors = [];
              this.$_.forEach(this.facilityCheckResultDetail.innerTeamData, (item) => {
                this.facilityCheckResultDetail.facilityCheckInspectors.push(item);
              });
              this.$_.forEach(this.facilityCheckResultDetail.outerTeamData, (item) => {
                this.facilityCheckResultDetail.facilityCheckInspectors.push(item);
              });
              this.facilityCheckResultDetail.isComplete = completeable;
              this.facilityCheckResultDetail.isResult = alertTitle === '저장' ? 1 : 0;
              if (completeable > 0) this.isComplete = true;
              else this.isEdit = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              if (completeable > 0) this.isComplete = false;
              else this.isEdit = false;
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
        if (completeable > 0) this.isComplete = false;
        else this.isEdit = false;
      });
    },
    /**
     *  팝업 안 보이도록 closePopup emit
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      this.$emit('closePopup', {});
    },
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    btnCompleteClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '완료되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isComplete = false;
      
      this.editable = false;
      this.deleteable = false;
      this.completeable = false;
      this.closePopup(null);
    },
    /**
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
      this.closePopup(null);
    },
    /**
     * 설비점검결과 삭제
     *  삭제 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.$http.url = this.$format(transactionConfig.saf.facilityCheckResult.delete.url, this.facilityCheckResultDetail.safFacilityCheckResultNo);
          this.$http.type = 'DELETE';
          this.$http.request((_result) => {
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '삭제되었습니다.',
              type: 'success',  // success / info / warning / error
            });
            this.isDelete = false;
            this.closePopup(null);
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', _error);
          });
        },
        // 취소 callback 함수
        cancelCallback: () => {
          this.isDelete = false;
        }
      });
    },
    /** end button 관련 이벤트 **/
  }
};
</script>