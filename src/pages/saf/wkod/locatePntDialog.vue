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
        <b-row>
          <b-col sm="12">
            <y-label label="작업위치" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card header-class="default-card" body-class="default-body-card" class="py-0">
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <img src="./map.png" class="image" @click="imageClick">
            </b-col>
          </b-row>
        </b-card>
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
        locatePntX: 0,
        locatePntY: 0
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
      }, 1000);
    },
    /**
     * 사용자의 입력을 받는다.
     */
    imageClick () {
      this.popupParam.locatePntX = event.x;
      this.popupParam.locatePntY = event.y;

      this.closePopup(this.popupParam);
    },
    getConfirm () {
    },
    closePopup (data) {
      this.$emit('closePopup', data);
    },
    /** button 관련 이벤트 **/
    /** end button 관련 이벤트 **/
  }
};
</script>

<style>

</style>
