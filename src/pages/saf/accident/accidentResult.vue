<!--
  목적 : 사고관리 - 조사결과/개선계획
  Detail : 사고 접수 목록 화면을 접수단계의 사고 목록을 조회
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
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="deptCd"
                label="발생부서"
                v-model="searchParam.deptCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                name="area"
                label="발생장소"
                v-model="searchParam.area"
                >
              </y-text>
            </b-col>
            <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
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
            </b-col> -->
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                name="accidentTitle"
                label="사고명" 
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
                v-model="searchParam.accidentStepCd"
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
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            @tableLinkClicked="tableLinkAccidentTitleClicked"
            label="사고 목록"
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
  name: 'y-accident-reception',
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
      accidentStepCd: 'ACCS3', // 사내사고진행단계
      // accidentStepCds: [], // 사내사고진행단계
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: '300'
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
      // Url Setting
      this.searchUrl = selectConfig.saf.accident.list.url;      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '진행단계', name: 'accidentStepNm', width: '150px', align: 'center' },
        { text: '발생일', name: 'accidentYmd', width: '130px', align: 'center' },
        { text: '발생부서', name: 'deptNm', width: '150px' },
        { text: '발생장소', name: 'area', width: '150px', },
        { text: '사고명', name: 'accidentTitle', width: '250px', type: 'link' },
        { text: '작성자', name: 'createUserNm', width: '100px', },
        { text: '작성일', name: 'createDt', width: '150px', align: 'center' },
      ];
      this.getComboItems('SAF_ACCIDENT_STEP'); // 사내사고진행단계
      this.getComboDeptItems(); // 발생부서
      // 기간 Setting
      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(today, '1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      setTimeout(() => {
        this.searchParam.period = [from, to];
        this.getList(); // 사고조사결과 목록 조회
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
        this.searchParam.accidentStepCd = 'ACCS3';
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
     * showAccidentPopup 호출
     * 사고조사결과 목록에 사고명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkAccidentTitleClicked (header, data) {
      this.showAccidentPopup(data, false);
    },
    /**
     * 해당 사고 상세보는 팝업 open
     */
    showAccidentPopup (data, flag) {
      this.popupOptions.target = () => import(`${'./accidentDetail.vue'}`);
      this.popupOptions.title = '사고';
      this.popupOptions.param = {
        safAccidentNo: data.safAccidentNo, // 사내사고번호
        accidentTitle: data.accidentTitle, // 사고명
        accidentNum: data.accidentNum, // 발행번호
        accidentStepCd: data.accidentStepCd, // 사내사고진행단계
        accidentYmd: data.accidentYmd, // 발생일
        accidentHour: data.accidentHour, // 발생시
        accidentMinute: data.accidentMinute, // 발생분
        deptCd: data.deptCd, // 발생부서코드
        area: data.area, // 발생장소
        weatherCd: data.weatherCd, // 날씨코드
        accidentTypeEtc: data.accidentTypeEtc, // 사고유형기타

        rptUserId: data.rptUserId, // 보고자사번
        rptUserNm: data.rptUserNm, // 보고자성명
        rptDeptCd: data.rptDeptCd, // 보고자소속코드
        rptDeptNm: data.rptDeptNm, // 보고자소속명
        rptOfficeTel: data.rptOfficeTel, // 보고자사무실전화번호
        rptDt: data.rptDt, // 보고일시

        contents: data.contents, // 사고발생내용
        provReason: data.provReason, // 추정원인
        cauTypeCd: data.cauTypeCd, // 원인유형코드
        cauTypeEtc: data.cauTypeEtc, // 원인유형기타
        bgnMeas: data.bgnMeas, // 초기대책
        
        investYn: data.investYn, // 사고조사대상 여부

        detailDamageDesc: data.detailDamageDesc, // 상세피해내용

        humanInjuryCd: data.humanInjuryCd, // 인적피해_상해정도
        humanInjuryDesc: data.humanInjuryDesc, // 인적피해내용

        dirLossAmount: data.dirLossAmount, // 물적피해직접손실액
        indirLossAmount: data.indirLossAmount, // 물적피해간접손실액
        matDamageDesc: data.matDamageDesc, // 물적피해내용

        drainLeak: data.drainLeak, // 환경피해_수계누출량
        etcLeak: data.etcLeak, // 환경피해_그외누출량
        envDamageDesc: data.envDamageDesc, // 환경피해내용

        noAccidentYn: data.noAccidentYn, // 무재해영향여부
        accidentLvlCd: data.accidentLvlCd, // 사고피해레벨코드

        flag: flag, // 수정인지 등록인지 판단

        tabIndex: 3,
      };
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    /** 사고조사결과 목록 조회 **/
    getList () {
      this.searchParam.startDate = this.$_.clone(this.searchParam.period[0]);
      this.searchParam.endDate = this.$_.clone(this.searchParam.period[1]);
      // this.searchParam.accidentStepCds = ['ACCS3', 'ACCS4'];
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
      if (data === null || data === undefined) return;
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getList();
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
        this.gridOptions.height = calculatedHeight <= 250 ? defaultHeight : calculatedHeight;
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
    btnSearchClickedCallback () {
      this.getList();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>