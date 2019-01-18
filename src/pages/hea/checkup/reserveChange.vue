<!--
  목적 : 건강검진 예약변경
  작성자 : khk
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
              <y-datepicker
                :width="8"
                :editable="editable"
                :range="true"
                label="예약일"
                name="reservePeriod"
                v-model="searchParam.reservePeriod"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-multi-select
                :width="10"
                :editable="editable"
                :comboItems="heaCheckupOrgNoItems"                                
                itemText="heaCheckupOrgNm"
                itemValue="heaCheckupOrgNo"
                ui="bootstrap"
                type="search"
                label="건강검진기관"
                name="heaCheckupOrgNos"
                v-model="searchParam.heaCheckupOrgNos"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="9">
        <b-row>
          <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
            <y-datepicker
            :width="8"
            :editable="editable"
            label="변경일"
            name="reserveYmd"
            placeholder=""
            v-model="editParam.reserveYmd"
          />
          </b-col>
          <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
            <y-select
            :width="8"
            :editable="editable"
            :comboItems="heaCheckupOrgNoReserveItems"
            itemText="heaCheckupOrgNm"
            itemValue="heaCheckupOrgNo"
            ui="bootstrap"
            type="search"
            label="건강검진기관"
            name="heaCheckupOrgNo"
            v-model="editParam.heaCheckupOrgNo"
          />
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="3">
        <y-datepicker
          :width="8"
          :editable="editable"
          type="month"
          label="선택월"
          name="yearMonth"
          placeholder=""
          v-model="searchReserveParam.yearMonth"
          />
      </b-col>
    </b-row>

    <b-row class="mt-1">
      <b-col sm="9">
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
                :action-url="editUrl"
                :param="gridSelectedRows"
                :is-submit="isEditSubmit"
                type="save"
                title="변경"
                size="small"
                color="primary"
                action-type="put"
                beforeSubmit = "beforeEditSubmit"
                @beforeEditSubmit="beforeEditSubmit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
          </div>
          <y-data-table 
            label="예약자 목록"
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
      <b-col sm="3">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="월별 예약인원"
            :headers="reserveGridHeaderOptions"
            :items="reserveGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :rows="5"
            />
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'reserve-change',
  props: {
    selectedCheckupPlanNo: 0
  },
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
        reservePeriod: '',
        heaCheckupOrgNos: [],
        reserveYn: 'Y'
      },
      editParam: {
        reserveYmd: '',
        heaCheckupOrgNo: 0
      },
      searchReserveParam: {
        heaCheckupPlanNo: 0,
        heaCheckupOrgNo: 0,
        yearMonth: ''
      },
      editable: true,
      detailUrl: '',
      editUrl: '',
      searchUrl: '',
      searchReserveUrl: '',
      
      isEditSubmit: false,
      processNoItems: [],
      deptCdItems: [],
      heaCheckupOrgNoItems: [],
      heaCheckupOrgNoReserveItems: [],
            
      gridHeaderOptions: [],
      gridData: [],
      gridSelectedRows: [],
      reserveGridHeaderOptions: [],
      reserveGridData: [],
    };
  },
  watch: {
    selectedCheckupPlanNo: function (newValue, oldValue) {
      this.checkupPlan.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.searchParam.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.searchReserveParam.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.getDetail();
      this.getList();
      this.getReserveList();
    },
    'editParam.heaCheckupOrgNo': function (newValue, oldValue) {
      this.searchReserveParam.heaCheckupOrgNo = this.editParam.heaCheckupOrgNo;
      this.getReserveList();
    },
    'searchReserveParam.yearMonth': function (newValue, oldValue) {
      this.getReserveList();
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
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        this.getProcessNoItems();
        this.getDeptCdItems();
        this.getHeaCheckupOrgNoItems();
        this.getHeaCheckupOrgNoReserveItems();
      }, 200);
      
      // 예약자목록
      this.gridHeaderOptions = [
        { text: '검진기관', name: 'heaCheckupOrgNm', width: '200px', align: 'center' },
        { text: '예약일', name: 'reserveYmd', width: '120px', align: 'center' },
        { text: '공정', name: 'processNm', width: '160px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '160px', align: 'center' },
        { text: '사번', name: 'userId', width: '120px', align: 'center' },
        { text: '성명', name: 'userNm', width: '120px', align: 'center' },
        { text: '입사일', name: 'entryYmd', width: '120px', align: 'center' },
        { text: '휴대전환', name: 'phoneNo', width: '120px', align: 'center' },
        { text: '사내전화', name: 'officeTel', width: '120px', align: 'center' }
      ];

      // 월별예약인원
      this.reserveGridHeaderOptions = [
        { text: '일자', name: 'reserveStatusYmd', width: '120px', align: 'center' },
        { text: '병원', name: 'heaCheckupOrgNm', width: '200px', align: 'center' },
        { text: '예약인원', name: 'reserveUserCount', width: '100px', align: 'center' }
      ];

      this.detailUrl = selectConfig.checkupPlan.get.url;
      this.searchUrl = selectConfig.checkupUser.list.url;
      this.searchReserveUrl = selectConfig.checkupReserve.orgStatus.url;
      this.editUrl = transactionConfig.checkupReserve.multiEdit.url;

      this.checkupPlan.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.searchParam.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      this.searchReserveParam.heaCheckupPlanNo = this.selectedCheckupPlanNo;
      if (this.checkupPlan.heaCheckupPlanNo > 0) {
        this.getDetail();
        this.getList();
        this.getReserveList();
      }
    },    
    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.checkupPlan.heaCheckupPlanNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.checkupPlan = _result.data;
      }, (_error) => {         
      });
    },
    getList () {
      if (this.searchParam.heaCheckupPlanNo > 0) { 
        this.$http.url = this.searchUrl;
        this.$http.type = 'get'; 
        this.$http.param = this.searchParam;
        this.$http.request((_result) => {
          this.gridData = _result.data;
        }, (_error) => {         
        });
      }
    },
    getReserveList () {
      if (this.searchReserveParam.heaCheckupPlanNo > 0 
        && this.searchReserveParam.heaCheckupOrgNo > 0
        && this.searchReserveParam.yearMonth !== '') {
        this.searchReserveParam.yearMonth = '2019-01';
        this.$http.url = this.searchReserveUrl;
        this.$http.type = 'get'; 
        this.$http.param = this.searchReserveParam;
        this.$http.request((_result) => {
          this.reserveGridData = _result.data;
        }, (_error) => {         
        });        
      }
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
    getHeaCheckupOrgNoItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        this.heaCheckupOrgNoItems = _result.data;
        this.searchParam.heaCheckupOrgNos = [];
      }, (_error) => {
      });
    },
    getHeaCheckupOrgNoReserveItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaCheckupOrgNo': 0, 'heaCheckupOrgNm': '선택하세요' });
        this.heaCheckupOrgNoReserveItems = _result.data;
        this.searchReserveParam.heaCheckupOrgNo = 0;
      }, (_error) => {
      });
    },

    beforeEditSubmit () {
      if (this.gridSelectedRows.length > 0 && confirm('선택된 대상자의 건강검진예약을 변경 하시겠습니까?')) {
        this.gridSelectedRows.forEach(item => {
          item.heaCheckupOrgNo = this.editParam.heaCheckupOrgNo;
          item.reserveYmd = '2019-01-25';
          // item.reserveYmd = this.editParam.reserveYmd;            
        });
        this.isEditSubmit = true;
      }
    },

    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnEditClickedCallback (_result) {
      this.isEditSubmit = false;
      this.getList();
      this.getReserveList();
      alert('선택된 대상자의 건강검진예약을 변경 하였습니다.'); 
    },
    btnSendClickedCallback (_result) {
      alert('아직 지원하지 않는 기능입니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isEditSubmit = false;       
      alert('작업진행 중 오류가 발생했습니다. 재시도 후 지속적으로 오류 발생시 관리자에게 문의하세요.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>