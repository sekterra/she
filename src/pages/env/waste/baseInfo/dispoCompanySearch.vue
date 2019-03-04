<!--
  목적 : 폐기물-폐기물 처리/운반업체 검색
  작성자 : khk
  Detail : 
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <div slot="header" >
              <y-label label="검색" />
            <div class="float-right">
              <y-btn
                title="검색"
                color="green"
                @btnClicked="btnSearchClicked"
              />
            </div>
          </div>
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-checkbox
                :width="8"
                :disabled="popupParam.dispoFreightYn!==''"
                :comboItems="dispoFreightYnItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                label="업체구분"
                name="dispoFreightYn"
                v-model="searchParam.dispoFreightYn"
                />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                ui="bootstrap"
                label="업체명"
                name="ewstDispoCoNm"                
                v-model="searchParam.ewstDispoCoNm"
                />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col sm="12">
        <b-col sm="12" class="px-0">
          <div slot="buttonGroup" class="float-right mb-1">
            <y-btn 
              title="닫기"
              @btnClicked="closePopup" 
            />
          </div>
          <y-data-table 
            ref="dataTable"
            label="폐기물 처리/운반업체 목록"
            :height="gridOptions.height"
            :headers="gridOptions.header"
            :items="gridOptions.data" 
            @selectedRow="selectedRow"
            />
          </b-col>
      </b-col>      
    </b-row>

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
export default {
  /** attributes: name, components, props, data **/
  name: 'dispo-company-search',
  props: {
    popupParam: {
      type: Object,
      default: {
        dispoFreightYn: ''
      },
    },
  },
  data () {
    return {
      searchParam: {
        useYn: 'Y',
        dispoYn: '',
        freightYn: '',
        dispoFreightYn: [],
        ewstDispoCoNm: '',
      },
      gridOptions: {
        header: [],
        data: [],
        height: '250'
      },
      dispoFreightYnItems: [],
      searchUrl: '',
    };
  },
  watch: {
    'searchParam.dispoFreightYn': function (newValue, oldValue) {
      var index = this.$_.indexOf(this.searchParam.dispoFreightYn, 'dispo');
      if (index > -1) this.searchParam.dispoYn = 'Y'
      else this.searchParam.dispoYn = '';
      index = this.$_.indexOf(this.searchParam.dispoFreightYn, 'freight');
      if (index > -1) this.searchParam.freightYn = 'Y'
      else this.searchParam.freightYn = '';
    }
  },
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
  },
  methods: {
    init () {
      var index;
      if (this.popupParam.dispoFreightYn !== '') {
        this.searchParam.dispoFreightYn.push(this.popupParam.dispoFreightYn);
        
        index = this.$_.indexOf(this.searchParam.dispoFreightYn, 'dispo');
        if (index > -1) this.searchParam.dispoYn = 'Y'
        else this.searchParam.dispoYn = '';
        index = this.$_.indexOf(this.searchParam.dispoFreightYn, 'freight');
        if (index > -1) this.searchParam.freightYn = 'Y'
        else this.searchParam.freightYn = '';
      }

      // 선택항목 설정
      setTimeout(() => {
        this.dispoFreightYnItems.push({ 'code': 'dispo', 'codeNm': '처리업체' });
        this.dispoFreightYnItems.push({ 'code': 'freight', 'codeNm': '운반업체' });
      }, 200);

      // 그리드 헤더 설정
      this.gridOptions.header = [
        { text: '처리업체', name: 'dispoYn', width: '100px', align: 'center' },
        { text: '운반업체', name: 'freightYn', width: '100px', align: 'center' },
        { text: '업체명', name: 'ewstDispoCoNm', width: '200px' },
        { text: '사업자등록번호', name: 'bizRegNo', width: '160px', align: 'center' },
        { text: '주소', name: 'addr', width: '300px' },
        { text: '담당자전화번호', name: 'telNo', width: '160px', align: 'center' },
        { text: '정렬순서', name: 'sortOrder', width: '100px', align: 'center' },
        { text: '사용여부', name: 'useYn', width: '100px', align: 'center' },
        { text: '비고', name: 'remark', width: '500px' },        
        { text: '등록일', name: 'createDt', width: '200px', align: 'center' },
        { text: '등록자', name: 'createUserNm', width: '120px', align: 'center' },
        { text: '수정일', name: 'updateDt', width: '200px', align: 'center' },
        { text: '수정자', name: 'updateUserNm', width: '120px', align: 'center' }
      ];
      
      this.searchUrl = selectConfig.env.waste.baseInfo.disposalCompany.list.url;

      this.getList();
    },

    getList () {
      this.$http.url = this.searchUrl;
      this.$http.type = 'get';
      this.$http.param = this.searchParam;
      this.$http.request((_result) => {
        this.gridOptions.data = _result.data;
      }, (_error) => {
        window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },

    btnSearchClicked () {
      this.getList();
    },
    selectedRow (data) {
      this.$emit('closePopup', { 'success': true, 'dispoCo': data });
    },
    closePopup () {
      // 부모창에 값 전달
      this.$emit('closePopup', { 'success': true });
    },
  }
};
</script>