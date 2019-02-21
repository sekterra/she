<!--
  목적 : 작업허가서 점검 확인사항
  Detail : 작업허가서 점검 확인사항 Tab
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row class="mt-1">
      <b-col sm="6">
        <b-col sm="12" class="px-0">
          <y-data-table
            ref="requestDatatable"
            label="요청부서"
            checkKey="chkItemNo"
            :headers="gridOptions.header"
            :items="wkodMaster.wkodDeptRequest"
            :checkItemData="wkodMaster.selectedRequestRow"
            :rows="5"
            v-model="wkodMaster.wkodChkResultRequestRow"
            >
            <el-table-column
              :selectable="requestSelectedCheck"
              type="selection"
              slot="selection"
              align="center"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>
      </b-col>
      <b-col sm="6">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="workDatatable"
            label="작업부서"
            checkKey="chkItemNo"
            :headers="gridOptions.header"
            :items="wkodMaster.wkodDeptWork"
            :checkItemData="wkodMaster.selectedWorkRow"
            :rows="5"
            v-model="wkodMaster.wkodChkResultWorkRow"
            >
            <el-table-column
              :selectable="workSelectedCheck"
              type="selection"
              slot="selection"
              align="center"
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
  name: 'confirm-inspection-index',
  props: {
    wkodMaster: {
      type: Object,
      default: {
        wkodStepCd: '',
        wkodDeptRequest: [],
        wkodDeptWork: [],
        selectedRequestRow: [],
        selectedWorkRow: [],
        wkodChkResultRequestRow: [],
        wkodChkResultWorkRow: []
      },
    },
  },
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: 300
      }
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
  updated () {
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // GridHeader
      this.gridOptions.header = [
        { text: '구분', name: 'wkodDptyNm', width: '100px', align: 'center' },
        { text: '점검항목', name: 'chkItemNm', width: '220px' }
      ];
    },
    getList () {
    },
    requestSelectedCheck () {
      if (this.wkodMaster.wkodStepCd === 'WKS01') return true;
      else return false;
    },
    workSelectedCheck () {
      if (this.wkodMaster.wkodStepCd === 'WKS02') return true;
      else return false;
    },
    btnSearchClickedCallback (_result) {
      // this.getList();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      // this.$emit('APP_REQUEST_ERROR', _result);
    }
  }
};
</script>

<style>

</style>
