<!--
  목적 : 조치요청
  Detail : 개선사항 조치 요청 화면
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
            <y-label label="조치요청 상세 정보" icon="user-edit" color-class="cutstom-title-color" />
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
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                <b-col sm="2">
                    <y-label 
                        label="진행 단계" 
                    />
                </b-col>
                <b-col>
                  <b><font color="blue">요청등록</font>&nbsp;&nbsp;▷&nbsp;&nbsp;미접수&nbsp;&nbsp;▷&nbsp;&nbsp;조치부서 조치&nbsp;&nbsp;▷&nbsp;&nbsp;
                    요청부서 조치확인&nbsp;&nbsp;▷&nbsp;&nbsp;개선완료</b>
                </b-col>
              </b-row>
            </b-col>
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
                        name="imprRqstUserInfo"
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
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                :required="true"
                label="조치부서"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                name="actDeptCd"
                v-model="imprAct.actDeptCd"
                v-validate="'required'"
                :state="validateState('actDeptCd')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-datepicker
                :width="9"
                :required="true"
                label="조치기한"
                type="today"
                name="actLimitYmd"
                v-model="imprAct.actLimitYmd"
                v-validate="'required'"
                :state="validateState('actLimitYmd')"
              >
              </y-datepicker>
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
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'action-request',
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
        actDeptCd: null,
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
      comboDeptItems: [],
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

      this.getDeptItems();
      this.getComboItems('SAF_IMPR_CLASS'); // 개선분류코드
      
      setTimeout(() => {
        this.getList();
      }, 100);
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
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': null, 'deptNm': '선택하세요' });
        this.comboDeptItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': null, 'codeNm': '선택' });
        this.comboImprClassItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    setDetailData () {
      this.imprAct.imprRqstUserId = 'admin';
      this.imprAct.imprRqstUserNm = '관리자';
      this.imprAct.imprRqstDeptCd = 'yullin';
      this.imprAct.imprRqstDeptNm = '열린기술';

      this.imprAct.imprRqstYmd = this.$comm.getToday();
      this.imprAct.actClassCd = 'ACL02';
      this.imprAct.imprStepCd = 'IMST1';
      this.imprAct.refTableId = this.popupParam.refTableId;
      this.imprRqstUserInfo = this.imprAct.imprRqstDeptNm + " " + this.imprAct.imprRqstUserNm;
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
