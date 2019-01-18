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
              :headers="gridHeaderOptions"
              :items="gridData"
              :excel-down="true"
              :print="true"
              :rows="5"
              label="건강검진기관"
              ref="dataTable"
              @selectedRow="selectedRow"
              >
            </y-data-table>
          </b-col>

          <!-- 등록 -->
          <b-row class="mt-3">
            <b-col sm="12">
              <b-row>
                <b-col sm="12">
                  <y-label label="건강검진기관 상세" icon="user-edit" color-class="cutstom-title-color" />
                </b-col>
              </b-row>
              <b-card >
                <b-row>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :maxlength="30"
                    :required="true"
                    ui="bootstrap"
                    name="heaCheckupOrgNm"
                    label="건강검진기관명"
                    v-model="checkupOrgan.heaCheckupOrgNm"
                    v-validate="'required'"
                    :state="validateState('heaCheckupOrgNm')"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                      :width="7"
                      :maxlength="15"
                      ui="bootstrap"
                      name="businessNo"
                      label="사업자번호"
                      v-model="checkupOrgan.businessNo"
                      >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :maxlength="15"
                    ui="bootstrap"
                    name="telNo"
                    label="담당자 전화번호"
                    v-model="checkupOrgan.telNo"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="7"
                    :maxlength="30"
                    ui="bootstrap"
                    name="chargerNm"
                    label="건강검진기관 담당자"
                    v-model="checkupOrgan.chargerNm"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
                    <y-text
                      :width="10"
                      :maxlength="150"
                      ui="bootstrap"
                      name="address"
                      label="주소"
                      v-model="checkupOrgan.address"
                      >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-text
                    :width="8"
                    :maxlength="30"
                    ui="bootstrap"
                    name="email"
                    label="eMail"
                    v-model="checkupOrgan.email"
                    >
                    </y-text>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-number
                    :width="7"
                    :maxlength="5"
                    :hasSeperator="false"
                    ui="bootstrap"
                    name="sortOrder"
                    label="출력순서"
                    v-model="checkupOrgan.sortOrder"
                    >
                    </y-number>
                  </b-col>
                  <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                    <y-switch
                      :width="8"
                      true-value="Y"
                      false-value="N"
                      ui="bootstrap"
                      label="사용여부"
                      name="radioValue"
                      selectText="사용"
                      unselectText="미사용"
                      v-model="checkupOrgan.useYn"
                    />
                  </b-col>
                </b-row>
                <div class="float-right mt-3">
                    <y-btn
                      type="clear"
                      title="초기화"
                      size="small"
                      color="info"
                      @btnClicked="btnClearClickedCallback" 
                      />
                    <y-btn
                      :action-url="insertUrl"
                      :param="checkupOrgan"
                      :is-submit="isInsert"
                      type="save"
                      title="신규등록"
                      size="small"
                      color="warning"
                      action-type="POST"
                      beforeSubmit = "beforeInsert"
                      @beforeInsert="beforeInsert"
                      @btnClicked="btnInsertClickedCallback" 
                      @btnClickedErrorCallback="btnClickedErrorCallback"
                    />
                    <y-btn
                      v-if="editable"
                      :action-url="editUrl"
                      :param="checkupOrgan"
                      :is-submit="isEdit"
                      type="save"
                      title="수정"
                      size="small"
                      color="warning"
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
      checkupOrgan: {
        heaCheckupOrgNo: '',
        heaCheckupOrgNm: '',
        address: '',
        businessNo: '',
        telNo: '',
        chargerNm: '',
        email: '',
        sortOrder: '',
        useYn: 'Y',
        updateUserId: '',
        createUserId: '',
      },
      baseWidth: 9,
      editable: false,
      isInsert: false,
      isEdit: false,
      gridData: [],
      gridHeaderOptions: [],
      editUrl: '',
      insertUrl: '',
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
      // Create User, Update User setting
      this.checkupOrgan.updateUserId = 'dev';
      this.checkupOrgan.createUserId = 'dev';
      // URL setting
      this.editUrl = transactionConfig.checkupOrg.edit.url;
      this.insertUrl = transactionConfig.checkupOrg.insert.url;

      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '건강검진기관명', name: 'heaCheckupOrgNm', width: '150px' },
        { text: '주소', name: 'address', width: '350px' },
        { text: '사업자번호', name: 'businessNo', width: '150px', align: 'center' },
        { text: '담당자', name: 'chargerNm', width: '120px', align: 'center' },
        { text: '전화번호', name: 'telNo', width: '160px', align: 'center' },
        { text: 'eMail', name: 'eMail', width: '200px' },
        { text: '출력순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
      ];
    },
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.checkupOrg.get.url, data.heaCheckupOrgNo);
      this.$http.type = 'GET';
      // this.$http.param = {
      //   'heaCheckupOrgNo': data.heaCheckupOrgNo
      // };
      this.$http.request((_result) => {
        this.editable = true;
        this.checkupOrgan = this.$_.clone(_result.data);
      }, (_error) => {
        console.log(_error);
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      if (window.confirm("수정하시겠습니까?"))
      {
        this.checkValidationSave();
      }
    },
    beforeInsert () {
      var heaCheckupOrgNms = this.$_.map(this.gridData, 'heaCheckupOrgNm');
      if (this.$_.indexOf(heaCheckupOrgNms, this.checkupOrgan.heaCheckupOrgNm) > -1)
      {
        window.alert("이미 같은 이름의 건강검진기관이 존재합니다.");
        return;
      }

      if (window.confirm("저장하시겠습니까?"))
      {
        this.checkValidationInsert();
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
        this.gridData = this.$_.clone(_result.data);
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
      this.isEdit = false;
      if (_result.data > 0)
      {
        window.alert("수정되었습니다.");
        this.editable = true;
      }
      else
      {
        window.alert("수정에 실패하였습니다.");
      }
    },
    btnInsertClickedCallback (_result) {
      this.getList();
      this.isInsert = false;
      if (_result.data > 0)
      {
        this.checkupOrgan.heaCheckupOrgNo = _result.data;
        window.alert("저장되었습니다.");
        this.editable = true;
      }
      else
      {
        window.alert("저장에 실패하였습니다.");
      }
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
      this.isInsert = false;
      this.isEdit = false;
      this.editable = false;
      window.alert("ERROR.. 담당자에게 연락바랍니다.");
      // Object.assign(this.$data, this.$options.data());
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.checkupOrgan, this.$options.data().checkupOrgan);
      this.editable = false;
      this.$validator.reset();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>