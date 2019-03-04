<!--
  목적 : 검진결과 검색
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header">
            <y-label label="검색" />            
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                v-if="editable"
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">              
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="checkupYearItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="checkupYear"
                label="검진년도"
                v-model="searchParam.checkupYear"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaCheckupPlanNoItems"
                itemText="heaCheckupPlanNm"
                itemValue="heaCheckupPlanNo"
                ui="bootstrap"
                type="search"
                name="heaCheckupPlanNo"
                label="검진계획"
                v-model="searchParam.heaCheckupPlanNo"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :clearable="true"
                ui="bootstrap"
                name="userNm"
                label="성명"
                v-model="searchParam.userNm"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
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
                :comboItems="heaDiseaseClassCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="heaDiseaseClassCd"
                label="질환종류"
                v-model="searchParam.heaDiseaseClassCd"
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
                type="search"
                name="heaDiseaseCd"
                label="질환"
                v-model="searchParam.heaDiseaseCd"
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                <y-multi-select
                :width="10"
                :editable="editable"
                :comboItems="heaCheckedOrgNosItems"                                
                itemText="heaCheckupOrgNm"
                itemValue="heaCheckupOrgNo"
                ui="bootstrap"
                label="검진병원"
                name="heaCheckedOrgNos"
                v-model="heaCheckedOrgNos"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row class="mt-3 h-100">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              title="검진결과/판정 Upload"
              color="blue"
              @btnClicked="btnDiagnoseResultUploadClicked" 
            />
          </div>
          <y-data-table 
            label="검진 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @tableLinkClicked="tableLinkClicked"
            />
          </b-col>
      </b-col>      
    </b-row>
    
    <y-popup :param="popupOptions"></y-popup>
    
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
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        checkupYear: '',
        heaCheckupPlanNo: 0,
        retirementYn: '',
        heaDiagnoseCds: [],
        heaDiseaseClassCd: '',
        heaDiseaseCd: '',
        heaCheckedOrgNos: [],
        userNm: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      editable: true,
      checkupYearItems: [],
      heaCheckupPlanNoItems: [],
      heaDiagnoseCdsItems: [],
      retirementYnItems: [],
      heaDiseaseClassCdItems: [],
      heaDiseaseCdItems: [],
      heaCheckedOrgNosItems: [],
      heaCheckedOrgNos: [],

      searchUrl: ''
    };
  },
  computed: {
  },
  watch: {
    'searchParam.checkupYear': function (newValue, oldValue) {
      this.getHeaCheckupPlanNoItems();
    },
    'searchParam.heaDiseaseClassCd': function (newValue, oldValue) {
      this.getHeaDiseaseCdItems();
    },
    heaCheckedOrgNos () {
      this.searchParam.heaCheckedOrgNos = this.$_.map(this.heaCheckedOrgNos, 'code');
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
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
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
          this.checkupYearItems.push({ 'code': from, 'codeNm': from + '년' });
        }
        this.searchParam.checkupYear = nowDate.getFullYear().toString();

        this.retirementYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.retirementYnItems.push({ 'code': 'Y', 'codeNm': '재직' });
        this.retirementYnItems.push({ 'code': 'N', 'codeNm': '퇴직' });

        this.getHeaCheckupPlanNoItems();
        this.getHeaDiagnoseCdsItems();
        this.getHeaDiseaseClassCdItems();
        this.getHeaDiseaseCdItems();
        this.getHeaCheckedOrgNosItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '통보여부', name: 'notifyResultYn', width: '120px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '160px' },
        { text: '성명', name: 'userNm', width: '160px', align: 'center', type: 'link' },
        { text: '성별', name: 'comSexTypeNm', width: '80px', align: 'center' },
        { text: '판정', name: 'heaDiagnoseNm', width: '120px', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '200px' },
        { text: '질환', name: 'heaDiseaseNm', width: '200px' },        
        { text: '검진종류', name: 'heaCheckupClassNm', width: '200px', align: 'center' },
        { text: '검진일', name: 'heaCheckedYmd', width: '160px', align: 'center' },
        { text: '유소견자', name: 'suspectYn', width: '120px', align: 'center' }
      ];

      this.searchUrl = selectConfig.checkupResult.list.url;

      this.getList();
      this.setGridSize();
    },
    /** /초기화 관련 함수 **/

    /** Call API service **/
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    }, 
    getHeaCheckupPlanNoItems () {
      // 검진계획 선택항목 조회
      this.$http.url = selectConfig.checkupPlan.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'checkupYear': this.searchParam.checkupYear
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaCheckupPlanNo': '0', 'heaCheckupPlanNm': '전체' });
        this.heaCheckupPlanNoItems = _result.data;
        this.searchParam.heaCheckupPlanNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getHeaDiagnoseCdsItems () {
      // 판정 항목 조회
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DIAGNOSE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.heaDiagnoseCdsItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getHeaDiseaseClassCdItems () {
      // 질환종류 선택항목 조회
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DISEASE_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '0', 'codeNm': '전체' });
        this.heaDiseaseClassCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getHeaDiseaseCdItems () {
      // 질환 선택항목 조회
      this.$http.url = selectConfig.disease.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'heaDiseaseClassCd': this.searchParam.heaDiseaseClassCd
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaDiseaseCd': '', 'heaDiseaseNm': '전체' });
        this.heaDiseaseCdItems = _result.data;
        this.searchParam.heaDiseaseCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getHeaCheckedOrgNosItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        this.heaCheckedOrgNosItems = _result.data;
        this.searchParam.heaCheckedOrgNos = [];
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    tableLinkClicked (header, row) {
      if (header.name === 'userNm') {
        this.getDetail(row);
      }
    },
    getDetail (data) {
      this.popupOptions.param = {
        'heaCheckupPlanNo': data.heaCheckupPlanNo,
        'userId': data.userId
      };
      this.popupOptions.target = () => import(`${'./checkupResultDetail.vue'}`);
      this.popupOptions.title = '검진결과 상세';
      this.popupOptions.visible = true;
      this.popupOptions.width = '80%';
      this.popupOptions.top = '20px';
      this.popupOptions.closeCallback = this.closePopup;
    },
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.searchParam.userNm = data.user.userNm;
      }
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 245;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** /Call API service **/

    /** /Events, Callbacks (버튼 제외) **/

    /** button 관련 이벤트 **/
    btnSearchClicked () {
      this.getList();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 2);
      this.getHeaCheckedOrgNosItems();
      this.setGridSize();
    },
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },    
    btnDiagnoseResultUploadClicked (_result) {
      this.popupOptions.target = () => import(`${'./diagnoseResultUpload.vue'}`);
      this.popupOptions.title = '검진결과/판정 Upload';
      this.popupOptions.visible = true;
      this.popupOptions.width = '80%';
      this.popupOptions.top = '50px';
      this.popupOptions.closeCallback = this.closePopup;
    }
    /** end button 관련 이벤트 **/

    /** 기타 로직 **/
    /** /기타 로직 **/
  },
};
</script>

<style>

</style>
