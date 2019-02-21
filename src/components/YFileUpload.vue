<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-card class="text-center">
    <div class="text-left">
      <y-label :label="label" />
    </div>
    <el-upload
      class="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      :on-error="onError"
      :file-list="fileList"
      multiple
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">업로드할 파일을 Drag & Drop 하거나 <em>클릭하세요.</em></div>
      <div class="el-upload__tip" slot="tip">
        {{info}}
      </div>
    </el-upload>
    <div class="text-right">
      <y-btn
        title="뷰어보기"
        size="small"
      />
      <y-btn
        title="다운로드"
        size="small"
      />
      <y-btn
        v-if="editable"
        title="전체삭제"
        color="orange"
        size="small"
      />
    </div>
  </b-card>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'y-file-upload',
  props: {
    name: {
      type: String
    },
    label: {  // 부모로 부터 받아온 라벨 정보
      type: String,
      default: '파일업로드'
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true
    },
    // 컴포넌트의 너비(1~12)
    width: {
      type: Number,
      default: 12
    },
    // TODO : 부모의 v-model의 값을 받아오는 속성
    value: {
      type: [Number, String],
      default: null
    },
    size: {
      type: String,
      default: 'sm'
    },
    // 업로드 용량 제한(단위: MB)
    uploadLimitSize: {
      type: Number,
      default: 1
    },
    // TODO : 첨부 파일 그룹 번호
    // 이 번호가 존재하면 기존 업로드된 파일을 조회해 옴
    attachFileGrpNo: {
      type: Number,
      default: null
    },
    // 파일 첨부 필터
    filter: {
      type: String,
      default: 'jpg, png, txt'
    }
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, 
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
      ]
    };
  },
  computed: {
    info () {
      return '파일크기 ' + this.uploadLimitSize + 'MB 이하 파일만 업로드 됩니다.'
    }
  },
  watch: {
    attachFileGrpNo () {
      if (this.attachFileGrpNo) this.getUploadedFileList();
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
      if (this.attachFileGrpNo) this.getUploadedFileList();
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
    onRemove (file, fileList) {
      console.log(file, fileList);
    },
    onPreview (file) {
      console.log(file);
    },
    onSuccess (_result, _file, fileList) {
      this.$emit('fileUploadComplete', _result);
    },
    onError (_error, _file, fileList) {
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnSaveClickedCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    /**
     * 업로드된 파일 목록 조회
     */
    getUploadedFileList () {

    }
    /** /기타 function **/
  }
};
</script>

<style scoped>
.upload {
  text-align: left;
}
</style>
