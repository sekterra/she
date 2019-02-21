<!--
  목적 : 운영일지 팝업
  작성자 : kkc
  Detail : 탭들을 묶은 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
            title="닫기"
            @btnClicked="closePopup" 
          />
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-3"></b-row>

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
          <component :is="component" v-if="component" :paneName="paneName" :paramMeasureYmd="popupParam.paramMeasureYmd" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </b-container>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'op-log-base',
  components: {
  },
  props: {
    popupParam: {
      type: Object,
      default: {
        paramMeasureYmd: ''
      },
    },
  },
  data: function () {
    return {
      tabItems: [
        { title: '기본정보', url: './dailyReport' },
        { title: '배출시설 가동시간', url: './dischRunTm' },
        { title: '방지시설 가동시간', url: './preventRunTm' },
        { title: '공급수 사용량', url: './suplChkResult' },
        { title: '배출수 사용량', url: './dischChkResult' },
        { title: '원료/첨가제 사용량', url: './ingrChkResult' },
        { title: '전력사용량', url: './pwrcChkResult' },
        { title: '약품사용량', url: './chemChkResult' },
        { title: '폭기조 운전상태', url: './aerationTankChkResult' },
        { title: '자가측정 검사결과', url: './testItemResult' },
      ],
      component: null,
      tabIndex: 0,
      paneName: '',
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
    },
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
  }
};
</script>