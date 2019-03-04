<!--
  목적 : 안전보호구 > 입출고 내역
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
                type="year"
                label="년도"
                name="giveInYear"
                v-model="searchParam.giveInYear"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
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
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="보호구명"
                name="speNm"
                v-model="searchParam.speNm"
              >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 입출고 내역 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table
            label="입출고 내역"
            ui="bootstrap"
            gridType="edit"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :use-paging="true"
            :print="true"
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
  name: 'give-in-list',
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
        giveInYear: '',
        speKindCd: '',
        speNm: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: '440'
      },
      baseWidth: 8,
      editable: true,
      speKindCds: [], // 보호구 종류
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
      this.searchUrl = selectConfig.saf.speGiveinList.list.url;

      setTimeout(() => {
        this.searchParam.giveInYear = this.$comm.getToday().substring(0, 4);
        this.getDataList();  // 보호구 입출고 grid
      }, 200);

      this.getSpeKindCds(); // 보호구 종류
      this.setGridSize(); // 그리드 사이즈 조절

      // 입출고 내역 grid 헤더 설정
      this.gridOptions.header = [
        { text: '보호구종류', name: 'speKindNm', width: '110px', align: 'center' },
        { text: '보호구명', name: 'speNm', width: '160px', align: 'left' },
      ];

      var monthHeader = [];
      var i = 1;
      for (; i <= 12; i++)
      {
        monthHeader.push(
          { text: i + '월', child: 
            [
              { text: '입', name: 'inNum' + i, width: '80px', align: 'center' },
              { text: '출', name: 'giveNum' + i, width: '80px', align: 'center' },
            ]
          },
        );
        this.gridOptions.header.push(monthHeader[i - 1]);
      }

      this.setGridSize();
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
    // 입출고 내역 grid
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
    /** /Call API service **/
    
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
    btnSearchClickedCallback (_result) {
      this.getDataList();
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
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>