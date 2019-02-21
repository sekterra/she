<!--
  목적 : 안전점검결과 등록/상세
  Detail : 안전점검결과 등록/수정 화면
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
            <y-label label="안전점검결과 상세" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn 
                :action-url="editUrl"
                :param="checkResultDetail"
                :is-submit="isEdit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnSaveClickedCallback" 
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
              <y-select
                :width="8"
                :comboItems="comboCheckKindItems"
                itemText="safCheckKindNm"
                itemValue="safCheckKindNo"
                ui="bootstrap"
                name="safCheckKindNo"
                label="점검종류"
                v-model="checkResultDetail.safCheckKindNo"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
              <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                <y-datepicker
                  :width="6"
                  :required="true"
                  label="점검일/예정일"
                  name="checkYmd"
                  v-model="checkResultDetail.checkYmd"
                  v-validate="'required'"
                  :state="validateState('checkYmd')"
                >
                </y-datepicker>
              </b-col>
              <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                <y-label :label="checkResultDetail.checkSchYmd"></y-label>
              </b-col>
            </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="deptCd"
                label="점검주관부서"
                v-model="checkResultDetail.deptCd"
              >
              </y-select>
              <!-- <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-select
                    :width="6"
                    :comboItems="comboDeptItems"
                    itemText="deptNm"
                    itemValue="deptCd"
                    ui="bootstrap"
                    name="deptCd"
                    label="점검주관부서/기관"
                    v-model="checkResultDetail.deptCd"
                  >
                  </y-select>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-select
                    :width="12"
                    :comboItems="comboCheckOrgItems"
                    itemText="checkOrgNm"
                    itemValue="checkOrgCd"
                    ui="bootstrap"
                    name="checkOrgCd"
                    v-model="checkResultDetail.checkOrgCd"
                  >
                  </y-select>
                </b-col>
              </b-row> -->
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboTgtDeptItems"
                :required="true"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="tgtDeptCd"
                label="점검대상부서"
                v-model="checkResultDetail.tgtDeptCd"
                v-validate="'required'"
                :state="validateState('tgtDeptCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-text
              :width="10"
              :maxlength="60"
              :required="true"
              ui="bootstrap"
              label="점검명"
              name="checkTitle"
              v-model="checkResultDetail.checkTitle"
              v-validate="'required'"
              :state="validateState('checkTitle')"
              >
              </y-text>
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
          <component :is="component" v-if="component" :checkResultDetail.sync="checkResultDetail"/>
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
  name: 'y-check-result-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        safCheckRsltNo: 0, // 안전점검결과번호
        tgtDeptCd: '', // 대상부서코드
        deptCd: '', // 주관부서코드
        checkOrgCd: '', // 점검기관코드
        checkYmd: '', // 점검일
        checkSchYmd: '', // 점검예정일
        checkTitle: '', // 점검명
        checkResult: '', // 결과요약
        checkStepCd: '', // 점검진행상태코드
        checkStepNm: '', // 점검진행상태명
        safCheckKindNo: '', // 안전점검종류번호
      },
    },
  },
  data: () => ({
    // TODO : 현재까지 파악된 바로는 tab은 같은 폴더 또는 하위 폴더의 컴포넌트만 접근이 가능한 것으로 파악됨
    //                즉, 반드시 메인페이지 역할을 하는 vue와 동일 폴더나 하위 폴더에 tabItem 역할을 하는 vue 파일을 위치 시킬 것
    tabItems: [
      { title: '결과', url: './checkItemResult' },
      { title: '점검자', url: './checkInspector' },
      { title: '개선사항', url: 'imprActTab' },
      { title: '첨부파일', url: 'fileUploadPage' },
    ],
    component: null,
    tabIndex: 0,
    checkResultDetail: {
      safCheckRsltNo: 0,
      checkYmd: '', // 점검일
      tgtDeptCd: '', // 대상부서코드
      deptCd: '', // 주관부서코드
      checkSchYmd: '',
      safCheckKindNo: '',
      checkTitle: '',
      checkOrgCd: '',
      checkItemResults: [],
      innerTeamData: [],
      outerTeamData: [],
      checkInspectors: [],
    },
    editable: false,
    isInsert: false,
    isEdit: false,
    comboCheckKindItems: [], // 점검종류 
    comboDeptItems: [], // 주관부서
    comboTgtDeptItems: [], // 대상부서
    comboCheckOrgItems: [], // 점검기관
    editUrl: '',
  }),
  watch: {
    'popupParam.safCheckRsltNo': function (newValue, oldValue) {
    },
    'popupParam.tgtDeptCd': function (newValue, oldValue) {
      this.checkResultDetail.tgtDeptCd = this.$_.clone(newValue);
    },
    'popupParam.deptCd': function (newValue, oldValue) {
      this.checkResultDetail.deptCd = this.$_.clone(newValue);
    },
    'popupParam.checkOrgCd': function (newValue, oldValue) {
      this.checkResultDetail.checkOrgCd = this.$_.clone(newValue);
    },
    'popupParam.checkYmd': function (newValue, oldValue) {
      this.checkResultDetail.checkYmd = this.$_.clone(newValue);
    },
    'popupParam.checkSchYmd': function (newValue, oldValue) {
      this.checkResultDetail.checkSchYmd = this.$_.clone(newValue);
    },
    'popupParam.checkTitle': function (newValue, oldValue) {
      this.checkResultDetail.checkTitle = this.$_.clone(newValue);
    },
    'popupParam.checkResult': function (newValue, oldValue) {
    },
    'popupParam.checkStepCd': function (newValue, oldValue) {
    },
    'popupParam.checkStepNm': function (newValue, oldValue) {
    },
    'popupParam.safCheckKindNo': function (newValue, oldValue) {
      this.checkResultDetail.safCheckKindNo = this.$_.clone(newValue);
    },
    'tabIndex': function (newValue, oldValue) {
      this.loadComponent();
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.loadComponent();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.editUrl = transactionConfig.saf.checkResult.edit.url;
      setTimeout(() => {
        this.checkResultDetail = this.$_.clone(this.popupParam);
        // this.checkResultDetail.checkSchYmd = '(점검예정일 : ' + this.checkResultDetail.checkSchYmd + ')';
        this.checkResultDetail.checkSchYmd = this.checkResultDetail.checkSchYmd ? '(' + this.checkResultDetail.checkSchYmd + ')' : '';
      }, 300);
      this.getComboCheckKindItems(); // 점검종류
      this.getComboDeptItems(); // 점검주관부서, 점검수행부서
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;

      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else if (path === 'imprActTab') this.component = () => import('@/pages/saf/imprAct/imprActTab');
      else this.component = () => import(`${path}`);
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
        this.checkResultDetail.safCheckKindNo = this.popupParam.safCheckKindNo;
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
        this.checkResultDetail.deptCd = this.popupParam.deptCd;
        this.comboTgtDeptItems = this.$_.clone(_result.data);
        this.comboTgtDeptItems.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.checkResultDetail.tgtDeptCd = this.popupParam.tgtDeptCd;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          // this.isEdit = window.confirm("수정하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.checkResultDetail.checkInspectors = [];
              this.$_.forEach(this.checkResultDetail.innerTeamData, (item) => {
                this.checkResultDetail.checkInspectors.push(item);
              });
              this.$_.forEach(this.checkResultDetail.outerTeamData, (item) => {
                this.checkResultDetail.checkInspectors.push(item);
              });
              console.log(this.checkResultDetail);
              this.isEdit = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isEdit = false;
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
        this.isEdit = false;
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
    /** button 관련 이벤트 **/
    /**
     * 검진항목  목록 조회
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.isEdit = false;
    },
    /** end button 관련 이벤트 **/
  }
};
</script>