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
        <b-row class="mt-3">
          <b-col sm="12">
            <b-col sm="12" class="px-0">
              <div slot="buttonGroup" class="float-right mb-1">
                <y-btn 
                  title="추가"
                  color="blue"
                  @btnClicked="btnAdd" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn 
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
                label="점검팀원"
                >
                <el-table-column
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
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-accident-cause-measures',
  props: {
    safAccidentNo: 0,
  },
  data: () => ({
    gridOptions: { // 조사결과
      header: [],
      data: [],
      height: '250'
    },
    selectedValue: [],
    editable: false,
    isInsert: false,
    isEdit: false,
    searchUrl: '',
  }),
  watch: {
    'safAccidentNo': function (newValue, oldValue) {
      // this.getList(); // 점검팀원 리스트 조회
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
      // Url Setting
      this.searchUrl = selectConfig.saf.checkInspector.list.url;
      // 조사결과 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '근본원인', name: 'rootCause', width: '120px', type: 'text' },
        { text: '개선계획', name: 'imprMeasure', width: '150px', type: 'text' },
        { text: '개선요청', name: 'request', width: '150px', align: 'center', type: 'link' },
        { text: '즉시조치', name: 'measure', width: '200px', align: 'center', type: 'link' },
      ];
    },
    /** 점검팀원 목록, 점검팀(외부) 목록 조회 **/
    getList (classCd) {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'safCheckRsltNo': this.safCheckRsltNo,
        'inspectorClassCd': classCd
      };
      this.$http.request((_result) => {
        if (classCd === 'CLS01') this.gridInspectorInOptions.data = this.$_.clone(_result.data);
        else if (classCd === 'CLS02') this.gridInspectorOutOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
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
        'request': '개선요청',
        'measure': '즉시조치등록',
      });
    },
    /**
     * 점검팀(외부) 행 삭제
     */
    btnDelete () {
      this.$_.forEach(this.selectedValue, (item) => {
        this.gridOptions.data.splice(this.$_.indexOf(this.gridOptions.data, item), 1);
      });
    }
    /** end button 관련 이벤트 **/
  }
};
</script>