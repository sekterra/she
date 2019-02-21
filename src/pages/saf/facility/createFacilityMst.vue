<!--
  목적 : 설비관리 > 유형별 설비관리 > 신규등록/수정 팝업
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <!-- 유형별 설비 상세 -->
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="유형별 설비 등록" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                v-if="editable"
                title="초기화"
                @btnClicked="btnClearClickedCallback" 
              />
              <y-btn
                v-if="editable&&insertMode"
                :action-url="insertUrl"
                :param="facilityMst"
                :is-submit="isInsert"
                title="신규등록"
                color="orange"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editable&&updateMode"
                :action-url="editUrl"
                :param="facilityMst"
                :is-submit="isEdit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="editable&&updateMode"
                :action-url="deleteUrl"
                :param="deleteValue"
                :is-submit="isDelete"
                title="삭제"
                color="red"
                action-type="DELETE"
                beforeSubmit = "beforeDelete"
                @beforeDelete="beforeDelete"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="btnClosePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :required="true"
                :comboItems="comboFacilityTypeItems"
                itemText="safFacilityTypeNm"
                itemValue="safFacilityTypeCd"
                ui="bootstrap"
                name="safFacilityTypeCd"
                label="설비유형"
                v-model="facilityMst.safFacilityTypeCd"
                v-validate="'required'"
                :state="validateState('safFacilityTypeCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :required="true"
                :comboItems="processNoItems"
                itemText="processNm"
                itemValue="processNo"
                ui="bootstrap"
                type="search"
                label="공정"
                name="processNo"
                v-model="facilityMst.processNo"
                v-validate="'required'"
                :state="validateState('processNo')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :required="true"
                ui="bootstrap"
                type="search"
                label="설비코드"
                name="safFacilityCd"
                v-model="facilityMst.safFacilityCd"
                v-validate="'required'"
                :state="validateState('safFacilityCd')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :required="true"
                ui="bootstrap"
                type="search"
                label="설비명"
                name="safFacilityNm"
                v-model="facilityMst.safFacilityNm"
                v-validate="'required'"
                :state="validateState('safFacilityNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :required="true"
                ui="bootstrap"
                type="search"
                label="설비관리번호"
                name="facilityMgrNum"
                v-model="facilityMst.facilityMgrNum"
                v-validate="'required'"
                :state="validateState('facilityMgrNum')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :required="true"
                ui="bootstrap"
                type="search"
                label="설치위치"
                name="installLocate"
                v-model="facilityMst.installLocate"
                v-validate="'required'"
                :state="validateState('installLocate')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :required="true"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="관리부서"
                name="deptCd"
                v-model="facilityMst.deptCd"
                v-validate="'required'"
                :state="validateState('deptCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :editable="editable"
                :required="true"
                label="설치일자"
                name="installYmd"
                v-model="facilityMst.installYmd"
                v-validate="'required'"
                :state="validateState('installYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="설치업체"
                name="installConn"
                v-model="facilityMst.installConn"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-text
                    :width="6"
                    :editable="editable"
                    ui="bootstrap"
                    type="search"
                    label="용량/단위"
                    name="vol"
                    v-model="facilityMst.vol"
                  >
                  </y-text>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                    :width="12"
                    :editable="editable"
                    ui="bootstrap"
                    type="search"
                    name="volUnit"
                    v-model="facilityMst.volUnit"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="안전관리자"
                name="safMgrPsn"
                v-model="facilityMst.safMgrPsn"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-switch
                    :width="6"
                    :editable="editable"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="폐기여부/폐기년도"
                    name="disuseYn"
                    selectText="폐기"
                    unselectText="미폐기"
                    v-model="facilityMst.disuseYn"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                    :width="12"
                    :editable="editable"
                    ui="bootstrap"
                    type="search"
                    name="disuseYy"
                    v-model="facilityMst.disuseYy"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="baseWidth"
                :editable="editable"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="법정점검 대상여부"
                name="lawChkYn"
                selectText="관련"
                unselectText="미관련"
                v-model="facilityMst.lawChkYn"
                >
              </y-switch>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="baseWidth"
                :editable="editable"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="자체점검 대상여부"
                name="selfChkYn"
                selectText="관련"
                unselectText="미관련"
                v-model="facilityMst.selfChkYn"
                >
              </y-switch>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="facilityMst.remark"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 탭 -->
    <b-row class="mt-3"></b-row>
    <el-tabs type="border-card" v-model="tabIndex">
      <el-tab-pane
        v-for="(item, i) in tabItems"
        :key="i"
        stretch
        class="default-tab-pane"
      >
        <span slot="label">
          <i class="el-icon-date"></i>
          {{ item.title }}
        </span>
        <keep-alive>
          <component :is="component" v-if="component" :selectedFacilityCd="safFacilityCd" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <!-- <b-row>
      <b-col sm="12">
        <div class="float-right mt-3">
          
        </div>
      </b-col>
    </b-row> -->

    <!-- 팝업 설정 -->
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
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="popupOptions.closeCallback" />
    </el-dialog>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'create-facility-mst',
  props: {
    popupParam: {
      type: Object,
      default: {
        safFacilityCd: 0,
        pageNm: '',
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
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      tabItems: [
        { title: '설비항목', url: './facilityTypeItem' },
        { title: '첨부파일', url: 'fileUploadPage' },
      ],
      component: null,
      tabIndex: 0,
      facilityMst: {
        safFacilityTypeCd: null,
        processNo: null,
        deptCd: null,
        safFacilityCd: '',
        safFacilityNm: '',
        facilityMgrNum: '',
        installLocate: '',
        installYmd: '',
        installConn: '',
        vol: '',
        volUnit: '',
        safMgrPsn: '',
        disuseYn: '',
        disuseYy: '',
        lawChkYn: '',
        selfChkYn: '',
        remark: '',
      },
      baseWidth: 8,
      editable: true,
      insertMode: false,
      updateMode: false,
      comboFacilityTypeItems: [], // 설비유형 
      processNoItems: [], // 공정
      comboDeptItems: [], // 관리부서
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      isInsert: false,
      isEdit: false,  
      isDelete: false,  
      deleteValue: null,
    };
  },
  watch: {
    tabIndex () {
      this.loadComponent();
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  
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
  beforeDestroy () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      this.insertUrl = transactionConfig.saf.facilityMst.insert.url;
      this.editUrl = transactionConfig.saf.facilityMst.edit.url;

      this.getFacilityTypeItems(); // 설비유형
      this.getProcessNoItems(); // 공정
      this.getDeptItems();  // 관리부서
      this.insertMode = true;

      // 수정 또는 신규등록 버튼 Mode
      this.facilityMst.safFacilityCd = this.popupParam.safFacilityCd;
      if (this.popupParam.safFacilityCd !== 0) {
        this.updateMode = true;
      } else {
        this.insertMode = true;
      }
    },
    // 설비유형
    getFacilityTypeItems () {
      this.$http.url = selectConfig.saf.refInfoFacilityType.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'safFacilityTypeCd': '', 'safFacilityTypeNm': '선택하세요' });
        this.comboFacilityTypeItems = _result.data;
        this.facilityMst.safFacilityTypeCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 공정
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': '', 'processNm': '선택하세요' });
        this.processNoItems = _result.data;
        this.facilityMst.processNo = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.comboDeptItems = _result.data;
        this.facilityMst.deptCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 탭
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      
      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else this.component = () => import(`${path}`);
    },
    /** /초기화 관련 함수 **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '등록하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
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
    beforeEdit () {
    },
    beforeDelete () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',  
        confirmCallback: () => {
          this.deleteValue = {
            'data': Object.values(this.$_.clone(this.selectedValue))
          };
          this.isDelete = true;
        }
      });
    },
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
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
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.facilityMst, this.$options.data().facilityMst);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.isInsert = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
    },
    // 수정
    btnEditClickedCallback (_result) {
      this.isEdit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      this.getDataList();
      this.isDelete = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.editable = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>