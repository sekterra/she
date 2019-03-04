<!--
  목적 : 교육결과 등록-> 교육결과탭
  Detail : 설비유형 조회 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
    <b-row class="mt-3" ref="editBox">
      <b-col sm="12">
        <b-row>
        </b-row>
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <div slot="buttonGroup" class="float-right mb-1">
                <y-btn 
                  v-if="!disabled"
                  title="추가"
                  color="orange"
                  @btnClicked="btnChemsAdd" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn 
                  v-if="!disabled"
                  title="수정"
                  color="orange"
                  @btnClicked="btnPartnersUpdate" 
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
                :height="gridOptions.height"
                :headers="gridOptions.header"
                :items="gridOptions.data"
                :excel-down="true"
                :print="true"
                v-model="selectedPartnersValue"
                label="구성성분 목록"
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
    </b-row>  
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from "@/js/selectConfig";
import transactionConfig from "@/js/transactionConfig";
export default {
  /* attributes: name, components, props, data */
  name: "y-chemprod",
  props: {
    selectedChemProdNo: 0
  },
  data: () => ({
    searchParam: {
      chemProdNo: 0,
    },
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      width: '500px',
      top: '50px',
      param: {},
      closeCallback: null
    },
    chemprodChem: {
      chemProdNo: 0, // 취급물질id
      chemNo: "", // 화학물질no
      chemContent: "", // 구성성분_함유량
      createUserId: "", 
      createDt: "",
      updateUserId: "",
      updateDt: "",
      chemProdNmKr: "",
      chemProdNmEn: "",
      casNo: "",
    },
    
    searchArea: {
      title: "검색박스숨기기",
      show: true
    },
    gridOptions: {
      header: [],
      data: [],
      height: "300"
    },
    baseWidth: 8,
    editable: false,
    isInsert: false,
    isEdit: false,
    radioItems: null,
    editUrl: "",
    insertUrl: "",
    searchUrl: "",
    searchUserUrl: "",
  }),
  watch: {
    'selectedChemProdNo': function (newValue, oldValue) {
      this.getList();
    },

  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {},
  created () {},
  update () {},
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
    // 윈도우 resize event
    window.addEventListener("resize", this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener("resize", this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      // url 셋팅
      this.searchUserUrl = selectConfig.manage.user.list.url;
      // 선택된 부서의 유저 목록 그리드 헤더 설정 왼쪽
      this.gridOptions.header = [
        { text: 'CAS NO.', name: 'casNo', width: '100px', align: 'center' },
        { text: '화학물징멸(KOR)', name: 'chemNmKr', width: '100px', align: 'left' },
        { text: '화학물징멸(ENG)', name: 'chemNmEn', width: '100px', align: 'left' },
        { text: '함유량', name: 'chemContent', width: '200px', type: 'text' },
      ];
      this.searchUrl = selectConfig.baseInfo.chemprod.chemlist.url;
      this.setGridSize(); // 그리드 사이즈 조절
    },
    // 조회
    getList () {
      this.$http.url = this.$format(this.searchUrl, this.selectedChemProdNo);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /**
     * 수정전 유효성 검사
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
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
   
    /**
   * 그리드 리사이징
   */
    setGridSize () {
      var defaultHeight = 250;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = (window.innerHeight - this.$refs.editBox.clientHeight - 250) <= 250 ? defaultHeight : (window.innerHeight - this.$refs.editBox.clientHeight - 250);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },

    
    /** button 관련 이벤트 **/
    /**
    * 구성성분 추가
    */
    btnChemsAdd () {
      this.popupOptions.target = () => import(`${'./chemSearch.vue'}`);
      this.popupOptions.title = '구성성분 선택';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchChem;

    },
    closePopupSearchChem (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      
      // if (data.user) this.wkodMaster.pubMgrNm = data.user.userNm;
    },
    // 구성성분 수정
    btnChemsUpdate () {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`); // 이유는 모르겠으나 이거를 하지 않으면 추가가 이루어지지않음.. 
      if (this.gridOptions.data.length === 0) this.gridOptions.data = [];
      this.gridOptions.data.splice(0, 0, {
        "chemProdNo": "", // 취급물질id
        "chemNo": "", // 화학물질no
        "chemContent": "", // 구성성분_함유량
        "casNo": "",
        "createUserId": "", 
        "createDt": "",
        "updateUserId": "",
        "updateDt": "",
        "chemProdNmKr": "",
        "chemProdNmEn": "",
      });
    },
    /**
     * 구성성분 행 삭제
     */
    btnChemsDelete () {
      this.$_.forEach(this.selectedOurCompanyValue, (item) => {
        this.gridOptions.data.splice(this.$_.indexOf(this.$_.map(this.gridOptions.data, 'userId'), item.userId), 1);
      });
    },

    /** end button 관련 이벤트 **/
  }
};
</script>