<!--
  목적 : 건강검진결과 상세 - 검사항목
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <b-row class="mt-3">
      <b-col sm="12">   
        <b-row>
          <b-col sm="12">
            <y-label label="건강검진 항목" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaTestClassCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaTestClassCd"
                label="항목종류"
                v-model="testItemResult.heaTestClassCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaTestItemCdItems"
                itemText="heaTestItemNm"
                itemValue="heaTestItemCd"
                ui="bootstrap"
                type="save"
                name="heaTestItemCd"
                label="항목"
                v-model="testItemResult.heaTestItemCd"
                v-validate="'required'"
                :state="validateState('heaTestItemCd')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                ui="bootstrap"
                name="charResult"
                label="결과값"
                v-model="testItemResult.charResult"
                v-validate="'required'"
                :state="validateState('charResult')"
                />
            </b-col>
          </b-row> 
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              :action-url="insertUrl"
              :param="testItemResult"
              :is-submit="isCreateSubmit"
              type="save"
              title="항목추가"
              size="small"
              color="primary"
              action-type="post"
              beforeSubmit = "beforeCreateSubmit"
              @beforeCreateSubmit="beforeCreateSubmit"
              @btnClicked="btnCreateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="건강검진 항목 결과 목록"
            :rows="3"
            :headers="gridItemResultHeaderOptions"
            :items="gridItemResultData">
            <el-table-column
              slot="selection"
              align="center"
              width="80" 
              >
              <template slot-scope="tableData">
                <y-btn
                  v-if="editable"
                  type="search"
                  title="삭제"
                  size="mini"
                  color="info"
                  @btnClicked="deleteItemResult(tableData.row)" 
                />
              </template>
            </el-table-column>
          </y-data-table>
          </b-col>
      </b-col>      
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'checkup-result-detail',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      testItemResult: {
        heaCheckupPlanNo: 1,
        userId: 'dev',
        heaCheckupOrgTestItemNo: 0,
        heaCheckupOrgNo: 2,
        heaCheckupOrgNm: '',
        heaTestClassCd: '',
        heaTestClassNm: '',
        heaTestItemCd: '',
        heaTestItemNm: '',
        year: '2018',
        heaCheckupTypeCd: 'A',
        heaCheckupTypeNm: '',
        unit: '',
        heaResultTypeCd: '',
        heaResultTypeNm: '',
        numResult: '',
        charResult: '',        
        prev1YearResult: '',
        prev2YearResult: ''
      },
      editable: true,
      isCreateSubmit: false,
      isDeleteSubmit: false,

      gridItemResultData: [],
      gridItemResultHeaderOptions: [],

      heaTestClassCdItems: [],
      heaTestItemCdItems: [],

      insertUrl: '',
      deleteUrl: '',
      searchUrl: '',

      compResultDiag: null,
      compItemResult: null,
    };
  },
  computed: {
  },
  watch: {
    'testItemResult.heaTestClassCd': function (newValue, oldValue) {
      this.getHeaTestItemCdItems();
    },
    'testItemResult.heaTestItemCd': function (newValue, oldValue) {
      this.getTestItem();
    }
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
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
      // 선택항목 설정
      setTimeout(() => {
        this.getHeaTestClassCdItems();
        this.getHeaTestItemCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridItemResultHeaderOptions = [
        { text: '항목종류', name: 'heaTestClassNm', width: '20%', align: 'center' },
        { text: '항목', name: 'heaTestItemNm', width: '20%' },
        { text: '전전년도 결과', name: 'prev1YearResult', width: '10%' },
        { text: '전년도 결과', name: 'prev2YearResult', width: '10%' },
        { text: '결과', name: 'charResult', width: '10%' },
        { text: '단위', name: 'unit', width: '10%' }
      ];
      
      this.searchUrl = selectConfig.testItemResult.list.url;
      this.insertUrl = transactionConfig.testItemResult.insert.url;
      this.deleteUrl = transactionConfig.testItemResult.delete.url;

      this.getItemResultList();
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getItemResultList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.testItemResult;
      this.$http.request((_result) => {
        this.gridItemResultData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },    
    getHeaTestClassCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_TEST_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaTestClassCdItems = _result.data;        
      }, (_error) => {
      });
    },
    getHeaTestItemCdItems () {
      this.$http.url = selectConfig.checkupOrgTestItem.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'heaTestClassCd': this.testItemResult.heaTestClassCd,
        'heaCheckupOrgNo': this.testItemResult.heaCheckupOrgNo,
        'year': this.testItemResult.year,
        'heaCheckupTypeCd': this.testItemResult.heaCheckupTypeCd
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaTestItemCd': '', 'heaTestItemNm': '선택하세요' });
        this.heaTestItemCdItems = _result.data;
        this.testItemResult.heaTestItemCd = '';
      }, (_error) => {
      });
    },
    getTestItem () {
      this.$http.url = this.$format(selectConfig.testItem.get.url, this.testItemResult.heaTestItemCd)
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.testItemResult.heaResultTypeCd = _result.data.heaResultTypeCd;
        this.testItemResult.heaResultTypeNm = _result.data.heaResultTypeNm;
      }, (_error) => {
      });
    },

    /** /Call API service **/
    deleteItemResult (data) {
      this.$http.url = this.$format(this.deleteUrl, this.testItemResult.heaCheckupPlanNo, this.testItemResult.userId, data.heaCheckupOrgTestItemNo);
      this.$http.type = 'delete';
      this.$http.request((_result) => {        
        this.getItemResultList();
      }, (_error) => {
      });
    },
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeCreateSubmit () {
      this.$validator.validateAll().then((_result) => {
        this.isCreateSubmit = _result;
      }).catch(() => { 
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.'); 
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
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.getItemResultList();
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>

<style>
.container-fluid {
  /* 내부로 들어가므로 padding 제거 */
  padding-right: 0px;
  padding-left: 0px;
}
</style>
