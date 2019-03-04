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
                title="검색"
                color="green"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
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
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 보호구 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="보호구 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :rows="5"
            :cellClick="true"
            v-model="spe"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="selectedRow"
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
                    :required="true"
                    :maxlength="30"
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
                    :required="true"
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
                    :required="true"
                    :comboItems="insGiveKindCds"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="search"
                    label="지급구분"
                    name="giveKindCd"
                    v-model="spe.giveKindCd"
                    v-validate="'required'"
                    :state="validateState('giveKindCd')"
                  />
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-select
                    :width="baseWidth"
                    :required="true"
                    :comboItems="insGiveUnitCds"
                    itemText="codeNm"
                    itemValue="code"
                    ui="bootstrap"
                    type="search"
                    label="단위"
                    name="giveUnitCd"
                    v-model="spe.giveUnitCd"
                    v-validate="'required'"
                    :state="validateState('giveUnitCd')"
                  />
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
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
                    v-model="spe.useYn"
                    v-validate="'required'"
                    :state="validateState('useYn')"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :maxlength="7"
                    ui="bootstrap"
                    type="search"
                    label="현재고"
                    name="nowStock"
                    v-model="spe.nowStock"
                  >
                  </y-number>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :required="true"
                    :maxlength="5"
                    ui="bootstrap"
                    type="search"
                    label="정렬순서"
                    name="sortOrder"
                    v-model="spe.sortOrder"
                    v-validate="'required'"
                    :state="validateState('sortOrder')"
                  >
                  </y-number>
                </b-col>
              </b-row>
              <div class="float-right">
                <y-btn
                    title="초기화"
                    @btnClicked="btnClearClickedCallback" 
                  />
                  <y-btn
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
                    v-if="this.spe.safSpeNo > 0"
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
  name: 'spe',
  props: {
  },
  data () {
    return {
      spe: {
        safSpeNo: 0,
        speKindCd: null,
        speNm: '',
        rqstYn: 'Y',
        giveKindCd: null,
        giveUnitCd: null,
        useYn: 'Y',
        nowStock: '0',
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
      },
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      baseWidth: 8,
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
      isInsert: false,
      isEdit: false,  
      isDelete: false,  
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

      this.setGridSize(); // 그리드 사이즈 조절
      this.getSpeKindCds(); // 보호구 종류
      this.getGiveKindCds(); // 지급구분
      this.getGiveUnitCds(); // 단위
      this.getDataList();  // 보호구 grid

      // 보호구 grid 헤더 설정
      this.gridOptions.header = [
        { text: '보호구 종류', name: 'speKindNm', width: '130px', align: 'center' },
        { text: '보호구명', name: 'speNm', width: '200px', align: 'left' },
        { text: '신청대상여부', name: 'rqstYnNm', width: '120px', align: 'center' },
        { text: '지급구분', name: 'giveKindNm', width: '110px', align: 'center' },
        { text: '단위', name: 'giveUnitNm', width: '80px', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
        { text: '현재고', name: 'nowStock', width: '100px', align: 'right' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
      ];
    },
    // 보호구 종류
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

    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        var speNms = this.$_.map(this.gridOptions.data, 'speNm');
        var sortOrders = this.$_.map(this.gridOptions.data, 'sortOrder');
        if (this.$_.indexOf(speNms, this.spe.speNm) > -1) {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '이미 같은 이름의 보호구가 존재합니다.',
            type: 'warning',
          });
          return;
        } else if (this.$_.indexOf(sortOrders, this.spe.sortOrder) > -1) {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '이미 존재하는 정렬순서입니다.',
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
              this.isInsert = false;
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

      this.$http.url = this.$format(selectConfig.saf.spe.get.url, data.safSpeNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.spe = this.$_.clone(_result.data);
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
      Object.assign(this.$data.spe, this.$options.data().spe);

      this.spe.speKindCd = '';
      this.spe.giveKindCd = '';
      this.spe.giveUnitCd = '';
      this.$validator.reset();
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.getDataList();
      this.isInsert = false;
      this.spe.safSpeNo = _result.data;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
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
      this.isInsert = false;
      this.isEdit = false;
      this.isDelete = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
  }
};
</script>