<!--
  목적 : 작업허가서 신청 목록
  Detail : 작업허가서 신청 목록 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
          <b-col sm="12" class="px-0">
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="tabParam.editable"
                title="즉시조치등록"
                color="blue"
                @btnClicked="openDialogPage('NOW')" 
              />
              <y-btn
                v-if="tabParam.editable"
                title="개선요청등록"
                color="blue"
                @btnClicked="openDialogPage('REQUEST')" 
              />
            </div>
            <y-data-table 
              label="개선사항 목록"
              ref="dataTable"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :excel-down="true"
              :print="true"
              :rows="5"
              :cellClick="true"
              @tableLinkClicked="tableLinkimprTitleClicked"
            />
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
  /* attributes: name, components, props, data */
  name: 'impr-act-tab',
  props: {
    tabParam: {
      type: Object,
      default: {
        imprClassCd: '',
        refTableId: 0,
        editable: true,
        detailCheck: false,
      },
    },
    tabIndex: ''
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '1000px',
        top: '10px',
        param: {},
        closeCallback: null
      },
      gridOptions: {
        header: [],
        data: [],
      },
      searchUrl: ''
    }
  },
  watch: {
    tabIndex () {
      this.getList();
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
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.searchUrl = selectConfig.saf.imprAct.list.url;
      
      setTimeout(() => {
        this.getList();
      }, 100);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '조치구분', name: 'actClassNm', width: '130px', align: 'center' },
        { text: '개선요청내용', name: 'imprRqstContents', width: '300px', url: 'true' },
        { text: '조치결과내용', name: 'actResultContents', width: '250px' },
        { text: '조치부서', name: 'actDeptNm', width: '130px', align: 'center' },
        { text: '조치예정일', name: 'actSchYmd', width: '130px', align: 'center' },
        { text: '조치완료일', name: 'actConfirmYmd', width: '130px', align: 'center' }
      ];
    },
    selectedRow (data) {
      if (data === null) return;
    },
    tableLinkimprTitleClicked (header, data) {
      this.openDialogPage('DETAIL', data)
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.tabParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    openDialogPage (flag, data) {
      if (data !== undefined) {
        if (data.imprStepCd === 'IMST1' && data.actClassCd === 'ACL01') flag = 'NOW';
        else if (data.imprStepCd === 'IMST1' && data.actClassCd === 'ACL02') flag = 'REQUEST';
        
        this.popupOptions.param = {
          'safImprActNo': data.safImprActNo,
          'imprClassCd': this.tabParam.imprClassCd,
          'refTableId': this.tabParam.refTableId,
          'flag': flag
        };
      } else {
        this.popupOptions.param = {
          'safImprActNo': 0,
          'imprClassCd': this.tabParam.imprClassCd,
          'refTableId': this.tabParam.refTableId,
          'flag': flag
        };
      }

      if (this.tabParam.detailCheck) {
        flag = 'DETAIL';
        this.popupOptions.param.flag = 'DETAIL';
      } 
      
      if (flag === 'NOW') {
        this.popupOptions.title = '즉시조치등록';
        this.popupOptions.target = () => import(`${'./immediateAction.vue'}`);
      } else if (flag === 'DETAIL') {
        this.popupOptions.title = '개선요청상세';
        this.popupOptions.target = () => import(`${'./improveDetail.vue'}`);
      } else {
        this.popupOptions.title = '개선요청등록';
        this.popupOptions.target = () => import(`${'./actionRequest.vue'}`);
      }
      
      this.popupOptions.top = "10px";
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    closePopup () {
      this.getList();
      
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
