<!--
  목적 : 안전보호구 > 보호구 지급
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row ref="searchBox">
      <!-- 검색조건 -->
      <b-col sm="12">
        <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색"/>
            </div>
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                title="검색"
                color="green"
                action-type="GET"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :range="true"
                label="지급기간"
                name="period"
                v-model="searchParam.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :comboItems="processStepCds"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="진행단계"
                name="processStepCd"
                v-model="searchParam.processStepCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :comboItems="speKindCds"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="보호구 종류"
                name="speKindCd"
                v-model="searchParam.speKindCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="보호구명"
                name="speNm"
                v-model="searchParam.speNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="수령부서"
                name="receiptDeptCd"
                v-model="searchParam.receiptDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :clearable="true"
                ui="bootstrap"
                type="search"
                label="수령자명"
                name="receiptUserNm"
                v-model="searchParam.receiptUserNm"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
              >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 보호구 지급 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              title="부서지급등록"
              color="orange"
              @btnClicked="btnPopupClickedCallbackDept" 
            />
            <y-btn
              title="개인지급등록"
              color="orange"
              @btnClicked="btnPopupClickedCallbackUser" 
            />
          </div>
          <y-data-table 
            label="보호구 지급 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @tableLinkClicked="tableLinkClicked"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>

    <!-- 팝업 설정 -->
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'spe-give',
  props: {
  },
  data () {
    return {
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        period: [],
        processStepCd: '',
        receiptDeptCd: '',
        speKindCd: '',
        speNm: '',
        receiptUserNm: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: '460'
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '60%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      baseWidth: 8,
      comboDeptItems: [], // 수령부서
      processStepCds: [], // 보호구 종류
      speKindCds: [], // 보호구 종류
      searchUrl: '',
    };
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  methods: {
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.saf.speGive.list.url;

      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-7d', 'YYYY-MM-DD', 'YYYY-MM-DD');

      this.setGridSize();

      setTimeout(() => {
        this.searchParam.period = [from, today];
        this.getProcessStepCds(); // 진행단계
        this.getSpeKindCds(); // 보호구 종류
        this.getDeptItems();  // 수령부서
        this.getDataList();
      }, 200);

      // 보호구 지급 grid 헤더 설정
      this.gridOptions.header = [
        { text: '진행단계', name: 'processStepNm', width: '100px', align: 'center' },
        { text: '지급일', name: 'giveYmd', width: '105px', align: 'center' },
        { text: '지급구분', name: 'giveKindNm', width: '100px', align: 'center' },
        { text: '수령부서', name: 'receiptDeptNm', width: '130px', align: 'left' },
        { text: '수령자', name: 'receiptUserNm', width: '100px', align: 'center', url: 'true' },
        { text: '보호구종류', name: 'speKindNm', width: '110px', align: 'center' },
        { text: '보호구명', name: 'speNm', width: '150px', align: 'left' },
        { text: '지급개수', name: 'giveNum', width: '90px', align: 'right' },
        { text: '단위', name: 'giveUnitNm', width: '80px', align: 'left' },
      ];
    },
    // 수령부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 진행단계
    getProcessStepCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_PROCESS_STEP');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.processStepCds = this.$_.clone(_result.data);
        this.processStepCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 종류
    getSpeKindCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_SPE_KIND');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.speKindCds = this.$_.clone(_result.data);
        this.speKindCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 지급 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 그리드 row click 이벤트
    tableLinkClicked (header, data) {
      if (data.giveKindCd === 'GIVE1') {
        this.btnPopupClickedCallbackUser(data);
      } else if (data.giveKindCd === 'GIVE2') {
        this.btnPopupClickedCallbackDept(data);
      }
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** Button Event **/
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    // 검색
    btnSearchClickedCallback (_result) {
      this.getDataList();
    },
    // 부서지급등록 팝업
    btnPopupClickedCallbackDept (data) {
      this.popupOptions.target = () => import(`${'./createSpeGive.vue'}`);
      this.popupOptions.title = '보호구 지급';
      this.popupOptions.visible = true;
      this.popupOptions.width = '70%';
      this.popupOptions.top = '10px';
      this.popupOptions.param = {
        'safSpeGiveNo': data ? data.safSpeGiveNo : 0,
        'processStepCd': data ? data.processStepCd : 'STEP1',
        'giveKindCd': 'GIVE2'
      };
      this.popupOptions.closeCallback = this.closePopup;
    },
    // 개인지급등록 팝업
    btnPopupClickedCallbackUser (data) {
      this.popupOptions.target = () => import(`${'./createSpeGive.vue'}`);
      this.popupOptions.title = '보호구 지급';
      this.popupOptions.visible = true;
      this.popupOptions.width = '70%';
      this.popupOptions.top = '10px';
      this.popupOptions.param = {
        'safSpeGiveNo': data ? data.safSpeGiveNo : 0,
        'processStepCd': data ? data.processStepCd : 'STEP1',
        'giveKindCd': 'GIVE1'
      };
      this.popupOptions.closeCallback = this.closePopup;
    },
    // 팝업 닫기
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getDataList();
    },
    // 사용자 검색
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    }, 
    // 사용자 검색 팝업 닫기
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.searchParam.receiptUserNm = data.user.userNm;
      }
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
  }
};
</script>