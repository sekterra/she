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
            <b-col sm="3" md="3" lg="3" xl="3" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="부서"
                name="deptCd"
                v-model="searchUserParam.deptCd"
              >
              </y-select>
            </b-col>
            <div slot="buttonGroup" sm="1" md="1" lg="1" xl="1" class="float-right mb-1">
                <y-btn
                  :width="8"
                  :action-url="searchUserUrl"
                  :param="searchUserParam"
                  title="검색"
                  color="blue"
                  action-type="GET"
                  @btnClicked="btnSearchClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                  />
              </div>
          </b-row>
          <b-row>
            <b-col sm="5" md="5" lg="5" xl="5" class="col-xxl-5">
              
              <y-data-table 
              :height="gridTestItemLeftOptions.height"
              :headers="gridTestItemLeftOptions.header"
              :items="gridTestItemLeftOptions.data"
              :excel-down="true"
              :print="true"
              :useRownum="false"
              v-model="testItemLeftValue"
              label="사원 목록"
              ref="testItemLeftDataTable"
              >
                <el-table-column
                  type="selection"
                  slot="selection"
                  align="center"
                  width="55">
                </el-table-column> 
              </y-data-table>
            </b-col>
            <!-- 가운데 버튼 영역 -->
            <b-col sm="1" md="1" lg="1" xl="1" class="col-xxl-1 text-center">
              <b-row align-v="center" style="height: 100%;">
                  <b-col>
                    <b-row class="mb-2">
                      <b-col>
                        <b-button 
                          @click.stop="btnMoveClicked" 
                        >
                        <f-icon icon="angle-right" />
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                      <b-button 
                        @click.stop="btnDeleteTestItemClicked" 
                        >
                        <f-icon icon="angle-left" />
                      </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-data-table 
                :height="gridTestItemRightOptions.height"
                :headers="gridTestItemRightOptions.header"
                :items="gridTestItemRightOptions.data"
                :excel-down="true"
                :print="true"
                :useRownum="false"
                v-model="testItemRightValue"
                label="교육 이수자 목록"
                ref="testItemRightDataTable"
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
      safEduRsltNo: "",
      edueResult: {
        safEduRsltNo: '',
        eduCourseCd: '',
        eduTypeCd: '',
        eduNm: '',
        eduSYmd: '',
        eduEYmd: '',
        eduTime: '',
        eduPlace: '',
        eduTeacher: '',
        eduContent: '',
        eduResultSummary: '',
        processStepCd: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',
        userId: '',
        eduCourseNm: '',
        eduTypeNm: '',
        deptNm: '',
        processStepNm: ''
      },
      eduUserId: [],
      eduDeptCd: [],
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
    gridTestItemLeftOptions: {
      header: [],
      data: [],
      height: '300'
    },
    gridTestItemRightOptions: {
      header: [],
      data: [],
      height: '300'
    },
    testItemLeftValue: [],
    testItemRightValue: [],
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

      this.getDeptItems(); // 부서검색
      this.getUserList(); // 부서에 따른 사용자 검색
      
      // 이수자 검색
      if (this.edueResultMaster.safEduRsltNo !== 0) {

        this.getDetailUser();
        
      }

      // 선택된 부서의 유저 목록 그리드 헤더 설정 왼쪽
      this.gridTestItemLeftOptions.header = [
        { text: '부서명', name: 'deptNm', width: '100px', align: 'left' },
        { text: '사원명', name: 'userNm', width: '100px', align: 'left' },
      ];
      // 선택된 유저 목록 그리드 헤더 설정 오른쪽
      this.gridTestItemRightOptions.header = [
        { text: '부서명', name: 'deptNm', width: '100px', align: 'left' },
        { text: '사원명', name: 'userNm', width: '100px', align: 'left', filter: 'true' },
      ];
      this.setGridSize(); // 그리드 사이즈 조절
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
      this.gridTestItemLeftOptions.data = this.$_.clone(_result.data);
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
    // 사용자 전체 검색
    getUserList () {
      this.$http.url = this.$format(selectConfig.manage.user.list.url, this.searchUserParam.deptCd, this.searchUserParam.userNm);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridTestItemLeftOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 교육번호에 따른 교육 이수자 검색
    getDetailUser () {
      this.$http.url = this.$format(selectConfig.saf.eduResult.getUser.url, this.edueResultMaster.safEduRsltNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridTestItemRightOptions.data = this.$_.clone(_result.data);
        this.setUserList();
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 최종 데이터 master에 전달
    setUserList () {
      var userIdList = [];
      var deptCdList = [];
      this.gridTestItemRightOptions.data.forEach(element => {
        userIdList.push(element.userId);
        deptCdList.push(element.deptCd);
      });
      this.edueResultMaster.eduUserId = userIdList;
      this.edueResultMaster.eduDeptCd = deptCdList;
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

    /**
     * 유저 목록에 선택된 정보를 선택된 유저 목록으로 이동
     */
    btnMoveClicked () {
      // 1. 추가된 아이템 중 기존 항목이 있는지 체크
      var filteredDuplicatedArray = this.$comm.removeDuplicatedArrayObject(this.gridTestItemRightOptions.data, this.testItemLeftValue, 'userId'); 
      // 2. 선택된 항목중에서 기존에 선택된 항목을 제외한 항목을 가져와서 기존 항목과 합침
      if (filteredDuplicatedArray.length > 0)
      {
        this.gridTestItemRightOptions.data = this.$_.concat(this.gridTestItemRightOptions.data, filteredDuplicatedArray);
        this.setUserList();
      } 
    },
    /**
     * 선택된 유저 목록에 선택된 정보를 삭제(화면상으로)
     */
    btnDeleteTestItemClicked (_result) {
      this.$_.forEach(this.testItemRightValue, (item) => {
        this.gridTestItemRightOptions.data = this.$_.clone(this.$_.reject(this.gridTestItemRightOptions.data, item));
      });
      this.setUserList();
    },
    /**
     * 사용자의 입력을 받는다.
     */
    /** button 관련 이벤트 **/
    

    /** end button 관련 이벤트 **/
  }
};
</script>