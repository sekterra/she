<!--
  목적 : 폐기물-폐기물
  작성자 : khk
  Detail : 폐기물 관리
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataTable"
            label="폐기물 목록"
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
            <y-label label="폐기물 등록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>          
          <b-row> 
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :required="true"
                :comboItems="ewstClassCdItems"
                itemText="ewstClassNm"
                itemValue="ewstClassCd"
                ui="bootstrap"
                name="ewstClassCd"
                label="폐기물분류"
                v-model="waste.ewstClassCd"
                v-validate="'required'"
                :state="validateState('ewstClassCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :required="true"
                :maxlength="30"
                ui="bootstrap"
                label="폐기물명"
                name="ewstWasteNm"                
                v-model="waste.ewstWasteNm"
                v-validate="'required'"
                :state="validateState('ewstWasteNm')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :required="true"
                :comboItems="ewstDispoMtdCdItems"
                itemText="ewstDispoMtdNm"
                itemValue="ewstDispoMtdCd"
                ui="bootstrap"
                name="ewstDispoMtdCd"
                label="처리방법"
                v-model="waste.ewstDispoMtdCd"
                v-validate="'required'"
                :state="validateState('ewstDispoMtdCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :required="true"
                :comboItems="ewstPhaseCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="ewstPhaseCd"
                label="성질/상태"
                v-model="waste.ewstPhaseCd"
                v-validate="'required'"
                :state="validateState('ewstPhaseCd')"
              >
              </y-select>
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
                v-model="waste.ewstDispoDivCd"
                v-validate="'required'"
                :state="validateState('ewstDispoDivCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="ewstDispoCyCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="ewstDispoCyCd"
                label="처리주기"
                v-model="waste.ewstDispoCyCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="정렬순서"
                name="sortOrder"
                v-model="waste.sortOrder"
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
                  v-model="waste.useYn"
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
              :param="waste"
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
              :param="waste"
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
  name: 'waste',
  props: {
  },
  data () {
    return {
      waste: {
        ewstWasteNo: 0,
        ewstWasteNm: '',
        ewstClassCd: null,
        ewstClassNm: '',
        ewstDispoMtdCd: null,
        ewstDispoMtdNm: '',
        ewstPhaseCd: null,
        ewstPhaseNm: '',
        ewstDispoDivCd: null,
        ewstDispoDivNm: '',
        ewstDispoCyCd: null,
        ewstDispoCyNm: '',
        sortOrder: null,
        useYn: 'Y',
        createUserId: '',
        createUserNm: '',
        createDt: '',
        updateUserId: '',
        updateUserNm: '',
        updateDt: '',
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

      ewstClassCdItems: [],
      ewstDispoMtdCdItems: [],
      ewstPhaseCdItems: [],
      ewstDispoDivCdItems: [],
      ewstDispoCyCdItems: [],

      insertUrl: '',
      editUrl: '',
      searchUrl: '',
      detailUrl: '',
    };
  },
  watch: {
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
        this.getEwstClassCdItems();
        this.getEwstDispoMtdCdItems();
        this.getEwstPhaseCdItems();
        this.getEwstDispoDivCdItems();
        this.getEwstDispoCyCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '폐기물분류', name: 'ewstClassNm', width: '160px', align: 'center' },
        { text: '폐기물명', name: 'ewstWasteNm', width: '200px' },
        { text: '처리방법', name: 'ewstDispoMtdNm', width: '160px', align: 'center' },
        { text: '성질/상태', name: 'ewstPhaseNm', width: '120px', align: 'center' },
        { text: '처리구분', name: 'ewstDispoDivNm', width: '120px', align: 'center' },
        { text: '처리주기', name: 'ewstDispoCyNm', width: '120px', align: 'center' },
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = transactionConfig.env.waste.baseInfo.waste.insert.url;
      this.editUrl = transactionConfig.env.waste.baseInfo.waste.edit.url;
      this.searchUrl = selectConfig.env.waste.baseInfo.waste.list.url;
      this.detailUrl = selectConfig.env.waste.baseInfo.waste.get.url;

      this.getList();
    },

    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';      
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDetail (data) {
      this.$http.url = this.$format(this.detailUrl, data.ewstWasteNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.waste = _result.data;
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
    getEwstDispoMtdCdItems () {
      this.$http.url = selectConfig.env.waste.baseInfo.wasteDisposalMethod.list.url;
      this.$http.type = 'get';      
      this.$http.param = {
        'useYn': 'Y'
      }
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'ewstDispoMtdCd': null, 'ewstDispoMtdNm': '선택하세요' });
        this.ewstDispoMtdCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEwstPhaseCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EWST_PHASE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.ewstPhaseCdItems = _result.data;
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
    getEwstDispoCyCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EWST_DISPO_CY');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
        this.ewstDispoCyCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    checkDuplicate () {
      var test = {
        'ewstWasteNm': this.waste.ewstWasteNm
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {
        if (this.updateMode
          && this.waste.ewstWasteNo === item.ewstWasteNo) {
          return false;
        }
          
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 폐기물명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },
    beforeCreateSubmit () {
      this.waste.ewstWasteNo = 0;
      this.updateMode = false;      
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '폐기물 정보를 저장 하시겠습니까?',
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
            message: '폐기물 정보를 수정하시겠습니까?',
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
      this.waste.ewstWasteNo = 0;
      this.waste.ewstWasteNm = '';
      this.waste.ewstClassCd = null;
      this.waste.ewstClassNm = '';
      this.waste.ewstDispoMtdCd = null;
      this.waste.ewstDispoMtdNm = '';
      this.waste.ewstPhaseCd = null;
      this.waste.ewstPhaseNm = '';
      this.waste.ewstDispoDivCd = null;
      this.waste.ewstDispoDivNm = '';
      this.waste.ewstDispoCyCd = null;
      this.waste.ewstDispoCyNm = '';
      this.waste.sortOrder = null;
      this.waste.useYn = 'Y';
      this.waste.createUserId = '';
      this.waste.createUserNm = '';
      this.waste.createDt = '';
      this.waste.updateUserId = '';
      this.waste.updateUserNm = '';
      this.waste.updateDt = '';
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.waste.ewstWasteNo = _result.data;
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '폐기물 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '폐기물 정보를 정상적으로 수정하였습니다.',
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