<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="">
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
                  :action-url="searchUrl"
                  :param="searchParam"
                  title="검색"
                  color="green"
                  action-type="GET"
                  @btnClicked="btnSearchClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </div>
            </div>
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :comboItems="comboTaskItems"
                  :required="true"
                  itemText="codeNm"
                  itemValue="code"
                  ui="bootstrap"
                  label="업무그룹"
                  name="taskGrpCd"
                  v-model="searchParam.taskGrpCd"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="8"
                  ui="bootstrap"
                  label="메뉴명"
                  name="menuNm"
                  v-model="searchParam.menuNm"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text 
                  label="상위메뉴"
                  ui="bootstrap"
                  placeholder="상위메뉴를 선택하세요."
                  v-model="searchParam.upMenuNm"
                  :width="9"
                  :editable="false"
                >
                  <el-popover
                    slot="customAppendIcon"
                    placement="right"
                    width="400"
                    trigger="manual"
                    v-model="searchParam.popoverVisible"
                    >
                    <y-tree
                      node-key="menuId"
                      label="menuNm"
                      title="메뉴 선택"
                      :editable="false"
                      :treeData="menuTree"
                      @nodeClick="searchNodeClick"
                    />
                    <el-button 
                      icon="el-icon-search" 
                      circle
                      slot="reference"
                      size="mini"
                      @click="searchParam.popoverVisible = !searchParam.popoverVisible"
                    />
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="searchParam.popoverVisible = false">닫기</el-button>
                    </div>
                  </el-popover>
                  <el-button 
                    v-if="searchParam.upMenuId"
                    icon="el-icon-close" 
                    circle
                    slot="customAppendIcon"
                    size="mini"
                    @click.stop="removeSearchNode"
                    />
                </y-text>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- 검색 결과 테이블 -->
      <b-row class="mt-3">
        <b-col sm="12">
            <b-col sm="12" class="px-0">
              <y-tree-data-table
                :headers="gridOptions.header"
                :items="menuTreeDataTable"
                :height="450"
                expand-column-name="menuNm"
                expand-column-width="300"
                data-key="menuId"
                @rowClicked="rowClicked"
              >
              </y-tree-data-table>
            </b-col>
        </b-col>
      </b-row>

      <b-row class="mt-3" ref="detailBox">
        <b-col sm="12">
          <b-row>
            <b-col sm="12">
              <y-label label="메뉴 관리" icon="user-edit" color-class="cutstom-title-color" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-card>
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <b-row>
                  <b-col sm="3">
                    <y-label label="메뉴 ID"></y-label>
                  </b-col>
                  <b-col sm="9">
                    {{menu.menuId}}
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text 
                  label="상위메뉴"
                  ui="bootstrap"
                  placeholder="상위메뉴를 선택하세요."
                  v-model="menu.upMenuNm"
                  :width="9"
                  :editable="false"
                >
                  <el-popover
                    slot="customAppendIcon"
                    placement="right"
                    width="400"
                    trigger="manual"
                    v-model="menu.popoverVisible"
                    >
                    <y-tree
                      node-key="menuId"
                      label="menuNm"
                      :editable="false"
                      :treeData="menuTree"
                      @nodeClick="nodeClick"
                    />
                    <el-button 
                      icon="el-icon-search" 
                      circle
                      slot="reference"
                      size="mini"
                      @click="menu.popoverVisible = !menu.popoverVisible"
                    />
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="menu.popoverVisible = false">닫기</el-button>
                    </div>
                  </el-popover>
                  <el-button 
                    v-if="menu.upMenuId"
                    icon="el-icon-close" 
                    circle
                    slot="customAppendIcon"
                    size="mini"
                    @click.stop="removeParentNode"
                    />
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-select
                  :width="8"
                  :comboItems="comboTaskItems"
                  :required="true"
                  itemText="codeNm"
                  itemValue="code"
                  ui="bootstrap"
                  label="업무그룹"
                  name="taskGrpCd"
                  v-model="menu.taskGrpCd"
                  v-validate="'required'"
                  :state="validateState('taskGrpCd')"
                />
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-number
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  type=""
                  label="메뉴레벨*"
                  :maxlength="1"
                  name="menuLvl"
                  v-model="menu.menuLvl"
                  v-validate="'required'"
                  :state="validateState('menuLvl')"
                >
                </y-number>
              </b-col>

              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-text
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="30"
                  label="메뉴명*"
                  name="menuNm"
                  v-model="menu.menuNm"
                  v-validate="'required'"
                  :state="validateState('menuNm')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-9">
                <y-text
                  :width="11"
                  :editable="editable"
                  ui="bootstrap"
                  :maxlength="100"
                  label="url 경로*"
                  name="frontEndUrl"
                  v-model="menu.frontEndUrl"
                  v-validate="'required'"
                  :state="validateState('frontEndUrl')"
                >
                </y-text>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-number
                  :width="9"
                  :editable="editable"
                  ui="bootstrap"
                  label="sortOrder*"
                  :maxlength="5"
                  name="sortOrder"
                  v-model="menu.sortOrder"
                  v-validate="'required'"
                  :state="validateState('sortOrder')"
                >
                </y-number>
              </b-col>
              <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
                <y-switch
                  :width="9"
                  :editable="editable"
                  :required="true"
                  true-value="Y"
                  false-value="N"
                  ui="bootstrap"
                  label="사용여부"
                  name="useYn"
                  selectText="사용"
                  unselectText="미사용"
                  v-model="menu.useYn"
                  v-validate="'required'"
                  :state="validateState('useYn')"
                  >
                </y-switch>
              </b-col>
            </b-row>
          </b-col>
          <!-- <b-col sm="3" class="col-xxl-3" style="border:1px solid #0000ff;">
            <y-tree
              node-key="menuId"
              label="menuNm"
              :treeData="menuTree"
            />
          </b-col> -->
        </b-row>
        <b-row>
          <b-col sm="12">
            <div class="float-right mt-3" >
              <y-btn
                title="초기화"
                @btnClicked="btnClearClickedCallback" 
              />
              <y-btn 
                :action-url="insertUrl"
                :param="menu"
                :is-submit="isInsert"
                title="신규등록"
                color="orange"
                action-type="POST"
                beforeSubmit="beforeInsert"
                @beforeInsert="beforeInsert"
                @btnClicked="btnInsertClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
              <y-btn 
                v-if="editable"
                :action-url="editUrl"
                :param="menu"
                :is-submit="isEdit"
                title="수정"
                color="orange"
                action-type="PUT"
                beforeSubmit = "beforeEdit"
                @beforeEdit="beforeEdit"
                @btnClicked="btnEditClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import YTree from '@/components/YTree';
import arrayToTree from 'array-to-tree';
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
import YTreeDataTable from '@/components/YTreeDataTable'

export default {
  /** attributes: name, components, props, data **/
  name: 'menu-manage',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  components: {
    'y-tree': YTree,
    YTreeDataTable
  },
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      menuTree: [],
      menuTreeDataTable: [],
      menu: {
        menuId: '',
        menuNm: '',
        taskGrpCd: null,
        upMenuId: '', 
        upMenuNm: '',
        menuLvl: null,
        frontEndUrl: '',
        sortOrder: null,
        useYn: 'Y',
        popoverVisible: false
      },
      gridOptions: {
        header: [],
        data: [],
        height: '300'
      },
      searchUrl: '',
      searchParam: {
        popoverVisible: false
      },
      comboTaskItems: [],
      isInsert: false,
      insertUrl: '',
      isEdit: false,
      editUrl: '',
      editable: true,
      upMenuLvl: null,  // 버튼을 submit 할 것인지 판단하는 변수로써 버튼의 개수만큼 필요합니다.
    };
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.init();
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
      // 메뉴 등록 url
      this.insertUrl = transactionConfig.menu.insert.url;
      // 검색 url
      this.searchUrl = selectConfig.menuTreeBases.list.url;
      // 수정 url
      this.editUrl = transactionConfig.menu.edit.url;

      this.getComboItems('TASK_GRP');
      this.getMenuTreeDatatableBases();
      this.getMenuTreeBases();
      this.setGridSize();

      this.gridOptions.header = [
        { text: '메뉴명', name: 'menuNm', width: '210px', },
        { text: '메뉴코드', name: 'menuId', width: '100px', align: 'center' },
        { text: '메뉴레벨', name: 'menuLvl', width: '100px', align: 'right' },
        { text: 'FrontEnd Url', name: 'frontEndUrl', width: '450px' }
      ]
    },
    setGridSize () {
      window.getApp.$emit('LOADING_SHOW');
      setTimeout(() => {
        this.height = window.innerHeight - this.$refs.searchBox.clientHeight - 250;
        window.getApp.$emit('LOADING_HIDE');
      }, 600);
    },
    /** /초기화 관련 함수 **/
    
    /**
    *  Call API service
    */
    /**
    * 메뉴 tree 기초 정보 조회
    */
    getMenuTreeDatatableBases () {
      this.$http.url = this.searchUrl;
      this.$http.param = this.searchParam;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.menuTreeDataTable = this.convertTree(_result.data);
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error));
      });
    },
    /**
    * 메뉴 tree 기초 정보 조회
    */
    getMenuTreeBases () {
      this.$http.url = this.searchUrl;
      this.$http.param = null;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.menuTree = this.convertTree(_result.data);
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error));
      });
    },
    
    /** /Call API service **/
    
    /** validation checking(필요없으면 지워주세요) **/
    checkValidation (_type) {
      this.$validator.validateAll().then((_result) => {
        if (_type === 'insert') this.isInsert = _result;
        else this.isEdit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!_result) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        if (_type === 'insert') this.isInsert = false;
        else this.isEdit = false;
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },
    /** /validation checking **/
    
    /** Component Events, Callbacks (버튼 제외) **/
    /**
     * 등록전 유효성 검사
     */
    beforeInsert () {
      this.menu.menuId = null;
      this.checkValidation('insert');
    },
    
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    // 초기화
    btnClearClickedCallback () {
      Object.assign(this.$data.menu, this.$options.data().menu);
      this.$validator.reset();
    },
    /**
    * 저장 버튼 처리용 샘플함수
    */
    btnInsertClickedCallback (_result) {
      this.isInsert = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장되었습니다.");
      this.getMenuTreeDatatableBases();
      this.getMenuTreeBases();
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isInsert = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      this.isEdit = false;
      // window.alert('error:' + JSON.stringify(_result));
      // window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /**
     * 검색 버튼 클릭
     */
    btnSearchClickedCallback () {
      this.getMenuTreeDatatableBases();
    },
    /**
     * 수정 전 유효성 검사
     */
    beforeEdit () {
      if (!this.menu.menuId) {
        window.getApp.$emit('APP_VALID_ERROR', '수정할 메뉴를 먼저 선택해주세요.');
        return;
      }
      this.editUrl = this.$format(transactionConfig.menu.edit.url, this.menu.menuId);
      this.checkValidation('edit');
      this.isEdit = this.isEdit && this.menu.menuId ? true : false;
    },
    /**
     * 수정 후속 처리
     */
    btnEditClickedCallback (_result) {
      this.isEdit = false;  // 반드시 isSubmit을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장되었습니다.");
      this.getMenuTreeDatatableBases();
      this.getMenuTreeBases();
    },
    removeParentNode () {
      this.menu.upMenuNm = null;
      this.menu.upMenuId = null;
      this.upMenuLvl = null;
    },
    searchNodeClick (_node) {
      this.searchParam.upMenuNm = _node.menuNm;
      this.searchParam.upMenuId = _node.menuId;
      this.searchParam.popoverVisible = false;
    },
    removeSearchNode () {
      this.searchParam.upMenuNm = null;
      this.searchParam.upMenuId = null;
    },
    /** /Button Event **/
    
    /** 기타 function **/
    /**
     * 메뉴 트리용 기초 정보를 Tree 메뉴로 변환
     */
    convertTree (_treeBases) {
      if (!_treeBases || _treeBases.length <= 0) return null;
      var tree = arrayToTree(_treeBases, {
        parentProperty: 'upMenuId',
        customID: 'menuId'
      });

      return tree;
    },
    /**
     * 공통 마스터 정보 조회
     */
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboTaskItems = _result.data;
        this.comboTaskItems.unshift({ 'code': null, 'codeNm': '선택하세요' });
      }, (_error) => {
        console.log(_error);
      });
    },
    /**
     * treenode 클릭
     */
    nodeClick (_node) {
      this.menu.upMenuNm = _node.menuNm;
      this.menu.upMenuId = _node.menuId;
      this.menu.taskGrpCd = _node.taskGrpCd;
      this.menu.frontEndUrl = _node.frontEndUrl;
      this.upMenuLvl = _node.menuLvl;
      this.menu.menuLvl = this.upMenuLvl ? Number(this.upMenuLvl) + 1 : null;
      this.menu.sortOrder = _node.hasOwnProperty('children') ? _node.children.length + 1 : 1;
      this.menu.popoverVisible = false;
    },
    /**
     * datatable row 선택시
     */
    rowClicked (_row) {
      var row = _row;
      var key = ''
      for (key in this.menu) {
        if (_row.hasOwnProperty(key)) this.menu[key] = _row[key];
        if (_row.hasOwnProperty('parent')) {
          this.menu.upMenuId = _row.parent.menuId;
          this.menu.upMenuNm = _row.parent.menuNm;
        } else {
          this.menu.upMenuId = null;
          this.menu.upMenuNm = null;
        }
      }
    },
    /** /기타 function **/
  }
};
</script>