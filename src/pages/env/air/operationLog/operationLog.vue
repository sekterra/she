<!--
  목적 : 대기-운영일지 검색
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
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
                name="measureYm"
                v-model="searchParam.measureYm"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <b-row class="mt-3 h-100">
      <b-col sm="12" class="px-0">
        <b-col sm="12">
          <y-data-table 
            label="대기 운영일지 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            @tableLinkClicked="tableLinkClicked"
            />
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
  name: 'operation-log',
  components: {
  },
  props: {
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
      searchArea: {
        title: '검색박스숨기기',
        show: true
      },
      searchParam: {
        measureYm: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      editable: true,

      searchUrl: ''
    };
  },
  computed: {
  },
  watch: {
  },
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
  destroyed () {
  },
  methods: {
    init () {
      this.searchParam.measureYm = this.$comm.moment().format('YYYY-MM-DD');
      // 선택항목 설정
      setTimeout(() => {
        this.searchParam.measureYm = this.$comm.moment().format('YYYY-MM-DD');
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '작성구분', name: 'envOpLogStNm', width: '100px', align: 'center', textCalculate: this.getTextColor },
        { text: '작성일자', name: 'measureYmd', width: '120px', align: 'center', type: 'link' },
        { text: '날씨', name: 'weather', width: '100px' },
        { text: '온도', name: 'temp', width: '100px', align: 'right' },
        { text: '부서', name: 'createDeptNm', width: '160px', align: 'center' },
        { text: '작성자', name: 'createUserNm', width: '160px', align: 'center' },
      ];

      this.searchUrl = selectConfig.env.air.operationLog.list.url;

      this.getList();
      this.setGridSize();
    },

    getTextColor (_row, _name) {
      var text = _row[_name];
      if (_name === 'envOpLogStNm') {
        if (_row[_name] === '미작성') {
          text = '<font style="color:#fc1c1c;">' + text + '</font>';
        }
      }
      return text;
    },
    
    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    }, 

    tableLinkClicked (header, row) {
      if (header.name === 'measureYmd') {
        this.getDetail(row);
      }
    },
    getDetail (data) {
      if (data.envOpLogStCd == null) {
        this.$http.url = transactionConfig.env.air.operationLog.insert.url;
        this.$http.type = 'post';
        this.$http.param = {
          'measureYmd': data.measureYmd
        };
        this.$http.request((_result) => {          
          this.openPopup(data);
        }, (_error) => {
          window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
        });
      }
      else {
        this.openPopup(data);
      }
    },
    openPopup (data) {
      this.popupOptions.param = {
        'measureEditable': data.measureEditable,
        'measureYmd': data.measureYmd
      };
      this.popupOptions.target = () => import(`${'./operationLogBase.vue'}`);
      this.popupOptions.title = '대기 운영일지(' + data.measureYmd + ')';
      this.popupOptions.visible = true;
      this.popupOptions.width = '80%';
      this.popupOptions.top = '20px';
      this.popupOptions.closeCallback = this.closePopup;
    },
    closePopup (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getList();
    },
    
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 245;
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

      window.getApp.$emit('LOADING_PASS_COUNT', 2);
      this.setGridSize();
    }
  },
};
</script>