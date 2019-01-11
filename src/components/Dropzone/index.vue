<!--
  TODO: vue.js + Bootstrap 샘플 예제
-->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>등록 </strong> <small>예제</small>
          </div>
          <b-row>
            <b-col sm="3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :maxlength="5"
                ui="bootstrap"
                label="건진종류명*"
                name="type"
                v-model="demo.type"
                v-validate="'required'"
                :state="validateState('type')"
              >
              </y-text>
            </b-col>
            <b-col sm="6">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :maxlength="200"
                ui="bootstrap"
                label="건진코드"
                name="test"
                v-model="demo.code"
              >
              </y-text>
            </b-col>
            <b-col sm="3">
              <y-number
                :width="baseWidth"
                :editable="editable"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="실수형"
                name="number"
                v-model="demo.number"
              >
              </y-number>
            </b-col>
            <b-col sm="3">
              <y-number
                :width="baseWidth"
                :editable="editable"
                :maxlength="10"
                ui="bootstrap"
                label="천단위 구분자"
                name="numberSeperate"
                v-model="demo.numberSeperate"
              >
              </y-number>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col sm="6">
              <y-number
                :width="baseWidth"
                :editable="editable"
                :maxlength="10"
                :pointNumber="2"
                prefix="$"
                ui="bootstrap"
                label="금액/단위(접두사)"
                name="number"
                v-model="demo.numberPrefix"
              >
              </y-number>
            </b-col>
            <b-col sm="6">
              <y-number
                :width="baseWidth"
                :editable="editable"
                :maxlength="10"
                :pointNumber="2"
                suffix="$"
                ui="bootstrap"
                label="금액/단위(접미사)"
                name="number"
                v-model="demo.numberSuffix"
              >
              </y-number>
            </b-col>
          </b-row> -->
          <b-row>
            <b-col sm="6">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboItems"
                itemText="deptName"
                itemValue="deptPk"
                ui="bootstrap"
                type="edit"
                label="Select 등록용*"
                name="selectValue"
                v-model="demo.selectValue"
                v-validate="'required'"
                :state="validateState('selectValue')"
              >
              </y-select>
            </b-col>
            <b-col sm="6">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboItems"
                itemText="deptName"
                itemValue="deptPk"
                ui="bootstrap"
                type="search"
                label="Select 조회용"
                name="selectValue"
                v-model="demo.selectValue"
              >
              </y-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <y-multi-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboItems"
                v-model="demo.mutiSelectValues"
                type="edit"
                itemText="deptName"
                itemValue="deptPk"
                ui="bootstrap"
                label="멀티 Select*"
                name="mutiSelectValues"
                v-validate="'required'"
                :state="validateState('mutiSelectValues')"
              >
              </y-multi-select> 
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <y-radio
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboItems"
                itemText="deptName"
                itemValue="deptPk"
                ui="bootstrap"
                label="Radio 예제*"
                name="radioValue"
                v-model="demo.radioValue"
                v-validate="'required'"
                :state="validateState('radioValue')"
              />
            </b-col>
            <b-col sm="6">
              <y-checkbox
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboItems"
                itemText="deptName"
                itemValue="deptPk"
                ui="bootstrap"
                label="checkbox 예제*"
                name="checkbox"
                v-model="demo.checkbox"
                v-validate="'required'"
                :state="validateState('checkbox')"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <y-textarea
                :width="baseWidth"
                :editable="editable"
                :maxlength="3000"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="demo.remark"
              >
              </y-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <!-- <div class="my-3"><em>datepicker / timepicker는 준비중이오니 y-datepicker를 그대로 사용하세요.</em></div> -->
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                label="비고"
                name="remark"
                v-model="demo.remark"
              >
              </y-datepicker>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
                <y-switch
                  :width="baseWidth"
                  :editable="editable"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="switch"
                  name="switch"
                  selectText="선택"
                  unselectText="미선택"
                  v-model="demo.switch"
                >
              </y-switch>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
                <y-shuttlebox
                  :width="baseWidth"
                  :editable="editable"
                  :items="shuttleboxItems"
                  ui="bootstrap"
                  label="shuttlebox 예제"
                  name="shwttlebox"
                  v-model="searchParam.heaDiagnoseCds"
                >
              </y-shuttlebox>
            </b-col>
          </b-row>
          <div slot="footer">
            <div class="text-right">
              <span><em>y-btn은 준비중입니다. 그대로 사용하세요.</em></span>
              <y-btn
                v-if="editable"
                :action-url="saveUrl"
                :param="searchParam"
                :is-submit="true"
                type="search"
                title="검색"
                action-type="GET"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedError="btnClickedErrorCallback"
              />
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12">
        <b-card class="mt-3">
          <y-data-table
            ui="bootstrap"
            :headers="gridHeaderOptions"
          >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row>
      <b-col sm="12">
        <b-card class="mt-3">
          <div slot="header">
            <strong>v-model </strong> <small>정보</small>
          </div>
        <div>{{demo}}</div>
        <div>{{searchParam}}</div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'sampleBootstrap',
  components: {
  },
  /** props, data, computed, watch **/
  props: {
  },
  data: () => ({
    demo: {
      type: '',
      code: '',
      number: null,
      numberSeperate: null,
      numberPrefix: null,
      numbersuffix: null,
      selectValue: null,
      mutiSelectValues: [],
      radioValue: null,
      checkbox: [],
      usable: true,
      date: null,
      remark: '',
      switch: 'Y',
      shuttlebox: []
    },
    baseWidth: 9,
    editable: true,
    gridData: [],
    gridHeaderOptions: [],
    saveUrl: '/api/hea/checkup/checkupResultsMap',
    deleteUrl: '',
    isSubmit: null,
    comboItems: [],
    shuttleboxItems: [],
    searchParam: {
      year: 2018,
      heaCheckupPlanNo: 1,
      heaDiagnoseCds: [],
      retirementYn: 'N',
      heaCheckedOrgNos: [3, 5],
      diseaseClassCd: '',
      diseaseCd: '',
    }
  }),
  computed: {
  },
  watch: {
  },
  /** created, beforeMount, mounted, beforeDestroy, destroyed **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.getDeptItems();
    this.init();
  },
  mounted () {
    setTimeout(() => {
      this.demo.type = 'test';
    }, 3000);
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  /** methods **/
  methods: {
    init () {
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: 'Date', name: 'date', width: '150', fixed: true },
        { text: 'Delivery Info', child: 
          [
            { text: 'Name', name: 'name', width: '120' },
            { text: 'Address Info', child: 
              [
                { text: 'State', name: 'state', width: '120' },
                { text: 'City', name: 'city', width: '120' },
                { text: 'Address', name: 'address', width: '120' },
                { text: 'Zip', name: 'zip', width: '120' },
              ]
            },
          ]
        }
      ];

      // TODO : backend에서 데이터를 조회해 올것
      setTimeout(() => {
        this.demo.shuttlebox = [1, 3];
      }, 1000);

      // TODO : backend에서 데이터를 조회해 올것
      setTimeout(() => {
        this.shuttleboxItems =  [
          {text: 'Orange', value: '1'},
          {text: 'Apple', value: '2'},
          {text: 'Pineapple', value: '3'},
          {text: 'Grape', value: '4'},
        ];
      }, 3000);
    },
    /** Call API service **/
    /**
     * 부서 정보를 가져옴
     */
    getDeptItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.comboItems = [
          { deptPk: '1', deptName: '경영팀' },
          { deptPk: '2', deptName: 'SDG팀' },
          { deptPk: '3', deptName: '영업팀' },
        ];
      }, 3000);
    },
    /** /Call API service **/

    /** validation checking **/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeSubmit () {
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
    /** /validation checking **/
    
    /** Events, Callbacks (버튼 제외) **/
    /** /Events, Callbacks (버튼 제외) **/

    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
    },
    btnClearClickedCallback () {
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      this.isSubmit = null;
      window.getApp.$emit('APP_REQUEST_SUCCESS', '[SAMPLE Message] 저장 Action이 요청 되었습니다. 콘솔창을 확인하세요.');
    },
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '삭제 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isSubmit = null;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/

    /** 기타 로직 **/
    /** /기타 로직 **/
  },
};
</script>

<style>

</style>
