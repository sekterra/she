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
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                v-if="statusCheck"
                title="출력"
                color="black"
                @btnClicked="exportReport()" 
              />
              <y-btn
                v-if="statusCheck"
                title="완료/취소"
                color="orange"
                @btnClicked="openExtendPage()" 
              />
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
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="작업기간"
                name="workYmd"
                v-model="searchParam.workYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboReqDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="신청부서"
                name="reqDeptCd"
                v-model="searchParam.reqDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboWkodKindItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="작업종류"
                name="wkodKindCd"
                v-model="searchParam.wkodKindCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboPubDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="발행부서"
                name="pubDeptCd"
                v-model="searchParam.pubDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              ui="bootstrap"
              label="작업NO"
              name="wkodNum"
              v-model="searchParam.wkodNum"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              ui="bootstrap"
              label="작업명"
              name="workTitle"
              v-model="searchParam.workTitle"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboWkodStepItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="진행단계"
                name="wkodStepCd"
                v-model="searchParam.wkodStepCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
          <b-col sm="12" class="px-0">
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="insertCheck"
                title="신규등록"
                color="orange"
                @btnClicked="openDetailPage()" 
              />
            </div>
            <y-data-table 
              :headers="gridOptions.header"
              :height="gridOptions.height"
              :items="gridOptions.data"
              :excel-down="true"
              :print="true"
              :use-paging="true"
              label="작업허가서 목록"
              ref="dataTable"
              @tableLinkClicked="tableLinkWorkTitleClicked"
              v-model="exportReportRow"
              >
              <el-table-column
              v-if="statusCheck"
              type="selection"
              slot="selection"
              align="center"
              width="40" 
              >
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
  /* attributes: name, components, props, data */
  name: 'wkod-request',
  props: {
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '1050px',
        top: '10px',
        param: {},
        closeCallback: null
      },
      searchParam: {
        workYmd: '',
        reqDeptCd: '',
        wkodKindCd: '',
        pubDeptCd: '',
        wkodStepCd: '',
        wkodNum: '',
        workTitle: '',
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      baseWidth: 9,
      wkodMaster: {},
      comboReqDeptItems: [],
      comboWkodKindItems: [],
      comboPubDeptItems: [],
      comboWkodStepItems: [],
      exportReportRow: [],
      menuCheck: '',
      editUrl: '',
      insertUrl: '',
      searchUrl: '',
      insertCheck: false,
      statusCheck: false
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
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.searchUrl = selectConfig.saf.wkodMaster.list.url;
      
      if (this.$route.meta.wkodStepCd === 'WKS99') this.menuCheck = 'WKS04';
      else this.menuCheck = this.$route.meta.wkodStepCd;
      
      var from = this.$comm.getCalculatedDate(this.$comm.getToday(), '-7d', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(this.$comm.getToday(), '7d', 'YYYY-MM-DD', 'YYYY-MM-DD');
      
      setTimeout(() => {
        this.searchParam.workYmd = [from, to];
        this.searchParam.wkodStepCd = this.$route.meta.wkodStepCd;
        
        if (this.$route.meta.wkodStepCd === "WKS01") this.insertCheck = true;
        else if (this.$route.meta.wkodStepCd === "WKS99") this.statusCheck = true;
      
        this.getList();
      }, 100);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '진행단계', name: 'wkodStepNm', width: '100px', align: 'center' },
        { text: '작업일자', name: 'workYmd', width: '130px', align: 'center' },
        { text: '작업NO', name: 'wkodNum', width: '130px', align: 'center' },
        { text: '작업종류', name: 'wkodKindNm', width: '100px', align: 'center' },
        { text: '작업명', name: 'workTitle', width: '250px', url: 'true' },
        { text: '신청부서', name: 'reqDeptNm', width: '130px', align: 'center' },
        { text: '신청인', name: 'reqUserNm', width: '100px', align: 'center' },
        { text: '발행부서', name: 'pubDeptNm', width: '130px', align: 'center' }
      ];

      this.getComboItems('SAF_WKOD_KIND'); // 작업종류
      this.getComboItems('SAF_WKOD_STEP'); // 진행단계
      this.getDeptItems();
      this.setGridSize();
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        if (codeGroupCd === 'SAF_WKOD_KIND') {
          this.comboWkodKindItems = this.$_.clone(_result.data);
        } else {
          const length = _result.data.length;

          _result.data.splice(length, 0, { 'code': 'WKS99', 'codeNm': '출력, 완료, 취소' });
          this.comboWkodStepItems = this.$_.clone(_result.data);
        }
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * showAccidentPopup 호출
     * 사고등록 목록에 사고명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkWorkTitleClicked (header, data) {
      this.openDetailPage(data);
    },
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboReqDeptItems = _result.data;
        this.comboPubDeptItems = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검색박스 숨기기/보이기 처리 후 setGridSize 호출
     */
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
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
    openDetailPage (data) {
      if (data === null || data === undefined) {
        this.popupOptions.title = '작업허가서 등록/수정';
        this.popupOptions.param = {
          'wkodNo': 0,
          'wkodStepCd': this.searchParam.wkodStepCd
        };
      } else {
        this.popupOptions.title = '작업허가서 상세';
              
        if (this.menuCheck === data.wkodStepCd) {
          this.popupOptions.param = {
            'wkodNo': data.wkodNo,
            'wkodStepCd': data.wkodStepCd
          };
        } else {
          this.popupOptions.param = {
            'wkodNo': data.wkodNo,
            'wkodStepCd': 'WKS05'
          };
        }
      }
      this.popupOptions.top = "10px";
      this.popupOptions.target = () => import(`${'./wkodDetail.vue'}`);
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    openExtendPage () {
      var message = '';
      if (this.exportReportRow.length === 0) message = '신청현황을 선택하세요.';
      else if (this.exportReportRow.length > 1) message = '신청현황을 하나만 선택하세요.';

      if (message !== '') {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: message,
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      this.popupOptions.param = {
        'wkodMaster': this.exportReportRow[0]
      };
      
      this.popupOptions.top = "5%";
      this.popupOptions.target = () => import(`${'./wkodExtend.vue'}`);
      this.popupOptions.title = '작업허가서 연장';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    exportReport () {
      var message = '출력 가능';
      var type = 'success';
      this.exportReportRow.forEach(row => {
        if (row.wkodStepCd !== 'WKS04') {
          message = '진행단계가 출력이 아닌 데이터가 존재 합니다.';
          type = 'warning';
          return;
        }
      });
      
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: message,
        type: type,  // success / info / warning / error
      });
    },
    closePopup () {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getList();
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.gridOptions.data = this.$_.clone(_result.data);
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
