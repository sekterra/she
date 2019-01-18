<!--
  목적 : 건강검진결과 검색
  작성자 : khk
  Detail : 
  *
  examples:
  *
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
                :comboItems="checkupYearItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="checkupYear"
                label="건강검진년도"
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
                label="건강검진계획"
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-7">
                <y-multi-select
                :width="10"
                :editable="editable"
                :comboItems="heaCheckedOrgNosItems"                                
                itemText="heaCheckupOrgNm"
                itemValue="heaCheckupOrgNo"
                ui="bootstrap"
                type="search"
                label="검진병원"
                name="heaCheckedOrgNos"
                v-model="heaCheckedOrgNos"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row class="mt-3">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              :is-submit="false"
              type="clear"
              title="검진결과/판정 Upload"
              size="mini"
              color="primary"
              @btnClicked="btnDiagnoseResultUploadClicked" 
            />
          </div>
          <y-data-table 
            label="건강검진 목록"
            ref="dataTable"
            :rows="7"
            :headers="gridHeaderOptions"
            :items="gridData"
            :excel-down="true"
            :print="true" 
            @selectedRow="selectedRow"
            @tableLinkClicked="tableLinkClicked"
            >
            <el-table-column
              slot="selection"
              align="center"
              width="80" 
              >
              <template slot-scope="tableData">
                <y-btn
                  v-if="editable"
                  type="search"
                  title="상세"
                  size="mini"
                  color="info"
                  @btnClicked="getDetail(tableData.row)" 
                />
              </template>
            </el-table-column>
          </y-data-table>
          </b-col>
      </b-col>      
    </b-row>
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="false"
      :width="popupOptions.width"
      :top="popupOptions.top">
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closePopup" />
    </el-dialog>
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
        param: {}
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
      editable: true,
      gridData: [],
      gridHeaderOptions: [],
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

    // 팝업 반환정보 수신
    window.getApp.$on('POPUP_CLOSE_CALLBACK', this.popupCloseCallback);
  },
  mounted () {
  },
  beforeDestroy () {
    // 팝업 반환정보 수신
    window.getApp.$on('POPUP_CLOSE_CALLBACK', this.popupCloseCallback);
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
      this.gridHeaderOptions = [
        { text: '통보여부', name: 'notifyResultYn', width: '120px' },
        { text: '판정', name: 'heaDiagnoseNm', width: '120px', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '200px' },
        { text: '질환', name: 'heaDiseaseNm', width: '200px' },
        { text: '부서', name: 'deptNm', width: '160px' },
        { text: '성명', name: 'userNm', width: '160px', align: 'center', type: 'link' },
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
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
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
      });
    },
    getHeaDiagnoseCdsItems () {
      // 판정 항목 조회
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DIAGNOSE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.heaDiagnoseCdsItems = _result.data;
      }, (_error) => {
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
      });
    },
    selectedRow (data) {
      alert(data.userId);
    },
    tableLinkClicked (header, row) {
      alert(12312);
    },
    getDetail (data) {
      this.popupOptions.param = {
        'heaCheckupPlanNo': data.heaCheckupPlanNo,
        'userId': data.userId
      };
      this.popupOptions.target = () => import(`${'./checkupResultDetail.vue'}`);
      this.popupOptions.title = '건강검진결과 상세';
      this.popupOptions.visible = true;
    },
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    /** /Call API service **/

    /** /Events, Callbacks (버튼 제외) **/

    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },    
    btnDiagnoseResultUploadClicked (_result) {
      this.popupOptions.target = () => import(`${'./diagnoseResultUpload.vue'}`);
      this.popupOptions.title = '검진결과/판정 Upload';
      this.popupOptions.visible = true;
      this.popupOptions.width = '80%';
      this.popupOptions.top = '50px';
    },
    /** end button 관련 이벤트 **/

    /** 기타 로직 **/
    /** /기타 로직 **/
  },
};
</script>

<style>

</style>
