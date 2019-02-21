<!--
  목적 : 오염방지시설관리 
  작성자 : kkc
  Detail : 탭들을 묶은 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="방지시설 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="selectedRow"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>

    <el-tabs type="border-card" v-model="tabIndex" @tab-click="tabClick">
      <el-tab-pane
        v-for="(item, i) in tabItems"
        :key="i"
        stretch
      >
        <span slot="label">
          <i class="el-icon-date"></i>
          {{ item.title }}
        </span>
        <keep-alive>
          <component :is="component" v-if="component" :paneName="paneName" :selectedPreventFacNo="ewtrPreventFacNo" />
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
        { title: '고장이력정보', url: './preventBreakHist' },
      ],
      component: null,
      tabIndex: 0,
      paneName: '',
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      editable: true,
      ewtrPreventFacNo: 0,
    };
  },
  watch: {
    tabIndex () {
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
    this.loadComponent();
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '방지시설명', name: 'ewtrPreventFacNm', width: '20%', align: 'left' },
        { text: '처리방법명', name: 'ewtrDispoMtdNm', width: '20%', align: 'left' },
        { text: '비고', name: 'remark', width: '30%', align: 'left' },
        { text: '출력순서', name: 'sortOrder', width: '8%', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '8%', align: 'center' },
      ];

      this.getList();
    },
    getList () {
      this.$http.url = selectConfig.env.water.facility.preventFac.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    selectedRow (data) {
      this.ewtrPreventFacNo = data.ewtrPreventFacNo;
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      this.component = () => import(`${path}`);
    },
    tabClick (tab) {
      var nowDate = new Date();
      this.paneName = tab.paneName + nowDate.getMilliseconds();
    }
  }
};
</script>