<!--
  목적 : 약품관리 - 약품관리
  작성자 : kckim
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
          <y-data-table
            title="약품 목록"
            label="약품 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="selectedRow"
          />
        </b-col>

        <!-- 등록 -->
        <b-row class="mt-3" ref="insertBox">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="약품 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    label="약품명"
                    name="heaDrugNm"
                    v-model="heaDrug.heaDrugNm"
                    :required="true"
                    v-validate="'required'"
                    :state="validateState('heaDrugNm')"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="15"
                    ui="bootstrap"
                    label="단위"
                    name="unit"
                    v-model="heaDrug.unit"
                  >
                  </y-text>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="5"
                    ui="bootstrap"
                    label="적정 재고량"
                    name="amountLimit"
                    v-model="heaDrug.amountLimit"
                  >
                  </y-number>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="7"
                    ui="bootstrap"
                    label="현재 재고량"
                    name="amountCurr"
                    v-model="heaDrug.amountCurr"
                  >
                  </y-number>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-switch
                    :width="baseWidth"
                    :editable="editable"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="사용여부"
                    name="useYn"
                    selectText="사용"
                    unselectText="미사용"
                    :required="true"
                    v-model="heaDrug.useYn"
                  >
                  </y-switch>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-number
                    :width="baseWidth"
                    :editable="editable"
                    :maxlength="5"
                    ui="bootstrap"
                    label="정렬순서"
                    name="sortOrder"
                    v-model="heaDrug.sortOrder"
                  >
                  </y-number>
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
                    :param="heaDrug"
                    :is-submit="isInsertSubmit"
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
                    :param="heaDrug"
                    :is-submit="isEditSubmit"
                    title="수정"
                    color="orange"
                    action-type="PUT"
                    beforeSubmit = "beforeEdit"
                    @beforeEdit="beforeEdit"
                    @btnClicked="btnEditClickedCallback" 
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
  /** attributes: name, components, props, data **/
  name: 'drug-manage',
  props: {
  },
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      heaDrug: {
        heaDrugNo: 0,
        heaDrugNm: '',
        unit: '',
        amountLimit: '',
        amountCurr: '',
        sortOrder: '',
        useYn: 'Y',
        createUserId: '',
        creatDt: '',
        updateUserId: '',
        updateDt: '',
      },
      baseWidth: 8,
      widthTwoCols: 10,
      editable: true,
      updateMode: false,
      useYnItems: [],
      isInsertSubmit: false,
      isEditSubmit: false,
      editUrl: '',
      insertUrl: '',
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
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
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSize);
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.gridOptions.header = [
        { text: '약품', name: 'heaDrugNm', width: '20%', align: 'left' },
        { text: '단위', name: 'unit', width: '10%', align: 'center' },
        { text: '적정 재고량', name: 'amountLimit', width: '10%', align: 'center' },
        { text: '현재 재고량', name: 'amountCurr', width: '10%', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '10%', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '10%', align: 'center' },
      ];

      this.searchUrl = selectConfig.drugManage.list.url;
      this.insertUrl = transactionConfig.drugManage.insert.url;
      this.editUrl = transactionConfig.drugManage.edit.url;

      this.getUseYnItems();
      this.getDrugManages();
      this.setGridSize();
    },
    /** /초기화 관련 함수 **/
    getUseYnItems () {
      setTimeout(() => {
        this.useYnItems = [
          { useYn: 'Y', useYnNm: '사용' },
          { useYn: 'N', useYnNm: '미사용' },
        ];
      }, 200);
    },
    // 약품관리 조회
    getDrugManages () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDrugManage (data) {
      Object.assign(this.heaDrug, data);
      this.updateMode = true;
    },
    beforeInsert () {
      this.heaDrug.heaDrugNo = '';
      this.updateMode = false;      
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '약품 정보를 저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsertSubmit = true;
            }
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    beforeEdit () {
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '약품 정보를 수정하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isEditSubmit = true;
            }
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },

    checkDuplicate () {
      var test = {
        'heaDrugNm': this.heaDrug.heaDrugNm
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {
        if (this.updateMode
          && this.heaDrug.heaDrugNo === item.heaDrugNo) {
          return false;
        }
          
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 약품명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },

    /** validation checking **/
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.insertBox.clientHeight - 160;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    /** Button Event **/
    btnInsertClickedCallback (_result) {
      this.heaDrug.heaDrugNo = _result.data;
      this.getDrugManages();
      this.isInsertSubmit = false;
      this.updateMode = true;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '약품 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnEditClickedCallback (_result) {
      this.getDrugManages();
      this.isEditSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '약품 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      this.isEditSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.heaDrug, this.$options.data().heaDrug);
      this.$validator.reset();
      this.updateMode = false;
    },
    selectedRow (row) {
      this.getDrugManage(row);
    },
    /** /Button Event **/
    
  }
  /** /methods **/
};
</script>