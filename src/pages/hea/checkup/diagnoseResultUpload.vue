<!--
  목적 : 검진결과/판정 업로드
  작성자 : khk
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12"> 
        <b-row>
          <b-col sm="12">
            <y-label label="업로드정보" icon="user-edit" color-class="cutstom-title-color" />            
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="editable"
                :action-url="uploadUrl"
                :param="uploadFile"
                :is-submit="isUploadSubmit"
                title="업로드및저장"
                color="blue"
                action-type="post"
                beforeSubmit = "beforeUploadSubmit"
                @beforeUploadSubmit="beforeUploadSubmit"
                @btnClicked="btnUploadClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="업로드양식 다운로드"
                @btnClicked="btnDownloadFormClicked" 
              />              
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">              
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="checkupYearItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                name="checkupYear"
                label="검진년도"
                v-model="uploadFile.checkupYear"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaCheckupPlanNoItems"
                itemText="heaCheckupPlanNm"
                itemValue="heaCheckupPlanNo"
                ui="bootstrap"
                type="search"
                name="heaCheckupPlanNo"
                label="검진계획"
                v-model="uploadFile.heaCheckupPlanNo"                
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
              <b-col sm="2"><y-label label="업로드파일"></y-label></b-col>
              <b-col sm="10">
                <input 
                  type="file" 
                  id="file" 
                  ref="file" 
                  style="width:100%;"
                  v-on:change="changeFile()"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="업로드 및 저장결과"
            :headers="gridUploadHeaderOptions"
            :items="gridUploadData" 
            :excel-down="true"
            :print="true"
            :rows="4" />
          </b-col>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="오류정보(실패한 사유에 대한 정보)"
            :headers="gridErrorHeaderOptions"
            :items="gridErrorData" 
            :excel-down="true"
            :print="true"
            :rows="4"/>
          </b-col>
      </b-col>
    </b-row>
      
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'diagnose-result-upload',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      uploadFile: {
        checkupYear: '',
        heaCheckupPlanNo: 0,
        file: null,
      },
      uploadResult: {
        classNm: '',
        totalCount: 0,
        successCount: 0,
        failCount: 0
      },
      errorInfo: {
        classNm: '',
        failRow: 0,
        failMessage: '',
        remark: ''
      },
      baseWidth: 9,
      editable: true,
      isUploadSubmit: false,

      gridUploadData: [],
      gridUploadHeaderOptions: [],
      gridErrorData: [],
      gridErrorHeaderOptions: [],    

      heaCheckupPlanNoItems: [],
      checkupYearItems: [],

      uploadUrl: ''
    };
  },
  watch: {
    'uploadFile.checkupYear': function (newValue, oldValue) {
      this.getHeaCheckupPlanNoItems();
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
      // 선택항목 설정
      setTimeout(() => {
        var nowDate = new Date();
        var from = nowDate.getFullYear() - 9;
        for (; from <= nowDate.getFullYear() + 1; from++) {
          this.checkupYearItems.push({ 'code': from, 'codeNm': from + '년' });
        }
        this.uploadFile.checkupYear = nowDate.getFullYear().toString();

        this.getHeaCheckupPlanNoItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridUploadHeaderOptions = [
        { text: '구분', name: 'classNm', width: '25%', align: 'center' },
        { text: '전체 Row 수', name: 'totalCount', width: '25%', align: 'center' },
        { text: '성공 Row 수', name: 'successCount', width: '25%', align: 'center' },
        { text: '실패 Row 수', name: 'failCount', width: '25%', align: 'center' }
      ];

      this.gridErrorHeaderOptions = [
        { text: '구분', name: 'classNm', width: '15%', align: 'center' },
        { text: '실패 Row 번호', name: 'failRow', width: '15%', align: 'center' },
        { text: '실패 사유', name: 'failMessage', width: '35%' },
        { text: '비고', name: 'remark', width: '35%' }
      ];
      
      this.uploadUrl = transactionConfig.checkupResult.excel.url;
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getHeaCheckupPlanNoItems () {
      // 검진계획 선택항목 조회
      this.$http.url = selectConfig.checkupPlan.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'checkupYear': this.uploadFile.checkupYear
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaCheckupPlanNo': '0', 'heaCheckupPlanNm': '선택하세요' });
        this.heaCheckupPlanNoItems = _result.data;
        this.uploadFile.heaCheckupPlanNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    changeFile () {
      this.uploadFile.file = this.$refs.file.files[0];
    },
    closePopup () {
      this.$emit('closePopup', {});
    },
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeUploadSubmit () {
      if (this.uploadFile.heaCheckupPlanNo > 0) {
        this.isUploadSubmit = !(this.uploadFile.file == null);
        this.$http.isFileRequestPost = true;
        if (!this.isUploadSubmit) {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '선택된 파일이 없습니다.',
            type: 'warning',  // success / info / warning / error
          });
          return false;
        }
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '선택된 검진계획이 없습니다.',
          type: 'warning',
        });
        return false;
      }

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '검진결과를 업로드 하시겠습니까?',
        type: 'info',
        // 확인 callback 함수
        confirmCallback: () => {
          this.isUploadSubmit = true;
        }
      });
    }, 
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnDownloadFormClicked (_result) {
      // axios({
      //   url: 'http://api.dev/file-download',
      //   method: 'get',
      //   responseType: 'blob',
      // }).then((response) => {
      //   const url = window.URL.createObjectURL(new Blob([response.data]));
      //   const link = document.createElement('a');
      //   link.href = url;
      //   link.setAttribute('download', '/src/assets/files/검강검진_엑셀_업로드_양식.xlsx'); //or any other extension
      //   document.body.appendChild(link);
      //   link.click();
      // });
      // window.open('../../assets/files/검강검진_엑셀_업로드_양식.xlsx');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '업로드양식 다운로드!!',
        type: 'success',
      });
    },
    btnUploadClickedCallback (_result) {
      this.isUploadSubmit = false;
      this.gridUploadData = _result.data['uploadResult'];
      this.gridErrorData = _result.data['errorInfo'];
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '업로드 및 저장결과, 오류정보를 확인하시기 바랍니다.',
        type: 'info',
      });
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isUploadSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>