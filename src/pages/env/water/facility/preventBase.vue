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
    <b-row class="mt-3"></b-row>
    <!-- 탭영역 -->
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
          <component :is="component" v-if="component" :paneName="paneName" :selectedPreventFacNo="ewtrPreventFacNo" @changePrevention="changePrevention" />
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
        { text: '방지시설명', name: 'ewtrPreventFacNm', width: '200px', align: 'left' },
        { text: '처리방법명', name: 'ewtrDispoMtdNm', width: '200px', align: 'left' },
        { text: '비고', name: 'remark', width: '300px', align: 'left' },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];

      this.getList();
    },
    getList () {
      this.$http.url = selectConfig.env.water.facility.preventFac.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
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
    },
    changePrevention (data) {
      this.getList();
    }
  }
};
</script>