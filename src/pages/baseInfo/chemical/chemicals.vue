<!--
  목적 : 직무위험성평가 > 기초정보 > 화학물질관리
  작성자 : kth
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
                title="검색"
                color="green"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="CAS No."
                name="casNo"
                v-model="searchParam.casNo"
                >
                </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="화학물질명(KOR)"
                name="chemNmKr"
                v-model="searchParam.chemNmKr"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="화학물질명(ENG)"
                name="chemNmEn"
                v-model="searchParam.chemNmEn"
              >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 화학물질 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="화학물질 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :rows="5"
            :cellClick="true"
            v-model="chemical"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            >
          </y-data-table>
        </b-col>
        <!-- @selectedRow="selectedRow" 추가할 것 -->
        <!-- 화학물질 상세 -->
        <b-row class="mt-3" ref="detailBox">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="상세정보" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                  <y-text
                    :width="baseWidth"
                    :required="true"
                    :maxlength="20"
                    ui="bootstrap"
                    type="search"
                    label="Cas No. "
                    name="casNo"
                    v-model="chemical.casNo"
                    v-validate="'required'"
                    :state="validateState('casNo')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                  <y-text
                    :width="baseWidth"
                    :required="true"
                    :maxlength="30"
                    ui="bootstrap"
                    type="search"
                    label="화학물질명 (KOR)"
                    name="chemNmKr"
                    v-model="chemical.chemNmKr"
                    v-validate="'required'"
                    :state="validateState('chemNmKr')"
                  >
                  </y-text>
                </b-col>
                 <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                  <y-text
                    :width="baseWidth"
                    :required="true"
                    :maxlength="30"
                    ui="bootstrap"
                    type="search"
                    label="화학물질명 (ENG)"
                    name="chemNmEn"
                    v-model="chemical.chemNmEn"
                    v-validate="'required'"
                    :state="validateState('chemNmEn')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                  <y-switch
                    :width="baseWidth"
                    :required="true"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="사용 여부"
                    name="useYn"
                    selectText="사용"
                    unselectText="미사용"
                    v-model="chemical.useYn"
                    v-validate="'required'"
                    :state="validateState('useYn')"
                    >
                  </y-switch>
                </b-col>
                <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :required="true"
                    :maxlength="5"
                    ui="bootstrap"
                    type="search"
                    label="정렬순서"
                    name="sortOrder"
                    v-model="chemical.sortOrder"
                    v-validate="'required'"
                    :state="validateState('sortOrder')"
                  >
                  </y-number>
                </b-col> -->
              </b-row>
              <div class="float-right">
                <y-btn
                    v-if="editable"
                    title="초기화"
                    @btnClicked="btnClearClickedCallback" 
                  />
                  <y-btn
                    :action-url="insertUrl"
                    :param="chemical"
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
                    v-if="this.chemical.chemNo > 0"
                    :action-url="editUrl"
                    :param="chemical"
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
  name: 'chemical',
  props: {
  },
  data () {
    return {
      chemical: {
        chemNo: 0,
        casNo: '',
        chemNmKr: '',
        chemNmEn: '',
        useYn: 'Y',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        casNo: '',
        chemNmKr: '',
        chemNmEn: '',
        useYn: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      baseWidth: 8,
      editable: true,
      updateMode: false,
      selSpeKindCds: [], // 화학물질 종류 - 검색조건
      insSpeKindCds: [], // 화학물질 종류 - 상세
      comboRqstYnItems: [],  // 신청대상여부
      selGiveKindCds: [],  // 지급구분 - 검색조건
      insGiveKindCds: [],  // 지급구분 - 상세
      selGiveUnitCds: [],  // 단위 - 검색조건
      insGiveUnitCds: [],  // 단위 - 상세
      comboUseYnItems: [],  // 사용여부
      searchUrl: '',
      insertUrl: '',
      editUrl: '',
      isInsert: false,
      isEdit: false,  
      isDelete: false,  
      isSubmit: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
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
      this.searchUrl = selectConfig.baseinfo.chemical.list.url;
      this.insertUrl = transactionConfig.baseinfo.chemical.insert.url;
      this.editUrl = transactionConfig.baseinfo.chemical.edit.url;

      setTimeout(() => {
        this.comboRqstYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboRqstYnItems.push({ 'code': 'Y', 'codeNm': '해당' });
        this.comboRqstYnItems.push({ 'code': 'N', 'codeNm': '미해당' });

        this.comboUseYnItems.push({ 'code': '', 'codeNm': '전체' });
        this.comboUseYnItems.push({ 'code': 'Y', 'codeNm': '사용' });
        this.comboUseYnItems.push({ 'code': 'N', 'codeNm': '미사용' });
      }, 200);

      // this.setGridSize();
      // this.getSpeKindCds(); // 화학물질 종류
      // this.getGiveKindCds(); // 지급구분
      // this.getGiveUnitCds(); // 단위
      this.getDataList();  // 화학물질 grid
      this.setGridSize(); // 그리드 사이즈 조절

      // 화학물질 grid 헤더 설정
      this.gridOptions.header = [
        { text: 'Cas No.', name: 'casNo', width: '150px', align: 'center' },
        { text: '화학물질명 (KOR)', name: 'chemNmKr', width: '200px', align: 'left' },
        { text: '화학물질명 (ENG)', name: 'chemNmEn', width: '120px', align: 'center' },
        // { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
      ];
    },
    // 화학물질 종류
    getSpeKindCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_SPE_KIND');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.selSpeKindCds = this.$_.clone(_result.data);
        this.selSpeKindCds.splice(0, 0, { 'code': null, 'codeNm': '전체' });
        this.insSpeKindCds = this.$_.clone(_result.data);
        this.insSpeKindCds.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
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
        this.selGiveKindCds.splice(0, 0, { 'code': null, 'codeNm': '전체' });
        this.insGiveKindCds = this.$_.clone(_result.data);
        this.insGiveKindCds.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
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
        this.selGiveUnitCds.splice(0, 0, { 'code': null, 'codeNm': '전체' });
        this.insGiveUnitCds = this.$_.clone(_result.data);
        this.insGiveUnitCds.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 화학물질 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      console.log(this.searchUrl);
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        var casNo = this.$_.map(this.gridOptions.data, 'casNo');
        if (this.$_.indexOf(casNo, this.chemical.casNo) > -1) {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '이미 같은 이름의 화학물질이 존재합니다.',
            type: 'warning',
          });
          return;
        }

        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '등록하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            cancelCallback: () => {
              this.isEdit = false;
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
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '수정하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.isEdit = true;
        },
        cancelCallback: () => {
          this.isEdit = false;
        }
      });
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
    // 그리드 row click 이벤트
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.saf.chemical.get.url, data.chemNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.chemical = this.$_.clone(_result.data);
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
    
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
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
      this.getDataList();
    },
    // 초기화
    btnClearClickedCallback () {
      this.updateMode = false;
      Object.assign(this.$data.chemical, this.$options.data().chemical);

      this.chemical.casNo = '';
      this.chemical.chemNmKr = '';
      this.chemical.chemNmEn = '';
      this.$validator.reset();
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.getDataList();
      this.updateMode = true;
      this.isInsert = false;
      this.chemical.safSpeNo = _result.data;
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
  }
};
</script>