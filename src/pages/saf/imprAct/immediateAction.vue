<!--
  목적 : 즉시조치
  Detail : 개선사항 즉시조치 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="즉시조치 상세 정보" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="insertCheck"
                :action-url="insertUrl"
                :param="imprAct"
                :is-submit="isInsert"
                title="저장"
                color="orange"
                action-type="POST"
                beforeSubmit = "beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="!insertCheck"
                :action-url="editUrl"
                :param="imprAct"
                :is-submit="isEdit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                v-if="!insertCheck"
                :action-url="deleteUrl"
                :param="deleteValue"
                :is-submit="isDelete"
                title="삭제"
                color="red"
                action-type="DELETE"
                beforeSubmit = "beforeDelete"
                @beforeDelete="beforeDelete"
                @btnClicked="btnDeleteClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn
                title="닫기"
                @btnClicked="closePopup('CLOSE')" 
              />
          </div>
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-select
                :width="8"
                :disabled="true"
                :comboItems="comboImprClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="업무구분"
                name="imprClassCd"
                v-model="imprAct.imprClassCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                    <b-col sm="3">
                        <y-label 
                            label="작성일/작성자" 
                        />
                    </b-col>
                    <b-col sm="4">
                      <y-text
                        :width="12"
                        :disabled="true"
                        ui="bootstrap"
                        name="imprRqstYmd"
                        v-model="imprAct.imprRqstYmd"
                      >
                      </y-text>
                    </b-col>
                    <b-col sm="5">
                      <y-text
                        :width="12"
                        :disabled="true"
                        ui="bootstrap"
                        name="imprRqstUserNm"
                        v-model="imprRqstUserInfo"
                      >
                      </y-text>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-text
                :width="10"
                :maxlength="50"
                :required="true"
                ui="bootstrap"
                label="제목"
                name="imprTitle"
                v-model="imprAct.imprTitle"
                v-validate="'required'"
                :state="validateState('imprTitle')"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="10"
                :maxlength="150"
                :required="true"
                label="조치 요청내용"
                ui="bootstrap"
                name="imprRqstContents"
                v-model="imprAct.imprRqstContents"
                v-validate="'required'"
                :state="validateState('imprRqstContents')"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                <b-col sm="4">
                  <y-label 
                    label="조치부서/담당자" 
                  />
                </b-col>
                <b-col sm="4">
                  <y-text
                    :width="12"
                    :clearable="true"
                    :disabled="true"
                    ui="bootstrap"
                    name="actDeptCd"
                    v-model="imprAct.actDeptCd"
                  />
                </b-col>
                <b-col sm="4">
                  <y-text
                    :width="12"
                    :clearable="true"
                    :disabled="true"
                    ui="bootstrap"
                    name="actUserNm"
                    v-model="imprAct.actUserNm"
                    :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                    @searchUser="btnSearchUserClicked"
                  />
                </b-col>
            </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-datepicker
                :width="9"
                :required="true"
                label="조치일자"
                type="today"
                name="actConfirmYmd"
                v-model="imprAct.actConfirmYmd"
                v-validate="'required'"
                :state="validateState('actConfirmYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="10"
                :maxlength="150"
                :required="true"
                label="조치내용 및 결과"
                ui="bootstrap"
                name="actResultContents"
                v-model="imprAct.actResultContents"
                v-validate="'required'"
                :state="validateState('actResultContents')"
              />
            </b-col>
          </b-row>
        </b-card>
        <b-row class="mt-3">
          <b-col sm="12">
            <y-label label="개선 전/후 사진" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                <b-col sm="5">
                </b-col>
                <b-col sm="3">
                  <y-label 
                    label="개선전 사진" 
                  />
                </b-col>
                <b-col sm="4">
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                <b-col sm="4">
                </b-col>
                <b-col sm="3">
                  <y-label 
                    label="개선후 사진" 
                  />
                </b-col>
                <b-col sm="5">
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">select file</el-button>
              </el-upload>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">select file</el-button>
              </el-upload>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="mt-3">
          <b-col sm="12">
            <y-label label="첨부파일" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="12" class="px-0">
              <y-file-upload
                @fileUploadComplete="fileUploadComplete"
              >
              </y-file-upload>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
              v-if="insertCheck"
              title="저장"
              color="orange"
              action-type="POST"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="!insertCheck"
              title="수정"
              color="orange"
              action-type="PUT"
              beforeSubmit = "beforeEdit"
              @beforeEdit="beforeEdit"
              @btnClicked="btnEditClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="!insertCheck"
              title="삭제"
              color="red"
              action-type="DELETE"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          <y-btn
            title="닫기"
            @btnClicked="closePopup('CLOSE')" 
          />
        </div>
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
  name: 'immediate-action',
  props: {
    popupParam: {
      type: Object,
      default: {
        safImprActNo: 0,
        refTableId: 0,
        imprClassCd: null
      },
    }
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '90%',
        top: '10px',
        param: {},
        closeCallback: null
      },
      imprAct: {
        safImprActNo: '',
        imprClassCd: '',
        actClassCd: '',
        imprRqstYmd: '',
        imprTitle: '',
        imprRqstDeptCd: '',
        imprRqstDeptNm: '',
        imprRqstUserId: '',
        imprRqstUserNm: '',
        imprRqstContents: '',
        imprStepCd: '',
        refTable: '',
        refTableId: '',
        actSchYmd: '',
        actConfirmYmd: '',
        actLimitYmd: '',
        actDeptCd: '',
        actDeptNm: '',
        actUserId: '',
        actUserNm: '',
        actResultContents: '',
        actResultReview: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: ''
      },
      searchUrl: '',
      insertUrl: '',
      editUrl: '',
      deleteUrl: '',
      isInsert: false,
      isEdit: false,
      isDelete: false,
      insertCheck: true,
      imprRqstUserInfo: '',
      immediateBeforeImage: '',
      immediateAfterImage: '',
      comboImprClassItems: [],
      deleteValue: null,
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
  },
  updated () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      this.searchUrl = selectConfig.saf.imprAct.get.url;
      this.insertUrl = transactionConfig.saf.imprAct.insert.url;
      this.editUrl = transactionConfig.saf.imprAct.edit.url;
      this.deleteUrl = transactionConfig.saf.imprAct.delete.url;

      this.imprAct.imprClassCd = this.popupParam.imprClassCd;

      if (this.popupParam.safImprActNo !== 0) this.insertCheck = false;

      this.getComboItems('SAF_IMPR_CLASS'); // 개선분류코드
      this.getList();
    },
    getList () {
      if (this.popupParam.safImprActNo !== 0) {
        this.$http.url = this.$format(this.searchUrl, this.popupParam.safImprActNo);
        this.$http.type = 'GET';
        this.$http.request((_result) => {
          Object.assign(this.imprAct, _result.data);
          this.imprRqstUserInfo = this.imprAct.imprRqstDeptNm + " " + this.imprAct.imprRqstUserNm;
        }, (_error) => {
          this.$emit('APP_REQUEST_ERROR', _error);
        });
      } else {
        this.setDetailData();
      }
    },
    setDetailData () {
      this.imprAct.imprRqstUserId = 'admin';
      this.imprAct.imprRqstUserNm = '관리자';
      this.imprAct.imprRqstDeptCd = 'yullin';
      this.imprAct.imprRqstDeptNm = '열린기술';

      this.imprAct.imprRqstYmd = this.$comm.getToday();
      this.imprAct.actClassCd = 'ACL01';
      this.imprAct.imprStepCd = 'IMST1';
      this.imprAct.refTableId = this.popupParam.refTableId;
      this.imprRqstUserInfo = this.imprAct.imprRqstDeptNm + " " + this.imprAct.imprRqstUserNm;
    },
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '선택' });
        this.comboImprClassItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      
      if (data.user) {
        this.imprAct.actUserId = data.user.userId;
        this.imprAct.actUserNm = data.user.userNm;
        this.imprAct.actDeptCd = data.user.deptCd;
        this.imprAct.actDeptNm = data.user.deptNm;
      }
    },
    fileUploadComplete () {
    },
    closePopup (data) {
      this.$emit('closePopup', data);
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    beforeInsert () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '저장하시겠습니까?',
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationInsert();
        }
      });
    },
    beforeEdit () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '수정하시겠습니까?',
        type: 'info',  // success / info / warning / error
        // 확인 callback 함수
        confirmCallback: () => {
          this.checkValidationEdit();
        }
      });
    },
    beforeDelete () {
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',  
        confirmCallback: () => {
          this.deleteValue = {
            'data': this.imprAct.safImprActNo
          };
          this.isDelete = true;
        }
      });
    },
    checkValidationInsert () {
      this.$validator.validateAll().then((_result) => {
        this.isInsert = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isInsert) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isInsert = false;
      });
    },
    checkValidationEdit () {
      this.$validator.validateAll().then((_result) => {
        this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isEdit) window.getApp.$emit('APP_VALID_ERROR', '필수 입력값을 입력해 주세요.');
      }).catch(() => {
        this.isEdit = false;
      });
    },
    btnInsertClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '저장되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    btnEditClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',  // success / info / warning / error
      });
      this.closePopup();
    },
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
      this.closePopup();
    },
    btnClickedErrorCallback (_result) {
      // this.$emit('APP_REQUEST_ERROR', _result);
    }
  }
};
</script>

<style>

</style>
