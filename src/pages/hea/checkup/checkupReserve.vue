<!--
  목적 : 검진 예약변경 및 일괄예약
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
              <y-datepicker
                :width="10"
                :editable="editable"
                :range="true"
                defaultType="today"
                label="기간"
                name="heaCheckupPlanPeriod"
                v-model="searchParam.heaCheckupPlanPeriod"
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
            label="검진계획 목록"
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
    <el-tabs type="border-card" v-model="tabIndex">
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
          <component :is="component" v-if="component" :selectedCheckupPlanNo="heaCheckupPlanNo" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'checkup-reserve',
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
        { title: '예약변경', url: './reserveChange' },
        { title: '일괄예약', url: './reserveBatch' },
      ],
      component: null,
      tabIndex: 0,

      searchParam: {
        heaCheckupPlanPeriod: []
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true,
        height: 0
      },
      heaCheckupPlanNo: 0,

      editable: true,
      gridData: [],
      gridHeaderOptions: [],
      gridHeight: 300,

      searchUrl: ''
    };
  },
  watch: {
    tabIndex () {
      this.loadComponent();
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
        { text: '검진종류', name: 'heaCheckupClassNm', width: '20%', align: 'center' },
        { text: '검진계획명', name: 'heaCheckupPlanNm', width: '35%' },
        { text: '검진일정', name: 'heaCheckupPlanPeriod', width: '20%', align: 'center' },
        { text: '예약마감일', name: 'finishYmd', width: '15%', align: 'center' },
        { text: '대상자', name: 'checkupUserCount', width: '10%', align: 'center' }
      ];

      this.searchUrl = selectConfig.checkupPlan.list.url;
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
        this.gridData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    }, 
    selectedRow (data) {
      this.heaCheckupPlanNo = data.heaCheckupPlanNo;
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridHeight = this.gridHeight + ((this.searchArea.show ? -1 : 1) * this.searchArea.height);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    /** button 관련 이벤트 **/
    btnSearchPlanClickedCallback (_result) {
      this.gridData = _result.data;
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },    
    /** end button 관련 이벤트 **/
  }
};
</script>