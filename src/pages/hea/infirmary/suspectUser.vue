<!--
  목적 : 건강관리실 - 유소견자 건강상담
  작성자 : kckim
  Detail :
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 관리대상 유소견자 목록 -->
    <b-row>
      <b-col sm="12">
        <div class="float-right">
          <y-btn
            v-if="editable"
            :action-url="popupUrl"
            :param="consult"
            :is-submit="isSubmit1"
            type="save"
            title="관리대상 지정 및 해제"
            size="small"
            color="primary"
            action-type="POST"
            beforeSubmit = "beforeSubmit"
            @beforeSubmit="beforeSubmit"
            @btnClicked="btnSaveClickedCallback" 
            @btnClickedErrorCallback="btnClickedErrorCallback"
          />
        </div>
        <b-col sm="12" class="px-0 mt-3">
          <y-data-table
            title="관리대상 유소견자 목록"
            label="관리대상 유소견자 목록"
            ref="dataTable"
            :headers="suspectUserGridHeaderOptions"
            :items="suspectUserGridData"
            :editable="editable"
            :rows="5"
            :excel-down="true"
            :print="true">
          </y-data-table>
        </b-col>
        <!-- 건강상담 목록 -->
          <!-- <div class="float-right">
            <y-btn
              v-if="editable"
              :action-url="deleteUrl"
              :param="consult"
              :is-submit="isSubmit1"
              type="delete"
              title="삭제"
              size="small"
              color="danger"
              icon="el-icon-delete"
              action-type="DELETE"
            />
          </div> -->
        <b-col sm="12" class="px-0 mt-3">
          <y-data-table
            :isShowBtn="true"
            title="건강상담 목록"
            label="건강상담 목록"
            ref="dataTable"
            :headers="consultGridHeaderOptions"
            :items="consultGridData"
            :editable="editable"
            :rows="5"
            :excel-down="true"
            :print="true">
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>

        <!-- 등록 -->
        <b-row class="mt-3">
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <y-label label="건강상담 상세" icon="user-edit" color-class="cutstom-title-color" />
              </b-col>
            </b-row>
            <b-card>
              <b-row>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-datepicker 
                    :width="baseWidth"
                    :editable="editable"
                    label="상담일"
                    name="date"
                    v-model="consult.visitYmd"
                    default-type="today"
                    v-validate="'required'"
                    data-vv-name="date"
                    :error-msg="errors.first('visitYmd')"
                  >
                  </y-datepicker>
                </b-col>
                <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                  <y-text
                    :width="baseWidth"
                    :editable="editable"
                    ui="bootstrap"
                    label="상담자"
                    name="userId"
                    v-model="consult.userId"
                  >
                  </y-text>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-textarea
                    :width="10"
                    :editable="editable"
                    :maxlength="600"
                    ui="bootstrap"
                    label="과거력"
                    name="diseasePast"
                    v-model="consult.diseasePast"
                  >
                  </y-textarea>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-textarea
                    :width="10"
                    :editable="editable"
                    :maxlength="600"
                    ui="bootstrap"
                    label="현 병력"
                    name="diseaseCurr"
                    v-model="consult.diseaseCurr"
                  >
                  </y-textarea>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-textarea
                    :width="10"
                    :editable="editable"
                    :maxlength="600"
                    ui="bootstrap"
                    label="증상"
                    name="sympton"
                    v-model="consult.sympton"
                  >
                  </y-textarea>
                </b-col>
                <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                  <y-textarea
                    :width="10"
                    :editable="editable"
                    :maxlength="600"
                    ui="bootstrap"
                    label="상담 내용"
                    name="remark"
                    v-model="consult.remark"
                  >
                  </y-textarea>
                </b-col>
              </b-row>
              <div class="float-right mt-3">
                <y-btn
                  v-if="editable"
                  type="clear"
                  title="초기화"
                  size="small"
                  color="info"
                  @btnClicked="btnClearClickedCallback" 
                />
                <y-btn
                  v-if="editable"
                  :action-url="saveUrl"
                  :param="consult"
                  :is-submit="isSubmit1"
                  type="save"
                  title="신규등록"
                  size="small"
                  color="warning"
                  action-type="POST"
                  beforeSubmit = "beforeSubmit"
                  @beforeSubmit="beforeSubmit"
                  @btnClicked="btnSaveClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn
                  v-if="editable"
                  :action-url="saveUrl"
                  :param="consult"
                  :is-submit="isSubmit1"
                  type="save"
                  title="수정"
                  size="small"
                  color="warning"
                  action-type="POST"
                  beforeSubmit = "beforeSubmit"
                  @beforeSubmit="beforeSubmit"
                  @btnClicked="btnSaveClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'suspect-user',
  props: {
  },
  data () {
    return {
      consult: {
        visitYmd: '',
        userId: '',
        diseasePast: '',
        diseaseCurr: '',
        sympton: '',
        remark: '',
      },
      isSubmit1: false,
      isSubmit2: false,
      baseWidth: 8,
      editable: true,
      popupUrl: '',
      deleteUrl: '',
      userDeleteUrl: '',
      saveUrl: '',
      suspectUserGridData: [],
      suspectUserGridHeaderOptions: [],
      consultGridData: [],
      consultGridHeaderOptions: [],
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getSuspectUsers();
    this.getList2();
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
      // 그리드 헤더 설정
      this.suspectUserGridHeaderOptions = [
        { text: '사번', name: 'userId', width: '10%', align: 'center' },
        { text: '성명', name: 'userNm', width: '15%', align: 'center' },
        { text: '관리대상 지정일', name: 'beManagedYmd', width: '15%', align: 'center' },
        { text: '비고', name: 'remark', width: '40%', align: 'left' },
      ];
      this.consultGridHeaderOptions = [
        { text: '상담일', name: 'visitYmd', width: '10%', align: 'center' },
        { text: '과거력', name: 'diseasePast', width: '15%', align: 'left' },
        { text: '현 병력', name: 'diseaseCurr', width: '15%', align: 'left' },
        { text: '증상', name: 'sympton', width: '15%', align: 'left' },
        { text: '상담내용', name: 'remark', width: '15%', align: 'left' },
      ];
    },
    /** /초기화 관련 함수 **/

    getSuspectUsers () {
      this.$http.url = selectConfig.suspectUser.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.suspectUserGridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    getList2 () {
      setTimeout(() => {
        this.consultGridData = [
          { visitYmd: '2017-04-01', diseasePast: '없음', diseaseCurr: '고혈압', sympton: '심장박동 빨라짐', remark: '식후 약 복용' },
        ];
      }, 2000);
    },
    beforeSubmit () {
      this.checkValidation();
    },
    getConfirm () {
    },
    /** validation checking **/
    checkValidation () {
      this.validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        if (!this.isSubmit) window.getApp.emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/

    /** Button Event **/
    btnSaveClickedCallback (_result) {
      this.isSubmit = false;
      window.getApp.emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    btnClearClickedCallback () {
      this.$validator.reset();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnDeleteClickedCallback (_result) {
      window.getApp.$emit('APP_REQUEST_SUCCESS', '삭제 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    /** /Button Event **/
    
  }
};
</script>