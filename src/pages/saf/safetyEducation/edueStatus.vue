<!--
  목적 : 안전보호구 > 교육 진행 현황
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
                label="교육기간"
                name="period"
                v-model="searchParam.duration"
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
                      label="주관/대상부서"
                      name="deptCd"
                      v-model="searchParam.deptCd"
                    >
                    </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                    <y-select
                      :width="12"
                      :comboItems="comboTgtDeptItems"
                      itemText="deptNm"
                      itemValue="deptCd"
                      ui="bootstrap"
                      name="tgtDeptCd"
                      v-model="searchParam.tgtDeptCd"
                    >
                  </y-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-select
                    :width="6"
                    :comboItems="EduCourseCds"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    name="eduCourseCd"
                    label="교육과정/구분"
                    v-model="searchParam.eduCourseCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                    <y-select
                      :width="12"
                      :comboItems="EduTypeCds"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      name="eduTypeCd"
                      v-model="searchParam.eduTypeCd"
                    >
                    </y-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="교육명"
                name="eduNm"
                v-model="searchParam.eduNm"
              >
              </y-text>
            </b-col>
            
          </b-row>
        </b-card>
      </b-col>
    </b-row>

   <!-- 교육 실시 현황 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="교육 실시 현황"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>

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
        duration: [],
        deptCd: '',
        tgtDeptCd: '',
        eduCourseCd: '',
        eduTypeCd: '',
        eduNm: ''
      },
      edueStatus: {
        safEduRsltNo: '',
        eduCourseCd: '',
        eduTypeCd: '',
        deptCd: '',
        tgtDeptCd: '',
        eduNm: '',
        eduSYmd: '',
        eduEYmd: '',
        eduYmd: '',
        eduTime: '',
        eduPlace: '',
        eduTeacher: '',
        eduContent: '',
        eduResultSummary: '',
        processStepCd: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',

        userId: '',

        eduCourseNm: '',
        eduTypeNm: '',
        deptNm: '',
        processStepNm: '',
        tgtDeptNm: '',

        eduUserNum: ''
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
      editable: true,
      comboDeptItems: [], // 주관부서
      comboTgtDeptItems: [], // 대상부서
      EduCourseCds: [], // 교육과정 종류
      EduTypeCds: [], // 교육구분 종류
      searchUrl: '',
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
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
      this.searchUrl = selectConfig.saf.edueStatus.list.url;      

      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(today, '1m', 'YYYY-MM-DD', 'YYYY-MM-DD');

      setTimeout(() => {
        this.searchParam.duration = [from, to];
        this.getDataList();
      }, 100);
      
      this.getDeptItems();  // 주관부서
      this.getEduCourseCds(); // 교육과정
      this.getEduTypeCds(); // 교육종류 

      // 교육 결과 목록 grid 헤더 설정
      this.gridOptions.header = [
        { text: '교육기간', name: 'eduYmd', width: '180px', align: 'center' },
        { text: '교육과정', name: 'eduCourseNm', width: '140px', align: 'center' },
        { text: '교육구분', name: 'eduTypeNm', width: '100px', align: 'center' },
        { text: '교육명', name: 'eduNm', width: '200px', align: 'center' },
        { text: '주관부서', name: 'deptNm', width: '120px', align: 'center' },
        { text: '대상부서', name: 'tgtDeptNm', width: '120px', align: 'center' },
        { text: '이수인원', name: 'eduUserNum', width: '100px', align: 'center' },
        { text: '교육시간', name: 'eduTime', width: '150px', align: 'center' }
      ];
      
      this.setGridSize();
    },
    // 주관부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
        this.comboTgtDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    
    // 교육과정 종류
    getEduCourseCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_EDU_COURSE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.EduCourseCds = this.$_.clone(_result.data);
        this.EduCourseCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    // 교육구분 종류
    getEduTypeCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_EDU_TYPE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.EduTypeCds = this.$_.clone(_result.data);
        this.EduTypeCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
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
      this.popupOptions.target = () => import(`${'./createEdueResult.vue'}`);
      this.popupOptions.title = '일반업무 등록';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '10px';
      this.popupOptions.param = {
        'safEduRsltNo': 0
      };
      this.popupOptions.closeCallback = this.closePopupUsage;
    },
    // 데이터 조회 그리드
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

    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>