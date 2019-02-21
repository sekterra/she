<!--
  목적 : 등록/접수/조치결과 - 발생내용
  Detail : 발생내용
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="600"
                ui="bootstrap"
                label="사고발생내용"
                name="contents"
                v-model="accidentDetail.contents"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="600"
                ui="bootstrap"
                label="추정원인"
                name="provReason"
                v-model="accidentDetail.provReason"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-radio
                :width="10"
                :comboItems="comboCauTypeItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="원인유형"
                name="cauTypeCd"
                v-model="accidentDetail.cauTypeCd"
              />
            </b-col>
            <b-col v-if="isEtc" sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="50"
              ui="bootstrap"
              label="원인유형 기타"
              name="cauTypeEtc"
              v-model="accidentDetail.cauTypeEtc"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="600"
                ui="bootstrap"
                label="초기대책"
                name="bgnMeas"
                v-model="accidentDetail.bgnMeas"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-accident-contents',
  props: {
    safAccidentNo: 0,
  },
  data: () => ({
    accidentDetail: {
      safAccidentNo: 0,
      contents: '', // 사고발생내용
      provReason: '', // 추정원인
      cauTypeCd: '', // 원인유형코드
      cauTypeEtc: '', // 원인유형기타
      bgnMeas: '', // 초기대책
    },
    comboCauTypeItems: [], // 원인유형
    searchUrl: '',
    isEtc: false,
  }),
  watch: {
    'safAccidentNo': function (newValue, oldValue) {
      this.getList();
    },
    'accidentDetail.cauTypeCd': function (newValue, oldValue) {
      if (newValue.length > 0 && newValue === 'CAU13')
      {
        this.isEtc = true;
      }
      else
      {
        this.isEtc = false;
      }
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
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.searchUrl = selectConfig.saf.accident.get.url;
      this.getComboItems('SAF_CAU_TYPE'); // 원인유형
    },
    /**
     * 공통 마스터 정보 조회 (원인유형)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_CAU_TYPE')
        {
          this.comboCauTypeItems = this.$_.clone(_result.data);
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 안전점검결과 목록 조회 **/
    getList () {
      this.$http.url = this.$format(this.searchUrl, this.safAccidentNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.accidentDetail = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
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
    /** end button 관련 이벤트 **/
  }
};
</script>
<style>
#cauTypeCd {
  height: auto;
}
</style>