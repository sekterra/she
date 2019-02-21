<!--
  목적 : 검진 계획
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
        <b-col sm="12" class="px-0">
        <div slot="buttonGroup" class="float-right mb-1">
          <y-btn 
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDelete"
              title="삭제"
              color="red"
              action-type="DELETE"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
        </div>
          <!-- 검진결과 계획 테이블 -->
          <y-data-table 
            label="검진 계획 목록"
            :editable="editable"
            :excel-down="true"
            :print="true"
            v-model="selectedValue"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="selectedRow"
            >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>

      <!-- 등록 -->
      <b-row class="mt-3" ref="detailBox">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="검진 계획 상세" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
          <b-card>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :editable="editable"
                  :comboItems="heaCheckupClassItems"
                  :required="true"
                  itemText="codeNm"
                  itemValue="code"
                  ui="bootstrap"
                  label="검진 종류"
                  name="heaCheckupClassCd"
                  v-model="checkupPlan.heaCheckupClassCd"
                  v-validate="'required'"
                  :state="validateState('heaCheckupClassCd')"
                >
                </y-select>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="8"
                  :editable="editable"
                  :maxlength="30"
                  :required="true"
                  ui="bootstrap"
                  label="검진 계획명"
                  name="heaCheckupPlanNm"
                  v-model="checkupPlan.heaCheckupPlanNm"
                  v-validate="'required'"
                  :state="validateState('heaCheckupPlanNm')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                  :width="8"
                  :editable="editable"
                  :range="true"
                  :required="true"
                  label="검진 기간"
                  name="period"
                  v-model="checkupPlan.period"
                  v-validate="'required'"
                  :state="validateState('period')"
                  @input="changePeriod"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                  :width="8"
                  :editable="editable"
                  :start="checkupPlan.startYmd"
                  :end="checkupPlan.endYmd"
                  label="검진 예약 마감일"
                  name="finishYmd"
                  v-model="checkupPlan.finishYmd"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
                <y-switch
                  :width="8"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="선택검진필수여부"
                  name="radioValue"
                  selectText="필수"
                  unselectText="선택가능"
                  v-model="checkupPlan.requiredOptYn"
                >
              </y-switch>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-number
                :width="8"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                name="selectOptCount"
                label="선택검진가능수"
                v-model="checkupPlan.selectOptCount"
                >
                </y-number>
              </b-col>
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                <y-shuttlebox
                  :width="10"
                  :editable="editable"
                  :items="heaCheckupOrgItems"
                  :needDefaultView="true"
                  itemText="heaCheckupOrgNm"
                  itemValue="heaCheckupOrgNo"
                  ui="bootstrap"
                  label="검진 기관 선택"
                  name="heaCheckupOrgNo"
                  v-model="checkupPlan.selectedHeaCheckupOrgNos"
                  >
                </y-shuttlebox>
              </b-col>
            </b-row>
            <div class="float-right mt-3">
              <y-btn
                v-if="editable"
                title="초기화"
                @btnClicked="btnClearClickedCallback" 
              />
              <y-btn
                v-if="editable"
                :action-url="insertUrl"
                :param="checkupPlan"
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
                :param="checkupPlan"
                :is-submit="isEmit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEmit"
                @beforeEmit="beforeEmit"
                @btnClicked="btnEmitClickedCallback" 
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
  name: 'checkup-plan',  
  data () {
    return {
      checkupPlan: {
        heaCheckupClassCd: null,
        heaCheckupPlanNm: '',
        duration: null,
        period: null,
        finishYmd: '',
        selectedHeaCheckupOrgNos: [],
        startYmd: '',
        endYmd: '',
        requiredOptYn: 'N',
        selectOptCount: 0,
      },
      gridOptions: {
        header: [],
        data: [],
        height: '320'
      },
      editable: true,
      updateMode: false,
      heaCheckupClassItems: [],
      heaCheckupOrgItems: [],
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      isInsert: false,
      isEmit: false,  
      isDelete: false,  
      selectedValue: [],
      deleteValue: null,
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
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.checkupPlan.list.url;
      this.insertUrl = transactionConfig.checkupPlan.insert.url;
      this.editUrl = transactionConfig.checkupPlan.edit.url;
      this.deleteUrl = transactionConfig.checkupPlan.delete.url;

      setTimeout(() => {
        this.getComboItems();
        this.getHeaCheckupOrgItems();
        this.getDataList();
      }, 100);

      // 검진 계획 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검진종류', name: 'heaCheckupClassNm', width: '160px', align: 'center' },
        { text: '검진계획', name: 'heaCheckupPlanNm', width: '300px' },
        { text: '검진기간', name: 'heaCheckupPlanPeriod', width: '200px', align: 'center' },
        { text: '예약마감일', name: 'finishYmd', width: '160px', align: 'center' },
        { text: '선택검진필수여부', name: 'requiredOptYn', width: '180px', align: 'center' },
        { text: '선택검진가능수', name: 'selectOptCount', width: '180px', align: 'center' },
      ];
    },
    
    // 검진 종류
    getComboItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_CHECKUP_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.heaCheckupClassItems = this.$_.clone(_result.data);
        this.heaCheckupClassItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.checkupPlan.heaCheckupClassCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 검진 기관
    getHeaCheckupOrgItems () {
      this.$http.url = selectConfig.checkupOrg.list.url;      
      this.$http.type = 'GET';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        this.heaCheckupOrgItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 검진 계획 그리드
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

      this.getHeaCheckupOrgItems();
      this.$http.url = this.$format(selectConfig.checkupPlan.get.url, data.heaCheckupPlanNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.checkupPlan = this.$_.clone(_result.data);
        this.checkupPlan.period = [this.checkupPlan.startYmd, this.checkupPlan.endYmd];
        
        // 등록된 계획별 검진기관 리스트 
        this.$http.url = selectConfig.checkupPlanOrg.list.url;
        this.$http.type = 'GET';
        this.$http.param = {
          'heaCheckupPlanNo': this.checkupPlan.heaCheckupPlanNo
        };
        this.$http.request((_result) => {
          this.checkupPlan.selectedHeaCheckupOrgNos = this.$_.map(_result.data, 'heaCheckupOrgNo');
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', _error);
        });
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 검진기간 변환
    changePeriod (data) {      
      this.checkupPlan.startYmd = data[0];
      this.checkupPlan.endYmd = data[1];
      var finishYmd;
      var startYmd;
      var endYmd;
      if (this.checkupPlan.finishYmd !== null && this.checkupPlan.finishYmd !== '') {
        finishYmd = Number(this.checkupPlan.finishYmd.replace(/-/g, ''));
        startYmd = Number(this.checkupPlan.startYmd.replace(/-/g, ''));
        endYmd = Number(this.checkupPlan.endYmd.replace(/-/g, ''));
        if (finishYmd < startYmd || finishYmd > endYmd) {
          this.checkupPlan.finishYmd = this.checkupPlan.endYmd;
        }
      }
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.detailBox.clientHeight - 250;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    
    /** validation checking **/
    beforeInsert () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '저장하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.checkValidationInsert();
        }
      });
    },
    beforeEmit () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '수정하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.checkValidationEmit();
        }
      });
    },
    beforeDelete () {
      if (this.selectedValue.length === 0) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '항목을 선택해주세요.',
          type: 'warning',
        });
        return;
      }

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
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        if (!this.isInsert) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    checkValidationEmit () {
      this.$validator.validateAll().then((_result) => {
        this.isEmit = _result;
        if (!this.isEmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEmit = false;
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
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.checkupPlan.heaCheckupPlanNo = this.$_.clone(_result.data);
      this.getDataList();
      this.updateMode = true;
      this.isInsert = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',
      });
      this.getHeaCheckupOrgItems();
    },
    // 수정
    btnEmitClickedCallback (_result) {
      this.getDataList();
      this.updateMode = true;
      this.isEmit = false;
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
      this.getHeaCheckupOrgItems();
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    // 초기화
    btnClearClickedCallback () {
      this.updateMode = false;
      Object.assign(this.$data.checkupPlan, this.$options.data().checkupPlan);
      this.getHeaCheckupOrgItems();
      this.$validator.reset();
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      this.getDataList();
      this.isDelete = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
    },
    /** /Button Event **/
  }
};
</script>