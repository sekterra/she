<!--
  목적 : 대기-방지시설
  작성자 : khk
  Detail : 대기 방지시설 관리
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
          <b-row v-if="searchArea.show" ref="searchBox">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="eairPreventFacClassCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="eairPreventFacClassCd"
                label="방지시설분류"
                v-model="searchParam.eairPreventFacClassCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                label="방지시설명"
                name="eairPreventFacNm"                
                v-model="searchParam.eairPreventFacNm"
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
            label="방지시설 목록"
            ref="dataTable"
            :rows="3"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
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
          <component :is="component" v-if="component" :selectedTabIndex="tabIndex" :selectedEairPreventFacNo="eairPreventFacNo" @changePrevention="changePrevention" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'prevent-base',
  components: {
  },
  props: {
  },
  data: function () {
    return {
      tabItems: [
        { title: '기본정보', url: './prevention' },
        { title: '변경관리정보', url: './preventChgHist' },
        { title: '보수관리정보', url: './preventMaintHist' },
      ],
      component: null,
      tabIndex: 0,

      searchParam: {
        eairPreventFacClassCd: '',
        eairPreventFacNm: ''
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true,
        height: 0
      },
      gridOptions: {
        header: [],
        data: [],
        height: 250
      },
      editable: true,

      eairPreventFacNo: 0,
      eairPreventFacClassCdItems: [],

      searchUrl: ''
    };
  },
  watch: {
    tabIndex () {
      setTimeout(() => {
        this.loadComponent();
      }, 200); 
    }
  },
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
      // 선택항목 설정
      setTimeout(() => {        
        this.getEairPreventFacClassCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '배출구', name: 'eairOutletNm', width: '160px' },
        { text: '방지시설분류', name: 'eairPreventFacClassNm', width: '160px' },
        { text: '방지시설명', name: 'eairPreventFacNm', width: '160px' },
        { text: '설치위치', name: 'installPos', width: '160px' },
        { text: '출력순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];

      this.searchUrl = selectConfig.env.air.facility.prevention.list.url;
      this.getList();
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
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    }, 
    getEairPreventFacClassCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EAIR_PREVENT_FAC_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.eairPreventFacClassCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    changePrevention (data) {
      this.getList();
    },
    selectedRow (data) {
      this.eairPreventFacNo = data.eairPreventFacNo;
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = this.gridOptions.height + ((this.searchArea.show ? -1 : 1) * this.searchArea.height);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    btnSearchClicked () {
      this.getList();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
  }
};
</script>