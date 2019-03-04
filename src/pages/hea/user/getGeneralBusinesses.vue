<!--
  목적 : 건강상담이력 > 일반업무 상세 팝업
  작성자 : kga
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
            <y-label label="건강상담 상세" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                title="닫기"
                @btnClicked="closePopupUsage" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker 
                :width="baseWidth"
                :editable="editable"
                label="방문일"
                name="visitYmd"
                disabled="disabled"
                v-model="infirmaryUsage.visitYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :clearable="true"
                ui="bootstrap"
                name="userNm"
                label="방문자"
                disabled="disabled"
                v-model="infirmaryUsage.userNm"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="heaTreatCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                label="진료내역"
                name="heaTreatCd"
                disabled="disabled"
                v-model="infirmaryUsage.heaTreatCd"
              >
              </y-select>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                ui="bootstrap"
                label="주호소 및 증상"
                name="symptom"
                disabled="disabled"
                v-model="infirmaryUsage.symptom"
                :rows="2"
              >
              </y-textarea>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                ui="bootstrap"
                label="간호 및 상담내용"
                name="consult"
                disabled="disabled"
                v-model="infirmaryUsage.consult"
                :rows="2"
              >
              </y-textarea>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                ui="bootstrap"
                label="특이사항"
                name="remark"
                disabled="disabled"
                v-model="infirmaryUsage.remark"
                :rows="2"
              >
              </y-textarea>
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
export default {
  name: 'get-general-businesses',
  props: {
    popupParam: {
      type: Object,
      default: {
        heaInfirmaryUsageNo: 0,
        pageNm: '',
      },
    },
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
      infirmaryUsage: {
        heaInfirmaryUsageNo: 0,
        userNm: '',
        visitYmd: '',
        heaTreatCd: '',
        symptom: '',
        consult: '',
        remark: '',
      },
      baseWidth: 8,
      editable: true,
      heaTreatCdItems: [],
    };
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    init () {
      this.getHeaTreatCdItems();
      this.getInfirmaryUsage();
    },
    // 진료내역
    getHeaTreatCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_TREAT');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaTreatCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 건강상담 상세
    getInfirmaryUsage () {
      this.$http.url = this.$format(selectConfig.infirmaryUsage.get.url, this.popupParam.heaInfirmaryUsageNo);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.infirmaryUsage = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /** Button Event **/
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.editable = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: 'ERROR.. 담당자에게 연락바랍니다.',
        type: 'warning',
      });
      this.closePopupUsage();
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    // 팝업 닫기
    closePopupUsage () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    /** /Button Event **/
  }
};
</script>