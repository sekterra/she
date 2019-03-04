<!--
  목적 : 수질약품 구입이력
  작성자 : kkc
  Detail : 수질약품 구입이력 조회,등록,수정
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
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
            label="구입이력 목록"
            ref="dataTable"
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
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="chemNoItems"
                itemText="ewtrChemNm"
                itemValue="ewtrChemNo"
                ui="bootstrap"
                label="약품명"
                name="ewtrChemNo"
                v-model="ewtrChemInHist.ewtrChemNo"
                :required="true"
                v-validate="'required'"
                :state="validateState('ewtrChemNo')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker 
                :width="8"
                :editable="editable"
                label="구입일"
                name="buyYmd"
                v-model="ewtrChemInHist.buyYmd"
                :required="true"
                v-validate="'required'"
                :state="validateState('buyYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
                :width="8"
                :editable="editable"
                :maxlength="9"
                :hasSeperator="false"
                :pointNumber="2"
                ui="bootstrap"
                label="구입량"
                name="buyAmt"
                v-model="ewtrChemInHist.buyAmt"
                :required="true"
              v-validate="'required'"
              :state="validateState('buyAmt')"
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
              :param="ewtrChemInHist"
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
              :param="ewtrChemInHist"
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
  name: 'chem-in-hist',
  props: {
    selectedChemNo: 0,
    paneName: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      ewtrChemInHist: {
        ewtrChemNo: null,
        buyYmd: '',
        buyAmt: '',
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
      editUrl: '',
      insertUrl: '',
      deleteUrl: '',
      chemNoItems: [],
      selectedValue: [],
    };
  },
  watch: {
    selectedChemNo: function (newValue, oldValue) {
      this.btnClearClickedCallback();
      this.ewtrChemInHist.ewtrChemNo = this.selectedChemNo;
      this.getList();
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
        this.getChemNoItems();
      }, 200);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '약품명', name: 'ewtrChemNm', width: '200px', align: 'left' },
        { text: '구입일', name: 'buyYmd', width: '200px', align: 'center' },
        { text: '구입량', name: 'buyAmt', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];

      this.editUrl = transactionConfig.env.water.baseInfo.chemInHist.edit.url;
      this.insertUrl = transactionConfig.env.water.baseInfo.chemInHist.insert.url;
      this.deleteUrl = transactionConfig.env.water.baseInfo.chemInHist.delete.url;

      if (this.selectedChemNo !== 0) {
        this.ewtrChemInHist.ewtrChemNo = this.selectedChemNo;
        this.getList();
      }
    },

    getList () {
      this.$http.url = selectConfig.env.water.baseInfo.chemInHist.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'ewtrChemNo': this.ewtrChemInHist.ewtrChemNo
      };
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDetail (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.env.water.baseInfo.chemInHist.get.url, data.ewtrChemInHistNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.ewtrChemInHist = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getChemNoItems () {
      this.$http.url = selectConfig.env.water.baseInfo.chemical.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'ewtrChemNo': null, 'ewtrChemNm': '선택하세요' });
        this.chemNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.updateMode = false;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수질약품 구입이력 정보를 저장하시겠습니까?',
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
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수질약품 구입이력 정보를 수정하시겠습니까?',
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
      this.ewtrChemInHist.ewtrChemInHistNo = _result.data;
      this.getList();
      this.isInsert = false;
      this.updateMode = true;
      this.$emit('changeGrid');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수질약품 구입이력 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnEditClickedCallback (_result) {
      this.getList();
      this.isEdit = false;
      this.$emit('changeGrid');
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수질약품 구입이력 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClearClickedCallback () {
      var temp = this.ewtrChemInHist.ewtrChemNo;
      Object.assign(this.$data.ewtrChemInHist, this.$options.data().ewtrChemInHist);
      this.$validator.reset();
      this.ewtrChemInHist.ewtrChemNo = temp;
      this.updateMode = false;
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    btnDeleteClicked () {
      if (this.selectedValue.length > 0) {
        window.getApp.$emit('CONFIRM', {
          title: '확인',
          message: '선택된 수질약품 구매이력 정보를 삭제하시겠습니까?',
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
              this.$emit('changeGrid');
              window.getApp.$emit('ALERT', {
                title: '안내',
                message: '수질약품 구매이력 정보를 정상적으로 삭제하였습니다.',
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
          message: '수질약품 구매이력 정보를 선택하세요.',
          type: 'warning'
        });
      }
    }
    /** end button 관련 이벤트 **/
  }
};
</script>