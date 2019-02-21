<!--
  목적 : 안전점검 - 안전 점검 종류
  Detail : 안전 점검 종류 등록/수정화면
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
                color="orange"
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
                  :comboItems="comboCheckKindItems"
                  itemText="safCheckKindNm"
                  itemValue="safCheckKindNo"
                  ui="bootstrap"
                  label="안전점검종류"
                  name="checkKind"
                  v-model="searchParam.safCheckKindNo"
                ></y-select>
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
            :excel-down="true"
            :print="true"
            @selectedRow="selectedRow"
            label="점검항목"
          ></y-data-table>
        </b-col>
      </b-col>
    </b-row>

    <!-- 등록 -->
    <b-row class="mt-3" ref="editBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="안전점검 항목 상세" icon="user-edit" color-class="cutstom-title-color"/>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :comboItems="comboCheckKindItems"
                  :required="true"
                  itemText="safCheckKindNm"
                  itemValue="safCheckKindNo"
                  ui="bootstrap"
                  label="안전점검종류"
                  name="checkKind"
                  v-validate="'required'"
                  v-model="checkItem.safCheckKindNo"
                  :state="validateState('safCheckKindNo')"
                ></y-select>
              </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :required="true"
                ui="bootstrap"
                label="점검항목"
                name="safCheckItemNm"
                v-validate="'required'"
                v-model="checkItem.safCheckTypeNm"
                :state="validateState('safCheckItemNm')"
              ></y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="정렬 순서"
                name="sortOrder"
                v-model="checkItem.sortOrder"
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
                v-model="checkItem.useYn"
              ></y-switch>
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn title="초기화" @btnClicked="btnClearClickedCallback"/>
            <y-btn
              :action-url="insertUrl"
              :param="checkItem"
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
              :param="checkItem"
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
  name: "y-checkKind",
  props: {},
  data: () => ({
    checkItem: {
      safCheckItemNo: "",
      safCheckKindNo: "",
      safCheckTypeNm: "",
      sortOrder: "",
      useYn: ""
    },
    searchParam: {
      safCheckKindNo: "",
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
    comboCheckKindItems: [],
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
  update () {},
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getCheckKindItems();

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
        this.searchUrl = selectConfig.saf.checkItem.list.url;
        this.editUrl = transactionConfig.saf.checkItem.edit.url;
        this.insertUrl = transactionConfig.saf.checkItem.insert.url;

        // radio 버튼 셋팅
        this.radioItems = [
          { useYn: "Y", useName: "사용" },
          { useYn: "N", useName: "미사용" }
        ];
      }, 1000);

      // 그리드 헤더 설정
      this.gridOptions.header = [
      //  { text: "안전점검항목번호", name: "safCheckItemNo", },
      //  { text: "안전점검종류번호", name: "safCheckKindNo", width: "180px" },
        { text: "안전점검항목명", name: "safCheckTypeNm", width: "180px" },
        { text: "정렬순서", name: "sortOrder", width: "180px" },
        { text: "사용여부", name: "useYn", width: "100px", align: "center" }
      ];
      this.setGridSize();
    },
    // 입력 setting
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.saf.checkItem.get.url, data.safCheckItemNo);
      this.$http.type = 'GET';
      
      this.$http.request((_result) => {
        this.editable = true;
        this.checkItem = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });

    },
    // combo box list 공통
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboCheckKindItems = this.$_.clone(_result.data);
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
        message: '저장하시겠습니까?',
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
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },

    getCheckKindItems () {
      this.$http.url = selectConfig.saf.checkItem.getSelect.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboCheckKindItems = this.$_.clone(_result.data);
        this.searchParam.safCheckKindNo = this.$_.map(this.$_.clone(_result.data), 'safCheckKindNo')[0];
      }, (_error) => {
        console.log(_error);
      });
    },

    getList () {
      this.$http.url = selectConfig.saf.checkItem.list.url;
      this.$http.param = { 'safCheckKindNo': this.searchParam.safCheckKindNo }
      this.$http.type = "GET";
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

      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
    },
    btnInsertClickedCallback (result) {
      // this.disease.heaDiseaseCd = _result.data;
      this.getList();

      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isInsert = false;
      this.editable = true;
    },

    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.checkItem, this.$options.data().checkItem);
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