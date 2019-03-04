<!--
  목적 : 대기-방지시설 변경이력
  작성자 : khk
  Detail : 대기 방지시설 변경이력 관리
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
                v-if="editable"
                title="삭제"
                color="red"
                @btnClicked="btnDeleteClicked"
              />
          </div>
          <y-data-table 
            ref="dataTable"
            label="변경이력 목록"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data" 
            v-model="selectedValue"
            @selectedRow="getDetail"
            >
            <el-table-column
              type="selection"
              slot="selection"
              align="center"
              width="55">
            </el-table-column> 
          </y-data-table>
          </b-col>
      </b-col>      
    </b-row>

    <b-row class="mt-3" ref="detailBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="변경이력 등록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>          
          <b-row> 
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :disabled="true"
                ui="bootstrap"
                label="방지시설명"
                name="eairPreventFacNm"                
                v-model="prevention.eairPreventFacNm"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :editable="editable"
                :required="true"
                label="적용일"
                name="startYmd"
                v-model="preventChgHist.startYmd"
                v-validate="'required'"
                :state="validateState('startYmd')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :required="true"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="처리용량(㎡/min)"
                name="dispoCap"
                v-model="preventChgHist.dispoCap"
                v-validate="'required'"
                :state="validateState('dispoCap')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :required="true"
                :comboItems="eairPolluCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="eairPolluCd"
                label="처리오염물질"
                v-model="preventChgHist.eairPolluCd"
                v-validate="'required'"
                :state="validateState('eairPolluCd')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :required="true"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="처리농도(mg/S㎥)"
                name="dispoConc"
                v-model="preventChgHist.dispoConc"
                v-validate="'required'"
                :state="validateState('dispoConc')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :required="true"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="처리효율(%)"
                name="dispoEff"
                v-model="preventChgHist.dispoEff"
                v-validate="'required'"
                :state="validateState('dispoEff')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="eairChemCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="eairChemCd"
                label="사용약품"
                v-model="preventChgHist.eairChemCd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="10"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="약품사용량(kg)"
                name="chemConsum"
                v-model="preventChgHist.chemConsum"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
                :width="10"
                :editable="editable"
                :required="true"
                :maxlength="30"
                ui="bootstrap"
                label="변경사유"
                name="endCause"                
                v-model="preventChgHist.endCause"
                v-validate="'required'"
                :state="validateState('endCause')"
                />
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
              :param="preventChgHist"
              :is-submit="isCreateSubmit"
              title="신규등록"
              color="orange"
              action-type="post"
              beforeSubmit = "beforeCreateSubmit"
              @beforeCreateSubmit="beforeCreateSubmit"
              @btnClicked="btnCreateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
              v-if="editable&&updateMode"
              :action-url="editUrl"
              :param="preventChgHist"
              :is-submit="isUpdateSubmit"
              title="수정"
              color="orange"
              action-type="put"
              beforeSubmit = "beforeUpdateSubmit"
              @beforeUpdateSubmit="beforeUpdateSubmit"
              @btnClicked="btnUpdateClickedCallback" 
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
  /** attributes: name, components, props, data **/
  name: 'prevent-chg-hist',
  props: {
    selectedEairPreventFacNo: 0,
    selectedTabIndex: 0
  },
  data () {
    return {
      prevention: {
        eairPreventFacNo: 0,
        eairPreventFacNm: ''
      },
      preventChgHist: {
        eairPreventFacChgHistNo: 0,
        eairPreventFacNo: 0,
        eairPreventFacNm: '',
        eairPreventFacClassCd: null,
        eairPreventFacClassNm: '',
        eairOutletNo: null,
        eairOutletNm: '',
        installPos: '',
        startYmd: '',
        endYmd: '',
        dispoCap: null,
        eairPolluCd: null,
        eairPolluNm: '',
        dispoConc: null, 
        dispoEff: null,
        eairChemCd: '',
        eairChemNm: '',
        chemConsum: null,
        endCause: '',
        createUserId: '',
        createUserNm: '',
        createDt: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: '250'
      },
      editable: true,
      updateMode: false,
      isCreateSubmit: false,
      isUpdateSubmit: false,

      eairPolluCdItems: [],
      eairChemCdItems: [],
      selectedValue: [],

      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      searchUrl: '',
      detailUrl: '',
      preventionDetailUrl: ''
    };
  },
  watch: {
    selectedEairPreventFacNo: function (newValue, oldValue) {
      if (this.selectedEairPreventFacNo > 0) {
        this.prevention.eairPreventFacNo = this.selectedEairPreventFacNo;
        this.getList();
        this.getPreventionDetail();
      }
    },
    selectedTabIndex: function (newValue, oldValue) {
    }
  },
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
  beforeDestory () {
  },
  methods: {
    init () {
      // 선택항목 설정
      setTimeout(() => {        
        this.getEairPolluCdItems();
        this.getEairChemCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '적용일', name: 'startYmd', width: '120px', align: 'center' },
        // { text: '종료일', name: 'endYmd', width: '120px', align: 'center' },
        { text: '처리용량', name: 'dispoCap', width: '100px', align: 'right' },
        { text: '처리오염물질', name: 'eairPolluNm', width: '160px', align: 'center' },
        { text: '처리농도', name: 'dispoConc', width: '100px', align: 'right' },
        { text: '처리효율', name: 'dispoEff', width: '100px', align: 'right' },
        { text: '사용약품', name: 'eairChemNm', width: '160px', align: 'center' },
        { text: '약품사용량', name: 'chemConsum', width: '120px', align: 'right' },
        { text: '변경사유', name: 'endCause', width: '300px' },        
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = transactionConfig.env.air.facility.preventionChangeHistory.insert.url;
      this.editUrl = transactionConfig.env.air.facility.preventionChangeHistory.edit.url;
      this.deleteUrl = transactionConfig.env.air.facility.preventionChangeHistory.delete.url;
      this.searchUrl = selectConfig.env.air.facility.preventionChangeHistory.list.url;
      this.detailUrl = selectConfig.env.air.facility.preventionChangeHistory.get.url;
      this.preventionDetailUrl = selectConfig.env.air.facility.prevention.get.url;

      if (this.selectedEairPreventFacNo > 0) {
        this.prevention.eairPreventFacNo = this.selectedEairPreventFacNo;
        this.getList();
        this.getPreventionDetail();
      }
    },

    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.prevention;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDetail (data) {
      this.$http.url = this.$format(this.detailUrl, data.eairPreventFacChgHistNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.preventChgHist = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getPreventionDetail () {
      this.$http.url = this.$format(this.preventionDetailUrl, this.prevention.eairPreventFacNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.prevention = _result.data;
        this.preventChgHist.eairPreventFacNo = this.prevention.eairPreventFacNo;
        this.preventChgHist.eairPreventFacNm = this.prevention.eairPreventFacNm;
        this.btnClearClickedCallback({});
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    
    getEairPolluCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EAIR_POLLU');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.eairPolluCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEairChemCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EAIR_CHEM');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.eairChemCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    checkDuplicate () {
      var lastYmd;
      var inputYmd;
      var test = {
        'startYmd': this.preventChgHist.startYmd
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {      
        if (this.updateMode
          && this.preventChgHist.startYmd === item.startYmd) {
          return false;
        }

        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '적용일이 중복됩니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },
    beforeCreateSubmit () {
      this.preventChgHist.eairPreventFacChgHistNo = 0;
      this.updateMode = false;
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '방지시설 변경 정보를 저장 하시겠습니까?',
            type: 'info',
            confirmCallback: () => {
              this.isCreateSubmit = true;
            }
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    beforeUpdateSubmit () {
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '방지시설 변경 정보를 수정하시겠습니까?',
            type: 'info',
            confirmCallback: () => {
              this.isUpdateSubmit = true;
            }
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    
    btnClearClickedCallback (_result) {
      this.updateMode = false;
      this.preventChgHist.eairPreventFacChgHistNo = 0;
      this.preventChgHist.eairPreventFacNo = this.prevention.eairPreventFacNo;
      this.preventChgHist.eairPreventFacNm = this.prevention.eairPreventFacNm;
      this.preventChgHist.eairPreventFacClassCd = '';
      this.preventChgHist.eairPreventFacClassNm = '';
      this.preventChgHist.eairOutletNo = null;
      this.preventChgHist.eairOutletNm = '';
      this.preventChgHist.installPos = '';
      this.preventChgHist.startYmd = '';
      this.preventChgHist.endYmd = '';
      this.preventChgHist.dispoCap = null;
      this.preventChgHist.eairPolluCd = null;
      this.preventChgHist.eairPolluNm = '';
      this.preventChgHist.dispoConc = null;
      this.preventChgHist.dispoEff = null;
      this.preventChgHist.eairChemCd = '';
      this.preventChgHist.eairChemNm = '';
      this.preventChgHist.chemConsum = null;
      this.preventChgHist.endCause = '';
      this.preventChgHist.createUserId = '';
      this.preventChgHist.createUserNm = '';
      this.preventChgHist.createDt = '';
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.preventChgHist.eairPreventFacChgHistNo = _result.data;
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '방지시설 변경 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '방지시설 변경 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      this.isUpdateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    btnDeleteClicked () {
      if (this.selectedValue.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '선택된 방지시설 변경 정보를 삭제하시겠습니까?',
          type: 'info',
          confirmCallback: () => {
            this.$http.url = this.deleteUrl;
            this.$http.type = 'delete';
            this.$http.param = {
              'data': Object.values(this.$_.clone(this.selectedValue))
            };
            this.$http.request((_result) => {
              this.btnClearClickedCallback({});
              this.getList();
              window.getApp.$emit('ALERT', {
                title: '안내',
                message: '방지시설 변경 정보를 정상적으로 삭제하였습니다.',
                type: 'success',
              });
            }, (_error) => {
              window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
            });
          }
        });
      }
      else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '방지시설 변경 정보를 선택하세요.',
          type: 'warning'
        });
      }
    }
  }
};
</script>