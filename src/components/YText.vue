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
        v-model="vValue"
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
        <b-col :sm="labelWidth" v-if="label!=''" >
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
          <b-input-group>
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
              v-model.trim="vValue"
              :label="label"
              :name="name"
              :placeholder="placeholder"
              :size="size"
              :state="state"
              :maxlength="maxlength"
              :disabled="disabled"
              @input="input">
            </b-form-input>
            <!-- clearable -->
            <b-input-group-append v-if="clearable">
              <f-icon 
                icon="times" 
                :size="iconSize" 
                :style="{'cursor': 'pointer', color: iconColor}"
                @click.stop="clearableClicked"
                class="mt-1 ml-1"/>
            </b-input-group-append>
            <!-- clearable -->
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
            <!-- /컴포넌트 뒷편에 아이콘을 추가해야 할 경우 -->
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
  name: 'y-text',
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
    // b-col에 추가할 클래스
    // colClass: {
    //   type: String,
    //   default: ''
    // },
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
    }
  },
  data () {
    return {
      vValue: ''
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
    truncValue () {
      var truncStr = this.vValue;
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
    hasCustomIconClass () {
      return !this.customIconClass
    }
  },
  watch: {
    // todo : 부모 v-model 값이 변경되었을 경우 바인딩
    value () {
      this.vValue = this.value;
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
      this.vValue = this.value;
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
      this.vValue = '';
      this.$emit('input', this.vValue);
    }
  }
};
</script>

<style>
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
</style>
