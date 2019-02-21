<!--
  목적 : 설비점검 관리 - 설비점검결과  - 점검자
  Detail : 설비점검 점검자
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row>
      <b-col sm="12">
        <!-- 점검팀원 테이블 -->
        <b-row class="mt-3">
          <b-col sm="12">
            <b-col sm="12" class="px-0">
              <div slot="buttonGroup" class="float-right mb-1">
                <y-btn 
                  title="추가"
                  color="blue"
                  @btnClicked="btnInAdd" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn 
                  title="삭제"
                  color="red"
                  @btnClicked="btnInDelete" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
              <y-data-table 
                ref="dataTableIn"
                :height="gridInspectorInOptions.height"
                :headers="gridInspectorInOptions.header"
                :items="gridInspectorInOptions.data"
                :excel-down="true"
                :print="true"
                v-model="selectedInValue"
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
        <!-- 점검팀(외부) 테이블 -->
        <b-row class="mt-1">
          <b-col sm="12">
            <b-col sm="12" class="px-0">
              <div slot="buttonGroup" class="float-right mb-1">
                <y-btn 
                  title="추가"
                  color="blue"
                  @btnClicked="btnOutAdd" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn 
                  title="삭제"
                  color="red"
                  @btnClicked="btnOutDelete" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
              <y-data-table 
                ref="dataTableOut"
                :height="gridInspectorOutOptions.height"
                :headers="gridInspectorOutOptions.header"
                :items="gridInspectorOutOptions.data"
                :excel-down="true"
                :print="true"
                v-model="selectedOutValue"
                label="점검팀(외부)"
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
  name: 'y-facility-check-inspector',
  props: {
    safFacilityCheckResultNo: 0,
  },
  data: () => ({
    gridInspectorInOptions: { // 점검팀원
      header: [],
      data: [],
      height: '250'
    },
    gridInspectorOutOptions: { // 점검팀(외부)
      header: [],
      data: [],
      height: '250'
    },
    selectedInValue: [],
    selectedOutValue: [],
    editable: false,
    isInsert: false,
    isEdit: false,
    searchUrl: '',
  }),
  watch: {
    'safFacilityCheckResultNo': function (newValue, oldValue) {
      this.getList('CLS01'); // 점검팀원 리스트 조회
      this.getList('CLS02'); // 점검팀(외부) 리스트 조회
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
      this.searchUrl = selectConfig.saf.facilityCheckInspector.list.url;
      // 점검팀원 그리드 헤더 설정
      this.gridInspectorInOptions.header = [
        { text: '성명', name: 'userNm', width: '120px', },
        { text: '소속', name: 'deptNm', width: '150px', },
        { text: '직책', name: 'dutyNm', width: '120px', },
        { text: '연락처', name: 'tel', width: '150px', align: 'center' },
        { text: '비고', name: 'remark', width: '200px', },
      ];
      // 점검팀(외부) 그리드 헤더 설정
      this.gridInspectorOutOptions.header = [
        { text: '성명', name: 'userNm', width: '120px', },
        { text: '소속', name: 'deptNm', width: '150px', },
        { text: '직책', name: 'dutyNm', width: '120px', },
        { text: '연락처', name: 'tel', width: '150px', align: 'center' },
        { text: '비고', name: 'remark', width: '200px', },
      ];
    },
    /** 점검팀원 목록, 점검팀(외부) 목록 조회 **/
    getList (classCd) {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'safFacilityCheckResultNo': this.safFacilityCheckResultNo,
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
     * 점검팀원 행 추가
     */
    btnInAdd () {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    },
    /**
     * 점검팀원 행 삭제
     */
    btnInDelete () {
      this.$_.forEach(this.selectedInValue, (item) => {
        this.gridInspectorInOptions.data.splice(this.$_.indexOf(this.$_.map(this.gridInspectorInOptions.data, 'userId'), item.userId), 1);
      });
    },
    /**
     * 점검팀(외부) 행 추가
     */
    btnOutAdd () {
      this.gridInspectorOutOptions.data.splice(0, 0, {
        'userId': '', 
        'userNm': '',
        'deptCd': '',
        'deptNm': '',
        'comSexTypeNm': '',
      });
    },
    /**
     * 점검팀(외부) 행 삭제
     */
    btnOutDelete () {
      this.$_.forEach(this.selectedOutValue, (item) => {
        this.gridInspectorOutOptions.data.splice(this.$_.indexOf(this.gridInspectorOutOptions.data, item), 1);
      });
    }
    /** end button 관련 이벤트 **/
  }
};
</script>