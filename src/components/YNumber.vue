<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
    <template v-if="isMetroUi">
      <v-text-field
        v-if="editable"
        :label="label"
        :name="name"
        ref="control"
        v-model.trim="vValue"
        :placeholder="placeholder"
        :append-outer-icon="icon"
        :prepend-icon="prependIcon"
        clearable
        :background-color="backgroundColor"
        :color="color"
        :outline="outline"
        :solo="solo"
        :hide-details="hideDetail"
        :hint="hint"
        :class="customClass"
        :counter="counter"
        :maxlength="maxlength"
        @input="input"
        :error="error"
        :error-messages="errorMsg"
      ></v-text-field>
      <v-text-field
        v-else
        v-model="value"
        :placeholder="value ? null : $t('message.noData')"
        :label="label"
        readonly
        ></v-text-field>
    </template>
    <template v-else>
      <b-row :class="rowClass">
        <b-col :sm="labelWidth" v-if="label!=''">
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
          :sm="width">
          <b-input-group :class="{'ic': hasAppend1, 'ic2': hasAppend2}">
            <!-- 앞쪽에 ICON을 추가해야 할 경우 -->
            <b-input-group-prepend 
              v-if="prependIcon">
              <f-icon 
                v-for="item in appendIcon"
                :key="item.icon"
                :icon="item.icon" 
                :size="item.iconSize ? item.iconSize : iconSize" 
                :style="{color: item.iconColor ? item.iconColor : iconColor, 'cursor': 'pointer'}"
                @click.stop="iconClicked(item)"
                class="mt-1 mr-1"/>
                <slot name="customPrependIcon"></slot>
            </b-input-group-prepend>
            <!-- /앞쪽에 ICON을 추가해야 할 경우 -->

            <b-form-input 
              ref="input"
              v-model.trim="vValue"
              :label="label"
              :name="name"
              :placeholder="placeholder"
              :readonly="readonly"
              :state="state"
              :size="size"
              :maxlength="maxlength"
              :disabled="disabled"
              type="text"
              @input="input">
            </b-form-input>
            
            <!-- clear icon 추가 -->
            <span  v-if="!disabled"
              class="form-control-clear form-control-feedback">
              <f-icon 
                icon="times" 
                size="sm" 
                :style="{'cursor': 'pointer', color: iconColor}"
                @click.stop="clearableClicked"
                class="mt-1"/>
            </span>
            <!-- /clear icon 추가 -->

            <!-- 컴포넌트 뒷편에 아이콘을 추가해야 할 경우 -->
            <b-input-group-append 
              v-if="appendIcon">
                <f-icon 
                  v-for="item in appendIcon"
                  :key="item.icon"
                  :icon="item.icon" 
                  :size="item.iconSize ? item.iconSize : iconSize" 
                  :style="{color: item.iconColor ? item.iconColor : iconColor, 'cursor': 'pointer'}"
                  @click.stop="iconClicked(item)"
                  class="mt-1 ml-1"/>
                  <slot name="customAppendIcon"></slot>
            </b-input-group-append>
          </b-input-group>
          <!-- 입력 길이 표시 -->
          <b-form-text 
            v-if="maxlength"
            class="mt-0 mb-1 text-right">
            {{inputInfo}}
          </b-form-text>
          <!-- /입력 길이 표시 -->
        </b-col>
        <b-col v-else>
          <span v-if="vValue">
            {{vValue}}
          </span>
          <small v-else class="text-muted"><em>데이터가 없거나 조회중 입니다.</em></small>
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import byteLength from "utf8-byte-length";
import truncateUtf8Bytes from 'truncate-utf8-bytes';

export default {
  /* attributes: name, components, props, data */
  name: 'y-number',
  $_veeValidate: {
    name () {
      return this.name;
    },
    value () {
      return this.vValue;
    }
  },
  props: {
    name: {
      type: String
    },
    ui: {
      type: String,
      default: 'metroUi',
    },
    label: {  // 부모로 부터 받아온 라벨 정보
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    // TODO : 부모로 부터 에러 메시지를 받아옴
    errorMsg: {
      type: String,
      required: false
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true
    },
    // TODO : 부모의 v-model의 값을 받아오는 속성
    value: {
      type: [Number, String],
      default: null
    },
    counter: {
      type: Number
    },
    maxlength: {
      type: Number
    },
    icon: {
      type: String
    },
    prependIcon: {
      type: [String, Array]
    },
    appendIcon: {
      type: [String, Array]
    },
    // 커스텀 클래스
    customClass: {
      type: String
    },
    hideDetail: {
      type: Boolean,
      default: false
    },
    hint: {
      type: [String, Number]
    },
    backgroundColor: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    outline: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 12
    },
    state: {
      type: Boolean,
      default: null
    },
    hasSeperator: {
      type: Boolean,
      default: true
    },
    // 단위를 앞에 표시할 경우에 단위를 prefix에 넣는다.
    prefix: {
      type: String,
      default: null
    },
    // 단위를 뒤에 표시할 경우에 단위를 prefix에 넣는다.
    suffix: {
      type: String,
      default: null
    },
    pointNumber: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'sm'
    },
     // 바이트로 제한 할 것인지 input box의 maxLength로 제한 할 것인지에 대한 구분
    limitAsByte: {
      type: Boolean,
      default: false
    },
    // b-row에 추가할 클래스
    rowClass: {
      type: String,
      default: 'mb-2'
    },
    icon: {
      type: String,
      default: ''
    },
    // 필수 입력 여부
    required: {
      type: Boolean,
      default: false
    },
    // 아이콘의 색상
    iconColor: {
      type: String,
      default: '#BDBDBD'
    },
    // 아이콘 커스텀 클래스
    customIconClass: {
      type: String,
      default: ''
    },
    // 아이콘 크기
    iconSize: {
      type: String,
      default: 'lg'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      vValue: '',
      formatOption: {}
    };
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
    limitText () {
      return this.limitAsByte ? 'byte' : '자';
    },
    inputLength () {
      return this.limitAsByte ? byteLength(this.vValue)  : this.vValue.length;
    },
    inputInfo () {
      var length = '';
      if (this.vValue) length = this.inputLength + ' / ' + this.maxlength + ' ' + this.limitText;
      else length = '0 / ' + this.maxlength + ' ' + this.limitText;
      return length;
    },
    // byte 계산
    truncValue () {
      var truncStr = this.vValue.replace(/[^-\.0-9]/g, '');
      if (!this.vValue || !truncStr) return '';
      // 소수점 표현을 하지 않거나, 소수점을 찍기 위해 .을 표시하는 경우(예: 10.)가 아니면 number 형식으로 바꿈
      if (!this.pointNumber || truncStr.lastIndexOf('.') !== truncStr.length - 1) truncStr = this.$numeral(truncStr).value().toString();
      // maxlength와 입력된 값의 byte를 비교해서 크면 입력 못하게 잘라낸다.
      if (this.maxlength && byteLength(truncStr) > this.maxlength) {
        truncStr = truncateUtf8Bytes(truncStr, this.maxlength);
      }
      return truncStr;
    },
    validateId () {
      return this.name + '_id';
    },
    validState () {
      return this.state === null ? null : this.state;
    },
    numberValue () {
      // this.formatOption.prefix = this.prefix;
      // this.formatOption.suffix = this.suffix;
      // return this.$formatNumber(this.formatOption)(this.value, { noSeparator: !this.hasSeperator });
      if (this.value != null && this.value != '')
        return this.$numeral(this.value).format(this.numberFormat);
      else 
        return this.value;
    },
    // hasSeperator, prefix, suffix, pointNumber 속성에 따라서 숫자 포맷지정
    numberFormat () {
      var format = '0';
      if (this.hasSeperator) format += ',0';
      // if (this.pointNumber) format += '[.]0';
      if (this.pointNumber) {
        var pad = '[';
        for (var i=0; i < this.pointNumber; i++) pad += '0';
        format += ('[.]' + pad + ']');
      }
      if (this.prefix) format = this.prefix + ' ' + format;
      if (this.suffix) format += format + ' ' + this.suffix;
      return format;
    },
    hasAppend1 () {
      return this.appendIcon && this.appendIcon.length === 1;
    },
    hasAppend2 () {
      return this.appendIcon && this.appendIcon.length === 2;
    }
  },
  watch: {
    // todo : 부모 v-model 값이 변경되었을 경우 바인딩
    value () {
      this.vValue = this.numberValue;
    },
    state () {
      if (this.state) {
        this.$nextTick(() => {
          $(this.$refs.input.$el).removeClass('is-valid').addClass('valid');
        });
      } else {
        this.$nextTick(() => {
          $(this.$refs.input.$el).removeClass('is-invalid').addClass('invalid');
        });
      }
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.vValue = this.value;
  },
  mounted () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  updated () {
    this.$nextTick(() => {
      // 모든 화면이 렌더링된 후 실행합니다.
      // console.log('numberValue:' + this.numberValue);
      this.vValue = this.numberValue;
    });
  },
  /* methods */
  methods: {
    input () {
      // var truncStr = this.value;
      // if (this.maxlength && byteLength(truncStr) > this.maxlength) {
      //   truncStr = truncateUtf8Bytes(truncStr, this.maxlength);
      //   // this.vValue = truncStr;
      //   // console.log(this.vValue);
      // }
      var value = this.limitAsByte ? this.truncValue : this.vValue;
      if (value != null) {
        if (typeof value == 'string') {
          value = value.replace(/[^-\.0-9]/g, '');
        }
        else {
          value = Number(value.toString().replace(/[^-\.0-9]/g, ''));
        }
      }

      // TODO : 부모에게 변경여부 전달
      this.$emit('input', value);
    },
    /**
     * iconClick시 부모에게 emit한다.
     */
    iconClicked (_item) {
      if (!_item.callbackName) {
        return window.alert('[개발자용] callback 함수명이 없습니다.');
      }
      this.$emit(_item.callbackName);
    },
    /**
     * 입력값 초기화
     */
    clearableClicked () {
      this.vValue = null;
      this.$emit('input', this.vValue);
    }
  }
};
</script>

<style scoped>
::-webkit-input-placeholder {
   font-style: italic;
   font-size: 1rem;
}
:-moz-placeholder {
   font-style: italic;
   font-size: 1rem;  
}
::-moz-placeholder {
   font-style: italic;
   font-size: 1rem;  
}
:-ms-input-placeholder {  
   font-style: italic;
   font-size: 1rem; 
}

/** todo : clear icon 추가 **/
.clear {
  padding-right: 2.25rem;
  background-repeat: no-repeat;
  background-position: center right calc(2.25rem / 4);
  background-size: calc(2.25rem / 2) calc(2.25rem / 2);
  cursor:pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23BDBDBD' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23BDBDBD' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
}
.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 34px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  pointer-events: none;
}
.form-control-clear {
    z-index: 10;
    pointer-events: auto;
    cursor: pointer;
}

/** TODO : 뒤에 icon이 한 개 일 경우 **/
.ic .form-control-clear {
  right: 24px;
}
/** TODO : 뒤에 icon이 두 개 일 경우 **/
.ic2 .form-control-clear {
  right: 48px;
}

.valid {
  border-color: #28a745;
  padding-right: 2.25rem;
}

.invalid {
  border-color: #dc3545;
  padding-right: 2.25rem;
}
</style>

