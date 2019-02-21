<!--
  목적 : 일반업무 목록
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
          <div class="float-right">
            <y-btn
              v-if="editable"
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDeleteSubmit"
              title="삭제"
              color="red"
              action-type="delete"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              title="신규등록"
              color="orange"
              @btnClicked="btnPopupClickedCallback" 
            />
          </div>
          <b-row class="mb-3"></b-row>
          <y-data-table
            label="일반업무 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            v-model="selectedValue"
            @tableLinkClicked="tableLinkClicked"
          >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :width="popupOptions.width"        
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :top="popupOptions.top" >
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="popupOptions.closeCallback" />
    </el-dialog>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'general-business',
  props: {
  },
  data () {
    return {
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
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '60%',
        top: '10px',
        param: {},
        closeCallback: null,
      },
      baseWidth: 8,
      editable: true,
      comboDeptItems: [],
      searchUrl: '',
      deleteUrl: '',
      isDeleteSubmit: false,
      selectedValue: [],
      deleteValue: null,
    };
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
        { text: '사번', name: 'userId', width: '10px', align: 'center' },
        { text: '직원명', name: 'userNm', width: '15px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '15px', align: 'center' },
        { text: '방문일', name: 'visitYmd', width: '20px', align: 'center', url: 'true' },
        { text: '진료내역', name: 'heaTreatNm', width: '20px', align: 'left' },
        { text: '주호소 및 증상', name: 'symptom', width: '20px', align: 'left' },
        { text: '간호 및 상담내용', name: 'consult', width: '20px', align: 'left' },
        { text: '특이사항', name: 'remark', width: '20px', align: 'left' },
      ];

      this.searchUrl = selectConfig.infirmaryUsageHistory.list.url;
      this.deleteUrl = transactionConfig.infirmaryUsage.delete.url;

      this.getDeptItems();
      this.getDataList();
      this.setGridSize();
    },
    /** /초기화 관련 함수 **/

    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', _error);
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
    beforeDelete () {
      if (this.selectedValue.length === 0) 
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '항목을 선택해주세요.',
          type: 'warning',
        });
        return;
      }
      
      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '삭제하시겠습니까?',
        type: 'info',
        confirmCallback: () => {
          this.deleteValue = {
            'data': Object.values(this.$_.clone(this.selectedValue))
          };
          this.isDeleteSubmit = true;
        }
      });
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
    tableLinkClicked (header, data) {
      if (data === null) return;

      this.popupOptions.target = () => import(`${'./createGeneralBusiness.vue'}`);
      this.popupOptions.title = '일반업무 상세';
      this.popupOptions.param = {
        'heaInfirmaryUsageNo': data.heaInfirmaryUsageNo
      };
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '10px';
      this.popupOptions.closeCallback = this.closePopupUsage;
    },
    btnDeleteClickedCallback (_result) {
      this.getDataList();
      this.isDeleteSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '삭제되었습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isDeleteSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    btnPopupClickedCallback () {
      this.popupOptions.target = () => import(`${'./createGeneralBusiness.vue'}`);
      this.popupOptions.title = '일반업무 등록';
      this.popupOptions.visible = true;
      this.popupOptions.width = '60%';
      this.popupOptions.top = '10px';
      this.popupOptions.param = {
        'heaInfirmaryUsageNo': 0
      };
      this.popupOptions.closeCallback = this.closePopupUsage;
    },
    closePopupUsage (data) {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
      this.getDataList();
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