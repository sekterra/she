<!--
  목적 : 등록/접수/조치결과 - 조사결과
  Detail : 조사결과
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row>
      <b-col sm="12">
        <!-- 조사결과 테이블 -->
        <b-row>
          <b-col sm="12">
            <b-col sm="12" class="px-0">
              <div slot="buttonGroup" class="float-right mb-1">
                <y-btn 
                  v-if="!disabled"
                  title="추가"
                  color="blue"
                  @btnClicked="btnAdd" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn 
                  v-if="!disabled"
                  title="삭제"
                  color="red"
                  @btnClicked="btnDelete" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
              <y-data-table 
                ref="dataTableIn"
                :height="gridOptions.height"
                :headers="gridOptions.header"
                :items="gridOptions.data"
                :excel-down="true"
                :print="true"
                v-model="selectedValue"
                label="사내사고 원인 및 대책 목록"
                @tableLinkClicked="tableLinkAccidentCauseMeasureClicked"
                >
                <el-table-column
                  v-if="!disabled"
                  type="selection"
                  slot="selection"
                  align="center"
                  width="55">
                </el-table-column> 
              </y-data-table>
            </b-col>
          </b-col>
        </b-row>
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
  name: 'y-accident-cause-measures',
  props: {
    accidentDetail: { 
      type: Object,
      default: {
        safAccidentNo: 0,
        
        accidentCauMeass: [],
        accidentStepCd: '',
      },
    },
    tabParam: {
      type: Object,
      default: {
        imprClassCd: '',
        refTableId: 0,
        editable: true
      },
    },
  },
  data: () => ({
    gridOptions: { // 조사결과
      header: [],
      data: [],
      height: '400'
    },
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      width: '1000px',
      top: '10px',
      param: {},
      closeCallback: null
    },
    selectedValue: [],
    editable: false,
    isInsert: false,
    isEdit: false,
    searchUrl: '',
    disabled: false,
  }),
  watch: {
    'accidentDetail.safAccidentNo': function (newValue, oldValue) {
      this.getList(); // 사내사고 원인 및 대책 목록 조회
    },
    'gridOptions.data': {
      handler: function (val, oldVal) {
        this.accidentDetail.accidentCauMeass = this.gridOptions.data;
      },
      deep: true
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
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      this.disabled = (this.accidentDetail.accidentStepCd === 'ACCS4');
      // Url Setting
      this.searchUrl = selectConfig.saf.accidentCauMeas.list.url;

      // 조사결과 그리드 헤더 설정
      if (!this.disabled)
      {
        this.gridOptions.header = [
          { text: '근본원인', name: 'rootCause', width: '250px', type: 'textarea' },
          { text: '개선계획', name: 'imprMeasure', width: '250px', type: 'textarea' },
          { text: '개선요청', name: 'improvement', width: '100px', align: 'center', type: 'link' },
          { text: '즉시조치', name: 'request', width: '100px', align: 'center', type: 'link' },
        ];
        this.gridOptions.height = '400';
      }
      else
      {
        this.gridOptions.header = [
          { text: '근본원인', name: 'rootCause', width: '250px', },
          { text: '개선계획', name: 'imprMeasure', width: '250px', },
          { text: '개선요청', name: 'improvement', width: '100px', align: 'center', type: 'link' },
          { text: '즉시조치', name: 'request', width: '100px', align: 'center', type: 'link' },
        ];
        this.gridOptions.height = '280';
      }
      this.getList(); // 사내사고 원인 및 대책 목록 조회
    },
    /** 사내사고 원인 및 대책 목록 조회 **/
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'safAccidentNo': this.accidentDetail.safAccidentNo,
      };
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
        console.log(this.gridOptions.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * showAccidentPopup 호출
     * 사고등록 목록에 사고명 col 클릭시 마다 발생
     * header : 헤더 정보
     * data : 클릭한 col의 row 정보
     */
    tableLinkAccidentCauseMeasureClicked (header, data) {
      this.popupOptions.param = {
        'safImprActNo': 0, // data ? data.safImprActNo : 0, << 무조건 신규등록만 되도록
        'imprClassCd': this.tabParam.imprClassCd,
        'refTableId': data ? data.safAccidentCauMeasNo : 0,
        'flag': ''
      };

      if (data.safAccidentCauMeasNo === 0)
      {
        
        // this.$emit('saveCheckResult', {0, '수정'});
        // window.getApp.$emit('ALERT', {
        //   title: '안내',
        //   message: '조사결과를 등록하신 후 이용바랍니다.',
        //   type: 'warning',  // success / info / warning / error
        // });
        return false;
      }
      else
      {
        // 개선요청
        if (header.name === 'improvement')
        {
          // 무조건 등록만 뜨도록 수정
          this.popupOptions.param.flag = 'NOW';
          this.popupOptions.title = '개선요청등록';
          this.popupOptions.target = () => import(`${'../imprAct/actionRequest.vue'}`);
          // if (this.popupOptions.param.safImprActNo > 0)
          // {
          //   this.popupOptions.param.flag = 'DETAIL';
          //   this.popupOptions.title = '개선요청상세';
          //   this.popupOptions.target = () => import(`${'../imprAct/improveDetail.vue'}`);
          // }
          // else
          // {
          //   this.popupOptions.param.flag = 'DETAIL';
          //   this.popupOptions.title = '개선요청등록';
          //   this.popupOptions.target = () => import(`${'../imprAct/actionRequest.vue'}`);
          // }
        }
        // 즉시조치
        else if (header.name === 'request')
        {
          this.popupOptions.param.flag = 'REQUEST';
          this.popupOptions.title = '즉시조치등록';
          this.popupOptions.target = () => import(`${'../imprAct/immediateAction.vue'}`);
        }
        this.popupOptions.top = "10px";
        this.popupOptions.visible = true;
        this.popupOptions.closeCallback = this.closePopup;
      }
    },
    /**
     *  팝업 안 보이도록 설정 후 getReserveData 호출
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      // if (data === null || data === undefined) return;
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      
      if (data !== 'CLOSE') this.getList();
    },
    /** button 관련 이벤트 **/
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     * 점검팀(외부) 행 추가
     */
    btnAdd () {
      this.gridOptions.data.splice(0, 0, {
        'rootCause': '', 
        'imprMeasure': '',
        'improvement': '',
        'request': '',
        'safAccidentNo': this.accidentDetail.safAccidentNo,
        'safAccidentCauMeasNo': 0,
        'safImprActNo': 0,
      });
    },
    /**
     * 점검팀(외부) 행 삭제
     */
    btnDelete () {
      this.$_.forEach(this.selectedValue, (item) => {
        if (item.safAccidentCauMeasNo > 0)
        {
          this.$http.url = this.$format(transactionConfig.saf.accidentCauMeas.delete.url, item.safAccidentCauMeasNo, item.safAccidentNo);
          this.$http.type = 'DELETE';
          this.$http.request((_result) => {
            this.gridOptions.data.splice(this.$_.indexOf(this.gridOptions.data, item), 1);
            window.getApp.$emit('ALERT', {
              title: '안내',
              message: '삭제되었습니다.',
              type: 'success',  // success / info / warning / error
            });
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', _error);
          });
        }
        else this.gridOptions.data.splice(this.$_.indexOf(this.gridOptions.data, item), 1);
      });
    }
    /** end button 관련 이벤트 **/
  }
};
</script>