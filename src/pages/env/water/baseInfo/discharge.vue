<!--
  목적 : 배출수 관리
  작성자 : kkc
  Detail : 배출수 조회,등록,수정
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="배출수 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @selectedRow="getDetail"
            >
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>

    <!-- 등록 -->
    <b-row class="mt-3" ref="insertBox">
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="배출수 상세" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="30"
              ui="bootstrap"
              label="배출수명"
              name="ewtrDischNm"
              v-model="ewtrDisch.ewtrDischNm"
              :required="true"
              v-validate="'required'"
              :state="validateState('ewtrDischNm')"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="비고"
                name="remark"
                v-model="ewtrDisch.remark"
                :rows="2" />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-switch
                :width="8"
                :editable="editable"
                true-value="Y"
                false-value="N"
                ui="bootstrap"
                label="사용여부"
                name="useYn"
                selectText="사용"
                unselectText="미사용"
                v-model="ewtrDisch.useYn"
                :required="true"
              >
            </y-switch>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-number
              :width="8"
              :editable="editable"
              :maxlength="5"
              :hasSeperator="false"
              ui="bootstrap"
              label="정렬순서"
              name="sortOrder"
              v-model="ewtrDisch.sortOrder"
              >
              </y-number>
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              v-if="editable"
              title="초기화"
              @btnClicked="btnClearClickedCallback" 
            />
            <y-btn
              v-if="editable"
              :action-url="insertUrl"
              :param="ewtrDisch"
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
              v-if="editable&&updateMode"
              :action-url="editUrl"
              :param="ewtrDisch"
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
  name: 'discharge',
  props: {
  },
  data () {
    return {
      ewtrDisch: {
        ewtrDischNm: '',
        remark: '',
        sortOrder: '',
        useYn: 'Y',
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      editable: true,
      updateMode: false,
      isInsert: false,
      isEdit: false,
      useYnItems: [],
      editUrl: '',
      insertUrl: '',
    };
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
    // 윈도우 resize event 제거
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      setTimeout(() => {
        this.useYnItems = [
          { useYn: 'Y', useName: '사용' },
          { useYn: 'N', useName: '미사용' },
        ];
      }, 200);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '배출수명', name: 'ewtrDischNm', width: '200px', align: 'left' },
        { text: '비고', name: 'remark', width: '300px', align: 'left' },
        { text: '사용여부', name: 'useYnNm', width: '100px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];

      this.editUrl = transactionConfig.env.water.baseInfo.discharge.edit.url;
      this.insertUrl = transactionConfig.env.water.baseInfo.discharge.insert.url;

      this.getList();
      this.setGridSize();
    },

    getList () {
      this.$http.url = selectConfig.env.water.baseInfo.discharge.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDetail (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.env.water.baseInfo.discharge.get.url, data.ewtrDischNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.ewtrDisch = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.ewtrDisch.ewtrDischNo = '';
      this.updateMode = false;      
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '배출수 정보를 저장하시겠습니까?',
            type: 'info',
            confirmCallback: () => {
              this.isInsert = true;
            },
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    /** 수정 하기전 UI단 유효성 검사 **/
    beforeEdit () {
      if (this.checkDuplicate()) return;
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '배출수 정보를 수정하시겠습니까?',
            type: 'info', 
            confirmCallback: () => {
              this.isEdit = true;
            },
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      });
    },
    
    checkDuplicate () {
      var test = {
        'ewtrDischNm': this.ewtrDisch.ewtrDischNm
      };
      var item = this.$_.find(this.gridOptions.data, test);
      if (item != null) {
        if (this.updateMode
          && this.ewtrDisch.ewtrDischNo === item.ewtrDischNo) {
          return false;
        }
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '이미 같은 이름의 배출수명이 존재합니다.',
          type: 'warning',
        });
        return true;
      }
      return false;
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
     * 그리드 리사이징
     */
    setGridSize () {
      var defaultHeight = 300;
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => { 
        this.gridOptions.height = window.innerHeight - this.$refs.insertBox.clientHeight - 260;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    
    /** button 관련 이벤트 **/
    btnInsertClickedCallback (_result) {
      this.ewtrDisch.ewtrDischNo = _result.data;
      this.getList();
      this.isInsert = false;
      this.updateMode = true;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '배출수 정보를 정상적으로 저장하였습니다.',
        type: 'success',
      });
    },
    btnEditClickedCallback (_result) {
      this.getList();
      this.isEdit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '배출수 정보를 정상적으로 수정하였습니다.',
        type: 'success',
      });
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.ewtrDisch, this.$options.data().ewtrDisch);
      this.$validator.reset();
      this.updateMode = false;
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>