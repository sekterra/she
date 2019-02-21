<!--
  목적 : 안전보호구 > 보호구 입고 > 신규등록/수정 팝업
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <!-- 보호구 입고 등록 -->
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="보호구 입고 등록" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
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
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :disabled="true"
                default="today"
                label="입고일"
                name="inYmd"
                :clearable="true"
                v-model="speIn.inYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                :disabled="true"
                ui="bootstrap"
                label="등록자"
                name="createUserNm"
                v-model="speIn.createUserNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :disabled="true"
                default="today"
                label="등록일"
                name="createDt"
                :clearable="true"
                v-model="speIn.createDt"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="speIn.remark"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 설비 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="입고 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :rows="3"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            >
          </y-data-table>
        </b-col>
        <div class="float-right mt-3">
          <y-btn
            v-if="editable"
            title="초기화"
            @btnClicked="btnClearClickedCallback" 
          />
          <y-btn
            v-if="editable&&insertMode"
            :action-url="insertUrl"
            :param="speIn"
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
            :param="speIn"
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
        </div>
      </b-col>
    </b-row>

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
export default {
  /** attributes: name, components, props, data **/
  name: 'create-spe-in',
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
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      speIn: {
        inYmd: null,
        createUserNm: '',
        createDt: '',
        remark: '',
      },
      baseWidth: 8,
      editable: true,
      insertMode: false,
      updateMode: false,
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      isInsert: false, 
      isEdit: false,
      isDelete: false,  
      deleteValue: null,
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeInsert () {
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
  beforeDestroy () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅

      this.insertMode = true;

      // 수정 또는 신규등록 버튼 Mode
      this.speIn.safFacilityCd = this.popupParam.safFacilityCd;
      if (this.popupParam.safFacilityCd !== 0) {
        this.updateMode = true;
      } else {
        this.insertMode = true;
      }

      // 보호구 입고 grid 헤더 설정
      this.gridOptions.header = [
        { text: '보호구종류', name: 'speKindNm', width: '130px', align: 'center' },
        { text: '보호구명', name: 'speNm', width: '200px', align: 'left' },
        { text: '입고개수', name: 'inNum', width: '100px', align: 'center', type: 'text' },
        { text: '단위', name: 'giveUnitNm', width: '90px', align: 'center' },
        { text: '비고', name: 'remark', width: '200px', align: 'center', type: 'text' },
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
      Object.assign(this.$data.speIn, this.$options.data().speIn);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.safFacilityCd = _result.data;
      this.isInsert = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
      this.closePopupUsage();
    },
    // 수정
    btnEditClickedCallback (_result) {
      this.isEdit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
      this.closePopupUsage();
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
    // 버튼 에러 처리
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