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
            <y-label :label="accidentTitle" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
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
              <b-row>
              <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                <y-datepicker
                  :width="6"
                  :required="true"
                  label="발생일시"
                  name="accidentYmd"
                  v-model="popupParam.accidentYmd"
                  v-validate="'required'"
                  :state="validateState('accidentYmd')"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6 px-1">
                    <y-select
                      :width="12"
                      :comboItems="comboHourItems"
                      itemText="hourNm"
                      itemValue="hour"
                      ui="bootstrap"
                      name="hour"
                      v-model="popupParam.accidentHour"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6 px-1">
                    <y-select
                      :width="12"
                      :comboItems="comboMinuteItems"
                      itemText="minuteNm"
                      itemValue="minute"
                      ui="bootstrap"
                      name="minute"
                      v-model="popupParam.accidentMinute"
                    >
                    </y-select>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                <y-select
                  :width="6"
                  :comboItems="comboDeptItems"
                  itemText="deptNm"
                  itemValue="deptCd"
                  ui="bootstrap"
                  name="deptCd"
                  label="발생장소"
                  v-model="popupParam.deptCd"
                >
                </y-select>
              </b-col>
              <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                <y-text
                :width="12"
                ui="bootstrap"
                name="area"
                v-model="popupParam.area"
                >
                </y-text>
              </b-col>
            </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboWeatherItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="weatherCd"
                label="날씨"
                v-model="popupParam.weatherCd"
              >
              </y-select>
            </b-col>
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
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
                  <!-- 사무실전화번호 -->
                  <y-text
                  :width="12"
                  ui="bootstrap"
                  name="rptOfficeTel"
                  placeholder="사무실전화번호"
                  v-model="popupParam.rptOfficeTel"
                  >
                  </y-text>
                </b-col>
                <b-col sm="2" md="2" lg="2" xl="2" class="col-xxl-2">
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
              ui="bootstrap"
              label="사고명"
              name="accidentTitle"
              v-model="popupParam.accidentTitle"
              v-validate="'required'"
              :state="validateState('accidentTitle')"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-checkbox
                :width="10"
                :required="true"
                :comboItems="comboAccidentTypeItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="accidentType"
                label="사고유형"
                v-model="accidentType"
                v-validate="'required'"
                :state="validateState('accidentType')"
                />
              <!-- <y-multi-select
                :width="10"
                :comboItems="comboAccidentTypeItems"
                :needDefaultView="true"
                :required="true"
                v-model="accidentType"
                type="edit"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="사고유형"
                name="accidentType"
                v-validate="'required'"
                :state="validateState('accidentType')"
              >
              </y-multi-select> -->
            </b-col>
            <b-col v-if="isEtc" sm="6" md="6" lg="6" xl="6" class="col-xxl-3 mt-3">
              <y-text
              :width="8"
              :maxlength="50"
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
    <el-tabs type="border-card" v-model="tabIndex">
      <el-tab-pane
        v-for="(item, i) in tabItems"
        :key="i"
        stretch
        class="default-tab-pane"
      >
        <span slot="label">
          <i class="el-icon-date"></i>
          {{ item.title }}
        </span>
        <keep-alive>
          <component :is="component" v-if="component" :safAccidentNo="popupParam.safAccidentNo" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-2">
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
        weatherCd: '', // 날씨코드
        accidentTypeEtc: '', // 사고유형기타

        rptUserId: '', // 보고자사번
        rptUserNm: '', // 보고자성명
        rptDeptCd: '', // 보고자소속코드
        rptDeptNm: '', // 보고자소속명
        rptOfficeTel: '', // 보고자사무실전화번호
        rptDt: '', // 보고일시

        contents: '', // 사고발생내용
        provReason: '', // 추정원인
        cauTypeCd: '', // 원인유형코드
        cauTypeEtc: '', // 원인유형기타
        bgnMeas: '', // 초기대책
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
    component: null,
    tabIndex: 0,
    editable: false,
    isInsert: false,
    isEdit: false,
    comboHourItems: [], // 시
    comboMinuteItems: [], // 분
    comboDeptItems: [], // 주관부서
    comboWeatherItems: [], // 날씨
    comboAccidentTypeItems: [], // 사고유형
    accidentTitle: '',
    accidentType: [], // 사고유형
    accidentHourMinute: '', // 발생시분
    isEtc: false,
  }),
  watch: {
    'tabIndex': function (newValue, oldValue) {
      this.loadComponent();
    },
    'accidentType': function (newValue, oldValue) {
      if (newValue.length > 0 && this.$_.indexOf(newValue, 'OCC10') !== -1)
      {
        this.isEtc = true;
      }
      else
      {
        this.isEtc = false;
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
    // this.loadComponent();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // 시 분 setting
        var i = 1;
        for (; i < 25; i++)
        {
          this.comboHourItems.push({
            hourNm: i + '시',
            hour: i
          });
        }
        this.comboHourItems.splice(0, 0, { 'hour': '', 'hourNm': '선택하세요' });
        this.popupParam.accidentHour = (this.popupParam.accidentHour ? this.popupParam.accidentHour : '');
        i = 1;
        for (; i < 61; i++)
        {
          this.comboMinuteItems.push({
            minuteNm: i + '분',
            minute: i
          });
        }
        this.comboMinuteItems.splice(0, 0, { 'minute': '', 'minuteNm': '선택하세요' });
        this.popupParam.accidentMinute = (this.popupParam.accidentMinute ? this.popupParam.accidentMinute : '');
        
        // 사고진행단계에 따른 title setting
        switch (this.popupParam.accidentStepCd) {
          case 'ACCS1':
            this.accidentTitle = '사고등록';
            break;
          case 'ACCS2':
            this.accidentTitle = '사고접수';
            this.tabItems.splice(1, 0, { title: '조사계획', url: './accidentInvest' });
            this.tabItems.splice(2, 0, { title: '피해내역', url: './accidentDamage' });
            break;
          case 'ACCS3':
            this.accidentTitle = '사고조치결과';
            this.tabItems.splice(1, 0, { title: '조사계획', url: './accidentInvest' });
            this.tabItems.splice(2, 0, { title: '피해내역', url: './accidentDamage' });
            this.tabItems.splice(3, 0, { title: '조사결과', url: './accidentCauseMeasures' });
            this.tabItems.splice(4, 0, { title: '개선사항', url: 'imprActTab' });
            break;
          default:
            this.accidentTitle = '';
        }
      }, 300);
      // Url Setting
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
     * 해당 사고의 사고유형 조회
     */
    getOccType () {
      console.log(1);
      this.$http.url = selectConfig.saf.accidentOccType.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.accidentType = [];
        if (_result.data.length > 0)
        {
          this.$_.forEach(_result.data, (item) => {
            this.accidentType.push({
              code: item['accidentTypeCd'],
              codeNm: item['accidentTypeNm']
            });
          });
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
          this.comboWeatherItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.popupParam.weatherCd = '';
        }
        else if (codeGroupCd === 'SAF_OCC_TYPE')
        {
          this.comboAccidentTypeItems = this.$_.clone(_result.data);
          this.comboAccidentTypeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
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
        // this.popupParam.deptCd = this.popupParam.deptCd;
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
    /** end button 관련 이벤트 **/
  }
};
</script>