<!--
  목적 : 건강관리실 - 관리대상 유소견자 지정(팝업)
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
                :comboItems="processNoItems"
                itemText="processNm"
                itemValue="processNo"
                ui="bootstrap"
                type="search"
                name="processNo"
                label="공정"
                v-model="searchParam.processNo"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="deptItems"
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
              <y-select
                :width="baseWidth"
                :editable="editable"
                :comboItems="suspectYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                type="edit"
                label="유소견자 여부"
                name="suspectYn"
                v-model="searchParam.suspectYn"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="baseWidth"
                :editable="editable"
                ui="bootstrap"
                type="edit"
                label="사번"
                name="userId"
                v-model="searchParam.userId"
              >
              </y-text>
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
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <!-- 검색 결과 테이블 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0 mt-2">
          <div class="float-right">
            <y-btn
              v-if="editable"
              :action-url="insertUrl"
              :param="insertValue"
              :is-submit="isInsertSubmit"
              title="유소견자 지정"
              color="blue"
              action-type="delete"
              beforeSubmit = "beforeInsert"
              @beforeInsert="beforeInsert"
              @btnClicked="btnInsertClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              v-if="editable"
              :action-url="deleteUrl"
              :param="deleteValue"
              :is-submit="isDeleteSubmit"
              title="유소견자 해제"
              color="blue"
              action-type="delete"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
            <y-btn
              title="닫기"
              @btnClicked="closePopup" 
            />
          </div>
          <b-row class="mb-3"></b-row>
          <y-data-table
            label="유소견자 지정 목록"
            title="유소견자 지정 목록"
            ref="dataTable"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data"
            :editable="editable"
            v-model="selectedValue"
            @expandChange="expandChange"
          >
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="expand"
              slot="expand"
              label="이력"
              width="55"> 
              <template slot-scope="scope">
                <y-label label="* 유소견자 지정/해제 이력"></y-label>
                <el-table
                  ref="suspectHistsData"
                  :border="true"
                  header-cell-class-name="default-th"
                  cell-class-name="default-td"
                  :data="scope.row.suspectHists"
                  style="max-height: 200px;"> 
                  <el-table-column label="지정여부" width="100px" prop="suspectYn" align="center" /> 
                  <el-table-column label="변경일" width="160px" prop="changedDt" align="center"/> 
                  <el-table-column label="당시부서" width="120px" prop="deptNm" align="center"/> 
                  <el-table-column label="검진종류" width="120px" prop="heaCheckupClassNm" align="center"/> 
                  <el-table-column label="검진계획" width="200px" prop="heaCheckupPlanNm" /> 
                  <el-table-column label="판정" width="415px" prop="heaDiagnoseNms" /> 
                  <el-table-column label="질환" width="415px" prop="heaDiseaseNms" /> 
                  <el-table-column label="검진기관" width="120px" prop="heaCheckedOrgNm" align="center"/> 
                  <el-table-column label="검진일" width="163px" prop="heaCheckedYmd" align="center"/> 
                </el-table>
              </template>
            </el-table-column>
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
  /** attributes: name, components, props, data **/
  name: 'suspect-user-popup',
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
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      searchParam: {
        deptCd: '',
        userId: '',
        userNm: '',
        suspectYn: '',
        processNo: 0,
      },
      baseWidth: 8,
      editable: true,
      isInsertSubmit: false,
      isDeleteSubmit: false,
      isSubmit: '',
      suspectYnItems: [],
      deptItems: [],
      searchUrl: '',
      searchHistUrl: '',
      insertUrl: '',
      deleteUrl: '',
      gridData: [],
      gridHeaderOptions: [],
      selectedValue: [],
      insertValue: null,
      deleteValue: null,
      processNoItems: [],
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
        { text: '부서', name: 'deptNm', width: '120px', align: 'center' },
        { text: '사번', name: 'userId', width: '100px', align: 'center' },
        { text: '직원명', name: 'userNm', width: '100px', align: 'center' },
        { text: '유소견자 여부', name: 'suspectYn', width: '130px', align: 'center' },
        { text: '공정', name: 'processNm', width: '130px', align: 'center' },
        { text: '최근 검진정보', child: 
          [
            { text: '검진종류', name: 'heaCheckupClassNm', width: '120px', align: 'center' },
            { text: '검진계획', name: 'heaCheckupPlanNm', width: '200px', align: 'left' },
            { text: '판정', name: 'heaDiagnoseNms', width: '350px', align: 'left' },
            { text: '질환', name: 'heaDiseaseNms', width: '350px', align: 'left' },
            { text: '검진기관', name: 'heaCheckedOrgNm', width: '120px', align: 'left' },
            { text: '검진일', name: 'heaCheckedYmd', width: '160px', align: 'center' },
          ]
        }        
      ];

      this.searchUrl = selectConfig.suspectUser.list.all.url;
      this.searchHistUrl = selectConfig.suspectUser.list.hist.url;
      this.insertUrl = transactionConfig.suspectUser.insert.url;
      this.deleteUrl = transactionConfig.suspectUser.delete.url;

      this.getDeptItems();
      this.getSuspectYnItems();
      this.getProcessNoItems();
      this.getDataList();
      this.setGridSize();
    },
    /** /초기화 관련 함수 **/

    getSuspectYnItems () {
      this.suspectYnItems.push({ 'code': '', 'codeNm': '전체' });
      this.suspectYnItems.push({ 'code': 'Y', 'codeNm': 'Y' });
      this.suspectYnItems.push({ 'code': 'N', 'codeNm': 'N' });
    },
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'get';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.deptItems = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getProcessNoItems () {
      this.$http.url = selectConfig.manage.process.list.url;
      this.$http.type = 'get';
      this.$http.param = {
        'useYn': 'Y'
      };
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'processNo': 0, 'processNm': '전체' });
        this.processNoItems = _result.data;
        this.searchParam.processNo = 0;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    getDataList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        _result.data.forEach(item => {
          item['suspectHists'] = [];
        });
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    
    beforeInsert () {
      if (this.selectedValue.length === 0) 
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '유소견자 항목을 선택해주세요.',
          type: 'warning',
        });
        return;
      }

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '유소견자를 지정하시겠습니까?',
        type: 'info',
        // 확인 callback 함수
        confirmCallback: () => {
          this.insertValue = {
            'data': Object.values(this.$_.clone(this.selectedValue))
          };
          this.isInsertSubmit = true;
        },
      });
    },
    beforeDelete () {
      if (this.selectedValue.length === 0) 
      {
        window.getApp.$emit('ALERT', {
          title: '안내',
          message: '유소견자 항목을 선택해주세요.',
          type: 'warning',
        });
        return;
      }

      window.getApp.$emit('CONFIRM', {
        title: '확인',
        message: '유소견자를 해제하시겠습니까?',
        type: 'info',
        // 확인 callback 함수
        confirmCallback: () => {
          this.deleteValue = {
            'data': Object.values(this.$_.clone(this.selectedValue))
          };
          this.isDeleteSubmit = true;
        }
      });
    },
    expandChange (row) {
      this.$http.url = this.searchHistUrl;
      this.$http.type = 'get';
      this.$http.param = {
        'userId': row.userId
      };
      this.$http.request((_result) => {
        row['suspectHists'] = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
    /**
     * 그리드 리사이징
     */
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 250;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** Button Event **/
    btnInsertClickedCallback (_result) {
      this.getDataList();
      this.isInsertSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '유소견자가 지정 되었습니다.',
        type: 'success',
      });
    },
    btnDeleteClickedCallback (_result) {
      this.getDataList();
      this.isDeleteSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '유소견자가 해제 되었습니다.',
        type: 'success',
      });
    },
    btnClickedErrorCallback (_result) {
      this.isInsertSubmit = false;
      this.isDeleteSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
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