<!--
  목적 : 건강검진예약
  Detail : 사용자의 건강검진 예약 현황 및 예약을 하는 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-row>
            <b-col sm="12">
              <y-label :label="userText"></y-label>
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
            :headers="gridHeaderOptions"
            :items="gridData"
            :excel-down="true"
            :print="true"
            :rows="7"
            v-model="selectedValue"
            label="예약 건강검진 알림"
            @tableLinkClicked="tableLinkClicked"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="예약 내용" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckupOrgItems"
                :required="true"
                :needDefaultView="true"
                itemText="heaCheckupOrgNm"
                itemValue="heaCheckupOrgNo"
                ui="bootstrap"
                type="edit"
                name="heaCheckupOrgNo"
                label="건강검진병원"
                v-model="checkupResult.heaCheckupOrgNo"
                v-validate="'required'"
                :state="validateState('heaCheckupOrgNo')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              name="heaCheckupTypeNm"
              label="건강검진유형"
              v-model="checkupResult.heaCheckupTypeNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <!-- <y-checkbox
                :width="10"
                :editable="editable"
                :comboItems="heaOptionalTestItems"
                :required="true"
                itemText="heaTestItemNm"
                itemValue="heaTestItemCd"
                ui="bootstrap"
                name="selectedTestItemCd"
                label="선택항목(택1)"
                v-model="checkupResult.selectedTestItemCd"
                v-validate="'required'"
                :state="validateState('selectedTestItemCd')"
                />   -->
                <y-multi-select
                :width="8"
                :comboItems="heaOptionalTestItems"
                :needDefaultView="true"
                :required="true"
                v-model="checkupResult.selectedTempTestItemCd"
                type="edit"
                itemText="heaTestItemNm"
                itemValue="heaTestItemCd"
                ui="bootstrap"
                label="선택항목(택1)"
                name="selectedTempTestItemCd"
                v-validate="'required'"
                :state="validateState('selectedTempTestItemCd')"
              >
              </y-multi-select> 
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              
              <y-datepicker
                :width="8"
                :required="true"
                label="예약일 확인"
                name="reserveYmd"
                v-model="checkupResult.reserveYmd"
                v-validate="'required'"
                :state="validateState('reserveYmd')"
              >
              </y-datepicker>

              <!-- <y-datepicker
                :width="8"
                :editable="editable"
                label="예약일 확인"
                name="reserveYmd"
                v-model="checkupResult.reserveYmd"
              /> -->
            </b-col>
          </b-row>
          <div class="float-right mt-3" >
              <y-btn 
                v-if="insertable"
                :action-url="insertUrl"
                :param="checkupResult"
                :is-submit="isInsert"
                type="save"
                title="예약등록"
                size="small"
                color="warning"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="editable"
                :action-url="editUrl"
                :param="checkupResult"
                :is-submit="isEdit"
                type="save"
                title="저장"
                size="small"
                color="warning"
                action-type="PUT"
                beforeSubmit = "beforeSubmit"
                @beforeSubmit="beforeSubmit"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
        </b-card>
      </b-col>
    </b-row>
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
      center
      @close="closePopup" >
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closePopup" />
    </el-dialog>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-checkup-reserve',
  props: {
  },
  data: () => ({
    checkupResult: {
      heaCheckupPlanOrgNo: '',
      heaCheckupOrgNo: '',
      heaCheckupTypeNm: '',
      selectedTempTestItemCd: null,
      selectedTestItemCd: [],
      reserveYmd: '',
      consenYn: '',
    },
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      param: null
    },
    userText: "{사용자이름} 님의 건강검진예약 메뉴입니다.",
    period: null,
    baseWidth: 9,
    editable: false,
    insertable: false,
    isInsert: false,
    isEdit: false,
    gridData: [],
    gridHeaderOptions: [],
    comboCheckupOrgItems: [],
    heaOptionalTestItems: [],
    selectedValue: [],
    editUrl: '',
    insertUrl: '',
    currentHeaCheckupPlanNo: '',
  }),
  watch: {
    'checkupResult.heaCheckupOrgNo': {
      handler: function (value, oldVal) {
        if (value === '' || value === 0) return;

        this.getComboTestItems(this.currentHeaCheckupPlanNo, value); // 기관별 검사항목(선택항목)
      },
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
    this.getList();

    // // TODO : 팝업에서 보내는 정보 수신
    // window.getApp.$on('POPUP_SEND_DATA', this.popupSelectChanged);
  },
  mounted () {
  },
  beforeDestory () {
    // window.getApp.$off('POPUP_SEND_DATA', this.popupSelectChanged);
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.editUrl = transactionConfig.checkupReserve.edit.url;
      this.insertUrl = transactionConfig.checkupReserve.insert.url;

      setTimeout(() => {
        this.comboCheckupOrgItems = [
          { heaCheckupOrgNo: '', heaCheckupOrgNm: '선택하세요' },
        ];
        this.checkupResult.heaCheckupOrgNo = '';
      }, 100);
      
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        // { text: '건강검진년도', name: 'checkupYear', width: '150px', align: 'center' },
        { text: '예약관리', name: 'reserveManage', width: '150px', align: 'center', type: "link" },
        { text: '건강검진계획명', name: 'heaCheckupPlanNm', width: '180px', },
        { text: '건강검진종류', name: 'heaCheckupClassNm', width: '150px', },
        { text: '건강검진계획기간', name: 'heaCheckupPlanPeriod', width: '200px', align: 'center' },
        { text: '예약병원', name: 'heaCheckupOrgNm', width: '200px' },
        { text: '예약일자', name: 'reserveYmd', width: '130px', align: 'center' },
        { text: '검진일자', name: 'heaCheckedYmd', width: '130px', align: 'center' }
      ];
    },

    closePopup (data) {
      if (data === null || data === undefined) return;
      this.popupOptions.target = null;
      this.popupOptions.visible = false;

      // console.log("팝업 반환값");
      // console.log('heaCheckupPlanNo = ' + data.heaCheckupPlanNo);
      // console.log('heaCheckedOrgNo = ' + data.heaCheckedOrgNo);
      // console.log(data);
      
      this.getReserveData(data);
    },

    getReserveData (data) {
      if (data.heaCheckupPlanNo === null || data.heaCheckupPlanNo === undefined) return;

      if (data.heaCheckedOrgNo !== 0) 
      {
        this.editable = false;
      }
      else
      {
        this.editable = true;
      }
      this.insertable = true;
      this.checkupResult.consenYn = 'Y';
      this.currentHeaCheckupPlanNo = data.heaCheckupPlanNo;

      this.$http.url = selectConfig.checkupReserve.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaCheckupPlanNo': this.currentHeaCheckupPlanNo
      };
      this.$http.request((_result) => {
        this.checkupResult = this.$_.clone(_result.data[0]);

        this.getComboOrgItems(_result.data[0].checkupYear, _result.data[0].heaCheckupPlanNo, this.checkupResult.heaCheckupOrgNo); // 건강 검진 계획별 기관

        this.$http.url = selectConfig.testItemResult.list.url;
        this.$http.type = 'GET';
        this.$http.param = {
          'heaCheckupPlanNo': _result.data[0].heaCheckupPlanNo,
          'userId': 'dev'
        };
        this.$http.request((_result) => {
          // console.log("보자");
          // console.log(_result.data);
          setTimeout(() => {
            // this.checkupResult.selectedTempTestItemCd = [{ 'heaTestItemCd': '00003', 'heaTestItemNm': '안압검사(우)' }, { 'heaTestItemCd': '00001', 'heaTestItemNm': '안압검사(좌)' }]; // this.$_.map(_result.data, 'heaTestItemCd');
            // console.log(this.checkupResult.selectedTempTestItemCd);
          }, 100);
          // this.checkupResult.selectedTempTestItemCd = this.$_.clone(_result.data);
        }, (_error) => {
          console.log(_error);
        });

      }, (_error) => {
        console.log(_error);
      });
    },

    getComboOrgItems (selectedYear, heaCheckupPlanNo, heaCheckupOrgNo) {
      var today = new Date();
      var year = selectedYear != null ? selectedYear : today.getFullYear();
      var month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
      var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
      var date = year + '-' + month + '-' + day;

      this.$http.url = selectConfig.checkupPlanOrg.list.url;
      this.$http.param = {
        'heaCheckupPlanNo': heaCheckupPlanNo,
        'standardYmd': date
      }
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (heaCheckupPlanNo !== 0)
        {
          this.comboCheckupOrgItems = this.$_.clone(_result.data);
          this.comboCheckupOrgItems.splice(0, 0, { 'heaCheckupOrgNo': '', 'heaCheckupOrgNm': '선택하세요' });
          if (heaCheckupOrgNo !== null && heaCheckupOrgNo !== '' && heaCheckupOrgNo !== undefined)
          {
            setTimeout(() => {
              this.checkupResult.heaCheckupOrgNo = heaCheckupOrgNo;
            }, 100);
          }
          else
          {
            setTimeout(() => {
              this.checkupResult.heaCheckupOrgNo = '';
            }, 100);
          }
          if (this.comboCheckupOrgItems.length > 0)
          {
            this.checkupResult.heaCheckupOrgNo = this.$_.clone(this.comboCheckupOrgItems[0].heaCheckupOrgNo);
          }
        }
      }, (_error) => {
        console.log(_error);
      });
    },

    getComboTestItems (heaCheckupPlanNo, heaCheckupOrgNo) {
      this.$http.url = selectConfig.checkupPlanOrgTestItem.list.url;
      this.$http.param = {
        'heaCheckupPlanNo': heaCheckupPlanNo,
        'heaCheckupOrgNo': heaCheckupOrgNo
      };
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.heaOptionalTestItems = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });
    },

    /** 저장 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      var i;
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationSave();
        this.checkupResult.selectedTestItemCd = [];
        for (i = 0; i < this.checkupResult.selectedTempTestItemCd.length; i++)
        {
          this.checkupResult.selectedTestItemCd.push(this.checkupResult.selectedTempTestItemCd[i].code);
        }
      }
    },
    beforeInsert () {
      var i;
      if (window.confirm("예약하시겠습니까?"))
      {
        this.checkValidationInsert();
        this.checkupResult.selectedTestItemCd = [];
        for (i = 0; i < this.checkupResult.selectedTempTestItemCd.length; i++)
        {
          this.checkupResult.selectedTestItemCd.push(this.checkupResult.selectedTempTestItemCd[i].code);
        }
      }
    },
    tableLinkClicked (header, data) {
      if (data === null) return;

      if (data.consentYn === 'N')
      {
        this.popupOptions.target = () => import(`${'./checkupResultConsent.vue'}`);
        this.popupOptions.title = '결과활용 동의서';
        this.popupOptions.param = {
          heaCheckupPlanNo: data.heaCheckupPlanNo,
          heaCheckedOrgNo: data.heaCheckedOrgNo
        };
        this.popupOptions.visible = true;
      }
      else
      {
        this.getReserveData(data);
      }

      // window.getApp.$emit('POPUP_OPEN', {
      //   isPopupOpen: true,
      //   id: 'popup',
      //   label: '결과활용 동의서',
      //   editable: false,
      //   fullscreen: false,
      //   closeButtonText: '목록',
      //   confirmButtonText: '예약등록',
      //   type: 'checkupResultConsent',
      //   childProps: {
      //     heaCheckupPlanNo: data.heaCheckupPlanNo,
      //     heaCheckedOrgNo: data.heaCheckedOrgNo
      //   }
      // });
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidationSave () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    getList () {
      this.$http.url = selectConfig.checkupReserve.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaCheckupPlanNo': 0
      };
      this.$http.request((_result) => {
        this.gridData = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.isInsert = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      this.getList();
      window.alert("수정되었습니다.");
      this.isEdit = false;
      // this.$emit('APP_REQUEST_SUCCESS', '저장 버튼이 클릭 되었습니다.');
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      window.alert("저장되었습니다.");
      this.isInsert = false;
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.checkupResult, this.$options.data().checkupResult);
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      this.btnClearClickedCallback();
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>