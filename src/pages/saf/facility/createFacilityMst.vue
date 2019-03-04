<!--
  목적 : 설비관리 > 유형별 설비관리 > 신규등록/수정 팝업
  작성자 : kga
  Detail :
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
            <y-label label="유형별 설비 등록" icon="user-edit" color-class="cutstom-title-color"/>
            <div slot="buttonGroup" class="float-right mb-1">  
              <y-btn
                :action-url="insertUrl"
                :param="facilityMst"
                :is-submit="isInsert"
                title="저장"
                color="orange"
                :action-type="actionType"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="this.facilityMst.safFacilityCd !== ''"
                title="삭제"
                color="red"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="btnClosePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :required="true"
                :disabled="disabled"
                :comboItems="comboFacilityTypeItems"
                itemText="safFacilityTypeNm"
                itemValue="safFacilityTypeCd"
                ui="bootstrap"
                name="safFacilityTypeCd"
                label="설비유형"
                v-model="facilityMst.safFacilityTypeCd"
                v-validate="'required'"
                :state="validateState('safFacilityTypeCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :required="true"
                :comboItems="processNoItems"
                itemText="processNm"
                itemValue="processNo"
                ui="bootstrap"
                type="search"
                label="공정"
                name="processNo"
                v-model="facilityMst.processNo"
                v-validate="'required'"
                :state="validateState('processNo')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :required="true"
                :disabled="disabled"
                :maxlength="20"
                ui="bootstrap"
                type="search"
                label="설비코드"
                name="safFacilityCd"
                v-model="facilityMst.safFacilityCd"
                v-validate="'required'"
                :state="validateState('safFacilityCd')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :required="true"
                :maxlength="100"
                ui="bootstrap"
                type="search"
                label="설비명"
                name="facilityNm"
                v-model="facilityMst.facilityNm"
                v-validate="'required'"
                :state="validateState('facilityNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :required="true"
                :maxlength="50"
                ui="bootstrap"
                type="search"
                label="설비관리번호"
                name="facilityMgrNum"
                v-model="facilityMst.facilityMgrNum"
                v-validate="'required'"
                :state="validateState('facilityMgrNum')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :required="true"
                :maxlength="100"
                ui="bootstrap"
                type="search"
                label="설치위치"
                name="installLocate"
                v-model="facilityMst.installLocate"
                v-validate="'required'"
                :state="validateState('installLocate')"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :required="true"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="관리부서"
                name="deptCd"
                v-model="facilityMst.deptCd"
                v-validate="'required'"
                :state="validateState('deptCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :required="true"
                label="설치일자"
                name="installYmd"
                v-model="facilityMst.installYmd"
                v-validate="'required'"
                :state="validateState('installYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                ui="bootstrap"
                type="search"
                label="설치업체"
                name="installConn"
                v-model="facilityMst.installConn"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-text
                    :width="6"
                    ui="bootstrap"
                    type="search"
                    label="용량/단위"
                    name="vol"
                    v-model="facilityMst.vol"
                  >
                  </y-text>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                    :width="12"
                    ui="bootstrap"
                    type="search"
                    name="volUnit"
                    v-model="facilityMst.volUnit"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :clearable="true"
                ui="bootstrap"
                type="search"
                label="안전관리자"
                name="safMgrPsn"
                v-model="facilityMst.safMgrPsn"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-switch
                    :width="6"
                    true-value="Y"
                    false-value="N"
                    ui="bootstrap"
                    label="폐기여부/폐기년도"
                    name="disuseYn"
                    selectText="폐기"
                    unselectText="미폐기"
                    v-model="facilityMst.disuseYn"
                    >
                  </y-switch>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                    v-if="!disabledYy"
                    :width="12"
                    :disabled="disabledYy"
                    ui="bootstrap"
                    type="search"
                    name="disuseYy"
                    v-model="facilityMst.disuseYy"
                  >
                  </y-text>
                  <y-text
                    v-if="disabledYy"
                    :width="12"
                    :disabled="true"
                    ui="bootstrap"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="baseWidth"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="법정점검 대상여부"
                name="lawChkYn"
                selectText="관련"
                unselectText="미관련"
                v-model="facilityMst.lawChkYn"
                >
              </y-switch>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="baseWidth"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="자체점검 대상여부"
                name="selfChkYn"
                selectText="관련"
                unselectText="미관련"
                v-model="facilityMst.selfChkYn"
                >
              </y-switch>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                v-if="!disabledLaw"
                :width="8"
                :comboItems="lawChkCyeItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="법정점검 주기"
                name="lawChkCyeCd"
                v-model="facilityMst.lawChkCyeCd"
              >
              </y-select>
              <y-text
                v-if="disabledLaw"
                :width="8"
                :disabled="true"
                ui="bootstrap"
                label="법정점검 주기"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                v-if="!disabledSelf"
                :width="8"
                :disabled="disabledSelf"
                :comboItems="selfChkCyeItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="자체점검 주기"
                name="selfChkCyeCd"
                v-model="facilityMst.selfChkCyeCd"
              >
              </y-select>
              <y-text
                v-if="disabledSelf"
                :width="8"
                :disabled="true"
                ui="bootstrap"
                label="자체점검 주기"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="facilityMst.remark"
              >
              </y-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 탭 -->
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
          <component :is="component" v-if="component" :facilityMst.sync="facilityMst" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <b-row>
      <b-col sm="12">
        <div class="float-right mt-3">
          <y-btn
            title="저장"
            color="orange"
            @btnClicked="beforeInsert" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn 
            v-if="this.facilityMst.safFacilityCd !== ''"
            title="삭제"
            color="red"
            @btnClicked="btnDeleteClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
          <y-btn
            title="닫기"
            @btnClicked="btnClosePopup" 
          />
        </div>
      </b-col>
    </b-row>

    <!-- 팝업 설정 -->
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  name: 'create-facility-mst',
  props: {
    popupParam: {
      type: Object,
      default: {
        safFacilityCd: '',
      },
    },
  },
  data () {
    return {
      tabItems: [
        { title: '설비항목', url: './facilityTypeItem' },
        { title: '첨부파일', url: 'fileUploadPage' },
      ],
      component: null,
      tabIndex: 0,
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      facilityMst: {
        safFacilityTypeCd: null,
        processNo: null,
        deptCd: null,
        safFacilityCd: '',
        facilityNm: '',
        facilityMgrNum: '',
        installLocate: '',
        installYmd: '',
        installConn: '',
        vol: '',
        volUnit: '',
        safMgrPsn: '',
        disuseYn: '',
        disuseYy: '',
        lawChkYn: '',
        selfChkYn: '',
        lawChkCyeCd: '',
        selfChkCyeCd: '',
        remark: '',
        facilityTypeItemVals: [],
      },
      baseWidth: 8,
      actionType: 'POST',
      disabled: false,
      disabledYy: true,
      disabledLaw: true,
      disabledSelf: true,
      comboFacilityTypeItems: [], // 설비유형 
      processNoItems: [], // 공정
      comboDeptItems: [], // 관리부서
      lawChkCyeItems: [],  // 법정점검 주기
      selfChkCyeItems: [],  // 자체점검 주기
      insertUrl: '',
      isInsert: false,
    };
  },
  watch: {
    tabIndex () {
      this.loadComponent();
    },
    'facilityMst.disuseYn': {
      handler: function (val, oldVal) {
        if (val === 'Y') {
          this.disabledYy = false;
        } else {
          this.disabledYy = true;
        }
      },
    },
    'facilityMst.lawChkYn': {
      handler: function (val, oldVal) {
        if (val === 'Y') {
          this.disabledLaw = false;
        } else {
          this.disabledLaw = true;
        }
      },
    },
    'facilityMst.selfChkYn': {
      handler: function (val, oldVal) {
        if (val === 'Y') {
          this.disabledSelf = false;
        } else {
          this.disabledSelf = true;
        }
      },
    },
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  mounted () {
    this.loadComponent();
  },
  beforeDestroy () {
  },
  methods: {
    init () {
      // URL 셋팅
      this.insertUrl = transactionConfig.saf.facilityMst.insert.url;

      this.getFacilityTypeItems(); // 설비유형
      this.getProcessNoItems(); // 공정
      this.getDeptItems();  // 관리부서
      this.getLawChkCyeItems(); // 법정점검 주기
      this.getSelfChkCyeItems(); // 자체점검 주기
      this.getFacilityMst();  // 유형별 설비 상세

      setTimeout(() => {
      }, 200);

      // 저장 버튼 Mode
      this.facilityMst.safFacilityCd = this.popupParam.safFacilityCd;
      if (this.popupParam.safFacilityCd !== '') {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    // 유형별 설비 상세
    getFacilityMst () {
      if (!this.popupParam.safFacilityCd) return;
      this.$http.url = this.$format(selectConfig.saf.facilityMst.get.url, this.popupParam.safFacilityCd);
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.facilityMst = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 설비유형
    getFacilityTypeItems () {
      this.$http.url = selectConfig.saf.refInfoFacilityType.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'safFacilityTypeCd': null, 'safFacilityTypeNm': '선택하세요' });
        this.comboFacilityTypeItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 공정
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': null, 'processNm': '선택하세요' });
        this.processNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 부서
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': null, 'deptNm': '선택하세요' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    // 법정점검 주기
    getLawChkCyeItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_LAW_CHK_CYE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.lawChkCyeItems = this.$_.clone(_result.data);
        this.lawChkCyeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
      }, (_error) => {
      });
    },
    // 자체점검 주기
    getSelfChkCyeItems () {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_SELF_CHK_CYE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.selfChkCyeItems = this.$_.clone(_result.data);
        this.selfChkCyeItems.splice(0, 0, { 'code': '', 'codeNm': '선택하세요' });
      }, (_error) => {
      });
    },
    // 탭
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      
      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else this.component = () => import(`${path}`);
    },
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            type: 'info',
            // 확인 callback 함수
            confirmCallback: () => {
              if (this.disabled === true) {
                if (this.disabledYy === true) {
                  this.facilityMst.disuseYy = null;
                }
                if (this.disabledLaw === true) {
                  this.facilityMst.lawChkCyeCd = null;
                }
                if (this.disabledSelf === true) {
                  this.facilityMst.selfChkCyeCd = null;
                }
                this.actionType = 'PUT';
                this.insertUrl = transactionConfig.saf.facilityMst.edit.url;
              } else {
                this.actionType = 'POST';
                this.insertUrl = transactionConfig.saf.facilityMst.insert.url;
              }
              this.isInsert = true;
            },
            cancelCallback: () => {
              this.isInsert = false;
            }
          });
        }
        else {
          window.getApp.$emit('ALERT', {
            title: '안내',
            message: '필수입력값을 입력해주세요.',
            type: 'warning',
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** Button Event **/
    // 팝업 닫기
    btnClosePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    // 사용자 검색
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    }, 
    // 사용자 검색 팝업 닫기
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.facilityMst.safMgrPsn = data.user.userNm;
      }
    },
    // 신규등록
    btnInsertClickedCallback (_result) {
      if (_result.data === 0) {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 존재하는 설비코드입니다.',
          type: 'warning',
        });
      } else {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '저장되었습니다.',
          type: 'success',
        });
        this.btnClosePopup();
      }
      this.isInsert = false;
    },
    // 삭제
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',  
        // 확인 callback 함수
        confirmCallback: () => {
          this.$http.url = this.$format(transactionConfig.saf.facilityMst.delete.url, this.facilityMst.safFacilityCd);
          this.$http.type = 'DELETE';
          this.$http.request((_result) => {
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '삭제되었습니다.',
              type: 'success',
            });
            this.btnClosePopup();
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', _error);
          });
        },
        // 취소 callback 함수
        cancelCallback: () => {
        }
      });
    },
    // 버튼 에러 처리
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
  }
};
</script>