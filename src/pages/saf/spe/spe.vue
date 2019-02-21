<!--
  목적 : 안전보호구 > 보호구 목록
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row ref="searchBox">
      <!-- 검색조건 -->
      <b-col sm="12">
        <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색"/>
            </div>
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                v-if="editable"
                :action-url="searchUrl"
                :param="searchParam"
                title="검색"
                color="green"
                action-type="GET"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="selSpeKindCds"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="보호구 종류"
                name="speKindCd"
                v-model="searchParam.speKindCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="보호구명"
                name="speNm"
                v-model="searchParam.speNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboRqstYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="신청대상여부"
                name="rqstYn"
                v-model="searchParam.rqstYn"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="selGiveKindCds"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="지급구분"
                name="giveKindCd"
                v-model="searchParam.giveKindCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="selGiveUnitCds"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="단위"
                name="giveUnitCd"
                v-model="searchParam.giveUnitCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboUseYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="사용여부"
                name="useYn"
                v-model="searchParam.useYn"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="정렬순서"
                name="sortOrder"
                v-model="searchParam.sortOrder"
              >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 보호구 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="설비 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :rows="3"
            :cellClick="true"
            v-model="spe"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            >
          </y-data-table>
        </b-col>

        <!-- 보호구 상세 -->
        <b-row class="mt-3" ref="detailBox">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="보호구 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="baseWidth"
                    :editable="editable"
                    :comboItems="insSpeKindCds"
                    :required="true"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="search"
                    label="보호구 종류"
                    name="speKindCd"
                    v-model="spe.speKindCd"
                    v-validate="'required'"
                    :state="validateState('speKindCd')"
                  />
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :required="true"
                    ui="bootstrap"
                    type="search"
                    label="보호구명"
                    name="speNm"
                    v-model="spe.speNm"
                    v-validate="'required'"
                    :state="validateState('speNm')"
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
                    label="신청대상여부"
                    name="useYn"
                    selectText="해당"
                    unselectText="미해당"
                    v-model="spe.rqstYn"
                    v-validate="'required'"
                    :state="validateState('rqstYn')"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="baseWidth"
                    :editable="editable"
                    :comboItems="selGiveKindCds"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="search"
                    label="지급구분"
                    name="giveKindCd"
                    v-model="spe.giveKindCd"
                  />
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="baseWidth"
                    :editable="editable"
                    :comboItems="insGiveUnitCds"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="search"
                    label="단위"
                    name="giveUnitCd"
                    v-model="spe.giveUnitCd"
                  />
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-switch
                    :width="baseWidth"
                    :editable="editable"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="사용 여부"
                    name="useYn"
                    selectText="사용"
                    unselectText="미사용"
                    v-model="spe.useYn"
                    v-validate="'required'"
                    :state="validateState('useYn')"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    ui="bootstrap"
                    type="search"
                    label="정렬순서"
                    name="sortOrder"
                    v-model="spe.sortOrder"
                  >
                  </y-text>
                </b-col>
              </b-row>
              <div class="float-right">
                <y-btn
                    v-if="editable"
                    title="초기화"
                    @btnClicked="btnClearClickedCallback" 
                  />
                  <y-btn
                    v-if="editable"
                    :action-url="insertUrl"
                    :param="spe"
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
                    :param="spe"
                    :is-submit="isEdit"
                    title="수정"
                    color="orange"
                    action-type="PUT"
                    beforeSubmit = "beforeEdit"
                    @beforeEdit="beforeEdit"
                    @btnClicked="btnEditClickedCallback" 
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
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'spe',
  props: {
  },
  data () {
    return {
      spe: {
        speKindCd: null,
        speNm: '',
        rqstYn: '',
        giveKindCd: null,
        giveUnitCd: null,
        useYn: 'Y',
        sortOrder: ''
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        speKindCd: '',
        speNm: '',
        rqstYn: '',
        giveKindCd: '',
        giveUnitCd: '',
        useYn: '',
        sortOrder: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      baseWidth: 8,
      editable: true,
      updateMode: false,
      selSpeKindCds: [], // 보호구 종류 - 검색조건
      insSpeKindCds: [], // 보호구 종류 - 상세
      comboRqstYnItems: [],  // 신청대상여부
      selGiveKindCds: [],  // 지급구분 - 검색조건
      insGiveKindCds: [],  // 지급구분 - 상세
      selGiveUnitCds: [],  // 단위 - 검색조건
      insGiveUnitCds: [],  // 단위 - 상세
      comboUseYnItems: [],  // 사용여부
      searchUrl: '',
      insertUrl: '',
      editUrl: '',
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeInsert () {
  },
  beforeEdit () {
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
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.saf.spe.list.url;
      this.insertUrl = transactionConfig.saf.spe.insert.url;
      this.editUrl = transactionConfig.saf.spe.edit.url;

      setTimeout(() => {
        this.comboRqstYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboRqstYnItems.push({ 'code': 'Y', 'codeNm': '해당' });
        this.comboRqstYnItems.push({ 'code': 'N', 'codeNm': '미해당' });

        this.comboUseYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboUseYnItems.push({ 'code': 'Y', 'codeNm': '사용' });
        this.comboUseYnItems.push({ 'code': 'N', 'codeNm': '미사용' });
      }, 200);

      this.getSpeKindCds(); // 보호구 종류
      this.getGiveKindCds(); // 지급구분
      this.getGiveUnitCds(); // 단위
      // this.getDataList();  // 보호구 grid
      this.setGridSize(); // 그리드 사이즈 조절

      // 보호구 grid 헤더 설정
      this.gridOptions.header = [
        { text: '보호구 종류명', name: 'speKindNm', width: '150px', align: 'left' },
        { text: '보호구명', name: 'speNm', width: '200px', align: 'left' },
        { text: '신청대상여부', name: 'rqstYn', width: '120px', align: 'center' },
        { text: '지급구분', name: 'giveKindNm', width: '120px', align: 'center' },
        { text: '단위', name: 'giveUnitNm', width: '100px', align: 'center' },
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
      ];
    },
    // 보호구 종류
    getSpeKindCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_SPE_KIND');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.selSpeKindCds = this.$_.clone(_result.data);
        this.selSpeKindCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.insSpeKindCds = this.$_.clone(_result.data);
        this.insSpeKindCds.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.spe.speKindCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 지급구분
    getGiveKindCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_GIVE_KIND');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.selGiveKindCds = this.$_.clone(_result.data);
        this.selGiveKindCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.insGiveKindCds = this.$_.clone(_result.data);
        this.insGiveKindCds.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.spe.giveKindCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 단위
    getGiveUnitCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_GIVE_UNIT');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.selGiveUnitCds = this.$_.clone(_result.data);
        this.selGiveUnitCds.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.insGiveUnitCds = this.$_.clone(_result.data);
        this.insGiveUnitCds.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.spe.giveUnitCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */
    
    /** /Call API service **/
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - this.$refs.detailBox.clientHeight - 260;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    
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
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    // 검색
    btnSearchClickedCallback (_result) {
      // this.getDataList();
    },
    // 초기화
    btnClearClickedCallback () {
      this.updateMode = false;
      Object.assign(this.$data.spe, this.$options.data().spe);

      this.spe.speKindCd = '';
      this.spe.giveKindCd = '';
      this.spe.giveUnitCd = '';
      this.$validator.reset();
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      // this.getDataList();
      this.updateMode = true;
      this.isInsert = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',
      });
    },
    // 수정
    btnEditClickedCallback (_result) {
      // this.getDataList();
      this.isEdit = false;
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
    },
    // 버튼 에러 처리
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