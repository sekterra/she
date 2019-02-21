<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="">
    <b-container fluid>
      <!-- 검색 -->
      <b-row ref="searchBox">
        <b-col sm="12">
          <b-card header-class="default-card" body-class="default-body-card" class="py-0">
            <div slot="header" >
              <!-- <div class="float-left"> -->
                <y-label label="검색" />
              <!-- </div> -->
              <div class="float-right">
                <y-btn
                  :action-url="searchUrl"
                  :param="searchParam"
                  title="검색"
                  color="green"
                  action-type="get"
                  @btnClicked="btnSearchClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
            </div>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  ui="bootstrap"
                  label="키워드"
                  name="keyword"
                  placeholder="권한그룹 코드/이름 검색"
                  v-model="searchParam.keyword"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-switch
                  :width="9"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="사용여부"
                  name="radioValue"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="searchParam.useYn"
                />
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
                :headers="gridOptions.header"
                :height="gridOptions.height"
                :items="gridOptions.data"
                :excel-down="true"
                :print="true"
                :rows="5"
                :cellClick="true"
                label="권한그룹 목록"
                ref="dataTable"
                @selectedRow="selectedRow"
              />
            </b-col>
        </b-col>
      </b-row>

      <b-row class="mt-3" ref="detailBox">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="권한그룹 관리" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-card>
        <b-row>
          <!-- 권한 정보 영역 -->
          <b-col sm="12">
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <b-row>
                  <b-col sm="4">
                    <y-label label="권한그룹 ID"></y-label>
                  </b-col>
                  <b-col sm="8">
                    {{authGrp.authGrpNo}}
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="7"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="30"
                  label="권한그룹명*"
                  name="authGrpNm"
                  v-model="authGrp.authGrpNm"
                  v-validate="'required'"
                  :state="validateState('authGrpNm')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-switch
                  :width="8"
                  :editable="editable"
                  :required="true"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="사용여부"
                  name="useYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="authGrp.useYn"
                  v-validate="'required'"
                  :state="validateState('useYn')"
                  >
                </y-switch>
              </b-col>
              <!-- <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              </b-col> -->
              <b-col sm="9">
                <y-textarea
                  :width="11"
                  :editable="editable"
                  :maxlength="3000"
                  ui="bootstrap"
                  label="비고"
                  name="remarks"
                  v-model="authGrp.remarks"
                >
                </y-textarea>
              </b-col>
            </b-row>
          </b-col>
          <!-- /권한 정보 영역 -->
        </b-row>
        <b-row>
          <b-col sm="12">
            <div class="float-right mt-3" >
                    <y-btn
                      title="초기화"
                      @btnClicked="btnClearClickedCallback" 
                    />
                    <y-btn 
                      :action-url="insertUrl"
                      :param="authGrp"
                      :is-submit="isInsert"
                      title="신규등록"
                      color="orange"
                      action-type="POST"
                      beforeSubmit="beforeInsert"
                      @beforeInsert="beforeInsert"
                      @btnClicked="btnInsertClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    />
                    <y-btn 
                      v-if="editable"
                      :action-url="editUrl"
                      :param="authGrp"
                      :is-submit="isEdit"
                      title="수정"
                      color="orange"
                      action-type="PUT"
                      beforeSubmit = "beforeEdit"
                      @beforeEdit="beforeEdit"
                      @btnClicked="btnEditClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    />
                  </div>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig'

export default {
  /** attributes: name, components, props, data **/
  name: 'auth-manage', 
  components: {
  },
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      authGrp: {
        authGrpNo: null,
        authGrpNm: null,
        remarks: null,
        useYn: 'Y',
        createUserId: null,
        updateUserId: null,
      },
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      searchUrl: '',
      searchParam: {
        keyword: '',
        useYn: 'Y'
      },
      isInsert: false,
      insertUrl: '',
      isEdit: false,
      editUrl: '',
      editable: true,
      upMenuLvl: null,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.insertUrl = transactionConfig.authGrp.insert.url;
      this.searchUrl = selectConfig.authGrp.list.url;
      this.setGridSize();
      this.getAuthGrps();

      this.gridOptions.header = [
        { text: '권한그룹번호', name: 'authGrpNo', width: '80', align: 'right' },
        { text: '권한그룹명', name: 'authGrpNm', width: '150' },
        { text: '사용여부', name: 'useYn', width: '80', align: 'center' },
        { text: '비고', name: 'remarks', width: '300' },
      ]
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.height = window.innerHeight - this.$refs.searchBox.clientHeight - 250;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    getAuthGrps () {
      this.$http.url = this.searchUrl;
      this.$http.param = this.searchParam;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      });
    },
    /** /초기화 관련 함수 **/
    
    /**
     *  Call API service
    */
    /**
    * 메뉴 tree 기초 정보 조회
    */
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    checkValidation (_type) {
      this.$validator.validateAll().then((_result) => {
        if (_type === 'insert') this.isInsert = _result;
        else this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!_result) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        if (_type === 'insert') this.isInsert = false;
        else this.isEdit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    /**
     * 등록전 유효성 검사
     */
    beforeInsert () {
      this.authGrp.authGrpNo = null;
      this.checkValidation('insert');
    },
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.authGrp, this.$options.data().authGrp);
      this.$validator.reset();
    },
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnInsertClickedCallback (_result) {
      this.isInsert = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      this.authGrp.authGrpNo = _result.data
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장되었습니다.");
      this.getAuthGrps();
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      // window.alert('error:' + JSON.stringify(_result));
      // window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    btnSearchClickedCallback () {
      this.getAuthGrps();
    },
    btnEditClickedCallback () {
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장되었습니다.");
      this.getAuthGrps();
    },
    beforeEdit () {
      if (!this.authGrp.authGrpNo) {
        window.getApp.$emit('APP_VALID_ERROR', '수정할 권한을 먼저 선택해주세요.');
        return;
      }
      this.editUrl = this.$format(transactionConfig.authGrp.edit.url, this.authGrp.authGrpNo);
      this.checkValidation('edit');
      this.isEdit = this.isEdit && this.authGrp.authGrpNo ? true : false;
    },
    /** /Button Event **/
    
    /** 기타 function **/
    /**
     * 메뉴 트리용 기초 정보를 Tree 메뉴로 변환
     */
    selectedRow (_row) {
      this.authGrp = _row;
    }
    /** /기타 function **/
  }
};
</script>