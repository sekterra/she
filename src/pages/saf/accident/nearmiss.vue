<!--
  목적 : 사고관리 - 아차사고
  Detail : 사고 목록 화면
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
              <y-label label="검색" />
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
                label="기간(발생일)"
                name="period"
                v-model="searchParam.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-select
                    :width="6"
                    :comboItems="comboDeptItems"
                    itemText="deptNm"
                    itemValue="deptCd"
                    ui="bootstrap"
                    name="deptCd"
                    label="발생부서/장소"
                    v-model="searchParam.deptCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                    :width="12"
                    ui="bootstrap"
                    name="area"
                    v-model="searchParam.area"
                    >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                name="accidentTitle"
                label="아차사고명" 
                v-model="searchParam.accidentTitle"
                >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboAccidentStepItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="checkStepCd"
                label="진행단계"
                v-model="searchParam.processStepCd"
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
              title="신규등록"
              color="orange"
              @btnClicked="btnSearchCheckResultOpenPopupClicked" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            @tableLinkClicked="tableLinkAccidentTitleClicked"
            label="아차사고 목록"
            >
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
  name: 'y-accident-occur',
  props: {
  },
  data: () => ({
    searchParam: {
      period: [], // 기간(발생일)
      startDate: '', // From
      endDate: '', // To
      deptCd: '', // 발생부서 코드
      area: '', // 발생장소
      accidentTitle: '', // 사고명
      processStepCd: '', // 사내사고진행단계
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: '200'
    },
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      param: null,
      width: '90%',
      top: '10px',
      closeCallback: null
    },
    userInfo: {
      userId: '',
      userNm: '',
      deptCd: '',
      deptNm: '',
    },
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    comboDeptItems: [], // 발생부서
    comboAccidentStepItems: [], // 사내사고진행단계
    searchUrl: '',
  }),
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
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // 사용자 정보 setting
      /* this.userInfo.userId = 'dev';
      this.userInfo.userNm = '개발자';
      this.userInfo.deptCd = 'yullin';
      this.userInfo.deptNm = '열린기술'; */

      // Url Setting
      this.searchUrl = selectConfig.saf.nearmiss.list.url;   
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '진행단계', name: 'processStepNm', width: '100px', align: 'center' },
        { text: '발생일', name: 'nearmissYmd', width: '130px', align: 'center' },
        { text: '발생부서', name: 'deptNm', width: '130px', align: 'center' },
        { text: '발생장소', name: 'area', width: '150px', align: 'left' },
        { text: '사고명', name: 'nearmissTitle', width: '300px', type: 'link', align: 'left' },
        { text: '발생유형', name: 'occTypeNm', width: '150px', align: 'center' },
        { text: '원인유형', name: 'cauTypeNm', width: '150px', align: 'center' },
        { text: '성명', name: 'showUserNm', width: '100px', align: 'center' },
        { text: '소속', name: 'showDeptNm', width: '100px', align: 'center' },
      ];
      this.getComboItems('SAF_NEARMISS_STEP'); // 진행단계
      this.getComboDeptItems(); // 발생부서
      // 기간 Setting
      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(today, '1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      setTimeout(() => {
        this.searchParam.period = [from, to];
        this.getList(); // 사고등록 목록 조회
      }, 300);
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공통 마스터 정보 조회 (진행단계)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboAccidentStepItems = this.$_.clone(_result.data);
        this.comboAccidentStepItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.searchParam.processStepCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 발생부서 조회
     */
    getComboDeptItems (codeGroupCd) {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDeptItems = this.$_.clone(_result.data);
        this.comboDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.searchParam.deptCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * showNearmissPopup 호출
     * 아차사고등록 목록에 사고명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkAccidentTitleClicked (header, data) {
      this.showNearmissPopup(data);
    },
    /**
     * 해당 사고 상세보는 팝업 open
     */
    showNearmissPopup (data) {
      this.popupOptions.target = () => import(`${'./nearmissDetail.vue'}`);
      if (data.processStepCd === "") {
        this.popupOptions.title = '아차사고등록';
      }
      else {
        this.popupOptions.title = '아차사고상세';
      }
      
      this.popupOptions.param = {
        safNearmissNo: data.safNearmissNo, // 아차사고 번호
        nearmissTitle: data.nearmissTitle, // 아차사고명
        nearmissNum: data.nearmissNum, // 발행번호
        processStepCd: data.processStepCd, // 진행단계
        nearmissYmd: data.nearmissYmd, // 발생일
        nearmissHour: data.nearmissHour, // 발생시간
        nearmissMinute: data.nearmissMinute, // 발생분
        deptCd: data.deptCd, // 부서코드
        area: data.area, // 발생장소
        occTypeCd: data.occTypeCd, // 발생유형코드
        nearmissTypeEtc: data.nearmissTypeEtc, // 발생유형기타
        contents: data.contents, // 발생내용
        cauTypeCd: data.cauTypeCd, // 원인유형코드
        cauTypeEtc: data.cauTypeEtc, // 원인유형기타
        bgnMeas: data.bgnMeas, // 초기대책
        provReason: data.provReason, // 추정원인
        createUserId: data.createUserId, // 등록자
        createDeptCd: data.createDeptCd, // 등록자 부서
        createDt: data.createDt, // 작성일
        updateUserId: data.updateUserId, // 수정자
        updateDeptCd: data.updateDeptCd, // 수정자 부서
        updateDt: data.updateDt, // 수정일
        showDeptNm: data.showDeptNm, // 사용자부서
        showUserNm: data.showUserNm, // 사용자명
      };
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    /** 사고등록 목록 조회 **/
    getList () {
      this.searchParam.startDate = this.$_.clone(this.searchParam.period[0]);
      this.searchParam.endDate = this.$_.clone(this.searchParam.period[1]);
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     *  팝업 안 보이도록 설정 후 getReserveData 호출
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      this.getList();

      if (data === null || data === undefined) return;
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 180;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 320;
        this.gridOptions.height = calculatedHeight <= 180 ? defaultHeight : calculatedHeight;
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
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    btnSearchCheckResultOpenPopupClicked () {
      var data = {
        safNearmissNo: 0, // 아차사고 번호
        nearmissTitle: "", // 아차사고명
        nearmissNum: "", // 발행번호
        processStepCd: "", // 진행단계
        nearmissYmd: "", // 발생일
        nearmissHour: "", // 발생시간
        nearmissMinute: "", // 발생분
        deptCd: "", // 부서코드
        area: "", // 발생장소
        occTypeCd: "", // 발생유형코드
        nearmissTypeEtc: "", // 발생유형기타
        contents: "", // 발생내용
        cauTypeCd: "", // 원인유형코드
        cauTypeEtc: "", // 원인유형기타
        bgnMeas: "", // 초기대책
        provReason: "", // 추정원인
        createUserId: "", // 등록자
        createDeptCd: "", // 등록자 부서
        createDt: "", // 작성일
        updateUserId: "", // 수정자
        updateDeptCd: "", // 수정자 부서
        updateDt: "", // 수정일
        showDeptCd: "", // 사용자부서
        showUserId: "", // 사용자명
      };
      this.showNearmissPopup(data);
    },
    btnSearchClickedCallback () {
      this.getList();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>