<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  Detail :
  *
  examples:
  *
  -->
<template>
  <div>
    <template v-if="isMetroUi">
      <div>MetroUI용 컴포넌트는 준비중입니다.</div>
    </template>
    <template v-else>
      <b-row  :row="rowClass">
        <b-col :sm="labelWidth">
          <y-label
            :name="name"
            :size="size"
            :label="label"
            :icon="icon"
            :required="required"
          >
          </y-label>
        </b-col>
        <b-col 
          v-if="editable"
          :sm="width"
        >
          <!-- 좌측 선택 영역 -->
          <b-card class="main-card border">
            <b-row align-h="center" align-v="center">
              <b-col sm="12">
                <b-card-group deck>
                  <b-card 
                    no-body
                    class="card">
                    <div slot="header" class="title-height">
                      <y-text
                        :ui="ui" 
                        placeholder="검색어를 입력하세요."
                        v-model="filterText"
                      >
                      </y-text>
                    </div>
                    <div class="card-text overflow pl-2" :style="'height:' + height">
                        <y-loader
                          :is-loading="filteredOptions.length <= 0  && !needDefaultView"
                        />
                        <b-form-checkbox-group
                          stacked
                          :item-text="itemText"
                          :item-value="itemValue"
                          :size="size"
                          v-model="vValue"
                          :options="filteredOptions" />
                    </div>
                  </b-card>
                  <!-- /좌측 선택 영역 -->

                  <!-- 가운데 버튼 영역 -->
                  <div>
                    <b-row align-v="center" style="height: 100%;">
                        <b-col>
                          <b-row class="mb-2">
                            <b-col>
                              <b-button 
                                size="sm"
                                @click.stop="moveRight"
                              >
                                <f-icon icon="angle-right" />
                              </b-button>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                            <b-button 
                              size="sm"
                              @click.stop="moveLeft"
                              >
                              <f-icon icon="angle-left" />
                            </b-button>
                            </b-col>
                          </b-row>
                        </b-col>
                    </b-row>
                  </div>
                  <!-- /가운데 버튼 영역 -->

                  <!-- 우측 선택된 영역 -->
                  <b-card 
                    no-body
                    class="card">
                    <div slot="header" class="title-height">
                      <small>{{selectedTitle}}</small>
                    </div>
                    <div class="card-text overflow pl-2" :style="'height:' + height">
                      <b-form-checkbox-group 
                        stacked
                        :size="size"
                        v-model="selectedValues"
                        :options="selectedOptions"
                        />
                      </div>
                  </b-card>
                  <!-- /우측 선택된 영역 -->
                </b-card-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col v-else>
          <span v-if="text">
            {{text}}
          </span>
          <small v-else class="text-muted"><em>선택된 데이터가 없습니다.</em></small>
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 'y-shuttlebox',
  $_veeValidate: {
    name () {
      return this.name;
    },
    value () {
      return this.vValue;
    }
  },
  props: {
    ui: {
      type: String,
      default: 'bootstrap',
    },
    name: {
      type: String
    },
    label: {  // 부모로 부터 받아온 라벨 정보
      type: String,
      default: ''
    },
    // 선택된 항목에 표시될 라벨
    subLabel: {
      type: String,
      default: '선택된 항목'
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true
    },
    // TODO : 부모의 v-model의 값을 받아오는 속성
    value: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'sm'
    },
    // 컴포넌트의 너비(1~12)
    width: {
      type: Number,
      default: 12
    },
    // 부모로 부터 받아온 항목값
    items: {
      type: Array,
      default: () => []
    },
    // shuttle box 높이
    height: {
      type: String,
      default: '100px'
    },
    // b-row에 추가할 클래스
    rowClass: {
      type: String,
      default: 'mb-2'
    },
    // ITEM이 존재하지 않아도 화면에 표시해야 할 경우 true
    needDefaultView: {
      type: Boolean,
      default: false
    },
    // 여러 항목 중 화면에 text로 보여지는 정보를 가진 attribute 명(option 생성시 사용됨)
    itemText: {
      type: String,
      required: true
    },
    // 여러 항목 중 실제 값을 가져야 하는 attribute 명(option 생성시 사용됨)
    itemValue: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    // 필수 입력 여부
    required: {
      type: Boolean,
      default: false
    }
  },
  // TODO: 화살표 함수(=>)는 data에 사용하지 말 것
  //    data: () => { return { a: this.myProp }}) 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 this는 예상과 달리 Vue 인스턴스가 아니기 때문에 this.myProp는 undefined로 나옵니다.
  //    참고url: https://kr.vuejs.org/v2/api/index.html#data
  data () {
    return {
      vValue: [], // 좌측의 기준 항목에서 체크된 item
      filteredOptions: [],  // 좌측의 기준 항목에서 text filtering 된 값, text filtering 정보가 없으면 items와 동일
      selectedValues: [], // 우측의 체크박스로 선택된 항목이며, 삭제 전용이기 때문에 부모에게 전달하는 정보와 상관 없음
      selectedOptions: [],  // 우측에 표시되는 선택된 항목이며, 이 값의 value값이 부모에게 전달됨
      filterText: '',
      checkboxItems: []
    };
  },
  watch: {
    // TODO : 부모의 v-model 변경을 감시(예를 들면, db로부터 데이터를 조회 한 후 값을 바인딩 할 경우)
    value () {
      // this.init();
    },
    items () {
      // 새로 바인딩 되면서 기존에 this.vValue에 들어간 값을 초기화
      this.vValue = [];
      this.makeSelectOptions();
      this.filteredOptions = this.$_.clone(this.checkboxItems);
      // this.init();
    },
    /**
     * Text Search
     */
    filterText () {
      if (!this.filterText) return this.init();
      this.filteredOptions = this.$_.filter(this.checkboxItems, (_item) => {
        return _item.text.toLowerCase().indexOf(this.filterText.toLowerCase()) >= 0;
      });
    },
    /**
     * 선택된 값이 바뀔때 마다 부모에게 값을 전달
     */
    selectedOptions () {
      if (!this.selectedOptions || !this.selectedOptions.length) return;
      var selectedValues = this.$_.map(this.selectedOptions, 'value');
      if (this.$_.isEqual(this.value, selectedValues)) return;
      this.$emit('input', selectedValues);
    }
  },
  computed: {
    // 현재 컨트롤에 에러가 존재하는지 여부
    error () {
      return this.errorMsg && this.errorMsg.length > 0;
    },
    isMetroUi () {
      return this.ui === 'metroUi';
    },
    labelWidth () {
      var width = 12 - this.width;
      return width <= 0 ? 12 : width;
    },
    // select box에서 선택되어진 text 값
    text () {
      var selectedTexts = this.$_.map(this.selectedOptions, 'text');
      var text = selectedTexts.length ? selectedTexts.join(', ') : '';
      return text;
    },
    selectedTitle () {
      var subLabel = ' (' + this.selectedOptions.length + '개)';
      return this.subLabel + subLabel;
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    this.init();
  },
  mounted () {
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
      this.filteredOptions = this.$_.clone(this.checkboxItems);
      this.selectedOptions = this.getArrayfromValueArray(this.checkboxItems, this.value, 'value');     
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */   
    /** /Call API service **/

    /** Event, CallBack **/
    /**
     * > 버튼 클릭시, 선택된 항목으로 추가
     */
    moveRight () {
      if (!this.vValue || this.vValue.length <=0) return;
      // 1. this.option 항목중 선택된 항목만 가져옴
      var filtered = this.getArrayfromValueArray(this.checkboxItems, this.vValue, 'value');
      // 2. 선택된 항목중에서 기존에 선택된 항목을 제외한 항목을 가져와서 기존 항목과 합침
      this.selectedOptions = this.$_.concat(this.selectedOptions, this.$_.difference(filtered, this.selectedOptions));
    },
    /**
     * < 버튼 클릭시, 선택된 항목에서 제거
     */
    moveLeft () {
      if (!this.selectedValues || this.selectedValues.length <=0) return;
      this.selectedOptions = this.getArrayExceptValueArray(this.selectedOptions, this.selectedValues);
      // [참고] : 선택 목록중 일부 항목만 배열형식으로 가져오는 방법에 대한 주석
      // this.selectedValues = this.$_.map(this.selectedOptions, 'value');
    },
    /** /Event, CallBack **/
    
    /** 기타 function **/
    /**
     * 목적 : _target 배열을 기준으로 value값을 가지는 배열의 _key값이 포함 된 항목들만 filtering 해주는 함수
     *            getArrayExceptValueArray 반대 역할
     * 참고 url : https://stackoverflow.com/questions/17251764/lodash-filter-collection-using-array-of-values
     * ex) 
     * _target = [{text: a, value: 1}, {text: a, value: 2}]
     * _value = [{value, 1}]
     * _key = 'value
     * return 값 : [{text: a, value: 1}]
     */
    getArrayfromValueArray(_target, _value, _key) {
      if (!_target || !_value || _target.length < 0 || !_key) return [];
      var filtered =  this.$_(_target).keyBy(_key).at(_value).value();
      if (this.$_.includes(filtered, undefined)) {
        return [];
      }
      return filtered;
    },
    /**
     * 목적 : _target 배열을 기준으로 value값을 가지는 배열의 _key값이 포함 되지 않는 항목들만 filtering 해주는 함수
     *            getArrayfromValueArray와 반대역할
     * ex) 
     * _target = [{text: a, value: 1}, {text: a, value: 2}]
     * _value = [{value, 1}]
     * _key = 'value
     * return 값 : [{text: a, value: 2}]
     */
    getArrayExceptValueArray(_target, _value) {
      if (!_target || !_value || _target.length + _value.length === 0) return [];
      return this.$_.differenceWith(_target, _value, ({value}, _value) => {
        return value === _value;
      })
    },
    makeSelectOptions () {
      var options = [];
      if (!this.items && !this.items.length) return options;

      this.$_.forEach(this.items, (_item) => {
        options.push({
          text: _item[this.itemText],
          value: _item[this.itemValue]
        });
      });

      this.checkboxItems = options;
    }
    /** /기타 function **/
  }
};
</script>

<style scoped>
  .card {
    width: 45%;
  }
  .border {
    border: 1px dotted #0000ff;
  }
  .main-card {
    width: 100%;
  }
  .title-height {
    height: 30px;
  }
  .overflow {
    overflow-y: auto;
  }

</style>