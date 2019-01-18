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
    <b-row>
      <b-col sm="12">  
        <div class="float-right">
          <y-btn
            type="clear"
            title="닫기"
            size="small"
            color="info"
            @btnClicked="closePopup" 
          />
        </div>  
      </b-col>
    </b-row>

    <!-- 검색 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header">
            <div class="float-left">
              <y-label label="검색" />
            </div>
            <div class="float-right">
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                type="search"
                title="검색"
                size="mini"
                color="success"
                action-type="get"
                @btnClicked="btnSearchCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row>
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
                label="사용자명"
                name="userNm"
                v-model="searchParam.userNm"
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
              type="save"
              title="유소견자 지정"
              color="primary"
              size="mini"
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
              type="delete"
              title="유소견자 해제"
              color="primary"
              size="mini"
              action-type="delete"
              beforeSubmit = "beforeDelete"
              @beforeDelete="beforeDelete"
              @btnClicked="btnDeleteClickedCallback" 
              @btnClickedErrorCallback="btnClickedErrorCallback"
            />
          </div>
          <b-row class="mb-3"></b-row>
          <y-data-table
            label="유소견자 지정 목록"
            title="유소견자 지정 목록"
            ref="dataTable"
            :headers="gridHeaderOptions"
            :items="gridData"
            :editable="editable"
            v-model="selectedValue"
            :excel-down="true"
            :print="true">
            <el-table-column
              type="selection"
              slot="selection"
              width="55">
            </el-table-column>
          </y-data-table>
        </b-col>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
            type="clear"
            title="닫기"
            size="small"
            color="info"
            @btnClicked="closePopup" 
          />
        </div>  
      </b-col>
    </b-row>
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
      searchParam: {
        deptCd: '',
        userId: '',
        userNm: '',
        suspectYn: '',
      },
      baseWidth: 8,
      editable: true,
      isInsertSubmit: false,
      isDeleteSubmit: false,
      isSubmit: '',
      suspectYnItems: [],
      deptItems: [],
      searchUrl: '',
      insertUrl: '',
      deleteUrl: '',
      gridData: [],
      gridHeaderOptions: [],
      saveUrl: '',
      selectedValue: [],
      insertValue: null,
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
    this.getDeptItems();
    this.getSuspectYnItems();
    this.getDataList();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.gridHeaderOptions = [
        { text: '검진계획', name: 'heaCheckupPlanNm', width: '200px', align: 'center' },
        { text: '검진종류', name: 'heaCheckupClassNm', width: '200px', align: 'center' },
        { text: '사번', name: 'userId', width: '120px', align: 'center' },
        { text: '사용자명', name: 'userNm', width: '160px', align: 'center' },
        { text: '부서', name: 'deptNm', width: '160px', align: 'center' },
        { text: '유소견자 여부', name: 'suspectYn', width: '120px', align: 'center' },
        { text: '검진일', name: 'heaCheckedYmd', width: '160px', align: 'left' },
        { text: '검진기관', name: 'heaCheckupOrgNm', width: '200px', align: 'center' },
        { text: '판정', name: 'heaDiagnoseNm', width: '120px', align: 'center' },
        { text: '질병종류', name: 'heaDiseaseClassNm', width: '200px', align: 'center' },
        { text: '질환', name: 'heaDiseaseNm', width: '200px', align: 'center' },
      ];
    },
    getSuspectYnItems () {
      setTimeout(() => {
        this.suspectYnItems = [
          { code: '', codeNm: '전체' },
          { code: 'Y', codeNm: 'Y' },
          { code: 'N', codeNm: 'N' },
        ];
      }, 2000);
    },
    getDeptItems () {
      this.$http.url = selectConfig.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.deptItems = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    /** /초기화 관련 함수 **/
    
    getDataList () {
      this.$http.url = selectConfig.suspectUserPopup.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        //  console.log(JSON.parse(JSON.stringify(_result.data)));
        this.gridData = _result.data;
      }, (_error) => {
        console.log(_error);
      });
    },
    
    beforeInsert () {
      console.log(this.selectedValue.length);
      if (this.selectedValue.length === 0) 
      {
        window.alert("항목을 선택해주세요.");
        return;
      }
      this.insertUrl = transactionConfig.suspectUser.insert.url;
      this.insertValue = {
        'data': Object.values(this.$_.clone(this.selectedValue))
      };
      this.isInsertSubmit = true;
    },
    beforeDelete () {
      console.log(this.selectedValue.length);
      if (this.selectedValue.length === 0) 
      {
        window.alert("항목을 선택해주세요.");
        return;
      }
      this.deleteUrl = transactionConfig.suspectUser.delete.url;
      this.deleteValue = {
        'data': Object.values(this.$_.clone(this.selectedValue))
      };
      this.isDeleteSubmit = true;
    },
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },

    /** Button Event **/
    btnInsertClickedCallback (_result) {
      this.getDataList();
      this.isInsertSubmit = false;
      alert('유소견자가 지정 되었습니다.');
    },
    btnDeleteClickedCallback (_result) {
      this.getDataList();
      this.isDeleteSubmit = false;
      alert('유소견자가 해제 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.isSubmit = false;
      window.getApp.emit('APP_REQUEST_ERROR', _result);
    },
    btnSearchCallback () {
      this.getDataList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '검색 버튼이 클릭 되었습니다.');
    },
    /** /Button Event **/
  }
};
</script>