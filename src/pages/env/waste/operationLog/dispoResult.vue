<!--
  목적 : 폐기물-폐기물 처리결과
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
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
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="요청일"
                name="reqYmdPeriod"
                v-model="searchParam.reqYmdPeriod"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="ewstDispoStCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="ewstDispoStCd"
                label="처리상태"
                v-model="searchParam.ewstDispoStCd"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="폐기물 처리결과 목록"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data" 
            @selectedRow="getDetail"
            />
          </b-col>
      </b-col>      
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="폐기물 처리결과 등록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>          
          <b-row> 
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                ui="bootstrap"
                name="ewstClassNm"
                label="폐기물분류"
                v-model="disposalResult.ewstClassNm"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                :required="true"
                ui="bootstrap"
                name="ewstWasteNm"
                label="처리요청폐기물"
                v-model="disposalResult.ewstWasteNm"
                v-validate="'required'"
                :state="validateState('ewstWasteNm')"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchDispoReq' }]"
                @searchDispoReq="btnSearchDispoReqClicked"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                ui="bootstrap"
                name="ewstWasteNm"
                label="요청일"
                v-model="disposalResult.reqYmd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                ui="bootstrap"
                name="displayReqUser"
                label="요청자"
                v-model="displayReqUser"
                />
            </b-col>


            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :editable="editable"
                label="처리일"
                name="dispoYmd"
                v-model="disposalResult.dispoYmd"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                :required="true"
                ui="bootstrap"
                label="처리자"
                name="displayDispoUser"                
                v-model="displayDispoUser"
                v-validate="'required'"
                :state="validateState('displayDispoUser')"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"        
                :required="true"        
                :comboItems="ewstDispoDivCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="ewstDispoDivCd"
                label="처리구분"
                v-validate="'required'"
                v-model="disposalResult.ewstDispoDivCd"
                :state="validateState('ewstDispoDivCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :disabled="ewstDispoStepCdDisabled"
                :editable="editable"       
                :required="!ewstDispoStepCdDisabled"         
                :comboItems="ewstDispoStepCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="ewstDispoStepCd"
                label="처리단계"
                v-validate="'required'"
                v-model="disposalResult.ewstDispoStepCd"
                :state="validateState('ewstDispoStepCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :disabled="amtEmptyDisabled"
                :required="!amtEmptyDisabled"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="공차중량"
                name="amtEmpty"
                v-validate="'required'"
                :state="validateState('amtEmpty')"
                v-model="disposalResult.amtEmpty"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :disabled="amtLoadedDisabled"
                :required="!amtLoadedDisabled"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="계근중량"
                name="amtLoaded"
                v-validate="'required'"
                :state="validateState('amtLoaded')"
                v-model="disposalResult.amtLoaded"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="amtGenDisabled"
                :required="!amtGenDisabled"
                ui="bootstrap"
                label="처리량"
                name="amtGen"
                v-validate="'required'"
                v-model="disposalResult.amtGen"
                :state="validateState('amtGen')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                ui="bootstrap"
                name="envUnitNm"
                label="단위"
                v-model="disposalResult.envUnitNm"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                :disabled="ewstDispoCoNmDisabled"
                :required="!ewstDispoCoNmDisabled"
                ui="bootstrap"
                label="처리업체"
                name="ewstDispoCoNm"                
                v-model="disposalResult.ewstDispoCoNm"
                v-validate="'required'"
                :state="validateState('ewstDispoCoNm')"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchDispoCo' }]"
                @searchDispoCo="btnSearchDispoCoClicked"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                :disabled="ewstFreightCoNmDisabled"
                :required="!ewstFreightCoNmDisabled"
                ui="bootstrap"
                label="운반업체"
                name="ewstFreightCoNm"                
                v-model="disposalResult.ewstFreightCoNm"
                v-validate="'required'"
                :state="validateState('ewstFreightCoNm')"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchFreightCo' }]"
                @searchFreightCo="btnSearchFreightCoClicked"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :disabled="carrierDisabled"
                :required="!carrierDisabled"
                ui="bootstrap"
                label="운반차량"
                name="carrier"                
                v-model="disposalResult.carrier"
                v-validate="'required'"
                :state="validateState('carrier')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="8"
                :editable="editable"
                true-value="true"
                false-value="false"
                ui="bootstrap"
                label="발생요청 처리완료여부"
                name="requestComplete"
                selectText="처리완료"
                unselectText="처리중"
                v-model="disposalResult.requestComplete"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                ui="bootstrap"
                name="ewstDispoStNm"
                label="처리상태"
                v-model="disposalResult.ewstDispoStNm"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="200"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="disposalResult.remark"
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
              v-if="editable&&!disposalResult.resultComplete"
              :action-url="completeUrl"
              :param="disposalResult"
              :is-submit="isCompleteSubmit"
              title="처리완료"
              color="orange"
              action-type="post"
              beforeSubmit = "beforeCompleteSubmit"
              @beforeCompleteSubmit="beforeCompleteSubmit"
              @btnClicked="btnCompleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable&&disposalResult.resultEditable"
              :action-url="insertUrl"
              :param="disposalResult"
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
              v-if="editable&&updateMode&&disposalResult.resultEditable"
              :action-url="editUrl"
              :param="disposalResult"
              :is-submit="isUpdateSubmit"
              title="수정"
              color="orange"
              action-type="put"
              beforeSubmit = "beforeUpdateSubmit"
              @beforeUpdateSubmit="beforeUpdateSubmit"
              @btnClicked="btnUpdateClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            /> 
            <y-btn
              v-if="editable&&updateMode&&disposalResult.resultEditable"
              title="삭제"
              color="red"              
              @btnClicked="btnDeleteClicked"
            /> 
          </div>
        </b-card>
      </b-col>
    </b-row>
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'dispo-result',
  props: {
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '850px',
        top: '100px',
        param: {},
        closeCallback: null
      },
      disposalResult: {
        resultEditable: true,
        resultComplete: false,
        requestComplete: false,
        ewstDispoResultNo: 0,
        ewstDispoStCd: null,
        ewstDispoStNm: null,
        ewstDispoReqNo: null,
        ewstDivCd: null,
        ewstDivNm: null,
        ewstClassCd: null,
        ewstClassNm: null,
        ewstDispoMtdCd: null,
        ewstDispoMtdNm: null,
        ewstWasteNo: null,
        ewstWasteNm: null,
        reqUserId: null,
        reqUserNm: null,
        reqDeptCd: null,
        reqDeptNm: null,
        reqYmd: null,
        ewstDispoDivCd: null,
        ewstDispoDivNm: null,
        ewstDispoStepCd: null,
        ewstDispoStepNm: null,
        dispoUserId: null,
        dispoUserNm: null,
        dispoDeptCd: null,
        dispoDeptNm: null,
        dispoYmd: null,
        amtEmpty: null,
        amtLoaded: null,
        amtGen: null,
        envUnitCd: null,
        envUnitNm: null,
        ewstDispoCoNo: null,
        ewstDispoCoNm: null,
        ewstFreightCoNo: null,
        ewstFreightCoNm: null,
        carrier: null,
        dispoCost: null,
        freightCost: null,
        totalCost: null,
        remark: null,
        createUserId: '', 
        createUserNm: '',
        createDt: '',
        updateUserId: '',
        updateUserNm: '',
        updateDt: ''
      },
      searchParam: {
        reqYmdPeriod: '',
        ewstDispoStCd: ''
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
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

      ewstDispoStCdItems: [],
      ewstDispoDivCdItems: [],
      ewstDispoStepCdItems: [],

      completeUrl: '',
      insertUrl: '',
      editUrl: '',
      searchUrl: '',
      detailUrl: '',

      ewstDispoStepCdDisabled: true,      
      amtEmptyDisabled: false,
      amtLoadedDisabled: false,     
      amtGenDisabled: true, 
      ewstDispoCoNmDisabled: false,
      ewstFreightCoNmDisabled: false,
      carrierDisabled: false,
    };
  },
  computed: {
    displayReqUser: {
      get: function () {
        if (!(this.disposalResult.reqDeptNm == null || this.disposalResult.reqUserNm == null)) {
          return this.disposalResult.reqDeptNm + ' / ' + this.disposalResult.reqUserNm;
        }
        else return null;
      },
      set: function (newValue) { }
    },
    displayDispoUser: {
      get: function () {
        if (!(this.disposalResult.dispoDeptNm == null || this.disposalResult.dispoUserNm == null)) {
          return this.disposalResult.dispoDeptNm + ' / ' + this.disposalResult.dispoUserNm;
        }
        else return null;
      },
      set: function (newValue) { }
    },
  },
  watch: {
    'disposalResult.amtEmpty': function (newValue, oldValue) {
      this.setAamtGen();
    },
    'disposalResult.amtLoaded': function (newValue, oldValue) {
      this.setAamtGen();
    },
    'disposalResult.ewstDispoDivCd': function (newValue, oldValue) {
      this.disposalResult.ewstDispoStepCd = null;
      this.disposalResult.amtEmpty = null;
      this.disposalResult.amtLoaded = null;
      this.disposalResult.amtGen = null;
      this.disposalResult.ewstDispoCoNo = null;
      this.disposalResult.ewstDispoCoNm = null;
      this.disposalResult.ewstFreightCoNo = null;
      this.disposalResult.ewstFreightCoNm = null;
      this.disposalResult.carrier = null;

      if (this.disposalResult.ewstDispoDivCd === '1') {
        this.ewstDispoStepCdDisabled = false;
        this.amtEmptyDisabled = true;
        this.amtLoadedDisabled = true;
        this.amtGenDisabled = false;
        this.ewstDispoCoNmDisabled = true;
        this.ewstFreightCoNmDisabled = true;
        this.carrierDisabled = true;
      }
      else {
        this.ewstDispoStepCdDisabled = true;
        this.amtEmptyDisabled = false;
        this.amtLoadedDisabled = false;
        this.amtGenDisabled = true;
        this.ewstDispoCoNmDisabled = false;
        this.ewstFreightCoNmDisabled = false;
        this.carrierDisabled = false;
      }
    },
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
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestory () {
    window.removeEventListener('resize', this.setGridSize);
  },
  methods: {
    init () {
      // 선택항목 설정
      setTimeout(() => {        
        this.getEwstDispoStCdItems();
        this.getEwstDispoDivCdItems();
        this.getEwstDispoStepCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '폐기물분류', name: 'ewstClassNm', width: '160px', align: 'center' },
        { text: '폐기물', name: 'ewstWasteNm', width: '160px' },
        { text: '요청일', name: 'reqYmd', width: '120px', align: 'center' },
        { text: '요청부서', name: 'reqDeptNm', width: '120px', align: 'center' },
        { text: '요청자', name: 'reqUserNm', width: '120px', align: 'center' },
        { text: '처리상태', name: 'ewstDispoStNm', width: '100px', align: 'center' },
        { text: '처리일', name: 'dispoYmd', width: '120px', align: 'center' },
        { text: '처리구분', name: 'ewstDispoDivNm', width: '100px', align: 'center' },        
        { text: '처리단계', name: 'ewstDispoStepNm', width: '100px', align: 'center' },
        { text: '처리량', name: 'amtGen', width: '100px', align: 'right' },
        { text: '단위', name: 'envUnitNm', width: '120px', align: 'center' }, 
        { text: '비고', name: 'remark', width: '350px' },
        { text: '처리업체', name: 'ewstDispoCoNm', width: '200px' },
        { text: '운반업체', name: 'ewstFreightCoNm', width: '200px' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.completeUrl = transactionConfig.env.waste.operationLog.disposalResult.complete.url;
      this.insertUrl = transactionConfig.env.waste.operationLog.disposalResult.insert.url;
      this.editUrl = transactionConfig.env.waste.operationLog.disposalResult.edit.url;
      this.searchUrl = selectConfig.env.waste.operationLog.disposalResult.list.url;
      this.detailUrl = selectConfig.env.waste.operationLog.disposalResult.get.url;

      this.getList();
      this.setGridSize();
    },
    
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';      
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDetail (data) {
      this.$http.url = this.$format(this.detailUrl, data.ewstDispoResultNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.disposalResult = _result.data;        
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    getEwstDispoStCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EWST_DISPO_ST');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '전체' });
        this.ewstDispoStCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEwstDispoDivCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EWST_DISPO_DIV');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.ewstDispoDivCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });   
    },
    getEwstDispoStepCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EWST_DISPO_STEP');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.ewstDispoStepCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });      
    },

    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 500;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    setAamtGen () {
      if (this.disposalResult.amtEmpty > 0 && this.disposalResult.amtLoaded > 0) {
        this.disposalResult.amtGen = this.disposalResult.amtLoaded - this.disposalResult.amtEmpty;
      }
    },

    btnDeleteClicked () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '폐기물 처리결과 정보를 삭제하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.$http.url = this.$format(transactionConfig.env.waste.operationLog.disposalResult.delete.url, this.disposalResult.ewstDispoResultNo);
          this.$http.type = 'delete';      
          this.$http.request((_result) => {
            this.getList();
            this.btnClearClickedCallback(_result);
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '폐기물 처리결과 정보를 정상적으로 삭제하였습니다.',
              type: 'success',
            });
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
          });
        }
      });
    },
    beforeCompleteSubmit () {      
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '폐기물 처리결과 정보를 처리완료 하시겠습니까?',
            type: 'info',
            confirmCallback: () => {
              this.isCompleteSubmit = true;
            }
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    beforeCreateSubmit () {
      this.disposalResult.ewstDispoResultNo = 0;
      this.updateMode = false;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '폐기물 처리결과 정보를 저장 하시겠습니까?',
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
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '폐기물 처리결과 정보를 수정하시겠습니까?',
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
    
    btnSearchClicked () {
      this.getList();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    btnClearClickedCallback (_result) {
      this.updateMode = false;
      Object.assign(this.$data.disposalResult, this.$options.data().disposalResult);
    },
    btnCompleteClickedCallback (_result) {
      this.isCompleteSubmit = false;
      this.updateMode = true;
      this.disposalResult.ewstDispoResultNo = _result.data;
      this.getDetail(this.disposalResult);
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '폐기물 처리결과 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.disposalResult.ewstDispoResultNo = _result.data;
      this.getDetail(this.disposalResult);
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '폐기물 처리결과 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getDetail(this.disposalResult);
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '폐기물 처리결과 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      this.isUpdateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },

    closePopupSearchDispoReq (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.dispoReq) {
        this.disposalResult.ewstDispoReqNo = data.dispoReq.ewstDispoReqNo;
        this.disposalResult.ewstClassNm = data.dispoReq.ewstClassNm;
        this.disposalResult.ewstWasteNo = data.dispoReq.ewstWasteNo;
        this.disposalResult.ewstWasteNm = data.dispoReq.ewstWasteNm;
        this.disposalResult.reqUserNm = data.dispoReq.reqUserNm;
        this.disposalResult.reqDeptNm = data.dispoReq.reqDeptNm;
        this.disposalResult.reqYmd = data.dispoReq.reqYmd;
        this.disposalResult.envUnitNm = data.dispoReq.envUnitNm;
      }
    },
    btnSearchDispoReqClicked () {
      this.popupOptions.param = {
        'unselectedComplete': true
      };
      this.popupOptions.target = () => import(`${'./dispoRequestSearch.vue'}`);
      this.popupOptions.title = '폐기물요청검색';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopupSearchDispoReq;
    },
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.disposalResult.dispoUserId = data.user.userId;
        this.disposalResult.dispoUserNm = data.user.userNm;
        this.disposalResult.dispoDeptCd = data.user.deptCd;
        this.disposalResult.dispoDeptNm = data.user.deptNm;
      }
    },
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '처리자검색';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },
    closePopupSearchDispoCo (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.dispoCo) {
        this.disposalResult.ewstDispoCoNo = data.dispoCo.ewstDispoCoNo;
        this.disposalResult.ewstDispoCoNm = data.dispoCo.ewstDispoCoNm;
      }      
    },    
    btnSearchDispoCoClicked (_item) {
      this.popupOptions.param = {
        'dispoFreightYn': 'dispo'
      };
      this.popupOptions.target = () => import(`${'../baseInfo/dispoCompanySearch.vue'}`);
      this.popupOptions.title = '처리업체검색';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopupSearchDispoCo;
    },
    closePopupSearchFreightCo (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.dispoCo) {
        this.disposalResult.ewstFreightCoNo = data.dispoCo.ewstDispoCoNo;
        this.disposalResult.ewstFreightCoNm = data.dispoCo.ewstDispoCoNm;
      }
    },
    btnSearchFreightCoClicked (_item) {
      this.popupOptions.param = {
        'dispoFreightYn': 'freight'
      };
      this.popupOptions.target = () => import(`${'../baseInfo/dispoCompanySearch.vue'}`);
      this.popupOptions.title = '운반업체검색';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopupSearchFreightCo;
    },
  }
};
</script>