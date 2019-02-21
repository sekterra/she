<!--
  목적 : 취급물질 관리 팝업
  Detail : 취급물질 관리 팝업 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 검색 -->
    <b-row>
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
                action-type="get"
                @btnClicked="btnSearchClickedCallback" 
              />
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </div>
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-select
                :width="8"
                :comboItems="comboWkodMatClassItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="취급물질분류"
                name="wkodMatClass"
                v-model="searchParam.wkodMatClass"
              >
              </y-select>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-text
              :width="8"
              ui="bootstrap"
              label="취급물질명"
              name="wkodMatNm"
              v-model="searchParam.wkodMatNm"
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
          <b-col sm="12" class="px-0">
            <y-data-table 
              ref="requestDatatable"
              checkKey="matMstNo"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :checkItemData="selectHandleChemContentRow"
              height="400px"
              label="취급물질"
              v-model="handleChemContentRow"
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

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'wkod-mat-mst-dialog',
  props: {
    popupParam: {
      type: Object,
      default: {
        wkodNo: 0,
        selectHandleChemContentRow: []
      },
    },
  },
  data () {
    return {
      searchParam: {
        wkodMatClass: '',
        wkodMatNm: '',
        searchFlag: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      comboWkodMatClassItems: [],
      selectHandleChemContentRow: [],
      handleChemContentRow: [],
      searchUrl: '',
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
    this.getComboItems('SAF_WKOD_MAT_CLASS'); // 작업종류
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        // Url Setting
        this.searchUrl = selectConfig.saf.wkodMatMst.list.url;
      }, 1000);
      
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '취급물질분류', name: 'wkodMatClassNm', width: '25%', align: 'center' },
        { text: '취급물질명', name: 'wkodMatNm', width: '35%', }
      ];
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboWkodMatClassItems = this.$_.clone(_result.data);
        this.comboWkodMatClassItems.splice(0, 0, { 'code': '', 'codeNm': '전체' });
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getList () {
      this.$http.url = selectConfig.saf.wkodMatMst.list.url;
      this.$http.type = 'GET';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
        setTimeout(() => {
          this.selectHandleChemContentRow = this.popupParam.selectHandleChemContentRow;
        }, 100);
        // this.getSelectList();
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
    },
    closePopup (data) {
      this.$emit('closePopup', this.handleChemContentRow);
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.getList();
      window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
