<!--
  TODO : 버튼 공통 모듈
-->
<template>
  <span>
    <template v-if="isMetroUi">
      <v-btn
          :loading="loading"
          :disabled="loading"
          :color="color"
          @click.prevent="btnClicked"
        >
        <span v-if="!hasButtonError" class="white--text">{{title}}</span>
        <v-icon v-else>block</v-icon>
      </v-btn>
    </template>
    <template v-else>
      <el-button 
        plain
        :loading="loading"
        :disabled="loading"
        :type="color"
        :size="size"
        :icon="icon"
        :circle="isIcon"
        class="default-buntton"
        @click.prevent="btnClicked"
        >
        {{title}}
      </el-button>
    </template>
  </span>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-btn',
  props: {
    ui: {
      type: String,
      default: 'bootstrap',
    },
    type: { // 버튼의 종류 : save, delete, cancel, close, clear, select
      type: String,
      required: true,
      validator: function (_value) {
        // The value must match one of these strings
        return ['search', 'save', 'delete', 'cancel', 'close', 'clear', 'select', 'add', 'test'].indexOf(_value) !== -1;
      }
    },
    title: {
      type: String,
      default: ''
    },
    actionUrl: {
      type: String,
      default: ''
    },
    actionType: {
      type: String,
      default: ''
    },
    param: {
      type: Object,
      default: null
    },
    isValidByParent: {
      type: Boolean,
      default: null
    },
    customColor: {
      type: String,
      default: null
    },
    beforeSubmit: { // 버튼 클릭 전에 사전 처리해야 할 경우 부모의 함수명
      type: String,
      default: ''
    },
    isSubmit: { // 버튼 클릭 후 처리를 계속 진행할지 여부
      type: Boolean,
      default: null
    },
    size: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      hasButtonError: false,  // 버튼 속성값에 에러가 있는지 확인
      actionMethod: 'requestGet'
    };
  },
  computed: {
    isMetroUi () {
      return this.ui === 'metroUi';
    },
    isIcon () {
      return this.title === "" && this.icon !== ""
    }
  },
  watch: {
    isValidByParent () {
      if (this.isValidByParent) this.callButtonAction();
      else return this.$emit('btnClickedError', this.param);
    },
    isSubmit () {
      if (this.isSubmit) this.callButtonAction();
      else {
        this.closeLoading();
        return this.$emit('btnClickedError', this.param);
      }
    },
    actionType () {
      this.initButtonType();
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted () {
    // this.initButtonType();
  },
  /* methods */
  methods: {
    initButtonType () {
      // var type = this.type.toLowerCase();
      // if (type === 'search') {
      //   this.color = 'indigo lighten-1';
      //   this.actionMethod = 'requestGet';
      // }
      // else if (type === 'save') {
      //   this.color = 'success lighten-1';
      //   if (this.actionType.toUpperCase() === 'POST') this.actionMethod = 'requestPost';
      //   else if (this.actionType.toUpperCase() === 'PUT') this.actionMethod = 'requestPut';
      // }
      // else if (type === 'select') {
      //   this.color = 'success lighten-1';
      // }
      // else if (type === 'delete') {
      //   this.color = 'error lighten-1';
      //   if (this.actionType.toUpperCase() === 'POST') this.actionMethod = 'requestPost';
      //   else if (this.actionType.toUpperCase() === 'PUT') this.actionMethod = 'requestPut';
      // }
      // else if (type === 'cancel') {
      //   this.color = 'grey lighten-1';
      // } 
      // else if (type === 'close') this.color = 'primary';
      // else if (type === 'clear') {
      //   this.color = 'info lighten-1';
      // }
      // else if (type === 'test') this.color = 'success lighten-3';
      // else {
      //   this.color = 'error lighten-1';
      //   this.hasButtonError = true;
      // }
    },
    /**
     * 버튼 클릭 처리
     *  - 저장 버튼 클릭시 저장전 유효성 검사
     */
    btnClicked () {
      let self = this;
      this.loading = !this.loading;
      // 부모vue에서 주어진 속성값이 잘못 되었으면 리턴 처리함
      if (this.hasButtonError) {
        self.closeLoading();
        window.getApp.$emit('APP_VALID_ERROR', this.$t('error.validError'));
        return false;
      }
      // 저장일 경우 유효성 검사
      if (this.beforeSubmit) {
        self.closeLoading();
        this.$emit(this.beforeSubmit);
        return;
      }
      this.callButtonAction();
    },
    /**
     * 버튼 행위 정의
     */
    callButtonAction () {
      let self = this;

      if (this.type === 'test') {
        self.closeLoading();
        self.$emit('btnClicked', this.param);
        return;
      }

      // ajax action
      if (this.actionUrl) {
        this.$http.url = this.actionUrl;
        this.$http.param = this.param;
        this.$http.type = this.actionType;

        this.$http.request((_result) => {
          self.closeLoading();
          self.$emit('btnClicked', _result);
        }, (_error) => {
          self.closeLoading();
          console.log(_error);
        });

        // if (this.actionType === 'POST'){
        //   this.$http.requestPost((_result) => {
        //     console.log(JSON.parse(JSON.stringify(_result.data)));
        //     this.gridData = _result.data;
        //   }, (_error) => {
        //     console.log(_error);
        //   });
        // } else if (this.actionType === 'PUT') {
        //   this.$http.requestPut((_result) => {
        //     console.log(JSON.parse(JSON.stringify(_result.data)));
        //     this.gridData = _result.data;
        //   }, (_error) => {
        //     console.log(_error);
        //   });
        // }
        
        // this.$ajax.url = this.actionUrl;
        // this.$ajax.type = this.actionType;
        // this.$ajax.param = this.param;
        
        // this.$ajax[this.actionMethod]((_result) => {
        //   self.closeLoading()
        //   self.$emit('btnClicked', _result)
        // }, (_error) => {
        //   self.closeLoading()
        //   self.$emit('btnClickedError', _error) 
        // })
        // self.$emit('btnClicked', null);
      } else {
        this.closeLoading();
        this.$emit('btnClicked');
      }
    },
    /**
     * 버튼 로딩바 1초 후 제거
     */
    closeLoading () {
      setTimeout(() => (this.loading = false), 1000);
    }
  }
};
</script>
<style>
  .default-buntton {
    font-weight: bold;
    font-size: 14px;
  }
</style>

