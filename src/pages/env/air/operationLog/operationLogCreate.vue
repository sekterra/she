<!--
  목적 : 대기-운영일지 생성
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
        <b-row>
          <b-col sm="12">
            <y-label label="운영일지 생성 정보" icon="user-edit" color-class="cutstom-title-color" />            
            <div slot="buttonGroup" class="float-right mb-1">
              <y-btn
                v-if="editable"
                :action-url="insertUrl"
                :param="opLogResult"
                :is-submit="isCreateSubmit"
                title="생성"
                color="orange"
                action-type="post"
                beforeSubmit = "beforeCreateSubmit"
                @beforeCreateSubmit="beforeCreateSubmit"
                @btnClicked="btnCreateClickedCallback" 
                @btnClickedErrorCallback="btnClickedErrorCallback"
                />    
              <y-btn
                title="닫기"
                @btnClicked="closePopup" 
              />
            </div>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12"> 
              <y-datepicker
                :width="8"
                :editable="editable"
                label="작성일자"
                name="measureYmd"
                v-model="opLogResult.measureYmd"
                v-validate="'required'"
                :state="validateState('measureYmd')"
              />
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
  name: 'operation-log-create',
  props: {
  },
  data () {
    return {
      opLogResult: {
        measureYmd: ''
      },
      editable: true,
      isCreateSubmit: false,
      insertUrl: '',
      searchUrl: ''
    };
  },
  watch: {
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
    this.init();
  },
  methods: {
    init () {
      this.insertUrl = transactionConfig.env.air.operationLog.insert.url;
      this.searchUrl = selectConfig.env.air.operationLog.list.url;
    },
    
    closePopup () {
      this.$emit('closePopup', {});
    },
    
    beforeCreateSubmit () {      
      this.$validator.validateAll().then((_result) => {
        if (_result) {
          this.$http.url = this.searchUrl;
          this.$http.type = 'get';
          this.$http.param = {
            'measurePeriod': [this.opLogResult.measureYmd, this.opLogResult.measureYmd]
          };
          this.$http.request((__result) => {
            if (__result.data.length > 0) {
              window.getApp.$emit('ALERT', {
                title: '안내',
                message: '선택한 작성일자에 이미 대기 운영일지가 존재합니다.',
                type: 'warning',
              });
            }
            else {
              window.getApp.$emit('CONFIRM', {
                title: '확인',
                message: '대기 운영일지를 생성 하시겠습니까?',
                type: 'info',
                confirmCallback: () => {
                  this.isCreateSubmit = true;
                }
              });
            }
          }, (_error) => {
            window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
          });
        }
      }).catch(() => {
        window.getApp.$emit('APP_VALID_ERROR', '유효성 검사 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
      });
    },
    validateState (_ref) {
      if (this.veeBag[_ref] && (this.veeBag[_ref].dirty || this.veeBag[_ref].validated)) {
        return !this.errors.has(_ref);
      }
      return null;
    },

    btnCreateClickedCallback (_result) {
      this.isCreateSubmit = false;
      window.getApp.$emit('ALERT', {
        title: '안내',
        message: '대기 운영일지를 정상적으로 생성하였습니다.',
        type: 'success',
        callback: () => {
          this.$emit('closePopup', this.opLogResult);
        }
      });
    },
    btnClickedErrorCallback (_result) {
      this.isCreateSubmit = false;
      window.getApp.$emit('APP_REQUEST_ERROR', '작업 중 오류가 발생했습니다. 재시도 후 지속적인 문제 발생 시 관리자에게 문의하세요.');
    },
  }
};
</script>