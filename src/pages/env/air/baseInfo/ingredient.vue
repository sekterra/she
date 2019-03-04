<!--
  목적 : 대기-원료
  작성자 : khk
  Detail : 대기 원료 관리
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
            label="원료 목록"
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
            <y-label label="원료 등록" icon="user-edit" color-class="cutstom-title-color" />
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
                label="원료명"
                name="eairIngrNm"                
                v-model="ingredient.eairIngrNm"
                v-validate="'required'"
                :state="validateState('eairIngrNm')"
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
                v-model="ingredient.envUnitCd"
                v-validate="'required'"
                :state="validateState('envUnitCd')"
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
                v-model="ingredient.remark"
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
                  v-model="ingredient.useYn"
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
                v-model="ingredient.sortOrder"
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
              :param="ingredient"
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
              :param="ingredient"
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
  name: 'ingredient',
  props: {
  },
  data () {
    return {
      ingredient: {
        eairIngrCd: '',
        eairIngrNm: '',
        envUnitCd: null,
        envUniNm: '',
        remark: '',
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

      envUnitCdItems: [],

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
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '원료명', name: 'eairIngrNm', width: '200px' },
        { text: '단위', name: 'envUnitNm', width: '100px', align: 'center' },
        { text: '비고', name: 'remark', width: '500px' },        
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.insertUrl = transactionConfig.env.air.baseInfo.ingredient.insert.url;
      this.editUrl = transactionConfig.env.air.baseInfo.ingredient.edit.url;
      this.searchUrl = selectConfig.env.air.baseInfo.ingredient.list.url;
      this.detailUrl = selectConfig.env.air.baseInfo.ingredient.get.url;

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
      this.$http.url = this.$format(this.detailUrl, data.eairIngrCd);
      this.$http.type = 'get'; 
      this.$http.request((_result) => {
        this.updateMode = true;
        this.ingredient = _result.data;
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
        this.gridOptions.height = window.innerHeight - this.$refs.detailBox.clientHeight - 240;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    checkDuplicate () {
      var test = {
        'eairIngrNm': this.ingredient.eairIngrNm
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {
        if (this.updateMode
          && this.ingredient.eairIngrCd === item.eairIngrCd) {
          return false;
        }
          
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 원료명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },
    beforeCreateSubmit () {
      this.ingredient.eairIngrCd = '';
      this.updateMode = false;      
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '원료 정보를 저장 하시겠습니까?',
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
            message: '원료 정보를 수정하시겠습니까?',
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
      this.ingredient.eairIngrCd = '';
      this.ingredient.eairIngrNm = '';
      this.ingredient.envUnitCd = '';
      this.ingredient.envUniNm = '';
      this.ingredient.remark = '';
      this.ingredient.sortOrder = null;
      this.ingredient.useYn = 'Y';
      this.ingredient.createUserId = '';
      this.ingredient.createUserNm = '';
      this.ingredient.createDt = '';
      this.ingredient.updateUserId = '';
      this.ingredient.updateUserNm = '';
      this.ingredient.updateDt = '';
    },
    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      this.updateMode = true;
      this.ingredient.eairIngrCd = _result.data;
      this.getList(); 
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '원료 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnUpdateClickedCallback (_result) {
      this.isUpdateSubmit = false;
      this.getList();
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '원료 정보를 정상적으로 수정하였습니다.',
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