<!--
  목적 : 검진 기준정보 - 검진기관
  Detail : 검진기관 등록/수정화면
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
              :height="gridOptions.height"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :excel-down="true"
              :print="true"
              :useRownum="false"
              label="검진기관 목록"
              ref="dataTable"
              @selectedRow="selectedRow"
              >
            </y-data-table>
          </b-col>
      </b-col>
    </b-row>

    <!-- 등록 -->
    <b-row class="mt-3" ref="editBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="검진기관 상세" icon="user-edit" color-class="cutstom-title-color" />
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
              label="검진기관명"
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
              label="검진기관 담당자"
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
              label="E-Mail"
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
              label="정렬순서"
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
                title="초기화"
                @btnClicked="btnClearClickedCallback" 
                />
              <y-btn
                :action-url="insertUrl"
                :param="checkupOrgan"
                :is-submit="isInsert"
                title="신규등록"
                color="orange"
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
                title="수정"
                color="orange"
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

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-checkup-org',
  props: {
    paneName: {
      type: String,
      default: ''
    },
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
      gridOptions: {
        header: [],
        data: [],
        height: '250'
      },
      baseWidth: 9,
      editable: false,
      isInsert: false,
      isEdit: false,
      editUrl: '',
      insertUrl: '',
    }
  },
  computed: {
  },
  watch: {
    // 해당 tab 들어올 때마다 그리드 사이즈 조정
    paneName () {
      this.setGridSize();      
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
  mounted () {
    // 윈도우 resize event
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    // 윈도우 resize event 제거-SPA 기반이므로 제거하지 않으면 다른페이지에서 해당 이벤트가 호출됨
    window.removeEventListener('resize', this.setGridSize);
  },
  destroyed () {
  },
  //* methods */
  methods: {
    init () {
      // URL setting
      this.editUrl = transactionConfig.checkupOrg.edit.url;
      this.insertUrl = transactionConfig.checkupOrg.insert.url;

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '검진기관명', name: 'heaCheckupOrgNm', width: '150px' },
        { text: '주소', name: 'address', width: '350px' },
        { text: '사업자번호', name: 'businessNo', width: '150px', align: 'center' },
        { text: '담당자', name: 'chargerNm', width: '120px', align: 'center' },
        { text: '전화번호', name: 'telNo', width: '160px', align: 'center' },
        { text: 'E-Mail', name: 'email', width: '200px' },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
      ];
      this.getList(); // 검진기관 목록 조회
      this.setGridSize(); // 그리드 사이즈 조절
    },
    /**
     * 검진기관 상세 조회
     * 검진기관 목록 row 클릭시 마다 발생
     * data : 클릭한 row 정보
     */
    selectedRow (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.checkupOrg.get.url, data.heaCheckupOrgNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.editable = true;
        this.checkupOrgan = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      var heaCheckupOrgNms;
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
            message: '필수입력값을 입력해주세요',
            type: 'warning',  // success / info / warning / error
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
        this.isEdit = false;
      });
    },
    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      var heaCheckupOrgNms = this.$_.map(this.gridOptions.data, 'heaCheckupOrgNm');
      if (this.$_.indexOf(heaCheckupOrgNms, this.checkupOrgan.heaCheckupOrgNm) > -1) {
        // window.alert("이미 같은 이름의 검진기관명이 존재합니다.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 검진기관명이 존재합니다.',
          type: 'warning',  // success / info / warning / error
        });
        return;
      }
      this.$validator.validateAll().then((_result) => {
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (_result) {
          // this.isInsert = window.confirm("저장하시겠습니까?");
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '저장하시겠습니까?',
            // TODO : 필요시 추가하세요.
            type: 'info',  // success / info / warning / error
            // 확인 callback 함수
            confirmCallback: () => {
              this.isInsert = true;
            },
            // 취소 callback 함수
            cancelCallback: () => {
              this.isInsert = false;
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
        this.isInsert = false;
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
    /** 검진기관 목록 조회 **/
    getList () {
      this.$http.url = selectConfig.checkupOrg.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = (window.innerHeight - this.$refs.editBox.clientHeight - 300) <= defaultHeight ? defaultHeight : (window.innerHeight - this.$refs.editBox.clientHeight - 300);
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** button 관련 이벤트 **/
    /**
     * 검진기관 조회 및 수정이 정상적으로 이루어질시 수정버튼 보이도록 처리
     *  수정 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnSaveClickedCallback (_result) {
      this.getList();
      this.isEdit = false;
      if (_result.data > 0)
      {
        // window.alert("수정되었습니다.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '수정되었습니다.',
          type: 'success',  // success / info / warning / error
        });
        this.editable = true;
      }
      else
      {
        // window.alert("수정에 실패하였습니다.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '수정에 실패하였습니다.',
          type: 'warning',  // success / info / warning / error
        });
      }
    },
    /**
     * 검진기관 조회 및 저장이 정상적으로 이루어질시 수정버튼 보이도록 처리
     *  신규등록 버튼 callback
     * _result : backend에서 return하는 데이터
     */
    btnInsertClickedCallback (_result) {
      this.getList();
      this.isInsert = false;
      if (_result.data > 0)
      {
        this.checkupOrgan.heaCheckupOrgNo = _result.data;
        // window.alert("저장되었습니다.");
        window.getApp.$emit('ALERT', {
          title: 'success',
          message: '저장되었습니다.',
          type: 'success',  // success / info / warning / error
        });
        this.editable = true;
      }
      else
      {
        // window.alert("저장에 실패하였습니다.");
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '저장에 실패하였습니다.',
          type: 'warning',  // success / info / warning / error
        });
      }
    },
    /**
     * 수정 버튼 안보여지도록 처리 및 isSubmit false 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
      this.isInsert = false;
      this.isEdit = false;
      this.editable = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
      // window.alert("ERROR.. 담당자에게 연락바랍니다.");

    },
    /**
     * 데이터 및 이벤트 초기화, 수정버튼 안보여지도록 처리
     *  초기화 버튼 callback
     */
    btnClearClickedCallback () {
      Object.assign(this.$data.checkupOrgan, this.$options.data().checkupOrgan);
      this.editable = false;
      this.$validator.reset();
    },
    /** end button 관련 이벤트 **/
  }
};
</script>