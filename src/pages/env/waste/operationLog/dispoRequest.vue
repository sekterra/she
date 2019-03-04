<!--
  목적 : 폐기물-폐기물 처리요청
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
            label="폐기물 처리요청 목록"
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
            <y-label label="폐기물 처리요청 등록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>          
          <b-row> 
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="ewstClassCdItems"
                itemText="ewstClassNm"
                itemValue="ewstClassCd"
                ui="bootstrap"
                name="ewstClassCd"
                label="폐기물분류"
                v-model="disposalRequest.ewstClassCd"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :required="true"
                :comboItems="ewstWasteNoItems"
                itemText="ewstWasteNm"
                itemValue="ewstWasteNo"
                ui="bootstrap"
                name="ewstWasteNo"
                label="폐기물"
                v-validate="'required'"
                :state="validateState('ewstWasteNo')"
                v-model="disposalRequest.ewstWasteNo"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :editable="editable"
                :required="true"
                label="요청일"
                name="reqYmd"
                v-model="disposalRequest.reqYmd"
                v-validate="'required'"
                :state="validateState('reqYmd')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                :required="true"
                ui="bootstrap"
                label="요청자"
                name="displayReqUser"                
                v-model="displayReqUser"
                v-validate="'required'"
                :state="validateState('displayReqUser')"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :required="true"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="발생량"
                name="amtGen"
                v-validate="'required'"
                :state="validateState('amtGen')"
                v-model="disposalRequest.amtGen"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"           
                :required="true"     
                :comboItems="envUnitCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="envUnitCd"
                label="단위"
                v-validate="'required'"
                v-model="disposalRequest.envUnitCd"
                :state="validateState('envUnitCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :readonly="true"
                ui="bootstrap"
                name="ewstDispoStNm"
                label="처리상태"
                v-model="disposalRequest.ewstDispoStNm"
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
                v-model="disposalRequest.remark"
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
              v-if="editable&&disposalRequest.requestEditable"
              :action-url="insertUrl"
              :param="disposalRequest"
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
              v-if="editable&&updateMode&&disposalRequest.requestEditable"
              :action-url="editUrl"
              :param="disposalRequest"
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
              v-if="editable&&updateMode&&disposalRequest.requestEditable"
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
  name: 'dispo-request',
  props: {
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '60%',
        top: '100px',
        param: {},
        closeCallback: null
      },
      disposalRequest: {
        requestEditable: true,
        ewstDispoReqNo: 0,
        ewstDivCd: null,
        ewstDivNm: null,
        ewstClassCd: null,
        ewstClassNm: null,
        ewstDispoMtdCd: null,
        ewstDispoMtdNm: null,
        ewstWasteNo: null,
        ewstWasteNm: null,
        ewstDispoStCd: null,
        ewstDispoStNm: null,
        reqUserId: null,
        reqUserNm: null,
        reqDeptCd: null,
        reqDeptNm: null,
        reqYmd: null,
        amtGen: null,
        envUnitCd: null,
        envUnitNm: null,
        remark: null,
        dispoYmd: null,
        dispoAmt: null,
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
      ewstClassCdItems: [],
      ewstWasteNoItems: [],
      envUnitCdItems: [],

      insertUrl: '',
      editUrl: '',
      searchUrl: '',
      detailUrl: '',
    };
  },
  computed: {
    displayReqUser: {
      get: function () {
        if (!(this.disposalRequest.reqDeptNm == null || this.disposalRequest.reqUserNm == null)) {
          return this.disposalRequest.reqDeptNm + ' / ' + this.disposalRequest.reqUserNm;
        }
        else return null;
      },
      set: function (newValue) {
      }
    },
  },
  watch: {
    'disposalRequest.ewstClassCd': function (newValue, oldValue) {
      this.getEwstWasteNoItems();
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
        this.getEwstClassCdItems();
        this.getEwstWasteNoItems();
        this.getEnvUnitCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '폐기물분류', name: 'ewstClassNm', width: '160px', align: 'center' },
        { text: '폐기물', name: 'ewstWasteNm', width: '160px' },
        { text: '요청일', name: 'reqYmd', width: '120px', align: 'center' },
        { text: '요청부서', name: 'reqDeptNm', width: '120px', align: 'center' },
        { text: '요청자', name: 'reqUserNm', width: '120px', align: 'center' },
        { text: '처리상태', name: 'ewstDispoStNm', width: '100px', align: 'center' },
        { text: '발생량', name: 'amtGen', width: '100px', align: 'right' },
        { text: '단위', name: 'envUnitNm', width: '120px', align: 'center' },        
        { text: '비고', name: 'remark', width: '350px' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = transactionConfig.env.waste.operationLog.disposalRequest.insert.url;
      this.editUrl = transactionConfig.env.waste.operationLog.disposalRequest.edit.url;
      this.searchUrl = selectConfig.env.waste.operationLog.disposalRequest.list.url;
      this.detailUrl = selectConfig.env.waste.operationLog.disposalRequest.get.url;

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
      this.$http.url = this.$format(this.detailUrl, data.ewstDispoReqNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.disposalRequest = _result.data;
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
    getEwstClassCdItems () {
      this.$http.url = selectConfig.env.waste.baseInfo.wasteClass.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'        
      }
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'ewstClassCd': null, 'ewstClassNm': '선택하세요' });        
        this.ewstClassCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEwstWasteNoItems () {
      this.$http.url = selectConfig.env.waste.baseInfo.waste.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y',
        'ewstClassCd': this.disposalRequest.ewstClassCd
      }
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'ewstWasteNo': null, 'ewstWasteNm': '선택하세요' });        
        this.ewstWasteNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEnvUnitCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'ENV_UNIT');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.envUnitCdItems = _result.data;
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

    btnDeleteClicked () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '폐기물 처리요청 정보를 삭제하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.$http.url = this.$format(transactionConfig.env.waste.operationLog.disposalRequest.delete.url, this.disposalRequest.ewstDispoReqNo);
          this.$http.type = 'delete';      
          this.$http.request((_result) => {
            this.getList();
            this.btnClearClickedCallback(_result);
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '폐기물 처리요청 정보를 정상적으로 삭제하였습니다.',
              type: 'success',
            });
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
          });
        }
      });
    },
    beforeCreateSubmit () {
      this.disposalRequest.ewstDispoReqNo = 0;
      this.updateMode = false;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '폐기물 처리요청 정보를 저장 하시겠습니까?',
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
            message: '폐기물 처리요청 정보를 수정하시겠습니까?',
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
      Object.assign(this.$data.disposalRequest, this.$options.data().disposalRequest);
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.disposalRequest.ewstDispoReqNo = _result.data;
      this.getDetail(this.disposalRequest);
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '폐기물 처리요청 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '폐기물 처리요청 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      this.isUpdateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },

    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.disposalRequest.reqUserId = data.user.userId;
        this.disposalRequest.reqUserNm = data.user.userNm;
        this.disposalRequest.reqDeptCd = data.user.deptCd;
        this.disposalRequest.reqDeptNm = data.user.deptNm;
      }
    },
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '요청자검색';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },    
  }
};
</script>