<!--
  목적 : 유해인자 조회 팝업
  Detail : 유해인자 조회 팝업 화면
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
                title="저장"
                color="orange"
                @btnClicked="closePopup('SAVE')" 
              />
              <y-btn
                title="닫기"
                @btnClicked="closePopup('CLOSE')" 
              />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
              <y-select
                :width="8"
                :comboItems="comboHazardGradCdItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="유해인자분류"
                name="hazardGradCd"
                v-model="searchParam.hazardGradCd"
              >
              </y-select>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
              <y-text
              :width="8"
              ui="bootstrap"
              label="유해인자명(한글)"
              name="wkodMatNm"
              v-model="searchParam.hazardNmKo"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-4">
              <y-text
              :width="8"
              ui="bootstrap"
              label="유해인자명(영문)"
              name="wkodMatNm"
              v-model="searchParam.hazardNmEn"
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
              checkKey="hazardCd"
              :headers="gridOptions.header"
              :items="gridOptions.data"
              :checkItemData="selectHandleChemContentRow"
              height="400px"
              label="유해인자 목록"
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
  name: 'hazard-dialog',
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
        hazardGradCd: null,
        hazardNmKo: '',
        hazardNmEn: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: 300
      },
      comboHazardGradCdItems: [],
      selectHandleChemContentRow: [],
      handleChemContentRow: [],
      oldHandleChemContentRow: [],
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
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      // Url Setting
      this.searchUrl = selectConfig.hazard.list.url;
      
      this.oldHandleChemContentRow = this.popupParam.selectHandleChemContentRow;
      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '유해인자 분류', name: 'hazardGradNm', width: '25%', align: 'center' },
        { text: '유해인자명(한글)', name: 'hazardNmKo', width: '35%', },
        { text: '유해인자명(영문)', name: 'hazardNmEn', width: '35%', }
      ];

      this.getComboItems('HEA_HAZARD_CLASS'); // 작업종류
      this.getList();
    },
    // combo box list
    getComboItems (codeGroupCd) {
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, codeGroupCd);
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        this.comboHazardGradCdItems = this.$_.clone(_result.data);
        this.comboHazardGradCdItems.splice(0, 0, { 'code': null, 'codeNm': '전체' });
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    getList () {
      this.$http.url = this.searchUrl;
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
      if (data === 'CLOSE') this.handleChemContentRow = this.oldHandleChemContentRow;
      console.log(this.handleChemContentRow);
      
      this.$emit('closePopup', this.handleChemContentRow);
    },
    /** button 관련 이벤트 **/
    btnSearchClickedCallback (_result) {
      this.getList();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
