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
      :action="uploadUrl"
      :data="attachFileGrp"
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="uploadedList"
      drag
      ref="upload"
      name="files"
      list-type="picture"
      multiple
      @on-success="onSuccess"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <div class="el-upload__tip" slot="tip">
        <el-button size="small" type="success" @click="submitUpload">upload to server</el-button>
        <span>jpg/png files with a size less than 500kb</span>
      </div>
    </el-upload>
    <!-- 파일 뷰어 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
      <el-button
        class="mt-2"
        size="small" 
        @click="download">파일 다운로드</el-button>
        {{dialogImageUrl}}
    </el-dialog>
    <div class="text-right mt-1">
      <y-btn
        title="전체 다운로드"
        size="small"
        @btnClicked="zipDownload"
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
import backendConfig from '@/js/backendConfig.js';
import selectConfig from '@/js/selectConfig.js';
import transactionConfig from '@/js/transactionConfig.js';

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
    // 파일 첨부 필터
    filter: {
      type: String,
      default: 'jpg, png, txt'
    },
    // 첨부파일 그룹 정보
    attachFileGrp: {
      type: Object,
      required: true
    }
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // TODO: 기존 업로드 파일 목록
      uploadedList: [
        // 예시
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, 
      ],
      // TODO: 이미지 미리보기 경로
      dialogImageUrl: '',
      // TODO: 이미지 미리보기 표시 여부
      dialogVisible: false
    };
  },
  computed: {
    info () {
      return '파일크기 ' + this.uploadLimitSize + 'MB 이하 파일만 업로드 됩니다.'
    },
    uploadUrl () {
      return backendConfig.getUrl(transactionConfig.attachFile.insert.url);
    }
  },
  watch: {
    attachFileGrp () {
      if (this.attachFileGrp) this.getUploadedFileList();
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
      if (this.attachFileGrp) this.getUploadedFileList();
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSuccess (_result, _file, fileList) {
      this.uploadedList = _result.body;
      this.$emit('fileUploadComplete', _result);
    },
    onError (_error, _file, fileList) {
    },
    download () {
      const link = document.createElement('a');
      link.href = this.dialogImageUrl;
      document.body.appendChild(link);
      link.click();
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    zipDownload () {
      this.$http.url = selectConfig.attachFile.zip.url;
      this.$http.type = 'GET';
      this.$http.param = this.attachFileGrp;
      this.$http.request((_result) => {
        const link = document.createElement('a');
        link.href = _result.data;
        document.body.appendChild(link);
        link.click();
      });
    },
    /** /Button Event **/
    
    /** 기타 function **/
    /**
     * 업로드된 파일 목록 조회
     */
    getUploadedFileList () {
      this.$http.url = selectConfig.attachFile.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.attachFileGrp;
      this.$http.request((_result) => {
        this.uploadedList = _result.data;
      });
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
