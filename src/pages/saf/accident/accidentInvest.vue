<!--
  목적 : 등록/접수/조치결과 - 사내사고조사
  Detail : 사내사고조사
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row>
      <b-col sm="12">
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="8"
                :required="true"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="사고조사대상"
                name="investYn"
                selectText="해당"
                unselectText="해당없음"
                v-model="accidentInvest.investYn"
                v-validate="'required'"
                :state="validateState('investYn')"
              >
              </y-switch>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="조사기간"
                name="period"
                v-model="accidentInvest.period"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="50"
              ui="bootstrap"
              label="조사방법"
              name="investMethod"
              v-model="accidentInvest.investMethod"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <!-- 사번 -->
                  <y-text
                  :width="6"
                  :disabled="true"
                  ui="bootstrap"
                  label="리더"
                  name="leaderUserId"
                  placeholder="사번"
                  v-model="accidentInvest.leaderUserId"
                  :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                  @searchUser="btnSearchLeaderUserClicked"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 성명 -->
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="leaderUserNm"
                  placeholder="성명"
                  v-model="accidentInvest.leaderUserNm"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 소속부서명 -->
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="leaderDeptNm"
                  placeholder="소속부서명"
                  v-model="accidentInvest.leaderDeptNm"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 사무실전화번호 -->
                  <y-text
                  :width="12"
                  ui="bootstrap"
                  name="leaderOfficeTel"
                  placeholder="사무실전화번호"
                  v-model="accidentInvest.leaderOfficeTel"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 조사팀리더선정일 -->
                  <y-datepicker
                    :width="12"
                    name="leaderSelYmd"
                    v-model="accidentInvest.leaderSelYmd"
                  >
                  </y-datepicker>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <!-- 사번 -->
                  <y-text
                  :width="6"
                  :disabled="true"
                  ui="bootstrap"
                  label="사고조사Facilitator"
                  name="faciUserId"
                  placeholder="사번"
                  v-model="accidentInvest.faciUserId"
                  :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }, { 'icon': 'times', callbackName: 'times' }]"
                  @searchUser="btnSearchFacilitatorUserClicked"
                  @times="btnSearchClearClicked"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 성명 -->
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="faciUserNm"
                  placeholder="성명"
                  v-model="accidentInvest.faciUserNm"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 소속부서명 -->
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="faciDeptNm"
                  placeholder="소속부서명"
                  v-model="accidentInvest.faciDeptNm"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="600"
                ui="bootstrap"
                label="조사계획"
                name="investPlan"
                v-model="accidentInvest.investPlan"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <!-- 조사인원 테이블 -->
              <b-row>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                    <div slot="buttonGroup" class="float-right mb-1">
                      <y-btn 
                        title="추가"
                        color="blue"
                        @btnClicked="btnAdd" 
                        @btnClickedErrorCallback="btnClickedErrorCallback"
                      />
                      <y-btn 
                        title="삭제"
                        color="red"
                        @btnClicked="btnDelete" 
                        @btnClickedErrorCallback="btnClickedErrorCallback"
                      />
                    </div>
                    <y-data-table 
                      ref="dataTableIn"
                      :height="gridOptions.height"
                      :headers="gridOptions.header"
                      :items="gridOptions.data"
                      :excel-down="true"
                      :print="true"
                      v-model="selectedValue"
                      label="조사인원"
                      >
                      <el-table-column
                        type="selection"
                        slot="selection"
                        align="center"
                        width="55">
                      </el-table-column> 
                    </y-data-table>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :append-to-body="true"
      :width="popupOptions.width"        
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :top="popupOptions.top" >
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="popupOptions.closeCallback" />
    </el-dialog>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-accident-invest',
  props: {
    safAccidentNo: 0,
  },
  data: () => ({
    accidentInvest: {
      safAccidentNo: 0, // 사내사고번호
      investYn: 'Y', // 사고조사대상 여부

      leaderUserId: '', // 리더 사번
      leaderUserNm: '', // 리더 성명
      leaderDeptCd: '', // 리더 소속부서코드
      leaderDeptNm: '', // 리더 소속부서명
      leaderOfficeTel: '', // 리더 사무실전화번호
      leaderSelYmd: '', // 리더 선정일

      faciUserId: '', // 사고조사 Facilitator 사번
      faciUserNm: '', // 사고조사 Facilitator 성명
      faciDeptCd: '', // 사고조사 Facilitator 부서코드
      faciDeptNm: '', // 사고조사 Facilitator 부서명

      userId: '', // 조사팀원ID
      userNm: '', // 조사팀원성명
      deptCd: '', // 조사팀원부서코드
      deptNm: '', // 조사팀원부서명
      dutyNm: '', // 조사팀원직책
      positionNm: '', // 조사팀원직무

      investPlan: '', // 조사계획
      investStartYmd: '', // 조사기간시작일
      investEndYmd: '', // 조사기간종료일
      period: [],
      investMethod: '', // 조사방법
    },
    gridOptions: { // 조사인원
      header: [],
      data: [],
      height: '250'
    },
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      width: '60%',
      top: '10px',
      param: {},
      closeCallback: null,
    },
    searchInvestUrl: '', // 사내사고조사 검색 url
    searchInvestPsnUrl: '', // 사내사고조사인원 검색 url
    selectedValue: [],
  }),
  watch: {
    'safAccidentNo': function (newValue, oldValue) {
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
    init () {
      // Url Setting
      this.searchInvestUrl = selectConfig.saf.accident.get.url; // 사내사고조사 검색 url
      this.searchInvestPsnUrl = selectConfig.saf.accident.get.url; // 사내사고조사인원 검색 url
      // 조사인원 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '사번', name: 'userId', width: '120px', },
        { text: '성명', name: 'userNm', width: '120px', },
        { text: '부서', name: 'deptNm', width: '200px', },
      ];
      setTimeout(() => {
        if (!this.accidentInvest.investStartYmd && !this.accidentInvest.investEndYmd) this.accidentInvest.period = [this.$comm.getToday(), this.$comm.getToday()];
        this.accidentInvest.period = [this.accidentInvest.investStartYmd, this.accidentInvest.investEndYmd];
      }, 300);
      this.getComboItems('SAF_CAU_TYPE'); // 원인유형
      // this.getInvestList(); // 사내사고조사
      // this.getInvestPsnList(); // 사내사고조사인원
    },
    /**
     * 공통 마스터 정보 조회 (원인유형)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_CAU_TYPE')
        {
          this.comboCauTypeItems = this.$_.clone(_result.data);
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 사내사고조사 조회 **/
    getInvestList () {
      this.$http.url = this.$format(this.searchInvestUrl, this.safAccidentNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.accidentInvest = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 사내사고조사인원 조회 **/
    getInvestPsnList () {
      this.$http.url = this.searchInvestPsnUrl;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.accidentInvest = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
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
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        if (this.openUserFlag === 'GRID')
        {
          if (this.$_.indexOf(this.$_.map(this.gridOptions.data, 'userId'), data.user.userId) > -1) return;
          this.gridOptions.data.splice(0, 0, {
            'userId': data.user.userId, 
            'userNm': data.user.userNm,
            'deptCd': data.user.deptCd,
            'deptNm': data.user.deptNm,
            'comSexTypeNm': data.user.comSexTypeNm,
          });
        }
        else if (this.openUserFlag === 'LEADER')
        {
          this.accidentInvest.leaderUserId = data.user.userId;
          this.accidentInvest.leaderUserNm = data.user.userNm;
          this.accidentInvest.leaderDeptCd = data.user.deptCd;
          this.accidentInvest.leaderDeptNm = data.user.deptNm;
        }
        else if (this.openUserFlag === 'FACILITATOR')
        {
          this.accidentInvest.faciUserId = data.user.userId;
          this.accidentInvest.faciUserNm = data.user.userNm;
          this.accidentInvest.faciDeptCd = data.user.deptCd;
          this.accidentInvest.faciDeptNm = data.user.deptNm;
        }
        this.openUserFlag = '';
      }
    },
    openUserPopup () {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },
    /** button 관련 이벤트 **/
    btnSearchFacilitatorUserClicked () {
      this.openUserFlag = 'FACILITATOR';
      this.openUserPopup();
    },
    btnSearchLeaderUserClicked () {
      this.openUserFlag = 'LEADER';
      this.openUserPopup();
    },
    btnSearchClearClicked () {
      this.accidentInvest.faciUserId = '';
      this.accidentInvest.faciUserNm = '';
      this.accidentInvest.faciDeptCd = '';
      this.accidentInvest.faciDeptNm = '';
    },
    /**
     * 점검팀원 행 추가
     */
    btnAdd () {
      this.openUserFlag = 'GRID';
      this.openUserPopup();
    },
    /**
     * 점검팀원 행 삭제
     */
    btnDelete () {
      this.$_.forEach(this.selectedValue, (item) => {
        this.gridOptions.data.splice(this.$_.indexOf(this.$_.map(this.gridOptions.data, 'userId'), item.userId), 1);
      });
    },
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>
<style>
#cauTypeCd {
  height: auto;
}
</style>