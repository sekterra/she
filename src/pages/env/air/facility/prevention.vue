<!--
  목적 : 대기-방지시설
  작성자 : khk
  Detail : 대기 방지시설 관리
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col sm="12">
        <b-card>          
          <b-row> 
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="eairOutletNoItems"
                itemText="eairOutletNm"
                itemValue="eairOutletNo"
                ui="bootstrap"
                name="eairOutletNo"
                label="배출구"
                v-model="prevention.eairOutletNo"
                v-validate="'required'"
                :state="validateState('eairOutletNo')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="eairPreventFacClassCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="eairPreventFacClassCd"
                label="방지시설분류"
                v-model="prevention.eairPreventFacClassCd"
                v-validate="'required'"
                :state="validateState('eairPreventFacClassCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :maxlength="30"
                ui="bootstrap"
                label="방지시설명"
                name="eairPreventFacNm"                
                v-model="prevention.eairPreventFacNm"
                v-validate="'required'"
                :state="validateState('eairPreventFacNm')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :maxlength="30"
                ui="bootstrap"
                label="설치위치"
                name="installPos"
                v-model="prevention.installPos"
                />
            </b-col>            
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="출력순서"
                name="sortOrder"
                v-model="prevention.sortOrder"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-switch
                  :width="8"
                  :editable="editable"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="사용여부"
                  name="useYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="prevention.useYn"
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
              :param="prevention"
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
              :param="prevention"
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
  name: 'prevention',
  props: {
    selectedEairPreventFacNo: 0,
    selectedTabIndex: 0
  },
  data () {
    return {
      prevention: {
        eairPreventFacNo: 0,
        eairPreventFacNm: '',
        eairPreventFacClassCd: '',
        eairPreventFacClassNm: '',
        eairOutletNo: null,
        eairOutletNm: '',
        installPos: '',
        sortOrder: null,
        useYn: 'Y',
        createUserId: '',
        createUserNm: '',
        createDt: '',
        updateUserId: '',
        updateUserNm: '',
        updateDt: '',
      },
      editable: true,
      updateMode: false,
      isCreateSubmit: false,
      isUpdateSubmit: false,

      eairOutletNoItems: [],
      eairPreventFacClassCdItems: [],

      totalData: [],

      insertUrl: '',
      editUrl: '',
      searchUrl: '',
      detailUrl: '',
    };
  },
  watch: {
    selectedEairPreventFacNo: function (newValue, oldValue) {
      this.prevention.eairPreventFacNo = this.selectedEairPreventFacNo;
      this.getDetail();
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
        this.getEairOutletNoItems();
        this.getEairPreventFacClassCdItems();
      }, 200);
      
      this.insertUrl = transactionConfig.env.air.facility.prevention.insert.url;
      this.editUrl = transactionConfig.env.air.facility.prevention.edit.url;
      this.searchUrl = selectConfig.env.air.facility.prevention.list.url;
      this.detailUrl = selectConfig.env.air.facility.prevention.get.url;

      this.getList();
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.totalData = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    }, 

    getDetail () {
      this.$http.url = this.$format(this.detailUrl, this.selectedEairPreventFacNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.prevention = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    getEairOutletNoItems () {
      this.$http.url = selectConfig.env.air.baseInfo.outlet.list.url;
      this.$http.type = 'get';      
      this.$http.param = {
        'useYn': 'Y'
      }
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'eairOutletNo': null, 'eairOutletNm': '선택하세요' });
        this.eairOutletNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEairPreventFacClassCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EAIR_PREVENT_FAC_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.eairPreventFacClassCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    checkDuplicate () {
      var test = {
        'eairPreventFacNm': this.prevention.eairPreventFacNm
      };
      var item = this.$_.find(this.totalData, test);
      if (item != null) {
        if (this.updateMode
          && this.prevention.eairPreventFacNo === item.eairPreventFacNo) {
          return false;
        }
          
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 방지시설명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },
    beforeCreateSubmit () {
      this.prevention.eairPreventFacNo = 0;
      this.updateMode = false;      
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '방지시설 정보를 저장 하시겠습니까?',
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
            message: '방지시설 정보를 수정하시겠습니까?',
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
      this.prevention.eairPreventFacNo = 0;
      this.prevention.eairPreventFacNm = '';
      this.prevention.eairPreventFacClassCd = '';
      this.prevention.eairPreventFacClassNm = '';
      this.prevention.eairOutletNo = null;
      this.prevention.eairOutletNm = '';
      this.prevention.installPos = '';
      this.prevention.sortOrder = null;
      this.prevention.useYn = 'Y';
      this.prevention.createUserId = '';
      this.prevention.createUserNm = '';
      this.prevention.createDt = '';
      this.prevention.updateUserId = '';
      this.prevention.updateUserNm = '';
      this.prevention.updateDt = '';
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.prevention.eairPreventFacNo = _result.data;
      this.getList(); 
      this.$emit('changePrevention');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '방지시설 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
      this.$emit('changePrevention');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '방지시설 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      this.isUpdateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
  }
};
</script>