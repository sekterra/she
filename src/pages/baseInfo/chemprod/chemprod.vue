<!--
  목적 : 취급물질 관리
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
                @btnClicked="btnSearchPlanClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show" ref="searchBox">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="취급물질명(KOR)"
                name="chemProdNmKr"
                v-model="searchParam.chemProdNmKr"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="취급물질명(ENG)"
                name="chemProdNmEn"
                v-model="searchParam.chemProdNmEn"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-select
                :width="baseWidth"
                :comboItems="comboPropertiesSearch"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="성상"
                name="properties"
                v-model="searchParam.properties"
              ></y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-number
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="비산성(고체)"
                name="fugacity"
                v-model="searchParam.fugacity"
              >
              </y-number>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3"> 
              <y-number
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="끓는점(액체,기체)"
                name="boilpoint"
                v-model="searchParam.boilpoint"
              >
              </y-number>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row class="mt-3">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            label="취급물질 목록"
            ref="dataTable"
            :rows="3"
            :headers="gridHeaderOptions"
            :items="gridData"
            :height="gridHeight"
            :excel-down="true"
            :print="true" 
            @selectedRow="selectedRow"
            >
          </y-data-table>
          </b-col>
      </b-col>      
    </b-row>
    <b-row class="mt-3"></b-row>
    <el-tabs type="border-card" 
      v-model="tabIndex"
      >
      <el-tab-pane
        v-for="(item, i) in tabItems"
        :key="i"
        stretch
        class="default-tab-pane"
        >
        <span slot="label">
          <i class="el-icon-date"></i>
          {{ item.title }}
        </span>
        <keep-alive>
          <component :is="component" v-if="component" :selectedTabIndex="tabIndex" :selectedChemProdNo="chemProdNo" @changeChemProdNo="changeChemProdNo" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-base-info-organ',
  components: {
  },
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니며, this.myProp는 정의되지 않습니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data: function () {
    return {
      // TODO : 현재까지 파악된 바로는 tab은 같은 폴더 또는 하위 폴더의 컴포넌트만 접근이 가능한 것으로 파악됨
      //                즉, 반드시 메인페이지 역할을 하는 vue와 동일 폴더나 하위 폴더에 tabItem 역할을 하는 vue 파일을 위치 시킬 것
      tabItems: [
        { title: '취급물질 정보', url: './chemprodInfoTap' },
        { title: '구성성분', url: './chemprodTap' },
      ],
      component: null,
      tabIndex: 0,

      searchParam: {
        chemProdNmKr: "",
        chemProdNmEn: "",
        fugacity: "",
        boilpoint: "",
      },
      chemprod: {
        chemProdNo: "",
        chemProdNmKr: "",
        chemProdNmEn: "",
        properties: "",
        fugacity: "",
        boilpoint: "",
        useYn: "",
        createUserId: "",
        createDt: "",
        updateUserId: "",
        updateDt: "",
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true,
        height: 0
      },
      chemProdNo: 0,

      comboPropertiesSearch: [],
      editable: true,
      gridData: [],
      gridHeaderOptions: [],
      gridHeight: 300,
      baseWidth: 8,
      searchUrl: ''
    };
  },
  watch: {
    tabIndex () {
      // 탭인덱스 변경시 하위 컴포넌트의 watch 가 정상적으로 캐치하지 못해 timeout 를 적용함.
      setTimeout(() => {
        this.loadComponent();
      }, 200); 
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init(); 
  },
  mounted () {
    this.searchArea.height = this.$refs.searchBox.clientHeight;
    this.loadComponent();
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // var nowDate = new Date();
      // this.searchParam.heaCheckupPlanPeriod.push(nowDate.getFullYear().toString() + '-01-01');
      // this.searchParam.heaCheckupPlanPeriod.push(nowDate.getFullYear().toString() + '-12-31');      
      
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '취급물질명 (KOR)', name: 'chemProdNmKr', width: '100', align: 'left' },
        { text: '취급물질명 (ENG)', name: 'chemProdNmEn', width: '120', align: 'left' },
        { text: '성상', name: 'property', width: '50', align: 'left' },
        { text: '비산성 (고체)', name: 'fugacity', width: '100', align: 'right' },
        { text: '끓는점 (액체, 기체)', name: 'boilpoint', width: '200', align: 'right' }
      ];

      this.searchUrl = selectConfig.baseInfo.chemprod.list.url;
      this.getComboItems("COM_PROPERTIES");
      // this.getList();

    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      this.component = () => import(`${path}`);
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    }, 

    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'COM_PROPERTIES')
        {
          this.comboPropertiesSearch = this.$_.clone(_result.data);
          this.comboPropertiesSearch.splice(0, 0, { 'code': null, 'codeNm': '전체' });
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    changeChemProdNo (data) {
      this.getList();
    },
    selectedRow (data) {
      this.chemProdNo = data.chemProdNo;
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridHeight = this.gridHeight + ((this.searchArea.show ? -1 : 1) * this.searchArea.height);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    /** button 관련 이벤트 **/
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    btnSearchPlanClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },    
    /** end button 관련 이벤트 **/
  }
};
</script>