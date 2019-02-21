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
              @tableLinkClicked="tableLinkClicked"
            />
          </b-col>
      </b-col>
    </b-row>

    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :append-to-body="true"
      :width="popupOptions.width"        
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      :top="popupOptions.top" >
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closePopup" />
    </el-dialog>
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
        editable: true
      },
    },
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '930px',
        top: '10px',
        param: {}
      },
      gridOptions: {
        header: [],
        data: [],
      },
      searchUrl: ''
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
    // this.getList();
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
        this.searchUrl = selectConfig.saf.wkodMaster.list.url;
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '조치구분', name: 'actClassNm', width: '10%', align: 'center' },
        { text: '개선요청내용', name: 'imprRqstContents', width: '30%' },
        { text: '조치결과내용', name: 'actResultContents', width: '20%' },
        { text: '조치부서', name: 'actDeptNm', width: '10%', align: 'center' },
        { text: '조치예정일', name: 'actUserNm', width: '10%', align: 'center' },
        { text: '조치완료일', name: 'actConfirmYmd', width: '10%', align: 'center' }
      ];
    },
    selectedRow (data) {
      if (data === null) return;
    },
    tableLinkClicked (header, row) {
      if (header.name === 'imprTitle') {
        console.log("Title Click");
      }
    },
    getList () {
      this.$http.url = selectConfig.saf.wkodMaster.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    openDialogPage (flag) {
      this.popupOptions.param = {
        'item': 0,
      };

      if (flag === 'NOW')
      {
        this.popupOptions.title = '즉시조치등록';
        this.popupOptions.target = () => import(`${'./immediateAction.vue'}`);
      } 
      else
      {
        this.popupOptions.title = '개선요청등록';
        this.popupOptions.target = () => import(`${'./actionRequest.vue'}`);
      } 
      
      this.popupOptions.top = "10px";
      this.popupOptions.visible = true;
    },
    closePopup () {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.getList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
