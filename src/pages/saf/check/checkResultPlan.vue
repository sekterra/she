<!--
  목적 : 안전점검관리 - 점검계획 등록
  Detail : 안전점검계획 등록/수정 화면
               안전점검계획을 점검계획사용여부가 사용으로 지정된 점검종류별로  주관부서와 수행부서들을 지정하고, 점검주기 별로 기간을 지정하여 점검예정일을 지정
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row ref="editBox" class="mt-3">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="안전점검계획" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckKindItems"
                :required="true"
                itemText="safCheckKindNm"
                itemValue="safCheckKindNo"
                ui="bootstrap"
                type="edit"
                name="safCheckKindNo"
                label="점검종류"
                v-model="checkResult.safCheckKindNo"
                v-validate="'required'"
                :state="validateState('safCheckKindNo')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              name="createUserNm"
              label="등록자/등록일"
              v-model="checkResult.createUserNm"
              v-validate="'required'"
              :state="validateState('createUserNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                :required="true"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="deptCd"
                label="점검주관부서"
                v-model="checkResult.deptCd"
                v-validate="'required'"
                :state="validateState('deptCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-multi-select
                :width="8"
                :comboItems="comboTgtDeptItems"
                :needDefaultView="true"
                :required="true"
                v-model="checkResult.tempTgtDeptCd"
                type="edit"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="점검수행부서"
                name="tempTgtDeptCd"
                v-validate="'required'"
                :state="validateState('tempTgtDeptCd')"
              >
              </y-multi-select>
            </b-col>
          </b-row>
          <b-row ref="searchBox" class="mt-3">
            <b-col sm="12">
              <b-card header-class="default-card" body-class="default-body-card" class="py-0">
                <div slot="header" >
                    <y-label label="검색" />
                  <div class="float-right">
                    <y-btn
                      :title="searchArea.title"
                      color="green"                
                      @btnClicked="btnSearchVisibleClicked" 
                    />
                    <y-btn
                      title="검색"
                      color="green"
                      @btnClicked="btnSearchCheckYmdClicked" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    />
                  </div>
                </div>
                <b-row v-if="searchArea.show">
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-select
                      :width="8"
                      :comboItems="comboCycleItems"
                      :required="true"
                      itemText="codeNm"
                      itemValue="code"
                      ui="bootstrap"
                      name="cycle"
                      label="점검주기"
                      v-model="searchParam.cycle"
                      v-validate="'required'"
                      :state="validateState('cycle')"
                    >
                    </y-select>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-datepicker
                      :width="8"
                      :range="true"
                      :required="true"
                      label="점검기간"
                      name="period"
                      v-model="searchParam.period"
                      v-validate="'required'"
                      :state="validateState('period')"
                    >
                    </y-datepicker>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>

          <!-- 검색 결과 테이블 -->
          <b-row class="mt-3">
            <b-col sm="12">
              <b-col sm="12" class="px-0">
                <y-data-table 
                :height="gridOptions.height"
                :headers="gridOptions.header"
                :items="gridOptions.data"
                :excel-down="true"
                :print="true"
                :useRownum="false"
                v-model="checkYmdValue"
                label="점검기간 목록"
                ref="checkPriodDataTable"
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
          <div class="float-right mt-3" >
            <y-btn
              title="초기화"
              @btnClicked="btnClearClickedCallback" 
            />
            <y-btn 
              :action-url="insertUrl"
              :param="checkResult"
              :is-submit="isInsert"
              title="신규등록"
              color="orange"
              action-type="POST"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
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
  name: 'y-check-result-plan',
  props: {
    paneName: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    checkResult: {
      safCheckRsltNo: '', // 안전점검결과번호
      tempTgtDeptCd: [],
      arrayTgtDeptCd: [],
      tgtDeptCd: '', // 대상부서코드
      tgtDeptNm: '', // 대상부서명
      deptCd: '', // 주관부서코드
      deptNm: '', // 주관부서명
      safCheckKindNo: '', // 점검종류번호
      safCheckKindNm: '', // 점검종류명
      arrayCheckSchYmd: [], // 배열된 가능성 있음 (점검일)
      arrayCheckTitle: [], // 배열된 가능성 있음 (점검명)
      updateUserId: '',
      createUserId: '',
      createUserNm: '',
    },
    searchParam: {
      cycle: '', // 점검주기
      period: [], // 점검기간
    },
    gridOptions: {
      header: [],
      data: [],
      height: '250'
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    baseWidth: 9,
    // editable: false,
    isInsert: false,
    // isEdit: false,
    gridItemData: [],
    gridHeaderItemOptions: [],
    comboCheckKindItems: [], // 점검종류 
    comboDeptItems: [], // 주관부서
    comboTgtDeptItems: [], // 대상부서
    comboCycleItems: [], // 점검주기
    insertUrl: '',
    // editUrl: '',
    checkYmdValue: [],
  }),
  watch: {
    'checkResult.tempTgtDeptCd': function (newValue, oldValue) {
      if (this.$_.indexOf(this.$_.map(newValue, 'code'), '') > -1)
      {
        this.checkResult.tempTgtDeptCd = this.$_.clone(this.$_.reject(this.checkResult.tempTgtDeptCd, ['code', '']));
      }
    },
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.$nextTick(() => {
      Object.assign(this.$data, this.$options.data());
      this.init();
    });
  },
  mounted () {
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // URL setting
      this.insertUrl = transactionConfig.saf.checkResult.insert.url;
      // 등록자 setting
      this.checkResult.createUserId = 'dev';
      this.checkResult.createUserNm = '개발자 / ' + this.$comm.getToday();
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '점검예정일', name: 'checkSchYmd', width: '20%', align: 'left', link: 'test' },
        { text: '점검명', name: 'checkTitle', width: '20%', align: 'left' },
      ];

      this.getComboItems('SAF_CHECK_CYCLE'); // 점검주기
      this.getComboCheckKindItems(); // 점검종류
      this.getComboDeptItems(); // 점검주관부서, 점검수행부서
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 공통 마스터 정보 조회 (점검주기)
     * codeGroupCd : 마스터 테이블 codeGroupCd 정보
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        if (codeGroupCd === 'SAF_CHECK_CYCLE') 
        {
          this.comboCycleItems = this.$_.clone(_result.data);
          this.comboCycleItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
          this.searchParam.cycle = '';
        }
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 점검종류 조회
     */
    getComboCheckKindItems () {
      this.$http.url = selectConfig.saf.checkKind.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboCheckKindItems = this.$_.clone(_result.data);
        this.comboCheckKindItems.splice(0, 0, { 'safCheckKindNo': '', 'safCheckKindNm': '선택하세요' });
        this.checkResult.safCheckKindNo = '';
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
        this.checkResult.deptCd = '';
        this.comboTgtDeptItems = this.$_.clone(_result.data);
        this.comboTgtDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        // this.checkResult.tempTgtDeptCd = [{ 'code': '', 'name': '선택하세요' }];
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.checkResult.arrayTgtDeptCd = this.$_.clone(this.$_.map(this.checkResult.tempTgtDeptCd, 'code'));
              this.checkResult.arrayCheckSchYmd = this.$_.clone(this.$_.map(this.checkYmdValue, 'checkSchYmd'));
              this.checkResult.arrayCheckTitle = this.$_.clone(this.$_.map(this.checkYmdValue, 'checkTitle'));
              console.log(this.checkResult);
              this.isInsert = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
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
        this.isInsert = false;
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
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 280;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 450;
        this.gridOptions.height = calculatedHeight <= 350 ? defaultHeight : calculatedHeight;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검진항목  목록 조회 및 수정 버튼 보이도록 처리
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.isInsert = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
    },
    /** button 관련 이벤트 **/
    /**
     * 검색박스 숨기기/보이기 처리 후 setGridSize 호출
     */
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    /**
     * 수정 버튼 안보여지도록 처리 및 isSubmit false 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      Object.assign(this.$data.checkResult, this.$options.data().checkResult);
      
      this.searchParam.cycle = '';
      this.searchParam.period = [];
      this.gridOptions.data = [];
      this.checkResult.createUserId = 'dev';
      this.checkResult.createUserNm = '개발자 / ' + this.$comm.getToday();
      this.$validator.reset();
    },
    /** 점검기간  목록 조회 **/
    btnSearchCheckYmdClicked () {
      if (!this.checkResult.safCheckKindNo)
      {        
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '점검종류를 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      else if (!this.searchParam.cycle)
      {        
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '점검주기를 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      else if (!this.searchParam.period || this.searchParam.period.length <= 0)
      {        
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '점검기간을 선택해주세요.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }

      var gapOfDate = '';
      switch (this.searchParam.cycle) {
        case 'CCY1W':
          gapOfDate = '7d' // 1주
          break;
        case 'CCY1M':
          gapOfDate = '1m' // 1달
          break;
        case 'CCYPD':
          gapOfDate = '4m' // 분기
          break;
        case 'CCYHY':
          gapOfDate = '6m' // 반기
          break;
        case 'CCY1Y':
          gapOfDate = '1y' // 1년
          break;
        default:
          // code block
      }
      var startDate = this.searchParam.period[0];
      var endDate = this.searchParam.period[1];
      var date = new Date();
      var safCheckKindNm = '';
      safCheckKindNm = this.comboCheckKindItems[this.$_.findIndex(this.comboCheckKindItems, ['safCheckKindNo', this.checkResult.safCheckKindNo])].safCheckKindNm;
      var gridData = [];
      gridData.push({ 'checkSchYmd': startDate, 'checkTitle': safCheckKindNm + '(' + startDate + ')' });
      startDate = this.$comm.getCalculatedDate(startDate, gapOfDate, 'YYYY-MM-DD', 'YYYY-MM-DD');
      
      do {
        gridData.push({ 'checkSchYmd': startDate, 'checkTitle': safCheckKindNm + '(' + startDate + ')' });
        startDate = this.$comm.getCalculatedDate(startDate, gapOfDate, 'YYYY-MM-DD', 'YYYY-MM-DD');
      }
      while (this.$comm.getDatediff(this.$comm.moment(startDate), this.$comm.moment(endDate)) >= 0);
      
      this.gridOptions.data = this.$_.clone(gridData);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>
