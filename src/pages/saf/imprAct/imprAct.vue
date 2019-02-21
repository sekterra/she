<!--
  목적 : 작업허가서 신청 목록
  Detail : 작업허가서 신청 목록 화면
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
          <div slot="header" >
            <!-- <div class="float-left"> -->
              <y-label label="검색" />
            <!-- </div> -->
            <div class="float-right">
              <y-btn
                title="즉시조치임시팝업"
                color="yellow"
                @btnClicked="openDialogPage('NOW')" 
              />
              <y-btn
                title="향후조치임시팝업"
                color="yellow"
                @btnClicked="openDialogPage('REQUEST')" 
              />
              <y-btn
                title="접수임시팝업"
                color="yellow"
                @btnClicked="openDialogPage('ACCEPT')" 
              />
              <y-btn
                title="조치임시팝업"
                color="yellow"
                @btnClicked="openDialogPage('IMPROVE')" 
              />
              <y-btn
                title="확인임시팝업"
                color="yellow"
                @btnClicked="openDialogPage('CONFIRM')" 
              />
              <y-btn
                title="상세임시팝업"
                color="yellow"
                @btnClicked="openDialogPage('DETAIL')" 
              />
              <y-btn
                :action-url="searchUrl"
                :param="searchParam"
                title="검색"
                color="green"
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboImprClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="업무구분"
                name="imprClassCd"
                v-model="searchParam.imprClassCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-datepicker
                :width="8"
                :range="true"
                label="요청일"
                name="imprRqstYmd"
                v-model="searchParam.imprRqstYmd"
              >
              </y-datepicker>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboImprStepItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="진행상태"
                name="imprStepCd"
                v-model="searchParam.imprStepCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              ui="bootstrap"
              label="제목"
              name="imprTitle"
              v-model="searchParam.imprTitle"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="요청부서"
                name="imprRqstDeptCd"
                v-model="searchParam.imprRqstDeptCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-select
                :width="8"
                :comboItems="comboDeptItems"
                itemText="deptNm"
                itemValue="deptCd"
                ui="bootstrap"
                label="조치부서"
                name="actDeptCd"
                v-model="searchParam.actDeptCd"
              >
              </y-select>
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
              label="요청/조치사항 목록"
              ref="dataTable"
              :height="gridOptions.height"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              @tableLinkClicked="tableLinkClicked"
            />
          </b-col>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <y-label label="임시 Tab" icon="user-edit" color-class="cutstom-title-color" />
      </b-col>
    </b-row>
    <el-tabs type="border-card" v-model="tabIndex" sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
      <el-tab-pane
        v-for="(item, i) in tabItems"
        :key="i"
        stretch
        class="default-tab-pane"
      >
      <span slot="label">
        <i class="el-icon-date"></i>
        {{ item.title }}
      </span>
      <keep-alive>
        <component :is="component" v-if="component" :tabParam.sync="tabParam"/>
      </keep-alive>
        </el-tab-pane>
    </el-tabs>
    
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :width="popupOptions.width"        
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :top="popupOptions.top" >
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closePopup" />
    </el-dialog>
  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'impr-act',
  props: {
  },
  data () {
    return {
      tabParam: {
        imprClassCd: '',
        refTableId: 0,
        editable: true
      },
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '1000px',
        top: '10px',
        param: {}
      },
      searchParam: {
        imprClassCd: '',
        imprRqstYmd: '',
        imprStepCd: '',
        imprTitle: '',
        imprRqstDeptCd: '',
        actDeptCd: ''
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      tabItems: [
        { title: '개선사항', url: './imprActTab' },
        { title: '첨부파일', url: './fileUploadPage' },
      ],
      tabIndex: 0,
      component: null,
      comboDeptItems: [],
      comboImprStepItems: [],
      comboImprClassItems: [],
      searchUrl: ''
    }
  },
  watch: {
    tabIndex () {
      this.loadComponent();
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getComboItems('SAF_IMPR_CLASS'); // 개선분류코드
    this.getComboItems('SAF_IMPR_STEP'); // 개선진행단계
    this.getDeptItems();
    this.setGridSize();
    // this.getList();
  },
  mounted () {
    window.addEventListener('resize', this.setGridSize);
  },
  beforeDestory () {
    window.removeEventListener('resize', this.setGridSize);
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.saf.wkodMaster.list.url;
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '업무구분', name: 'imprClassNm', width: '10%', align: 'center' },
        { text: '제목', name: 'imprTitle', width: '20%' },
        { text: '진행상태', name: 'imprStepNm', width: '10%' },
        { text: '요청일', name: 'wkodKindNm', width: '10%', align: 'center' },
        { text: '요청부서', name: 'imprRqstDeptNm', width: '10%', align: 'center' },
        { text: '조치부서', name: 'actDeptNm', width: '10%', align: 'center' },
        { text: '조치담당자', name: 'actUserNm', width: '10%', align: 'center' },
        { text: '조치기간', name: 'actLimitYmd', width: '10%', align: 'center' },
        { text: '조치처리일', name: 'actConfirmYmd', width: '10%', align: 'center' }
      ];
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'code': '', 'codeNm': '전체' });
        if (codeGroupCd === 'SAF_IMPR_CLASS')
        {
          this.comboImprClassItems = this.$_.clone(_result.data);
        }
        else
        {
          this.comboImprStepItems = this.$_.clone(_result.data);
        }
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    selectedRow (data) {
      if (data === null) return;
    },
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '전체' });
        this.comboDeptItems = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    tableLinkClicked (header, row) {
      if (header.name === 'imprTitle') {
        console.log("Title Click");
      }
    },
    getList () {
      this.$http.url = selectConfig.saf.wkodMaster.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    openDialogPage (flag) {
      this.popupOptions.param = {
        'safImprActNo': 0,
      };
      
      if (flag === 'NOW') this.popupOptions.target = () => import(`${'./immediateAction.vue'}`);
      else if (flag === 'ACCEPT') this.popupOptions.target = () => import(`${'./actionAccept.vue'}`);
      else if (flag === 'IMPROVE') this.popupOptions.target = () => import(`${'./improveAction.vue'}`);
      else if (flag === 'CONFIRM') this.popupOptions.target = () => import(`${'./improveConfirm.vue'}`);
      else if (flag === 'DETAIL') this.popupOptions.target = () => import(`${'./improveDetail.vue'}`);
      else this.popupOptions.target = () => import(`${'./actionRequest.vue'}`);
      
      this.popupOptions.top = "10px";
      this.popupOptions.title = '즉시조치등록';
      this.popupOptions.visible = true;
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.gridOptions.height = window.innerHeight - this.$refs.searchBox.clientHeight - 250;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    closePopup () {
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.getList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
    /** 추후 삭제 **/
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      this.component = () => import(`${path}`);
    },
  }
};
</script>

<style>

</style>
