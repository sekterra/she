<!--
  목적 : 작업허가서 연장 관리
  Detail : 작업허가서 완료/연장/취소 신청 화면
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
            <y-label label="작업허가서 정보" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="editable"
                :action-url="editUrl"
                :param="wkodMaster"
                :is-submit="isEdit"
                title="완료"
                color="black"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit('S')"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editable"
                title="연장"
                color="orange"
                @btnClicked="beforeEdit('D')"
              />
              <y-btn
                v-if="editable"
                title="취소"
                color="red"
                @btnClicked="beforeEdit('C')"
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
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-text
                :width="8"
                :disabled="true"
                ui="bootstrap"
                label="작업허가No"
                name="wkodNum"
                v-model="wkodMaster.wkodNum"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-text
                :width="8"
                :disabled="true"
                ui="bootstrap"
                label="작업종류"
                name="wkodKindNm"
                v-model="wkodMaster.wkodKindNm"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                  <y-datepicker
                    :width="8"
                    :disabled="true"
                    default="today"
                    label="작업일자/작업시간"
                    name="workYmd"
                    v-model="wkodMaster.workYmd"
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
                        :disabled="true"
                        itemText="hourNm"
                        itemValue="hour"
                        ui="bootstrap"
                        name="fromHour"
                        v-model="fromHour"
                      >
                      </y-select>
                    </b-col>
                    <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5 px-1">
                      <y-select
                        :width="12"
                        :comboItems="comboMinuteItems"
                        :disabled="true"
                        itemText="minuteNm"
                        itemValue="minute"
                        ui="bootstrap"
                        name="fromMinute"
                        v-model="fromMinute"
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
                        :disabled="true"
                        itemText="hourNm"
                        itemValue="hour"
                        ui="bootstrap"
                        name="toHour"
                        v-model="toHour"
                      >
                      </y-select>
                    </b-col>
                    <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5 px-1">
                      <y-select
                        :width="12"
                        :comboItems="comboMinuteItems"
                        :disabled="true"
                        itemText="minuteNm"
                        itemValue="minute"
                        ui="bootstrap"
                        name="toMinute"
                        v-model="toMinute"
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
              <y-text
                :width="10"
                :disabled="true"
                ui="bootstrap"
                label="작업지역"
                name="workArea"
                v-model="workArea"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-text
                :width="10"
                :disabled="true"
                ui="bootstrap"
                label="작업명"
                name="workTitle"
                v-model="wkodMaster.workTitle"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                    <b-col sm="4">
                      <y-label 
                          label="연장시간" 
                      />
                    </b-col>
                    <b-col sm="4">
                      <y-datepicker
                        :width="12"
                        :disabled="true"
                        default="today"
                        name="workYmd"
                        v-model="wkodMaster.workYmd"
                      >
                      </y-datepicker>
                    </b-col>
                    <b-col sm="4">
                      <b-row>
                        <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6 px-1">
                          <y-select
                            :width="12"
                            :comboItems="comboHourItems"
                            :disabled="!editable"
                            itemText="hourNm"
                            itemValue="hour"
                            ui="bootstrap"
                            name="workOverHour"
                            v-model="workOverHour"
                          >
                          </y-select>
                        </b-col>
                        <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6 px-1">
                          <y-select
                            :width="12"
                            :comboItems="comboMinuteItems"
                            :disabled="!editable"
                            itemText="minuteNm"
                            itemValue="minute"
                            ui="bootstrap"
                            name="workOverMinute"
                            v-model="workOverMinute"
                          >
                          </y-select>
                        </b-col>
                      </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                <b-col sm="2">
                  <y-label 
                    label="확인자" 
                    :required="true"
                  />
                </b-col>
                <b-col sm="2">
                  <y-text
                    :width="12"
                    :disabled="true"
                    ui="bootstrap"
                    name="overDeptNm"
                    v-model="wkodMaster.overDeptNm"
                    >
                  </y-text>
                </b-col>
                <b-col sm="2">
                  <y-text
                    :width="12"
                    :clearable="true"
                    :disabled="true"
                    ui="bootstrap"
                    name="overUserNm"
                    v-model="wkodMaster.overUserNm"
                    :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                    @searchUser="btnSearchUserClicked"
                  />
                </b-col>
                <b-col sm="6">
                  <y-text
                    :disabled="true"
                    ui="bootstrap"
                    name="remark"
                    v-model="remark"
                  />
                </b-col>
              </b-row>  
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="10"
                :maxlength="150"
                :disabled="!editable"
                label="비고"
                ui="bootstrap"
                name="refRemark"
                v-model="wkodMaster.refRemark"
              />
            </b-col>
          </b-row>
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
  name: 'wkod-extend',
  props: {
    popupParam: {
      type: Object,
      default: {
        wkodMaster: {}
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
      wkodMaster: {
        wkodNo: '',
        wkodNum: '',
        wkodKindCd: null,
        workYmd: '',
        workTime: '',
        workStartTime: null,
        workEndTime: null,
        workOverTime: null,
        workCompleteTime: null,
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
        createUserId: '',
        createDt: null,
        updateUserId: '',
        updateDt: null,
        refRemark: '',
      },
      comboHourItems: [], // 시
      comboMinuteItems: [], // 분
      fromHour: '0',
      fromMinute: '0',
      toHour: '0',
      toMinute: '0',
      workOverHour: '',
      workOverMinute: '',
      editable: false,
      workTime: '',
      workArea: '',
      remark: '',
      editUrl: '',
      isEdit: null,
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
      // Url Setting
      this.editUrl = transactionConfig.saf.wkodMaster.edit.url;

      var i = 0;
      for (; i < 24; i++) {
        this.comboHourItems.push({
          hourNm: i + '시',
          hour: i
        });
      }
      
      this.comboHourItems.splice(0, 0, { 'hour': '', 'hourNm': '선택' });
      
      i = 0;
      for (; i < 60; i++) {
        this.comboMinuteItems.push({
          minuteNm: i + '분',
          minute: i
        });
      }
      this.comboMinuteItems.splice(0, 0, { 'minute': '', 'minuteNm': '선택' });

      this.getList();
    },
    beforeEdit (flag) {
      var errorCheckMessage = '';
      var confirmMessage = '';
      var oldOverYn = this.wkodMaster.overYn;
      var oldWkodStepCd = this.wkodMaster.wkodStepCd;
      
      if (this.workOverHour !== '' && this.workOverMinute !== '') {
        this.wkodMaster.workOverTime = new Date(this.$comm.getToday() + " " + this.workOverHour + ":" + this.workOverMinute);
      } else {
        this.wkodMaster.workOverTime = null;
      }
      // 완료 버튼 클릭시
      if (flag === 'S') {
        this.wkodMaster.wkodStepCd = 'WKS05';
        confirmMessage = '완료 하시겠습니까?';
      // 연장 버튼 클릭시
      } else if (flag === 'D') {
        this.wkodMaster.overYn = 'Y';
        confirmMessage = '연장 하시겠습니까?';
        // 연장 버튼 클릭시 연장 시간 입력 체크
        if (this.wkodMaster.workOverTime === null) {
          errorCheckMessage = '연장시간을 입력하세요.';
        }
      // 취소 버튼 클릭시  
      } else {
        this.wkodMaster.wkodStepCd = 'WKS06';
        confirmMessage = '취소 하시겠습니까?';
      }

      if ((oldOverYn === 'N' || oldOverYn === null) && this.wkodMaster.overYn !== 'Y') {
        this.wkodMaster.workOverTime = null;
      }

      // validateState 함수를 이용할 경우 입력란이 disabled의 경우 validate체크가 되지 않아 별도 체크 진행
      if (this.wkodMaster.overUserId === '' || this.wkodMaster.overUserId === null) {
        errorCheckMessage = '확인자는 필수 입력값입니다.'
      }

      if (errorCheckMessage !== '') {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: errorCheckMessage,
          type: 'warning',  // success / info / warning / error
        });
        return;
      }

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: confirmMessage,
        type: 'info', 
        confirmCallback: () => {
          this.isEdit = true;
        },
        cancelCallback: () => {
          this.wkodMaster.overYn = oldOverYn;
          this.wkodMaster.wkodStepCd = oldWkodStepCd;
        }
      });
    },
    getList () {
      this.$http.url = this.$format(selectConfig.saf.wkodMaster.get.url, this.popupParam.wkodMaster.wkodNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        Object.assign(this.wkodMaster, _result.data);
        
        this.fromHour = new Date(this.wkodMaster.workStartTime).getHours();
        this.fromMinute = new Date(this.wkodMaster.workStartTime).getMinutes();
          
        this.toHour = new Date(this.wkodMaster.workEndTime).getHours();
        this.toMinute = new Date(this.wkodMaster.workEndTime).getMinutes();

        this.workArea = this.wkodMaster.processNm + " / " + this.wkodMaster.workArea;
        
        if (this.wkodMaster.wkodStepCd === 'WKS04') this.editable = true;
        if (this.wkodMaster.updateDt !== null) this.wkodMaster.updateDt = new Date(this.wkodMaster.updateDt);

        if (this.wkodMaster.workOverTime !== null) {
          this.workOverHour = new Date(this.wkodMaster.workOverTime).getHours();
          this.workOverMinute = new Date(this.wkodMaster.workOverTime).getMinutes();
        } 
        
        if (this.wkodMaster.wkodStepCd === 'WKS05') this.remark = this.wkodMaster.workCompleteTime + ' 완료 처리됨';
        else if (this.wkodMaster.wkodStepCd === 'WKS06') this.remark = this.wkodMaster.workCompleteTime + ' 취소 처리됨';
        else if (this.wkodMaster.wkodStepCd === 'WKS04' && this.wkodMaster.overYn === 'Y') this.remark = this.wkodMaster.overConfirmDt + ' 연장 처리됨';
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    btnSearchUserClicked (_item) {
      if (!this.editable) return;

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
        this.wkodMaster.overUserId = data.user.userId;
        this.wkodMaster.overUserNm = data.user.userNm;
        this.wkodMaster.overDeptCd = data.user.deptCd;
        this.wkodMaster.overDeptNm = data.user.deptNm;
      }
    },
    closePopup (data) {
      this.$emit('closePopup', {});
    },
    btnEditClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '처리되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    btnClickedErrorCallback (_result) {
      // this.$emit('APP_REQUEST_ERROR', _result);
    }
  }
};
</script>

<style>

</style>
