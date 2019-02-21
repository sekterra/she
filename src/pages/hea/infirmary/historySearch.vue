<!--
  목적 : 이력조회
  Detail : kckim
  *
  examples:
  *
  -->
<template>
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
          <component :is="component" v-if="component" :paneName="paneName" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'history-search',
  components: {
  },
  props: {
  },
  data: function () {
    return {
      tabItems: [
        { title: '방문이력', url: './infirmaryUsageHistory' },
        { title: '처방이력', url: './prescribeHistory' },
        { title: '검진이력', url: './checkupHistory' },
      ],
      component: null,
      tabIndex: 0,
      paneName: '',
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
  },
  mounted () {
    this.loadComponent();
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
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