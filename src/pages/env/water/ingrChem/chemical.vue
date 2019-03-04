<!--
  목적 : 수질약품 관리
  작성자 : kkc
  Detail : 수질약품 조회,등록,수정
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <!-- 등록 -->
    <b-row class="mt-3" ref="insertBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="수질약품 상세" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="30"
              ui="bootstrap"
              label="약품명"
              name="ewtrChemNm"
              v-model="ewtrChem.ewtrChemNm"
              :required="true"
              v-validate="'required'"
              :state="validateState('ewtrChemNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="현재재고량"
                name="amountCurr"
                v-model="ewtrChem.amountCurr"
                :required="true"
                v-validate="'required'"
                :state="validateState('amountCurr')"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="ewtrChem.remark"
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
                v-model="ewtrChem.useYn"
                :required="true"
              >
            </y-switch>
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
              :param="ewtrChem"
              :is-submit="isInsert"
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
              :param="ewtrChem"
              :is-submit="isEdit"
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
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'chemical',
  props: {
    selectedChemNo: 0,
  },
  data () {
    return {
      ewtrChem: {
        ewtrChemNo: 0,
        ewtrChemNm: '',
        amountCurr: null,
        remark: '',
        useYn: 'Y',
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      editable: true,
      updateMode: false,
      isInsert: false,
      isEdit: false,
      useYnItems: [],
      editUrl: '',
      insertUrl: '',
    };
  },
  watch: {
    selectedChemNo: function (newValue, oldValue) {
      this.ewtrChem.ewtrChemNo = this.selectedChemNo;
      this.getDetail();
      this.getList();
    },
    paneName: {
      type: String,
      default: ''
    },
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
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
  beforeDestroy () {
  },
  //* methods */
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      setTimeout(() => {
        this.useYnItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 200);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '약품명', name: 'ewtrChemNm', width: '200px', align: 'left' },
        { text: '현재 재고량', name: 'amountCurr', width: '150px', align: 'center' },
        { text: '비고', name: 'remark', width: '300px', align: 'left' },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];

      this.editUrl = transactionConfig.env.water.baseInfo.chemical.edit.url;
      this.insertUrl = transactionConfig.env.water.baseInfo.chemical.insert.url;

      this.getList();
    },

    getList () {
      this.$http.url = selectConfig.env.water.baseInfo.chemical.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDetail (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.env.water.baseInfo.chemical.get.url, this.ewtrChem.ewtrChemNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.ewtrChem = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.ewtrChem.ewtrChemNo = '';
      this.updateMode = false;
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수질약품 정보를 저장하시겠습니까?',
            type: 'info',
            confirmCallback: () => {
              this.isInsert = true;
            },
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수질약품 정보를 수정하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              this.isEdit = true;
            },
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },

    checkDuplicate () {
      var test = {
        'ewtrChemNm': this.ewtrChem.ewtrChemNm
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {
        if (this.updateMode
          && this.ewtrChem.ewtrChemNo === item.ewtrChemNo) {
          return false;
        }
          
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 수질약품명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
    },

    /**
     * 필수입력값 유효성 검사
     */
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    
    /** button 관련 이벤트 **/
    btnInsertClickedCallback (_result) {
      this.ewtrChem.ewtrChemNo = _result.data;
      this.getList();
      this.isInsert = false;
      this.updateMode = true;
      this.$emit('changeGrid');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수질약품 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnEditClickedCallback (_result) {
      this.getList();
      this.isEdit = false;
      this.$emit('changeGrid');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수질약품 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.ewtrChem, this.$options.data().ewtrChem);
      this.$validator.reset();
      this.updateMode = false;
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>