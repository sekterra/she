<!--
  목적 : 비밀번호 변경 컴포넌트
  작성자 : sch
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="">
    <b-container fluid>
      <b-row>
        <!-- TODO : 아래에 본문을 넣으세요 -->
        <b-col sm="6">
          <y-text
            :width="9"
            :editable="editable"
            ui="bootstrap"
            :maxlength="100"
            label="비밀번호*"
            name="userPwd"
            type="password"
            v-model="user.userPwd"
          >
          </y-text>
        </b-col>
        <b-col sm="6">
        <y-text
          :width="9"
          :editable="editable"
          ui="bootstrap"
          :maxlength="100"
          label="비밀번호 확인*"
          name="userPwd"
          type="password"
          v-model="user.userPwdRepeat"
        >
        </y-text>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'password-change',
  props: {
    // 팝업 컴포넌트 일 경우 팝업 정보가 변경
    isPopupOpen: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      user: {},
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
    };
  },
  watch: {
    isPopupOpen () {
      // 팝업이 활성화 되면 값 초기화
      if (this.isPopupOpen) {
        Object.assign(this.$data, this.$options.data());
        this.init();
      }
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
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service **/
    /** /Call API service **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    getPassword () {
      return this.user;
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /** /Button Event **/
    
    /** 기타 function **/
    /** /기타 function **/
  }
};
</script>