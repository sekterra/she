<!--
  목적 : 건강검진 - 유소견자 메일발송
  Detail : 건강검진 결과에 유소견자 메일, 알림톡, SMS 발송하는 화면
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
            <y-label label="메일 내용" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="false"
              :maxlength="5"
              :required="true"
              ui="bootstrap"
              label="발신자"
              name="caller"
              v-model="mail.caller"
              v-validate="'required'"
              :state="validateState('caller')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="30"
              :required="true"
              ui="bootstrap"
              label="제목"
              name="title"
              v-model="mail.title"
              v-validate="'required'"
              :state="validateState('title')"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="메일 내용"
                name="mailContent"
                v-model="mail.mailContent"
                v-validate="'required'"
                :state="validateState('mailContent')"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="알림톡 내용"
                name="talkContent"
                v-model="mail.talkContent"
                v-validate="'required'"
                :state="validateState('talkContent')"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="SMS 내용"
                name="smsContent"
                v-model="mail.smsContent"
                v-validate="'required'"
                :state="validateState('smsContent')"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
          <b-col sm="12" class="px-0">
            <y-data-table 
              ref="dataTable"
              :headers="gridHeaderOptions"
              :items="gridData"
              :editable="editable"
              :excel-down="true"
              :print="true"
              :rows="5"
              label="유소견자 대상자"
              >
            </y-data-table>
          </b-col>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-suspect-send',
  props: {
  },
  data: () => ({
    mail: {
      title: '',
      mailContent: '',
      talkContent: '',
      heaDiseaseNm: '',
    },
    searchParam: {
      heaDiseaseClassCd: '',
      heaDiseaseNm: '',
    },
    baseWidth: 9,
    editable: true,
    isSubmit: false,
    isSubmit2: false,
    gridData: [],
    gridHeaderOptions: [],
    comboDisaseTypeItems: [],
    comboDisaseTypeSelectItems: [],
    radioItems: null,
    saveUrl: '',
    insertUrl: '',
    searchUrl: '',
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getComboItems('HEA_DISEASE_CLASS'); // 질환종류
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.disease.list.url;
        this.saveUrl = transactionConfig.disease.edit.url;
        this.insertUrl = transactionConfig.disease.insert.url;
        // radio 버튼 셋팅
        this.radioItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '15%', },
        { text: '질환명', name: 'heaDiseaseNm', width: '10%', },
        { text: '비고', name: 'remark', width: '50%' },
        { text: '출력순서', name: 'sortOrder', width: '10%', align: 'center' },
        { text: '사용여부', name: 'useYn', width: '10%', align: 'center' }
      ];
    },
    // 입력 setting
    ReceivesData (data) {
      Object.assign(this.disease, data);
      this.disease.useYn = data.useYn === '사용' ? 'Y' : 'N';
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.comCodeMaster.get.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDisaseTypeItems = _result.data;
        this.comboDisaseTypeSelectItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.isSubmit2 = true;
    },
    beforeInsert () {
      this.checkValidation();
    },
    /**
     * 수정전 유효성 검사
     */
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    getList () {
      this.$http.url = selectConfig.disease.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.isSubmit = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      this.getList();
      this.btnClearClickedCallback();
      this.isSubmit2 = false;
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      this.btnClearClickedCallback();
      this.isSubmit = false;

      if (_result.data === -1) 
      {
        window.alert("입력한 질환 코드가 있습니다. 다시 입력해 주세요.");
      }
      else if (_result.data === 0)
      {
        window.alert("수정에 실패하였습니다.");
      }
      else
      {
        window.alert("수정하였습니다.");
      }
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.disease, this.$options.data().disease);
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;
      this.isSubmit2 = false;
      this.btnClearClickedCallback();
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
