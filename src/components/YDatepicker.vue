<!--
목적 : v-date-picker기반 datepicker 컴포넌트
Detail :
 * 주의사항 :
  - vee-validate를 사용하여 유효성 검사
  - 여기서는 컴포넌트 자체에서 발생하는 유효성을 검사
  - 부모에서는($validator.validateAll 함수 호출 시) 별도로 추가해야 함
  - 즉, 유효성 검사를 2중 체크를 하고 있으며 이는 나중에 개선해야 할 사항임
examples: 
 *  <YDatepicker 
      label="요청일*"
      name="rqstDt"
      v-model="saveData.workOrder.rqstDt"
      default="today"
      validate-type="required"
      :parentValidateCheck="validateCheck"
      >
    </YDatepicker>
-->
<template>
    <div>
      <template v-if="isMetroUi">
        <v-menu
          v-if="editable"
          ref="datePickerMenu"
          :close-on-content-click="false"
          v-model="datePickerMenu"
          :nudge-right="40"
          :return-value.sync="vValue"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="100px"
          class="mb-0"
          >
          <v-text-field
            slot="activator"
            ref="date"
            v-model="localFormattedDate"
            :label="label"
            prepend-icon="event"
            readonly
            clearable
            @click:clear="clearValue"
            :error="error"
            :error-messages="errorMsg"
            >
          </v-text-field>
          <y-date-picker
            v-model="vValue"
            @input="input"
            :name="name"
            :locale="locale"
            no-title
            scrollable
            autosave>
          </y-date-picker>
        </v-menu>
        <v-text-field
          v-else
          v-model="vValue"
          :placeholder="vValue ? null : '입력된 정보가 없습니다.'"
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
          :sm="width"
          class="fix-height">
          <datetime-picker 
            v-model="vValue"
            :width="datepickerWidth"
            :lang="krLanguage"
            :range="range"
            :type="type"
            :format="format"
            :not-before="start"
            :not-after="end"
            :clearable="clearable"
            :append-to-body="true"
            :disabled="disabled"
            input-class="inputClass"
            @input="input"
            @change="change"
            >
          </datetime-picker>
        </b-col>
      </b-row>
      </template>
    </div>
</template>

<script>
let localeMapper = require('@/locale/localeMapper.json');
import vue2Datepicker from 'vue2-datepicker';
import { isValidDate, isValidRange, isDateObejct, isPlainObject, formatDate, parseDate, throttle } from '@/js/transformBase'
import { transformDate, transformDateRange } from '@/js/transform'

// require("moment/min/locales.min");
export default {
  /* attributes: name, components, props, data */
  name: 'y-datepicker',
  components: {
    'datetime-picker': vue2Datepicker
  },
  // TODO : veeValidate error를 처리하기 위해 선언해야 하는 부분
  $_veeValidate: {
    name () {
      return this.name;
    },
    value () {
      return this.vValue;
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'date'
    },
    childValidateType: {
      type: [String, Object],
      default: null
    },
    // TODO : 부모로 부터 에러 메시지를 받아옴
    errorMsg: {
      type: String,
      required: false,
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true
    },
    // TODO : 부모의 v-model의 값을 받아오는 속성
    value: {
      type: [String, Date, Array],
      default: null
    },
    // 컴포넌트의 너비(1~12)
    width: {
      type: Number,
      default: 12
    },
    size: {
      type: String,
      default: 'sm'
    },
    // b-row에 추가할 클래스
    rowClass: {
      type: String,
      default: 'mb-2'
    },
    // 기간 선택 여부
    range: {
      type: Boolean,
      default: false
    },
    // 기본:날짜 선택, month: 월만 선택, year: 년도만 선택, time: 시간 선택
    type: {
      type: String,
      default: ''
    },
    // 날짜의 기본값
    default: {
      type: String,
      default: null
    },
    defaultPeriod: {
      type: String,
      default: '1m'
    },
    placeholder: {
      type: String,
      default: ''
    },
    datepickerWidth: {
      type: [ Number, String ],
      default: '100%'
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
    // 날짜 형식 : time이면 HH:mm(:ss)
    // format: {
    //   type: String,
    //   default: ''
    // }
    
    // 시작일
    start: {
      type: String,
      default: ''
    },
    // 종료일
    end: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      datePickerMenu: null,
      localFormattedDate: null, // TODO : 날짜 값을 표시하는 v-text-field에 표시되는 값으로 local date format 형태의 값(언어 설정 변경시 같이 변경됨)
      locale: 'ko-KR', // window.getApp.locale.datepicker
      period: [],
      vValue: null, // TODO : datepicker 내부 값, YYYY-MM-DD(ISO 표준) 형태의 값      
      vNullable: false,
      vPlaceholder: ''
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
    format () {
      if (this.type === '') return 'YYYY-MM-DD';
      else if (this.type === 'month') return 'YYYY-MM';
      else if (this.type === 'year') return 'YYYY';
      else if (this.type === 'time') return 'HH-mm-ss';
    },
    krLanguage() {
      return {
        'days': ['일', '월', '화', '수', '목', '금', '토'],
        'months': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        'pickers': ['다음 7일', '다음 30일', '이전 7일', '이전 30일'],
        'placeholder': {
          'date': this.vPlaceholder,
          'dateRange': this.vPlaceholder
        }
      }
    },
    transform () {
      const obj = this.range ? transformDateRange : transformDate
      const type = this.valueType
      if (isPlainObject(type)) {
        return { ...obj.date, ...type }
      }
      return obj[type] || obj.date
    },
  },
  watch: {
    errorMsg () {
    },
    default () {
      if (!this.default) return;
      if (this.default === 'today') {
        this.vValue = this.$comm.getToday();
        this.$emit('input', this.$comm.moment(this.vValue).format('YYYY-MM-DD'));
      }
      else {
        this.vValue = this.$comm.getCalculatedDate(this.$comm.getToday(), this.default, 'yyyy-mm-dd');
      }
    },
    vValue () {
    },
    // todo : 부모의 v-model 변경을 감시
    value () {
      this.vValue = this.value;
    },
    vPlaceholder () {      
    },
    placeholder () {
      this.vPlaceholder = this.placeholder;
    },
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount () {    
    window.getApp.$on('LOCALE_CHANGE', (_localeCode) => {
      // datepicker의 언어설정
      this.locale = localeMapper[_localeCode].datepicker;
      this.setLocalFormattedDate();
    });

    // TODO : 팝업창의 z-index가 2001이어서 강제로 z-index를 높게 지정, element-ui의 popover도 z-index가 2021임
    // $('.mx-datepicker-popup').css('z-index', '3000');
  },
  mounted () {
    if (this.range) this.vPlaceholder = '날짜 범위를 선택하세요.';
    else this.vPlaceholder = '날짜를 선택하세요.';

    if (this.type === 'year') this.vPlaceholder = '년도를 선택하세요.';
    
    // 초기값 설정
    if (!this.default) return;
    if (this.range) {
      if (this.value == null || this.value.length == 0) {
        if (this.default === 'today') {
          var f = this.$comm.getToday(); 
          var t  = this.$comm.getCalculatedDate(this.$comm.getToday(), this.defaultPeriod, 'yyyy-mm-dd');
          this.vValue = [f, t];
        }    
        else {
          var f = this.$comm.getCalculatedDate(this.$comm.getToday(), this.default, 'yyyy-mm-dd');
          var t  = this.$comm.getCalculatedDate(f, this.defaultPeriod, 'yyyy-mm-dd');
          this.vValue = [f, t];
        }
      }
      else this.vValue = this.value;
    }
    else {
      if (this.value == null || this.value == '') {
        if (this.default === 'today') {
          this.vValue = this.$comm.getToday(); 
        }    
        else {
          this.vValue = this.$comm.getCalculatedDate(this.$comm.getToday(), this.default, 'yyyy-mm-dd');
        }        
      }
      else this.vValue = this.value;
    }
    // alert(this.vValue);
    this.$emit('input', this.vValue);
  },
  beforeDestroy () {
    // TODO : remove event listener, 삭제 하지 않으면 이벤트가 중복 발생됨
    window.getApp.$off('LOCALE_CHANGE');
  },
  /* methods */
  methods: {
    input () {
      // this.$refs.datePickerMenu.save(this.vValue);
      var value = null;
      var invalidDate = false;
      if (this.range) {
        value = [];
        this.$_.forEach(this.vValue, (_item) => {
          if (_item !== null){
            // var date = this.transform.value2date(_item);
            var dateStr;
            if (this.type === 'time') {
              // dateStr = this.$comm.moment(_item).format('HH-mm-ss');
              dateStr = _item;
            }
            else
            {
              dateStr = this.$comm.moment(_item).format('YYYY-MM-DD');
            }
            value.push(dateStr);
          }
          else
          {
            invalidDate = true;
          }
        });

        if (invalidDate) value = null;
      } else {
        if (this.type === 'time') {
          // value = this.$comm.moment(this.vValue).format('HH-mm-ss');
        }
        else if (this.type === 'year')
        {
          value = this.vValue !== null ? this.$comm.moment(this.vValue).format('YYYY') : this.vValue;
        }
        else
        {
          // value = this.vValue;
          value = this.$comm.moment(this.vValue).format('YYYY-MM-DD');
        }
      }
      this.$emit('input', value);
    },
    change () {
      // 값 변경 이벤트
    },
    /**
     * delete icon 클릭시 값 초기화
     */
    clearValue () {
      this.vValue = null;
      this.localFormattedDate = null;
      this.$refs.datePickerMenu.save(this.vValue);
      this.$emit('input', this.vValue);
    },
    // locale이 변경되었을 경우 datepicker의 값 변경
    setLocalFormattedDate () {
      var dateFormat = 'L';
      if (this.locale.toLowerCase() === 'ko-kr') dateFormat = 'YYYY-MM-DD';
      this.localFormattedDate = this.$comm.moment(this.vValue).format(dateFormat);
      this.$emit('input', this.localFormattedDate);
    },
    setLocalFormattedPeriod () {
      var dateFormat = 'L';
      if (this.locale.toLowerCase() === 'ko-kr') dateFormat = 'YYYY-MM-DD';
      // console.log('this.vValue:' + JSON.stringify(this.vValue));
      this.period = [
        this.$comm.moment(this.vValue[0]).format(dateFormat),
        this.$comm.moment(this.vValue[1]).format(dateFormat),
      ];
      // const date = this.transform.value2date(this.vValue, this.format);
      // console.log('date:' + JSON.stringify(date));
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

<style lang="scss">
.inputClass {
  display: inline-block;
  width: 100%;
  height: 31px;
  max-height: 31px;
  // padding: 6px 30px;
  padding: 0px 30px;
  padding-left: 10px;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  &:disabled,
  &.disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }
}
.fix-height {
  height: 31px;
}
</style>


