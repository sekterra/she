<!--
  목적 : 운영일지 팝업
  작성자 : kkc
  Detail : 탭들을 묶은 화면
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
            <y-label label="기본정보" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                title="운영일지출력"
                color="black"
                @btnClicked="printOperationLog" 
              />
              <y-btn
                v-if="editable&&popupParam.measureEditable"
                title="일괄저장"
                color="orange"
                @btnClicked="saveOperationLog" 
              />
              <y-btn
                v-if="editable&&popupParam.measureEditable"
                title="기본정보 저장"
                color="orange"
                @btnClicked="saveDailyReport" 
              />
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>        
      </b-col>
    </b-row>

    <component :is="comDailyReport" v-if="comDailyReport" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveDailyReport="isSaveDailyReport" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="comDischRunTm" v-if="comDischRunTm" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveDischRunTm="isSaveDischRunTm" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="comPreventRunTm" v-if="comPreventRunTm" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSavePreventRunTm="isSavePreventRunTm" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="comSuplChkResult" v-if="comSuplChkResult" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveSuplChkResult="isSaveSuplChkResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="comDischChkResult" v-if="comDischChkResult" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveDischChkResult="isSaveDischChkResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="comPwrcChkResult" v-if="comPwrcChkResult" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSavePwrcChkResult="isSavePwrcChkResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <b-row>
      <b-col sm="6">
        <component :is="comIngrChkResult" v-if="comIngrChkResult" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveIngrChkResult="isSaveIngrChkResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
      </b-col>
      <b-col sm="6">
        <component :is="comChemChkResult" v-if="comChemChkResult" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveChemChkResult="isSaveChemChkResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
      </b-col>
    </b-row>
    <component :is="comAerationTankChkResult" v-if="comAerationTankChkResult" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveAerationTankChkResult="isSaveAerationTankChkResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="comTestItemResult" v-if="comTestItemResult" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" :measureEditable="popupParam.measureEditable" :isSaveTestItemResult="isSaveTestItemResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
  
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
            v-if="editable&&popupParam.measureEditable"
            title="일괄저장"
            color="orange"
            @btnClicked="saveOperationLog" 
          />
          <y-btn
            title="닫기"
            @btnClicked="closePopup" 
          />
        </div>  
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  /* attributes: name, components, props, data */
  name: 'op-log-base',
  components: {
  },
  props: {
    popupParam: {
      type: Object,
      default: {
        measureEditable: true,
        paramMeasureYmd: ''
      },
    },
  },
  data: function () {
    return {
      editable: true,

      isSaveDailyReport: false,
      isSaveDischRunTm: false,
      isSavePreventRunTm: false,
      isSaveSuplChkResult: false,
      isSaveDischChkResult: false,
      isSaveIngrChkResult: false,
      isSavePwrcChkResult: false,
      isSaveChemChkResult: false,
      isSaveAerationTankChkResult: false,
      isSaveTestItemResult: false,

      comDailyReport: null,
      comDischRunTm: null,
      comPreventRunTm: null,
      comSuplChkResult: null,
      comDischChkResult: null,
      comIngrChkResult: null,
      comPwrcChkResult: null,
      comChemChkResult: null,
      comAerationTankChkResult: null,
      comTestItemResult: null,

      paneName: '',
    };
  },
  watch: {
    tabIndex () {
      setTimeout(() => {
        this.loadComponent();
      }, 200); 
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
  },
  mounted () {
    this.loadComponent();
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    loadComponent () {
      this.comDailyReport = () => import(`${'./dailyReport.vue'}`);
      this.comDischRunTm = () => import(`${'./dischRunTm.vue'}`);
      this.comPreventRunTm = () => import(`${'./preventRunTm.vue'}`);
      this.comSuplChkResult = () => import(`${'./suplChkResult.vue'}`);
      this.comDischChkResult = () => import(`${'./dischChkResult.vue'}`);
      this.comIngrChkResult = () => import(`${'./ingrChkResult.vue'}`);
      this.comPwrcChkResult = () => import(`${'./pwrcChkResult.vue'}`);
      this.comChemChkResult = () => import(`${'./chemChkResult.vue'}`);
      this.comAerationTankChkResult = () => import(`${'./aerationTankChkResult.vue'}`);
      this.comTestItemResult = () => import(`${'./testItemResult.vue'}`);
    },
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    printOperationLog () {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '운영일지 출력 화면 개발중입니다.',
        type: 'success',
      });
    },
    saveDailyReport () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '운영일지 기본정보를 저장하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.isSaveDailyReport = true;
        }
      });
    },
    saveOperationLog () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '운영일지 정보를 일괄 저장하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.isSaveDailyReport = true;
          this.isSaveDischRunTm = true;
          this.isSavePreventRunTm = true;
          this.isSaveSuplChkResult = true;
          this.isSaveDischChkResult = true;
          this.isSaveIngrChkResult = true;
          this.isSavePwrcChkResult = true;
          this.isSaveChemChkResult = true;
          this.isSaveAerationTankChkResult = true;
          this.isSaveTestItemResult = true;
        }
      });
    },
    callbackSaveOperationLog (data) {
    
      if (data.isSaveDailyReport) this.isSaveDailyReport = false;
      else if (data.isSaveDischRunTm) this.isSaveDischRunTm = false;
      else if (data.isSavePreventRunTm) this.isSavePreventRunTm = false;
      else if (data.isSaveSuplChkResult) this.isSaveSuplChkResult = false;
      else if (data.isSaveDischChkResult) this.isSaveDischChkResult = false;
      else if (data.isSaveIngrChkResult) this.isSaveIngrChkResult = false;
      else if (data.isSavePwrcChkResult) this.isSavePwrcChkResult = false;
      else if (data.isSaveChemChkResult) this.isSaveChemChkResult = false;
      else if (data.isSaveAerationTankChkResult) this.isSaveAerationTankChkResult = false;
      else if (data.isSaveTestItemResult) this.isSaveTestItemResult = false;
      console.log('@@@@@this.isSaveDailyReport' + this.isSaveDailyReport);
      console.log('@@@@@this.isSaveDischRunTm' + this.isSaveDischRunTm);
      console.log('@@@@@this.isSavePreventRunTm' + this.isSavePreventRunTm);
      console.log('@@@@@this.isSaveSuplChkResult' + this.isSaveSuplChkResult);
      console.log('@@@@@this.isSaveDischChkResult' + this.isSaveDischChkResult);
      console.log('@@@@@this.isSaveIngrChkResult' + this.isSaveIngrChkResult);
      console.log('@@@@@this.isSavePwrcChkResult' + this.isSavePwrcChkResult);
      console.log('@@@@@this.isSaveChemChkResult' + this.isSaveChemChkResult);
      console.log('@@@@@this.isSaveAerationTankChkResult' + this.isSaveAerationTankChkResult);
      console.log('@@@@@this.isSaveTestItemResult' + this.isSaveTestItemResult);

      this.subcallback();
    },
    subcallback () {
      // 전체 false 일 경우 저장완료
      if (!this.isSaveDailyReport 
        && !this.isSaveDischRunTm 
        && !this.isSavePreventRunTm 
        && !this.isSaveSuplChkResult
        && !this.isSaveDischChkResult
        && !this.isSaveIngrChkResult
        && !this.isSavePwrcChkResult
        && !this.isSaveChemChkResult
        && !this.isSaveAerationTankChkResult
        && !this.isSaveTestItemResult) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '운영일지 정보를 정상적으로 저장하였습니다.',
          type: 'success',
        });
      }
    }
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