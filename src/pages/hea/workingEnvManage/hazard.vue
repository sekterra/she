
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
                  :param="searchParam"
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
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="유해인자 분류"
                name="heaHazardClassCd"
                v-model="searchParam.heaHazardClassCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="유해인자명(한글)"
                name="heaHazardNmKo"
                v-model="searchParam.heaHazardNmKo"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboSpecialYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="특수검진 관련 여부"
                name="specialYn"
                v-model="searchParam.specialYn"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboWorkEnvYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="작업환경 관련 여부"
                name="workEnvYn"
                v-model="searchParam.workEnvYn"
              >
              </y-select>
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
            gridType="edit"
            :headers="hazardGridHeaderOptions"
            :items="hazardGridData"
            :excel-down="true"
            :print="true"
            :rows="3"
            :cellClick="true"
            v-model="hazard"
            ref="dataTable"
            @selectedRow="selectedRow"
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
                    :width="baseWidth"
                    :editable="editable"
                    :comboItems="hazardClassInsItems"
                    :required="true"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    label="유해인자 분류"
                    name="heaHazardClassCd"
                    v-model="hazard.heaHazardClassCd"
                    v-validate="'required'"
                    :state="validateState('heaHazardClassCd')"
                  >
                  </y-select>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="5"
                    :disabled="true"
                    ui="bootstrap"
                    label="유해인자 코드"
                    name="heaHazardCd"
                    v-model="hazard.heaHazardCd"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    label="유해인자명(한글)"
                    name="heaHazardNmKo"
                    v-model="hazard.heaHazardNmKo"
                    v-validate="'required'"
                    :state="validateState('heaHazardNmKo')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    label="유해인자명(영문)"
                    name="heaHazardNmEn"
                    v-model="hazard.heaHazardNmEn"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-switch
                    :width="baseWidth"
                    :editable="editable"
                    :required="true"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="특수검진 관련 여부"
                    name="specialYn"
                    selectText="관련"
                    unselectText="미관련"
                    v-model="hazard.specialYn"
                    v-validate="'required'"
                    :state="validateState('specialYn')"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-switch
                    :width="baseWidth"
                    :editable="editable"
                    :required="true"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="작업환경 관련 여부"
                    name="workEnvYn"
                    selectText="관련"
                    unselectText="미관련"
                    v-model="hazard.workEnvYn"
                    v-validate="'required'"
                    :state="validateState('workEnvYn')"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-switch
                    :width="baseWidth"
                    :editable="editable"
                    :required="true"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="사용 여부"
                    name="useYn"
                    selectText="사용"
                    unselectText="미사용"
                    v-model="hazard.useYn"
                    v-validate="'required'"
                    :state="validateState('useYn')"
                    >
                  </y-switch>
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
                    :action-url="insertUrl"
                    :param="hazard"
                    :is-submit="isInsert"
                    type="save"
                    title="신규등록"
                    size="small"
                    color="warning"
                    action-type="POST"
                    beforeSubmit = "beforeInsert"
                    @beforeInsert="beforeInsert"
                    @btnClicked="btnInsertClickedCallback" 
                    @btnClickedErrorCallback="btnClickedErrorCallback"
                  />
                  <y-btn
                    v-if="editable&&updateMode"
                    :action-url="editUrl"
                    :param="hazard"
                    :is-submit="isEdit"
                    type="save"
                    title="수정"
                    size="small"
                    color="warning"
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
  name: 'hazard',  
  props: {
  },
  data () {
    return {
      hazard: {
        heaHazardCd: null,
        heaHazardClassCd: null,
        heaHazardNmKo: '',
        heaHazardNmEn: '',
        specialYn: '',
        workEnvYn: '',
        useYn: 'Y',
        createUserId: '',
      },
      searchParam: {
        heaHazardClassCd: '',
        heaHazardNmKo: null,
        specialYn: '',
        workEnvYn: '',
      },
      baseWidth: 8,
      editable: true,
      updateMode: false,
      searchUrl: '',
      insertUrl: '',
      editUrl: '',
      hazardClassSelItems: [],
      hazardClassInsItems: [],
      comboSpecialYnItems: [],
      comboWorkEnvYnItems: [],
      isInsert: false,
      isEdit: false,  
      hazardGridData: [],
      hazardGridHeaderOptions: [],
    };
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    // this.getComboItems();  // 유해인자 분류
    // this.getDataList();
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
      // URL 셋팅
      this.searchUrl = selectConfig.hazard.list.url;
      this.insertUrl = transactionConfig.hazard.insert.url;
      this.editUrl = transactionConfig.hazard.edit.url;
      
      setTimeout(() => {
        this.comboSpecialYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboSpecialYnItems.push({ 'code': 'Y', 'codeNm': '관련' });
        this.comboSpecialYnItems.push({ 'code': 'N', 'codeNm': '미관련' });

        this.comboWorkEnvYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboWorkEnvYnItems.push({ 'code': 'Y', 'codeNm': '관련' });
        this.comboWorkEnvYnItems.push({ 'code': 'N', 'codeNm': '미관련' });

        this.getComboItems();  // 유해인자 분류
        this.getDataList();
      }, 200);

      // 유해인자 그리드 헤더 설정
      this.hazardGridHeaderOptions = [
        { text: 'NO', name: 'rowNum', width: '15%', align: 'center' },
        { text: '유해인자 분류', name: 'heaHazardClassNm', width: '25%', align: 'center' },
        { text: '유해인자명(한글)', name: 'heaHazardNmKo', width: '30%', align: 'center' },
        { text: '유해인자명(영문)', name: 'heaHazardNmEn', width: '30%', align: 'center' },
        { text: '특수검진 관련 여부', name: 'specialYn', width: '30%', align: 'center' },
        { text: '작업환경 관련 여부', name: 'workEnvYn', width: '30%', align: 'center' },
        { text: '사용 여부', name: 'useYn', width: '20%', align: 'center' },
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service **/
    // 유해인자 분류
    getComboItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_HAZARD_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.hazardClassSelItems = this.$_.clone(_result.data);
        this.hazardClassSelItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.hazardClassInsItems = this.$_.clone(_result.data);
        this.hazardClassInsItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.hazard.heaHazardClassCd = '';
      }, (_error) => {
      });
    },
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.hazardGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.hazard.get.url, data.heaHazardCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        Object.assign(this.hazard, _result.data);
      }, (_error) => {
        console.log(_error);
      });
    },
    /** /Call API service **/
    
    /** validation checking **/
    beforeInsert () {
      if (window.confirm("저장하시겠습니까?"))
      {
        this.checkValidationInsert();
      }
    },
    beforeEdit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationEdit();
      }
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        if (!this.isInsert) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    checkValidationEdit () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        if (!this.isEdit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEdit = false;
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
    // 검색
    btnSearchClickedCallback (_result) {
      this.getDataList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭되었습니다.');
    },
    // 초기화
    btnClearClickedCallback () {
      this.updateMode = false;
      Object.assign(this.$data.hazard, this.$options.data().hazard);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.hazard.heaHazardCd = _result.data;
      this.getDataList();
      this.updateMode = true;
      this.isInsert = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    // 수정
    btnEditClickedCallback (_result) {
      this.getDataList();
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.isInsert = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      this.isEdit = false;
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>