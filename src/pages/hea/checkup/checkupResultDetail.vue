<!--
  목적 : 작업공정관리
  작성자 : khk
  Detail : 작업공정 조회 및 등록/수정
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="건강검진 정보" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="현재 부서"></y-label></b-col>
              <b-col sm="8">{{checkupResult.deptNm}}</b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="성명"></y-label></b-col>
              <b-col sm="8">{{checkupResult.userNm}}</b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="사번"></y-label></b-col>
              <b-col sm="8">{{checkupResult.userId}}</b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진당시 부서"></y-label></b-col>
              <b-col sm="8">{{checkupResult.deptNmOrg}}</b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진일"></y-label></b-col>
              <b-col sm="8">{{checkupResult.heaCheckedYmd}}</b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진기관"></y-label></b-col>
              <b-col sm="8">{{checkupResult.heaCheckupOrgNm}}</b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진계획(검진종류)"></y-label></b-col>
              <b-col sm="8">{{checkupResult.heaCheckupPlanNm}}{{checkupResult.heaCheckupClassNm}}</b-col>
              </b-row>
            </b-col>        
          </b-row>          
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">   
        <b-row>
          <b-col sm="12">
            <y-label label="종합소견" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaWorkableCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaWorkableCd"
                label="업무수행적합"
                v-model="checkupResult.heaWorkableCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaFollowUpCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaFollowUpCd"
                label="사후관리"
                v-model="checkupResult.heaFollowUpCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                ui="bootstrap"
                name="heaFollowUpRemark"
                label="종합소견"
                v-model="checkupResult.heaFollowUpRemark"
                />
            </b-col>
          </b-row> 
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              :action-url="resultUpdateUrl"
              :param="checkupResult"
              :is-submit="isResultUpdateSubmit"
              type="save"
              title="저장"
              size="small"
              color="warning"
              icon="el-icon-edit-outline"
              action-type="POST"
              beforeSubmit = "beforeUpdateResultSubmit"
              @beforeCreateSubmit="beforeUpdateResultSubmit"
              @btnClicked="btnUpdateResultClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>  
        </b-card>
      </b-col>
    </b-row>

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
                v-validate="'required'"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaDiseaseCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaDiseaseCd"
                label="질환"
                v-model="checkupResultDiag.heaDiseaseCd"
                v-validate="'required'"
                />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              :action-url="resultDiagCreateUrl"
              :param="checkupResultDiag"
              :is-submit="isResultDiagCreateSubmit"
              type="save"
              title="판정추가"
              size="small"
              color="primary"
              icon="el-icon-edit"
              action-type="POST"
              beforeSubmit = "beforeCreateResultDiagSubmit"
              @beforeCreateSubmit="beforeCreateResultDiagSubmit"
              @btnClicked="btnCreateResultDiagClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              type="search"
              title="과거판정데이터"
              size="small"
              color="primary"
              icon="el-icon-edit"
              @btnClicked="btnResultDiagHistoryClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="9" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="판정목록"
            :rows="3"
            :headers="gridResultDiagHeaderOptions"
            :items="gridResultDiagData" />
          </b-col>
      </b-col>      
    </b-row>

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
                v-validate="'required'"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaTestItemCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaTestItemCd"
                label="항목"
                v-model="testItemResult.heaTestItemCd"
                v-validate="'required'"
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
                />
            </b-col>
          </b-row> 
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              :action-url="itemResultCreateUrl"
              :param="testItemResult"
              :is-submit="isItemResultCreateSubmit"
              type="save"
              title="항목추가"
              size="small"
              color="primary"
              icon="el-icon-edit"
              action-type="POST"
              beforeSubmit = "beforeCreateItemResultSubmit"
              @beforeCreateSubmit="beforeCreateItemResultSubmit"
              @btnClicked="btnCreateItemResultClickedCallback" 
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
            :items="gridItemResultData" />
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
      checkupResult: {
        heaCheckupPlanNo: 0,
        heaCheckupPlanNm: '',
        heaCheckupClassCd: '',
        heaCheckupClassNm: '',
        heaCheckupOrgNo: 0,
        heaCheckupOrgNm: '',
        userId: '',
        userNm: '',
        deptCd: '',
        deptNm: '',
        deptCdOrg: '',
        deptNmOrg: '',
        heaCheckedYmd: '',
        heaCheckupOrgEtc: '',
        heaWorkableCd: '',
        heaWorkableNm: '',
        heaFollowUpCd: '',
        heaFollowUpNm: '',
        heaFollowUpRemark: ''
      },
      checkupResultDiag: {
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
      testItemResult: {
        heaCheckupOrgTestItemNo: 0,
        heaTestClassCd: '',
        heaTestClassNm: '',
        heaTestItemCd: '',
        heaTestItemNm: '',
        heaResultTypeCd: '',
        heaResultTypeNm: '',
        numResult: '',
        charResult: '',
        unit: '',
        prev1YearResult: '',
        prev2YearResult: ''
      },
      baseWidth: 9,
      editable: true,
      isResultUpdateSubmit: false,
      isResultDiagCreateSubmit: false,
      isResultDiagDeleteSubmit: false,
      isItemResultCreateSubmit: false,
      isItemResultDeleteSubmit: false,

      gridResultDiagData: [],
      gridResultDiagHeaderOptions: [],
      gridItemResultData: [],
      gridItemResultHeaderOptions: [],

      heaWorkableCdItems: [],
      heaFollowUpCdItems: [],
      heaDiagnoseCdItems: [],
      heaDiseaseClassCdItems: [],
      heaDiseaseCdItems: [],
      heaHazardCdItems: [],
      heaTestClassCdItems: [],
      heaTestItemCdItems: [],

      resultDetailUrl: '',
      resultUpdateUrl: '',
      resultDiagCreateUrl: '',
      resultDiagDeleteUrl: '',
      itemResultCreateUrl: '',
      itemResultDeleteUrl: '',
      searchResultUrl: '',
      searchResultDiagUrl: '',
      searchItemResultUrl: ''
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
        this.getHeaWorkableCdItems();
        this.getHeaFollowUpCdItems();
        this.getHeaDiagnoseCdItems();
        this.getHeaDiseaseClassCdItems();
        this.getHeaDiseaseCdItems();
        this.getHeaHazardCdItems();
        this.getHeaTestClassCdItems();
        this.getHeaTestItemCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridResultDiagHeaderOptions = [
        { text: '판정', name: 'heaDiagnoseNm', width: '20%', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '40%' },
        { text: '질환', name: 'heaDiseaseNm', width: '20%' },
        { text: '유해인자', name: 'heaHazardNm', width: '20%' }
      ];

      this.gridItemResultHeaderOptions = [
        { text: '항목종류', name: 'heaTestClassNm', width: '20%', align: 'center' },
        { text: '항목', name: 'heaTestItemNm', width: '20%' },
        { text: '전전년도 결과', name: 'prev1YearResult', width: '10%' },
        { text: '전년도 결과', name: 'prev2YearResult', width: '10%' },
        { text: '결과', name: 'charResult', width: '10%' },
        { text: '단위', name: 'unit', width: '10%' }
      ];
      
      this.resultDetailUrl = selectConfig.checkupResult.get.url;
      this.searchResultUrl = '';
      this.searchResultDiagUrl = '';
      this.searchItemResultUrl = '';      

      this.getResultDetail();
      this.getResultDiagList();
      this.getItemResultList();
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getResultDiagList () {
      // this.$http.url =  this.$format(this.searchResultDiagUrl, checkupResult.heaCheckupPlanNo, checkupResult.userId);
      // this.$http.type = 'GET';      
      // this.$http.request((_result) => {
      //   this.gridResultDiagData = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
    },    
    getItemResultList () {
      // this.$http.url = this.searchItemResultUrl;
      // this.$http.type = 'GET';      
      // this.$http.request((_result) => {
      //   this.gridItemResultData = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
    },    
    getResultDetail () {
      // this.$http.url = this.resultDetailUrl;
      // this.$http.type = 'GET'; 
      // this.$http.request((_result) => {
      //   this.updateMode = true;
      //   this.checkupResult = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
    },
    getHeaWorkableCdItems () {
      // HEA_WORKABLE
      this.heaWorkableCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    getHeaFollowUpCdItems () {
      this.heaFollowUpCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    getHeaDiagnoseCdItems () {
      this.heaDiagnoseCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    getHeaDiseaseClassCdItems () {
      this.heaDiseaseClassCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    getHeaDiseaseCdItems () {
      this.heaDiseaseCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    getHeaHazardCdItems () {
      this.heaHazardCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    getHeaTestClassCdItems () {
      this.heaTestClassCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    getHeaTestItemCdItems () {
      this.heaTestItemCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    
    /** /Call API service **/
    deleteResultDiag () {
      window.alert('판정데이터 삭제');
    },
    deleteItemResult () {
      window.alert('검사항목 데이터 삭제');
    },
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeUpdateResultSubmit () {
      this.isResultUpdateSubmit = true;
    },
    beforeCreateResultDiagSubmit () {
      this.isResultDiagCreateSubmit = true;
    },
    beforeCreateItemResultSubmit () {
      this.isItemResultCreateSubmit = true;
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
    btnUpdateResultClickedCallback (_result) {
      this.isUpdateSubmit = false;
    },
    btnCreateResultDiagClickedCallback (_result) {
      this.isResultDiagCreateSubmit = false;
      this.getResultDiagList();
    },
    btnResultDiagHistoryClickedCallback (_result) {
      window.alert('과거판정데이터 화면 개발 중');
    },
    btnCreateItemResultClickedCallback (_result) {
      this.isItemResultCreateSubmit = false;
      this.getItemResultList();
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isResultUpdateSubmit = false;
      this.isResultDiagCreateSubmit = false;
      this.isResultDiagDeleteSubmit = false;
      this.isItemResultCreateSubmit = false;
      this.isItemResultDeleteSubmit = false;
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>