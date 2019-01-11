<!--
  목적 : 건강검진예약
  Detail : 사용자의 건강검진 예약 현황 및 예약을 하는 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-row>
            <b-col sm="12">
              <y-label label="{사용자이름} 님의 건강검진예약 메뉴입니다."></y-label>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
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
            :rows="3"
            label="예약 건강검진 알림"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="건강검진항목 상세" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="comboCheckupOrgItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                name="heaCheckupOrgNo"
                label="건강검진병원 선택"
                v-model="checkupResult.heaCheckupOrgNo"
                v-validate="'required'"
                :state="validateState('heaCheckupOrgNo')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              ui="bootstrap"
              name="heaCheckupTypeNm"
              label="건강검진유형"
              v-model="checkupResult.heaCheckupTypeNm"
              v-validate="'required'"
              :state="validateState('heaCheckupTypeNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-checkbox
                :width="10"
                :editable="editable"
                :comboItems="heaOptionalTestItems"
                itemText="heaTestItemNm"
                itemValue="heaTestItemCd"
                ui="bootstrap"
                name="selectedTestItemCd"
                label="선택항목(택1)"
                v-model="checkupResult.selectedTestItemCd"
                />  
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :editable="editable"
                label="예약일자 확인"
                name="reserveYmd"
                v-model="checkupResult.reserveYmd"
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
  name: 'y-checkup-reserve',
  props: {
  },
  data: () => ({
    checkupResult: {
      heaCheckupOrgNo: '',
      heaCheckupTypeNm: '',
      selectedTestItemCd: [],
      reserveYmd: '',
    },
    baseWidth: 9,
    editable: true,
    isSubmit: false,
    isSubmit2: false,
    gridData: [],
    gridHeaderOptions: [],
    comboCheckupOrgItems: [],
    heaOptionalTestItems: [],
    saveUrl: '',
    insertUrl: '',
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getComboItems('Org', this.comboCheckupOrgItems); // 건강 검진 계획별 기관
    this.getComboItems('TestItem', this.heaOptionalTestItems); // 기관별 검사항목(선택항목)
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
        this.saveUrl = transactionConfig.disease.edit.url;
        this.insertUrl = transactionConfig.disease.insert.url;
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진년도', name: 'year', width: '150px', align: 'center' },
        { text: '건강검진종류', name: 'heaCheckupClassNm', width: '150px', },
        { text: '예약병원', name: 'heaCheckupOrgNm', width: '200px' },
        { text: '예약일자', name: 'reserveYmd', width: '150px', align: 'center' },
        { text: '검진일자', name: 'heaCheckedYmd', width: '150px', align: 'center' },
        { text: '예약관리', name: 'reserveManage', width: '150px', align: 'center' }
      ];
    },

    getComboItems (scop, _target) {
      if (scop === 'Org')
      {
        this.$http.url = selectConfig.comCodeMaster.get.url;
      }
      else
      {
        this.$http.url = selectConfig.comCodeMaster.get.url;
      }
      // this.$http.type = 'GET';
      // this.$http.request((_result) => {
      //   _target = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
    },

    /** 저장 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.isSubmit2 = true;
    },
    beforeInsert () {
      this.checkValidation();
    },
    /**
     * 저장전 유효성 검사
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
      // this.$http.url = selectConfig.disease.list.url;
      // this.$http.type = 'GET';
      // this.$http.request((_result) => {
      //   this.gridData = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
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
      // this.$emit('APP_REQUEST_SUCCESS', '저장 버튼이 클릭 되었습니다.');
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
        window.alert("저장에 실패하였습니다.");
      }
      else
      {
        window.alert("저장하였습니다.");
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