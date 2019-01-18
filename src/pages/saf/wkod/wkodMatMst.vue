<!--
  목적 : 취급물질 관리
  Detail : 취급물질 등록/수정화면
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
                :comboItems="comboWkodMatClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="취급물질분류"
                name="wkodMatClass"
                v-model="searchParam.wkodMatClass"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              ui="bootstrap"
              label="취급물질명"
              name="wkodMatNm"
              v-model="searchParam.wkodMatNm"
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
          <b-col sm="12" class="px-0">
            <y-data-table 
              :headers="gridHeaderOptions"
              :items="gridData"
              :excel-down="true"
              :print="true"
              :rows="5"
              :cellClick="true"
              label="취급물질"
              ref="dataTable"
              @selectedRow="selectedRow"
              >
            </y-data-table>
          </b-col>

          <!-- 등록 -->
          <b-row class="mt-3">
            <b-col sm="12">
              <b-row>
                <b-col sm="12">
                  <y-label label="항목 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
              <b-card >
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="8"
                      :comboItems="comboDetailWkodMatClassItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      label="취급물질분류"
                      name="wkodMatClass"
                      v-model="wkodMatMst.wkodMatClass"
                      v-validate="'required'"
                      :state="validateState('wkodMatClass')"
                    >
                  </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :maxlength="50"
                    :required="true"
                    ui="bootstrap"
                    label="취급물질명"
                    name="wkodMatNm"
                    v-model="wkodMatMst.wkodMatNm"
                    v-validate="'required'"
                    :state="validateState('wkodMatNm')"
                    >
                    </y-text>
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
                      v-model="wkodMatMst.useYn"
                    >
                  </y-switch>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-number
                    :width="8"
                    :maxlength="5"
                    :hasSeperator="false"
                    ui="bootstrap"
                    label="출력순서"
                    name="sortOrder"
                    v-model="wkodMatMst.sortOrder"
                    >
                    </y-number>
                  </b-col>
                </b-row>
                <div class="float-right mt-3">
                    <y-btn
                      type="clear"
                      title="초기화"
                      size="small"
                      color="info"
                      icon="el-icon-edit"
                      @btnClicked="btnClearClickedCallback" 
                      />
                    <y-btn
                      :action-url="insertUrl"
                      :param="wkodMatMst"
                      :is-submit="isInsert"
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
                      :action-url="editUrl"
                      :param="wkodMatMst"
                      :is-submit="isEdit"
                      type="save"
                      title="수정"
                      size="small"
                      color="warning"
                      icon="el-icon-edit-outline"
                      action-type="PUT"
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
  name: 'wkod-mat-mst',
  props: {
  },
  data: () => ({
    wkodMatMst: {
      matMstId: '',
      wkodMatClass: '',
      wkodMatNm: '',
      sortOrder: 0,
      useYn: 'Y',
    },
    searchParam: {
      wkodMatClass: '',
      wkodMatNm: '',
    },
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    gridData: [],
    gridHeaderOptions: [],
    comboWkodMatClassItems: [],
    comboDetailWkodMatClassItems: [],
    radioItems: null,
    editUrl: '',
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
    this.getComboItems('WKOD_MAT_CLS'); // 작업종류
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
        this.searchUrl = selectConfig.wkodMatMst.list.url;
        this.editUrl = transactionConfig.wkodMatMst.edit.url;
        this.insertUrl = transactionConfig.wkodMatMst.insert.url;
        // radio 버튼 셋팅
        this.radioItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '취급물질분류', name: 'wkodMatClassNm', width: '25%', align: 'center' },
        { text: '취급물질명', name: 'wkodMatNm', width: '35%', },
        { text: '출력순서', name: 'sortOrder', width: '20%', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '20%', align: 'center' }
      ];
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboWkodMatClassItems = this.$_.clone(_result.data);
        this.comboDetailWkodMatClassItems = this.$_.clone(_result.data);

        this.comboWkodMatClassItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        console.log(_error);
      });
    },
    selectedRow (data) {
      if (data === null) return;
      this.$http.url = this.$format(selectConfig.wkodMatMst.get.url, data.matMstId);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        Object.assign(this.wkodMatMst, _result.data);
      }, (_error) => {
        console.log(_error);
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationSave();
      }
    },
    beforeInsert () {
      if (window.confirm("저장하시겠습니까?"))
      {
        this.checkValidationInsert();
      }
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
    getList () {
      this.$http.url = selectConfig.wkodMatMst.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
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
      this.getList();
      this.isEdit = false;
      this.btnClearClickedCallback();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      this.getList();
      window.alert("수정되었습니다.");
      this.isEdit = false;
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      window.alert("저장되었습니다.");
      this.wkodMatMst.matMstId = _result.data;
      this.isInsert = false;
    },
    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.wkodMatMst, this.$options.data().wkodMatMst);
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.editable = false;
      this.isInsert = false;
      this.isEdit = false;
      this.btnClearClickedCallback();
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
