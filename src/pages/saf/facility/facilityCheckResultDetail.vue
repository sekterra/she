<!--
  목적 : 설비점검결과 등록/상세
  Detail : 설비점검결과 등록/수정 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="설비점검결과 상세" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="설비점검종류"
              name="safCheckTypeNm"
              v-model="facilityCheckResultDetail.safCheckTypeNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-datepicker
                    :width="6"
                    label="설비점검일/예정일"
                    name="safFacilityCheckYmd"
                    v-model="facilityCheckResultDetail.safFacilityCheckYmd"
                  >
                  </y-datepicker>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-label :label="facilityCheckResultDetail.safFacilityCheckSchYmd"></y-label>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
              :width="8"
              :disabled="true"
              ui="bootstrap"
              label="설비유형"
              name="safFacilityTypeNm"
              v-model="facilityCheckResultDetail.safFacilityTypeNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                <b-col sm="8" md="8" lg="8" xl="8" class="col-xxl-8">
                  <y-text
                  :width="6"
                  :disabled="true"
                  ui="bootstrap"
                  label="설비코드/명"
                  name="safFacilityCd"
                  v-model="facilityCheckResultDetail.safFacilityCd"
                  >
                  </y-text>
                </b-col>
                <b-col sm="4" md="4" lg="4" xl="4" class="col-xxl-4">
                  <y-text
                  :width="12"
                  :disabled="true"
                  ui="bootstrap"
                  name="facilityNm"
                  v-model="facilityCheckResultDetail.facilityNm"
                  >
                  </y-text>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3"></b-row>
    <el-tabs type="border-card" v-model="tabIndex">
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
          <component :is="component" v-if="component" :safFacilityCheckResultNo="facilityCheckResultDetail.safFacilityCheckResultNo" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-2">
          <y-btn
              title="닫기"
              size="mini"
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
  /* attributes: name, components, props, data */
  name: 'y-facility-check-result-detail',
  props: {
    popupParam: {
      type: Object,
      default: {
        safFacilityCheckResultNo: 0, // 설비점검결과번호
        safCheckTypeCd: '', // 설비점검종류 코드
        safCheckTypeNm: '', // 설비점검종류
        safFacilityCheckYmd: '', // 설비점검일
        safFacilityCheckSchYmd: '', // 설비점검예정일
        safFacilityTypeCd: '', // 안전설비유형코드
        safFacilityTypeNm: '', // 안전설비유형명
        safFacilityCd: '', // 안전설비코드
        facilityNm: '', // 설비명
      },
    },
  },
  data: () => ({
    // TODO : 현재까지 파악된 바로는 tab은 같은 폴더 또는 하위 폴더의 컴포넌트만 접근이 가능한 것으로 파악됨
    //                즉, 반드시 메인페이지 역할을 하는 vue와 동일 폴더나 하위 폴더에 tabItem 역할을 하는 vue 파일을 위치 시킬 것
    tabItems: [
      { title: '결과', url: './facilityItemResult' },
      { title: '점검자', url: './facilityCheckInspector' },
      { title: '개선사항', url: 'imprActTab' },
      { title: '첨부파일', url: 'fileUploadPage' },
    ],
    component: null,
    tabIndex: 0,
    facilityCheckResultDetail: {
      safFacilityCheckResultNo: 0, // 설비점검결과번호
      safCheckTypeCd: '', // 설비점검종류 코드
      safCheckTypeNm: '', // 설비점검종류
      safFacilityCheckYmd: '', // 설비점검일
      safFacilityCheckSchYmd: '', // 설비점검예정일
      safFacilityTypeCd: '', // 안전설비유형코드
      safFacilityTypeNm: '', // 안전설비유형명
      safFacilityCd: '', // 안전설비코드
      facilityNm: '', // 설비명
    },
    editable: false,
    isInsert: false,
    isEdit: false,
  }),
  watch: {
    'popupParam.safFacilityCheckResultNo': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckResultNo = this.$_.clone(newValue);
    },
    'popupParam.safCheckTypeCd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safCheckTypeCd = this.$_.clone(newValue);
    },
    'popupParam.safCheckTypeNm': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safCheckTypeNm = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCheckYmd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckYmd = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCheckSchYmd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCheckSchYmd = this.$_.clone(newValue);
    },
    'popupParam.safFacilityTypeCd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityTypeCd = this.$_.clone(newValue);
    },
    'popupParam.safFacilityCd': function (newValue, oldValue) {
      this.facilityCheckResultDetail.safFacilityCd = this.$_.clone(newValue);
    },
    'popupParam.facilityNm': function (newValue, oldValue) {
      this.facilityCheckResultDetail.facilityNm = this.$_.clone(newValue);
    },
    'tabIndex': function (newValue, oldValue) {
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
    this.loadComponent();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      setTimeout(() => {
        this.facilityCheckResultDetail = this.$_.clone(this.popupParam);
        // this.checkResultDetail.safFacilityCheckSchYmd = '(점검예정일 : ' + this.facilityCheckResultDetail.safFacilityCheckSchYmd + ')';
        this.facilityCheckResultDetail.safFacilityCheckSchYmd = this.facilityCheckResultDetail.safFacilityCheckSchYmd ? '(' + this.facilityCheckResultDetail.safFacilityCheckSchYmd + ')' : '';
      }, 300);
      // Url Setting
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;

      if (path === 'fileUploadPage') this.component = () => import('@/pages/saf/imprAct/fileUploadPage');
      else if (path === 'imprActTab') this.component = () => import('@/pages/saf/imprAct/imprActTab');
      else this.component = () => import(`${path}`);
    },
    /**
     *  팝업 안 보이도록 closePopup emit
     *  팝업 close
     * data : 팝업창에서 return하는 데이터
     */
    closePopup (data) {
      this.$emit('closePopup', {});
    },
    /**
     * 수정 버튼 안보여지도록 처리
     *  버튼 http 통신 중 error 발생 callback
     * _result : error return하는 데이터
     */
    btnClickedErrorCallback (_result) {
      window.getApp.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>