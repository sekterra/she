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
      <!-- <b-row>
        <b-col sm="12">
          검색영역
        </b-col>
      </b-row> -->
      <b-row>
        <!-- 권한 그룹 영역 -->
        <b-col sm="3">
          <y-data-table 
            :headers="authGrpGridOptions.header"
            :items="authGrpGridOptions.data"
            :cell-click="true"
            :height="500"
            label="권한그룹 목록"
            ref="dataTable"
            @selectedRow="authGrpGridSelectedRow"
          />
        </b-col>
        <!-- 메뉴 영역 -->
        <b-col sm="9">
          <y-tree-data-table
            ref="menuDataTable"
            :headers="menuGridOptions.header"
            :items="menuGridOptions.data"
            :checkable="true"
            :height="500"
            expand-column-width="300px"
            expand-column-name="menuNm"
            data-key="menuId"
            label="권한그룹별 메뉴 목록"
          >
          </y-tree-data-table>

        </b-col>
      </b-row>
      <b-row>
          <b-col sm="12">
            <div class="float-right mt-3" >
              <y-btn 
                :action-url="saveUrl"
                :param="authGrpMenusParam"
                :is-submit="isSave"
                title="저장"
                color="orange"
                action-type="POST"
                beforeSubmit="beforeSave"
                @beforeSave="beforeSave"
                @btnClicked="btnSaveClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
              />
            </div>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import arrayToTree from 'array-to-tree'
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig'
import YTreeDataTable from '@/components/YTreeDataTable'

export default {
  /** attributes: name, components, props, data **/
  name: 'auth-grp-menu',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  components: {
    YTreeDataTable
  },
  props: {
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      authGrpGridOptions: {
        header: [],
        data: [],
        getUrl: '',
        getParams: {
          useYn: 'Y'
        }
      },
      menuGridOptions: {
        header: [],
        data: [],
        getUrl: '',
        getParams: {
          useYn: 'Y'
        }
      },
      authGrpMenusParam: {}, // 권한 그룹별 메뉴 model
      saveUrl: '',
      menuTree: [],
      isSave: false,
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
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.authGrpGridOptions.getUrl = selectConfig.authGrp.list.url;
      this.saveUrl = transactionConfig.authGrpMenu.insert.url;
      this.getAuthGrps();
      // this.getAllMenus();
      this.authGrpGridOptions.header = [
        { text: '권한그룹명', name: 'authGrpNm', width: '150' }
      ];

      this.menuGridOptions.header = [
        { text: '메뉴명', name: 'menuNm', width: '210px', },
        { text: '메뉴코드', name: 'menuId', width: '100px', align: 'center' },
        { text: '접근권한', name: 'accessYn', width: '120px', align: 'center', type: 'checkbox', relateColumn: 'writeYn' },
        { text: '쓰기권한', name: 'writeYn', width: '100px', align: 'center', type: 'checkbox' }
      ];
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    */
    getAuthGrps () {
      this.$http.url = this.authGrpGridOptions.getUrl;
      this.$http.param = this.authGrpGridOptions.getParams;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.authGrpGridOptions.data = _result.data;
      });
    },
    getAllMenus () {
      this.$http.url = selectConfig.menuTreeBases.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.menuGridOptions.data = this.convertTree(_result.data);
      });
    },
    /** /Call API service **/
       
    /** Component Events, Callbacks (버튼 제외) **/
    /**
     * 권한 그룹 그리드 선택
     */
    authGrpGridSelectedRow (_row) {
      this.$http.url = this.$format(selectConfig.authGrpMenu.list.url, _row.authGrpNo);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.menuGridOptions.data = this.convertTree(_result.data);
        this.authGrpMenusParam.authGrpNo = _row.authGrpNo;
      });
    },
    /** /Component, Callbacks (버튼 제외) **/
    
    /** Button Event **/
    /**
    * 저장 버튼 처리용 샘플함수
    */
    beforeSave () {
      var checkedMenus = this.$refs.menuDataTable.getCheckedItems();
      this.isSave = checkedMenus.length > 0;
      if (!this.isSave) {
        window.getApp.$emit('APP_VALID_ERROR', '권한 그룹을 먼저 선택해주세요.');
        return;
      }

      this.authGrpMenusParam.authGrpMenus = checkedMenus;
    },
    btnSaveClickedCallback (_result) {
      this.isSave = false;  // 반드시 isSave을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.$emit('APP_REQUEST_SUCCESS', "정상적으로 저장 되었습니다.");
    },
    /**
    * 버튼 에러 처리용 공통함수
    */
    btnClickedErrorCallback (_result) {
      this.isSave = false;  // 반드시 isSave을 false로 초기화 하세요. 그렇지 않으면 버튼을 다시 클릭해도 동작하지 않습니다.
      // TODO : 여기에 추가 로직 삽입(로직 삽입시 지워주세요)
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
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
    /** /기타 function **/
  }
};
</script>