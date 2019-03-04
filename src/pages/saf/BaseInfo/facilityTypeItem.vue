<!--
  목적 : 설비관리 - 설비유형 관리
  Detail : 설비유형 조회 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header">
            <y-label label="검색"/>
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"
                @btnClicked="btnSearchVisibleClicked"
              />
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                title="검색"
                color="green"
                action-type="get"
                @btnClicked="btnSearchClickedCallback"
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
             <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
               <y-select
                :width="8"
                :comboItems="comboFacilityTypeSearch"
                itemText="safFacilityTypeNm"
                itemValue="safFacilityTypeCd"
                ui="bootstrap"
                label="설비유형"
                name="safFacilityTypeCd"
                v-model="searchParam.safFacilityTypeCd"
              ></y-select>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
               <y-text
                :width="8"
                ui="bootstrap"
                label="관리항목"
                name="safFacilityTypeItemNm"
                v-model="searchParam.safFacilityTypeItemNm"
              ></y-text>
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
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :useRownum="false"
            :excel-down="true"
            :print="true"
            @selectedRow="selectedRow"
            label="설비 유형별 관리 항목 목록"
          ></y-data-table>
        </b-col>
      </b-col>
    </b-row>

    <!-- 등록 -->
    <b-row class="mt-3" ref="editBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="설비 유형별 관리 항목 상세" icon="user-edit" color-class="cutstom-title-color"/>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboFacilityTypeDetail"
                :required="true"
                itemText="safFacilityTypeNm"
                itemValue="safFacilityTypeCd"
                ui="bootstrap"
                label="설비유형"
                name="safFacilityTypeCd"
                v-validate="'required'"
                v-model="facilityTypeItem.safFacilityTypeCd"
                :state="validateState('safFacilityTypeCd')"
              ></y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                :required="true"
                ui="bootstrap"
                label="관리항목"
                name="safFacilityTypeItemNm"
                v-validate="'required'"
                v-model="facilityTypeItem.safFacilityTypeItemNm"
                :state="validateState('safFacilityTypeItemNm')"
              ></y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="정렬순서"
                name="sortOrder"
                v-model="facilityTypeItem.sortOrder"
              ></y-number>
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
                v-model="facilityTypeItem.useYn"
              ></y-switch>
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn title="초기화" @btnClicked="btnClearClickedCallback"/>
            <y-btn
              :action-url="insertUrl"
              :param="facilityTypeItem"
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
              v-if="editable"
              :action-url="editUrl"
              :param="facilityTypeItem"
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
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from "@/js/selectConfig";
import transactionConfig from "@/js/transactionConfig";
export default {
  /* attributes: name, components, props, data */
  name: "y-facility-Type-Item",
  props: {},
  data: () => ({
    facilityTypeItem: {
      safFacilityTypeItemNo: "",
      safFacilityTypeCd: null,
      safFacilityTypeItemNm: "",
      sortOrder: "",
      useYn: "",
      safFacilityTypeNm: ""
    },
    searchParam: {
      safFacilityTypeCd: "",
      safFacilityTypeItemNm: "",
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
    comboFacilityTypeSearch: [],
    comboFacilityTypeDetail: [],
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    radioItems: null,
    editUrl: "",
    insertUrl: "",
    searchUrl: ""
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {},
  created () {},
  updated () {},
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    
    
  },
  mounted () {
    // 윈도우 resize event
    window.addEventListener("resize", this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener("resize", this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.saf.refInfoFacilityTypeItem.list.url;
        this.editUrl = transactionConfig.saf.refInfoFacilityTypeItem.edit.url;
        this.insertUrl = transactionConfig.saf.refInfoFacilityTypeItem.insert.url;

        // radio 버튼 셋팅
        this.radioItems = [
          { useYn: "Y", useName: "사용" },
          { useYn: "N", useName: "미사용" }
        ];

        this.getFacilityTypeItems();
        this.getList();
      }, 100);
      
      

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: "설비유형", name: "safFacilityTypeNm", width: "180px", align: "center" },
        { text: "관리항목", name: "safFacilityTypeItemNm", width: "300px", align: "left" },
        { text: "사용여부", name: "useYnNm", width: "100px", align: "center" },
        { text: "정렬순서", name: "sortOrder", width: "100px", align: "center" },
      ];
      this.setGridSize();
      
    },
    // 입력 setting
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.saf.refInfoFacilityTypeItem.get.url, data.safFacilityTypeItemNo);
      this.$http.type = 'GET';
      
      this.$http.request((_result) => {
        this.editable = true;
        this.facilityTypeItem = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
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
    /**
     * 수정전 유효성 검사
     */
    checkValidationSave () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isEdit = false;
      });
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isInsert = false;
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },

    // 셀렉트 박스 조회
    getFacilityTypeItems () {
      this.$http.url = selectConfig.saf.refInfoFacilityType.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        
        var searchItems = this.$_.clone(_result.data);
        var detailItems = this.$_.clone(_result.data);
        searchItems.splice(0, 0, { 'safFacilityTypeCd': '', 'safFacilityTypeNm': '전체' });
        detailItems.splice(0, 0, { 'safFacilityTypeCd': null, 'safFacilityTypeNm': '선택하세요' });
        
        this.comboFacilityTypeSearch = searchItems;
        this.comboFacilityTypeDetail = detailItems;

        
      }, (_error) => {
        console.log(_error);
      });
    },

    // 그리드 조회
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = "GET";
      this.$http.param = this.searchParam;
      this.$http.request(
        _result => {
          this.gridOptions.data = this.$_.clone(_result.data);
        },
        _error => {
          console.log(_error);
        }
      );
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit("LOADING_SHOW");
      setTimeout(() => {
        var calculatedHeight =
          window.innerHeight -
          this.$refs.searchBox.clientHeight -
          this.$refs.editBox.clientHeight -
          250;
        this.gridOptions.height =
          calculatedHeight <= 250 ? defaultHeight : calculatedHeight;
        window.getApp.$emit("LOADING_HIDE");
      }, 600);
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {},
    /** button 관련 이벤트 **/
    btnSearchVisibleClicked () {
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = "검색박스숨기기";
      else this.searchArea.title = "검색박스보이기";

      this.setGridSize();
    },
    btnSearchClickedCallback (result) {
      var x = 44;
      var z = "0";
      console.log(x.toString().length);
      console.log(
        x.toString().length >= 5
          ? x.toString()
          : new Array(5 - x.toString().length + 1).join(z) + x.toString()
      );
      this.isInsert = false;
      this.gridOptions.data = this.$_.clone(result.data);
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnSaveClickedCallback (result) {
      
      this.getList();
      if (result.data === 0) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '관리항목이 중복입니다.',
          type: 'warning',  // success / info / warning / error
        });
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '수정되었습니다.',
          type: 'success',  // success / info / warning / error
        });
      }
      this.isEdit = false;
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
    },
    btnInsertClickedCallback (result) {
      // this.disease.heaDiseaseCd = _result.data;
      this.getList();

      if (result.data === 0) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '관리항목이 중복입니다.',
          type: 'warning',  // success / info / warning / error
        });
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '등록되었습니다.',
          type: 'success',  // success / info / warning / error
        });
        this.facilityTypeItem.safFacilityTypeItemNo = this.$_.clone(result.data);
      }
      this.isInsert = false;
      this.editable = true;
    },

    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.facilityTypeItem, this.$options.data().facilityTypeItem);
      this.$validator.reset();
      // this.disease.heaDiseaseClassCd = "";
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
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