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
                v-if="confirmCheck"
                :action-url="editUrl"
                :param="wkodMaster"
                :is-submit="isConfirm"
                :title="titleNm"
                color="black"
                :action-type="confirmActionType"
                beforeSubmit = "beforeConfirm"
                @beforeConfirm="beforeConfirm"
                @btnClicked="btnConfirmClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="returnCheck"
                :action-url="editUrl"
                :param="wkodMaster"
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
                v-if="insertCheck"
                :action-url="insertUrl"
                :param="wkodMaster"
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
                v-if="editCheck"
                :action-url="editUrl"
                :param="wkodMaster"
                :is-submit="isEdit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="deleteCheck"
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
                v-if="printCheck"
                title="출력"
                color="black"
              />
              <y-btn
                title="닫기"
                @btnClicked="closeSndPopup" 
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                  <y-datepicker
                    :width="8"
                    :disabled="editable"
                    default="today"
                    label="작업일자/작업시간"
                    name="workYmd"
                    :required="true"
                    :clearable="true"
                    v-model="wkodMaster.workYmd"
                    v-validate="'required'"
                    :state="validateState('workYmd')"
                  >
                  </y-datepicker>
                </b-col>
                <b-col sm="3" md="3" lg="3" xl="3" class="col-xxl-3">
                  <b-row>
                    <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2 px-1">
                      <y-label 
                        label="" 
                      />
                    </b-col>
                    <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5 px-1">
                      <y-select
                        :width="12"
                        :comboItems="comboHourItems"
                        :disabled="editable"
                        itemText="hourNm"
                        itemValue="hour"
                        ui="bootstrap"
                        name="fromHour"
                        v-model="fromHour"
                        @input="workStartTimeChange"
                      >
                      </y-select>
                    </b-col>
                    <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5 px-1">
                      <y-select
                        :width="12"
                        :comboItems="comboMinuteItems"
                        :disabled="editable"
                        itemText="minuteNm"
                        itemValue="minute"
                        ui="bootstrap"
                        name="fromMinute"
                        v-model="fromMinute"
                        @input="workStartTimeChange"
                      >
                      </y-select>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col sm="3" md="3" lg="3" xl="3" class="col-xxl-3">
                  <b-row>
                    <b-col sm="1" md="1" lg="1" xl="1" class="col-xxl-1 px-1">
                      <y-label 
                        label="~" 
                      />
                    </b-col>
                    <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5 px-1">
                      <y-select
                        :width="12"
                        :comboItems="comboHourItems"
                        :disabled="editable"
                        itemText="hourNm"
                        itemValue="hour"
                        ui="bootstrap"
                        name="toHour"
                        v-model="toHour"
                        @input="workEndTimeChange"
                      >
                      </y-select>
                    </b-col>
                    <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5 px-1">
                      <y-select
                        :width="12"
                        :comboItems="comboMinuteItems"
                        :disabled="editable"
                        itemText="minuteNm"
                        itemValue="minute"
                        ui="bootstrap"
                        name="toMinute"
                        v-model="toMinute"
                        @input="workEndTimeChange"
                      >
                      </y-select>
                    </b-col>
                    <b-col sm="1" md="1" lg="1" xl="1" class="col-xxl-1 px-1">
                      <y-label 
                        label="" 
                      />
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                    <b-col sm="2">
                        <y-label 
                          label="작업지역(공정)" 
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
                    <b-col sm="4">
                        <y-text
                            :width="12"
                            :maxlength="65"
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
                    <b-col sm="2">
                        <y-btn
                            title="작업위치"
                            @btnClicked="openPopup()" 
                        />
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12" v-if="false">
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
                    :maxlength="65"
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
                    :maxlength="200"
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
                            :maxlength="15"
                            :disabled="true"
                            ui="bootstrap"
                            label="감독자/연락처"
                            name="pubMgrNm"
                            v-model="wkodMaster.pubMgrNm"
                            :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                            @searchUser="btnSearchUserClicked"
                            >
                        </y-text>
                    </b-col>
                    <b-col sm="4">
                        <y-text
                            :width="12"
                            :maxlength="15"
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
                    :maxlength="65"
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
                            :maxlength="15"
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
                            :maxlength="15"
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
                    :maxlength="5"
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
                    :maxlength="1000"
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
              v-if="confirmCheck"
              title="승인"
              color="black"
              :action-type="confirmActionType"
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
              v-if="insertCheck"
              title="저장"
              color="orange"
              action-type="POST"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editCheck"
              title="수정"
              color="orange"
              action-type="PUT"
              beforeSubmit = "beforeEdit"
              @beforeEdit="beforeEdit"
              @btnClicked="btnEditClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="deleteCheck"
              title="삭제"
              color="red"
              action-type="DELETE"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="printCheck"
              title="출력"
              color="black"
            />
            <y-btn
              type="clear"
              title="닫기"
              size="mini"
              color="info"
              @btnClicked="closeSndPopup" 
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
        width: '500px',
        top: '50px',
        param: {},
        closeCallback: null
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
        overDeptCd: '',
        overDeptNm: '',
        overConfirmDt: '',
        overYn: '',
        locatePntX: '',
        locatePntY: '',
        delYn: '',
        spmEtc: '',
        confimrFlag: '',
        refRemark: '',
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
      comboHourItems: [], // 시
      comboMinuteItems: [], // 분
      titleNm: '',
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      searchUrl: '',
      fromHour: '8',
      fromMinute: '0',
      toHour: '17',
      toMinute: '0',
      confirmActionType: 'POST',
      isConfirm: false,
      isReturn: false,
      isInsert: false,
      isEdit: false,
      isDelete: false,
      insertCheck: false,
      editCheck: false,
      confirmCheck: true,
      returnCheck: false,
      deleteCheck: false,
      editable: false,
      printCheck: false,
      deleteValue: null,
    }
  },
  watch: {
    tabIndex () {
      this.loadComponent();
    },
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
    this.loadComponent();
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      this.wkodMaster.wkodNo = this.popupParam.wkodNo;
      this.wkodMaster.wkodStepCd = this.popupParam.wkodStepCd;
     
      this.searchUrl = selectConfig.saf.wkodMaster.get.url;
      this.insertUrl = transactionConfig.saf.wkodMaster.insert.url;
      this.editUrl = transactionConfig.saf.wkodMaster.edit.url;
      this.deleteUrl = transactionConfig.saf.wkodMaster.delete.url;

      var i = 0;
      for (; i < 24; i++) {
        this.comboHourItems.push({
          hourNm: i + '시',
          hour: i
        });
      }
      
      i = 0;
      for (; i < 60; i++) {
        this.comboMinuteItems.push({
          minuteNm: i + '분',
          minute: i
        });
      }
      
      // 작업허가서 신청의 경우
      if (this.popupParam.wkodStepCd === 'WKS01') {
        this.titleNm = '신청';
        // 최초 등록시 등록 버튼 활성화
        if (this.popupParam.wkodNo === 0) {
          this.insertCheck = true;
        // 수정시 수정, 삭제 버튼 활성화
        } else {
          this.editCheck = true;
          this.deleteCheck = true;
        }
      // 작업허가서 신청이 아닐시 입력란 비활성화
      } else {
        // 작업허가서 발행의 경우 반려 버튼 활성화
        if (this.popupParam.wkodStepCd === 'WKS02') {
          this.titleNm = '발행';
          this.returnCheck = true;
        // 작업허가서 승인의 경우 반려 버튼 활성화
        } else if (this.popupParam.wkodStepCd === 'WKS03') {
          this.titleNm = '승인';
          this.returnCheck = true;
        // 작업허가서 조회 및 출력의 경우 승인 버튼 비활성화
        } else {
          this.confirmCheck = false;
        }
        // 작업허가서 조회 및 출력의 경우 출력 버튼 활성화
        if (this.popupParam.wkodStepCd === 'WKS04') {
          this.printCheck = true;
        }
        this.editable = true;
      }

      this.getComboItems('SAF_WKOD_KIND'); // 작업종류
      this.getProcessNoItems();
      this.getDeptItems();
      this.getList();
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
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.comboWkodKindItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': null, 'deptNm': '선택하세요' });
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
        _result.data.splice(0, 0, { 'processNo': null, 'processNm': '선택하세요' });
        this.processNoItems = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getList () {
      if (this.wkodMaster.wkodNo === 0) this.$http.url = this.$format(selectConfig.saf.wkodMaster.getTabData.url, this.wkodMaster.wkodNo);
      else this.$http.url = this.$format(this.searchUrl, this.wkodMaster.wkodNo);
      
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        Object.assign(this.wkodMaster, _result.data);
        
        if (this.popupParam.wkodNo === 0) {
          this.setDetailData();
        } else {
          this.fromHour = new Date(this.wkodMaster.workStartTime).getHours();
          this.fromMinute = new Date(this.wkodMaster.workStartTime).getMinutes();
          
          this.toHour = new Date(this.wkodMaster.workEndTime).getHours();
          this.toMinute = new Date(this.wkodMaster.workEndTime).getMinutes();
        }
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    btnSearchUserClicked (_item) {
      if (this.editable) return;

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
      
      if (data.user) this.wkodMaster.pubMgrNm = data.user.userNm;
    },
    setDetailData () {
      this.wkodMaster.reqDeptNm = "열린기술";
      this.wkodMaster.reqDeptCd = "yullin";
      this.wkodMaster.reqUserNm = "관리자";
      this.wkodMaster.reqUserId = "admin";
      this.wkodMaster.reqYmd = this.$comm.getToday();
    },
    openPopup () {
      this.popupOptions.param = {
        'wkodStepCd': this.wkodMaster.wkodStepCd,
        'locatePntX': this.wkodMaster.locatePntX,
        'locatePntY': this.wkodMaster.locatePntY
      };
      this.popupOptions.target = () => import(`${'./locatePntDialog.vue'}`);
      this.popupOptions.title = '작업위치';
      this.popupOptions.visible = true;
      this.popupOptions.width = '460px';
      this.popupOptions.top = '50px';
      this.popupOptions.closeCallback = this.closePopup;
    },
    closePopup (data) {
      if (data !== undefined) {
        this.wkodMaster.locatePntX = data.locatePntX;
        this.wkodMaster.locatePntY = data.locatePntY;
      }
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    closeSndPopup (data) {
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
    /** button 관련 이벤트 **/
    beforeInsert () {
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
    beforeConfirm () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '승인하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              if (this.wkodMaster.wkodStepCd === 'WKS01') {
                this.wkodMaster.confirmFlag = 'WKS02';
                this.wkodMaster.reqStepConfirmYn = 'Y';
              } else if (this.wkodMaster.wkodStepCd === 'WKS02') {
                this.wkodMaster.confirmFlag = 'WKS03';
                this.wkodMaster.pubUserId = 'admin';
                this.wkodMaster.pubUserNm = '관리자';
                this.wkodMaster.pubStepConfirmYn = 'Y';
              } else if (this.wkodMaster.wkodStepCd === 'WKS03') {
                this.wkodMaster.confirmFlag = 'WKS04';
                this.wkodMaster.appUserId = 'admin';
                this.wkodMaster.appUserNm = '관리자';
                this.wkodMaster.appDeptNm = "열린기술";
                this.wkodMaster.appDeptCd = "yullin";
                this.wkodMaster.appStepConfirmYn = 'Y';
              }

              if (this.wkodMaster.wkodNo === 0) {
                this.confirmActionType = "POST";
              } else {
                this.confirmActionType = "PUT";
              }
              this.checkValidationConfirm();
            },
          });
        }
      });
    },
    workStartTimeChange (data) {
      this.wkodMaster.workStartTime = new Date(this.$comm.getToday() + " " + this.fromHour + ":" + this.fromMinute);
    },
    workEndTimeChange (data) {
      this.wkodMaster.workEndTime = new Date(this.$comm.getToday() + " " + this.toHour + ":" + this.toMinute);
    },
    beforeReturn () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '반려하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              if (this.wkodMaster.wkodStepCd === 'WKS02') {
                this.wkodMaster.confirmFlag = 'WKS01';
                this.wkodMaster.reqStepConfirmYn = 'N';
              } else if (this.wkodMaster.wkodStepCd === 'WKS03') {
                this.wkodMaster.confirmFlag = 'WKS02';
                this.wkodMaster.pubStepConfirmYn = 'N';
              }
              
              this.checkValidationReturn();
            },
          });
        }
      });
    },
    beforeDelete () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',  
        confirmCallback: () => {
          this.deleteValue = {
            'data': this.wkodMaster.wkodNo
          };
          this.isDelete = true;
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
    checkValidationReturn () {
      this.$validator.validateAll().then((_result) => {
        this.isReturn = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isReturn) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isReturn = false;
      });
    },
    checkValidationConfirm () {
      this.$validator.validateAll().then((_result) => {
        this.isConfirm = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isConfirm) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isConfirm = false;
      });
    },
    btnInsertClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closeSndPopup();
    },
    btnConfirmClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '승인되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closeSndPopup();
    },
    btnReturnClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '반려되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closeSndPopup();
    },
    btnEditClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closeSndPopup();
    },
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
      this.closeSndPopup();
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    }
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
