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
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <b-row v-if="searchArea.show">
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                <y-text
                  :width="10"
                  ui="bootstrap"
                  label="결과요약"
                  name="safFacilityTypeItemNm"
                  v-model="edueResultMaster.eduResultSummary"
                ></y-text>
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
                    label="교육 이수자 부서 검색"
                    name="deptCd"
                    v-model="searchUserParam.deptCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <div slot="buttonGroup" class="float-right mb-1">
                    <y-btn
                      :width="24"
                      :action-url="searchUserUrl"
                      :param="searchUserParam"
                      title="검색"
                      color="green"
                      action-type="GET"
                      @btnClicked="btnSearchClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                  />
                </div>
                </b-col>
              </b-row>
            </b-col>
              <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                <y-shuttlebox
                  :width="10"
                  :items="eduRsltPsnList"
                  :needDefaultView="true"
                  itemText="userNm"
                  itemValue="userId"
                  ui="bootstrap"
                  label="교육 이수자"
                  name="eduUserId"
                  v-model="edueResultMaster.eduUserId"
                  >
                </y-shuttlebox>
              </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

 

  </b-container>
</template>

<script>
import selectConfig from "@/js/selectConfig";
import transactionConfig from "@/js/transactionConfig";
export default {
  /* attributes: name, components, props, data */
  name: "y-checkKind",
  props: {
    edueResultMaster: {
      safEduRsltNo: '',
      edueResult: '',
      eduResultSummary: '',
      eduUserId: [],
    }
  },
  data: () => ({
    searchParam: {
      safEduRsltNo: '',
    },
    searchUserParam: {
      userNm: "",
      deptCd: ""
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
    eduRsltPsnList: [],
    comboFacilityType: [],
    comboDeptItems: [],
    baseWidth: 9,
    editable: false,
    isInsert: false,
    isEdit: false,
    radioItems: null,
    editUrl: "",
    insertUrl: "",
    searchUrl: "",
    searchUserUrl: "",
  }),
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

      this.getDeptItems();
      this.getUserList();

      if (this.edueResultMaster.safEduRsltNo !== 0) {
        this.getDetailUser();
      }
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
    // 검색
    btnSearchClickedCallback (_result) {
      this.eduRsltPsnList = this.$_.clone(_result.data);
    },
    // 주관부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getUserList () {
      this.$http.url = this.$format(selectConfig.manage.user.list.url, this.searchUserParam.deptCd, this.searchUserParam.userNm);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.eduRsltPsnList = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    getDetailUser () {
      this.$http.url = this.$format(selectConfig.saf.eduResult.getUser.url, this.edueResultMaster.safEduRsltNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        // this.edueResult = this.$_.clone(_result.data);
        this.edueResultMaster.eduUserId = this.$_.clone(_result.data.eduUserId);
        this.edueResultMaster.eduResultSummary = this.$_.clone(_result.data.edueResult.eduResultSummary);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });

    },
    /**
     * 사용자의 입력을 받는다.
     */
    /** button 관련 이벤트 **/
    

    /** end button 관련 이벤트 **/
  }
};
</script>