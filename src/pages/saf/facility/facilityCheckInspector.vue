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
        <b-row>
          <b-col sm="12">
            <b-col sm="12" class="px-0">
              <div slot="buttonGroup" class="float-right mb-1">
                <y-btn 
                  v-if="disabled"
                  title="추가"
                  color="blue"
                  @btnClicked="btnInAdd" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn 
                  v-if="disabled"
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
                label="점검팀원 목록"
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
                  v-if="disabled"
                  title="추가"
                  color="blue"
                  @btnClicked="btnOutAdd" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn 
                  v-if="disabled"
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
                label="점검팀(외부) 목록"
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
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'y-facility-check-inspector',
  props: {
    facilityCheckResultDetail: {
      type: Object,
      default: {
        safFacilityCheckResultNo: 0,
        innerTeamData: [],
        outerTeamData: [],
        checkStepCd: '',
      },
    },
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
    popupOptions: {
      target: null,
      title: '',
      visible: false,
      width: '60%',
      top: '10px',
      param: {},
      closeCallback: null,
    },
    disabled: false,
    selectedInValue: [],
    selectedOutValue: [],
    editable: false,
    isInsert: false,
    isEdit: false,
    searchUrl: '',
  }),
  watch: {
    'facilityCheckResultDetail.safFacilityCheckResultNo': function (newValue, oldValue) {
      this.gridInspectorInOptions.data = [];
      this.gridInspectorOutOptions.data = [];
      if (this.facilityCheckResultDetail.safFacilityCheckResultNo > 0)
      {
        this.searchUrl = selectConfig.saf.facilityCheckInspector.list.url;
        this.getList('CLS01'); // 점검팀원 리스트 조회
        this.getList('CLS02'); // 점검팀(외부) 리스트 조회
      }
    },
    'gridInspectorInOptions.data': {
      handler: function (val, oldVal) {
        this.facilityCheckResultDetail.innerTeamData = this.gridInspectorInOptions.data;
      },
      deep: true
    },
    'gridInspectorOutOptions.data': {
      handler: function (val, oldVal) {
        this.facilityCheckResultDetail.outerTeamData = this.gridInspectorOutOptions.data;
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
      this.disabled = (this.facilityCheckResultDetail.checkStepCd === 'CHS01' || this.facilityCheckResultDetail.checkStepCd === 'CHS02');
      this.gridInspectorInOptions.data = [];
      this.gridInspectorOutOptions.data = [];
      // Url Setting
      if (this.facilityCheckResultDetail.safFacilityCheckResultNo > 0)
      {
        this.searchUrl = selectConfig.saf.facilityCheckInspector.list.url;
        this.getList('CLS01'); // 점검팀원 리스트 조회
        this.getList('CLS02'); // 점검팀(외부) 리스트 조회
      }

      // 점검팀원 그리드 헤더  점검팀(외부) 그리드 헤더 설정
      if (!this.disabled)
      {
        this.gridInspectorInOptions.header = [
          { text: '성명', name: 'userNm', width: '120px', },
          { text: '소속', name: 'deptNm', width: '150px', },
          { text: '비고', name: 'remark', width: '200px', },
        ];
        this.gridInspectorOutOptions.header = [
          { text: '성명', name: 'userNm', width: '120px', },
          { text: '소속', name: 'deptNm', width: '150px', },
          { text: '비고', name: 'remark', width: '200px', },
        ];
        this.gridInspectorInOptions.height = '280';
        this.gridInspectorOutOptions.height = '280';
      }
      else
      {
        this.gridInspectorInOptions.header = [
          { text: '성명', name: 'userNm', width: '120px', },
          { text: '소속', name: 'deptNm', width: '150px', },
          { text: '비고', name: 'remark', width: '200px', type: 'textarea' },
        ];
        this.gridInspectorOutOptions.header = [
          { text: '성명', name: 'userNm', width: '120px', type: 'text' },
          { text: '소속', name: 'deptNm', width: '150px', type: 'text' },
          { text: '비고', name: 'remark', width: '200px', type: 'textarea' },
        ];
        this.gridInspectorInOptions.height = '370';
        this.gridInspectorOutOptions.height = '370';
      }
    },
    /** 점검팀원 목록, 점검팀(외부) 목록 조회 **/
    getList (classCd) {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = {
        'safFacilityCheckResultNo': this.facilityCheckResultDetail.safFacilityCheckResultNo,
        'inspectorClassCd': classCd
      };
      this.$http.request((_result) => {
        if (classCd === 'CLS01') this.gridInspectorInOptions.data = this.$_.clone(_result.data);
        else if (classCd === 'CLS02') this.gridInspectorOutOptions.data = this.$_.clone(_result.data);
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        if (this.gridInspectorInOptions.data.length === 0) this.gridInspectorInOptions.data = [];
        if (this.$_.indexOf(this.$_.map(this.gridInspectorInOptions.data, 'userId'), data.user.userId) > -1) return;
        this.gridInspectorInOptions.data.splice(0, 0, {
          'userId': data.user.userId, 
          'userNm': data.user.userNm,
          'deptCd': data.user.deptCd,
          'deptNm': data.user.deptNm,
          'comSexTypeNm': data.user.comSexTypeNm,
          'inspectorClassCd': 'CLS01',
        });
      }
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
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`); // 이유는 모르겠으나 이거를 하지 않으면 추가가 이루어지지않음.. 
      if (this.gridInspectorOutOptions.data.length === 0) this.gridInspectorOutOptions.data = [];
      this.gridInspectorOutOptions.data.splice(0, 0, {
        'userId': '', 
        'userNm': '',
        'deptCd': '',
        'deptNm': '',
        'comSexTypeNm': '',
        'inspectorClassCd': 'CLS02',
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