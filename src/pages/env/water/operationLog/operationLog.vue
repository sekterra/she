<!--
  목적 : 운영일지 검색
  작성자 : kkc
  Detail : 운영일지 목록
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    
    <!-- 검색 -->
    <b-row ref="searchBox">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header">
            <y-label label="검색" />
            <div class="float-right">
              <y-btn
                :title="searchArea.title"
                color="green"                
                @btnClicked="btnSearchVisibleClicked" 
              />
              <y-btn
                v-if="editable"
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked" 
              />
            </div>
          </div>
          <b-row v-if="searchArea.show">
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :editable="editable"          
                type="month"
                label="연월"
                name="yearMonth"
                default="today"
                placeholder=""
                v-model="searchParam.yearMonth"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3 h-100">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table 
            label="운영일지 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @tableLinkClicked="tableLinkClicked"
            >
          </y-data-table>
        </b-col>
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
  name: 'op-log',
  components: {
  },
  props: {
  },
  data: function () {
    return {
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      searchParam: {
        yearMonth: '',
      },
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '80%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      editable: true,
      measureYmd: '',
      searchUrl: '',
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
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.searchParam.yearMonth = this.$comm.moment().format('YYYY-MM-DD');
      // 선택항목 설정
      setTimeout(() => {
        this.searchParam.yearMonth = this.$comm.moment().format('YYYY-MM-DD');
      }, 200);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '작성구분', name: 'envOpLogStCdNm', width: '10%', align: 'center', textCalculate: this.getTextColor },
        { text: '작성일자', name: 'ymd', width: '20%', align: 'center', url: 'true' },
        { text: '날씨', name: 'weather', width: '10%', align: 'center' },
        { text: '온도', name: 'temp', width: '10%', align: 'center' },
        { text: '부서', name: 'deptNm', width: '15%', align: 'center' },
        { text: '작성자', name: 'createUserNm', width: '15%', align: 'center' },
      ];

      this.searchUrl = selectConfig.env.water.operationLog.dailyReport.list.url;

      this.getList();
      this.setGridSize();
    },
    getTextColor (_row, _name) {
      var text = _row[_name];
      if (_name === 'envOpLogStCdNm') {
        if (_row[_name] === '미작성') {
          text = '<font style="color:#fc1c1c;">' + text + '</font>';
        }
      }
      return text;
    },
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 270;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    btnSearchClicked () {
      this.getList();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },

    tableLinkClicked (header, data) {
      if (data === null) return;
      this.getDetail(data);
    },
    getDetail (data) {
      if (data.envOpLogStCd == null) {
        this.$http.url = transactionConfig.env.water.operationLog.operationLog.insert.url;
        this.$http.type = 'post';
        this.$http.param = {
          'measureYmd': data.ymd
        };
        this.$http.request((_result) => {          
          this.openPopup(data);
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
        });
      } else {
        this.openPopup(data);
      }
    },
    openPopup (data) {
      this.popupOptions.target = () => import(`${'./operationLogBase.vue'}`);
      this.popupOptions.title = '수질 운영일지(' + data.ymd + ')';
      this.popupOptions.param = {
        'measureEditable': data.measureEditable,
        'paramMeasureYmd': data.ymd
      };
      this.popupOptions.visible = true;
      this.popupOptions.width = '80%';
      this.popupOptions.top = '10px';
      this.popupOptions.closeCallback = this.closePopup;
    },
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getList();
    },
  }
};
</script>