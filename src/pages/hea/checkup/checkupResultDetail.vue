<!--
  목적 : 검진결과 상세
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
            <y-label label="검진 정보" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">  
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
              <b-row>
              <b-col sm="4"><y-label label="현재 부서"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.deptNm" :fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="성명"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.userNm" :fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="사번"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.userId" :fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진당시 부서"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.deptNmOrg" :fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진일"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.heaCheckedYmd" :fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진기관"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.heaCheckupOrgNm" :fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="4"><y-label label="검진계획(검진종류)"></y-label></b-col>
              <b-col sm="8"><y-label :label="checkupResult.heaCheckupPlanNm" :fieldable="true"></y-label> <y-label :label="checkupResult.heaCheckupClassNm" :fieldable="true"></y-label></b-col>
              </b-row>
            </b-col>        
          </b-row>          
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">   
        <b-row>
          <b-col sm="12">
            <y-label label="소견" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaWorkableCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaWorkableCd"
                label="업무수행적합"
                v-model="checkupResult.heaWorkableCd"
                v-validate="'required'"
                :state="validateState('heaWorkableCd')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="heaFollowUpCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="save"
                name="heaFollowUpCd"
                label="사후관리"
                v-model="checkupResult.heaFollowUpCd"
                v-validate="'required'"
                :state="validateState('heaFollowUpCd')"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
                :width="10"
                :editable="editable"
                :clearable="true"
                ui="bootstrap"
                name="overallOpinion"
                label="종합소견"
                v-model="checkupResult.overallOpinion"
                />
            </b-col>
          </b-row> 
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              :action-url="editUrl"
              :param="checkupResult"
              :is-submit="isEditSubmit"
              title="저장"
              color="blue"
              action-type="put"
              beforeSubmit = "beforeEditSubmit"
              @beforeEditSubmit="beforeEditSubmit"
              @btnClicked="btnUpdateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>  
        </b-card>
      </b-col>
    </b-row>

    <component :is="compResultDiag" v-if="compResultDiag" :popupParam="popupParam" />
    <component :is="compItemResult" v-if="compItemResult" :popupParam="popupParam" />

    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
            title="닫기"
            @btnClicked="closePopup" 
          />
        </div>  
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'checkup-result-detail',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
      // Naming Rule : JAVA model class와 연동되는 vue model은 model class명을 Camel case로 변환해서 선언하시고 기본값은 {}로 초기화 시켜주세요.
      // 예) ExamData -> examData: {},
      checkupResult: {
        heaCheckupPlanNo: 0,
        heaCheckupPlanNm: '',
        heaCheckupClassCd: '',
        heaCheckupClassNm: '',
        heaCheckupOrgNo: 0,
        heaCheckupOrgNm: '',
        userId: '',
        userNm: '',
        deptCd: '',
        deptNm: '',
        deptCdOrg: '',
        deptNmOrg: '',
        heaCheckedYmd: '',
        heaWorkableCd: null,
        heaWorkableNm: '',
        heaFollowUpCd: null,
        heaFollowUpNm: '',
        overallOpinion: ''
      },
      editable: true,
      isEditSubmit: false,

      heaWorkableCdItems: [],
      heaFollowUpCdItems: [],

      detailUrl: '',
      editUrl: '',

      compResultDiag: null,
      compItemResult: null,
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
    this.loadComponent();
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
      // 초기값 설정
      this.checkupResult.heaCheckupPlanNo = this.popupParam.heaCheckupPlanNo;
      this.checkupResult.userId = this.popupParam.userId;

      this.detailUrl = selectConfig.checkupResult.get.url;
      this.editUrl = transactionConfig.checkupResult.edit.url;

      // 선택항목 설정
      setTimeout(() => {
        this.getHeaWorkableCdItems();
        this.getHeaFollowUpCdItems();
      }, 200);

      this.getResultDetail();
    },
    loadComponent () {
      this.compResultDiag = () => import(`${'./checkupResultDiag.vue'}`);
      this.compItemResult = () => import(`${'./testItemResult.vue'}`);
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    getResultDetail () {
      this.$http.url = this.$format(this.detailUrl, this.checkupResult.heaCheckupPlanNo, this.checkupResult.userId);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.checkupResult = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getHeaWorkableCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_WORKABLE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.heaWorkableCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getHeaFollowUpCdItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_FOLLOW_UP');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.heaFollowUpCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },

    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    beforeEditSubmit () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '소견정보를 저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isEditSubmit = true;
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
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    btnUpdateClickedCallback (_result) {
      this.isEditSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '소견정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isEditSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>