<!--
  목적 : 교육결과 등록-> 교육결과탭
  Detail : 설비유형 조회 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row class="mt-3" ref="editBox">
      <b-col sm="12">
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                label="취급물질명(KOR)"
                name="chemProdNmKr"
                v-model="chemprod.chemProdNmKr"
                :required="true"
                :maxlength="30"
                v-validate="'required'"
                :state="validateState('chemProdNmKr')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                label="취급물질명(ENG)"
                name="chemProdNmEn"
                v-model="chemprod.chemProdNmEn"
                :required="true"
                :maxlength="30"
                v-validate="'required'"
                :state="validateState('chemProdNmEn')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-select
                :width="baseWidth"
                :comboItems="propertiesItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="성상"
                name="properties"
                v-model="chemprod.properties"
              ></y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-number
                :width="baseWidth"
                ui="bootstrap"
                label="비산성(고체)"
                name="fugacity"
                v-model="chemprod.fugacity"
                :maxlength="10"
              >
              </y-number>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-number
                :width="baseWidth"
                ui="bootstrap"
                label="끓는점(액체,기체)"
                name="boilpoint"
                v-model="chemprod.boilpoint"
                :maxlength="10"
              >
              </y-number>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-switch
                :width="8"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="사용여부"
                name="radioValue"
                selectText="사용"
                unselectText="미사용"
                v-model="chemprod.useYn"
              ></y-switch>
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn title="초기화" @btnClicked="btnClearClickedCallback"/>
            <y-btn
              :action-url="insertUrl"
              :param="chemprod"
              :is-submit="isInsert"
              title="신규등록"
              color="orange"
              action-type="POST"
              beforeSubmit="beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback"
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              :action-url="insertExcelUrl"
              :param="chemprod"
              :is-submit="isInsertExcel"
              title="엑셀업로드"
              color="black"
              action-type="PUT"
              beforeSubmit="beforeExcelInsert"
              @beforeInsert="beforeExcelInsert"
              @btnClicked="btnExcelInsertClickedCallback"
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              :action-url="editUrl"
              :param="chemprod"
              :is-submit="isEdit"
              title="수정"
              color="orange"
              action-type="PUT"
              beforeSubmit="beforeSubmit"
              @beforeSubmit="beforeSubmit"
              @btnClicked="btnSaveClickedCallback"
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
      </b-col>
    </b-row>  
  </b-container>
</template>

<script>
import selectConfig from "@/js/selectConfig";
import transactionConfig from "@/js/transactionConfig";
export default {
  /* attributes: name, components, props, data */
  name: "y-checkKind",
  props: {
    selectedChemProdNo: 0
  },
  data: () => ({
    searchParam: {
      chemProdNo: '',
    },
    chemprod: {
      chemProdNo: "",
      chemProdNmKr: "",
      chemProdNmEn: "",
      properties: "",
      fugacity: 0,
      boilpoint: 0,
      useYn: "",
      createUserId: "",
      createDt: "",
      updateUserId: "",
      updateDt: "",
    },

    searchArea: {
      title: "검색박스숨기기",
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: "300"
    },
    radioItems: [],
    propertiesItems: [],
    baseWidth: 8,
    editable: false,
    isInsert: false,
    isInsertExcel: false,
    isEdit: false,
    editUrl: "",
    insertUrl: "",
    searchUrl: "",
    searchUserUrl: "",
  }),
  watch: {
    'selectedChemProdNo': function (newValue, oldValue) {
      this.getData();
    },

  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {},
  created () {},
  update () {},
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
    
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
  },
  //* methods */
  methods: {
    init () {
      // url 셋팅
      this.searchUrl = selectConfig.baseInfo.chemprod.list.url;
      this.insertUrl = transactionConfig.baseInfo.chemprod.insert.url;
      this.editUrl = transactionConfig.baseInfo.chemprod.edit.url;
      // radio 버튼 셋팅
      this.radioItems = [
        { useYn: "Y", useName: "사용" },
        { useYn: "N", useName: "미사용" }
      ];

      // 성상 콤보박스 데이터 조회
      this.getComboItems("COM_PROPERTIES");
    },

    getData () {
      this.$http.url = this.$format(selectConfig.baseInfo.chemprod.get.url, this.selectedChemProdNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        this.chemprod = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });
    },

    /**
     * 공통 마스터 정보 조회 (날씨, 사고유형)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'COM_PROPERTIES')
        {
          this.propertiesItems = this.$_.clone(_result.data);
          this.propertiesItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },


    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '수정하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationSave();
        }
      });
    },
    beforeInsert () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '등록하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationInsert();
        }
      });
    },
    beforeExcelInsert () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '등록하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationInsert();
        }
      });
    },
    /**
     * 수정전 유효성 검사
     */
    checkValidationSave () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    checkValidationExcelInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsertExcel = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsertExcel) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsertExcel = false;
      });
    },
    
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },

    

    btnSaveClickedCallback (result) {
      // this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
    },
    btnInsertClickedCallback (result) {
      // this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.chemprod.chemProdNo = this.$_.clone(result.data);
      
      this.isInsert = false;
      this.editable = true;
    },

    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.chemprod, this.$options.data().chemprod);
      this.$validator.reset();
    },

    btnClickedErrorCallback (result) {
      this.editable = false;
      this.isInsert = false;
      this.isEdit = false;
      this.btnClearClickedCallback();
      window.alert("ERROR.. 담당자에게 연락바랍니다.");
      // this.$emit('APP_REQUEST_ERROR', _result);
    }
    /** end button 관련 이벤트 **/
  }
};
</script>