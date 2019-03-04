<!--
  목적 : 대기-운영일지 상세
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
    
    <component :is="compDailyReport" v-if="compDailyReport" :measureEditable="popupParam.measureEditable" :selectedMeasureYmd="popupParam.measureYmd" :isSaveDailyReport="isSaveDailyReport" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="compOutletChkResultRunTm" v-if="compOutletChkResultRunTm" :measureEditable="popupParam.measureEditable" :selectedMeasureYmd="popupParam.measureYmd" :isSaveOutletChkResultRunTm="isSaveOutletChkResultRunTm" @callbackSaveOperationLog="callbackSaveOperationLog" @changeFlowPerDay="changeFlowPerDay" />
    <component :is="compPreventPwrcChkResult" v-if="compPreventPwrcChkResult" :measureEditable="popupParam.measureEditable" :selectedMeasureYmd="popupParam.measureYmd" :isSavePreventPwrcChkResult="isSavePreventPwrcChkResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
    <component :is="compOutletTestItemResult" v-if="compOutletTestItemResult" :measureEditable="popupParam.measureEditable" :selectedMeasureYmd="popupParam.measureYmd" :isSaveOutletTestItemResult="isSaveOutletTestItemResult" @callbackSaveOperationLog="callbackSaveOperationLog" :isChangeFlowPerDay="isChangeFlowPerDay" />
    <b-row>
      <b-col sm="6">
        <component :is="compFuelCheckResult" v-if="compFuelCheckResult" :measureEditable="popupParam.measureEditable" :selectedMeasureYmd="popupParam.measureYmd" :isSaveFuelCheckResult="isSaveFuelCheckResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
      </b-col>
      <b-col sm="6">
        <component :is="compIngredientCheckResult" v-if="compIngredientCheckResult" :measureEditable="popupParam.measureEditable" :selectedMeasureYmd="popupParam.measureYmd" :isSaveIngredientCheckResult="isSaveIngredientCheckResult" @callbackSaveOperationLog="callbackSaveOperationLog" />
      </b-col>
    </b-row>

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
import selectConfig from '@/js/selectConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'operation-log-base',
  components: {
  },
  props: {
    popupParam: {
      type: Object,
      default: {
        measureEditable: true,
        measureYmd: ''
      },
    },
  },
  data: function () {
    return {
      editable: true,

      isChangeFlowPerDay: false,

      isSaveDailyReport: false,
      isSaveOutletChkResultRunTm: false,
      isSavePreventPwrcChkResult: false,
      isSaveOutletTestItemResult: false,
      isSaveFuelCheckResult: false,
      isSaveIngredientCheckResult: false,

      compDailyReport: null,
      compOutletChkResultRunTm: null,
      compPreventPwrcChkResult: null,
      compOutletTestItemResult: null,
      compFuelCheckResult: null,
      compIngredientCheckResult: null,
    };
  },
  watch: {
    tabIndex () {
      setTimeout(() => {
        this.loadComponent();
      }, 200); 
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
    this.loadComponent(); 
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
    },
    loadComponent () {
      this.compDailyReport = () => import(`${'./dailyReport.vue'}`);
      this.compOutletChkResultRunTm = () => import(`${'./outletChkResultRunTm.vue'}`);
      this.compPreventPwrcChkResult = () => import(`${'./preventPwrcChkResult.vue'}`);
      this.compOutletTestItemResult = () => import(`${'./outletTestItemResult.vue'}`);
      this.compFuelCheckResult = () => import(`${'./fuelCheckResult.vue'}`);
      this.compIngredientCheckResult = () => import(`${'./ingredientCheckResult.vue'}`);
    },
    closePopup () {
      this.$emit('closePopup', {});
    },
    printOperationLog () {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '운영일지 출력 화면 개발중입니다.',
        type: 'success',
      });
    },
    changeFlowPerDay () {
      this.isChangeFlowPerDay = true;
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
          this.isSaveOutletChkResultRunTm = true;
          this.isSavePreventPwrcChkResult = true;
          this.isSaveOutletTestItemResult = true;
          this.isSaveFuelCheckResult = true;
          this.isSaveIngredientCheckResult = true;
        }
      });
    },
    callbackSaveOperationLog (data) {      
      if (data.isSaveDailyReport) this.isSaveDailyReport = false;
      else if (data.isSaveOutletChkResultRunTm) this.isSaveOutletChkResultRunTm = false;
      else if (data.isSavePreventPwrcChkResult) this.isSavePreventPwrcChkResult = false;
      else if (data.isSaveOutletTestItemResult) this.isSaveOutletTestItemResult = false;
      else if (data.isSaveFuelCheckResult) this.isSaveFuelCheckResult = false;
      else if (data.isSaveIngredientCheckResult) this.isSaveIngredientCheckResult = false;      

      // 전체 false 일 경우 저장완료
      if (!this.isSaveDailyReport 
        && !this.isSaveOutletChkResultRunTm 
        && !this.isSavePreventPwrcChkResult 
        && !this.isSaveOutletTestItemResult
        && !this.isSaveFuelCheckResult
        && !this.isSaveIngredientCheckResult) {
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