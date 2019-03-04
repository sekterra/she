<!--
  목적 : 작업허가서 신청 목록
  Detail : 작업허가서 신청 목록 화면
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
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboImprClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="진행상태"
                name="imprClassCd"
                v-model="searchParam.imprClassCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="평가년도"
                name="imprRqstYmd"
                v-model="searchParam.imprRqstYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboImprStepItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="정기/수시"
                name="imprStepCd"
                v-model="searchParam.imprStepCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="평가유형"
                name="actDeptCd"
                v-model="searchParam.actDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
             <y-text
              :width="8"
              ui="bootstrap"
              label="평가명"
              name="imprTitle"
              v-model="searchParam.imprTitle"
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
              label="요청/조치사항 목록"
              ref="dataTable"
              :excel-down="true"
              :print="true"
              :use-paging="true"
              :height="gridOptions.height"
              :headers="gridOptions.header"
              :items="gridOptions.data"
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
  name: 'impr-act',
  props: {
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
      searchParam: {
        imprClassCd: '',
        imprRqstYmd: '',
        imprStepCd: '',
        actClassCd: 'ACL02',
        imprTitle: '',
        imprRqstDeptCd: '',
        actDeptCd: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      component: null,
      comboDeptItems: [],
      comboImprStepItems: [],
      comboImprClassItems: [],
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
    // this.getComboItems('SAF_IMPR_CLASS'); // 개선분류코드
    // this.getComboItems('SAF_IMPR_STEP'); // 개선진행단계
    // this.getDeptItems();
    // this.setGridSize();
  },
  mounted () {
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.saf.imprAct.list.url;
      }, 100);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '업무구분', name: 'imprClassNm', width: '100px', align: 'center' },
        { text: '제목', name: 'imprTitle', width: '250px', url: 'true' },
        { text: '진행상태', name: 'imprStepNm', width: '150px', align: 'center' },
        { text: '요청일', name: 'imprRqstYmd', width: '130px', align: 'center' },
        { text: '요청부서', name: 'imprRqstDeptNm', width: '130px', align: 'center' },
        { text: '조치부서', name: 'actDeptNm', width: '130px', align: 'center' },
        { text: '조치담당자', name: 'actUserNm', width: '130px', align: 'center' },
        { text: '조치기간', name: 'actLimitYmd', width: '130px', align: 'center' },
        { text: '조치처리일', name: 'actConfirmYmd', width: '130px', align: 'center' }
      ];
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        if (codeGroupCd === 'SAF_IMPR_CLASS') this.comboImprClassItems = this.$_.clone(_result.data);
        else this.comboImprStepItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    selectedRow (data) {
    },
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    tableLinkimprTitleClicked (header, data) {
      this.openDialogPage('DETAIL', data)
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    openDialogPage (flag, data) {
      
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
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
    btnSearchClickedCallback (_result) {
      this.getList();
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
