<!--
  목적 : 고장이력정보
  작성자 : kkc
  Detail : 고장이력정보 조회,등록,수정
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
            label="고장이력정보 목록"
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
            <y-label label="고장이력정보 상세" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :editable="editable"
                :comboItems="preventFacNoItems"
                itemText="ewtrPreventFacNm"
                itemValue="ewtrPreventFacNo"
                ui="bootstrap"
                label="방지시설명"
                name="ewtrPreventFacNo"
                v-model="ewtrPreventFacBreakHist.ewtrPreventFacNo"
                :required="true"
                v-validate="'required'"
                :state="validateState('ewtrPreventFacNo')"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker 
                :width="8"
                :editable="editable"
                label="고장발생일"
                name="measureYmd"
                v-model="ewtrPreventFacBreakHist.measureYmd"
                :required="true"
                v-validate="'required'"
                :state="validateState('measureYmd')"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :editable="editable"
              :maxlength="15"
              ui="bootstrap"
              label="고장시간"
              name="downTime"
              v-model="ewtrPreventFacBreakHist.downTime"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="고장상태"
                name="downCond"
                v-model="ewtrPreventFacBreakHist.downCond"
                :rows="2"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="조치사항"
                name="action"
                v-model="ewtrPreventFacBreakHist.action"
                :rows="2"
              />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-textarea
                :width="10"
                :editable="editable"
                :maxlength="150"
                ui="bootstrap"
                label="특기사항"
                name="remark"
                v-model="ewtrPreventFacBreakHist.remark"
                :rows="2"
              />
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
              :param="ewtrPreventFacBreakHist"
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
              :param="ewtrPreventFacBreakHist"
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
  name: 'prevent-break-hist',
  props: {
    selectedPreventFacNo: 0,
  },
  data () {
    return {
      ewtrPreventFacBreakHist: {
        ewtrPreventFacNo: 0,
        measureYmd: '',
        downTime: '',
        downCond: '',
        action: '',
        remark: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      preventFacNoItems: [],
      editable: true,
      updateMode: false,
      isInsert: false,
      isEdit: false,
      editUrl: '',
      insertUrl: '',
    };
  },
  watch: {
    selectedPreventFacNo: function (newValue, oldValue) {
      this.ewtrPreventFacBreakHist.ewtrPreventFacNo = this.selectedPreventFacNo;
      this.getList();
      this.btnClearClickedCallback();
    },
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
        this.getPreventFacNoItems();
      }, 200);
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '방지시설명', name: 'ewtrPreventFacNm', width: '20%', align: 'left' },
        { text: '고장발생일', name: 'measureYmd', width: '20%', align: 'center' },
        { text: '고장시간', name: 'downTime', width: '10%', align: 'center' },
        { text: '고장상태', name: 'downCond', width: '25%', align: 'left' },
        { text: '조치사항', name: 'action', width: '25%', align: 'left' },
        { text: '특기사항', name: 'remark', width: '25%', align: 'left' },
      ];

      this.editUrl = transactionConfig.env.water.facility.preventFacBreakHist.edit.url;
      this.insertUrl = transactionConfig.env.water.facility.preventFacBreakHist.insert.url;

      this.getList();
      this.setGridSize();
    },

    getList () {
      this.$http.url = selectConfig.env.water.facility.preventFacBreakHist.list.url;
      this.$http.type = 'GET';
      this.$http.param = {
        'ewtrPreventFacNo': this.ewtrPreventFacBreakHist.ewtrPreventFacNo
      };
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getDetail (data) {
      if (data === null) return;

      this.$http.url = this.$format(selectConfig.env.water.facility.preventFacBreakHist.get.url, data.ewtrPreventFacBreakHistNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.updateMode = true;
        this.ewtrPreventFacBreakHist = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getPreventFacNoItems () {
      this.$http.url = selectConfig.env.water.facility.preventFac.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'ewtrPreventFacNo': null, 'ewtrPreventFacNm': '선택하세요' });
        this.preventFacNoItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },

    /** 신규등록 하기전 UI단 유효성 검사 **/
    beforeInsert () {
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '등록하시겠습니까?',
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
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          window.getApp.$emit('CONFIRM', {
            title: '확인',
            message: '수정하시겠습니까?',
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
      this.ewtrPreventFacBreakHist.ewtrPreventFacBreakHistNo = _result.data;
      this.getList();
      this.isInsert = false;
      this.updateMode = true;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '등록되었습니다.',
        type: 'success',
      });
    },
    btnEditClickedCallback (_result) {
      this.getList();
      this.isEdit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '수정되었습니다.',
        type: 'success',
      });
    },
    btnClearClickedCallback () {
      Object.assign(this.$data.ewtrPreventFacBreakHist, this.$options.data().ewtrPreventFacBreakHist);
      this.$validator.reset();
      this.updateMode = false;
    },
    btnClickedErrorCallback (_result) {
      this.isInsert = false;
      this.isEdit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>