<!--
  목적 : 검진예약
  Detail : 사용자의 검진 예약 현황 및 예약을 하는 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            ref="dataUserTable"
            :headers="gridUserHeaderOptions"
            :items="gridUserData"
            :excel-down="true"
            :print="true"
            :rows="7"
            label="사용자 목록"
            @tableLinkClicked="tableLinkUserClicked"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-row>
            <b-col sm="12">
              <y-label :label="userText" :fieldable="true"></y-label>
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
            label="예약 검진 알림"
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
          <b-row sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
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
                label="검진병원"
                v-model="checkupResult.heaCheckupOrgNo"
                v-validate="'required'"
                :state="validateState('heaCheckupOrgNo')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              name="heaCheckupTypeNm"
              label="검진유형"
              v-model="checkupResult.heaCheckupTypeNm"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-shuttlebox
                :width="10"
                :items="heaOptionalTestItems"
                :needDefaultView="true"
                itemText="heaTestItemNm"
                itemValue="heaTestItemCd"
                ui="bootstrap"
                label="선택항목"
                name="selectedTempTestItemCd"
                v-model="checkupResult.selectedTempTestItemCd"
              >
              </y-shuttlebox>
            </b-col>
          </b-row>
          <b-row sm="12" md="12" lg="12" xl="12" class="col-xxl-12 mt-2">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                label="선택월"
                type="month"
                name="selectMonth"
                v-model="searchReserveParam.yearMonth"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :required="true"
                :disabled="true"
                label="예약일 확인"
                name="reserveYmd"
                ui="bootstrap"
                v-model="checkupResult.reserveYmd"
                v-validate="'required'"
                :state="validateState('reserveYmd')"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-10">
              <y-data-table 
              label="월별 예약인원"
              :headers="reserveGridHeaderOptions"
              :items="reserveGridData"
              :editable="editable"
              :excel-down="true"
              :print="true"
              :rows="5"
              @tableLinkClicked="tableLinkReservePersonClicked"
              />
            </b-col>
          </b-row>
          <div class="float-right mt-3" >
              <y-btn 
                v-if="insertable"
                :action-url="insertUrl"
                :param="checkupResult"
                :is-submit="isInsert"
                title="예약등록"
                color="blue"
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
                title="수정"
                color="blue"
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
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
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
  data () {
    return {
      checkupResult: {
        heaCheckupPlanNo: '',
        heaCheckupPlanOrgNo: '',
        heaCheckupOrgNo: null,
        heaCheckupTypeNm: '',
        selectedTempTestItemCd: [],
        selectedTestItemCd: [],
        reserveYmd: '',
        consentYn: '',
        userId: '',
      },
      searchReserveParam: {
        heaCheckupPlanNo: 0,
        heaCheckupOrgNo: 0,
        yearMonth: ''
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        param: null
      },
      optionTestItem: {
        selectOptCount: 0,
        requiredOptYn: '',
      },
      userId: '',
      userName: '',
      userText: '',
      period: null,
      baseWidth: 9,
      editable: false,
      insertable: false,
      isInsert: false,
      isEdit: false,
      gridData: [],
      gridHeaderOptions: [],
      gridUserHeaderOptions: [],
      gridUserData: [],
      comboCheckupOrgItems: [],
      heaOptionalTestItems: [],
      selectedValue: [],
      editUrl: '',
      insertUrl: '',
      searchReserveUrl: '',
      currentHeaCheckupPlanNo: '',
      reserveGridHeaderOptions: [],
      reserveGridData: [],
      heaCheckupOrgNoSaveOldValue: '',
      heaCheckupPlanNoSaveOldValue: '',
    };
  },
  watch: {
    'checkupResult.heaCheckupOrgNo': {
      handler: function (value, oldVal) {
        if (!value) return;
        
        if (this.heaCheckupOrgNoSaveOldValue === value) return;

        if (oldVal 
        && this.heaCheckupPlanNoSaveOldValue === this.checkupResult.heaCheckupPlanNo
        && ((this.checkupResult.selectedTempTestItemCd ? this.checkupResult.selectedTempTestItemCd.length > 0 : false) || this.selectedItems.length > 0))
        {
          // if (window.confirm("선택된 항목이 초기화 됩니다.\n기관변경하시겠습니까?"))
          // {
          //   this.checkupResult.selectedTempTestItemCd = [];
          //   this.heaCheckupOrgNoSaveOldValue = '';
          //   this.searchReserveParam.heaCheckupOrgNo = value;
          //   this.getComboTestItems(this.currentHeaCheckupPlanNo, value); // 기관별 검사항목(선택항목)
          // }
          // else
          // {
          //   setTimeout(() => {
          //     this.checkupResult.heaCheckupOrgNo = oldVal;
          //     this.searchReserveParam.heaCheckupOrgNo = oldVal;
          //   }, 300);
          //   this.heaCheckupOrgNoSaveOldValue = oldVal;
          // }

          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '선택된 항목이 초기화 됩니다.\n기관변경하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.checkupResult.selectedTempTestItemCd = [];
              this.heaCheckupOrgNoSaveOldValue = '';
              this.searchReserveParam.heaCheckupOrgNo = value;
              this.getComboTestItems(this.currentHeaCheckupPlanNo, value); // 기관별 검사항목(선택항목)
            },
            // 취소 callback 함수
            cancelCallback: () => {
              setTimeout(() => {
                this.checkupResult.heaCheckupOrgNo = oldVal;
                this.searchReserveParam.heaCheckupOrgNo = oldVal;
              }, 300);
              this.heaCheckupOrgNoSaveOldValue = oldVal;
            }
          });
        }
        else
        {
          this.heaCheckupPlanNoSaveOldValue = this.checkupResult.heaCheckupPlanNo;
          this.searchReserveParam.heaCheckupOrgNo = value;
          this.getComboTestItems(this.currentHeaCheckupPlanNo, value); // 기관별 검사항목(선택항목)
        }

      },
    },
    'searchReserveParam.yearMonth': {
      handler: function (value, oldVal) {
        
        this.searchReserveParam.yearMonth = this.$_.clone(this.$comm.moment(value).format('YYYY-MM'));
        this.getReserveList();
      }
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

    // // TODO : 팝업에서 보내는 정보 수신
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.editUrl = transactionConfig.checkupReserve.edit.url;
      this.insertUrl = transactionConfig.checkupReserve.insert.url;
      this.searchReserveUrl = selectConfig.checkupReserve.orgStatus.url;

      setTimeout(() => {
        this.comboCheckupOrgItems = [
          { heaCheckupOrgNo: '', heaCheckupOrgNm: '선택하세요' },
        ];
        this.checkupResult.heaCheckupOrgNo = '';
      }, 100);
      
      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '예약관리', name: 'reserveManage', width: '150px', align: 'center', type: 'link' },
        { text: '검진계획명', name: 'heaCheckupPlanNm', width: '180px', },
        { text: '검진종류', name: 'heaCheckupClassNm', width: '150px', },
        { text: '검진계획기간', name: 'heaCheckupPlanPeriod', width: '200px', align: 'center' },
        { text: '예약병원', name: 'heaCheckupOrgNm', width: '200px' },
        { text: '예약일자', name: 'reserveYmd', width: '130px', align: 'center' },
        { text: '검진일자', name: 'heaCheckedYmd', width: '130px', align: 'center' }
      ];
      // 사용자 헤더 설정
      this.gridUserHeaderOptions = [
        { text: '부서명', name: 'deptNm', width: '150px', align: 'center' },
        { text: '사용자명', name: 'userNm', width: '180px', type: "link" },
        { text: '성별', name: 'comSexTypeNm', width: '150px', },
      ]
      // 월별예약인원
      this.reserveGridHeaderOptions = [
        { text: '일자', name: 'reserveStatusYmd', width: '120px', align: 'center', type: "link" },
        { text: '병원', name: 'heaCheckupOrgNm', width: '200px', align: 'center' },
        { text: '예약인원', name: 'reserveUserCount', width: '100px', align: 'center' },
        { text: '최대예약인원', name: 'integratedMax', width: '100px', align: 'center' }
      ];
      this.getUserList();
    },
    /**
     *  팝업 안 보이도록 설정 후 getReserveData 호출
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      if (data === null || data === undefined) return;
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      
      this.getReserveData(data);
    },
    /**
     *  해당 계획별 기관 설정 및 입력 폼에 데이터 입력
     * data : 계획별 사용자 예약 정보
     */
    getReserveData (data) {
      if (data.heaCheckupPlanNo === null || data.heaCheckupPlanNo === undefined) return;

      if (data.reserveManage === '예약현황')
      {
        this.insertable = false;
        if (data.heaCheckedOrgNo !== 0) 
        {
          this.editable = false;
        }
        else
        {
          this.editable = true;
        }
      }
      else
      {
        this.insertable = true;
      }

      this.checkupResult.consentYn = 'Y';
      this.currentHeaCheckupPlanNo = data.heaCheckupPlanNo;

      this.searchReserveParam.heaCheckupPlanNo = this.currentHeaCheckupPlanNo;

      this.$http.url = selectConfig.checkupReserve.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaCheckupPlanNo': this.currentHeaCheckupPlanNo
      };
      this.$http.request((_result) => {
        this.getComboOrgItems(_result.data[0].checkupYear, _result.data[0].heaCheckupPlanNo, this.checkupResult.heaCheckupOrgNo); // 건강 검진 계획별 기관

        this.$http.url = selectConfig.testItemResult.list.url;
        this.$http.type = 'GET';
        this.$http.param = {
          'heaCheckupPlanNo': _result.data[0].heaCheckupPlanNo,
          'userId': this.userId,
          'optionalYn': 'Y'
        };
        this.$http.request((_result) => {
          setTimeout(() => {
            this.checkupResult.selectedTempTestItemCd = this.$_.map(_result.data, 'heaTestItemCd');
          }, 1000);          
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', _error);
        });

      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 월별 예약인원 조회 **/
    getReserveList () {
      if (this.searchReserveParam.heaCheckupPlanNo > 0 
        && this.searchReserveParam.heaCheckupOrgNo > 0
        && this.searchReserveParam.yearMonth !== '') {
        
        this.$http.url = this.searchReserveUrl;
        this.$http.type = 'get'; 
        this.$http.param = this.searchReserveParam;
        this.$http.request((_result) => {
          this.reserveGridData = _result.data;
        }, (_error) => {         
          window.getApp.$emit('APP_REQUEST_ERROR', _error);
        });        
      }
    },
    /**
     * 계획별 기관 조회
     */
    getComboOrgItems (selectedYear, heaCheckupPlanNo, heaCheckupOrgNo) {
      this.$http.url = selectConfig.checkupPlanOrg.list.url;
      this.$http.param = {
        'heaCheckupPlanNo': heaCheckupPlanNo,
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
            }, 300);
          }
          else
          {
            setTimeout(() => {
              this.checkupResult.heaCheckupOrgNo = '';
            }, 300);
          }
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 계획별 기관별 항목 조회
     */
    getComboTestItems (heaCheckupPlanNo, heaCheckupOrgNo) {
      if (!heaCheckupOrgNo) return;

      this.$http.url = selectConfig.checkupPlanOrgTestItem.list.url;
      this.$http.param = {
        'heaCheckupPlanNo': heaCheckupPlanNo,
        'heaCheckupOrgNo': heaCheckupOrgNo,
        'userId': this.userId
      };
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.heaOptionalTestItems = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 저장 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      var i;
      // 필수 적용인 경우
      if (this.optionTestItem.requiredOptYn === 'Y')
      {
        if (this.checkupResult.selectedTempTestItemCd.length !== this.$_.parseInt(this.optionTestItem.selectOptCount))
        {
          // window.alert(this.optionTestItem.selectOptCount + "개의 선택항목을 선택해야합니다.");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: this.optionTestItem.selectOptCount + "개의 선택항목을 선택해야합니다.",
            type: 'warning',  // success / info / warning / error
          });
          return;
        }
      }
      // 필수 적용 아닌 경우
      else
      {
        if (this.checkupResult.selectedTempTestItemCd.length > this.$_.parseInt(this.optionTestItem.selectOptCount))
        {
          // window.alert(this.optionTestItem.selectOptCount + "개 넘게 선택항목을 선택할 수 없습니다.");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: this.optionTestItem.selectOptCount + "개 넘게 선택항목을 선택할 수 없습니다.",
            type: 'warning',  // success / info / warning / error
          });
          return;
        }
      }

      this.$validator.validateAll().then((_result) => {
        if (_result) {
          this.checkupResult.selectedTestItemCd = [];
          for (i = 0; i < this.checkupResult.selectedTempTestItemCd.length; i++)
          {
            this.checkupResult.selectedTestItemCd.push(this.checkupResult.selectedTempTestItemCd[i]);
          }
          // this.isEdit = window.confirm("수정하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isEdit = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isEdit = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isEdit = false;
      });
    },
    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      var i;
      // 필수 적용인 경우
      if (this.optionTestItem.requiredOptYn === 'Y')
      {
        if (this.checkupResult.selectedTempTestItemCd.length !== this.$_.parseInt(this.optionTestItem.selectOptCount))
        {
          // window.alert(this.optionTestItem.selectOptCount + "개의 선택항목을 선택해야합니다.");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: this.optionTestItem.selectOptCount + "개의 선택항목을 선택해야합니다.",
            type: 'warning',  // success / info / warning / error
          });
          return;
        }
      }
      // 필수 적용 아닌 경우
      else
      {
        if (this.checkupResult.selectedTempTestItemCd.length > this.$_.parseInt(this.optionTestItem.selectOptCount))
        {
          // window.alert(this.optionTestItem.selectOptCount + "개 넘게 선택항목을 선택할 수 없습니다.");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: this.optionTestItem.selectOptCount + "개 넘게 선택항목을 선택할 수 없습니다.",
            type: 'warning',  // success / info / warning / error
          });
          return;
        }
      }

      var startYmd = '';
      var endYmd = '';
      var reserveYmd = '';
      if (!this.checkupResult.reserveYmd)
      {
        // window.alert("예약일을 지정해 주십시오.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '예약일을 지정해 주십시오.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      else
      {
        startYmd = this.$comm.moment(this.checkupResult.startYmd);
        endYmd = this.$comm.moment(this.checkupResult.endYmd);
        reserveYmd = this.$comm.moment(this.checkupResult.reserveYmd);
        if (this.$comm.moment.duration(reserveYmd.diff(startYmd)).asDays() < 0
        || this.$comm.moment.duration(endYmd.diff(reserveYmd)).asDays() < 0)
        {
          // window.alert("건강검진계획 기간 안에 예약일을 잡아주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '건강검진계획 기간 안에 예약일을 잡아주세요.',
            type: 'warning',  // success / info / warning / error
          });
          return;
        }
      }

      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          this.checkupResult.selectedTestItemCd = [];
          for (i = 0; i < this.checkupResult.selectedTempTestItemCd.length; i++)
          {
            this.checkupResult.selectedTestItemCd.push(this.checkupResult.selectedTempTestItemCd[i]);
          }
          this.checkupResult.userId = this.userId
          this.checkupResult.consentYn = 'Y';
          // this.isInsert = window.confirm("예약하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else if (!_result) {
          // window.alert("필수입력값을 입력해주세요");
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isInsert = false;
      });
    },
    tableLinkUserClicked (header, data) {
      this.userId = data.userId;
      this.userName = data.userNm;
      this.userText = this.userName + '님의 검진예약 메뉴입니다.';
      this.getList();
    },
    /**
     * 동의를 하지 않은 경우 결과활용 동의서 팝업을 보인다
     *  getReserveData 호출
     * 예약 검진 알림에 예약관리 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkClicked (header, data) {
      if (data === null) return;

      this.optionTestItem.selectOptCount = data.selectOptCount;
      this.optionTestItem.requiredOptYn = data.requiredOptYn;
      this.checkupResult = this.$_.clone(data);
      this.heaOptionalTestItems = [];
      this.getComboTestItems(this.checkupResult.heaCheckupPlanNo, this.checkupResult.heaCheckupOrgNo);
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
    },
    /**
     * 예약인원 가능한지를 따져 예약일을 지정한다.
     * 월별 예약인원에 일자 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkReservePersonClicked (header, data) {
      if (this.$_.parseInt(data.reserveUserCount) >= this.$_.parseInt(data.integratedMax))
      {
        // window.alert("예약인원이 다 찼습니다.\n다른날을 선택해주세요.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '예약인원이 다 찼습니다.\n다른날을 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      this.checkupResult.reserveYmd = data.reserveStatusYmd;
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
    /** 예약 검진 알림 조회 **/
    getList () {
      this.$http.url = selectConfig.checkupReserve.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'heaCheckupPlanNo': 0,
        'userId': this.userId
      };
      this.$http.request((_result) => {
        this.gridData = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getUserList () {
      this.$http.url = selectConfig.manage.user.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridUserData = this.$_.clone(_result.data);
        
        this.userId = this.gridUserData[0].userId;
        this.userName = this.gridUserData[0].userNm;
        this.userText = this.userName + '님의 검진예약 메뉴입니다.';
        this.getList();
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** button 관련 이벤트 **/
    /**
     * 예약 검진 알림, 월별 예약인원 조회 및 getComboTestItems 호출
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      this.getList();
      // window.alert("수정되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.getComboTestItems(this.checkupResult.heaCheckupPlanNo, this.checkupResult.heaCheckupOrgNo);
      this.isEdit = false;
      this.getReserveList();
    },
    /**
     * 예약 검진 알림, 월별 예약인원 조회 및 getComboTestItems 호출
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.getList();
      // window.alert("저장되었습니다.");
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.getComboTestItems(this.checkupResult.heaCheckupPlanNo, this.checkupResult.heaCheckupOrgNo);
      this.isInsert = false;
      this.getReserveList();
    },
    /**
     *  isSubmit false 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>