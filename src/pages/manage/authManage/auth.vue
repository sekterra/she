<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
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
        <b-col sm="12">
          <b-card no-body>
            <b-card-header>
              <el-steps :active="active" finish-status="success" simple>
                <el-step 
                v-for="(item, i) in steps"
                :key="item.label"
                :title="item.label"
                icon="el-icon-edit"
                @click.native="e => nextStep(e, i)"
                >
                </el-step>
              </el-steps>
            </b-card-header>
            <b-card-body>
              <keep-alive>
                <component :is="component" v-if="component" :paneName="paneName" />
              </keep-alive>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: '',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      steps: [],
      active: 0,
      component: null,
      paneName: '',
    };
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
    this.loadComponent();
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.steps = [
        { label: '권한그룹 설정', url: './authGrp' },
        { label: '권한그룹별 메뉴 설정', url: './authGrpMenu' },
        { label: '사용자별 권한 설정 / 메뉴조정', url: './userAuthMenu' }
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** /Call API service **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
        
    /** 기타 function **/
    nextStep (_event, _index) {
      this.active = _index;
      var nowDate = new Date();
      this.paneName = this.steps[this.active].title + nowDate.getMilliseconds();
      this.loadComponent();
    },
    loadComponent () {
      var path = this.steps[this.active].url;
      this.component = () => import(`${path}`);
    },
    /** /기타 function **/
  }
};
</script>

<style>
.el-steps--simple {
    padding: 8px 8%;
    border-radius: 4px;
    background: #f5f7fa;
}
</style>