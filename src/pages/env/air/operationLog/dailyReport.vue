<!--
  목적 : 대기 운영일지-기본정보
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12"> 
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :disabled="true"
                ui="bootstrap"
                label="작성자"
                v-model="displayCreateUser"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="envOpLogStCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="envOpLogStCd"
                label="상태"
                v-model="opLogResult.envOpLogStCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :maxlength="30"
                ui="bootstrap"
                name="weather"
                label="날씨"
                v-model="opLogResult.weather"
                :required="true"
                v-validate="'required'"
                :state="validateState('weather')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="온도(℃)"
                name="temp"
                v-model="opLogResult.temp"
                :required="true"
                v-validate="'required'"
                :state="validateState('temp')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="습도(%)"
                name="hum"
                v-model="opLogResult.hum"
                :required="true"
                v-validate="'required'"
                :state="validateState('hum')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="기압(mb)"
                name="airPress"
                v-model="opLogResult.airPress"
                :required="true"
                v-validate="'required'"
                :state="validateState('airPress')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :maxlength="30"
                ui="bootstrap"
                name="windDir"
                label="풍향(풍)"
                v-model="opLogResult.windDir"
                :required="true"
                v-validate="'required'"
                :state="validateState('windDir')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="풍속(m/sec)"
                name="windSpeed"
                v-model="opLogResult.windSpeed"
                :required="true"
                v-validate="'required'"
                :state="validateState('windSpeed')"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                name="envEngrOpn"
                label="환경기술인의견"
                v-model="opLogResult.envEngrOpn"
                :required="true"
                v-validate="'required'"
                :state="validateState('envEngrOpn')"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
                :width="10"
                :editable="editable"
                :maxlength="30"
                ui="bootstrap"
                label="기타"
                name="remark"
                v-model="opLogResult.remark"
                />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-show="false"
              v-if="editable&&measureEditable"
              :action-url="editUrl"
              :param="opLogResult"
              :is-submit="isUpdateSubmit"
              title="저장"
              color="orange"
              action-type="put"
              beforeSubmit = "beforeUpdateSubmit"
              @beforeUpdateSubmit="beforeUpdateSubmit"
              @btnClicked="btnUpdateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  name: 'daily-report',
  props: {
    measureEditable: 0,
    selectedMeasureYmd: '',
    isSaveDailyReport: false
  },
  data () {
    return {
      opLogResult: {
        measureYmd: null,
        day: null,
        weather: null,
        temp: null,
        clearYn: 'N',
        cloudyYn: 'N',
        cloudYn: 'N',
        snowYn: 'N',
        rainYn: 'N',
        hum: null,
        airPress: null,
        windDir: null,
        windSpeed: null,
        envEngrOpn: null,
        remark: null,        
        envOpLogStCd: null,
        createDeptCd: null,
        createDeptNm: null,
        createUserId: null,
        createUserNm: null,
        createDt: null,
      },
      editable: true,
      isUpdateSubmit: false,

      envOpLogStCdItems: [],

      editUrl: '',
      detailUrl: ''
    };
  },
  computed: {
    displayCreateUser: {
      get: function () {
        return this.opLogResult.createDeptNm + ' / ' + this.opLogResult.createUserNm;
      },
      set: function (newValue) {
      }
    }
  },
  watch: {
    isSaveDailyReport: function (newValue, oldValue) {
      if (this.isSaveDailyReport) {
        this.beforeUpdateSubmit();
      }
    }
  },
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
  beforeDestory () {
    this.init();
  },
  methods: {
    init () {
      setTimeout(() => {
        this.getEnvOpLogStCdItems();
      }, 200);

      this.editUrl = transactionConfig.env.air.operationLog.edit.url;
      this.detailUrl = selectConfig.env.air.operationLog.get.url;
      
      this.getDetail();
    },
    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.selectedMeasureYmd);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.opLogResult = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEnvOpLogStCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'ENV_OP_LOG_ST');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.envOpLogStCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    beforeUpdateSubmit () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSaveDailyReport) this.isUpdateSubmit = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '운영일지 기본정보를 저장하시겠습니까?',
              type: 'info',
              confirmCallback: () => {
                this.isUpdateSubmit = true;
              }
            });
          }
        }
      }).catch(() => {
        this.isUpdateSubmit = false;
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      if (this.isSaveDailyReport) this.$emit('callbackSaveOperationLog', { 'isSaveDailyReport': true });
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '운영일지 기본정보를 정상적으로 저장하였습니다.',
          type: 'success',
        });
      }
    },
    btnClickedErrorCallback (_result) {
      this.isUpdateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
  }
};
</script>