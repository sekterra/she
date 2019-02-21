<!--
  목적 : 대기-방지시설 보수이력
  작성자 : khk
  Detail : 대기 방지시설 보수이력 관리
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
            label="보수이력 목록"
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
            <y-label label="보수이력 등록" icon="user-edit" color-class="cutstom-title-color" />
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
              <y-text
                :width="8"
                :disabled="true"
                ui="bootstrap"
                label="배출구"
                name="eairOutletNm"                
                v-model="prevention.eairOutletNm"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :editable="editable"
                :range="true"
                :required="true"
                label="보수기간"
                name="period"
                v-model="preventMaintHist.maintPeriod"
                v-validate="'required'"
                :state="validateState('maintPeriod')"
                @input="changeMaintPeriod"
              >
              </y-datepicker>
            </b-col>        
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :disabled="detailMode"
                :maxlength="30"
                ui="bootstrap"
                label="보수자"
                name="worker"                
                v-model="preventMaintHist.worker"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :disabled="detailMode"
                :maxlength="200"
                ui="bootstrap"
                label="부수명세"
                name="remark"
                v-model="preventMaintHist.remark"
                :rows="2" />
            </b-col> 
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              title="초기화"
              @btnClicked="btnClearClickedCallback" 
              />
            <y-btn
              v-if="editable&&!detailMode&&prevention.eairPreventFacNo>0"
              :action-url="insertUrl"
              :param="preventMaintHist"
              :is-submit="isCreateSubmit"
              title="신규등록"
              color="orange"
              action-type="post"
              beforeSubmit = "beforeCreateSubmit"
              @beforeCreateSubmit="beforeCreateSubmit"
              @btnClicked="btnCreateClickedCallback" 
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
  name: 'prevent-maint-hist',
  props: {
    selectedEairPreventFacNo: 0,
    selectedTabIndex: 0
  },
  data () {
    return {
      prevention: {
        eairPreventFacNo: 0,
        eairPreventFacNm: '',
        eairOutletNo: 0,
        eairOutletNm: ''
      },
      preventMaintHist: {
        eairPreventFacMaintHistNo: 0,
        eairPreventFacNo: 0,
        eairPreventFacNm: '',
        eairPreventFacClassCd: '',
        eairPreventFacClassNm: '',
        eairOutletNo: null,
        eairOutletNm: '',
        installPos: '',
        maintPeriod: null,
        startYmd: '',
        endYmd: '',
        worker: '',
        remark: '',
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
      detailMode: false,
      isCreateSubmit: false,

      selectedValue: [],

      insertUrl: '',
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
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '보수시작일', name: 'startYmd', width: '160px', align: 'center' },
        { text: '보수종료일', name: 'endYmd', width: '160px', align: 'center' },
        { text: '보수자', name: 'worker', width: '300px' },
        { text: '보수명세', name: 'remark', width: '500px' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = transactionConfig.env.air.facility.preventionMaintenanceHistory.insert.url;
      this.deleteUrl = transactionConfig.env.air.facility.preventionMaintenanceHistory.delete.url;
      this.searchUrl = selectConfig.env.air.facility.preventionMaintenanceHistory.list.url;
      this.detailUrl = selectConfig.env.air.facility.preventionMaintenanceHistory.get.url;
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
      this.$http.url = this.$format(this.detailUrl, data.eairPreventFacMaintHistNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.detailMode = true;
        this.preventMaintHist = _result.data;
        this.preventMaintHist.maintPeriod = [this.preventMaintHist.startYmd, this.preventMaintHist.endYmd];
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getPreventionDetail () {
      this.$http.url = this.$format(this.preventionDetailUrl, this.prevention.eairPreventFacNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.prevention = _result.data;
        this.preventMaintHist.eairPreventFacNo = this.prevention.eairPreventFacNo;
        this.preventMaintHist.eairPreventFacNm = this.prevention.eairPreventFacNm;
        this.btnClearClickedCallback({});
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    changeMaintPeriod (data) {
      this.preventMaintHist.startYmd = data[0];
      this.preventMaintHist.endYmd = data[1];
    },

    beforeCreateSubmit () {
      this.detailMode = false; 
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '방지시설 보수 정보를 저장 하시겠습니까?',
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
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    
    btnClearClickedCallback (_result) {
      this.detailMode = false;
      this.preventMaintHist.eairPreventFacNo = this.prevention.eairPreventFacNo;
      this.preventMaintHist.eairPreventFacNm = this.prevention.eairPreventFacNm;
      this.preventMaintHist.eairPreventFacClassCd = '';
      this.preventMaintHist.eairPreventFacClassNm = '';
      this.preventMaintHist.eairOutletNo = null;
      this.preventMaintHist.eairOutletNm = '';
      this.preventMaintHist.installPos = '';
      this.preventMaintHist.startYmd = '';
      this.preventMaintHist.endYmd = '';      
      this.preventMaintHist.worker = '';
      this.preventMaintHist.remark = '';
      this.preventMaintHist.createUserId = '';
      this.preventMaintHist.createUserNm = '';
      this.preventMaintHist.createDt = '';
      this.preventMaintHist.maintPeriod = [this.preventMaintHist.startYmd, this.preventMaintHist.endYmd];
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.detailMode = true;
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '방지시설 보수 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    btnDeleteClicked () {
      if (this.selectedValue.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '선택된 방지시설 보수 정보를 삭제하시겠습니까?',
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
                message: '방지시설 보수 정보를 정상적으로 삭제하였습니다.',
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
          message: '방지시설 보수 정보를 선택하세요.',
          type: 'warning'
        });
      }
    }
  }
};
</script>