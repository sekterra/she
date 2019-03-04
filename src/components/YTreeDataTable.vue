<!--
목적 : v-data-table을 이용한 grid 확장 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
    <template v-if="isMetroUi">
    </template>
    <template v-else>
      <div>
        <div 
          v-if="label"
          class="float-left">
          <y-label :label="label" icon="list-alt" color-class="cutstom-title-color" />
          <!-- <y-label  :label="'(' + (items ? items.length : 0) + '건)'" style="font-size:15px;" /> -->
        </div>
        <div 
          class="float-right"
          v-if="isShowBtn"
          >
          <y-btn 
            type="add"
            size="small"
            color="primary"
            icon="el-icon-edit"
          />
          <y-btn 
            type="delete"
            size="small"
            color="danger"
            icon="el-icon-delete"
          />
        </div>
        <slot name="buttonGroup">
        </slot>
      </div>
      <slot name="header">
      </slot>
      <tree-table 
      :data="items" 
      :eval-func="treeToArray" 
      :eval-args="argument" 
      :expand-all="expandAll"
      :expand-column-name="expandColumnName"
      :expand-column-width="expandColumnWidth"
      :row-class-name="tableRowClassName"
      :height="height"
      :rows="rows"
      header-cell-class-name="default-th"
      cell-class-name="default-td"
      border
      class="base-tree-table"
      @rowClicked="rowClicked"
      @rowDoubleClicked="rowDoubleClicked"
      >
        <el-table-column
          v-for="option in headers"
          header-align="center"
          :key="option.name"
          :label="option.text"
          :align="option.hasOwnProperty('align') ? option.align : ''"
          :width="option.hasOwnProperty('width') ? option.width : null"
        >
          <template slot-scope="scope">
            <el-checkbox
              v-if="option.type==='checkbox'"
              :true-label="trueLabel"
              :false-label="falseLabel"
              v-model="scope.row[option.name]"
              @change="changeCheckbox(scope.row, option, scope.row[option.name])"
            >
            {{initCheckedItem(scope.row, scope.row[option.name])}}
            </el-checkbox>
            <div
              v-else
              >
              {{scope.row[option.name]}}
            </div>
          </template>
        </el-table-column>
      </tree-table>
    </template>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'

export default {
  /* attributes: name, components, props, data, computed */
  name: 'y-tree-data-table',
  components: { 
    'tree-table': treeTable
  },
  props: {
    ui: {
      type: String,
      default: 'bootstrap'
    },
    // datatable 헤더
    headers: {
      type: Array,
      default: []
    },
    // datatable 부모 원본 데이터
    items: {
      type: Array,
      default: []
    },
    // grid 수정 여부
    editable: {
      type: Boolean,
      default: true
    },
    // row 선택용 checkbox 표시 여부
    checkable: {
      type: Boolean,
      default: false
    },
    // 화면 렌더링시 자식 노드를 모두 펼칠 것인지 여부
    expandAll: {
      type: Boolean,
      default: false
    },
    // 확장 컬럼명 : 없으면 index
    expandColumnName: {
      type: String,
      default: null
    },
    // 확장 컬럼 크기
    expandColumnWidth: {
      type: [Number, String],
      default: '200px'
    },
    // 체크박스의 true 값
    trueValue: {
      type: [String, Boolean, Number],
      default: 'Y'
    },
    dataKey: {
      type: String,
      default: ''
    },
    isShowBtn: {
      type: Boolean,
      default: false
    },
    // 테이블 라벨
    label: {
      type: String
    },
    // 그리드 높이
    height: {
      type: [String, Number],
      default: '200'
    },
    // 표시 되는 행 개수
    rows: {
      type: Number,
      default: 10
    },
  },
  data () {
    return {
      treeToArray: treeToArray,
      checkedItems: [],
      argument: [null, null, 'timeLine'],
    };
  },
  computed: {
    isMetroUi () {
      return this.ui === 'metroUi';
    },
    trueLabel () {
      var value = 'Y';
      if (typeof this.trueValue === 'number') value = 1;
      else if (typeof this.trueValue === 'boolean') value = true;
      return value;
    },
    falseLabel () {
      var value = 'N';
      if (typeof this.trueValue === 'number') value = 0;
      else if (typeof this.trueValue === 'boolean') value = false;
      return value;
    },
  },
  watch: {
    items () {
      this.checkedItems = [];
      if (!this.items) this.items = [];
    }
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
  },
  mounted () {
  },
  beforeDestroy () {
  },
  /* methods */
  methods: {
    /**
     * 부모의 체크박스 변경시 자식 노드도 같이 변경
     * _row : 이벤트가 발생된 row 데이터
     * _option : header 옵션
     * _isChecked : 체크 여부
     */
    changeCheckbox(_row, _option, _checkedValue) {
      var columnName = _option.name;
      // 체크 박스 선택 여부
      var isChecked = this.trueValue === _checkedValue;
      if (this.$_.isArray(_row)){
        this.$_.forEach(_row, (_item) => {
          _item[columnName] = _checkedValue;
          // 체크 했으면 중복된 값 확인 후 추가
          if (isChecked && !this.isDuplicatedItem(this.checkedItems, _item)) this.checkedItems.push(_item);
          // 체크를 해제 했으면 체크된 항목에서 제거
          else if(!isChecked) {
            this.$_.remove(this.checkedItems, (__item) => {
              return __item[this.dataKey] === _item[this.dataKey];
            });
          }
          if (_option.hasOwnProperty('relateColumn')) _item[_option.relateColumn] = _checkedValue;
          if (_item.hasOwnProperty('children')) this.changeCheckbox(_item.children, _option, _checkedValue, true);
        });
      } else {
        _row[columnName] = _checkedValue;
        // 체크 했으면 중복된 값 확인 후 추가
        if (isChecked && !this.isDuplicatedItem(this.checkedItems, _row)) this.checkedItems.push(_row);
        // 체크를 해제 했으면 체크된 항목에서 제거
        else if(!isChecked) {
          this.$_.remove(this.checkedItems, (__item) => {
            return __item[this.dataKey] === _row[this.dataKey];
          });
        }
        if (_option.hasOwnProperty('relateColumn')) _row[_option.relateColumn] = _checkedValue;
        if (_row.hasOwnProperty('children')) this.changeCheckbox(_row.children, _option, _checkedValue, true);
      }
    },
    /**
     * 선택된 값을 가져오면서, 하위 노드가 선택되면 상위 노드도 검색해서 가져온다.
     */
    getCheckedItems () {
      var checktedItems = this.$_.clone(this.checkedItems);
      var items = [];

      this.$_.forEach(checktedItems, (_item) => {
        if (_item.hasOwnProperty('parent')) this.getParentItem(checktedItems, _item.parent);
        if (_item.hasOwnProperty('children')) _item.children = null;
        delete _item.parent;
        delete _item.children;
      });
      return checktedItems;
    },
    /**
     * 현재 노드의 부모노드 검색
     */
    getParentItem (_checkedItems, _parent) {
      if (!this.isDuplicatedItem(_checkedItems, _parent)) _checkedItems.unshift(_parent);
      if (_parent.hasOwnProperty('parent')) this.getParentItem(_checkedItems, _parent.parent);
    },
    /**
     * 중복 노드 확인
     */
    isDuplicatedItem (_items, _addItem) {
      var hasItem = false;
      this.$_.forEach(_items, (_item) => {
        if (_item[this.dataKey] === _addItem[this.dataKey]) hasItem = true;
      });
      return hasItem;
    },
    initCheckedItem (_item, _checkedValue) {
      // 체크 박스 선택 여부
      var isChecked = this.trueValue === _checkedValue;
      if (!isChecked || this.isDuplicatedItem(this.checkedItems, _item)) return;
      this.checkedItems.push(_item);
      console.log('::::::::::::: initCheckedItem ::::::::::::::::');
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex%2 === 1) { 
        return 'odd-row';
      } else if (rowIndex%2 === 0) {
        return 'even-row';
      }
      return '';
    },
    rowClicked(row) {
      this.$emit('rowClicked', row); 
    },
    rowDoubleClicked(row) {
      this.$emit('rowDoubleClicked', row); 
    },
  }
};
</script>

<style>
.shortened {
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
}
.default-th {
  font-size:12.8px;color:#212529;background-color: #eef1f6 !important; height:40px !important;
}
.default-td {
  font-size:12px;color:#212529;
}
.default-td .cell {
  max-height:40px !important;overflow-y: auto; overflow-x: hidden;
}
.even-row {
  background-color: #FAFAFA !important;
}
.odd-row {
  background-color: white !important;
}
.selected-row {
  background-color: #a5cca5 !important;
}
.selected-row:hover  td {
  background-color: #a5cca5 !important;
}

.base-tree-table .el-table__body-wrapper{
  overflow-y: auto;
}
</style>
