<!--
  목적 : 개선상세
  Detail : 개선사항 상세 화면
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
                v-if="statusCheck"
                :action-url="editUrl"
                :param="imprAct"
                :is-submit="isConfirm"
                title="확인"
                color="black"
                action-type="PUT"
                beforeSubmit = "beforeConfirm"
                @beforeConfirm="beforeConfirm"
                @btnClicked="btnConfirmClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="returnCheck"
                :action-url="editUrl"
                :param="imprAct"
                :is-submit="isReturn"
                title="반려"
                color="black"
                action-type="PUT"
                beforeSubmit = "beforeReturn"
                @beforeReturn="beforeReturn"
                @btnClicked="btnReturnClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="statusCheck"
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
                <b-col v-if="imprAct.imprStepCd==='IMST1'">
                  <b><font color="blue">요청등록</font>&nbsp;&nbsp;▷&nbsp;&nbsp;미접수&nbsp;&nbsp;▷&nbsp;&nbsp;조치부서 조치&nbsp;&nbsp;▷&nbsp;&nbsp;
                    요청부서 조치확인&nbsp;&nbsp;▷&nbsp;&nbsp;개선완료</b>
                </b-col>
                <b-col v-if="imprAct.imprStepCd==='IMST2'">
                  <b>요청등록&nbsp;&nbsp;▷&nbsp;&nbsp;<font color="blue">미접수</font>&nbsp;&nbsp;▷&nbsp;&nbsp;조치부서 조치&nbsp;&nbsp;▷&nbsp;&nbsp;
                    요청부서 조치확인&nbsp;&nbsp;▷&nbsp;&nbsp;개선완료</b>
                </b-col>
                <b-col v-if="imprAct.imprStepCd==='IMST3'">
                  <b>요청등록&nbsp;&nbsp;▷&nbsp;&nbsp;미접수&nbsp;&nbsp;▷&nbsp;&nbsp;<font color="blue">조치부서 조치</font>&nbsp;&nbsp;▷&nbsp;&nbsp;
                    요청부서 조치확인&nbsp;&nbsp;▷&nbsp;&nbsp;개선완료</b>
                </b-col>
                <b-col v-if="imprAct.imprStepCd==='IMST4'">
                  <b>요청등록&nbsp;&nbsp;▷&nbsp;&nbsp;미접수&nbsp;&nbsp;▷&nbsp;&nbsp;조치부서 조치&nbsp;&nbsp;▷&nbsp;&nbsp;
                    <font color="blue">요청부서 조치확인</font>&nbsp;&nbsp;▷&nbsp;&nbsp;개선완료</b>
                </b-col>
                <b-col v-if="imprAct.imprStepCd==='IMST5'">
                  <b>요청등록&nbsp;&nbsp;▷&nbsp;&nbsp;미접수&nbsp;&nbsp;▷&nbsp;&nbsp;조치부서 조치&nbsp;&nbsp;▷&nbsp;&nbsp;
                    요청부서 조치확인&nbsp;&nbsp;▷&nbsp;&nbsp;<font color="blue">개선완료</font></b>
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
              <b-row>
                    <b-col sm="4">
                        <y-label 
                            label="조치부서/조치자" 
                        />
                    </b-col>
                    <b-col sm="4">
                      <y-select
                        :width="12"
                        :comboItems="comboDeptItems"
                        :disabled="true"
                        itemText="deptNm"
                        itemValue="deptCd"
                        ui="bootstrap"
                        name="actDeptCd"
                        v-model="imprAct.actDeptCd"
                      >
                      </y-select>
                    </b-col>
                    <b-col sm="4">
                      <y-text
                        :width="12"
                        :clearable="true"
                        :disabled="true"
                        ui="bootstrap"
                        name="actUserNm"
                        v-model="imprAct.actUserNm"
                      />
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-datepicker
                :width="9"
                :disabled="true"
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
            <y-label label="조치내용" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <el-tabs type="border-card" v-model="tabIndex" sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
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
            <component :is="component" v-if="component" :imprAct.sync="imprAct"/>
          </keep-alive>
            </el-tab-pane>
        </el-tabs>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
            v-if="statusCheck"
            title="확인"
            color="black"
            action-type="PUT"
            beforeSubmit = "beforeConfirm"
            @beforeConfirm="beforeConfirm"
            @btnClicked="btnConfirmClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            v-if="returnCheck"
            title="반려"
            color="black"
            action-type="PUT"
            beforeSubmit = "beforeReturn"
            @beforeReturn="beforeReturn"
            @btnClicked="btnReturnClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            v-if="statusCheck"
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
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'improve-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        safImprActNo: 0,
        refTableId: 0,
        imprClassCd: null,
        flag: '',
      },
    }
  },
  data () {
    return {
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
        updateDt: '',
      },
      tabItems: [
        { title: '조치내용', url: './improveContent' },
        { title: '개선 전/후 사진', url: './improveImage' },
        { title: '첨부파일', url: './fileUploadPage' },
      ],
      tabIndex: 0,
      component: null,
      searchUrl: '',
      editUrl: '',
      isEdit: false,
      isConfirm: false,
      isReturn: false,
      disabled: false,
      statusCheck: true,
      returnCheck: true,
      imprStepCd: '요청등록 => 미접수 => 조치부서 조치 => 요청부서 조치확인 => 개선완료',
      imprRqstUserInfo: '',
      immediateBeforeImage: '',
      immediateAfterImage: '',
      comboDeptItems: [],
      comboImprClassItems: []
    }
  },
  watch: {
    tabIndex () {
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
    this.imprAct.flag = this.popupParam.flag;
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
      
      if (this.popupParam.flag === 'IMPROVE') {
        this.statusCheck = true;
        this.returnCheck = false;
      } else if (this.popupParam.flag === 'DETAIL') {
        this.statusCheck = false;
        this.returnCheck = false;
      }
      
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
        this.imprAct.flag = this.popupParam.flag;
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
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      this.component = () => import(`${path}`);
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
        message: '확인하시겠습니까?',
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationConfirm();
        }
      });
    },
    beforeReturn () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '반려하시겠습니까?',
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationReturn();
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
      if (this.tabDataCheck()) return;
      this.$validator.validateAll().then((_result) => {
        if (this.imprAct.imprStepCd === 'IMST3') this.imprAct.imprStepCd = 'IMST4'
        else if (this.imprAct.imprStepCd === 'IMST4') this.imprAct.imprStepCd = 'IMST5'
        
        this.isConfirm = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isConfirm) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isConfirm = false;
      });
    },
    checkValidationReturn () {
      this.$validator.validateAll().then((_result) => {
        this.imprAct.imprStepCd = 'IMST3'
        this.isReturn = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isReturn) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isReturn = false;
      });
    },
    checkValidationEdit () {
      if (this.tabDataCheck()) return;
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    tabDataCheck () {
      if (this.imprAct.imprStepCd === 'IMST3' && this.imprAct.actResultContents === '') {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '필수 입력값을 입력해 주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return true;
      } else if (this.imprAct.imprStepCd === 'IMST4' && this.imprAct.actResultReview === '') {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '필수 입력값을 입력해 주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return true;
      }
      return false;
    },
    btnConfirmClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '확인되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    btnReturnClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '반려되었습니다.',
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
