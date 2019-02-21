<!--
  목적 : 검진결과 상세 - 판정
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>

    <b-row class="mt-3">
      <b-col sm="12"> 
        <b-row>
          <b-col sm="12">
            <y-label label="판정" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaDiagnoseCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaDiagnoseCd"
                label="판정"
                v-model="checkupResultDiag.heaDiagnoseCd"
                v-validate="'required'"
                :state="validateState('heaDiagnoseCd')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaHazardCdItems"
                itemText="heaHazardNmKo"
                itemValue="heaHazardCd"
                ui="bootstrap"
                type="save"
                name="heaHazardCd"
                label="유해인자"
                v-model="checkupResultDiag.heaHazardCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaDiseaseClassCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaDiseaseClassCd"
                label="질환종류"
                v-model="checkupResultDiag.heaDiseaseClassCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaDiseaseCdItems"
                itemText="heaDiseaseNm"
                itemValue="heaDiseaseCd"
                ui="bootstrap"
                type="save"
                name="heaDiseaseCd"
                label="질환"
                v-model="checkupResultDiag.heaDiseaseCd"
                v-validate="'required'"
                :state="validateState('heaDiseaseCd')"
                />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              title="과거판정데이터"
              @btnClicked="btnHistoryClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              :action-url="insertUrl"
              :param="checkupResultDiag"
              :is-submit="isCreateSubmit"
              title="판정추가"
              color="blue"
              action-type="post"
              beforeSubmit = "beforeCreateSubmit"
              @beforeCreateSubmit="beforeCreateSubmit"
              @btnClicked="btnCreateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              v-if="editable"
              :action-url="deleteUrl"
              :param="deleteResultDiagRows"
              :is-submit="isDeleteSubmit"
              title="삭제"
              color="red"
              action-type="delete"
              beforeSubmit = "beforeDeleteSubmit"
              @beforeDeleteSubmit="beforeDeleteSubmit"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <y-data-table 
            ref="dataTable"
            label="판정목록"
            :rows="3"
            :headers="gridResultDiagHeaderOptions"
            :items="gridResultDiagData" 
            v-model="gridResultDiagSelectedRows">
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
          </b-col>
      </b-col>      
    </b-row>

    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :width="popupOptions.width"
      :top="popupOptions.top">
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closePopup" />
    </el-dialog>

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'checkup-result-diag',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
    popupParam: {
      type: Object,
      default: {
        heaCheckupPlanNo: 0,
        userId: ''
      },
    },
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '80%',
        top: '50px',
        param: {}
      },
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      checkupResultDiag: {
        heaCheckupPlanNo: 0,
        userId: '',
        heaDiagnoseCd: '',
        heaDiagnoseNm: '',
        heaDiseaseClassCd: '',
        heaDiseaseClassNm: '',
        heaDiseaseCd: '',
        heaDiseaseNm: '',
        heaHazardCd: '',
        heaHazardNmKo: '',
        heaHazardNmEn: ''
      },
      editable: true,
      isCreateSubmit: false,
      isDeleteSubmit: false,

      gridResultDiagData: [],
      gridResultDiagHeaderOptions: [],
      gridResultDiagSelectedRows: [],
      deleteResultDiagRows: [],

      heaDiagnoseCdItems: [],
      heaDiseaseClassCdItems: [],
      heaDiseaseCdItems: [],
      heaHazardCdItems: [],

      insertUrl: '',
      deleteUrl: '',
      searchUrl: ''
    };
  },
  computed: {
  },
  watch: {
    'checkupResultDiag.heaDiseaseClassCd': function (newValue, oldValue) {
      this.getHeaDiseaseCdItems();
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
      this.checkupResultDiag.heaCheckupPlanNo = this.popupParam.heaCheckupPlanNo;
      this.checkupResultDiag.userId = this.popupParam.userId;

      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
      // 선택항목 설정
      setTimeout(() => {
        this.getHeaDiagnoseCdItems();
        this.getHeaDiseaseClassCdItems();
        this.getHeaDiseaseCdItems();
        this.getHeaHazardCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridResultDiagHeaderOptions = [
        { text: '판정', name: 'heaDiagnoseNm', width: '15%', align: 'center' },
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '45%' },
        { text: '질환', name: 'heaDiseaseNm', width: '20%' },
        { text: '유해인자', name: 'heaHazardNmKo', width: '20%' }
      ];

      this.searchUrl = selectConfig.checkupResultDiag.list.url;      
      this.insertUrl = transactionConfig.checkupResultDiag.insert.url;
      this.deleteUrl = transactionConfig.checkupResultDiag.multiDelete.url;
      
      this.getResultDiagList();
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getResultDiagList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.checkupResultDiag;
      this.$http.request((_result) => {
        this.gridResultDiagData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getHeaDiagnoseCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DIAGNOSE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaDiagnoseCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getHeaDiseaseClassCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_DISEASE_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.heaDiseaseClassCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getHeaDiseaseCdItems () {
      this.$http.url = selectConfig.disease.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'heaDiseaseClassCd': this.checkupResultDiag.heaDiseaseClassCd
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaDiseaseCd': '', 'heaDiseaseNm': '선택하세요' });
        this.heaDiseaseCdItems = _result.data;
        this.checkupResultDiag.heaDiseaseCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getHeaHazardCdItems () {
      this.$http.url = selectConfig.hazard.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'heaHazardCd': '', 'heaHazardNmKo': '선택하세요' });
        this.heaHazardCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
      // this.heaHazardCdItems.push({ 'code': '', 'codeNm': '선택하세요' });
    },
    
    /** /Call API service **/
    // deleteResultDiag (data) {
    //   if (confirm('판정항목을 삭제하시겠습니까?')) {
    //     this.$http.url = this.$format(this.deleteUrl, this.checkupResultDiag.heaCheckupPlanNo, this.checkupResultDiag.userId, data.heaDiseaseCd);
    //     this.$http.type = 'delete';
    //     this.$http.request((_result) => {
    //       this.getResultDiagList();
    //       alert('판정항목을 정상적으로 삭제하였습니다.'); 
    //     }, (_error) => {
    //       alert('삭제 중 오류가 발생하였습니다. 지속적인 문제 발생시 관리자에게 문의하세요.'); 
    //     });
    //   }
    // },
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeDeleteSubmit () {
      if (this.gridResultDiagSelectedRows.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '선택된 판정정보를 삭제 하시겠습니까??',
          type: 'info',  
          confirmCallback: () => {
            this.deleteResultDiagRows = {
              'data': Object.values(this.$_.clone(this.gridResultDiagSelectedRows))
            };
            this.isDeleteSubmit = true;
          }
        });
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '선택된 판정정보가 없습니다. 목록 앞단에 선택박스를 확인하세요.',
          type: 'info',
        });
      }
    },

    beforeCreateSubmit () {
      // (판정, 질환) 데이터가 그리드에 있는지 확인
      var userHeaDiagnoseCds = this.$_.partition(this.gridResultDiagData, { 'heaDiagnoseCd': this.checkupResultDiag.heaDiagnoseCd })[0];
      var heaDiseaseCds = this.$_.map(userHeaDiagnoseCds, 'heaDiseaseCd');
      if (this.$_.indexOf(heaDiseaseCds, this.checkupResultDiag.heaDiseaseCd) > -1) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 판정에 질환이 존재합니다.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }

      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '판정항목을 저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isCreateSubmit = true;
            }
          });
        }
        else {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',
          });
        }
      }).catch(() => {
        this.isCreateSubmit = false;
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    btnDeleteClickedCallback (_result) {
      this.isDeleteSubmit = false;
      this.getResultDiagList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '판정항목을 정상적으로 삭제하였습니다.',
        type: 'success',
      });
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.getResultDiagList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '판정항목을 정상적으로 추가하였습니다.',
        type: 'success',
      });
    },
    btnHistoryClickedCallback (_result) {
      this.popupOptions.param = {
        'heaCheckupPlanNo': this.checkupResultDiag.heaCheckupPlanNo,
        'userId': this.checkupResultDiag.userId
      };
      this.popupOptions.target = () => import(`${'./diagnoseResultHistory.vue'}`);
      this.popupOptions.title = '과거판정데이터';
      this.popupOptions.visible = true;
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      this.isDeleteSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>

<style>
.container-fluid {
  /* 내부로 들어가므로 padding 제거 */
  padding-right: 0px;
  padding-left: 0px;
}
</style>