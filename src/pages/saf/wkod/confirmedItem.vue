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
                    label="유해인자" 
                    ui="bootstrap"
                    name="handleChemContent"
                    v-model="wkodMaster.handleChemContent"
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
                :disabled="!editable"
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
                :maxlength="30"
                :disabled="!editable"
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
    <y-popup :param="popupOptions"></y-popup>
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
        width: '80%',
        top: '50px',
        param: {},
        closeCallback: null
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
    this.init();
  },
  updated () {
    // this.$nextTick(function () {
    //   console.log("confirm Update : " + this.wkodMaster);
    //   this.$emit("wkodChkItem", this.wkodMaster)
    // })
  },
  mounted () {
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      console.log(this.wkodMaster.wkodStepCd);
      if (this.wkodMaster.wkodStepCd !== 'WKS01') {
        this.editable = false;
      }

      this.getWkodSpeCdsItems();
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
    openPopup () {
      this.popupOptions.param = {
        'wkodNo': this.wkodMaster.wkodNo,
        'selectHandleChemContentRow': this.wkodMaster.selectHandleChemContentRow
      };
      this.popupOptions.target = () => import(`${'./hazardDialog.vue'}`);
      this.popupOptions.title = '유해인자검색';
      this.popupOptions.visible = true;
      this.popupOptions.closeCallback = this.closePopup;
    },
    closePopup (data) {
      var i = 0;
      this.wkodMaster.selectHandleChemContentRow = data;
      this.wkodMaster.handleChemContent = '';
      this.wkodMaster.selectHandleChemContentRow.forEach(data => {
        if (i === 0) {
          i++;
          this.wkodMaster.handleChemContent = data.hazardNmKo;
        } else {
          this.wkodMaster.handleChemContent += " ," + data.hazardNmKo;
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
