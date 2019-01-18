<template>
  <div id="appMain">
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
  <y-popup 
      :id="popup.id"
      :label="popup.label"
      :editable="popup.editable"
      :type="popup.type"
      :is-popup-open="popup.isPopupOpen"
      :path="popup.path"
      :childProps="popup.childProps"
      :fullscreen="popup.fullscreen"
      :closeButtonText="popup.closeButtonText"
      :confirmButtonText="popup.confirmButtonText"
    />
    </div>
</template>

<script>
/* eslint-disable */
import YPopup from '@/components/YPopup';

export default {
  name: 'AppMain',
  components: {
    YPopup
  },
  data () {
    return {
      popup: {
        isPopupOpen: false,
        id: '',
        label: '',
        editable: false,
        type: 'test',
        childProps: null,
        fullscreen: true,
        closeButtonText: '닫기',
        confirmButtonText: '승인'
      }
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  created () {
    // TODO : AppMain을 전역 변수에 담는다.
    window.getApp = this;
  },
  beforeMount () {
    this.$on('POPUP_OPEN', this.popupOpen);
    this.$on('POPUP_CLOSED', this.popupClosed);
  },
  mounted () {
  },
  beforeDestroy () {
    this.$off();
  },
  methods: {
    popupOpen (_option) {
      this.popup = _option;
    },
    popupClosed (_result) {
      this.popup.isPopupOpen = false;
    }
  }
}
</script>

<style>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  /* min-height: calc(100vh - 84px); */
  /* TODO : 1024 - 84에서 적정 사이즈 조정 */
  max-height: 860px;
  width: 100%;
  position: relative;
  /* overflow: hidden; */
  overflow-y: auto;
}
.default-tab-pane span {
  font-weight: bold;
}
/*tab 선택될 시에 폰트 사이즈 up*/
.el-tabs__nav .is-active {
  font-size:17px;
}

/* card header 기본 css */
.default-card {
  background-color: #e7f2fd !important;
  font-size:16px;
  height:40px;
  padding: 5px 12px 10px 12px !important
}
/* card body 기본 css */
.default-body-card {
  padding-bottom: 0px !important;
}

.full-height {
  min-height: calc(100vh - 84px);
}

.cutstom-title-color {
  color: #3131ea;
}
</style>


