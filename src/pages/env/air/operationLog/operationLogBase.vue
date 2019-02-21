<!--
  목적 : 대기-운영일지 상세
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row></b-row>
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
          <component :is="component" v-if="component" :selectedTabIndex="tabIndex" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'operation-log-base',
  components: {
  },
  props: {
  },
  data: function () {
    return {
      tabItems: [
        { title: '기본정보', url: './dailyResport' },
        { title: '배출구별 점검정보', url: './outletChkResultFlow' },        
        { title: '전력사용량', url: './preventPwrcChkResult' },
        { title: '배출구 검사결과', url: './outletTestItemResult' },
        { title: '연료사용량', url: './dailyResport' },
        { title: '원료사용량', url: './dailyResport' },
      ],
      component: null,
      tabIndex: 0,
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
    this.loadComponent(); 
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {   
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      this.component = () => import(`${path}`);
    },
  }
};
</script>