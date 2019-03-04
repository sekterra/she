<!--
  목적 : 운영일지 기본정보
  작성자 : kkc
  Detail : 운영일지 기본정보 상세,등록,수정
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <!-- 등록 -->
    <b-row ref="insertBox">
      <b-col sm="12">
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="envOpLogStCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                :disabled="true"
                label="작성 구분"
                name="envOpLogStCd"
                v-model="ewtrOpLogResult.envOpLogStCd"
                :required="true"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              ui="bootstrap"
              label="작성자"
              :disabled="true"
              v-model="displayCreateUser"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              ui="bootstrap"
              label="요일"
              :disabled="true"
              name="day"
              v-model="ewtrOpLogResult.day"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="30"
              ui="bootstrap"
              label="날씨"
              name="weather"
              v-model="ewtrOpLogResult.weather"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="온도(℃)"
                name="temp"
                v-model="ewtrOpLogResult.temp"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="슬러지 발생량"
                name="amtSludgeGen"
                v-model="ewtrOpLogResult.amtSludgeGen"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="슬러지 처리량"
                name="amtSludgeTx"
                v-model="ewtrOpLogResult.amtSludgeTx"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="슬러지 보관량"
                name="amtSludgeSto"
                v-model="ewtrOpLogResult.amtSludgeSto"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="함수율"
                name="sludgeMc"
                v-model="ewtrOpLogResult.sludgeMc"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="30"
              ui="bootstrap"
              label="보관장소"
              name="sludgeStoPo"
              v-model="ewtrOpLogResult.sludgeStoPo"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="30"
              ui="bootstrap"
              label="처리장소"
              name="sludgeTxPo"
              v-model="ewtrOpLogResult.sludgeTxPo"
              >
              </y-text>
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-show="false"
              v-if="editable&&measureEditable"
              :action-url="editUrl"
              :param="ewtrOpLogResult"
              :is-submit="isEdit"
              title="저장"
              color="orange"
              action-type="PUT"
              beforeSubmit = "beforeEdit"
              @beforeEdit="beforeEdit"
              @btnClicked="btnEditClickedCallback" 
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
  /* attributes: name, components, props, data */
  name: 'daily-report',
  props: {
    paramMeasureYmd: '',
    measureEditable: 0,
    isSaveDailyReport: false,
  },
  data () {
    return {
      ewtrOpLogResult: {
        measureYmd: '',
        createUserNm: '',
        deptNm: '',
        createUserId: '',
        day: '',
        weather: '',
        temp: '',
        amtSludgeGen: '',
        amtSludgeTx: '',
        amtSludgeSto: '',
        sludgeMc: '',
        sludgeStoPo: '',
        sludgeTxPo: '',
        envOpLogStCd: '11',
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      editable: true,
      isEdit: false,
      editUrl: '',
      detailUrl: '',
      envOpLogStCdItems: [],
    };
  },
  computed: {
    displayCreateUser: {
      get: function () {
        return this.ewtrOpLogResult.deptNm + '/' + this.ewtrOpLogResult.createUserNm;
      },
      set: function (newValue) {
      }
    }
  },
  watch: {
    isSaveDailyReport: function (newValue, oldValue) {
      if (this.isSaveDailyReport) {
        this.beforeEdit();
      }
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
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.getEnvOpLogStCdItems();
      
      this.editUrl = transactionConfig.env.water.operationLog.dailyReport.edit.url;
      this.detailUrl = selectConfig.env.water.operationLog.dailyReport.get.url;

      // 수정 또는 신규등록 버튼 Mode
      if (this.paramMeasureYmd !== '') {
        this.getDetail();
      }

    },

    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.paramMeasureYmd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.ewtrOpLogResult = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEnvOpLogStCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'ENV_OP_LOG_ST');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.envOpLogStCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          if (this.isSaveDailyReport) this.isEdit = true;
          else {
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: '운영일지 기본정보를 저장하시겠습니까?',
              type: 'info', 
              confirmCallback: () => {
                this.isEdit = true;
              },
            });
          }
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },

    /**
     * 필수입력값 유효성 검사
     */
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    
    /** button 관련 이벤트 **/
    btnEditClickedCallback (_result) {
      this.isEdit = false;
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
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>
.container-fluid {
  /* 내부로 들어가므로 padding 제거 */
  padding-right: 0px;
  padding-left: 0px;
}
</style>