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
    <b-row class="mt-3" ref="insertBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="기본정보 상세" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
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
                label="공급수 분류명"
                name="envOpLogStCd"
                v-model="ewtrOpLogResult.envOpLogStCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker 
                :width="8"
                :editable="editable"
                label="작성일"
                name="measureYmd"
                v-model="ewtrOpLogResult.measureYmd"
                :required="true"
                v-validate="'required'"
                :state="validateState('measureYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="15"
              ui="bootstrap"
              label="작성자"
              :disabled="true"
              name="createUserNm"
              v-model="ewtrOpLogResult.createUserNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="3"
              ui="bootstrap"
              label="요일"
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
                label="온도"
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
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="금일 폐수 단위 부피당 소모전력량"
                name="pwrcPerDay"
                v-model="ewtrOpLogResult.pwrcPerDay"
              />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              title="초기화"
              @btnClicked="btnClearClickedCallback" 
            />
            <y-btn
              v-if="editable&&insertMode"
              :action-url="insertUrl"
              :param="ewtrOpLogResult"
              :is-submit="isInsert"
              title="신규등록"
              color="orange"
              action-type="POST"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable&&updateMode"
              :action-url="editUrl"
              :param="ewtrOpLogResult"
              :is-submit="isEdit"
              title="수정"
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
  },
  data () {
    return {
      ewtrOpLogResult: {
        measureYmd: '',
        createUserNm: '개발자',
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
        pwrcPerDay: '',
        envOpLogStCd: '11',
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      editable: true,
      updateMode: false,
      insertMode: false,
      isInsert: false,
      isEdit: false,
      editUrl: '',
      insertUrl: '',
      detailUrl: '',
      envOpLogStCdItems: [],
    };
  },
  watch: {
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
      setTimeout(() => {
        this.getEnvOpLogStCdItems();
      }, 200);
      
      this.editUrl = transactionConfig.env.water.operationLog.dailyReport.edit.url;
      this.insertUrl = transactionConfig.env.water.operationLog.dailyReport.insert.url;
      this.detailUrl = selectConfig.env.water.operationLog.dailyReport.get.url;

      // 수정 또는 신규등록 버튼 Mode
      if (this.paramMeasureYmd !== '') {
        this.getDetail();
        this.updateMode = true;
      } else {
        this.insertMode = true;
      }

    },

    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.paramMeasureYmd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.ewtrOpLogResult = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getEnvOpLogStCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'ENV_OP_LOG_ST');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.envOpLogStCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '등록하시겠습니까?',
            type: 'info',
            confirmCallback: () => {
              this.isInsert = true;
            },
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              this.isEdit = true;
            },
          });
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
    btnInsertClickedCallback (_result) {
      this.ewtrOpLogResult.measureYmd = _result.data;
      this.isInsert = false;
      this.updateMode = true;      
      this.insertMode = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
    },
    btnEditClickedCallback (_result) {
      this.isEdit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.ewtrOpLogResult, this.$options.data().ewtrOpLogResult);
      this.$validator.reset();
      this.updateMode = false;
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>