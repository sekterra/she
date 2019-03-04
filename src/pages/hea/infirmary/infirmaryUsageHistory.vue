<!--
  목적 : 건강관리실 - 이력검색 - 방문이력(탭)
  작성자 : kckim
  Detail :
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
            <div class="float-left">
              <y-label label="검색" />
            </div>
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
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                type="edit"
                label="부서"
                name="deptCd"
                v-model="searchParam.deptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="edit"
                label="직원명"
                name="userNm"
                v-model="searchParam.userNm"
                :appendIcon="[{ 'icon': 'search', callbackName: 'searchUser' }]"
                @searchUser="btnSearchUserClicked"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="baseWidth"
                :editable="editable"
                :range="true"
                label="방문일"
                name="duration"
                v-model="searchParam.duration"
              >
              </y-datepicker>
            </b-col>
          </b-row>
      </b-card>
    </b-col>
  </b-row>

  <!-- 검색 결과 테이블 -->
  <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <y-data-table
            label="방문이력 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
          />
        </b-col>
      </b-col>
    </b-row>
    <y-popup :param="popupOptions"></y-popup>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'infirmary-usage-history',
  props: {
    paneName: {
      type: String,
      default: ''
    },
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
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      searchParam: {
        deptCd: '',
        userNm: '',
        duration: null,
      },
      baseWidth: 8,
      editable: true,
      comboDeptItems: [],
      searchUrl: '',
    };
  },
  watch: {
    paneName (val) {
      this.setGridSize();
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
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
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.gridOptions.header = [
        { text: '부서', name: 'deptNm', width: '150px', align: 'center' },
        { text: '사번', name: 'userId', width: '150px', align: 'center' },
        { text: '직원명', name: 'userNm', width: '150px', align: 'center' },
        { text: '방문일', name: 'visitYmd', width: '200px', align: 'center' },
        { text: '진료내역', name: 'heaTreatNm', width: '200px', align: 'left' },
        { text: '주호소 및 증상', name: 'symptom', width: '200px', align: 'left' },
        { text: '간호 및 상담내용', name: 'consult', width: '200px', align: 'left' },
        { text: '특이사항', name: 'remark', width: '200px', align: 'left' },
      ];

      this.searchUrl = selectConfig.infirmaryUsageHistory.list.url;

      this.getDeptItems();
      this.getDataList();
      this.setGridSize();
    },
    /** /초기화 관련 함수 **/

    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
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
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 320;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** Button Event **/
    btnSearchClicked () {
      this.getDataList();
    },
    btnSearchVisibleClicked () {      
      this.searchArea.show = !this.searchArea.show;
      if (this.searchArea.show) this.searchArea.title = '검색박스숨기기';
      else this.searchArea.title = '검색박스보이기';

      window.getApp.$emit('LOADING_PASS_COUNT', 1);
      this.setGridSize();
    },
    btnSearchUserClicked (_item) {
      this.popupOptions.target = () => import(`${'../../manage/user/userSearch.vue'}`);
      this.popupOptions.title = '사용자검색';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '100px';
      this.popupOptions.closeCallback = this.closePopupSearchUser;
    }, 
    closePopupSearchUser (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      if (data.user) {
        this.searchParam.userNm = data.user.userNm;
      }
    },
    /** /Button Event **/
  }
};
</script>