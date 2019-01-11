
<!--
  목적 : 유해인자
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색" />
            </div>
            <div class="float-right">
              <y-btn
                  v-if="editable"
                  :action-url="searchUrl"
                  :param="hazard"
                  type="search"
                  title="검색"
                  size="mini"
                  color="success"
                  action-type="GET"
                  @btnClicked="btnSearchClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="hazardClassSelItems"
                itemText="heaHazardClassSelNm"
                itemValue="heaHazardClassSelCd"
                ui="bootstrap"
                type="search"
                label="유해인자 분류"
                name="heaHazardClassSelCd"
                v-model="hazard.heaHazardClassSelCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="baseWidth"
                :editable="editable"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="특수검진 관련 여부"
                name="specialYn"
                selectText="관련"
                unselectText="미관련"
                v-model="hazard.specialYn"
              >
            </y-switch>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                label="유해인자명(한글)"
                name="heaHazardNmKoSel"
                v-model="hazard.heaHazardNmKoSel"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="baseWidth"
                :editable="editable"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="작업환경 관련 여부"
                name="workEnvYn"
                selectText="관련"
                unselectText="미관련"
                v-model="hazard.workEnvYn"
              >
            </y-switch>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 유해인자 grid-->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="유해인자 목록"
            :headers="hazardGridHeaderOptions"
            :items="hazardGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :rows="6"
            ref="dataTable"
            >
          </y-data-table>
        </b-col>
        
        <b-row class="mt-3">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="유해인자 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="7"
                    :editable="editable"
                    :comboItems="hazardClassInsItems"
                    itemText="heaHazardClassInsNm"
                    itemValue="heaHazardClassInsCd"
                    ui="bootstrap"
                    type="search"
                    label="유해인자 분류"
                    name="heaHazardClassInsCd"
                    v-model="hazard.heaHazardClassInsCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="7"
                    :editable="editable"
                    :maxlength="5"
                    :required="true"
                    ui="bootstrap"
                    label="유해인자 코드"
                    name="heaHazardCd"
                    v-model="hazard.heaHazardCd"
                    v-validate="'required'"
                    :state="validateState('heaHazardCd')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="7"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    label="유해인자명(한글)"
                    name="heaHazardNmKoIns"
                    v-model="hazard.heaHazardNmKoIns"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="7"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    label="유해인자명(영문)"
                    name="heaHazardNmKoIns"
                    v-model="hazard.heaHazardNmKoIns"
                  >
                  </y-text>
                </b-col>
              </b-row>
              <div class="float-right mt-3">
                <y-btn
                    v-if="editable"
                    type="clear"
                    title="초기화"
                    size="small"
                    color="info"
                    @btnClicked="btnClearClickedCallback" 
                  />
                  <y-btn
                    v-if="editable"
                    :action-url="saveNewUrl"
                    :param="hazard"
                    :is-submit="isSubmit"
                    type="save"
                    title="신규등록"
                    size="small"
                    color="warning"
                    action-type="POST"
                    beforeSubmit = "beforeSubmit"
                    @beforeSubmit="beforeSubmit"
                    @btnClicked="btnSaveClickedCallback" 
                    @btnClickedErrorCallback="btnClickedErrorCallback"
                  />
                  <y-btn
                    v-if="editable"
                    :action-url="saveUrl"
                    :param="hazard"
                    :is-submit="isSubmit"
                    type="save"
                    title="수정"
                    size="small"
                    color="warning"
                    action-type="POST"
                    beforeSubmit = "beforeSubmit"
                    @beforeSubmit="beforeSubmit"
                    @btnClicked="btnSaveClickedCallback" 
                    @btnClickedErrorCallback="btnClickedErrorCallback"
                  />
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'hazard',  
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      hazard: {
        heaHazardClassSelCd: null,
        heaHazardClassInsCd: null,
        processCd: null,
        specialYn: 'Y',
        workEnvYn: 'Y',
        heaHazardNmKoSel: '',
        heaHazardNmKoIns: '',
        heaHazardCd: '',
      },
      baseWidth: 8,
      editable: true,
      searchUrl: '',
      saveNewUrl: '',
      saveUrl: '',
      hazardClassSelItems: [],
      hazardClassInsItems: [],
      processItems: [],
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
      hazardGridData: [],
      hazardGridHeaderOptions: [],
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
    this.getItemList();
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
      this.getItems();

      // 유해인자 그리드 헤더 설정
      this.hazardGridHeaderOptions = [
        { text: 'NO', name: 'no', width: '10%', align: 'center' },
        { text: '유해인자 분류', name: 'heaHazardClassSelCd', width: '20%', align: 'center' },
        { text: '유해인자명(한글)', name: 'heaHazardNmKoSel', width: '30%', align: 'center' },
        { text: '유해인자명(영문)', name: 'heaHazardNmEn', width: '30%', align: 'center' },
        { text: '특수검진 관련 여부', name: 'specialYn', width: '25%', align: 'center' },
        { text: '작업환경 관련 여부', name: 'workEnvYn', width: '25%', align: 'center' },
        { text: '사용 여부', name: 'useYn', width: '20%', align: 'center' },
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    /**
     * 아이템 정보를 가져옴
     */
    getItems () {
      // 이 부분을 api service 호출 하는 것으로 바꿀 것
      setTimeout(() => {
        this.hazardClassSelItems = [
          { heaHazardClassSelCd: '1', heaHazardClassSelNm: '유해인자A' },
          { heaHazardClassSelCd: '2', heaHazardClassSelNm: '유해인자B' },
        ];
        this.hazardClassInsItems = [
          { heaHazardClassInsCd: '1', heaHazardClassInsNm: '유해인자A' },
          { heaHazardClassInsCd: '2', heaHazardClassInsNm: '유해인자B' },
        ];
        this.specialYn = [
          { specialYn: '1', specialYnNm: '' },
        ];
        this.workEnvYn = [
          { workEnvYn: '1', workEnvYnNm: '' },
        ];

        // this.hazardGridData = [
        //   { no: '', heaHazardClassSelCd: '물리적인자', heaHazardNmKoSel: '소음', heaHazardNmEn: '', specialYn: '', workEnvYn: '', useYn: '' },
        //   { no: '', heaHazardClassSelCd: '물리적인자', heaHazardNmKoSel: '분진', heaHazardNmEn: '', specialYn: '', workEnvYn: '', useYn: '' },
        // ];
      }, 1000);
    },
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    /** 
     * 저장 하기전 UI단 유효성 검사 
     **/
    beforeSubmit () {
      this.checkValidation();
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation () {
      this.validator.validateAll().then((_result) => {
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
    getItemList () {
      this.$http.url = selectConfig.hazard.list.url;
      this.$http.type = 'GET';
      // this.$http.param = this.param;
      this.$http.request((_result) => {
        //  console.log(JSON.parse(JSON.stringify(_result.data)));
        this.hazardGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 검색 버튼 처리용 샘플함수
    */
    btnSearchClickedCallback (_result) {
      this.isSubmit = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭되었습니다.');
    },
    /**
    * 초기화 버튼 처리용 샘플함수
    */
    btnClearClickedCallback () {
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
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
    
    /** /기타 function **/
  }
};
</script>