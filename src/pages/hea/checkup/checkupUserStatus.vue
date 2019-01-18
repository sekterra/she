<!--
  목적 : 대상자 선정 현황
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
              <y-label label="검진종류: " /><y-label :label="checkupPlan.heaCheckupClassNm" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진계획: " /><y-label :label="checkupPlan.heaCheckupPlanNm" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진일자: " /><y-label :label="checkupPlan.heaCheckupPlanPeriod" />
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
                  v-if="editable&&checkupPlan.heaCheckupPlanNo>0"
                  :action-url="searchUrl"
                  :param="searchParam"
                  type="search"
                  title="검색"
                  size="mini"
                  color="success"
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
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                ui="bootstrap"
                label="사번"
                name="userId"
                v-model="searchParam.userId"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                ui="bootstrap"
                label="사원명"
                name="userNm"
                v-model="searchParam.userNm"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="notifyPlanYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="통보여부"
                name="notifyPlanYn"
                v-model="searchParam.notifyPlanYn"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="reserveYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="예약여부"
                name="reserveYn"
                v-model="searchParam.reserveYn"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 건강검진 계획별 대상자 현황 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">            
            <y-btn
                v-if="editable&&checkupPlan.heaCheckupPlanNo>0"
                type="save"
                title="메일/알림톡/SMS 발송"
                size="small"
                color="primary"
                @btnClicked="btnSendClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            <y-btn
                v-if="editable&&checkupPlan.heaCheckupPlanNo>0"
                :action-url="deleteUrl"
                :param="deleteRows"
                :is-submit="isDeleteSubmit"
                type="save"
                title="건강검진대상자 제외"
                size="small"
                color="primary"
                action-type="delete"
                beforeSubmit = "beforeDeleteSubmit"
                @beforeDeleteSubmit="beforeDeleteSubmit"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
          </div>
          <y-data-table 
            label="건강검진 대상자 목록"
            :headers="gridHeaderOptions"
            :items="gridData"
            :editable="editable"
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

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'checkup-user-status',  
  props: {
    selectedCheckupPlanNo: 0
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
        notifyPlanYn: '',
        reserveYn: ''
      },
      editable: true,
      detailUrl: '',
      deleteUrl: '',
      searchUrl: '',
      
      deleteRows: [],
      isDeleteSubmit: false,
      processNoItems: [],
      deptCdItems: [],
      notifyPlanYnItems: [],
      reserveYnItems: [],

      gridHeaderOptions: [],
      gridData: [],
      gridSelectedRows: []
    };
  },
  watch: {
    selectedCheckupPlanNo: function (newValue, oldValue) {
      this.checkupPlan.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.searchParam.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.getDetail();
      this.getList();
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
        this.getNotifyPlanYnItems();
        this.getReserveYnItems();
      }, 200);

      // 건강검진 대상자 현황 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진 타입', name: 'heaCheckupTypeNm', width: '200px', align: 'center' },
        { text: '공정', name: 'processNm', width: '160px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '160px', align: 'center' },
        { text: '사번', name: 'userId', width: '120px', align: 'center' },
        { text: '성명', name: 'userNm', width: '120px', align: 'center' },
        { text: '입사일', name: 'entryYmd', width: '120px', align: 'center' },
        { text: '휴대전환', name: 'phoneNo', width: '120px', align: 'center' },
        { text: '사내전화', name: 'officeTel', width: '120px', align: 'center' },
        { text: '통보여부', name: 'notifyPlanYn', width: '100px', align: 'center' },
        { text: '통보일시', name: 'notifyPlanYmd', width: '120px', align: 'center' },
        { text: '예약여부', name: 'reserveYn', width: '100px', align: 'center' }
      ];

      this.detailUrl = selectConfig.checkupPlan.get.url;
      this.searchUrl = selectConfig.checkupUser.list.url;
      this.deleteUrl = transactionConfig.checkupUser.delete.url;

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
      });
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get'; 
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {         
      });
    },

    getProcessNoItems () {
      this.$http.url = selectConfig.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': 0, 'processNm': '전체' });
        this.processNoItems = _result.data;
        this.searchParam.processNo = 0;
      }, (_error) => {
      });
    },
    getDeptCdItems () {
      this.$http.url = selectConfig.dept.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.deptCdItems = _result.data;
        this.searchParam.deptCd = '';
      }, (_error) => {
      });
    },
    getNotifyPlanYnItems () {
      this.notifyPlanYnItems.push({ 'code': '', 'codeNm': '전체' });
      this.notifyPlanYnItems.push({ 'code': 'Y', 'codeNm': '통보' });
      this.notifyPlanYnItems.push({ 'code': 'N', 'codeNm': '미통보' });
      this.searchParam.notifyPlanYn = '';
    },
    getReserveYnItems () {
      this.reserveYnItems.push({ 'code': '', 'codeNm': '전체' });
      this.reserveYnItems.push({ 'code': 'Y', 'codeNm': '예약' });
      this.reserveYnItems.push({ 'code': 'N', 'codeNm': '미예약' });
      this.searchParam.reserveYn = '';
    },
    /** /Call API service **/
    
    /** validation checking**/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeDeleteSubmit () {
      if (this.gridSelectedRows.length > 0) {
        this.deleteRows = {
          'data': Object.values(this.$_.clone(this.gridSelectedRows))
        };
        this.isDeleteSubmit = confirm('건강검진 대상자에서 제외 하시겠습니까?');
      }
    },
    /** /validation checking **/
    
    /** /Component, Callbacks (버튼 제외) **/
    /** Button Event **/
    /**
    * 조회 버튼 처리용 샘플함수
    */
    btnSearchClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnDeleteClickedCallback (_result) {
      this.isDeleteSubmit = false;
      this.getList();
      this.$emit('changeCheckupUsers');
      alert('선택된 사용자를 대상자에서 제외하였습니다.'); 
    },
    btnSendClickedCallback (_result) {
      alert('아직 지원하지 않는 기능입니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isDeleteSubmit = false;       
      alert('작업진행 중 오류가 발생했습니다. 재시도 후 지속적으로 오류 발생시 관리자에게 문의하세요.');
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>