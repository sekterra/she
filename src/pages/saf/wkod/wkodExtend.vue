<!--
  목적 : 작업허가서 연장 관리
  Detail : 작업허가서 완료/연장/취소 신청 화면
  *
  examples:
  *
  -->
<template>
  <b-container fluid>
    <!-- 등록 -->
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <y-label label="작업허가서 정보" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                :disabled="true"
                ui="bootstrap"
                label="작업허가No"
                name="wkodNum"
                v-model="popupParam.wkodMaster.wkodNum"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                :disabled="true"
                ui="bootstrap"
                label="작업종류"
                name="wkodKindNm"
                v-model="popupParam.wkodMaster.wkodKindNm"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                :disabled="true"
                ui="bootstrap"
                label="작업일자/시간"
                name="workTime"
                v-model="workTime"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                :disabled="true"
                ui="bootstrap"
                label="작업지역"
                name="workArea"
                v-model="workArea"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-3">
              <y-text
                :width="10"
                :maxlength="50"
                :disabled="true"
                ui="bootstrap"
                label="작업명"
                name="workTitle"
                v-model="popupParam.wkodMaster.workTitle"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <b-row>
                    <b-col sm="4">
                        <y-label 
                            label="연장시간" 
                            :required="true"
                        />
                    </b-col>
                    <b-col sm="4">
                      <y-datepicker
                        :width="12"
                        :disabled="true"
                        default="today"
                        name="workYmd"
                        v-model="popupParam.wkodMaster.workYmd"
                      >
                      </y-datepicker>
                    </b-col>
                    <b-col sm="4">
                      <y-datepicker
                        :width="12"
                        type="time"
                        name="workOverTime"
                        v-model="popupParam.wkodMaster.workOverTime"
                      >
                      </y-datepicker>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-3">
              <y-text
                :width="8"
                :maxlength="50"
                ui="bootstrap"
                label="확인자"
                name="overUserId"
                v-model="popupParam.wkodMaster.overUserNm"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="10"
                :maxlength="150"
                label="비고"
                ui="bootstrap"
                name="refRemark"
                v-model="popupParam.wkodMaster.refRemark"
              />
            </b-col>
          </b-row>
          <div class="float-right mt-3">
            <y-btn
              title="완료"
              color="blue"
            />
            <y-btn
              title="연장"
              color="orange"
            />
            <y-btn
              title="취소"
              color="red"
            />
            <y-btn
              title="닫기"
              @btnClicked="closePopup" 
            />
          </div>
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
  name: 'wkod-extend',
  props: {
    popupParam: {
      type: Object,
      default: {
        wkodMaster: {}
      },
    }
  },
  data () {
    return {
      workTime: '',
      WorkArea: ''
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.workTime = this.popupParam.wkodMaster.workYmd + " " + this.popupParam.wkodMaster.workStartTime + " ~ " + this.popupParam.wkodMaster.workEndTime;
    this.workArea = this.popupParam.wkodMaster.processNm + " / " + this.popupParam.wkodMaster.workArea;
  },
  updated () {
    // this.$nextTick(function () {
    //   console.log("confirm Update : " + this.wkodMaster);
    //   this.$emit("wkodChkItem", this.wkodMaster)
    // })
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
    },
    getList () {
    },
    closePopup (data) {
      this.$emit('closePopup', {});
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
