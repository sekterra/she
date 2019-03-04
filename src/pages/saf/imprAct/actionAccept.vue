<!--
  목적 : 조치부서 접수 및 확인
  Detail : 개선사항 접수 및 담당자 지정 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="조치요청 상세 정보" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
                :action-url="editUrl"
                :param="imprAct"
                :is-submit="isConfirm"
                title="접수"
                color="black"
                action-type="PUT"
                beforeSubmit = "beforeConfirm"
                @beforeConfirm="beforeConfirm"
                @btnClicked="btnConfirmClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
                :action-url="editUrl"
                :param="imprAct"
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
              title="닫기"
              @btnClicked="closePopup" 
            />
          </div>
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                <b-col sm="2">
                    <y-label 
                        label="진행 단계" 
                    />
                </b-col>
                <b-col>
                  <b>요청등록&nbsp;&nbsp;▷&nbsp;&nbsp;<font color="blue">미접수</font>&nbsp;&nbsp;▷&nbsp;&nbsp;조치부서 조치&nbsp;&nbsp;▷&nbsp;&nbsp;
                    요청부서 조치확인&nbsp;&nbsp;▷&nbsp;&nbsp;개선완료</b>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-select
                :width="8"
                :disabled="true"
                :comboItems="comboImprClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="업무구분"
                name="imprClassCd"
                v-model="imprAct.imprClassCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                    <b-col sm="3">
                        <y-label 
                            label="작성일/작성자" 
                        />
                    </b-col>
                    <b-col sm="4">
                      <y-text
                        :width="12"
                        :disabled="true"
                        ui="bootstrap"
                        name="imprRqstYmd"
                        v-model="imprAct.imprRqstYmd"
                      >
                      </y-text>
                    </b-col>
                    <b-col sm="5">
                      <y-text
                        :width="12"
                        :disabled="true"
                        ui="bootstrap"
                        name="imprRqstUserNm"
                        v-model="imprRqstUserInfo"
                      >
                      </y-text>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-text
                :width="10"
                :disabled="true"
                ui="bootstrap"
                label="제목"
                name="imprTitle"
                v-model="imprAct.imprTitle"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="10"
                :disabled="true"
                label="조치 요청내용"
                ui="bootstrap"
                name="imprRqstContents"
                v-model="imprAct.imprRqstContents"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                :disabled="true"
                label="조치부서"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="actDeptCd"
                v-model="imprAct.actDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-text
                :width="9"
                :clearable="true"
                :disabled="true"
                :required="true"
                ui="bootstrap"
                label="조치자"
                name="actUserNm"
                v-model="imprAct.actUserNm"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
                v-validate="'required'"
                :state="validateState('actUserNm')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-datepicker
                :width="8"
                :disabled="disabled"
                label="조치기한"
                type="today"
                name="actLimitYmd"
                v-model="imprAct.actLimitYmd"
              >
              </y-datepicker>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="mt-3">
          <b-col sm="12">
            <y-label label="첨부파일" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="12" class="px-0">
              <y-file-upload
                @fileUploadComplete="fileUploadComplete"
              >
              </y-file-upload>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
              title="접수"
              color="black"
              action-type="PUT"
              beforeSubmit = "beforeConfirm"
              @beforeConfirm="beforeConfirm"
              @btnClicked="btnConfirmClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
              title="저장"
              color="orange"
              action-type="PUT"
              beforeSubmit = "beforeEdit"
              @beforeEdit="beforeEdit"
              @btnClicked="btnEditClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            title="닫기"
            @btnClicked="closePopup" 
          />
        </div>
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
  name: 'action-request',
  props: {
    popupParam: {
      type: Object,
      default: {
        safImprActNo: 0,
        refTableId: 0,
        imprClassCd: null
      },
    }
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null
      },
      imprAct: {
        safImprActNo: '',
        imprClassCd: '',
        actClassCd: '',
        imprRqstYmd: '',
        imprTitle: '',
        imprRqstDeptCd: '',
        imprRqstDeptNm: '',
        imprRqstUserId: '',
        imprRqstUserNm: '',
        imprRqstContents: '',
        imprStepCd: '',
        refTable: '',
        refTableId: '',
        actSchYmd: '',
        actConfirmYmd: '',
        actLimitYmd: '',
        actDeptCd: '',
        actDeptNm: '',
        actUserId: '',
        actUserNm: '',
        actResultContents: '',
        actResultReview: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: ''
      },
      searchUrl: '',
      editUrl: '',
      isEdit: false,
      isConfirm: false,
      disabled: false,
      imprRqstUserInfo: '',
      immediateBeforeImage: '',
      immediateAfterImage: '',
      comboDeptItems: [],
      comboImprClassItems: [],
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
  updated () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      this.searchUrl = selectConfig.saf.imprAct.get.url;
      this.editUrl = transactionConfig.saf.imprAct.edit.url;

      this.getDeptItems();
      this.getComboItems('SAF_IMPR_CLASS'); // 개선분류코드
      this.getList();
    },
    getList () {
      this.$http.url = this.$format(this.searchUrl, this.popupParam.safImprActNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        Object.assign(this.imprAct, _result.data);
        this.imprRqstUserInfo = this.imprAct.imprRqstDeptNm + " " + this.imprAct.imprRqstUserNm;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
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
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택' });
        this.comboImprClassItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.param = {
        'deptCd': this.imprAct.actDeptCd
      };
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
        this.imprAct.actUserId = data.user.userId;
        this.imprAct.actUserNm = data.user.userNm;
        this.imprAct.actDeptCd = data.user.deptCd;
        this.imprAct.actDeptNm = data.user.deptNm;
      }
    },
    fileUploadComplete () {
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    beforeConfirm () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '접수하시겠습니까?',
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationConfirm();
        }
      });
    },
    beforeEdit () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '저장하시겠습니까?',
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationEdit();
        }
      });
    },
    checkValidationConfirm () {
      this.$validator.validateAll().then((_result) => {
        if (this.imprAct.actUserNm === '') _result = false;
        this.imprAct.imprStepCd = 'IMST3';
        this.isConfirm = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isConfirm) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isConfirm = false;
      });
    },
    checkValidationEdit () {
      this.$validator.validateAll().then((_result) => {
        if (this.imprAct.actUserNm === '') _result = false;
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    btnConfirmClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '접수되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    btnEditClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    closePopup (data) {
      this.$emit('closePopup', {});
    },
    btnSearchClickedCallback (_result) {
      // this.getList();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      // this.$emit('APP_REQUEST_ERROR', _result);
    }
  }
};
</script>

<style>

</style>
