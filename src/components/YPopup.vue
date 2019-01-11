<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  Detail :
  *
  examples:
  *
  -->
<template>
  <div>
    <template v-if="isMetroUi">
      <div>MetroUI용 컴포넌트는 준비중입니다.</div>
    </template>
    <template v-else>
      <el-dialog
        title="Warning"
        :visible.sync="isOpen"
        :fullscreen="true"
        center
        @close="popupClose"
        @sendDataToPopup="sendDataToPopup"
        >
        <div v-if="type === 'test'">
          <checkup-result></checkup-result>
        </div>
        <slot name="popupBody"></slot>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popupClose">닫기</el-button>
          <el-button type="primary" @click="popupConfirm">승인</el-button>
        </span>
      </el-dialog>
      this is test : {{isOpen}}
    </template>
  </div>
</template>

<script>
import checkupResult from '@/pages/hea/checkup/checkupResult';
import { fcall } from 'q';
export default {
  /** attributes: name, components, props, data **/
  name: 'y-popup',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  components: {
    checkupResult
  },
  props: {
    ui: {
      type: String,
      default: 'bootstrap',
    },
    id: {
      type: String,
      default: 'popup'
    },
    name: {
      type: String
    },
    label: {  // 부모로 부터 받아온 라벨 정보
      type: String,
      default: 'Popup'
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    isPopupOpen: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'lg'
    }
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      popupData: {},  // 팝업에 관련된 정보
      isOpen:  false
    };
  },
  watch: {
    isPopupOpen () {
      this.isOpen = this.isPopupOpen;
    }
  },
  computed: {
    isMetroUi () {
      return this.ui === 'metroUi';
    },
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    this.init();
  },
  mounted () {
  },
  beforeUpdate () {
    console.log(':::::::::::::: beforeUpdate :');
    this.$nextTick(() => {
      this.isOpen = this.isPopupOpen;
    });
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
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */

   sendDataToPopup (_datas) {
     this.popupData = _datas;
   },
    /** /Call API service **/
    
    /** Button 관련 event **/
    popupClose () {
      this.isOpen = false;
      window.getApp.$emit('POPUP_CLOSED');
    },
    popupConfirm () {
      this.isOpen = false;
      window.getApp.$emit('POPUP_CLOSED', this.popupData);
    }
    /** **/
   
    /** 기타 function **/
    /** /기타 function **/
  }
};
</script>