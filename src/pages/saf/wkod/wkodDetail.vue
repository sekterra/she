<!--
  목적 : 작업허가서 상세
  Detail : 작업허가서 상세 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="작업허가서 상세 정보" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                :action-url="confirmUrl"
                :param="wkodMaster"
                :is-submit="isConfirm"
                type="search"
                title="확인"
                size="mini"
                color="blue"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="wkodNoCheck"
                :action-url="insertUrl"
                :param="wkodMaster"
                :is-submit="isInsert"
                title="저장"
                color="blue"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="!wkodNoCheck"
                :action-url="editUrl"
                :param="wkodMaster"
                :is-submit="isEdit"
                title="수정"
                size="mini"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                :action-url="deleteUrl"
                :param="wkodMaster"
                :is-submit="isDelete"
                type="delete"
                title="삭제"
                size="mini"
                color="red"
                action-type="DELETE"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                    <b-col sm="8">
                        <y-text
                            :width="6"
                            :disabled="true"
                            ui="bootstrap"
                            label="신청부서/담당자"
                            name="reqDeptNm"
                            v-model="wkodMaster.reqDeptNm"
                            >
                        </y-text>
                    </b-col>
                    <b-col sm="4">
                        <y-text
                            :width="12"
                            :disabled="true"
                            ui="bootstrap"
                            name="reqUserNm"
                            v-model="wkodMaster.reqUserNm"
                            >
                        </y-text>
                    </b-col>
                </b-row>               
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-text
                    :width="8"
                    :disabled="true"
                    ui="bootstrap"
                    label="신청일"
                    name="reqYmd"
                    v-model="wkodMaster.reqYmd"
                    >
                </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-text
                    :width="8"
                    :disabled="true"
                    ui="bootstrap"
                    label="작업허가NO"
                    name="wkodNum"
                    v-model="wkodMaster.wkodNum"
                    >
                </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-select
                    :width="8"
                    :disabled="editable"
                    :comboItems="comboWkodKindItems"
                    :required="true"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    label="작업종류"
                    name="wkodKindCd"
                    v-model="wkodMaster.wkodKindCd"
                    v-validate="'required'"
                    :state="validateState('wkodKindCd')"
                >
                </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-datepicker
                    :width="8"
                    :disabled="editable"
                    default="today"
                    label="작업일자"
                    name="workYmd"
                    :clearable="true"
                    v-model="wkodMaster.workYmd"
                >
                </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-datepicker
                    :width="8"
                    :disabled="editable"
                    :range="true"
                    type="time"
                    label="작업시간"
                    name="workTime"
                    v-model="wkodMaster.workTime"
                >
                </y-datepicker>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                    <b-col sm="2">
                        <y-label 
                            label="작업지역" 
                            :required="true"
                        />
                    </b-col>
                    <b-col sm="4">
                        <y-select
                            :width="12"
                            :disabled="editable"
                            :comboItems="processNoItems"
                            :required="true"
                            itemText="processNm"
                            itemValue="processNo"
                            ui="bootstrap"
                            name="processNo"
                            v-model="wkodMaster.processNo"
                            v-validate="'required'"
                            :state="validateState('processNo')"
                        >
                        </y-select>
                    </b-col>
                    <b-col sm="6">
                        <y-text
                            :width="12"
                            :maxlength="50"
                            :disabled="editable"
                            :required="true"
                            ui="bootstrap"
                            name="workArea"
                            v-model="wkodMaster.workArea"
                            v-validate="'required'"
                            :state="validateState('workArea')"
                            >
                        </y-text>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                <b-row>
                    <b-col sm="2">
                        <y-label 
                            label="작업위치" 
                        />
                    </b-col>
                    <b-col sm="2">
                        <y-text
                            :width="8"
                            :disabled="true"
                            ui="bootstrap"
                            label="X"
                            name="locatePntX"
                            v-model="wkodMaster.locatePntX"
                            >
                        </y-text>
                    </b-col>
                    <b-col sm="2">
                        <y-text
                            :width="8"
                            :disabled="true"
                            ui="bootstrap"
                            label="Y"
                            name="locatePntY"
                            v-model="wkodMaster.locatePntY"
                            >
                        </y-text>
                    </b-col>
                    <b-col sm="2">
                        <y-btn
                            title="작업위치"
                            @btnClicked="openPopup()" 
                        />
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                <y-text
                    :width="10"
                    :disabled="editable"
                    :required="true"
                    ui="bootstrap"
                    label="작업명"
                    name="workTitle"
                    v-model="wkodMaster.workTitle"
                    v-validate="'required'"
                    :state="validateState('workTitle')"
                    >
                </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                <y-textarea
                    :width="10"
                    :disabled="editable"
                    :maxlength="150"
                    :required="true"
                    ui="bootstrap"
                    label="작업내용"
                    name="workContent"
                    v-model="wkodMaster.workContent"
                    v-validate="'required'"
                    :state="validateState('workContent')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-select
                    :width="8"
                    :disabled="editable"
                    :comboItems="comboPubDeptItems"
                    :required="true"
                    itemText="deptNm"
                    itemValue="deptCd"
                    ui="bootstrap"
                    label="발행부서"
                    name="pubDeptCd"
                    v-model="wkodMaster.pubDeptCd"
                    v-validate="'required'"
                    :state="validateState('pubDeptCd')"
                >
                </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                    <b-col sm="8">
                        <y-text
                            :width="6"
                            :disabled="editable"
                            ui="bootstrap"
                            label="감독자/연락처"
                            name="pubMgrNm"
                            v-model="wkodMaster.pubMgrNm"
                            >
                        </y-text>
                    </b-col>
                    <b-col sm="4">
                        <y-text
                            :width="12"
                            :disabled="editable"
                            ui="bootstrap"
                            name="pubMgrTel"
                            v-model="wkodMaster.pubMgrTel"
                            >
                        </y-text>
                    </b-col>
                </b-row>               
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-text
                    :width="8"
                    :disabled="editable"
                    :required="true"
                    ui="bootstrap"
                    label="작업업체"
                    name="subconnNm"
                    v-model="wkodMaster.subconnNm"
                    v-validate="'required'"
                    :state="validateState('subconnNm')"
                    >
                </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                    <b-col sm="8">
                        <y-text
                            :width="6"
                            :disabled="editable"
                            ui="bootstrap"
                            label="업체담당자/연락처"
                            name="subconnUserNm"
                            v-model="wkodMaster.subconnUserNm"
                            >
                        </y-text>
                    </b-col>
                    <b-col sm="4">
                        <y-text
                            :width="12"
                            :disabled="editable"
                            ui="bootstrap"
                            name="subconnUserTel"
                            v-model="wkodMaster.subconnUserTel"
                            >
                        </y-text>
                    </b-col>
                </b-row>               
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-number
                    :width="8"
                    :disabled="editable"
                    ui="bootstrap"
                    label="작업인원수"
                    name="workerNumb"
                    v-model="wkodMaster.workerNumb"
                    >
                </y-number>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                <y-textarea
                    :width="10"
                    :disabled="editable"
                    :maxlength="150"
                    ui="bootstrap"
                    label="특별지시사항"
                    name="specialInstructions"
                    v-model="wkodMaster.specialInstructions"
                />
            </b-col>
          </b-row>
        </b-card>
        <b-row class="mt-3">
          <b-col sm="12">
            <y-label label="기타 정보" icon="user-edit" color-class="cutstom-title-color" />
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
            <component :is="component" v-if="component" :wkodMaster.sync="wkodMaster" />
          </keep-alive>
            </el-tab-pane>
        </el-tabs>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
            <y-btn
                type="clear"
                title="닫기"
                size="mini"
                color="info"
                @btnClicked="closePopup" 
            />
        </div>  
      </b-col>
    </b-row>

    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :width="popupOptions.width"
      :height="popupOptions.height"
      :top="popupOptions.top">
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closeSndPopup" />
    </el-dialog>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'wkod-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        wkodNo: 0,
        wkodStepCd: ''
      },
    },
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '30%',
        top: '50px',
        param: {}
      },
      wkodMaster: {
        wkodNo: '',
        wkodNum: '',
        wkodKindCd: null,
        workYmd: '',
        workTime: '',
        workStartTime: '',
        workEndTime: '',
        workOverTime: '',
        workCompleteTime: '',
        workTitle: '',
        workContent: '',
        wkodStepCd: '',
        reqStepConfirmYn: '',
        pubStepConfirmYn: '',
        appStepConfirmYn: '',
        plantCd: '',
        processNo: null,
        workArea: '',
        reqUserId: '',
        reqUserNm: '',
        reqDeptCd: '',
        reqDeptNm: '',
        reqYmd: '',
        pubDeptCd: null,
        pubDeptNm: null,
        subconnNm: '',
        subconnUserNm: '',
        subconnUserTel: '',
        workerNumb: '',
        specialInstructions: '',
        handleChemContent: '',
        pubUserId: '',
        pubUserNm: '',
        pubMgrNm: '',
        pubMgrId: '',
        pubMgrTel: '',
        pubConfirmDt: '',
        appUserId: '',
        appUserNm: '',
        appDeptCd: '',
        appDeptNm: '',
        appConfirmDt: '',
        overUserId: '',
        overUserNm: '',
        overConfirmDt: '',
        locatePntX: '',
        locatePntY: '',
        delYn: '',
        spmEtc: '',
        wkodSpeCds: [],
        wkodDeptRequest: [],
        wkodDeptWork: [],
        selectedRequestRow: [],
        selectedWorkRow: [],
        wkodChkResultRequestRow: [],
        wkodChkResultWorkRow: []
      },
      tabItems: [
        { title: '확인항목', url: './confirmedItem' },
        { title: '점검확인사항', url: './confirmInspectionIndex' },
        { title: '첨부파일', url: 'fileUploadPage' },
      ],
      component: null,
      tabIndex: 0,
      baseWidth: 9,
      comboWkodKindItems: [],
      comboPubDeptItems: [],
      processNoItems: [],
      confirmUrl: '',
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      searchUrl: '',
      isConfirm: false,
      isInsert: false,
      isEdit: false,
      isDelete: false,
      wkodNoCheck: true,
      editable: false
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
    this.init();
    this.getComboItems('SAF_WKOD_KIND'); // 작업종류
    this.getProcessNoItems();
    this.getDeptItems();
    this.getList();
  },
  mounted () {
    this.loadComponent();
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      this.wkodMaster.wkodNo = this.popupParam.wkodNo;
      this.wkodMaster.wkodStepCd = this.popupParam.wkodStepCd;
      
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.saf.wkodMaster.list.url;
        this.insertUrl = transactionConfig.saf.wkodMaster.insert.url;
        this.editUrl = transactionConfig.saf.wkodMaster.edit.url;
      }, 1000);
      
      if (this.popupParam.wkodStepCd === 'WKS01') {
        if (this.popupParam.wkodNo === 0) this.wkodNoCheck = true
        else this.wkodNoCheck = false

        this.editable = false;
      }
      else
      {
        this.wkodNoCheck = false;
        this.editable = true; 
      }
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      
      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else this.component = () => import(`${path}`);
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.comboWkodKindItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.comboPubDeptItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': '', 'processNm': '선택하세요' });
        this.processNoItems = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getList () {
      if (this.wkodMaster.wkodNo === 0) this.$http.url = this.$format(selectConfig.saf.wkodMaster.getTabData.url, this.wkodMaster.wkodNo);
      else this.$http.url = this.$format(selectConfig.saf.wkodMaster.get.url, this.wkodMaster.wkodNo);
      
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        Object.assign(this.wkodMaster, _result.data);
        
        if (this.popupParam.wkodNo === 0) this.setDetailData();
        else this.wkodMaster.workTime = [this.wkodMaster.workStartTime, this.wkodMaster.workEndTime];

      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    setDetailData () {
      this.wkodMaster.reqDeptNm = "열린기술";
      this.wkodMaster.reqDeptCd = "yullin";
      this.wkodMaster.reqUserNm = "관리자";
      this.wkodMaster.reqUserId = "admin";
      this.wkodMaster.wkodKindCd = '';
      this.wkodMaster.processNo = '';
      this.wkodMaster.pubDeptCd = '';
      this.wkodMaster.workTime = [this.$comm.getToday(), this.$comm.getToday()];
      this.wkodMaster.reqYmd = this.$comm.getToday();
    },
    openPopup () {
      this.popupOptions.param = {
        'locatePntX': this.wkodMaster.locatePntX,
        'locatePntY': this.wkodMaster.locatePntY
      };
      this.popupOptions.target = () => import(`${'./locatePntDialog.vue'}`);
      this.popupOptions.title = '작업위치';
      this.popupOptions.visible = true;
    },
    closeSndPopup (data) {
      this.wkodMaster.locatePntX = data.locatePntX;
      this.wkodMaster.locatePntY = data.locatePntY;

      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    closePopup (data) {
      this.$emit('closePopup', {});
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    beforeInsert () {
      this.wkodMaster.workStartTime = this.wkodMaster.workTime[0];
      this.wkodMaster.workEndTime = this.wkodMaster.workTime[1];

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '저장하시겠습니까?',
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationInsert();
        }
      });
    },
    beforeEdit () {
      this.wkodMaster.workStartTime = this.wkodMaster.workTime[0];
      this.wkodMaster.workEndTime = this.wkodMaster.workTime[1];

      this.$validator.validateAll().then((_result) => {
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
      });
    },
    checkValidationEdit () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    btnInsertClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    btnEditClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    btnSearchClickedCallback (_result) {
      // this.getList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
