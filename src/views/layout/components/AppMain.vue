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
      :get-popup-data-func-name="popup.getPopupDataFuncName"
    />
    </div>
</template>

<script>
/* eslint-disable */
import YPopup from '@/components/YPopup';
/* loading */
import { Loading } from 'element-ui';

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
      },
      loading: {
        loadingInstance: null,
        passCount: 0
      }      
    }   
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      // console.log(this.$route.fullPath);
      return this.$route.fullPath;
    }
  },
  created () {
    // TODO : AppMain을 전역 변수에 담는다.
    window.getApp = this;
  },
  beforeMount () {
    this.$on('POPUP_OPEN', this.popupOpen);
    this.$on('POPUP_CLOSED', this.popupClosed);

    this.$on('LOADING_PASS_COUNT', this.setLoadingPassCount);
    this.$on('LOADING_SHOW', this.loadingShow);
    this.$on('LOADING_HIDE', this.loadingHide);
    this.$on('ALERT', this.alert);
    this.$on('CONFIRM', this.confirm);
    this.$on('MESSAGE', this.message);
    this.$on('NOTIFY', this.notify);

    this.$on('APP_REQUEST_SUCCESS', this.requestSuccess);
    this.$on('APP_REQUEST_ERROR', this.requestError);
    this.$on('APP_VALID_ERROR', this.validError);

    this.setAppMainSize();
  },
  mounted () {
    window.addEventListener('resize', this.setAppMainSize);    
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setAppMainSize);
    this.$off();    
  },
  methods: {
    setAppMainSize () {
      setTimeout(() => {
        var navHeight = $('.navbar').height();
        var tagsHeight = $('.tags-view-container').height();
        $('.app-main').height(window.innerHeight - navHeight - tagsHeight - 20);
      }, 600);      
    },
    popupOpen (_option) {
      this.popup = _option;
    },
    popupClosed (_result) {
      this.popup.isPopupOpen = false;
    },

    setLoadingPassCount (_count) {
      this.loading.passCount = _count;
    },
    loadingShow (_option) {
      if (this.loading.passCount === 0) {
        this.loading.loadingInstance = this.$loading({
          lock: true,
          text: 'Loading...',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }
      else this.loading.passCount--;
    },
    loadingHide (_result) {
      this.$nextTick(() => {
        this.loading.loadingInstance.close();
      });
    },
    /**
     * window.alert 대체 함수
     */
    alert (_option) {
      var type = '';
      if (_option.hasOwnProperty('type')) type = _option.type;
      this.$alert(_option.message, _option.title, 
      {
        confirmButtonText: '확인',
        type: type,
        callback: typeof _option.callback === 'function' ? _option.callback : ''
      });
    },
    /**
     * window.confirm 대체 함수
     */
    confirm (_option) {
      var type = '';
      if (_option.hasOwnProperty('type')) type = _option.type;
      this.$confirm(_option.message, _option.title, {
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        type: type
      }).then(
        typeof _option.confirmCallback === 'function' ? _option.confirmCallback : null
      ).catch(
        typeof _option.cancelCallback === 'function' ? _option.cancelCallback : null
      );
    },
    /**
     * toast message
     */
    message (_option) {
      var type = '';
      if (_option.hasOwnProperty('type')) type = _option.type;
      this.$message({
        type: type,
        showClose: true,
        message: _option.message,
        duration: _option.hasOwnProperty('duration') ? _option.duration : 3000
      });
    },
    /**
     * 우측 알림 팝업
     */
    notify (_option) {
      var type = '';
      if (_option.hasOwnProperty('type')) type = _option.type;
      this.$notify({
        title: _option.title,
        message: _option.message,
        type: type,
        duration: _option.hasOwnProperty('duration') ? _option.duration : 3000
      });
    },
    requestSuccess (_message) {
      if (!_message) return;
      this.alert({
        title: '안내',
        message: _message,
        type: 'success'
      });
    },
    requestError (_message) {
      if (!_message) return;
      this.alert({
        title: '에러',
        message: _message,
        type: 'error'
      });
    },
    validError (_message) {
      this.alert({
        title: '에러',
        message: _message ? _message : '유효성 검사에 실패하였습니다.',
        type: 'error'
      });
    }
  }
}
</script>

<style>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  /* min-height: calc(100vh - 84px); */
  /* TODO : 1024 - 84에서 적정 사이즈 조정 */
  height: 800px;
  /* height: 100%; */
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

/* TODO : 팝업창의 z-index가 2001이어서 강제로 z-index를 높게 지정, element-ui의 popover도 z-index가 2021임 */
.mx-datepicker-popup {
  z-index: 3000 !important;
}
</style>


