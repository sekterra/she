<!--
  목적 : Label을 표시하는  컴포넌트
  작성자 : sch
  Detail :
  *
  examples:
  *
  -->
<template>
  <span :class="{'text-center': true,  'cutstom-title-color': colorSet}">
    <f-icon v-if="icon" :icon="icon" :size="size"/>

    <span v-if="fieldable">   
      <span v-if="size === 'sm'">
        <small><label :for="name" style="color:#0174DF;">{{label}}</label></small>
      </span>
      <span v-else>
        <label :for="name" style="color:#0174DF;">{{label}}</label>
      </span>   
    </span>
    <span v-else>
      <span v-if="size === 'sm'">
        <small><label :for="name">{{label}}</label></small>
      </span>
      <span v-else>
        <label :for="name">{{label}}</label>
      </span>
    </span>
    <span v-if="required"><label class="default-required">*</label></span>
  </span>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'y-label',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
    // label 크기(sm: 작게, '': default, lg: 크게)
    size: {
      type: String,
      default: 'sm'
    },
    // 부모로 부터 받아온 라벨 정보
    label: {  
      type: String,
      default: ''
    },
    // 부모 컴포넌트의 name
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'sm'
    },
    icon: {
      type: String,
      default: ''
    },
    colorClass: {
      type: String,
      default: '#545454'
    },
    required: {
      type: Boolean,
      default: false
    },
    fieldable: {
      type: Boolean,
      default: false
    }
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
    };
  },
  computed: {
    colorSet () {
      return this.colorClass === 'cutstom-title-color'
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
    },
    /** /초기화 관련 함수 **/
  }
};
</script>

<style>
.color {
  color: #545454
}
.default-required {
  color: crimson;
}
</style>
