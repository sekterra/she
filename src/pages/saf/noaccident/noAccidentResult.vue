<!--
  목적 : 무재해목록
  작성자 : kth
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
                v-if="editable"
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
                :editable="editable"
                :range="true"
                label="시작일"
                name="period"
                v-model="searchParam.duration"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 무재해 목록 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              v-if="editable"
              title="신규등록"
              color="orange"
              @btnClicked="btnPopupClickedCallback" 
            />
          </div>
          <y-data-table 
            label="사업장 무재해 목록"
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
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'spe-give',
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        duration: []
      },
      noAccident: {
        safNoAccidentNo: 0,
        startYmd: '',
        endSchYmd: '',
        mhUseYn: '',
        targetMh: 0,
        initMh: 0,
        normMh: 0,
        holiMh: 0,
        dayMancntCpy: 0,
        dayMancntCon: 0,
        dayUseYn: 0,
        targetDays: 0,
        initDays: 0,
        normalDays: 0,
        holiDays: 0,
        remark: '',
        useYn: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',
        totalMh: 0,
        totalDays: 0,
        progressMh: 0,
        byDateMh: '',
        noAccidentDays: 0,
        byDefaultDays: '',
        noaccStypeCd: '', 
        noaccStypeNm: '',
        noaccStypeYmd: '',
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
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      baseWidth: 8,
      editable: true,
      searchUrl: '',
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
      isInsert: false, 
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
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
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.saf.noAccidentResult.list.url;      

      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-1y', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(today, '1y', 'YYYY-MM-DD', 'YYYY-MM-DD');

      setTimeout(() => {
        this.searchParam.duration = [from, to];
        this.getDataList();
      }, 200);

      // 교육 결과 목록 grid 헤더 설정
      this.gridOptions.header = [
        { text: '시작일', name: 'startYmd', width: '120px', align: 'center', url: 'true' },
        { text: '달성예정일', name: 'endSchYmd', width: '110px', align: 'center' },
        { text: '인시', child: 
          [
            { text: '초기인시', name: 'initMh', width: '100px', align: 'center' },
            { text: '누적인시', name: 'totalMh', width: '100px', align: 'center' },
            { text: '목표인시', name: 'targetMh', width: '100px', align: 'center' },
            { text: '진행률', name: 'progressMh', width: '120px', align: 'center' },
            { text: '무재해 일', name: 'noAccidentDays', width: '100px', align: 'center' },
            { text: '일별 생성인시', name: 'byDateMh', width: '140px', align: 'center' },
          ]
        },
        { text: '일', child: 
          [
            { text: '초기일', name: 'initDays', width: '100px', align: 'center' },
            { text: '누적일', name: 'totalDays', width: '100px', align: 'center' },
            { text: '목표일', name: 'targetDays', width: '100px', align: 'center' },
            { text: '기본일(일수)', name: 'byDefaultDays', width: '140px', align: 'center' },
          ]
        },
        { text: '무산/시작사유', name: 'remark', width: '140px', align: 'center' },
      ];

      this.setGridSize();
    },
    closePopupUsage (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getDataList();
    },
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

    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** 
    * 수정 팝업 호출
    */
    tableLinkClicked (header, data) {
      this.openDetailPage(data);
    },
    openDetailPage (data) {
      if (data === null || data === undefined)
      {
        this.popupOptions.param = {
          'safNoAccidentNo': 0
        };
      } else {
        this.popupOptions.param = {
          'safNoAccidentNo': data.safNoAccidentNo,
          'noAccUseYn': data.useYn
        };
      }
      this.popupOptions.top = "10px";
      this.popupOptions.width = '90%';
      this.popupOptions.target = () => import(`${'./createNoAccident.vue'}`);
      this.popupOptions.title = '사업장무재해 등록/수정';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopupUsage;
    },
    selectedRow (data) {
      if (data === null) return;
      this.noAccident = data;
    },
    /** /Call API service **/
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 320;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    
    /** validation checking(필요없으면 지워주세요) **/
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
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
    btnSearchClickedCallback (result) {
      var x = 44;
      var z = "0";
      console.log(x.toString().length);
      console.log(
        x.toString().length >= 5
          ? x.toString()
          : new Array(5 - x.toString().length + 1).join(z) + x.toString()
      );
      this.isInsert = false;
      this.gridOptions.data = this.$_.clone(result.data);
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnSaveClickedCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    btnPopupClickedCallback () {
      this.popupOptions.target = () => import(`${'./createNoAccident.vue'}`);
      this.popupOptions.title = '사업장 무재해 등록';
      this.popupOptions.visible = true;
      this.popupOptions.width = '90%';
      this.popupOptions.top = '10px';
      this.popupOptions.param = {
        'safNoAccidentNo': 0
      };
      this.popupOptions.closeCallback = this.closePopupUsage;
    },
    // 신규등록 팝업 닫기
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      // this.getDataList();
    },

    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>