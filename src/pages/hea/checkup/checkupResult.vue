<!--
  TODO: vue.js + Bootstrap 샘플 예제
-->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header">
            <y-label label="검색" />
            <!-- <div class="right" style="cursor:pointer">검색조건 열기/숨기기</div> -->
            <div class="float-right">
              <y-btn
                v-if="editable"
                :action-url="searchUrl"
                :param="searchParam"
                type="search"
                title="검색"
                size="mini"
                color="success"
                icon="el-icon-search"
                action-type="GET"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">              
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="yearItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="year"
                label="건강검진년도"
                v-model="searchParam.year"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaCheckupPlanNoItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="heaCheckupPlanNo"
                label="건강검진계획"
                v-model="searchParam.heaCheckupPlanNo"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                ui="bootstrap"
                name="userNm"
                label="성명"
                v-model="searchParam.userNm"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="retirementYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="retirementYn"
                label="재직/퇴직"
                v-model="searchParam.retirementYn"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="diseaseClassCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="diseaseClassCd"
                label="질환종류"
                v-model="searchParam.diseaseClassCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="diseaseCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="diseaseCd"
                label="질환"
                v-model="searchParam.diseaseCd"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-checkbox
                :width="10"
                :editable="editable"
                :comboItems="heaDiagnoseCdsItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="heaDiagnoseCds"
                label="판정"
                v-model="searchParam.heaDiagnoseCds"
                />              
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-7">
              <y-checkbox
                :width="10"
                :editable="editable"
                :comboItems="heaCheckedOrgNosItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="heaCheckedOrgNos"
                label="검진병원"
                v-model="searchParam.heaCheckedOrgNos"
                />              
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row class="mt-3">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            label="건강검진 목록"
            ref="dataTable"
            :rows="7"
            :headers="gridHeaderOptions"
            :items="gridData"
            :excel-down="true"
            :print="true" 
            @selectedDatatableItems="selectedDatatableItems"
            />
          </b-col>
      </b-col>      
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'checkup-result',
  components: {
  },
  /** props, data, computed, watch **/
  props: {
  },
  data () {
    return {
      searchParam: {
        year: '',
        heaCheckupPlanNo: 0,
        retirementYn: '',
        heaDiagnoseCds: [],
        diseaseClassCd: '',
        diseaseCd: '',
        heaCheckedOrgNos: [],
        userNm: ''
      },
      editable: true,
      gridData: [],
      gridHeaderOptions: [],
      yearItems: [],
      heaCheckupPlanNoItems: [],
      heaDiagnoseCdsItems: [],
      retirementYnItems: [],
      diseaseClassCdItems: [],
      diseaseCdItems: [],
      heaCheckedOrgNosItems: [],
      searchUrl: ''
    };
  },
  computed: {
  },
  watch: {
    'searchParam.year': function (newValue, oldValue) {
      this.getHeaCheckupPlanNoItems();
    },
    'searchParam.diseaseClassCd': function (newValue, oldValue) {
      this.getDiseaseCdItems();
    }
  },
  /** created, beforeMount, mounted, beforeDestroy, destroyed **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();    
  },
  mounted () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
      // 선택항목 설정
      setTimeout(() => {
        var nowDate = new Date();
        var from = nowDate.getFullYear() - 9;
        for (; from <= nowDate.getFullYear() + 1; from++) {
          this.yearItems.push({ 'code': from, 'codeNm': from + '년' });
        }
        this.searchParam.year = nowDate.getFullYear().toString();

        this.retirementYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.retirementYnItems.push({ 'code': 'Y', 'codeNm': '재직' });
        this.retirementYnItems.push({ 'code': 'N', 'codeNm': '퇴직' });

        this.getHeaCheckupPlanNoItems();
        this.getHeaDiagnoseCdsItems();
        this.getDiseaseClassCdItems();
        this.getDiseaseCdItems();
        this.getHeaCheckedOrgNosItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '선택', name: 'check', width: '80px', type: 'check' },
        { text: '통보여부', name: 'notifyResultYn', width: '120px' },
        { text: '판정', name: 'heaDiagnoseNm', width: '120px', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '200px' },
        { text: '질환', name: 'heaDiseaseNm', width: '200px' },
        { text: '부서', name: 'deptNm', width: '160px' },
        { text: '성명', name: 'userNm', width: '160px', align: 'center' },
        { text: '성별', name: 'comSexTypeNm', width: '80px', align: 'center' },
        { text: '검진종류', name: 'heaCheckupClassNm', width: '200px', align: 'center' },
        { text: '검진일', name: 'heaCheckedYmd', width: '160px', align: 'center' },
        { text: '유소견자', name: 'suspectYn', width: '120px', align: 'center' }
      ];

      this.searchUrl = selectConfig.checkupResult.list.url;

      this.getList();
    },
    /** /초기화 관련 함수 **/

    /** Call API service **/
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    }, 
    getHeaCheckupPlanNoItems () {
      // 검진계획 선택항목 조회
      this.heaCheckupPlanNoItems.push({ 'code': '0', 'codeNm': '전체' });
    },
    getHeaDiagnoseCdsItems () {
      // 판정 항목 조회
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DIAGNOSE');
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.heaDiagnoseCdsItems = _result.data;
      }, (_error) => {
      });
    },
    getDiseaseClassCdItems () {
      // 질환종류 선택항목 조회
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DISEASE_CLASS');
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.diseaseClassCdItems.push({ 'code': '', 'codeNm': '전체' });        
        _result.data.forEach(element => {
          this.diseaseClassCdItems.push(element);
        });
      }, (_error) => {
      });
    },
    getDiseaseCdItems () {
      // 질환 선택항목 조회
      // 질환조회 api 개발 후 적용
      this.diseaseCdItems.push({ 'code': '', 'codeNm': '전체' });
    },
    getHeaCheckedOrgNosItems () {
      // 검진병원 항목 조회
      // 대상 검진기관 조회 api 개발 후 적용
      this.heaCheckedOrgNosItems.push({ 'code': '1', 'codeNm': '서울대병원' });
      this.heaCheckedOrgNosItems.push({ 'code': '2', 'codeNm': '세브란스' });
      this.heaCheckedOrgNosItems.push({ 'code': '3', 'codeNm': '새서울내과' });
      this.heaCheckedOrgNosItems.push({ 'code': '4', 'codeNm': '중앙의료재단' });
      this.heaCheckedOrgNosItems.push({ 'code': '5', 'codeNm': '경희대병원' });
      this.heaCheckedOrgNosItems.push({ 'code': '6', 'codeNm': '한강병원' });
    },
    /** /Call API service **/
    
    /** Events, Callbacks (버튼 제외) **/
    /**
     * eventBus로 선택된 정보를 부모로 넘긴다.
     */
    selectedDatatableItems (_item) {
      this.$emit('sendDataToPopup', _item)
    },
    /** /Events, Callbacks (버튼 제외) **/

    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },    
    /** end button 관련 이벤트 **/

    /** 기타 로직 **/
    /** /기타 로직 **/
  },
};
</script>

<style>

</style>
