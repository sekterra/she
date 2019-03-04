<!--
  목적 : 기준정보 - 작업장소
  Detail : 작업장소 항목 등록/조회 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 결과 테이블 -->
    <b-row>
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :useRownum="false"
            @selectedRow="selectedRow"
            label="작업장소 목록"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>

      <!-- 등록 -->
      <b-row class="mt-3" ref="editBox">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="작업장소 상세" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
          <b-card >
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :comboItems="deptCdItems"
                  :required="true"
                  itemText="deptNm"
                  itemValue="deptCd"
                  ui="bootstrap"
                  type="search"
                  label="부서"
                  name="deptCd"
                  v-model="workArea.deptCd"
                  v-validate="'required'"
                  :state="validateState('deptCd')"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :comboItems="processNoItems"
                  :required="true"
                  itemText="processNm"
                  itemValue="processNo"
                  ui="bootstrap"
                  type="search"
                  label="공정"
                  name="processNo"
                  v-model="workArea.processNo"
                  v-validate="'required'"
                  :state="validateState('processNo')"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                :width="8"
                :maxlength="30"
                :required="true"
                ui="bootstrap"
                label="작업장소명"
                name="workAreaNm"
                v-model="workArea.workAreaNm"
                v-validate="'required'"
                :state="validateState('workAreaNm')"
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
                  name="useYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="workArea.useYn"
                >
              </y-switch>
              </b-col>
            </b-row>
            <div class="float-right mt-3">
                <y-btn
                  title="초기화"
                  @btnClicked="btnClearClickedCallback" 
                  />
                <y-btn
                  :action-url="insertUrl"
                  :param="workArea"
                  :is-submit="isInsert"
                  title="신규등록"
                  color="orange"
                  action-type="POST"
                  beforeSubmit = "beforeInsert"
                  @beforeInsert="beforeInsert"
                  @btnClicked="btnInsertClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn
                  v-if="editable"
                  :action-url="editUrl"
                  :param="workArea"
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

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-work-area',
  props: {
  },
  data: () => ({
    workArea: {
      workAreaNo: 0,
      deptCd: null,
      processNo: null,
      workAreaNm: '',
      useYn: 'Y',
    },
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    editable: false,
    isInsert: false,
    isEdit: false,
    deptCdItems: [],
    processNoItems: [],
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
    this.init();
  },
  mounted () {
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.searchUrl = selectConfig.rsa.workArea.list.url;
      this.editUrl = transactionConfig.rsa.workArea.edit.url;
      this.insertUrl = transactionConfig.rsa.workArea.insert.url;
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '부서', name: 'deptNm', width: '180px', },
        { text: '공정', name: 'processNm', width: '180px', },
        { text: '작업장소명', name: 'workAreaNm', width: '250px', },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
      ];
      this.getProcessNoItems(); // 공정 조회
      this.getDeptCdItems(); // 부서 조회
      this.getList(); // 작업장소 조회
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 작업장소 상세 조회
     * 질환 목록 row 클릭시 마다 발생
     * data : 클릭한 row 정보
     */
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.rsa.workArea.get.url, data.workAreaNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        this.workArea = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 공정 조회
     */
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': null, 'processNm': '선택하세요' });
        this.processNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /**
     * 부서 조회
     */
    getDeptCdItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': null, 'deptNm': '선택하세요' });
        this.deptCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          // this.isEdit = window.confirm("수정하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isEdit = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isEdit = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isEdit = false;
      });
    },
    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      var workAreaNms = this.$_.map(this.gridOptions.data, 'workAreaNm');
      if (this.$_.indexOf(workAreaNms, this.workArea.workAreaNm) > -1) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 작업장소명이 존재합니다.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          // this.isInsert = window.confirm("저장하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isInsert = false;
      });
    },
    /**
     * 필수입력값 유효성 검사
     */
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    /** 질환 목록 조회 **/
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.editBox.clientHeight - 250;
        this.gridOptions.height = calculatedHeight <= 250 ? defaultHeight : calculatedHeight;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 작업장소 목록 조회
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
    },
    /**
     * 작업장소 목록 조회 및 수정버튼 보여지도록 처리
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.workArea.workAreaNo = _result.data;
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isInsert = false;
      this.editable = true;
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.disease, this.$options.data().disease);
      this.$validator.reset();
    },
    /**
     * 수정 버튼 안보여지도록 처리 및 isSubmit false 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.editable = false;
      this.isInsert = false;
      this.isEdit = false;
      this.btnClearClickedCallback();
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>