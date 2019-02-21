<!--
  목적 : 작업허가서 확인 항목
  Detail : 작업허가서 확인항목 Tab
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row class="mt-3">
      <b-col sm="12">
        <b-card >
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <b-row>
                <b-col sm="8">
                  <y-textarea
                    :width="9"
                    :maxlength="150"
                    :disabled="true"
                    label="취급물질" 
                    :required="true"
                    ui="bootstrap"
                    name="handleChemContent"
                    v-model="wkodMaster.handleChemContent"
                    v-validate="'required'"
                    :state="validateState('handleChemContent')"
                  />
                </b-col>
                <b-col sm="4">
                  <y-btn
                      v-if="editable"
                      title="추가/삭제"
                      @btnClicked="openPopup()" 
                  />
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12 mb-3">
              <y-checkbox
                :width="10"
                :comboItems="wkodSpeCdsItems"
                itemText="codeNm"
                itemValue="code"
                ui="bootstrap"
                name="wkodSpeCdsItems"
                label="보호구"
                v-model="wkodMaster.wkodSpeCds"
                />
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-text
                :width="10"
                :maxlength="50"
                ui="bootstrap"
                label="보호구 기타"
                name="spmEtc"
                v-model="wkodMaster.spmEtc"
                >
              </y-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
    <el-dialog
      :title="popupOptions.title"
      :visible.sync="popupOptions.visible"
      :fullscreen="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :width="popupOptions.width"
      :height="popupOptions.height"
      :top="popupOptions.top">
      <component :is="popupOptions.target" :popupParam="popupOptions.param" @closePopup="closePopup" />
    </el-dialog>

  </b-container>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';
export default {
  /* attributes: name, components, props, data */
  name: 'confirmed-item',
  props: {
    wkodMaster: {
      type: Object,
      default: {
        wkodNo: '',
        wkodStepCd: '',
        handleChemContent: '',
        spmEtc: '',
        wkodSpeCds: [],
        selectHandleChemContentRow: []
      },
    },
  },
  data () {
    return {
      popupOptions: {
        target: null,
        title: '',
        visible: false,
        width: '40%',
        top: '50px',
        param: {}
      },
      searchUrl: '',
      editable: true,
      wkodSpeCdsItems: []
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.getWkodSpeCdsItems();
  },
  updated () {
    // this.$nextTick(function () {
    //   console.log("confirm Update : " + this.wkodMaster);
    //   this.$emit("wkodChkItem", this.wkodMaster)
    // })
  },
  mounted () {
    if (this.wkodMaster.wkodStepCd !== 'WKS01') {
      this.editable = false;
    }
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
    },
    getList () {
    },
    getWkodSpeCdsItems () {
      // 판정 항목 조회
      this.$http.url = this.$format(selectConfig.codeMaster.getSelect.url, 'SAF_WKOD_SPE');
      this.$http.type = 'get';
      this.$http.request((_result) => {
        this.wkodSpeCdsItems = _result.data;
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    validateState (ref) {
      if (this.veeBag[ref] && (this.veeBag[ref].dirty || this.veeBag[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    },
    openPopup () {
      this.popupOptions.param = {
        'wkodNo': this.wkodMaster.wkodNo,
        'selectHandleChemContentRow': this.wkodMaster.selectHandleChemContentRow
      };
      this.popupOptions.target = () => import(`${'./wkodMatMstDialog.vue'}`);
      this.popupOptions.title = '취급물질검색';
      this.popupOptions.visible = true;
    },
    closePopup (data) {
      var i = 0;
      this.wkodMaster.selectHandleChemContentRow = data;
      this.wkodMaster.handleChemContent = '';
      this.wkodMaster.selectHandleChemContentRow.forEach(data => {
        if (i === 0) {
          i++;
          this.wkodMaster.handleChemContent = data.wkodMatNm;
        }
        else
        {
          this.wkodMaster.handleChemContent += " ," + data.wkodMatNm;
        }
      });
      this.popupOptions.target = null;
      this.popupOptions.visible = false;
    },
    btnSearchClickedCallback (_result) {
      // this.getList();
      // window.getApp.$emit('APP_REQUEST_SUCCESS', '조회 버튼이 클릭되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      // this.$emit('APP_REQUEST_ERROR', _result);
    }
  }
};
</script>

<style>

</style>
