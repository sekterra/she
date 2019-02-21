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
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header" >
            <!-- <div class="float-left"> -->
              <y-label label="검색" />
            <!-- </div> -->
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
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :height="gridOptions.height"
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
          <b-row class="mt-3" ref="insertBox">
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
                      title="초기화"
                      @btnClicked="btnClearClickedCallback" 
                      />
                    <y-btn
                      :action-url="insertUrl"
                      :param="wkodMatMst"
                      :is-submit="isInsert"
                      title="신규등록"
                      color="blue"
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
                      title="수정"
                      color="orange"
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
  data () {
    return {
      wkodMatMst: {
        matMstNo: '',
        wkodMatClass: null,
        wkodMatNm: '',
        sortOrder: 0,
        useYn: 'Y',
      },
      searchParam: {
        wkodMatClass: '',
        wkodMatNm: '',
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      baseWidth: 9,
      editable: false,
      isInsert: false,
      isEdit: false,
      comboWkodMatClassItems: [],
      comboDetailWkodMatClassItems: [],
      radioItems: null,
      editUrl: '',
      insertUrl: '',
      searchUrl: '',
      test: []
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getComboItems('SAF_WKOD_MAT_CLASS'); // 작업종류
    this.setGridSize();
    this.getList();
  },
  mounted () {
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.saf.wkodMatMst.list.url;
        this.editUrl = transactionConfig.saf.wkodMatMst.edit.url;
        this.insertUrl = transactionConfig.saf.wkodMatMst.insert.url;
        // radio 버튼 셋팅
        this.radioItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
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
        this.comboDetailWkodMatClassItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.wkodMatMst.wkodMatClass = '';
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    selectedRow (data) {
      if (data === null) return;
      this.test = data;
      this.$http.url = this.$format(selectConfig.saf.wkodMatMst.get.url, data.matMstNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        this.wkodMatMst = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - this.$refs.insertBox.clientHeight - 270;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검색박스 숨기기/보이기 처리 후 setGridSize 호출
     */
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
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
      // if (window.confirm("저장하시겠습니까?"))
      // {
      //   this.checkValidationInsert();
      // }
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
    getList () {
      this.$http.url = selectConfig.saf.wkodMatMst.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.isEdit = false;
      this.gridOptions.data = this.$_.clone(_result.data);

      this.btnClearClickedCallback();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      this.getList();
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.wkodMatMst.matMstNo = this.$_.clone(_result.data);
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
