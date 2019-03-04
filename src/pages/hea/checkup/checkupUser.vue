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
        <b-card no-body class="px-3 py-2">
          <b-row class="mt-2">
            <b-col sm="4">
              <y-label label="검진종류: " /><y-label :label="checkupPlan.heaCheckupClassNm" :fieldable="true" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진계획: " /><y-label :label="checkupPlan.heaCheckupPlanNm" :fieldable="true" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진일자: " /><y-label :label="checkupPlan.heaCheckupPlanPeriod" :fieldable="true" />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row> 
    
    <b-row class="mt-3">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색" />
            </div>
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                  v-if="editable&&checkupPlan.heaCheckupPlanNo>0"
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
          <b-row v-if="searchArea.show" ref="searchBox">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="processNoItems"
                itemText="processNm"
                itemValue="processNo"
                ui="bootstrap"
                type="search"
                label="공정"
                name="processNo"
                v-model="searchParam.processNo"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="deptCdItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                type="search"
                label="부서"
                name="deptCd"
                v-model="searchParam.deptCd"
              />
            </b-col>
            <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                ui="bootstrap"
                label="사번"
                name="userId"
                v-model="searchParam.userId"
              />
            </b-col> -->
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                ui="bootstrap"
                label="사원명"
                name="userNm"
                v-model="searchParam.userNm"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchLeaderUserClicked"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="ageItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="나이"
                name="age"
                v-model="searchParam.age"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                  :width="8"
                  :editable="editable"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="작년 수검자 제외"
                  name="prevYearCheckupUserYn"
                  selectText="제외"
                  unselectText="미제외"
                  v-model="searchParam.prevYearCheckupUserYn"
                />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색조건 대상자 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
                v-if="editable&&checkupPlan.heaCheckupPlanNo>0"
                :action-url="insertUrl"
                :param="gridSelectedRows"
                :is-submit="isInsertSubmit"
                title="검진대상자로 추가"
                color="blue"
                action-type="post"
                beforeSubmit = "beforeInsertSubmit"
                @beforeInsertSubmit="beforeInsertSubmit"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
          </div>
          <y-data-table 
            label="검색조건 대상자 목록"
            :headers="gridHeaderOptions"
            :items="gridData"
            :editable="editable"
            :height="gridHeight"
            :excel-down="true"
            :print="true"
            :rows="5"
            v-model="gridSelectedRows"
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
    <y-popup :param="popupOptions"></y-popup>    
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'checkup-user',  
  props: {
    selectedCheckupPlanNo: 0,
    selectedTabIndex: 0
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      checkupPlan: {
        heaCheckupPlanNo: 0,
        heaCheckupPlanNm: '',
        heaCheckupClassNm: '',
        heaCheckupPlanPeriod: ''
      },
      searchParam: {
        heaCheckupPlanNo: 0,
        processNo: 0,
        deptCd: '',
        userId: '',
        userNm: '',
        prevYearCheckupUserYn: 'N',
        age: 0
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true,
        height: 0
      },
      editable: true,
      detailUrl: '',
      insertUrl: '',
      searchUrl: '',
      
      isInsertSubmit: false,
      processNoItems: [],
      deptCdItems: [],
      ageItems: [],
            
      gridHeaderOptions: [],
      gridData: [],
      gridHeight: 300,
      gridSelectedRows: [],
      
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '60%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
    };
  },
  watch: {
    selectedCheckupPlanNo: function (newValue, oldValue) {
      this.checkupPlan.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.searchParam.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.getDetail();
      this.getList();
    },
    selectedTabIndex: function (newValue, oldValue) {
      if (this.checkupPlan.heaCheckupPlanNo === this.selectedCheckupPlanNo) {
        this.getList();      
      }    
    }
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
    this.searchArea.height = this.$refs.searchBox.clientHeight;
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      setTimeout(() => {
        this.getProcessNoItems();
        this.getDeptCdItems();
        this.getAgeItems();
      }, 200);

      // 검진 전체 대상자 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '검진 타입', name: 'heaCheckupTypeNm', width: '200px', align: 'center' },
        { text: '공정', name: 'processNm', width: '160px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '160px', align: 'center' },
        { text: '사번', name: 'userId', width: '120px', align: 'center' },
        { text: '성명', name: 'userNm', width: '120px', align: 'center' },
        { text: '입사일', name: 'entryYmd', width: '120px', align: 'center' },
        { text: '휴대전화', name: 'phoneNo', width: '120px', align: 'center' },
        { text: '사내전화', name: 'officeTel', width: '120px', align: 'center' }
      ];

      this.detailUrl = selectConfig.checkupPlan.get.url;
      this.searchUrl = selectConfig.checkupUserNoTarget.list.url;
      this.insertUrl = transactionConfig.checkupUser.insert.url;

      this.checkupPlan.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.searchParam.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      if (this.checkupPlan.heaCheckupPlanNo > 0) {
        this.getDetail();
        this.getList();
      }
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service **/
    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.checkupPlan.heaCheckupPlanNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.checkupPlan = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get'; 
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': 0, 'processNm': '전체' });
        this.processNoItems = _result.data;
        this.searchParam.processNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDeptCdItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.deptCdItems = _result.data;
        this.searchParam.deptCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getAgeItems () {
      this.ageItems.push({ 'code': 0, 'codeNm': '전체' });
      this.ageItems.push({ 'code': 2, 'codeNm': '20대' });
      this.ageItems.push({ 'code': 3, 'codeNm': '30대' });
      this.ageItems.push({ 'code': 4, 'codeNm': '40대' });
      this.ageItems.push({ 'code': 5, 'codeNm': '50대이상' });
      this.searchParam.age = 0;
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {  
        this.gridHeight = this.gridHeight + ((this.searchArea.show ? -1 : 1) * this.searchArea.height);      
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** /Call API service **/
    
    /** validation checking**/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeInsertSubmit () {
      if (this.gridSelectedRows.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '검진 대상자를 추가 하시겠습니까?',
          type: 'info',
          // 확인 callback 함수
          confirmCallback: () => {
            this.isInsertSubmit = true;
          }
        });
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '선택된 검진 대상자가 없습니다. 목록 앞단에 선택박스를 확인하세요.',
          type: 'warning',
        });
      }
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    btnSearchClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnInsertClickedCallback (_result) {
      this.isInsertSubmit = false;
      this.getList();
      this.$emit('changeCheckupUsers');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '선택된 사용자를 대상자로 추가하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    btnSearchLeaderUserClicked () {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.searchParam.userNm = data.user.userNm;
      }
    },
    /** /Button Event **/
    
    /** 기타 function **/        
    /** /기타 function **/
  }
};
</script>