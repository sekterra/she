<!--
  목적 : 안전보호구 > 보호구 지급 > 신규등록/수정 팝업
  작성자 : kga
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <!-- 보호구 지급 등록 -->
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="보호구 지급" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                v-if="editable"
                :action-url="insertUrl"
                :param="speGive"
                :is-submit="isFinish"
                title="완료"
                color="black"
                action-type="POST"
                beforeSubmit = "beforeFinish"
                @beforeFinish="beforeFinish"
                @btnClicked="btnFinishClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="this.speGive.processStepCd !== 'STEP2'"
                :action-url="insertUrl"
                :param="speGive"
                :is-submit="isInsert"
                title="저장"
                color="orange"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="this.speGive.processStepCd !== 'STEP2'
                  && this.speGive.safSpeGiveNo > 0"
                title="삭제"
                color="red"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="btnClosePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                default="today"
                label="지급일"
                name="giveYmd"
                :clearable="true"
                v-model="speGive.giveYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :disabled="true"
                :comboItems="comboGiveKindCds"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="지급구분"
                name="giveKindCd"
                v-model="speGive.giveKindCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="수령부서"
                name="receiptDeptCd"
                v-model="speGive.receiptDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :clearable="true"
                ui="bootstrap"
                type="search"
                label="수령자명"
                name="receiptUserNm"
                v-model="speGive.receiptUserNm"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="100"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="speGive.remark"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 설비 grid -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="보호구 지급 목록"
            gridType="edit"
            :excel-down="true"
            :print="true"
            :rows="3"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            >
          </y-data-table>
        </b-col>
        <div class="float-right mt-3">
          <y-btn
            v-if="editable"
            title="완료"
            color="black"
            action-type="POST"
            beforeSubmit = "beforeFinish"
            @beforeFinish="beforeFinish"
            @btnClicked="btnFinishClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            v-if="this.speGive.processStepCd !== 'STEP2'"
            title="저장"
            color="orange"
            @btnClicked="beforeInsert" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn 
            v-if="this.speGive.processStepCd !== 'STEP2'
              && this.speGive.safSpeGiveNo > 0"
            title="삭제"
            color="red"
            @btnClicked="btnDeleteClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            title="닫기"
            @btnClicked="btnClosePopup" 
          />
        </div>
      </b-col>
    </b-row>

    <!-- 팝업 설정 -->
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  name: 'create-spe-in',
  props: {
    popupParam: {
      type: Object,
      default: {
        safSpeGiveNo: 0,
        processStepCd: 'STEP1',
        giveKindCd: 'GIVE1',
      },
    },
  },
  data () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: '210'
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      speGive: {
        giveKindCd: '',
        giveYmd: null,
        receiptDeptCd: '',
        receiptUserId: '',
        receiptUserNm: '',
        remark: '',
        speGiveDetails: [],
      },
      baseWidth: 8,
      editable: true,
      comboGiveKindCds: [], // 지급구분
      comboDeptItems: [], // 수령부서
      insertUrl: '',
      deleteUrl: '',
      isInsert: false, 
      isFinish: false,
      isDelete: false,  
    };
  },
  watch: {
    'gridOptions.data': {
      handler: function (newValue, oldValue) {
        this.speGive.speGiveDetails = [];
        this.$_.forEach(this.gridOptions.data, (item) => {
          if (!isNaN(item.giveNum) && parseInt(item.giveNum, 10) > 0) this.speGive.speGiveDetails.push(item);
        });
      },
      deep: true
    },
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
    this.init();
  },
  methods: {
    init () {      
      // URL 셋팅
      this.searchUrl = selectConfig.saf.speGiveDtl.list.url;
      this.insertUrl = transactionConfig.saf.speGive.insert.url;
      this.deleteUrl = transactionConfig.saf.speGive.delete.url;

      // 완료 또는 저장 버튼 Mode
      this.speGive.safSpeGiveNo = this.popupParam.safSpeGiveNo;
      this.speGive.processStepCd = this.popupParam.processStepCd;
      if (this.popupParam.safSpeGiveNo !== 0 && this.speGive.processStepCd === 'STEP2') {
        this.editable = false;
      } else {
        this.editable = true;
      }

      this.getGiveKindCds();  // 지급구분
      this.getDeptItems();  // 수령부서
      this.getSpeGive();  // 보호구 지급 상세
      this.getDataList();

      // 진행단계
      this.speGive.processStepCd = this.popupParam.processStepCd;

      // 보호구 지급 grid 헤더 설정
      this.gridOptions.header = [
        { text: '보호구종류', name: 'speKindNm', width: '130px', align: 'center' },
        { text: '보호구명', name: 'speNm', width: '200px', align: 'left' },
      ];

      if (this.editable)
      {
        this.gridOptions.header.splice(3, 0, { text: '지급개수', name: 'giveNum', width: '100px', align: 'left', type: 'number' });
        this.gridOptions.header.splice(4, 0, { text: '단위', name: 'giveUnitNm', width: '90px', align: 'left' });
        this.gridOptions.header.splice(5, 0, { text: '비고', name: 'remark', width: '200px', align: 'left', type: 'text' });
      }
      else
      {
        this.gridOptions.header.splice(3, 0, { text: '지급개수', name: 'giveNum', width: '100px', align: 'left' });
        this.gridOptions.header.splice(4, 0, { text: '단위', name: 'giveUnitNm', width: '90px', align: 'left' });
        this.gridOptions.header.splice(5, 0, { text: '비고', name: 'remark', width: '200px', align: 'left' });
      }
    },
    // 지급구분
    getGiveKindCds () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_GIVE_KIND');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.comboGiveKindCds = this.$_.clone(_result.data);
        this.speGive.giveKindCd = this.popupParam.giveKindCd;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 지급 상세
    getSpeGive () {
      if (!this.popupParam.safSpeGiveNo) return;
      this.$http.url = this.$format(selectConfig.saf.speGive.get.url, this.popupParam.safSpeGiveNo);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.speGive = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 보호구 지급 상세 grid
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        safSpeGiveNo: this.popupParam.safSpeGiveNo,
        giveKindCd: this.popupParam.giveKindCd
      };
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    beforeFinish () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '완료하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.speGive.processStepCd = 'STEP2';
          this.isFinish = true;
        },
        cancelCallback: () => {
          this.isFinish = false;
        }
      });
    },
    /** Button Event **/
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 사용자 검색
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    }, 
    // 사용자 검색 팝업 닫기
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.speGive.receiptUserId = data.user.userId;
        this.speGive.receiptUserNm = data.user.userNm;
        this.speGive.receiptDeptCd = data.user.deptCd;
      }
    },
    // 저장
    btnInsertClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
      this.isInsert = false;
    },
    // 수정
    btnEditClickedCallback (_result) {
      this.isFinish = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
    },
    // 완료
    btnFinishClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '완료되었습니다.',
        type: 'success',
      });
      this.btnClosePopup();
      this.isFinish = false;
      this.editable = false;
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',
        // 확인 callback 함수
        confirmCallback: () => {
          this.$http.url = this.$format(transactionConfig.saf.speGive.delete.url, this.speGive.safSpeGiveNo);
          this.$http.type = 'DELETE';
          this.$http.request((_result) => {
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '삭제되었습니다.',
              type: 'success',
            });
            this.btnClosePopup();
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', _error);
          });
        },
        // 취소 callback 함수
        cancelCallback: () => {
        }
      });
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isFinish = false;
      this.editable = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
  }
};
</script>