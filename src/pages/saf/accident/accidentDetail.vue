<!--
  목적 : 사고 등록/접수/조치결과
  Detail : 1. 등록 : 사고 등록 수정 화면으로 사고발생시 발생부서에서 등록.
               2. 접수 : 사고 등록 단계에서 요청된 사고를 접수 및 확인하고 조사여부 검토 후에 조사대상인 경우 조사계획을 세우고, 그 내역을 등록하는 화면.
               3. 조치 : 사고 조사결과를 등록하고 개선사항 발생시 개선요청하는 화면.
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="사고상세" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn 
                v-if="completeable"
                :action-url="editUrl"
                :param="accident"
                :is-submit="isComplete"
                title="완료"
                color="black"
                action-type="PUT"
                beforeSubmit = "beforeComplete"
                @beforeComplete="beforeComplete"
                @btnClicked="btnCompleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="insertable || editable"
                :action-url="editUrl"
                :param="accident"
                :is-submit="isEdit"
                title="저장"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="deleteable"
                color="red"
                title="삭제"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="발행번호"
              name="accidentNum"
              v-model="popupParam.accidentNum"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :required="true"
                :comboItems="comboWeatherItems"
                :disabled="disabled"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="weatherCd"
                label="날씨"
                v-model="popupParam.weatherCd"
                v-validate="'required'"
                :state="validateState('weatherCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <y-datepicker
                  :width="8"
                  :required="true"
                  :disabled="disabled"
                  label="발생일시"
                  name="accidentYmd"
                  v-model="tempAccidentYmd"
                  v-validate="'required'"
                  :state="validateState('accidentYmd')"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                    <y-select
                      :width="12"
                      :comboItems="comboHourItems"
                      :disabled="disabled"
                      itemText="hourNm"
                      itemValue="hour"
                      ui="bootstrap"
                      name="accidentHour"
                      v-model="popupParam.accidentHour"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
                    <y-select
                      :width="12"
                      :comboItems="comboMinuteItems"
                      :disabled="disabled"
                      itemText="minuteNm"
                      itemValue="minute"
                      ui="bootstrap"
                      name="accidentMinute"
                      v-model="popupParam.accidentMinute"
                    >
                    </y-select>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :required="true"
                :comboItems="comboDeptItems"
                :disabled="disabled"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="deptCd"
                label="발생부서"
                v-model="popupParam.deptCd"
                v-validate="'required'"
                :state="validateState('deptCd')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                :required="true"
                :disabled="disabled"
                ui="bootstrap"
                name="area"
                label="발생장소"
                v-model="popupParam.area"
                v-validate="'required'"
                :state="validateState('area')"
                />
            </b-col>
            <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                <y-select
                  :width="6"
                  :required="true"
                  :comboItems="comboDeptItems"
                  :disabled="disabled"
                  itemText="deptNm"
                  itemValue="deptCd"
                  ui="bootstrap"
                  name="deptCd"
                  label="발생부서/장소"
                  v-model="popupParam.deptCd"
                  v-validate="'required'"
                  :state="validateState('deptCd')"
                >
                </y-select>
              </b-col>
              <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                <y-text
                :width="12"
                :maxlength="50"
                :disabled="disabled"
                ui="bootstrap"
                name="area"
                v-model="popupParam.area"
                v-validate="'required'"
                :state="validateState('area')"
                >
                </y-text>
              </b-col>
            </b-row>
            </b-col> -->
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <b-row>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <!-- 사번 -->
                  <y-text
                  :width="6"
                  :disabled="true"
                  ui="bootstrap"
                  label="보고자/보고일시"
                  name="rptUserId"
                  placeholder="사번"
                  v-model="popupParam.rptUserId"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 성명 -->
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="rptUserNm"
                  placeholder="성명"
                  v-model="popupParam.rptUserNm"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 소속부서명 -->
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="rptDeptNm"
                  placeholder="소속부서명"
                  v-model="popupParam.rptDeptNm"
                  >
                  </y-text>
                </b-col>
                <!-- <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <y-text
                  :width="12"
                  ui="bootstrap"
                  name="rptOfficeTel"
                  placeholder="사무실전화번호"
                  v-model="popupParam.rptOfficeTel"
                  >
                  </y-text>
                </b-col> -->
                <b-col sm="3" md="3" lg="3" xl="3" class="col-xxl-3">
                  <!-- 보고일시 -->
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="rptDt"
                  placeholder="보고일시"
                  v-model="popupParam.rptDt"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
              :width="10"
              :maxlength="150"
              :required="true"
              :disabled="disabled"
              ui="bootstrap"
              label="사고명"
              name="accidentTitle"
              v-model="popupParam.accidentTitle"
              v-validate="'required'"
              :state="validateState('accidentTitle')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <!-- <y-checkbox
                :width="10"
                :required="true"
                :comboItems="comboAccidentTypeItems"
                :disabled="disabled"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="accidentTypes"
                label="사고유형"
                v-model="tempAccidentTypes"
                v-validate="'required'"
                :state="validateState('accidentTypes')"
                /> -->
              <y-multi-select
                :width="8"
                :comboItems="comboAccidentTypeItems"
                :needDefaultView="true"
                :disabled="disabled"
                :required="true"
                v-model="tempAccidentTypes"
                type="edit"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="사고유형"
                name="accidentTypes"
                v-validate="'required'"
                :state="validateState('accidentTypes')"
              >
              </y-multi-select>
            </b-col>
            <b-col v-if="isEtc" 
              sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :maxlength="50"
              :disabled="disabled"
              ui="bootstrap"
              label="사고유형 기타"
              name="accidentTypeEtc"
              v-model="popupParam.accidentTypeEtc"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3"></b-row>
    <el-tabs type="border-card" v-model="tabIndex" @tab-click="tabClick">
      <el-tab-pane
        v-for="(item, i) in tabItems"
        :key="i"
        stretch
        class="default-tab-pane"
        :name="i"
      >
        <span slot="label">
          <i class="el-icon-date"></i>
          {{ item.title }}
        </span>
        <keep-alive>
          <component :is="component" v-if="component" :accidentDetail.sync="popupParam" :tabParam.sync="tabParam" :tabIndex="tabIndexParam"/>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-2">
          <y-btn 
            v-if="completeable"
            title="완료"
            color="black"
            @btnClicked="beforeComplete" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn 
            v-if="insertable || editable"
            title="저장"
            color="orange"
            @btnClicked="beforeEdit" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn 
            v-if="deleteable"
            color="red"
            title="삭제"
            @btnClicked="btnDeleteClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
              title="닫기"
              size="mini"
              @btnClicked="closePopup" 
          />
        </div>  
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-accident-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        safAccidentNo: 0, // 사내사고번호
        accidentTitle: '', // 사고명
        accidentNum: '', // 발행번호
        accidentStepCd: '', // 사내사고진행단계
        accidentYmd: '', // 발생일
        accidentHour: '', // 발생시
        accidentMinute: '', // 발생분
        deptCd: '', // 발생부서코드
        area: '', // 발생장소
        weatherCd: null, // 날씨코드
        accidentTypeEtc: '', // 사고유형기타

        rptUserId: '', // 보고자사번
        rptUserNm: '', // 보고자성명
        rptDeptCd: '', // 보고자소속코드
        rptDeptNm: '', // 보고자소속명
        rptOfficeTel: '', // 보고자사무실전화번호
        rptDt: '', // 보고일시

        contents: '', // 사고발생내용
        provReason: '', // 추정원인
        cauTypeCd: null, // 원인유형코드
        cauTypeEtc: '', // 원인유형기타
        bgnMeas: '', // 초기대책
        
        accidentTypes: [], // 사고유형
        
        investYn: 'Y', // 사고조사대상 여부

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

        flag: true, // 수정인지 등록인지 판단
        completeable: 0,
        tabIndex: 0,
      },
    },
  },
  data: () => ({
    // TODO : 현재까지 파악된 바로는 tab은 같은 폴더 또는 하위 폴더의 컴포넌트만 접근이 가능한 것으로 파악됨
    //                즉, 반드시 메인페이지 역할을 하는 vue와 동일 폴더나 하위 폴더에 tabItem 역할을 하는 vue 파일을 위치 시킬 것
    tabItems: [
      { title: '발생내용', url: './accidentContents' },
      { title: '첨부파일', url: 'fileUploadPage' },
    ],
    // 개선조치를 위한 변수
    tabParam: {
      imprClassCd: '',
      refTableId: 0,
      editable: true,
      detailCheck: true,
    },
    tabIndexParam: '',
    tempAccidentYmd: '',
    tempAccidentTypes: [],
    accident: null,
    // saveBtnTitile: '수정',
    component: null,
    tabIndex: 0,
    isInsert: false,
    isEdit: false,
    isComplete: false,
    insertable: false,
    editable: false,
    deleteable: false,
    completeable: false,
    comboHourItems: [], // 시
    comboMinuteItems: [], // 분
    comboDeptItems: [], // 주관부서
    comboWeatherItems: [], // 날씨
    comboAccidentTypeItems: [], // 사고유형
    accidentTitle: '',
    accidentHourMinute: '', // 발생시분
    isEtc: false,
    editUrl: '',
    disabled: false,
    accidentReception: null,
    accidentReceptionPsn: [],
  }),
  watch: {
    'tabIndex': function (newValue, oldValue) {
      this.loadComponent();
    },
    'tempAccidentTypes': function (newValue, oldValue) {
      if (!newValue) return;
      if (newValue.length > 0 && this.$_.indexOf(this.$_.map(newValue, 'code'), 'OCC10') !== -1) this.isEtc = true;
      else this.isEtc = false;
    },
    'popupParam.accidentTypes': {
      handler: function (newValue, oldValue) {
        this.tempAccidentTypes = this.$_.clone(this.popupParam.accidentTypes);
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
    // this.loadComponent();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      this.disabled = (this.popupParam.accidentStepCd === 'ACCS4')
      setTimeout(() => {
        if (this.popupParam.flag)
        {
          // this.saveBtnTitile = '신규등록';
          // 시 분 setting
          this.tempAccidentYmd = this.$comm.getToday();
          this.popupParam.rptDt = this.$comm.getTodayDateTime();
        }
        else
        {
          // this.saveBtnTitile = '수정';
          this.tempAccidentYmd = this.popupParam.accidentYmd;
        }
        
        var i = 0;
        for (; i < 24; i++)
        {
          this.comboHourItems.push({
            hourNm: i + '시',
            hour: i
          });
        }
        this.popupParam.accidentHour = (this.popupParam.accidentHour ? this.popupParam.accidentHour : '10');
        i = 0;
        for (; i < 60; i++)
        {
          this.comboMinuteItems.push({
            minuteNm: i + '분',
            minute: i
          });
        }
        this.popupParam.accidentMinute = (this.popupParam.accidentMinute ? this.popupParam.accidentMinute : '15');
      }, 100);
      // 사고진행단계에 따른 title setting
      switch (this.popupParam.accidentStepCd) { 
        case 'ACCS1':
          // this.accidentTitle = '사고발생등록';
          this.popupParam.completeable = 0;
          this.insertable = true;
          this.editable = true;
          this.deleteable = true;
          this.completeable = true;
          break;
        case 'ACCS2':
          // this.accidentTitle = '사고접수';
          this.tabItems.splice(1, 0, { title: '조사계획', url: './accidentInvest' });
          this.tabItems.splice(2, 0, { title: '피해내역', url: './accidentDamage' });
          this.popupParam.completeable = 1;
          this.insertable = false;
          this.editable = true;
          this.deleteable = true;
          this.completeable = true;
          break;
        case 'ACCS3':
          // this.accidentTitle = '사고조치결과';
          this.tabItems.splice(1, 0, { title: '조사계획', url: './accidentInvest' });
          this.tabItems.splice(2, 0, { title: '피해내역', url: './accidentDamage' });
          this.tabItems.splice(3, 0, { title: '조사결과', url: './accidentCauseMeasures' });
          this.tabItems.splice(4, 0, { title: '개선사항', url: 'imprActTab' });
          this.popupParam.completeable = 2;
          // 개선조치를 위한 변수 Setting
          this.tabParam.imprClassCd = 'ICL01';
          this.tabParam.refTableId = this.popupParam.safAccidentNo;
          this.tabParam.editable = false;
          this.tabParam.detailCheck = true;
          this.insertable = false;
          this.editable = true;
          this.deleteable = true;
          this.completeable = true;
          break;
        case 'ACCS4':
          // this.accidentTitle = '사고조치결과';
          this.tabItems.splice(1, 0, { title: '조사계획', url: './accidentInvest' });
          this.tabItems.splice(2, 0, { title: '피해내역', url: './accidentDamage' });
          this.tabItems.splice(3, 0, { title: '조사결과', url: './accidentCauseMeasures' });
          this.tabItems.splice(4, 0, { title: '개선사항', url: 'imprActTab' });
          this.popupParam.completeable = 2;
          // 개선조치를 위한 변수 Setting
          this.tabParam.imprClassCd = 'ICL01';
          this.tabParam.refTableId = this.popupParam.safAccidentNo;
          this.tabParam.editable = false;
          this.tabParam.detailCheck = true;
          this.insertable = false;
          this.editable = false;
          this.deleteable = false;
          this.completeable = false;
          break;
        default:
          // this.accidentTitle = '사고등록';
          this.insertable = true;
          this.editable = false;
          this.deleteable = false;
          this.completeable = false;
      }
      setTimeout(() => {
        if (this.popupParam.tabIndex !== 0) this.tabIndex = this.popupParam.tabIndex;
      }, 100);
      // Url Setting
      this.editUrl = transactionConfig.saf.accident.edit.url;

      // 유효성 체크를 위한 리스트 조회
      this.checkAccidentReceptionUndefinded();
      this.checkAccidentReceptionPsnUndefinded();

      this.getAccidentNum();
      this.getComboItems('SAF_WEATHER'); // 날씨
      this.getComboItems('SAF_OCC_TYPE'); // 사고유형
      this.getComboDeptItems(); // 점검주관부서, 점검수행부서
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      
      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else if (path === 'imprActTab') this.component = () => import('@/pages/saf/imprAct/imprActTab');
      else this.component = () => import(`${path}`);
    },
    /**
     * 자식 페이지에 넘길 paneName 정보 업데이트
     * tab 클릭시 마다 
     * tab : 클릭한 tab 정보
     */
    tabClick (tab) {
      var nowDate = new Date();
      this.tabIndexParam = nowDate.getMilliseconds();
    },
    /**
     * 사내사고 최신번호 조회
     */
    getAccidentNum () {
      this.$http.url = this.$format(selectConfig.saf.accident.accidentNum.get.url, (this.popupParam.flag ? 0 : 1));
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.popupParam.accidentNum = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 해당 사고의 사고유형 조회
     */
    getOccType () {
      this.$http.url = selectConfig.saf.accidentOccType.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'safAccidentNo': this.popupParam.safAccidentNo
      };
      this.$http.request((_result) => {
        this.popupParam.accidentTypes = [];
        if (_result.data.length > 0)
        {
          this.$_.forEach(_result.data, (item) => {
            this.popupParam.accidentTypes.push({
              code: item['accidentTypeCd'],
              name: item['accidentTypeNm']
            });
            // this.popupParam.accidentTypes.push(item['accidentTypeCd']);
          });
          this.tempAccidentTypes = this.$_.clone(this.popupParam.accidentTypes);
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 공통 마스터 정보 조회 (날씨, 사고유형)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_WEATHER')
        {
          this.comboWeatherItems = this.$_.clone(_result.data);
          this.comboWeatherItems.splice(0, 0, { 'code': null, 'codeNm': '선택하세요' });
          // this.popupParam.weatherCd = this.popupParam.flag ? null : this.popupParam.weatherCd;
        }
        else if (codeGroupCd === 'SAF_OCC_TYPE')
        {
          this.comboAccidentTypeItems = this.$_.clone(_result.data);
          if (this.popupParam.safAccidentNo) this.getOccType(); // 해당 사고의 사고유형s
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 점검주관부서, 점검수행부서 조회
     */
    getComboDeptItems (codeGroupCd) {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboDeptItems = this.$_.clone(_result.data);
        this.comboDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.popupParam.deptCd = this.popupParam.flag ? 'yullin' : this.popupParam.deptCd;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      this.saveCheckResult(0, '저장');
    },
    beforeComplete () {
      this.saveCheckResult(1, '완료');
    },
    saveCheckResult (completeable, alertTitle) {
      var returnVal = false;
      // 사고유형 중 기타를 체크 했을 경우
      returnVal = this.checkAccidentOccur();
      if (this.popupParam.accidentStepCd === 'ACCS2' || this.popupParam.accidentStepCd === 'ACCS3')
      { 
        returnVal = this.checkAccidentReception(this.popupParam.period ? this.popupParam : this.accidentReception); // 조사계획
        if (returnVal) returnVal = this.checkAccidentReceptionPsn(this.popupParam.accidentInvestPsn ? this.popupParam : this.accidentReceptionPsn); // 조사인원
      }
      
      if (returnVal && this.popupParam.accidentStepCd === 'ACCS3') returnVal = this.checkAccidentResult();

      if (returnVal)
      {
        this.$validator.validateAll().then((_result) => {
          // TODO : 전역 성공 메시지 처리
          // 이벤트는 ./event.js 파일에 선언되어 있음
          if (_result) {
            this.popupParam.completeable = completeable === 0 ? 0 : this.popupParam.completeable + completeable;
                
            this.accident = this.$_.clone(this.popupParam);
            this.accident.accidentYmd = this.tempAccidentYmd;
            this.accident.accidentTypes = this.$_.map(this.tempAccidentTypes, 'code');
            
            // 사고 접수/확인
            if (this.popupParam.accidentStepCd === 'ACCS2' || this.popupParam.accidentStepCd === 'ACCS3')
            {
              if (this.popupParam.leaderUserId)
              {
                this.accident.accidentInvest = {
                  leaderUserId: this.popupParam.leaderUserId, // 리더 사번
                  leaderUserNm: this.popupParam.leaderUserNm, // 리더 성명
                  leaderDeptCd: this.popupParam.leaderDeptCd, // 리더 소속부서코드
                  leaderDeptNm: this.popupParam.leaderDeptNm, // 리더 소속부서명
                  leaderOfficeTel: this.popupParam.leaderOfficeTel, // 리더 사무실전화번호
                  leaderSelYmd: this.popupParam.leaderSelYmd, // 리더 선정일
  
                  faciUserId: this.popupParam.faciUserId, // 사고조사 Facilitator 사번
                  faciUserNm: this.popupParam.faciUserNm, // 사고조사 Facilitator 성명
                  faciDeptCd: this.popupParam.faciDeptCd, // 사고조사 Facilitator 부서코드
                  faciDeptNm: this.popupParam.faciDeptNm, // 사고조사 Facilitator 부서명
  
                  investPlan: this.popupParam.investPlan, // 조사계획
                  investStartYmd: this.popupParam.period[0], // 조사기간시작일
                  investEndYmd: this.popupParam.period[1], // 조사기간종료일
                  investMethod: this.popupParam.investMethod, // 조사방법
                };
                
                this.accident.accidentInvestPsns = [];
                this.$_.forEach(this.popupParam.accidentInvestPsn, (item) => {
                  this.accident.accidentInvestPsns.push(item);
                });
              }
  
              if (this.popupParam.outCompanyData)
              {
                this.accident.accidentVictims = [];
                this.$_.forEach(this.popupParam.outCompanyData, (item) => {
                  this.accident.accidentVictims.push(item);
                });
  
                this.$_.forEach(this.popupParam.partenersData, (item) => {
                  this.accident.accidentVictims.push(item);
                });
              }
            }
  
            // 조사결과/개선계획
            if (this.popupParam.accidentStepCd === 'ACCS3')
            {
              if (this.popupParam.accidentCauMeass)
              {
                this.accident.accidentCauMeass = [];
                this.$_.forEach(this.popupParam.accidentCauMeass, (item) => {  
                  this.accident.accidentCauMeass.push(item);
                });
              }
            }
            
            window.getApp.$emit('CONFIRM', {
              title: '확인',
              message: alertTitle + '하시겠습니까?',
              // TODO : 필요시 추가하세요.
              type: 'info',  // success / info / warning / error
              // 확인 callback 함수
              confirmCallback: () => {
                console.log(this.accident);
                if (completeable > 0) this.isComplete = true;
                else this.isEdit = true;
              },
              // 취소 callback 함수
              cancelCallback: () => {
                if (completeable > 0) this.isComplete = false;
                else this.isEdit = false;
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
          if (completeable > 0) this.isComplete = false;
          else this.isEdit = false;
        });
      }
    },
    checkAccidentOccur () {
      if (this.tempAccidentTypes.length > 0 && this.$_.indexOf(this.tempAccidentTypes, 'OCC10') !== -1)
      {
        if (!this.popupParam.accidentTypeEtc)
        {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '사고유형기타를 입력하세요.',
            type: 'warning',  // success / info / warning / error
          });
          return false;
        }
      }
      // 사고원인유형 중 기타를 체크 했을 경우
      if (this.popupParam.cauTypeCd === 'CAU13')
      {
        if (!this.popupParam.cauTypeEtc)
        {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '원인유형기타를 입력하세요.',
            type: 'warning',  // success / info / warning / error
          });
          return false;
        }
      }
      else if (!this.popupParam.cauTypeCd)
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '원인유형이 선택되지 않았습니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }

      if (!this.popupParam.contents)
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: ' 사고발생내용이 입력되지 않았습니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }

      return true;
    },
    checkAccidentReceptionUndefinded () {
      var target = this.popupParam;
      // 단계가 ACCS2이면서 필수 항목값이 undifinded이면 조회하여 저장된 값을 불러온다.
      if (!target || !target.safAccidentNo) return;
      this.$http.url = this.$format(selectConfig.saf.accidentInvest.get.url, target.safAccidentNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (_result.data.length > 0) 
        {
          _result.data[0].period = [_result.data[0].investStartYmd, _result.data[0].investEndYmd];
          _result.data[0].accidentStepCd = 'ACCS2';
          this.accidentReception = this.$_.clone(_result.data[0]);
        }
        // console.log(this.accidentReception);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    checkAccidentReceptionPsnUndefinded () {
      var target = this.popupParam;
      // 단계가 ACCS2이면서 필수 항목값이 undifinded이면 조회하여 저장된 값을 불러온다.
      if (target.accidentStepCd === 'ACCS2' && !target.accidentInvestPsn)
      {
        if (!target || !target.safAccidentNo) return;
        this.$http.url = selectConfig.saf.accidentInvestPsn.list.url;
        this.$http.type = 'GET';
        this.$http.param = {
          'safAccidentNo': target.safAccidentNo,
        };
        this.$http.request((_result) => {
          this.accidentReceptionPsn = this.$_.clone(_result.data);
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', _error);
        });
      }
    },
    checkAccidentReception (target) {
      console.log(target);
      // var target = this.accidentReception;
      if (!target)
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '조사계획이 작성되지 않았습니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }

      if ((target.period && target.period.length < 2))
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: ' 조사기간이 입력되지 않았습니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }
      
      if ((target.accidentStepCd === 'ACCS2' && !target.leaderUserId) || target.leaderUserId === '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: ' 리더가 지정되지 않았습니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }
      
      if ((target.accidentStepCd === 'ACCS2' && !target.leaderSelYmd) || target.leaderSelYmd === '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: ' 리더 선정일이  지정되지 않았습니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }
      
      if ((target.accidentStepCd === 'ACCS2' && !target.investPlan) || target.investPlan === '')
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: ' 조사계획이 입력되지 않았습니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }
      
      return true;
    },
    checkAccidentReceptionPsn (target) {
      // var target = this.accidentReceptionPsn;
      if ((target.accidentStepCd === 'ACCS2' && !target.accidentInvestPsn) 
      || (target.accidentInvestPsn && target.accidentInvestPsn.length === 0))
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: ' 최소1인이상의 조사인원이 지정되야 합니다.',
          type: 'warning',  // success / info / warning / error
        });
        return false;
      }
      
      return true;
    },
    checkAccidentResult () {
      var rootCause = false;
      var imprMeasure = false;
      if (this.popupParam.accidentCauMeass)
      {
        this.$_.forEach(this.popupParam.accidentCauMeass, (item) => {
          if (!item.rootCause) rootCause = true;
          if (!item.imprMeasure) imprMeasure = true;
        });

        if (rootCause) 
        {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '조사결과 그리드에서 근본원인이 입력되지 않았습니다.',
            type: 'warning',  // success / info / warning / error
          });
          return false;
        }
        else if (imprMeasure)
        {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '조사결과 그리드에서 개선계획이 입력되지 않았습니다.',
            type: 'warning',  // success / info / warning / error
          });
          return false;
        }
      }

      return true;
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
    /**
     *  팝업 안 보이도록 closePopup emit
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      this.$emit('closePopup', {});
    },
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      // this.saveBtnTitile = '수정';
      this.isEdit = false;
      this.closePopup(null);
    },
    /**
     * 사내사고 삭제
     *  삭제 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        // TODO : 필요시 추가하세요.
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.$http.url = this.$format(transactionConfig.saf.accident.delete.url, this.popupParam.safAccidentNo);
          this.$http.type = 'DELETE';
          this.$http.request((_result) => {
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '삭제되었습니다.',
              type: 'success',  // success / info / warning / error
            });
            this.closePopup(null);
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', _error);
          });
        },
        // 취소 callback 함수
        cancelCallback: () => {
        }
      });
    },
    btnCompleteClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '완료되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isComplete = false;
      this.editable = false;
      this.deleteable = false;
      this.completeable = false;
      this.closePopup(null);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>