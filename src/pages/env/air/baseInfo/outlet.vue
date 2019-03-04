<!--
  목적 : 대기 배출구
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
                v-if="editable"
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                label="배출구명"
                name="searchEairOutletNm"                
                v-model="searchParam.eairOutletNm"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                label="배출구표시명"
                name="mainDischFacNm"                
                v-model="searchParam.mainDischFacNm"
                />
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
            label="배출구 목록"
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
            <y-label label="배출구 등록" icon="user-edit" color-class="cutstom-title-color" />
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
                label="배출구명"
                name="eairOutletNm"                
                v-model="outlet.eairOutletNm"
                v-validate="'required'"
                :state="validateState('eairOutletNm')"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="배출구직경(m)"
                name="eairOutletDiam"
                v-model="outlet.eairOutletDiam"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="5"
                :hasSeperator="false"
                ui="bootstrap"
                label="배출구높이(m)"
                name="eairOutletHt"
                v-model="outlet.eairOutletHt"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :editable="editable"
                :required="true"
                :maxlength="30"
                ui="bootstrap"
                label="배출구표시명"
                name="mainDischFacNm"                
                v-model="outlet.mainDischFacNm"
                v-validate="'required'"
                :state="validateState('mainDischFacNm')"
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
                  v-model="outlet.useYn"
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
                v-model="outlet.sortOrder"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-shuttlebox
                :width="10"
                :editable="editable"
                :items="eairTestItemCdsItems"
                :needDefaultView="true"
                itemText="eairTestItemNm"
                itemValue="eairTestItemCd"
                ui="bootstrap"
                label="검사항목 선택"
                name="heaCheckupOrgNo"
                v-model="outlet.eairTestItemCds"
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
              :param="outlet"
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
              :param="outlet"
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
  name: 'outlet',
  props: {
  },
  data () {
    return {
      outlet: {
        eairOutletNo: 0,
        eairOutletNm: '',      
        eairOutletDiam: null,
        eairOutletHt: null,
        mainDischFacNm: '',
        sortOrder: null,
        useYn: 'Y',
        createUserId: '',
        createUserNm: '',
        createDt: '',
        updateUserId: '',
        updateUserNm: '',
        updateDt: '',
        eairTestItemCds: [],
      },
      searchParam: {
        eairOutletNm: '',
        mainDischFacNm: ''
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

      eairTestItemCdsItems: [],

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
        this.getEairTestItemCdsItems();
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '배출구명', name: 'eairOutletNm', width: '200px', align: 'center' },
        { text: '배출구직경(m)', name: 'eairOutletDiam', width: '130px', align: 'right' },
        { text: '배출구높이(m)', name: 'eairOutletHt', width: '130px', align: 'right' },
        { text: '배출구표시명', name: 'mainDischFacNm', width: '250px' },        
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = transactionConfig.env.air.baseInfo.outlet.insert.url;
      this.editUrl = transactionConfig.env.air.baseInfo.outlet.edit.url;
      this.searchUrl = selectConfig.env.air.baseInfo.outlet.list.url;
      this.detailUrl = selectConfig.env.air.baseInfo.outlet.get.url;

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
      this.$http.url = this.$format(this.detailUrl, data.eairOutletNo);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.outlet = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getEairTestItemCdsItems () {
      this.$http.url = selectConfig.env.air.baseInfo.testItem.list.url;
      this.$http.type = 'get';      
      this.$http.param = {
        'useYn': 'Y'
      }
      this.$http.request((_result) => {
        this.eairTestItemCdsItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 645;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    checkDuplicate () {
      var test = {
        'eairOutletNm': this.outlet.eairOutletNm
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {
        if (this.updateMode
          && this.outlet.eairOutletNo === item.eairOutletNo) {
          return false;
        }

        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 배출구명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },
    beforeCreateSubmit () {
      this.outlet.eairOutletNo = 0;
      this.updateMode = false;      
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '배출구 정보를 저장 하시겠습니까?',
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
            message: '배출구 정보를 수정하시겠습니까?',
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
      this.outlet.eairOutletNo = 0;
      this.outlet.eairOutletNm = '';    
      this.outlet.eairOutletDiam = null;
      this.outlet.eairOutletHt = null;
      this.outlet.mainDischFacNm = '';
      this.outlet.sortOrder = null;
      this.outlet.useYn = 'Y';
      this.outlet.createUserId = '';
      this.outlet.createUserNm = '';
      this.outlet.createDt = '';
      this.outlet.updateUserId = '';
      this.outlet.updateUserNm = '';
      this.outlet.updateDt = '';
      this.outlet.eairTestItemCds = [];
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.outlet.eairOutletNo = _result.data;
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '배출구 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '배출구 정보를 정상적으로 수정하였습니다.',
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