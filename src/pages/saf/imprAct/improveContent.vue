<!--
  목적 : 개선내용
  Detail : 개선사항 상세내용 화면
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
            <y-label label="개선 전/후 사진" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-datepicker
                :width="6"
                :disabled="contentsCheck"
                label="조치일"
                type="today"
                name="actConfirmYmd"
                v-model="imprAct.actConfirmYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="9"
                :maxlength="150"
                :disabled="contentsCheck"
                :required="!contentsCheck"
                label="조치결과내용"
                ui="bootstrap"
                name="actResultContents"
                v-model="imprAct.actResultContents"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="9"
                :maxlength="150"
                :disabled="reviewCheck"
                :required="!reviewCheck"
                label="요청부서 조치결과검토"
                ui="bootstrap"
                name="actResultReview"
                v-model="imprAct.actResultReview"
              />
            </b-col>
          </b-row>
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
  name: 'improve-content',
  props: {
    imprAct: {
      type: Object,
      default: {
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
        flag: ''
      },
      contentsCheck: true,
      reviewCheck: true,
    }
  },
  data () {
    return {
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
      if (this.imprAct.flag === 'IMPROVE') {
        this.contentsCheck = false;
        this.reviewCheck = true;
      } else if (this.imprAct.flag === 'CONFIRM') {
        this.contentsCheck = true;
        this.reviewCheck = false;
      } else {
        this.contentsCheck = true;
        this.reviewCheck = true;
      }
    },
    fileUploadComplete () {
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
