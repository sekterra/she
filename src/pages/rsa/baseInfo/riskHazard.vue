<!--
  목적 : 위험성평가 > 기준정보 > 유해위험요인 관리
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
                :width="8"
                :comboItems="comboAssessTypeNos"
                itemText="assessNm"
                itemValue="assessTypeNo"
                ui="bootstrap"
                type="search"
                label="평가기법"
                name="assessTypeNo"
                v-model="searchParam.assessTypeNo"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="pRiskHazardNos"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="search"
                label="유해위험요인 Lv1"
                name="pRiskHazardNo"
                v-model="searchParam.pRiskHazardNo"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :required="true"
                ui="bootstrap"
                label="유해위험요인 Lv2"
                name="assessNm"
                v-model="riskHazard.assessNm"
                v-validate="'required'"
                :state="validateState('assessNm')"
              >
              </y-text>
            </b-col>
          </b-row>
        </b-card>

        <b-col sm="12" class="px-0 mt-3">
          <!-- 유해위험요인 grid -->
          <y-data-table 
            label="유해위험요인 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :cellClick="true"
            v-model="riskHazard"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="selectedRow"
            >
          </y-data-table>
        </b-col>
      
        <!-- 유해위험요인 상세 -->
        <b-row class="mt-3" ref="detailBox">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="유해위험요인 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="8"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    label="유해위험요인명"
                    name="assessNm"
                    v-model="riskHazard.assessNm"
                    v-validate="'required'"
                    :state="validateState('assessNm')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-textarea
                    :width="10"
                    :maxlength="225"
                    :required="true"
                    ui="bootstrap"
                    label="유해위험요인 설명"
                    name="assessDesc"
                    v-model="riskHazard.assessDesc"
                    v-validate="'required'"
                    :state="validateState('assessDesc')"
                  >
                  </y-textarea>
                </b-col>
              </b-row>

              <!-- 버튼 -->
              <div class="float-right">
                <y-btn
                    title="초기화"
                    @btnClicked="btnClearClickedCallback" 
                  />
                  <y-btn
                    :action-url="insertUrl"
                    :param="riskHazard"
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
                    v-if="this.riskHazard.riskHazardNo > 0"
                    :action-url="editUrl"
                    :param="riskHazard"
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
  name: 'y-risk-hazard',
  props: {
  },
  data () {
    return {
      riskHazard: {
        riskHazardNo: 0,
        assessNm: '',
        assessDesc: '',
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        assessTypeNo: 0,
        pRiskHazardNo: 0,
      },
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      comboAssessTypeNos: [],
      comboPRiskHazardNos: [],
      searchUrl: '',
      insertUrl: '',
      editUrl: '',
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
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      // this.searchUrl = selectConfig.rsa.riskHazard.list.url;
      // this.insertUrl = transactionConfig.rsa.riskHazard.insert.url;
      // this.editUrl = transactionConfig.rsa.riskHazard.edit.url;

      this.setGridSize(); // grid 사이즈 조절
      this.getAssessTypeNos(); // 평가기법
      this.getPRiskHazardNos(); // 평가기법
      // this.getDataList();  // 유해위험요인 grid

      // 유해위험요인 grid 헤더 설정
      this.gridOptions.header = [
        { text: '유해위험요인명', name: 'assessNm', width: '150px', align: 'center' },
        { text: '유해위험요인 설명', name: 'assessDesc', width: '400px', align: 'left' },
      ];
    },
    // 평가기법
    getAssessTypeNos () {
      this.$http.url = selectConfig.rsa.assessType.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'assessNm': 'CHARM'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'assessTypeNo': 0, 'assessNm': '전체' });
        this.comboAssessTypeNos = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 유해위험요인 Lv1
    getPRiskHazardNos () {
      this.$http.url = selectConfig.rsa.assessType.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'assessTypeNo': 0, 'assessNm': '전체' });
        this.comboAssessTypeNos = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 유해위험요인 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 그리드 row click 이벤트
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.rsa.riskHazard.get.url, data.riskHazardNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.riskHazard = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 그리드 리사이징
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - this.$refs.detailBox.clientHeight - 260;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    
    /** validation checking **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        var assessNms = this.$_.map(this.gridOptions.data, 'assessNm');
        if (this.$_.indexOf(assessNms, this.riskHazard.assessNm) > -1) {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '이미 같은 이름의 유해위험요인이 존재합니다.',
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
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/

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
      Object.assign(this.$data.riskHazard, this.$options.data().riskHazard);
      this.$validator.reset();
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.getDataList();
      this.isInsert = false;
      this.riskHazard.riskHazardNo = _result.data;
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