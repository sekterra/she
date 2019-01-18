<!--
  목적 : 결과활용 동의서(팝업)
  작성자 : kckim
  Detail :
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
            <y-label label="건강검진 결과활용 동의서" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row align="middle">
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="12"
                :disabled="true"
                :rows="5"
                ui="bootstrap"
                name="consent"
                v-model="param.consent"
              >
              </y-textarea>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
            <y-radio
              :width="12"
              :editable="editable"
              :comboItems="agreeYnItems"
              itemText="codeNm"
              itemValue="code"
              ui="bootstrap"
              name="agreeYn"
              v-model="param.agreeYn"
              v-validate="'required'"
              :state="validateState('agreeYn')"
            />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              :param="param"
              :is-submit="false"
              type="save"
              title="예약등록"
              color="primary"
              size="small"
              action-type="POST"
              beforeSubmit = "beforeAgree"
              @beforeAgree="beforeAgree"
              @btnClicked="btnInsertClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              type="clear"
              title="목록"
              size="small"
              color="info"
              @btnClicked="closePopup" 
            />
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'checkup-result-consent',
  props: {
    popupParam: {
      type: Object,
      default: {
        heaCheckupPlanNo: 0,
        heaCheckedOrgNo: 0
      },
    },
  },
  data () {
    return {
      param: {
        consent: '',
        agreeYn: null,
      },
      baseWidth: 8,
      isAction: false,
      editable: true,
      agreeYnItems: [],
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getAgreeYnItems();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.param.consent = '제18조(검진자료의 활용)'
    },
    getAgreeYnItems () {
      setTimeout(() => {
        this.agreeYnItems = [
          { code: 'Y', codeNm: '동의합니다' },
          { code: 'N', codeNm: '동의하지 않습니다' },
        ];
      }, 100);
    },
    closePopup () {
      this.$emit('closePopup', {});
    },
    beforeAgree () {
      this.checkValidation();
    },
    checkValidation () {
      this.$validator.validateAll().then((_result) => {        
        if (_result === true) this.$emit('closePopup', { 'heaCheckupPlanNo': this.popupParam.heaCheckupPlanNo, 'heaCheckedOrgNo': this.popupParam.heaCheckedOrgNo });

        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isAction) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isAction = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    btnInsertClickedCallback (_result) {
      console.log(1);
      this.closePopup();
      this.$validator.reset();
      this.isAction = false;
    },
    btnClickedErrorCallback (_result) {
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
  }
};
</script>