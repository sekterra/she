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
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="12"
                ui="bootstrap"
                name="consent"
                :rows="5"
                v-model="param.consent"
              >
              </y-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
            <y-radio
              :width="baseWidth"
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
              :action-url="insertUrl"
              :param="param"
              :is-submit="isSubmit"
              type="save"
              title="예약등록"
              color="primary"
              size="small"
              action-type="POST"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              type="search"
              title="목록"
              color="primary"
              size="small"
              @btnClicked="$emit('close')"
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
  },
  data () {
    return {
      param: {
        consent: '',
        agreeYn: null,
      },
      isSubmit: false,
      baseWidth: 8,
      editable: true,
      agreeYnItems: [],
      insertUrl: '',
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
      }, 3000);
    },
    beforeInsert () {
      this.checkValidation();
    },
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    btnInsertClickedCallback (_result) {
      this.$validator.reset();
      this.isSubmit = false;
      window.getApp.emit('APP_REQUEST_SUCCESS', "정상적으로 등록 되었습니다.");
      this.$emit('close')
    },
    btnClickedErrorCallback (_result) {
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
  }
};
</script>