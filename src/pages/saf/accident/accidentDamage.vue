<!--
  목적 : 등록/접수/조치결과 - 피해내역
  Detail : 피해내역
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :maxlength="600"
                ui="bootstrap"
                label="상세피해"
                name="detailDamageDesc"
                v-model="accidentDamage.detailDamageDesc"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-radio
                :width="10"
                :comboItems="comboHumanInjuryItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="인적피해 상해정도"
                name="humanInjuryCd"
                v-model="accidentDamage.humanInjuryCd"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="600"
              ui="bootstrap"
              label="인적피해내용"
              name="humanInjuryDesc"
              v-model="accidentDamage.humanInjuryDesc"
              />
            </b-col>
            <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="사망자(인원수)"
              name="investMethod"
              v-model="accidentDamage.investMethod"
              :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
              @searchUser="btnSearchDeadUserClicked"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="사망자List"
              name="investMethod"
              v-model="accidentDamage.investMethod"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="상해자(인원수)"
              name="investMethod"
              v-model="accidentDamage.investMethod"
              :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
              @searchUser="btnSearchDamageUserClicked"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="상해자List"
              name="investMethod"
              v-model="accidentDamage.investMethod"
              />
            </b-col> -->
            <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="외부상해자(인원수)"
              name="investMethod"
              v-model="accidentDamage.investMethod"
              :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
              @searchUser="btnSearchDeadUserClicked"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="외부상해자List"
              name="investMethod"
              v-model="accidentDamage.investMethod"
              />
            </b-col> -->
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="600"
              ui="bootstrap"
              label="물적피해직접손실액"
              name="dirLossAmount"
              v-model="accidentDamage.dirLossAmount"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="600"
              ui="bootstrap"
              label="물적피해간접손실액"
              name="indirLossAmount"
              v-model="accidentDamage.indirLossAmount"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="600"
              ui="bootstrap"
              label="물적피해"
              name="matDamageDesc"
              v-model="accidentDamage.matDamageDesc"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="600"
              ui="bootstrap"
              label="환경피해수계누출량"
              name="drainLeak"
              v-model="accidentDamage.drainLeak"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="600"
              ui="bootstrap"
              label="환경피해그외누출량"
              name="etcLeak"
              v-model="accidentDamage.etcLeak"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="600"
              ui="bootstrap"
              label="환경피해"
              name="envDamageDesc"
              v-model="accidentDamage.envDamageDesc"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-radio
                :width="8"
                :comboItems="comboNoAccidentItems"
                itemText="noAccidentYnNm"
                itemValue="noAccidentYn"
                ui="bootstrap"
                label="무재해 영향"
                name="noAccidentYn"
                v-model="accidentDamage.noAccidentYn"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-radio
                :width="8"
                :comboItems="comboAccidentLevlItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="사고피해레벨"
                name="accidentLvlCd"
                v-model="accidentDamage.accidentLvlCd"
              />
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
  name: 'y-accident-damage',
  props: {
    safAccidentNo: 0,
  },
  data: () => ({
    accidentDamage: {
      safAccidentNo: 0, // 사내사고번호

      detailDamageDesc: '', // 상세피해내용

      humanInjuryCd: '', // 인적피해_상해정도
      humanInjuryDesc: '', // 인적피해내용

      safAccidentVictimNo: '', // 사내사고피해자번호
      damageLvlCd: '', // 상해구분코드
      victimTypeCd: '', // 피해자구분코드
      victimNm: '', // 피해자성명
      victimUserId: '', // 내부-사번
      victimDutyNm: '', // 내부-직책
      victimDeptCd: '', // 내부-부서코드
      victimDeptNm: '', // 내외부-소속
      comSexTypeCd: '', // 외부-성별코드
      victimBirthday: '', // 외부-생년월일

      dirLossAmount: '', // 물적피해직접손실액
      indirLossAmount: '', // 물적피해간접손실액
      matDamageDesc: '', // 물적피해내용

      drainLeak: '', // 환경피해_수계누출량
      etcLeak: '', // 환경피해_그외누출량
      envDamageDesc: '', // 환경피해내용

      noAccidentYn: '', // 무재해영향여부
      accidentLvlCd: '', // 사고피해레벨코드
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
    searchDamageUrl: '', // 사내사고피해 검색 url
    searchVictimUrl: '', // 사내사고 피해자정보 검색 url
    comboHumanInjuryItems: [], // 인적피해
    comboNoAccidentItems: [], // 무재해영향
    comboAccidentLevlItems: [], // 사고피해레벨
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
      this.searchDamageUrl = selectConfig.saf.accident.get.url; // 사내사고피해 검색 url
      this.searchVictimUrl = selectConfig.saf.accident.get.url; // 사내사고 피해자정보 검색 url
      this.getComboItems('SAF_HUMAN_INJURY'); // 인적피해
      this.getComboItems('SAF_ACCIDENT_LVL'); // 사고피해레벨
      
      setTimeout(() => {
        this.comboNoAccidentItems = [
          { noAccidentYn: 'N', noAccidentYnNm: '영향없음' },
          { noAccidentYn: 'Y', noAccidentYnNm: '무재해무산' },
        ];
      }, 300);
      // this.getDamageList(); // 사내사고피해
      // this.getVictimList(); // 사내사고 피해자정보
    },
    /**
     * 공통 마스터 정보 조회 (인적피해, 사고피해레벨)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_HUMAN_INJURY')
        {
          this.comboHumanInjuryItems = this.$_.clone(_result.data);
        }
        else if (codeGroupCd === 'SAF_ACCIDENT_LVL')
        {
          this.comboAccidentLevlItems = this.$_.clone(_result.data);
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 사고피해 조회 **/
    getDamageList () {
      this.$http.url = this.$format(this.searchUrl, this.safAccidentNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.accidentInvest = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 사고피해자 조회 **/
    getVictimList () {
      this.$http.url = this.searchVictimUrl;
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