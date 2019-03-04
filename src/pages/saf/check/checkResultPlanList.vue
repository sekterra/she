<!--
  목적 : 안전점검 관리 - 안전점검계획 목록
  Detail : 안전점검계획 목록 화면으로 이미 등록된 계획을 조회하여 삭제하거나,  등록창을 띄워 신규 계획을  등록할 수 있음.
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- <div class="testdiv">
      <img src="./yullin_logo.png" class="test">
    </div>
    <div class="testtwodiv"></div> -->
    <!-- 검색 -->
    <b-row ref="searchBox">
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
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="기간"
                name="period"
                v-model="searchParam.period"
              >
              </y-datepicker>
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
                    label="주관/대상부서"
                    v-model="searchParam.deptCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-select
                    :width="12"
                    :comboItems="comboTgtDeptItems"
                    itemText="deptNm"
                    itemValue="deptCd"
                    ui="bootstrap"
                    name="tgtDeptCd"
                    v-model="searchParam.tgtDeptCd"
                  >
                  </y-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboCheckKindItems"
                itemText="safCheckKindNm"
                itemValue="safCheckKindNo"
                ui="bootstrap"
                name="safCheckKindNo"
                label="점검종류"
                v-model="searchParam.safCheckKindNo"
              >
              </y-select>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              title="신규등록"
              color="orange"
              @btnClicked="btnSearchCheckResultOpenPopupClicked" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <!-- <y-btn 
              color="red"
              title="삭제"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            /> -->
          </div>
          <y-data-table 
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :excel-down="true"
            :print="true"
            :use-paging="true"
            @tableLinkClicked="tableLinkCheckTitleClicked"
            label="안전점검계획 목록"
            >
            <!-- v-model="checkResultValue" -->
              <!-- <el-table-column
                type="selection"
                slot="selection"
                align="center"
                width="55">
              </el-table-column>  -->
          </y-data-table>
        </b-col>
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
  name: 'y-check-result',
  props: {
  },
  data: () => ({
    searchParam: {
      period: [],
      startDate: '',
      endDate: '',
      tgtDeptCd: '', // 대상부서코드
      deptCd: '', // 주관부서코드
      safCheckKindNo: '', // 점검종류번호
      checkStepCd: 'CHS01', // 점검진행상태
    },
    searchArea: {
      title: '검색박스숨기기',
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: '300'
    },
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      param: null,
      width: '90%',
      top: '10px',
      closeCallback: null
    },
    // checkResultValue: [],
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    comboCheckKindItems: [], // 점검종류 
    comboDeptItems: [], // 주관부서
    comboTgtDeptItems: [], // 대상부서
    searchUrl: '',
  }),
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
      // Url Setting
      this.searchUrl = selectConfig.saf.checkResult.list.url;      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '진행단계', name: 'checkStepNm', width: '110px', align: 'center' },
        { text: '점검종류', name: 'safCheckKindNm', width: '130px', align: 'center' },
        { text: '점검예정일', name: 'checkSchYmd', width: '150px', align: 'center' },
        { text: '점검명', name: 'checkTitle', width: '250px', type: 'link' },
        { text: '주관부서', name: 'deptNm', width: '130px', },
        { text: '대상부서', name: 'tgtDeptNm', width: '130px', },
        { text: '등록자', name: 'createUserNm', width: '130px', },
        { text: '등록일', name: 'createDt', width: '150px', align: 'center' }
      ];
      this.getComboCheckKindItems(); // 점검종류
      this.getComboDeptItems(); // 점검주관부서, 점검수행부서
      // 기간 Setting
      var today = this.$comm.getToday();
      var from = this.$comm.getCalculatedDate(today, '-1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      var to = this.$comm.getCalculatedDate(today, '1m', 'YYYY-MM-DD', 'YYYY-MM-DD');
      setTimeout(() => {
        this.searchParam.period = [from, to];
        this.getList(); // 안전점검결과 목록 조회
      }, 300);
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 점검종류 조회
     */
    getComboCheckKindItems () {
      this.$http.url = selectConfig.saf.checkKind.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'planUseYn': 'Y',
        'facilityUseYn': 'N',
        'useYn': 'Y',
      };
      this.$http.request((_result) => {
        this.comboCheckKindItems = this.$_.clone(_result.data);
        this.comboCheckKindItems.splice(0, 0, { 'safCheckKindNo': '', 'safCheckKindNm': '전체' });
        this.searchParam.safCheckKindNo = '';
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
        this.comboDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.searchParam.deptCd = '';
        this.comboTgtDeptItems = this.$_.clone(_result.data);
        this.comboTgtDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.searchParam.tempTgtDeptCd = '';
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 안전점검결과 목록 조회 **/
    getList () {
      this.searchParam.startDate = this.$_.clone(this.searchParam.period[0]);
      this.searchParam.endDate = this.$_.clone(this.searchParam.period[1]);
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
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
      this.getList();
    },
    /**
     * showCheckResultPopup 호출
     * 월별 안전점검결과 목록에 점검명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkCheckTitleClicked (header, data) {
      this.popupOptions.target = () => import(`${'./checkResultPlan.vue'}`);
      this.popupOptions.title = '안전점검계획';
      this.popupOptions.param = {
        safCheckRsltNo: data.safCheckRsltNo, // 안전점검결과번호
        safCheckKindNo: data.safCheckKindNo, // 안전점검종류번호
        deptCd: data.deptCd, // 주관부서코드

        createUserNm: data.createUserNm, // 등록자
        createDt: data.createDt, // 등록일
        safCheckPerd: data.safCheckPerd, // 점검주기
        period: [data.safCheckPlanSymd, data.safCheckPlanEymd], // 점검기간
        safCheckPlanNo: data.safCheckPlanNo, // 점검계획번호
      };
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        var calculatedHeight = window.innerHeight - this.$refs.searchBox.clientHeight - 310;
        this.gridOptions.height = calculatedHeight <= 250 ? defaultHeight : calculatedHeight;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
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
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    btnSearchClickedCallback () {
      this.getList();
    },
    // /**
    //  * 안전점검계획 삭제
    //  *  삭제 버튼 callback
    //  * _result : backend에서 return하는 데이터
    //  */
    // btnDeleteClickedCallback (_result) {
    //   if (!(this.checkResultValue && this.checkResultValue.length > 0))
    //   {
    //     window.getApp.$emit('ALERT', {
    //       title: '안내',
    //       message: '삭제할 계획을 하나 이상선택하세요.',
    //       type: 'warning',  // success / info / warning / error
    //     });
    //     return;
    //   }
    //   window.getApp.$emit('CONFIRM', {
    //     title: '확인',
    //     message: '삭제하시겠습니까?',
    //     // TODO : 필요시 추가하세요.
    //     type: 'info',  // success / info / warning / error
    //     // 확인 callback 함수
    //     confirmCallback: () => {
    //       this.$http.url = transactionConfig.saf.checkResult.deletes.url;
    //       this.$http.type = 'DELETE';
    //       this.$http.param = {
    //         'data': Object.values(this.$_.clone(this.checkResultValue))
    //       };
    //       this.$http.request((_result) => {
    //         window.getApp.$emit('ALERT', {
    //           title: '안내',
    //           message: '삭제되었습니다.',
    //           type: 'success',  // success / info / warning / error
    //         });
    //         this.getList();
    //       }, (_error) => {
    //         window.getApp.$emit('APP_REQUEST_ERROR', _error);
    //       });
    //     },
    //     // 취소 callback 함수
    //     cancelCallback: () => {
    //     }
    //   });
    // },
    btnSearchCheckResultOpenPopupClicked () {
      this.popupOptions.target = () => import(`${'./checkResultPlan.vue'}`);
      this.popupOptions.title = '안전점검계획 등록';
      this.popupOptions.param = {
        safCheckRsltNo: 0, // 안전점검결과번호
        safCheckKindNo: null, // 안전점검종류번호
        deptCd: null, // 주관부서코드

        createUserNm: '', // 등록자
        createDt: '', // 등록일
        safCheckPerd: '', // 점검주기
        period: [], // 점검기간
        safCheckPlanNo: 0, // 점검계획번호
      };
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    /** end button 관련 이벤트 **/
  }
};
</script>
<style>
/* .testdiv {
  width:30px;
  overflow:hidden;
}
.test {
  max-height:100%;
  width:auto;
}
.testtwodiv {
  width:30px;
  height:30px;
  background: url('./yullin.png');
  background-repeat: no-repeat;
  background-position: center center;
}
.testtwodiv:hover {
  background: url('./left_btn.png');
  background-repeat: no-repeat;
  background-position: center center;
} */
</style>
