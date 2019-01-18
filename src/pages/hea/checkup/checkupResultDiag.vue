<!--
  목적 : 건강검진결과 상세 - 판정
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
            <y-label label="판정" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaDiagnoseCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaDiagnoseCd"
                label="판정"
                v-model="checkupResultDiag.heaDiagnoseCd"
                v-validate="'required'"
                :state="validateState('heaDiagnoseCd')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaHazardCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaHazardCd"
                label="유해인자"
                v-model="checkupResultDiag.heaHazardCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaDiseaseClassCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaDiseaseClassCd"
                label="질환종류"
                v-model="checkupResultDiag.heaDiseaseClassCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaDiseaseCdItems"
                itemText="heaDiseaseNm"
                itemValue="heaDiseaseCd"
                ui="bootstrap"
                type="save"
                name="heaDiseaseCd"
                label="질환"
                v-model="checkupResultDiag.heaDiseaseCd"
                v-validate="'required'"
                :state="validateState('heaDiseaseCd')"
                />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              :action-url="insertUrl"
              :param="checkupResultDiag"
              :is-submit="isCreateSubmit"
              type="save"
              title="판정추가"
              size="small"
              color="primary"
              action-type="post"
              beforeSubmit = "beforeCreateSubmit"
              @beforeCreateSubmit="beforeCreateSubmit"
              @btnClicked="btnCreateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              type="search"
              title="과거판정데이터"
              size="small"
              color="primary"
              @btnClicked="btnHistoryClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="11" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="판정목록"
            :rows="3"
            :headers="gridResultDiagHeaderOptions"
            :items="gridResultDiagData" >
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
                  @btnClicked="deleteResultDiag(tableData.row)" 
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
  name: 'checkup-result-diag',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      checkupResultDiag: {
        heaCheckupPlanNo: 1,
        userId: 'dev',
        heaDiagnoseCd: '',
        heaDiagnoseNm: '',
        heaDiseaseClassCd: '',
        heaDiseaseClassNm: '',
        heaDiseaseCd: '',
        heaDiseaseNm: '',
        heaHazardCd: '',
        heaHazardNmKo: '',
        heaHazardNmEn: ''
      },
      editable: true,
      isCreateSubmit: false,
      isDeleteSubmit: false,

      gridResultDiagData: [],
      gridResultDiagHeaderOptions: [],

      heaDiagnoseCdItems: [],
      heaDiseaseClassCdItems: [],
      heaDiseaseCdItems: [],
      heaHazardCdItems: [],

      insertUrl: '',
      deleteUrl: '',
      searchUrl: ''
    };
  },
  computed: {
  },
  watch: {
    'checkupResultDiag.heaDiseaseClassCd': function (newValue, oldValue) {
      this.getHeaDiseaseCdItems();
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
        this.getHeaDiagnoseCdItems();
        this.getHeaDiseaseClassCdItems();
        this.getHeaDiseaseCdItems();
        this.getHeaHazardCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridResultDiagHeaderOptions = [
        { text: '판정', name: 'heaDiagnoseNm', width: '15%', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '45%' },
        { text: '질환', name: 'heaDiseaseNm', width: '20%' },
        { text: '유해인자', name: 'heaHazardNm', width: '20%' }
      ];

      this.searchUrl = selectConfig.checkupResultDiag.list.url;      
      this.insertUrl = transactionConfig.checkupResultDiag.insert.url;
      this.deleteUrl = transactionConfig.checkupResultDiag.delete.url;
      
      this.getResultDiagList();
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getResultDiagList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.checkupResultDiag;
      this.$http.request((_result) => {
        this.gridResultDiagData = _result.data;
      }, (_error) => {
      });
    },
    getHeaDiagnoseCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DIAGNOSE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaDiagnoseCdItems = _result.data;
      }, (_error) => {
      });
    },
    getHeaDiseaseClassCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DISEASE_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaDiseaseClassCdItems = _result.data;
      }, (_error) => {
      });
    },
    getHeaDiseaseCdItems () {
      this.$http.url = selectConfig.disease.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'heaDiseaseClassCd': this.checkupResultDiag.heaDiseaseClassCd
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaDiseaseCd': '', 'heaDiseaseNm': '선택하세요' });
        this.heaDiseaseCdItems = _result.data;
        this.checkupResultDiag.heaDiseaseCd = '';
      }, (_error) => {
      });
    },
    getHeaHazardCdItems () {
      this.heaHazardCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    
    /** /Call API service **/
    deleteResultDiag (data) {
      this.$http.url = this.$format(this.deleteUrl, this.checkupResultDiag.heaCheckupPlanNo, this.checkupResultDiag.userId, data.heaDiseaseCd);
      this.$http.type = 'delete';
      this.$http.request((_result) => {        
        this.getResultDiagList();
      }, (_error) => {
      });
    },
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeCreateSubmit () {
      this.$validator.validateAll().then((_result) => {
        this.isCreateSubmit = _result;
      }).catch(() => { window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.'); });
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
      this.getResultDiagList();
    },
    btnHistoryClickedCallback (_result) {
      window.alert('과거판정데이터 화면 개발 중');
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      this.isDeleteSubmit = false;
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