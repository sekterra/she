<!--
  목적 : 검진결과 상세 - 검사항목
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
            <y-label label="검진 항목" icon="user-edit" color-class="cutstom-title-color" />
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
              title="항목추가"
              color="blue"
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
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              v-if="editable"
              :action-url="deleteUrl"
              :param="deleteItemResultRows"
              :is-submit="isDeleteSubmit"
              title="삭제"
              color="red"
              action-type="delete"
              beforeSubmit = "beforeDeleteSubmit"
              @beforeDeleteSubmit="beforeDeleteSubmit"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table 
            ref="dataTable"
            label="검진 항목 결과 목록"
            :rows="3"
            :headers="gridItemResultHeaderOptions"
            :items="gridItemResultData"
            v-model="gridItemResultSelectedRows">
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
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
    popupParam: {
      type: Object,
      default: {
        heaCheckupPlanNo: 0,
        userId: ''
      },
    },
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      testItemResult: {
        heaCheckupPlanNo: 0,
        userId: '',
        heaCheckupOrgTestItemNo: 0,
        heaCheckupOrgNo: 2,
        heaCheckupOrgNm: '',
        heaTestClassCd: '',
        heaTestClassNm: '',
        heaTestItemCd: '',
        heaTestItemNm: '',
        year: '',
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
      gridItemResultSelectedRows: [],
      deleteItemResultRows: [],

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
      this.testItemResult.heaCheckupPlanNo = this.popupParam.heaCheckupPlanNo;
      this.testItemResult.userId = this.popupParam.userId;
      
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
      this.deleteUrl = transactionConfig.testItemResult.multiDelete.url;

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
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },    
    getHeaTestClassCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_TEST_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaTestClassCdItems = _result.data;        
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
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
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getTestItem () {
      this.$http.url = this.$format(selectConfig.testItem.get.url, this.testItemResult.heaTestItemCd)
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.testItemResult.heaResultTypeCd = _result.data.heaResultTypeCd;
        this.testItemResult.heaResultTypeNm = _result.data.heaResultTypeNm;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /** /Call API service **/
    // deleteItemResult (data) {
    //   if (confirm('검진항목을 삭제하시겠습니까?')) {
    //     this.$http.url = this.$format(this.deleteUrl, this.testItemResult.heaCheckupPlanNo, this.testItemResult.userId, data.heaCheckupOrgTestItemNo);
    //     this.$http.type = 'delete';
    //     this.$http.request((_result) => {        
    //       this.getItemResultList();
    //       alert('검진항목을 정상적으로 삭제하였습니다.'); 
    //     }, (_error) => {
    //       alert('삭제 중 오류가 발생하였습니다. 지속적인 문제 발생시 관리자에게 문의하세요.'); 
    //     });
    //   }
    // },
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeDeleteSubmit () {
      if (this.gridItemResultSelectedRows.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '선택된 검진항목 결과를 삭제 하시겠습니까?',
          type: 'info',
          // 확인 callback 함수
          confirmCallback: () => {
            this.deleteItemResultRows = {
              'data': Object.values(this.$_.clone(this.gridItemResultSelectedRows))
            };
            this.isDeleteSubmit = true;
          }
        });
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '선택된 검진항목 결과가 없습니다. 목록 앞단에 선택박스를 확인하세요.',
          type: 'warning',
        });
      }
    },

    beforeCreateSubmit () {
      // 검사항목 데이터가 그리드에 있는지 확인
      var heaTestItemCds = this.$_.map(this.gridItemResultData, 'heaTestItemCd');
      if (this.$_.indexOf(heaTestItemCds, this.testItemResult.heaTestItemCd) > -1)
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 검사항목이 존재합니다.',
          type: 'warning',
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '검진항목 결과를 추가하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isCreateSubmit = true;
            }
          });
        }
        else {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',
          });
        }
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
    btnDeleteClickedCallback (_result) {
      this.isDeleteSubmit = false;
      this.getItemResultList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '검진항목 결과를 정상적으로 삭제하였습니다.',
        type: 'success',
      });
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.getItemResultList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '검진항목 결과를 정상적으로 추가하였습니다.',
        type: 'success',
      });
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
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
