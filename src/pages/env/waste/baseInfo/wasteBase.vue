<!--
  목적 : 폐기물-폐기물관리
  작성자 : khk
  Detail : 폐기물 처리방법 및 분류, 폐기물관리
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
  name: 'waste-base',
  components: {
  },
  props: {
  },
  data: function () {
    return {
      tabItems: [
        { title: '폐기물분류', url: './wasteClass' },
        { title: '폐기물처리방법', url: './wasteDispoMtd' },        
        { title: '폐기물', url: './waste' },
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
    window.addEventListener('resize', this.setTabSize);
  },
  beforeDestory () {
    window.addEventListener('resize', this.setTabSize);
  },
  //* methods */
  methods: {
    init () {   
      this.setTabSize();
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      this.component = () => import(`${path}`);
    },
    setTabSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        $('.el-tabs__content').height(window.innerHeight - 270);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
  }
};
</script>