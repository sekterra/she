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
              <canvas id="canvas" width="330" height="300" @click="imageClick"></canvas>
              <!-- <img src="./map.png" class="image" @click="imageClick" id="canvas"> -->
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
        wkodStepCd: '',
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
    this.init();
  },
  beforeDestroy () {
  },
  //* methods */
  methods: {
    init () {
      this.draw();
    },
    /**
     * 사용자의 입력을 받는다.
     */
    imageClick () {
      if (this.popupParam.wkodStepCd === 'WKS01') {
        this.popupParam.locatePntX = event.offsetX;
        this.popupParam.locatePntY = event.offsetY;
      }
      this.closePopup(this.popupParam);
    },
    getConfirm () {
    },
    draw () {
      const canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        
        ctx.strokeStyle = "red"; // 선색
        ctx.fillStyle = "red"; // 채우기 색
        ctx.globalAlpha = "0.7"; // 투명도
        
        ctx.beginPath();

        // 설정
        const x = this.popupParam.locatePntX; // x 좌표
        const y = this.popupParam.locatePntY; // y 좌표
        const radius = 5; // 반지름
        const startAngle = 0; // 시작각도
        const endAngle = Math.PI * 2; // 종료각도
        const anticlockwise = false; // 시계방향 or 시계반대방향
        
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        // ctx.stroke(); // 채우기 없음
        ctx.fill(); // 채우기
      }
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

#canvas { background:url('./map.png') }

</style>

