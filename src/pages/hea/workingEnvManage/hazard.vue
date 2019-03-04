
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
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색" />
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
                :width="7"
                :editable="editable"
                :comboItems="hazardGradSelItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="유해인자 분류"
                name="hazardGradCd"
                v-model="searchParam.hazardGradCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="7"
                :editable="editable"
                ui="bootstrap"
                type="search"
                label="유해인자명(한글)"
                name="hazardNmKo"
                v-model="searchParam.hazardNmKo"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="7"
                :editable="editable"
                :comboItems="comboSpecialYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="특수검진 여부"
                name="specialYn"
                v-model="searchParam.specialYn"
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
            :excel-down="true"
            :print="true"
            :rows="3"
            :cellClick="true"
            v-model="hazard"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="selectedRow"
            >
          </y-data-table>
        </b-col>
        
        <!-- 유해인자 상세 -->
        <b-row class="mt-3" ref="detailBox">
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
                    :width="8"
                    :editable="editable"
                    :comboItems="hazardGradInsItems"
                    :required="true"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    label="유해인자 분류"
                    name="hazardGradCd"
                    v-model="hazard.hazardGradCd"
                    v-validate="'required'"
                    :state="validateState('hazardGradCd')"
                  >
                  </y-select>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="5"
                    :disabled="true"
                    ui="bootstrap"
                    label="유해인자 코드"
                    name="hazardCd"
                    v-model="hazard.hazardCd"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    label="유해인자명(한글)"
                    name="hazardNmKo"
                    v-model="hazard.hazardNmKo"
                    v-validate="'required'"
                    :state="validateState('hazardNmKo')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    label="유해인자명(영문)"
                    name="hazardNmEn"
                    v-model="hazard.hazardNmEn"
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
                    label="특수검진 여부"
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
              <div class="float-right">
                <y-btn
                    v-if="editable"
                    title="초기화"
                    @btnClicked="btnClearClickedCallback" 
                  />
                  <y-btn
                    v-if="editable"
                    :action-url="insertUrl"
                    :param="hazard"
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
                    :param="hazard"
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
  name: 'hazard',  
  props: {
  },
  data () {
    return {
      hazard: {
        hazardCd: null,
        hazardGradCd: null,
        hazardNmKo: '',
        hazardNmEn: '',
        specialYn: '',
        useYn: 'Y',
        processNos: [],
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        hazardGradCd: '',
        hazardNmKo: null,
        specialYn: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      baseWidth: 8,
      editable: true,
      updateMode: false,
      searchUrl: '',
      insertUrl: '',
      editUrl: '',
      hazardGradSelItems: [],
      hazardGradInsItems: [],
      comboSpecialYnItems: [],
      processItems: [],
      isInsert: false,
      isEdit: false,  
    };
  },
  beforeMount () {
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
  methods: {
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.hazard.list.url;
      this.insertUrl = transactionConfig.hazard.insert.url;
      this.editUrl = transactionConfig.hazard.edit.url;
      
      setTimeout(() => {
        this.comboSpecialYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboSpecialYnItems.push({ 'code': 'Y', 'codeNm': '관련' });
        this.comboSpecialYnItems.push({ 'code': 'N', 'codeNm': '미관련' });

        this.getComboItems();
        this.getDataList();
      }, 200);

      // 유해인자 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '유해인자 분류', name: 'hazardGradNm', width: '25%', align: 'center' },
        { text: '유해인자명(한글)', name: 'hazardNmKo', width: '30%', align: 'center' },
        { text: '유해인자명(영문)', name: 'hazardNmEn', width: '30%', align: 'center' },
        { text: '특수검진 관련 여부', name: 'specialYnNm', width: '30%', align: 'center' },
        { text: '사용 여부', name: 'useYnNm', width: '20%', align: 'center' },
      ];
    },

    // 유해인자 분류
    getComboItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_HAZARD_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.hazardGradSelItems = this.$_.clone(_result.data);
        this.hazardGradSelItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.hazardGradInsItems = this.$_.clone(_result.data);
        this.hazardGradInsItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
      }, (_error) => {
      });
    },
    // 유해인자 그리드
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
    // 그리드 row click 이벤트
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.hazard.get.url, data.hazardCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.hazard = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
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
    
    /** validation checking **/
    beforeInsert () {
      var hazardNmKos = this.$_.map(this.gridOptions.data, 'hazardNmKo');
      if (this.$_.indexOf(hazardNmKos, this.hazard.hazardNmKo) > -1) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 유해인자명(한글)이 존재합니다.',
          type: 'warning',
        });
        return;
      }
      // if (window.confirm("저장하시겠습니까?")) {
      //   this.checkValidationInsert();
      // }
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '저장하시겠습니까?',
        type: 'info',  
        confirmCallback: () => {
          this.checkValidationInsert();
        }
      });
    },
    beforeEdit () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '수정하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.checkValidationEdit();
        }
      });
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
    
    /** Button Event **/
    // 검색
    btnSearchClickedCallback (_result) {
      this.getDataList();
    },
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
      
      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
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
      this.hazard.hazardCd = _result.data;
      this.getDataList();
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
      this.getDataList();
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
      this.isInsert = false;
      this.isEdit = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
  }
};
</script>