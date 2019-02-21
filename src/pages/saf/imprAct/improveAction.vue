<!--
  목적 : 조치부서 조치
  Detail : 개선사항 조치 화면
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
            <y-label label="조치요청 상세 정보" icon="user-edit" color-class="cutstom-title-color" />
            <div slot="buttonGroup" class="float-right mb-1">
            <y-btn
              title="확인"
              color="blue"
            />
            <y-btn
              title="저장"
              color="blue"
            />
            <y-btn
              title="닫기"
              @btnClicked="closePopup" 
            />
          </div>
          </b-col>
        </b-row>
        <b-card >
          <b-row>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-text
                :width="10"
                :disabled="true"
                ui="bootstrap"
                label="진행단계"
                name="imprStepCd"
                v-model="imprStepCd"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-text
                :width="8"
                :disabled="true"
                ui="bootstrap"
                label="업무구분"
                name="actClassCd"
                v-model="imprAct.actClassCd"
              >
              </y-text>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                    <b-col sm="3">
                        <y-label 
                            label="작성일/작성자" 
                        />
                    </b-col>
                    <b-col sm="4">
                      <y-text
                        :width="12"
                        :disabled="true"
                        ui="bootstrap"
                        name="imprRqstYmd"
                        v-model="imprAct.imprRqstYmd"
                      >
                      </y-text>
                    </b-col>
                    <b-col sm="5">
                      <y-text
                        :width="12"
                        :disabled="true"
                        ui="bootstrap"
                        name="imprRqstUserNm"
                        v-model="imprRqstUserInfo"
                      >
                      </y-text>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-6">
              <y-text
                :width="10"
                :disabled="true"
                ui="bootstrap"
                label="제목"
                name="imprTitle"
                v-model="imprAct.imprTitle"
              >
              </y-text>
            </b-col>
            <b-col sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
              <y-textarea
                :width="10"
                :disabled="true"
                label="조치 요청내용"
                ui="bootstrap"
                name="imprRqstContents"
                v-model="imprAct.imprRqstContents"
              />
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <b-row>
                    <b-col sm="4">
                        <y-label 
                            label="조치부서/조치자" 
                        />
                    </b-col>
                    <b-col sm="4">
                      <y-select
                        :width="12"
                        :comboItems="comboDeptItems"
                        :disabled="true"
                        itemText="deptNm"
                        itemValue="deptCd"
                        ui="bootstrap"
                        name="actDeptCd"
                        v-model="imprAct.actDeptCd"
                      >
                      </y-select>
                    </b-col>
                    <b-col sm="4">
                      <y-text
                        :width="12"
                        :clearable="true"
                        :disabled="true"
                        ui="bootstrap"
                        name="actUserNm"
                        v-model="imprAct.actUserNm"
                      />
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="6" md="6" lg="6" xl="6" class="col-xxl-6">
              <y-datepicker
                :width="9"
                :disabled="true"
                label="조치기한"
                type="today"
                name="workOverTime"
                v-model="imprAct.safImprActNo"
              >
              </y-datepicker>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="mt-3">
          <b-col sm="12">
            <y-label label="임시 Tab" icon="user-edit" color-class="cutstom-title-color" />
          </b-col>
        </b-row>
        <el-tabs type="border-card" v-model="tabIndex" sm="12" md="12" lg="12" xl="12" class="col-xxl-12">
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
            <component :is="component" v-if="component" :imprAct.sync="imprAct"/>
          </keep-alive>
            </el-tab-pane>
        </el-tabs>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">  
        <div class="float-right mt-3">
          <y-btn
            title="확인"
            color="blue"
          />
          <y-btn
            title="저장"
            color="red"
          />
          <y-btn
            title="닫기"
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
  name: 'improve-action',
  props: {
    popupParam: {
      type: Object,
      default: {
        safImprActNo: 0
      },
    }
  },
  data () {
    return {
      imprAct: {
        safImprActNo: '',
        imprClassCd: '',
        actClassCd: '',
        imprRqstYmd: '',
        imprTitle: '',
        imprRqstDeptCd: '',
        imprRqstDeptNm: '',
        imprRqstUserId: '',
        imprRqstUserNm: '',
        imprRqstContents: '',
        imprStepCd: '',
        refTable: '',
        refTableId: '',
        actSchYmd: '',
        actConfirmYmd: '',
        actLimitYmd: '',
        actDeptCd: '',
        actDeptNm: '',
        actUserId: '',
        actUserNm: '',
        actResultContents: '',
        actResultReview: '',
        createUserId: '',
        createDt: '',
        updateUserId: '',
        updateDt: '',
        flag: 'ACTION'
      },
      tabItems: [
        { title: '조치내용', url: './improveContent' },
        { title: '개선 전/후 사진', url: './improveImage' },
        { title: '첨부파일', url: './fileUploadPage' },
      ],
      tabIndex: 0,
      component: null,
      imprStepCd: '요청등록 => 미접수 => 조치부서 조치 => 요청부서 조치확인 => 개선완료',
      imprRqstUserInfo: '',
      immediateBeforeImage: '',
      immediateAfterImage: '',
      comboDeptItems: []
    }
  },
  watch: {
    tabIndex () {
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
    this.getDeptItems();
  },
  updated () {
    // this.$nextTick(function () {
    //   console.log("confirm Update : " + this.wkodMaster);
    //   this.$emit("wkodChkItem", this.wkodMaster)
    // })
  },
  mounted () {
    this.imprRqstUserInfo = this.imprAct.imprRqstDeptNm + " " + this.imprAct.imprRqstUserNm;
    // const _URL = window.URL || window.webkitURL;
    
    // this.immediateBeforeImage = _URL.createObjectURL('C:\\Users\\JDR\\Pictures\\image1.jpg');
    // this.immediateAfterImage = _URL.createObjectURL('C://Users//JDR//Pictures//image2.jpg');
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
    },
    getList () {
    },
    getDeptItems () {
      this.$http.url = selectConfig.manage.dept.list.url;
      this.$http.type = 'GET';
      this.$http.request((_result) => {
        _result.data.splice(0, 0, { 'deptCd': '', 'deptNm': '선택하세요' });
        this.comboDeptItems = this.$_.clone(_result.data);
      }, (_error) => {
        this.$emit('APP_REQUEST_ERROR', _error);
      });
    },
    loadComponent () {
      var path = this.tabItems[this.tabIndex].url;
      this.component = () => import(`${path}`);
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
