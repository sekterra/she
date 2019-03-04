<!--
  목적 : 질환 기준정보 - 질환
  Detail : 질환 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header" >
              <y-label label="검색" />
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                title="검색"
                color="green"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboDisaseTypeSelectItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="질환종류"
                name="heaDiseaseClassCd"
                v-model="searchParam.heaDiseaseClassCd"
              >
            </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="baseWidth"
              ui="bootstrap"
              label="질환명"
              name="heaDiseaseNm"
              v-model="searchParam.heaDiseaseNm"
              >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :useRownum="false"
            @selectedRow="selectedRow"
            label="질환 목록"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>

      <!-- 등록 -->
      <b-row class="mt-3" ref="editBox">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="질환 상세" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
          <b-card >
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :comboItems="comboDisaseTypeItems"
                  :required="true"
                  itemText="codeNm"
                  itemValue="code"
                  ui="bootstrap"
                  label="질환종류명"
                  name="heaDiseaseClassCd"
                  v-model="disease.heaDiseaseClassCd"
                  v-validate="'required'"
                  :state="validateState('heaDiseaseClassCd')"
                >
              </y-select>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                :width="8"
                :maxlength="30"
                :required="true"
                ui="bootstrap"
                label="질환명"
                name="heaDiseaseNm"
                v-model="disease.heaDiseaseNm"
                v-validate="'required'"
                :state="validateState('heaDiseaseNm')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                :width="8"
                :maxlength="5"
                :disabled="true"
                ui="bootstrap"
                label="질환코드"
                name="heaDiseaseCd"
                v-model="disease.heaDiseaseCd"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-number
                :width="8"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="정렬순서"
                name="sortOrder"
                v-model="disease.sortOrder"
                >
                </y-number>
              </b-col>
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                <y-textarea
                  :width="10"
                  :maxlength="150"
                  ui="bootstrap"
                  label="비고"
                  name="remark"
                  v-model="disease.remark"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-switch
                  :width="8"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="사용여부"
                  name="radioValue"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="disease.useYn"
                >
              </y-switch>
              </b-col>
            </b-row>
            <div class="float-right mt-3">
                <y-btn
                  title="초기화"
                  @btnClicked="btnClearClickedCallback" 
                  />
                <y-btn
                  :action-url="insertUrl"
                  :param="disease"
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
                  v-if="editable"
                  :action-url="editUrl"
                  :param="disease"
                  :is-submit="isEdit"
                  title="수정"
                  color="orange"
                  action-type="PUT"
                  beforeSubmit = "beforeSubmit"
                  @beforeSubmit="beforeSubmit"
                  @btnClicked="btnSaveClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                  />
              </div>
          </b-card>
        </b-col>
      </b-row>

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-deisease',
  props: {
  },
  data: () => ({
    disease: {
      heaDiseaseClassCd: null,
      heaDiseaseClassNm: '',
      heaDiseaseCd: '',
      heaDiseaseNm: '',
      remark: '',
      sortOrder: '',
      useYn: 'Y',
      updateUserId: '',
      createUserId: '',
    },
    searchParam: {
      heaDiseaseClassCd: '',
      heaDiseaseNm: '',
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    comboDisaseTypeItems: [],
    comboDisaseTypeSelectItems: [],
    radioItems: null,
    editUrl: '',
    insertUrl: '',
    searchUrl: '',
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
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
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.disease.list.url;
        this.editUrl = transactionConfig.disease.edit.url;
        this.insertUrl = transactionConfig.disease.insert.url;
        // radio 버튼 셋팅
        this.radioItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '질환종류', name: 'heaDiseaseClassNm', width: '180px', },
        { text: '질환명', name: 'heaDiseaseNm', width: '210px', },
        { text: '질환코드', name: 'heaDiseaseCd', width: '100px', align: 'center' },
        { text: '비고', name: 'remark', width: '450px' },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
      ];
      this.getComboItems('HEA_DISEASE_CLASS'); // 질환종류
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 질환 상세 조회
     * 질환 목록 row 클릭시 마다 발생
     * data : 클릭한 row 정보
     */
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.disease.get.url, data.heaDiseaseCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        this.disease = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 공통 마스터 정보 조회 (질환종류)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDisaseTypeItems = this.$_.clone(_result.data);
        this.comboDisaseTypeItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.comboDisaseTypeSelectItems = this.$_.clone(_result.data);
        this.comboDisaseTypeSelectItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        this.searchParam.heaDiseaseClassCd = '';
        this.getList();
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          // this.isEdit = window.confirm("수정하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isEdit = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isEdit = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isEdit = false;
      });
    },
    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      var heaDiseaseNms = this.$_.map(this.gridOptions.data, 'heaDiseaseNm');
      if (this.$_.indexOf(heaDiseaseNms, this.disease.heaDiseaseNm) > -1) {
        // window.alert("이미 같은 이름의 질환명이 존재합니다.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 질환명이 존재합니다.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          // this.isInsert = window.confirm("저장하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isInsert = false;
      });
    },
    /**
     * 필수입력값 유효성 검사
     */
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    /** 질환 목록 조회 **/
    getList () {
      this.$http.url = selectConfig.disease.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - this.$refs.editBox.clientHeight - 250;
        this.gridOptions.height = calculatedHeight <= 250 ? defaultHeight : calculatedHeight;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검색박스 숨기기/보이기 처리 후 setGridSize 호출
     */
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    /**
     * 검색 조건에 따른 데이터 조회 후 질환 목록에 리스트 적용
     * _result : backend에서 return하는 데이터
     */
    btnSearchClickedCallback (_result) {
      this.isInsert = false;
      this.gridOptions.data = this.$_.clone(_result.data);
    },
    /**
     * 질환 목록 조회
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      this.getList();
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
    },
    /**
     * 질환 목록 조회 및 수정버튼 보여지도록 처리
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.disease.heaDiseaseCd = _result.data;
      this.getList();
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isInsert = false;
      this.editable = true;
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      this.editable = false;
      Object.assign(this.$data.disease, this.$options.data().disease);
      this.$validator.reset();
    },
    /**
     * 수정 버튼 안보여지도록 처리 및 isSubmit false 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.editable = false;
      this.isInsert = false;
      this.isEdit = false;
      this.btnClearClickedCallback();
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>