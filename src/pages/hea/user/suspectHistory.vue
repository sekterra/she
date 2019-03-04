<!--
  목적 : 유소견자 이력
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="suspectHistoryDiv">
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
                <y-datepicker
                  :width="baseWidth"
                  :editable="editable"
                  :range="true"
                  label="기간"
                  name="visitPeriod"
                  v-model="searchParam.visitPeriod"
                >
                </y-datepicker>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- 유소견자 이력 grid-->
      <b-row class="mt-3">
        <b-col sm="12">
          <b-col sm="12" class="px-0">
            <y-data-table 
              label="유소견자 이력"
              :headers="suspectHistoryGridHeaderOptions"
              :items="suspectHistoryGridData"
              :editable="editable"
              :excel-down="true"
              :print="true"
              :rows="6"
              v-model="consult"
              ref="dataTable"
            @selectedRow="selectedRow"
              >
            </y-data-table>
          </b-col>

          <b-row class="mt-3">
            <b-col sm="12">
              <b-row>
                <b-col sm="12">
                  <y-label label="유소견자 이력 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
              <b-card>
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="baseWidth"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="상담일"
                      name="visitYmd"
                      v-model="consult.visitYmd"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="baseWidth"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="유소견자"
                      name="userNm"
                      v-model="consult.userNm"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="baseWidth"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="상담자"
                      name="counselor"
                      v-model="consult.counselor"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="baseWidth"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="유소견자 지정일"
                      name="beManagedYmd"
                      v-model="consult.beManagedYmd"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="baseWidth"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="유소견자 제외일"
                      name="notManagedYmd"
                      v-model="consult.notManagedYmd"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="과거력"
                      name="diseasePast"
                      v-model="consult.diseasePast"
                    >
                    </y-textarea>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="현 병력"
                      name="diseaseCurr"
                      v-model="consult.diseaseCurr"
                    >
                    </y-textarea>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="증상"
                      name="symptom"
                      v-model="consult.symptom"
                    >
                    </y-textarea>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-textarea
                      :width="10"
                      :editable="editable"
                      :disabled="disabled"
                      ui="bootstrap"
                      label="상담 내용"
                      name="remark"
                      v-model="consult.remark"
                    >
                    </y-textarea>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  name: 'suspect-history',
  props: {
  },
  data () {
    return {
      consult: {
        visitYmd: '',
        userNm: '',
        counselor: '',
        beManagedYmd: '',
        notManagedYmd: '',
        diseasePast: '',
        diseaseCurr: '',
        symptom: '',
        remark: '',
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        visitPeriod: null,
        userId: 'dev',
      },
      baseWidth: 8,
      editable: true,
      disabled: true,
      suspectHistoryGridData: [],
      suspectHistoryGridHeaderOptions: [],
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
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
      this.searchUrl = selectConfig.consult.list.url;

      setTimeout(() => {
        this.getDataList();
      }, 200);

      // 유소견자 이력 그리드 헤더 설정
      this.suspectHistoryGridHeaderOptions = [
        { text: '상담일', name: 'visitYmd', width: '25%', align: 'center' },
        { text: '유소견자 지정일', name: 'beManagedYmd', width: '30%', align: 'center' },
        { text: '유소견자 제외일', name: 'notManagedYmd', width: '30%', align: 'center' },
        { text: '과거력', name: 'diseasePast', width: '20%', align: 'left' },
        { text: '현 병력', name: 'diseaseCurr', width: '20%', align: 'left' },
        { text: '증상', name: 'symptom', width: '30%', align: 'left' },
        { text: '상담내용', name: 'remark', width: '30%', align: 'left' }
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service **/
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.suspectHistoryGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.consult.get.url, data.heaConsultNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        Object.assign(this.consult, _result.data);
      }, (_error) => {
        console.log(_error);
      });
    },
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    checkValidation () {
      this.validator.validateAll().then((_result) => {
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
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    // 검색
    btnSearchClickedCallback () {
      this.getDataList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    // 검색박스숨기기
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';
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