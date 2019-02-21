<!--
  목적 : 검진 일괄예약
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
              <y-label label="검진종류: " /><y-label :label="checkupPlan.heaCheckupClassNm" fieldable="true" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진계획: " /><y-label :label="checkupPlan.heaCheckupPlanNm" fieldable="true" />
            </b-col>
            <b-col sm="4">
              <y-label label="검진일자: " /><y-label :label="checkupPlan.heaCheckupPlanPeriod" fieldable="true" />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row> 

    <b-row class="mt-3">
      <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
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
      <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
        <y-select
        :width="8"
        :editable="editable"
        :comboItems="heaCheckupOrgNoReserveItems"
        itemText="heaCheckupOrgNm"
        itemValue="heaCheckupOrgNo"
        ui="bootstrap"
        type="search"
        label="검진기관"
        name="heaCheckupOrgNo"
        v-model="searchReserveParam.heaCheckupOrgNo"
      />
      </b-col>    
      <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
      <y-label label="예약일: " /><y-label :label="editParam.reserveYmd" fieldable="true" />
      </b-col>        
    </b-row>

    <b-row class="mt-1">
      <b-col sm="5">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="월별 예약인원"
            :headers="reserveGridHeaderOptions"
            :items="reserveGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :useRownum="false"
            @selectedRow="reserveSelectedRow"
            />
        </b-col>
      </b-col>
      <b-col sm="7">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
                v-if="editable&&checkupPlan.heaCheckupPlanNo>0"
                :action-url="editUrl"
                :param="gridSelectedRows"
                :is-submit="isEditSubmit"
                title="일괄예약"
                color="blue"
                action-type="post"
                beforeSubmit = "beforeEditSubmit"
                @beforeEditSubmit="beforeEditSubmit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
          </div>
          <y-data-table 
            label="미예약자 목록"
            :headers="gridHeaderOptions"
            :items="gridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
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
        reserveYn: 'N'
      },
      editParam: {
        reserveYmd: '월별 예약인원 항목을 선택하세요.',
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
      this.searchReserveParam.yearMonth = '';
      this.searchReserveParam.heaCheckupOrgNo = 0;
      this.getDetail();
      this.getHeaCheckupOrgNoReserveItems();
      this.getList();      
      this.getReserveList();
    },
    'searchReserveParam.heaCheckupOrgNo': function (newValue, oldValue) {
      this.editParam.heaCheckupOrgNo = this.searchReserveParam.heaCheckupOrgNo;
      this.editParam.reserveYmd = '월별 예약인원 항목을 선택하세요.';
      this.getReserveList();
    },
    'searchReserveParam.yearMonth': function (newValue, oldValue) {
      this.editParam.reserveYmd = '월별 예약인원 항목을 선택하세요.';
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
        this.heaCheckupOrgNoReserveItems.push({ 'heaCheckupOrgNo': 0, 'heaCheckupOrgNm': '선택하세요' });
      }, 200);
      
      // 예약자목록
      this.gridHeaderOptions = [
        { text: '검진기관', name: 'heaCheckupOrgNm', width: '160px', align: 'center' },
        { text: '예약일', name: 'reserveYmd', width: '120px', align: 'center' },
        { text: '공정', name: 'processNm', width: '120px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '120px', align: 'center' },
        { text: '사번', name: 'userId', width: '100px', align: 'center' },
        { text: '성명', name: 'userNm', width: '100px', align: 'center' },
        { text: '입사일', name: 'entryYmd', width: '100px', align: 'center' },
        { text: '휴대전환', name: 'phoneNo', width: '120px', align: 'center' },
        { text: '사내전화', name: 'officeTel', width: '120px', align: 'center' }
      ];

      // 월별예약인원
      this.reserveGridHeaderOptions = [
        { text: '일자', name: 'reserveStatusYmd', width: '35%', align: 'center' },
        { text: '병원', name: 'heaCheckupOrgNm', width: '40%', align: 'center' },
        { text: '인원', name: 'reserveUserStatus', width: '25%', align: 'center' }
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
        this.getHeaCheckupOrgNoReserveItems();
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
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get'; 
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getReserveList () {
      if (this.searchReserveParam.heaCheckupPlanNo > 0 
        && this.searchReserveParam.heaCheckupOrgNo > 0
        && this.searchReserveParam.yearMonth !== '') {
        this.$http.url = this.searchReserveUrl;
        this.$http.type = 'get'; 
        this.$http.param = this.searchReserveParam;
        this.$http.request((_result) => {
          this.reserveGridData = _result.data;
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', _error);
        });        
      }
      else {
        this.reserveGridData = [];
      }
    },
    getHeaCheckupOrgNoReserveItems () {
      this.$http.url = selectConfig.checkupPlanOrg.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'heaCheckupPlanNo': this.checkupPlan.heaCheckupPlanNo
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaCheckupOrgNo': 0, 'heaCheckupOrgNm': '선택하세요' });
        this.heaCheckupOrgNoReserveItems = _result.data;
        this.searchReserveParam.heaCheckupOrgNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    reserveSelectedRow (data) {
      this.editParam.reserveYmd = data.reserveStatusYmd;
    },

    beforeEditSubmit () {
      if (!this.$comm.isDateType(this.editParam.reserveYmd)) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '월별 예약인원에서 예약가능 인원을 확인하세요.',
          type: 'warning',
        });
      }
      else if (this.gridSelectedRows.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '선택된 대상자의 검진 일괄예약을 진행 하시겠습니까?',
          type: 'info',
          // 확인 callback 함수
          confirmCallback: () => {
            this.gridSelectedRows.forEach(item => {
              item.heaCheckupOrgNo = this.editParam.heaCheckupOrgNo;
              item.consentYn = 'Y';
              item.reserveYmd = this.editParam.reserveYmd;            
            });
            this.isEditSubmit = true;
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

    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnEditClickedCallback (_result) {
      this.isEditSubmit = false;
      this.getList();
      this.getReserveList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '선택된 대상자의 검진 일괄예약을 진행 하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isEditSubmit = false;       
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>