<!--
  목적 : 건강검진 계획
  작성자 : kga
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
        <div slot="buttonGroup" class="float-right mb-1">
          <y-btn 
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDelete"
              type="delete"
              title="삭제"
              size="mini"
              color="danger"
              action-type="DELETE"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
        </div>
          <y-data-table 
            label="건강검진 계획 목록"
            :headers="checkupPlanGridHeaderOptions"
            :items="checkupPlanGridData"
            :editable="editable"
            :excel-down="true"
            :print="true"
            :rows="4"
            v-model="selectedValue"
            ref="dataTable"
            @selectedRow="selectedRow"
            >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>

      <b-row class="mt-3">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="건강검진 계획 상세" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
          <b-card>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="baseWidth"
                  :editable="editable"
                  :comboItems="heaCheckupClassItems"
                  :required="true"
                  itemText="codeNm"
                  itemValue="code"
                  ui="bootstrap"
                  label="건강검진 종류"
                  name="heaCheckupClassCd"
                  v-model="checkupPlan.heaCheckupClassCd"
                  v-validate="'required'"
                  :state="validateState('heaCheckupClassCd')"
                >
                </y-select>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="7"
                  :editable="editable"
                  :maxlength="30"
                  :required="true"
                  ui="bootstrap"
                  label="건강검진 계획명"
                  name="heaCheckupPlanNm"
                  v-model="checkupPlan.heaCheckupPlanNm"
                  v-validate="'required'"
                  :state="validateState('heaCheckupPlanNm')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                  :width="baseWidth"
                  :editable="editable"
                  :range="true"
                  :required="true"
                  label="건강검진 기간"
                  name="period"
                  v-model="checkupPlan.period"
                  v-validate="'required'"
                  :state="validateState('period')"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-datepicker
                  :width="7"
                  :editable="editable"
                  label="건강검진 예약 마감일"
                  name="finishYmd"
                  v-model="checkupPlan.finishYmd"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-8">
                <y-shuttlebox
                  :width="10"
                  :editable="editable"
                  :items="heaCheckupOrgItems"
                  :needDefaultView="true"
                  itemText="heaCheckupOrgNm"
                  itemValue="heaCheckupOrgNo"
                  ui="bootstrap"
                  label="건강검진 기관 선택"
                  name="heaCheckupOrgNo"
                  v-model="checkupPlan.selectedHeaCheckupOrgNos"
                  >
                </y-shuttlebox>
              </b-col>
            </b-row>
            <div class="float-right mt-3">
              <y-btn
                v-if="editable"
                type="clear"
                title="초기화"
                size="small"
                color="info"
                @btnClicked="btnClearClickedCallback" 
              />
              <y-btn
                v-if="editable"
                :action-url="insertUrl"
                :param="checkupPlan"
                :is-submit="isInsert"
                type="save"
                title="신규등록"
                size="small"
                color="warning"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="editable&&updateMode"
                :action-url="editUrl"
                :param="checkupPlan"
                :is-submit="isEmit"
                type="save"
                title="수정"
                size="small"
                color="warning"
                action-type="PUT"
                beforeSubmit = "beforeEmit"
                @beforeEmit="beforeEmit"
                @btnClicked="btnEmitClickedCallback" 
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
  name: 'checkup-plan',  
  data () {
    return {
      checkupPlan: {
        heaCheckupClassCd: null,
        heaCheckupPlanNm: '',
        duration: null,
        period: null,
        finishYmd: '',
        selectedHeaCheckupOrgNos: [],
        startYmd: '',
        endYmd: '',
      },
      baseWidth: 8,
      editable: true,
      updateMode: false,
      heaCheckupClassItems: [],
      checkupPlanGridData: [],
      checkupPlanGridHeaderOptions: [],
      heaCheckupOrgItems: [],
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      isInsert: false,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
      isEmit: false,  
      isDelete: false,  
      selectedValue: [],
      deleteValue: null,
      searchParam: {
        heaDiagnoseCds: [],
      }
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
    // this.getComboItems();  // 건강검진 종류
    // this.getHeaCheckupOrgItems(); // 건강검진 기관
    // this.getDataList();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // URL 셋팅
      this.searchUrl = selectConfig.checkupPlan.list.url;
      this.insertUrl = transactionConfig.checkupPlan.insert.url;
      this.editUrl = transactionConfig.checkupPlan.edit.url;
      this.deleteUrl = transactionConfig.checkupPlan.delete.url;

      // TODO : backend에서 데이터를 조회해 올것
      setTimeout(() => {
        this.getComboItems();  // 건강검진 종류
        this.getHeaCheckupOrgItems(); // 건강검진 기관
        this.getDataList();
      }, 100);

      // 건강검진 계획 그리드 헤더 설정
      this.checkupPlanGridHeaderOptions = [
        { text: '건강검진종류', name: 'heaCheckupClassNm', width: '20%', align: 'center' },
        { text: '건강검진계획', name: 'heaCheckupPlanNm', width: '50%' },
        { text: '건강검진일정', name: 'heaCheckupPlanPeriod', width: '30%', align: 'center' },
      ];
    },

      
    /** /초기화 관련 함수 **/
    
    /** Call API service **/
    // 건강검진 종류
    getComboItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'HEA_CHECKUP_CLASS');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.heaCheckupClassItems = this.$_.clone(_result.data);
        this.heaCheckupClassItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
        this.checkupPlan.heaCheckupClassCd = '';
      }, (_error) => {
      });
    },
    getHeaCheckupOrgItems () {
      console.log(this.heaCheckupOrgNo);
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.heaCheckupOrgItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.checkupPlanGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.checkupPlan.get.url, data.heaCheckupPlanNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.checkupPlan = this.$_.clone(_result.data);
        this.checkupPlan.period = [this.checkupPlan.startYmd, this.checkupPlan.endYmd];
        
        // 등록된 계획별 검진기관 리스트 
        this.$http.url = selectConfig.checkupPlanOrg.list.url;
        this.$http.type = 'GET';
        this.$http.param = {
          'heaCheckupPlanNo': this.checkupPlan.heaCheckupPlanNo
        };
        this.$http.request((_result) => {
          this.checkupPlan.selectedHeaCheckupOrgNos = this.$_.map(_result.data, 'heaCheckupPlanNo');
        }, (_error) => {
          console.log(_error);
        });
      }, (_error) => {
        console.log(_error);
      });
    },
    /** /Call API service **/
    
    /** validation checking **/
    beforeInsert () {
      if (window.confirm("저장하시겠습니까?"))
      {
        this.checkupPlan.startYmd = this.$comm.moment(this.checkupPlan.period[0]).format('YYYY-MM-DD');
        this.checkupPlan.endYmd = this.$comm.moment(this.checkupPlan.period[1]).format('YYYY-MM-DD');
        this.checkValidationInsert();
      }
    },
    beforeEmit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkupPlan.startYmd = this.$comm.moment(this.checkupPlan.period[0]).format('YYYY-MM-DD');
        this.checkupPlan.endYmd = this.$comm.moment(this.checkupPlan.period[1]).format('YYYY-MM-DD');
        this.checkValidationEmit();
      }
    },
    beforeDelete () {
      if (this.selectedValue.length === 0) 
      {
        window.alert("항목을 선택해주세요.");
        return;
      }

      if (window.confirm("삭제하시겠습니까?"))
      {
        this.deleteValue = {
          'data': Object.values(this.$_.clone(this.selectedValue))
        };
        this.isDelete = true;
      }
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        if (!this.isInsert) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    checkValidationEmit () {
      this.$validator.validateAll().then((_result) => {
        this.isEmit = _result;
        if (!this.isEmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    
    /** /Component, Callbacks (버튼 제외) **/

    /** Button Event **/
    // 신규등록
    btnInsertClickedCallback (_result) {
      this.getDataList();
      this.updateMode = true;
      this.isInsert = false;
      window.alert("저장되었습니다.");
      // window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    btnEmitClickedCallback (_result) {
      this.getDataList();
      this.updateMode = true;
      this.isEmit = false;
      window.alert("수정되었습니다.");
      // window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.isInsert = false;  // 반드시 isInsert을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    // 초기화
    btnClearClickedCallback () {
      this.updateMode = false;
      Object.assign(this.$data.checkupPlan, this.$options.data().checkupPlan);
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      this.getDataList();
      this.isDelete = false;
      window.alert("삭제되었습니다.");
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '삭제 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/

    /** /Button Event **/
    
    /** 기타 function **/
    
    /** /기타 function **/
  }
};
</script>