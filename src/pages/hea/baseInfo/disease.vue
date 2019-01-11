<!--
  목적 : 질환 기준정보 - 질환
  Detail : 질환 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
    <b-row>
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header" >
            <!-- <div class="float-left"> -->
              <y-label label="검색" />
            <!-- </div> -->
            <div class="float-right">
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                type="search"
                title="검색"
                size="mini"
                color="success"
                icon="el-icon-search"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="comboDisaseTypeSelectItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="질환종류"
                name="heaDiseaseClassCd"
                v-model="searchParam.heaDiseaseClassCd"
              >
            </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="baseWidth"
              :editable="editable"
              ui="bootstrap"
              label="질환명"
              name="heaDiseaseNm"
              v-model="searchParam.heaDiseaseNm"
              >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <!-- <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="질환" />
            </div>
          </div> -->
          <b-col sm="12" class="px-0">
            <y-data-table 
              ref="dataTable"
              :headers="gridHeaderOptions"
              :items="gridData"
              :editable="editable"
              :excel-down="true"
              :print="true"
              :rows="5"
              label="질환"
              >
            </y-data-table>
          </b-col>

          <!-- 등록 -->
          <b-row class="mt-3">
            <b-col sm="12">
              <b-row>
                <b-col sm="12">
                  <y-label label="질환 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
              <b-card >
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="8"
                      :editable="editable"
                      :comboItems="comboDisaseTypeItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      label="질환종류명"
                      name="heaDiseaseClassCd"
                      v-model="disease.heaDiseaseClassCd"
                      v-validate="'required'"
                      :state="validateState('heaDiseaseClassCd')"
                    >
                  </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    label="질환명"
                    name="heaDiseaseNm"
                    v-model="disease.heaDiseaseNm"
                    v-validate="'required'"
                    :state="validateState('heaDiseaseNm')"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="5"
                    :required="true"
                    :disabled="true"
                    ui="bootstrap"
                    label="질환코드"
                    name="heaDiseaseCd"
                    v-model="disease.heaDiseaseCd"
                    v-validate="'required'"
                    :state="validateState('heaDiseaseCd')"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-number
                    :width="8"
                    :editable="editable"
                    :maxlength="5"
                    :hasSeperator="false"
                    ui="bootstrap"
                    label="출력순서"
                    name="sortOrder"
                    v-model="disease.sortOrder"
                    >
                    </y-number>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :editable="editable"
                      :maxlength="150"
                      ui="bootstrap"
                      label="비고"
                      name="remark"
                      v-model="disease.remark"
                    />
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <!-- <y-radio
                      :width="8"
                      :editable="editable"
                      :comboItems="radioItems"
                      itemText="useName"
                      itemValue="useYn"
                      ui="bootstrap"
                      label="사용여부"
                      name="radioValue"
                      v-model="disease.useYn"
                    /> -->
                    <y-switch
                      :width="8"
                      :editable="editable"
                      true-value="Y"
                      false-value="N"
                      ui="bootstrap"
                      label="사용여부"
                      name="radioValue"
                      selectText="사용"
                      unselectText="미사용"
                      v-model="disease.useYn"
                    >
                  </y-switch>
                  </b-col>
                </b-row>
                <div class="float-right mt-3">
                    <y-btn
                      v-if="editable"
                      type="clear"
                      title="초기화"
                      size="small"
                      color="info"
                      icon="el-icon-edit"
                      @btnClicked="btnClearClickedCallback" 
                      />
                    <y-btn
                      v-if="editable"
                      :action-url="insertUrl"
                      :param="disease"
                      :is-submit="isSubmit"
                      type="save"
                      title="신규등록"
                      size="small"
                      color="warning"
                      icon="el-icon-edit"
                      action-type="POST"
                      beforeSubmit = "beforeInsert"
                      @beforeInsert="beforeInsert"
                      @btnClicked="btnInsertClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    />
                    <y-btn
                      v-if="editable"
                      :action-url="saveUrl"
                      :param="disease"
                      :is-submit="isSubmit2"
                      type="save"
                      title="수정"
                      size="small"
                      color="warning"
                      icon="el-icon-edit-outline"
                      action-type="POST"
                      beforeSubmit = "beforeSubmit"
                      @beforeSubmit="beforeSubmit"
                      @btnClicked="btnSaveClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                      />
                  </div>
              </b-card>
            </b-col>
          </b-row>
        <!-- </b-card> -->
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-deisease',
  props: {
  },
  data: () => ({
    disease: {
      heaDiseaseClassCd: '',
      heaDiseaseClassNm: '',
      heaDiseaseCd: '',
      heaDiseaseNm: '',
      remark: '',
      sortOrder: '',
      useYn: '',
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
    console.log("::::::::::::::::::::: beforeMount ::::::::::::::::::::  ");
    this.init();
    this.getComboItems('HEA_DISEASE_CLASS'); // 질환종류
    this.getComboItems('HEA_RESULT_TYPE');
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
