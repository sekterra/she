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
                :disabled="disabled"
                :maxlength="600"
                ui="bootstrap"
                label="상세피해"
                name="detailDamageDesc"
                v-model="accidentDetail.detailDamageDesc"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboHumanInjuryItems"
                :disabled="disabled"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="인적피해 상해정도"
                name="humanInjuryCd"
                v-model="accidentDetail.humanInjuryCd"
              >
              </y-select>
              <!-- <y-radio
                :width="10"
                :comboItems="comboHumanInjuryItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="인적피해 상해정도"
                name="humanInjuryCd"
                v-model="accidentDetail.humanInjuryCd"
              /> -->
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="600"
              :disabled="disabled"
              ui="bootstrap"
              label="인적피해내용"
              name="humanInjuryDesc"
              v-model="accidentDetail.humanInjuryDesc"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12 mb-2">
              <!-- 상해자(당사) 테이블 -->
              <b-row>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                    <div slot="buttonGroup" class="float-right mb-1">
                      <y-btn 
                        v-if="!disabled"
                        title="추가"
                        color="blue"
                        @btnClicked="btnOurCompanyAdd" 
                        @btnClickedErrorCallback="btnClickedErrorCallback"
                      />
                      <y-btn 
                        v-if="!disabled"
                        title="삭제"
                        color="red"
                        @btnClicked="btnOurCompanyDelete" 
                        @btnClickedErrorCallback="btnClickedErrorCallback"
                      />
                    </div>
                    <y-data-table 
                      ref="dataTableOurCompany"
                      :height="gridOurCompanyOptions.height"
                      :headers="gridOurCompanyOptions.header"
                      :items="gridOurCompanyOptions.data"
                      :excel-down="true"
                      :print="true"
                      v-model="selectedOurCompanyValue"
                      label="상해자(당사) 목록"
                      >
                      <el-table-column
                        v-if="!disabled"
                        type="selection"
                        slot="selection"
                        align="center"
                        width="55">
                      </el-table-column> 
                    </y-data-table>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12  mb-2">
              <!-- 상해자(협력업체) 테이블 -->
              <b-row>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
                    <div slot="buttonGroup" class="float-right mb-1">
                      <y-btn 
                        v-if="!disabled"
                        title="추가"
                        color="blue"
                        @btnClicked="btnPartnersAdd" 
                        @btnClickedErrorCallback="btnClickedErrorCallback"
                      />
                      <y-btn 
                        v-if="!disabled"
                        title="삭제"
                        color="red"
                        @btnClicked="btnPartnersDelete" 
                        @btnClickedErrorCallback="btnClickedErrorCallback"
                      />
                    </div>
                    <y-data-table 
                      ref="dataTablePartners"
                      :height="gridPartnersOptions.height"
                      :headers="gridPartnersOptions.header"
                      :items="gridPartnersOptions.data"
                      :excel-down="true"
                      :print="true"
                      v-model="selectedPartnersValue"
                      label="상해자(협력업체) 목록"
                      >
                      <el-table-column
                        v-if="!disabled"
                        type="selection"
                        slot="selection"
                        align="center"
                        width="55">
                      </el-table-column> 
                    </y-data-table>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="30"
              :disabled="disabled"
              ui="bootstrap"
              label="물적피해직접손실액"
              name="dirLossAmount"
              v-model="accidentDetail.dirLossAmount"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="30"
              :disabled="disabled"
              ui="bootstrap"
              label="물적피해간접손실액"
              name="indirLossAmount"
              v-model="accidentDetail.indirLossAmount"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="600"
              :disabled="disabled"
              ui="bootstrap"
              label="물적피해내용"
              name="matDamageDesc"
              v-model="accidentDetail.matDamageDesc"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="30"
              :disabled="disabled"
              ui="bootstrap"
              label="환경피해수계누출량"
              name="drainLeak"
              v-model="accidentDetail.drainLeak"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="30"
              :disabled="disabled"
              ui="bootstrap"
              label="환경피해그외누출량"
              name="etcLeak"
              v-model="accidentDetail.etcLeak"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="600"
              :disabled="disabled"
              ui="bootstrap"
              label="환경피해내용"
              name="envDamageDesc"
              v-model="accidentDetail.envDamageDesc"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboNoAccidentItems"
                :disabled="disabled"
                itemText="noAccidentYnNm"
                itemValue="noAccidentYn"
                ui="bootstrap"
                label="무재해 영향"
                name="noAccidentYn"
                v-model="accidentDetail.noAccidentYn"
              >
              </y-select>
              <!-- <y-radio
                :width="8"
                :comboItems="comboNoAccidentItems"
                itemText="noAccidentYnNm"
                itemValue="noAccidentYn"
                ui="bootstrap"
                label="무재해 영향"
                name="noAccidentYn"
                v-model="accidentDetail.noAccidentYn"
              /> -->
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboAccidentLevlItems"
                :disabled="disabled"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="사고피해레벨"
                name="accidentLvlCd"
                v-model="accidentDetail.accidentLvlCd"
              >
              </y-select>
              <!-- <y-radio
                :width="8"
                :comboItems="comboAccidentLevlItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="사고피해레벨"
                name="accidentLvlCd"
                v-model="accidentDetail.accidentLvlCd"
              /> -->
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-accident-damage',
  props: {
    accidentDetail: {
      type: Object,
      default: {
        safAccidentNo: 0,
        
        detailDamageDesc: '', // 상세피해내용

        humanInjuryCd: '', // 인적피해_상해정도
        humanInjuryDesc: '', // 인적피해내용

        dirLossAmount: '', // 물적피해직접손실액
        indirLossAmount: '', // 물적피해간접손실액
        matDamageDesc: '', // 물적피해내용

        drainLeak: '', // 환경피해_수계누출량
        etcLeak: '', // 환경피해_그외누출량
        envDamageDesc: '', // 환경피해내용

        noAccidentYn: '', // 무재해영향여부
        accidentLvlCd: '', // 사고피해레벨코드

        outCompanyData: [], // 상해자(당사)
        partenersData: [], // 상해자(협력업체)

        accidentStepCd: '',
      },
    },
  },
  data: () => ({
    accidentDamage: {
      safAccidentNo: 0, // 사내사고번호

      detailDamageDesc: '', // 상세피해내용

      humanInjuryCd: '', // 인적피해_상해정도
      humanInjuryDesc: '', // 인적피해내용

      // safAccidentVictimNo: '', // 사내사고피해자번호
      // damageLvlCd: '', // 상해구분코드
      // victimTypeCd: '', // 피해자구분코드
      // victimNm: '', // 피해자성명
      // victimUserId: '', // 내부-사번
      // victimDutyNm: '', // 내부-직책
      // victimDeptCd: '', // 내부-부서코드
      // victimDeptNm: '', // 내외부-소속
      // comSexTypeCd: '', // 외부-성별코드
      // victimBirthday: '', // 외부-생년월일

      dirLossAmount: '', // 물적피해직접손실액
      indirLossAmount: '', // 물적피해간접손실액
      matDamageDesc: '', // 물적피해내용

      drainLeak: '', // 환경피해_수계누출량
      etcLeak: '', // 환경피해_그외누출량
      envDamageDesc: '', // 환경피해내용

      noAccidentYn: 'N', // 무재해영향여부
      accidentLvlCd: 'ALVL1', // 사고피해레벨코드
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
    gridOurCompanyOptions: { // 상해자(당사)
      header: [],
      data: [],
      height: '310'
    },
    selectedOurCompanyValue: [],
    gridPartnersOptions: { // 상해자(협렵업체)
      header: [],
      data: [],
      height: '310'
    },
    disabled: false,
    openUserFlag: '',
    selectedPartnersValue: [],
    searchVictimUrl: '', // 사내사고 피해자정보 검색 url
    comboHumanInjuryItems: [], // 인적피해
    comboNoAccidentItems: [], // 무재해영향
    comboAccidentLevlItems: [], // 사고피해레벨
    comboDamageLevlItems: [], // 상해구분
  }),
  watch: {
    'accidentDamage.safAccidentNo': function (newValue, oldValue) {
      // this.getList();
    },
    'accidentDamage.detailDamageDesc': function (newValue, oldValue) {
      this.accidentDetail.detailDamageDesc = this.accidentDamage.detailDamageDesc;
    },
    'accidentDamage.humanInjuryCd': function (newValue, oldValue) {
      this.accidentDetail.humanInjuryCd = this.accidentDamage.humanInjuryCd;
    },
    'accidentDamage.humanInjuryDesc': function (newValue, oldValue) {
      this.accidentDetail.humanInjuryDesc = this.accidentDamage.humanInjuryDesc;
    },
    'accidentDamage.dirLossAmount': function (newValue, oldValue) {
      this.accidentDetail.dirLossAmount = this.accidentDamage.dirLossAmount;
    },
    'accidentDamage.indirLossAmount': function (newValue, oldValue) {
      this.accidentDetail.indirLossAmount = this.accidentDamage.indirLossAmount;
    },
    'accidentDamage.matDamageDesc': function (newValue, oldValue) {
      this.accidentDetail.matDamageDesc = this.accidentDamage.matDamageDesc;
    },
    'accidentDamage.drainLeak': function (newValue, oldValue) {
      this.accidentDetail.drainLeak = this.accidentDamage.drainLeak;
    },
    'accidentDamage.etcLeak': function (newValue, oldValue) {
      this.accidentDetail.etcLeak = this.accidentDamage.etcLeak;
    },
    'accidentDamage.envDamageDesc': function (newValue, oldValue) {
      this.accidentDetail.envDamageDesc = this.accidentDamage.envDamageDesc;
    },
    'accidentDamage.noAccidentYn': function (newValue, oldValue) {
      this.accidentDetail.noAccidentYn = this.accidentDamage.noAccidentYn;
    },
    'accidentDamage.accidentLvlCd': function (newValue, oldValue) {
      this.accidentDetail.accidentLvlCd = this.accidentDamage.accidentLvlCd;
    },

    'gridOurCompanyOptions.data': {
      handler: function (val, oldVal) {
        this.accidentDetail.outCompanyData = this.gridOurCompanyOptions.data;
      },
      deep: true
    },
    'gridPartnersOptions.data': {
      handler: function (val, oldVal) {
        this.accidentDetail.partenersData = this.gridPartnersOptions.data;
      },
      deep: true
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
      this.disabled = (this.accidentDetail.accidentStepCd === 'ACCS4');
      // Url Setting
      this.searchVictimUrl = selectConfig.saf.accidentVictim.list.url; // 사내사고 피해자정보 검색 url
      this.getComboItems('SAF_HUMAN_INJURY'); // 인적피해
      this.getComboItems('SAF_ACCIDENT_LVL'); // 사고피해레벨
      this.getComboItems('SAF_DAMAGE_LVL'); // 사고피해레벨
      
      setTimeout(() => {
        this.comboNoAccidentItems = [
          { noAccidentYn: 'N', noAccidentYnNm: '영향없음' },
          { noAccidentYn: 'Y', noAccidentYnNm: '무재해무산' },
        ];
        this.accidentDetail.noAccidentYn = this.accidentDetail.noAccidentYn ? this.accidentDetail.noAccidentYn : 'N';  
      }, 300);
      // this.getDamageList(); // 사내사고피해
      this.getVictimList('VICT1'); // 사내사고 피해자정보(당사)
      this.getVictimList('VICT2'); // 사내사고 피해자정보(협력업체)
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
          this.accidentDetail.humanInjuryCd = this.accidentDetail.humanInjuryCd ? this.accidentDetail.humanInjuryCd : 'HUMA1';
        }
        else if (codeGroupCd === 'SAF_ACCIDENT_LVL') 
        {
          this.comboAccidentLevlItems = this.$_.clone(_result.data);
          this.accidentDetail.accidentLvlCd = this.accidentDetail.accidentLvlCd ? this.accidentDetail.accidentLvlCd : 'ALVL1';
        }
        else if (codeGroupCd === 'SAF_DAMAGE_LVL') 
        {
          this.comboDamageLevlItems = this.$_.clone(_result.data);
          this.comboDamageLevlItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          // 상해자(당사) 그리드 헤더 설정
          if (!this.disabled)
          {
            this.gridOurCompanyOptions.header = [
              { text: '구분', name: 'damageLvlCd', width: '120px', type: 'select', items: this.comboDamageLevlItems, itemText: 'codeNm', itemValue: 'code' },
              { text: '성명', name: 'victimNm', width: '120px', },
              { text: '부서', name: 'victimDeptNm', width: '200px', },
            ];
          }
          else
          {
            this.gridOurCompanyOptions.header = [
              { text: '구분', name: 'damageLvlNm', width: '120px' },
              { text: '성명', name: 'victimNm', width: '120px', },
              { text: '부서', name: 'victimDeptNm', width: '200px', },
            ];
          }

          // 상해자(협렵업체) 그리드 헤더 설정
          if (!this.disabled)
          {
            this.gridPartnersOptions.header = [
              { text: '구분', name: 'damageLvlCd', width: '120px', type: 'select', items: this.comboDamageLevlItems, itemText: 'codeNm', itemValue: 'code' },
              { text: '성명', name: 'victimNm', width: '120px', type: 'text' },
              { text: '소속', name: 'victimDeptNm', width: '200px', type: 'text' },
            ];
          }
          else
          {
            this.gridPartnersOptions.header = [
              { text: '구분', name: 'damageLvlNm', width: '120px', },
              { text: '성명', name: 'victimNm', width: '120px', },
              { text: '소속', name: 'victimDeptNm', width: '200px', },
            ];
          }
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 사고피해자 조회 **/
    getVictimList (victimTypeCd) {
      this.$http.url = this.searchVictimUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'safAccidentNo': this.accidentDetail.safAccidentNo,
        'victimTypeCd': victimTypeCd,
      };
      this.$http.request((_result) => {
        if (victimTypeCd === 'VICT1') this.gridOurCompanyOptions.data = this.$_.clone(_result.data);
        else if (victimTypeCd === 'VICT2') this.gridPartnersOptions.data = this.$_.clone(_result.data);
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
        if (this.openUserFlag === 'OURCOMPANY')
        {
          if (this.$_.indexOf(this.$_.map(this.gridOurCompanyOptions.data, 'victimUserId'), data.user.userId) > -1) return;
          this.gridOurCompanyOptions.data.splice(0, 0, {
            'damageLvlCd': '',
            'victimUserId': data.user.userId, 
            'victimNm': data.user.userNm,
            'victimDeptCd': data.user.deptCd,
            'victimDeptNm': data.user.deptNm,
            'comSexTypeCd': data.user.comSexTypeCd,
            'comSexTypeNm': data.user.comSexTypeNm,
            'victimTypeCd': 'VICT1',
          });
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
    /**
     * 상해자(당사) 행 추가
     */
    btnOurCompanyAdd () {
      this.openUserFlag = 'OURCOMPANY';
      this.openUserPopup();
    },
    /**
     * 상해자(협렵업체) 행 추가
     */
    btnPartnersAdd () {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`); // 이유는 모르겠으나 이거를 하지 않으면 추가가 이루어지지않음.. 
      if (this.gridPartnersOptions.data.length === 0) this.gridPartnersOptions.data = [];
      this.gridPartnersOptions.data.splice(0, 0, {
        'damageLvlCd': '',
        'victimUserId': '', 
        'victimNm': '',
        'victimDeptCd': '',
        'victimDeptNm': '',
        'comSexTypeCd': '',
        'comSexTypeNm': '',
        'victimTypeCd': 'VICT2',
      });
    },
    /**
     * 상해자(당사) 행 삭제
     */
    btnOurCompanyDelete () {
      this.$_.forEach(this.selectedOurCompanyValue, (item) => {
        this.gridOurCompanyOptions.data.splice(this.$_.indexOf(this.$_.map(this.gridOurCompanyOptions.data, 'userId'), item.userId), 1);
      });
    },
    /**
     * 상해자(협렵업체) 행 삭제
     */
    btnPartnersDelete () {
      this.$_.forEach(this.selectedPartnersValue, (item) => {
        this.gridPartnersOptions.data.splice(this.$_.indexOf(this.$_.map(this.gridPartnersOptions.data, 'userId'), item.userId), 1);
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