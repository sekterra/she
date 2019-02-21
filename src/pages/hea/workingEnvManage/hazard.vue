
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
                :width="7"
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
                :width="7"
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
                :width="7"
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
                    :width="8"
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
                    :width="8"
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
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    label="유해인자명(영문)"
                    name="heaHazardNmEn"
                    v-model="hazard.heaHazardNmEn"
                  >
                  </y-text>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-multi-select
                    :width="10"
                    :editable="editable"
                    :comboItems="processItems"
                    type="edit"
                    itemText="processNm"
                    itemValue="processNo"
                    ui="bootstrap"
                    label="공정"
                    name="processNo"
                    v-model="processNos"
                  >
                  </y-multi-select> 
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-2">
                  <y-switch
                    :width="6"
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
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-2">
                  <y-switch
                    :width="6"
                    :editable="editable"
                    :required="true"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="작업환경 여부"
                    name="workEnvYn"
                    selectText="관련"
                    unselectText="미관련"
                    v-model="hazard.workEnvYn"
                    v-validate="'required'"
                    :state="validateState('workEnvYn')"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-2">
                  <y-switch
                    :width="6"
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
        heaHazardCd: null,
        heaHazardClassCd: null,
        heaHazardNmKo: '',
        heaHazardNmEn: '',
        specialYn: '',
        workEnvYn: '',
        useYn: 'Y',
        processNos: [],
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        heaHazardClassCd: '',
        heaHazardNmKo: null,
        specialYn: '',
        workEnvYn: '',
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
      hazardClassSelItems: [],
      hazardClassInsItems: [],
      comboSpecialYnItems: [],
      comboWorkEnvYnItems: [],
      processItems: [],
      processNos: [],
      isInsert: false,
      isEdit: false,  
    };
  },
  watch: {
    // 공정 콤보박스
    processNos () {
      this.hazard.processNos = this.$_.map(this.processNos, 'code');
    }
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

        this.comboWorkEnvYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboWorkEnvYnItems.push({ 'code': 'Y', 'codeNm': '관련' });
        this.comboWorkEnvYnItems.push({ 'code': 'N', 'codeNm': '미관련' });

        this.getComboItems();
        this.getProcessItems();
        this.getDataList();
      }, 200);

      // 유해인자 그리드 헤더 설정
      this.gridOptions.header = [
        { text: 'NO', name: 'rowNum', width: '15%', align: 'center' },
        { text: '유해인자 분류', name: 'heaHazardClassNm', width: '25%', align: 'center' },
        { text: '유해인자명(한글)', name: 'heaHazardNmKo', width: '30%', align: 'center' },
        { text: '유해인자명(영문)', name: 'heaHazardNmEn', width: '30%', align: 'center' },
        { text: '특수검진 관련 여부', name: 'specialYn', width: '30%', align: 'center' },
        { text: '작업환경 관련 여부', name: 'workEnvYn', width: '30%', align: 'center' },
        { text: '사용 여부', name: 'useYn', width: '20%', align: 'center' },
      ];
    },

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
    // 공정
    getProcessItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.processItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
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

      this.$http.url = this.$format(selectConfig.hazard.get.url, data.heaHazardCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.hazard = this.$_.clone(_result.data);

        // 공정
        this.$http.url = selectConfig.manage.process.list.url;
        this.$http.type = 'GET';
        this.$http.param = {
          'heaHazardCd': this.hazard.heaHazardCd
        };
        this.$http.request((_result) => {
          var options = [];
          this.$_.forEach(_result.data, (_item) => {
            options.push({
              name: _item['processNm'],
              code: _item['processNo']
            });
          });
          this.processNos = options;
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', _error);
        });
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
      var heaHazardNmKos = this.$_.map(this.gridOptions.data, 'heaHazardNmKo');
      if (this.$_.indexOf(heaHazardNmKos, this.hazard.heaHazardNmKo) > -1) {
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
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭되었습니다.');
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
      this.hazard.heaHazardCd = _result.data;
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