<!--
  목적 : 건강검진 기준정보 - 건강검진기관
  Detail : 건강검진기관 등록/수정화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 결과 테이블 -->
    <b-row>
      <b-col sm="12">
          <b-col sm="12" class="px-0">
            <y-data-table 
              label="건강검진기관"
              ref="dataTable"
              gridType="edit"
              @editItem="ReceivesData"
              :headers="gridHeaderOptions"
              :items="gridData"
              :excel-down="true"
              :print="true"
              :rows="5"
              editable="editable"
              >
            </y-data-table>
          </b-col>

          <!-- 등록 -->
          <b-row class="mt-3">
            <b-col sm="12">
              <b-row>
                <b-col sm="12">
                  <y-label label="질환 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
              <b-card >
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    name="heaCheckupOrgNm"
                    label="건강검진기관명"
                    v-model="healthOrgan.heaCheckupOrgNm"
                    v-validate="'required'"
                    :state="validateState('heaCheckupOrgNm')"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="8"
                      :editable="editable"
                      :maxlength="15"
                      ui="bootstrap"
                      name="businessNo"
                      label="사업자번호"
                      v-model="healthOrgan.businessNo"
                      >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="15"
                    ui="bootstrap"
                    name="telNo"
                    label="담당자 전화번호"
                    v-model="healthOrgan.telNo"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    name="chargerNm"
                    label="건강검진기관 담당자"
                    v-model="healthOrgan.chargerNm"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-text
                      :width="10"
                      :editable="editable"
                      :maxlength="150"
                      ui="bootstrap"
                      name="address"
                      label="주소"
                      v-model="healthOrgan.address"
                      >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :editable="editable"
                    :maxlength="30"
                    ui="bootstrap"
                    name="email"
                    label="eMail"
                    v-model="healthOrgan.email"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-number
                    :width="8"
                    :editable="editable"
                    :maxlength="5"
                    :hasSeperator="false"
                    ui="bootstrap"
                    name="sortOrder"
                    label="출력순서"
                    v-model="healthOrgan.sortOrder"
                    >
                    </y-number>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <!-- <y-radio
                      :width="8"
                      :editable="editable"
                      :comboItems="radioItems"
                      itemText="useName"
                      itemValue="useYn"
                      ui="bootstrap"
                      name="radioValue"
                    label="사용여부"
                      v-model="healthOrgan.useYn"
                    /> -->
                    <y-switch
                      :width="8"
                      :editable="editable"
                      true-value="Y"
                      false-value="N"
                      ui="bootstrap"
                      label="사용여부"
                      name="radioValue"
                      selectText="사용"
                      unselectText="미사용"
                      v-model="healthOrgan.useYn"
                    />
                  </b-col>
                </b-row>
                <div class="float-right mt-3">
                    <y-btn
                      v-if="editable"
                      type="clear"
                      title="초기화"
                      size="small"
                      color="info"
                      icon="el-icon-edit"
                      @btnClicked="btnClearClickedCallback" 
                      />
                    <y-btn
                      v-if="editable"
                      :action-url="insertUrl"
                      :param="healthOrgan"
                      :is-submit="isSubmit"
                      type="save"
                      title="신규등록"
                      size="small"
                      color="warning"
                      icon="el-icon-edit"
                      action-type="POST"
                      beforeSubmit = "beforeInsert"
                      @beforeInsert="beforeInsert"
                      @btnClicked="btnInsertClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    />
                    <y-btn
                      v-if="editable"
                      :action-url="saveUrl"
                      :param="healthOrgan"
                      :is-submit="isSubmit2"
                      type="save"
                      title="수정"
                      size="small"
                      color="warning"
                      icon="el-icon-edit-outline"
                      action-type="PUT"
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
  /* attributes: name, components, props, data */
  name: 'y-checkup-org',
  props: {
  },
  data () {
    return {
      healthOrgan: {
        heaCheckupOrgNo: '',
        heaCheckupOrgNm: '',
        address: '',
        businessNo: '',
        telNo: '',
        chargerNm: '',
        email: '',
        sortOrder: '',
        useYn: '',
      },
      baseWidth: 9,
      editable: true,
      isSubmit: false,
      isSubmit2: false,
      isSubmit3: false,
      gridData: [],
      gridHeaderOptions: [],
      radioItems: null,
      saveUrl: '',
      insertUrl: '',
      deleteUrl: '',
    }
  },
  computed: {
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        this.radioItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 1000);

      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진기관명', name: 'heaCheckupOrgNm', width: '150px' },
        { text: '주소', name: 'address', width: '350px' },
        { text: '사업자번호', name: 'businessNo', width: '150px', align: 'center' },
        { text: '담당자', name: 'chargerNm', width: '120px', align: 'center' },
        { text: '전화번호', name: 'telNo', width: '160px', align: 'center' },
        { text: 'E-mail', name: 'eMail', width: '200px' },
        { text: '출력순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
      ];
    },
    ReceivesData (data) {
      Object.assign(this.healthOrgan, data);
      this.healthOrgan.useYn = data.useYn === '사용' ? 'Y' : 'N';
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      // this.checkValidation();
      this.isSubmit2 = true;
      this.saveUrl = transactionConfig.examinationOrgan.edit.url;
    },
    beforeInsert () {
      this.checkValidation();
      this.insertUrl = transactionConfig.examinationOrgan.insert.url;
    },
    beforeDelete () {
      // this.checkValidation();
      this.isSubmit3 = true;
      this.deleteUrl = this.$format(transactionConfig.examinationOrgan.delete.url, this.healthOrgan.heaCheckupOrgNo);
    },
    /**
     * 수정전 유효성 검사
     */
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.examinationOrgan.list.url);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      // this.$http.get(url).then((_result) => {
      //   // console.log(JSON.parse(JSON.stringify(_result.data)));
      //   this.gridData = _result.data;
      // }).catch((_error) => {
      //   // handle error
      //   console.log(_error);
      // });

      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'GET';
      // this.$http.param = this.param;
      this.$http.request((_result) => {
        // console.log(JSON.parse(JSON.stringify(_result.data)));
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });

      // this.$http.requestGet((_result) => {
      //   console.log(JSON.parse(JSON.stringify(_result.data)));
      //   this.gridData = _result.data;
      // }, (_error) => {
      //   console.log(_error);
      // });
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSaveClickedCallback (_result) {
      // this.$emit('APP_REQUEST_SUCCESS', '수정 버튼이 클릭 되었습니다.');
      this.getList();
      this.isSubmit2 = false;
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      this.btnClearClickedCallback();
      this.isSubmit = false;
    },
    btnDeleteClickedCallback (_result) {
      this.getList();
      this.btnClearClickedCallback();
      this.isSubmit3 = false;
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
      this.isSubmit = false;
      this.isSubmit2 = false;
      this.isSubmit3 = false;
      // Object.assign(this.$data, this.$options.data());
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.healthOrgan, this.$options.data().healthOrgan);
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>