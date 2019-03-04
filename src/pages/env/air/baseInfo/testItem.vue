<!--
  목적 : 대기-검사항목
  작성자 : khk
  Detail : 대기 검사항목 관리
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
            label="검사항목 목록"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data" 
            @selectedRow="getDetail"
            />
          </b-col>
      </b-col>      
    </b-row>

    <b-row class="mt-3" ref="detailBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="검사항목 등록" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>          
          <b-row> 
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :required="true"
                :maxlength="30"
                ui="bootstrap"
                label="검사항목명"
                name="eairTestItemNm"                
                v-model="testItem.eairTestItemNm"
                v-validate="'required'"
                :state="validateState('eairTestItemNm')"
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
                v-model="testItem.envUnitCd"
                v-validate="'required'"
                :state="validateState('envUnitCd')"
              >
              </y-select>
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
                label="배출량계산 팩터"
                name="dischAmtCalcFactor"
                v-model="testItem.dischAmtCalcFactor"
                v-validate="'required'"
                :state="validateState('dischAmtCalcFactor')"
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
                label="법적기준"
                name="legalLimit"
                v-model="testItem.legalLimit"
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
                label="자체기준"
                name="selfLimit"
                v-model="testItem.selfLimit"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="eairInstCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="eairInstCd"
                label="검사기기"
                v-model="testItem.eairInstCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="eairTestMtdCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="eairTestMtdCd"
                label="검사방법"
                v-model="testItem.eairTestMtdCd"
              >
              </y-select>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="200"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="testItem.remark"
                :rows="2" />
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
                  v-model="testItem.useYn"
                  />
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
                v-model="testItem.sortOrder"
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
              :param="testItem"
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
              :param="testItem"
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
  name: 'test-item',
  props: {
  },
  data () {
    return {
      testItem: {
        eairTestItemCd: '',
        eairTestItemNm: '',
        envUnitCd: null,
        envUniNm: '',
        dischAmtCalcFactor: null,
        remark: '',
        sortOrder: null,
        useYn: 'Y',
        createUserId: '',
        createUserNm: '',
        createDt: '',
        updateUserId: '',
        updateUserNm: '',
        updateDt: '',
        legalLimit: null,
        selfLimit: null,
        eairInstCd: '',
        eairInstNm: '',
        eairTestMtdCd: '',
        eairTestMtdNm: ''
      },
      codeGroup: {
        codeGroupCd: '',
        codeLength: 5
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

      envUnitCdItems: [],
      eairInstCdItems: [],
      eairTestMtdCdItems: [],

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
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestory () {
    window.removeEventListener('resize', this.setGridSize);
  },
  methods: {
    init () {
      // 선택항목 설정
      setTimeout(() => {        
        this.getEnvUnitCdItems();
        this.getEairInstCdItems();
        this.getEairTestMtdCdItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검사항목', name: 'eairTestItemNm', width: '200px' },
        { text: '단위', name: 'envUnitNm', width: '100px', align: 'center' },
        { text: '배출량계산 팩터', name: 'dischAmtCalcFactor', width: '160px', align: 'right' },
        { text: '법적기준', name: 'legalLimit', width: '120px', align: 'right' },        
        { text: '자체기준', name: 'selfLimit', width: '120px', align: 'right' },        
        { text: '검사기기', name: 'eairInstNm', width: '160px' },        
        { text: '검사방법', name: 'eairTestMtdNm', width: '160px' },                
        { text: '비고', name: 'remark', width: '500px' }, 
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = transactionConfig.env.air.baseInfo.testItem.insert.url;
      this.editUrl = transactionConfig.env.air.baseInfo.testItem.edit.url;
      this.searchUrl = selectConfig.env.air.baseInfo.testItem.list.url;
      this.detailUrl = selectConfig.env.air.baseInfo.testItem.get.url;

      this.getList();
      this.setGridSize();
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
      this.$http.url = this.$format(this.detailUrl, data.eairTestItemCd);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.testItem = _result.data;
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
    getEairInstCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EAIR_INST');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.eairInstCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEairTestMtdCdItems () {
      this.$http.url = this.$format(selectConfig.manage.codeMaster.getSelect.url, 'EAIR_TEST_MTD');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.eairTestMtdCdItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },    

    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.detailBox.clientHeight - 240;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    checkDuplicate () {
      var test = {
        'eairTestItemNm': this.testItem.eairTestItemNm
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {
        if (this.updateMode
          && this.testItem.eairTestItemCd === item.eairTestItemCd) {
          return false;
        }
          
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 검사항목명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },
    beforeCreateSubmit () {
      this.testItem.eairTestItemCd = '';
      this.updateMode = false;      
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '검사항목 정보를 저장 하시겠습니까?',
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
            message: '검사항목 정보를 수정하시겠습니까?',
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
      this.testItem.eairTestItemCd = '';
      this.testItem.eairTestItemNm = '';
      this.testItem.envUnitCd = '';
      this.testItem.envUniNm = '';
      this.testItem.dischAmtCalcFactor = null;
      this.testItem.remark = '';
      this.testItem.sortOrder = null;
      this.testItem.useYn = 'Y';
      this.testItem.createUserId = '';
      this.testItem.createUserNm = '';
      this.testItem.createDt = '';
      this.testItem.updateUserId = '';
      this.testItem.updateUserNm = '';
      this.testItem.updateDt = '';
      this.testItem.legalLimit = null;
      this.testItem.selfLimit = null;
      this.testItem.eairInstCd = '';
      this.testItem.eairInstNm = '';
      this.testItem.eairTestMtdCd = '';
      this.testItem.eairTestMtdNm = '';
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.testItem.eairTestItemCd = _result.data;
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '검사항목 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '검사항목 정보를 정상적으로 수정하였습니다.',
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