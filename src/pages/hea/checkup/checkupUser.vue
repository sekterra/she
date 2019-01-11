<!--
  목적 : 대상자 선정
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card no-body class="px-3 py-2 mb-3">
          <b-row class="mt-2">
            <b-col sm="4">
              <y-label label="검진종류" />
              : {{checkItem.checkType}}
            </b-col>
            <b-col sm="4">
              <y-label label="검진계획" />
              : {{checkItem.checkPlan}}
            </b-col>
            <b-col sm="4">
              <y-label label="검진일자" />
              : {{checkItem.checkDate}}
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색" />
            </div>
            <div class="float-right">
              <y-btn
                  v-if="editable"
                  :action-url="saveUrl"
                  :param="checkupUser"
                  type="search"
                  title="검색"
                  size="mini"
                  color="success"
                  action-type="GET"
                  @btnClicked="btnSearchClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="processItems"
                itemText="processName"
                itemValue="processPk"
                ui="bootstrap"
                type="search"
                label="공정"
                name="processValue"
                v-model="checkupUser.processValue"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="deptItems"
                itemText="deptName"
                itemValue="deptPk"
                ui="bootstrap"
                type="search"
                label="부서"
                name="deptValue"
                v-model="checkupUser.deptValue"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="사번"
                name="userNo"
                v-model="checkupUser.userNo"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="사원명"
                name="userNm"
                :appendIcon="icons"
                v-model="checkupUser.userNm"
                @iconCallback="searchUserCallback"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="ageItems"
                itemText="ageName"
                itemValue="agePk"
                ui="bootstrap"
                type="search"
                label="나이"
                name="ageValue"
                v-model="checkupUser.ageValue"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                  :width="baseWidth"
                  :editable="editable"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="작년 수검자 제외"
                  name="lastYearExcept"
                  selectText="제외"
                  unselectText="미제외"
                  v-model="checkupUser.lastYearExcept"
                >
              </y-switch>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색조건 대상자 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
          <div class="float-right">
            <y-btn
                v-if="editable"
                :action-url="saveUrl"
                :param="checkupUser"
                :is-submit="isSubmit"
                type="save"
                title="검진대상자로 추가"
                size="mini"
                color="primary"
                action-type="POST"
                beforeSubmit = "beforeSubmit"
                @beforeSubmit="beforeSubmit"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
          </div>
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="검색조건 대상자 목록"
            :headers="checkupUserGridHeaderOptions"
            :items="checkupUserGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :rows="7"
            ref="dataTable"
            >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'checkup-user',  
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      checkupUser: {
        processValue: null,
        deptValue: null,
        ageValue: null,
        userNm: '',
        userNo: '',
        lastYearExcept: 'Y',
      },
      checkItem: {
        checkType: '종합건강검진',
        checkPlan: '2018년 종합건강검진',
        checkDate: '2018-03-01 ~ 2018-04-30'
      },
      icons: [
        { 'icon': 'search', callbackName: 'searchUserCallback' },
        // { 'icon': 'times', callbackName: 'searchUserCallback' }
      ],
      baseWidth: 8,
      editable: true,
      saveUrl: '',
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
      processItems: [],
      deptItems: [],
      ageItems: [],
      checkupUserGridData: [],
      checkupUserGridHeaderOptions: [],
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.getItems();

      // 건강검진 전체 대상자 그리드 헤더 설정
      this.checkupUserGridHeaderOptions = [
        { text: '건강검진 타입', name: 'heaCheckupType', width: '30%', align: 'center' },
        { text: '공정', name: 'processNm', width: '30%', align: 'center' },
        { text: '부서', name: 'deptNm', width: '30%', align: 'center' },
        { text: '사번', name: 'userNo', width: '30%', align: 'center' },
        { text: '성명', name: 'userNm', width: '30%', align: 'center' },
        { text: '입사일', name: 'createDt', width: '30%', align: 'center' },
        { text: '최근 수검일', name: 'checkedYmd', width: '30%', align: 'center' }
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    /**
     * 아이템 정보를 가져옴
     */
    getItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.processItems = [
          { processPk: '1', processName: '일반공정' },
          { processPk: '2', processName: '특수공정' },
        ];
        this.deptItems = [
          { deptPk: '1', deptName: '경영팀' },
          { deptPk: '2', deptName: 'SDG팀' },
          { deptPk: '3', deptName: '영업팀' },
        ];
        this.ageItems = [
          { agePk: '1', ageName: '10대' },
          { agePk: '2', ageName: '20대' },
          { agePk: '3', ageName: '30대' },
        ];

        this.checkupUserGridData = [
          { heaCheckupType: 'A', processNm: '', deptNm: '시스템연구소', userNo: '100000', userNm: '홍길동', createDt: '2018-02-01', checkedYmd: '2018-05-01' },
          { heaCheckupType: 'B', processNm: '', deptNm: '시스템연구소', userNo: '100001', userNm: '김범수', createDt: '2018-02-01', checkedYmd: '2018-08-31' },
        ];
      }, 1000);
    },
    /** /Call API service **/
    
    /** validation checking**/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeSubmit () {
      this.checkValidation();
    },
    checkValidation () {
      this.validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    searchUserCallback () {
      console.log('::::::: searchUserCallback :::::::');
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 조회 버튼 처리용 샘플함수
    */
    btnSearchEmpClickedCallback (_result) {
      this.isSubmit = false;
    },
    /**
    * 검색 버튼 처리용 샘플함수
    */
    btnSearchClickedCallback (_result) {
      this.isSubmit = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭되었습니다.');
    },
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnSaveClickedCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>