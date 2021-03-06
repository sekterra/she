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
      <v-card :flat="flat">
        <v-toolbar card dense color="grey lighten-3">
          <v-toolbar-title class="subheading">{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn 
            v-if="createUrl"
            icon
            small
            color="indigo lighten-3"
            @click.prevent="moveCreatePage">
            <v-icon color="white">add</v-icon>
          </v-btn>
          <v-btn 
            v-if="excelDown"
            icon
            small
            color="indigo lighten-3"
            @click.prevent="moveCreatePage">
            <v-icon color="white">save_alt</v-icon>
          </v-btn>
          <v-btn 
            v-if="print"
            icon
            small
            color="indigo lighten-3"
            @click.prevent="moveCreatePage">
            <v-icon color="white">print</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
        <v-data-table
          v-model="selected"
          ref="datatable"
          :headers="headers"
          :items="datatableItems"
          :search="search"
          :pagination.sync="pagination"
          :loading="loading"
          :select-all="gridType === 'checkbox'"
          :item-key="itemKey"
          hide-actions
          class="elevation-0"
        >
          <!-- slot=headerCell 옵션 확인 필요 -->
          <template slot="headers" slot-scope="props">  
            <tr>
              <th v-if="gridType === 'checkbox'">
                <v-checkbox
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  color="indigo"
                  hide-details
                  @click.native="toggleAll"
                ></v-checkbox>
              </th>
              <th v-else-if="gridType"></th>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.name === pagination.sortBy ? 'active' : '']"
                @click.prevent="changeSort(header.name)"
              >
                <v-icon small v-if="header.hasOwnProperty('sortable') ? header.sortable : true">arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <!-- TODO : 아래 props.selected = !props.selected가 들어가야 checkbox가 정상적으로 작동 -->
            <tr :active="props.selected" @click.prevent="gridType === 'checkbox' ? props.selected = !props.selected : ''">
              <td v-if="gridType === 'checkbox'">
                <v-checkbox
                  :input-value="props.selected"
                  :indeterminate="props.indeterminate"
                  color="indigo lighten-3"
                  hide-details />
              </td>
              <td v-else-if="gridType === 'edit' && editable">
                <v-btn
                  small 
                  icon
                  outline
                  color="indigo lighten-3"
                  :loading="props.selected"
                  @click.prevent="editItem(props);"
                >
                  <v-icon
                    small
                    v-if="!props.selected">
                  edit
                  </v-icon>
                  <v-icon v-else>
                    block
                  </v-icon>
                </v-btn>
              </td>
              <td v-else-if="gridType === 'radio'">
                <v-btn
                  small 
                  icon
                  outline
                  color="indigo lighten-3"
                  @click.prevent="selectedData(props.item)"
                >
                  <v-icon small>done</v-icon>
                </v-btn>
              </td>
              <td
                v-for="header in headers" :key="header.text"
                :class="header.hasOwnProperty('align') ? 'text-xs-' + header.align : ''"
              >
                <v-switch 
                  color="success"
                  v-if="items.length > 0 && editable && header.type === 'radio'"
                >
                </v-switch>
                <v-btn
                  v-if="items.length > 0 && editable && header.type === 'delete'"
                  small 
                  icon
                  outline
                  color="red lighten-3"
                  :loading="props.selected"
                  @click.prevent="deleteItem(props);"
                >
                  <v-icon
                    small
                    v-if="!props.selected">
                  delete
                  </v-icon>
                  <v-icon v-else>
                    block
                  </v-icon>
                </v-btn>
                <v-text-field
                  v-else-if="items.length > 0 && editable && header.type === 'text'"
                >
                </v-text-field>
                <v-chip 
                  v-if="items.length > 0 && header.type === 'process'"
                  label 
                  small 
                  :color="props.item.color" text-color="white" >
                  {{ props.item.colorTitle }}
                </v-chip>
                <span v-else-if="items.length > 0" class="shortened">
                  {{props.item[header.name]}}
                </span>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination  
            v-model="pagination.page" 
            :length="pages"
            :total-visible="pagingSize"
            color="indigo lighten-3"
            circle
          ></v-pagination>
        </div>
        <v-divider></v-divider>
      </v-card-text>
    </v-card>
    </template>
    <template v-else>
    <div>
        <div 
          v-if="label"
          class="float-left">
          <y-label :label="label" icon="list-alt" color-class="cutstom-title-color" />
          <y-label :label="'(' + (datatableItems ? datatableItems.length : 0) + '건)'" style="font-size:15px;" />
          <y-label v-if="messageCheck" :label="'*' + message + ''" style="font-size:15px; color:red" />
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
      <el-table
        ref="datatable"
        :data="datatableItems"
        :stripe="rowStripe"
        :border="true"
        header-cell-class-name="default-th"
        cell-class-name="default-td"
        style="width: 100%; min-height: 300px;"
        :height="height"
        :rows="rows"
        :row-class-name="tableRowClassName"
        :span-method="onSpanMethod"
        @selection-change="selectionChanged"
        @current-change="currentChanged"
        @row-click="selectedRow"
        @row-dblclick="rowDoubleClicked"
        @expand-change="expandChange"
        >        
        <!-- :highlight-current-row="true" 선택된 행 표시가 가능하나. 좀 더 명확하도록 변경함 -->
        <!-- check box 등 컨트롤이 추가되는 영역 -->        
        <slot name="selection"></slot>   
        <!-- <el-table-column type="index" label="No" width="55" align="center"></el-table-column> -->
        <el-table-column v-if="useRownum" label="No" width="55" align="center">
          <template slot-scope="scope">
            <div>{{datatableItems.indexOf(scope.row) + 1}}</div>
          </template>
        </el-table-column>
        <slot name="expand"></slot>
        <el-table-column
          v-for="(header, index) in headers"
          :key="header.name + '_' + index"
          :prop="header.name"
          :label="header.text"
          :min-width="header.width"
          :align="header.align"
          :sortable="!header.hasOwnProperty('sortable') || header.sortable "
          :fixed="header.fixed"
          :header-align	="header.hasOwnProperty('headerAlign') ? header.headerAlign : headerAlign"
          class-name="default-td"
        >        
          <template slot-scope="scope">
              <el-button 
                v-if="header.url"
                type="text" 
                size="small"
                @click.stop="linkClicked(header, scope.row)"
                >
                {{scope.row[header.name]}}
              </el-button>
              <div
                class="cell"
                v-else-if="header.type && header.type.toLowerCase() === 'link'"
                type="text" 
                size="small"
                @click.stop="linkClicked(header, scope.row)"
                >
                <a href="#" style="text-decoration:none;">{{scope.row[header.name]}}</a>               
              </div>
              <y-text
                v-else-if="header.type && header.type.toLowerCase() === 'text'"
                :editable="editable"
                rowClass=""
                ui="bootstrap"
                v-model="scope.row[header.name]"
                />
              <y-textarea
                v-else-if="header.type && header.type.toLowerCase() === 'textarea'"
                :editable="editable"
                :rows="2"
                rowClass=""
                ui="bootstrap"
                v-model="scope.row[header.name]"
              />
              <y-number
                v-else-if="header.type && header.type.toLowerCase() === 'number'"
                :editable="editable"
                :pointNumber="header.pointNumber ? header.pointNumber : 0"
                :hasSeperator="header.hasSeperator ? header.hasSeperator : false"
                rowClass=""
                ui="bootstrap"
                v-model="scope.row[header.name]"
                />
              <y-datepicker
                v-else-if="header.type && header.type.toLowerCase() === 'datepicker'"
                :editable="editable"
                :range="header.range ? header.range : false"
                :default="header.default ? header.default : 'today'"
                label=""
                rowClass=""
                ui="bootstrap"
                :datepickerWidth="header.width - 10"
                v-model="scope.row[header.name]"
                />
              <y-select
                v-else-if="header.type && header.type.toLowerCase() === 'select'"
                :editable="editable"
                :comboItems="header.items ? header.items : []"
                :itemText="header.itemText ? header.itemText : ''"
                :itemValue="header.itemValue ? header.itemValue : ''"
                :hasBottomMargin="false"
                rowClass=""
                size="sm"
                ui="bootstrap"
                v-model="scope.row[header.name]"
                />
              <y-radio
                v-else-if="header.type && header.type.toLowerCase() === 'radio'"
                :editable="editable"
                :comboItems="header.items ? header.items : []"
                :itemText="header.itemText ? header.itemText : ''"
                :itemValue="header.itemValue ? header.itemValue : ''"
                :hasBottomMargin="false"
                rowClass=""
                ui="bootstrap"
                v-model="scope.row[header.name]"
                />
              <y-checkbox
                v-else-if="header.type && header.type.toLowerCase() === 'checkbox'"
                :editable="editable"
                :comboItems="header.items ? header.items : []"
                :itemText="header.itemText ? header.itemText : ''"
                :itemValue="header.itemValue ? header.itemValue : ''"
                :hasBottomMargin="false"
                :use-default="header.useDefault ? header.useDefault : false"
                rowClass=""
                ui="bootstrap"
                v-model="scope.row[header.name]"
                />
                <y-switch
                  v-else-if="header.type && header.type.toLowerCase() === 'switch'"
                  :editable="editable"
                  :true-value="header.trueValue ? header.trueValue : 'Y'"
                  :false-value="header.falseValue ? header.falseValue : 'N'"
                  ui="bootstrap"
                  :selectText="header.selectText ? header.selectText : '사용'"
                  :unselectText="header.unselectText ? header.unselectText : '미사용'"
                  rowClass=""
                  v-model="scope.row[header.name]"
                  />
                <b-form-checkbox
                  v-else-if="header.type && header.type.toLowerCase() === 'singlecheckbox'"
                  value="Y"
                  unchecked-value="N"
                  v-model="scope.row[header.name]"
                />
              <div v-else class="cell">
                <span v-if="header.textCalculate"
                  v-html="header.textCalculate(scope.row, header.name)">
                </span>
                <span v-else>
                  {{scope.row[header.name]}}
                </span>                
              </div>

            </template>
          <el-table-column
              v-for="_header in header.child"
              :key="_header.name"
              :prop="_header.name"
              :label="_header.text"
              :min-width="_header.width"
              :align="_header.align"
              :sortable="!_header.hasOwnProperty('sortable') || _header.sortable"
              show-overflow-tooltip
              :header-align	="_header.hasOwnProperty('headerAlign') ? _header.headerAlign : headerAlign"
              >
              <template  slot-scope="scope">
                <el-button 
                  v-if="_header.url"
                  type="text" 
                  size="small"
                  @click.stop="linkClicked(_header, scope.row)"
                  >
                  {{scope.row[_header.name]}}
                </el-button>
                <div
                  class="cell"
                  v-else-if="_header.type && _header.type.toLowerCase() === 'link'"
                  type="text" 
                  size="small"
                  @click.stop="linkClicked(_header, scope.row)"
                  >
                  <a href="#" style="text-decoration:none;">{{scope.row[_header.name]}}</a>               
                </div>
                <y-text
                  v-else-if="_header.type && _header.type.toLowerCase() === 'text'"
                  :editable="editable"
                  rowClass=""
                  ui="bootstrap"
                  v-model="scope.row[_header.name]"
                  />
                <y-number
                  v-else-if="_header.type && _header.type.toLowerCase() === 'number'"
                  :editable="editable"
                  :pointNumber="_header.pointNumber ? _header.pointNumber : 0"
                  :hasSeperator="header.hasSeperator ? header.hasSeperator : false"
                  rowClass=""
                  ui="bootstrap"
                  v-model="scope.row[_header.name]"
                  />
                <y-datepicker
                  v-else-if="_header.type && _header.type.toLowerCase() === 'datepicker'"
                  :editable="editable"
                  :range="_header.range ? _header.range : false"
                  :default="_header.default ? _header.default : 'today'"
                  label=""
                  ui="bootstrap"
                  v-model="scope.row[_header.name]"
                  />
                <y-select
                  v-else-if="_header.type && _header.type.toLowerCase() === 'select'"
                  :editable="editable"
                  :comboItems="_header.items ? _header.items : []"
                  :itemText="_header.itemText ? _header.itemText : ''"
                  :itemValue="_header.itemValue ? _header.itemValue : ''"
                  ui="bootstrap"
                  v-model="scope.row[_header.name]"
                  />
                <span v-else-if="_header.type && _header.type.toLowerCase() === 'select'">{{_header.items}}</span>
                <y-radio
                  v-else-if="_header.type && _header.type.toLowerCase() === 'radio'"
                  :editable="editable"
                  :items="_header.items ? _header.items : []"
                  :itemText="_header.itemText ? _header.itemText : ''"
                  :itemValue="_header.itemValue ? _header.itemValue : ''"
                  ui="bootstrap"
                  v-model="scope.row[_header.name]"
                  />
                <y-checkbox
                  v-else-if="_header.type && _header.type.toLowerCase() === 'checkbox'"
                  :editable="editable"
                  :items="_header.items ? _header.items : []"
                  :itemText="_header.itemText ? _header.itemText : ''"
                  :itemValue="_header.itemValue ? _header.itemValue : ''"
                  :use-default="_header.useDefault ? _header.useDefault : false"
                  ui="bootstrap"
                  v-model="scope.row[_header.name]"
                  />
                  <y-switch
                  v-else-if="_header.type && _header.type.toLowerCase() === 'switch'"
                  :editable="editable"
                  :true-value="_header.trueValue ? _header.trueValue : 'Y'"
                  :false-value="_header.falseValue ? _header.falseValue : 'N'"
                  ui="bootstrap"
                  :selectText="_header.selectText ? _header.selectText : '사용'"
                  :unselectText="_header.unselectText ? _header.unselectText : '미사용'"
                  v-model="scope.row[_header.name]"
                  />
                  <b-form-checkbox
                    v-else-if="header.type && header.type.toLowerCase() === 'singlecheckbox'"
                    value="Y"
                    unchecked-value="N"
                    v-model="scope.row[header.name]"
                  />
                <div v-else class="cell">
                  {{scope.row[_header.name]}}
                </div>
              </template>
              <el-table-column
                v-for="__header in _header.child"
                :key="__header.name"
                :prop="__header.name"
                :label="__header.text"
                :min-width="__header.width"
                :align="header.align"
                :sortable="!__header.hasOwnProperty('sortable') || __header.sortable "
                show-overflow-tooltip
                :header-align	="header.hasOwnProperty('headerAlign') ? header.headerAlign : headerAlign"
              >
            </el-table-column>   
          </el-table-column>  
        </el-table-column>
      </el-table>
      <y-pagination
        v-if="usePaging"
        ref="pagination"
        :page-size="rows"
        :page.sync="listQuery.page" 
        :limit.sync="listQuery.limit" 
        @pagination="getList"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </y-pagination>
    </template>
    <!-- <div>datatable: {{itemsString}}</div> -->
  </div>
</template>

<script>
import YPagination from '@/components/YPagination'; // Secondary package based on el-pagination
import { spanRow } from 'element-ui-table-span-method'

export default {
  /* attributes: name, components, props, data, computed */
  name: 'y-data-table',
  components: { YPagination },
  props: {
    title: {
      type: String,
      default: 'Grid'
    },
    // grid 헤더
    headers: {
      type: Array
    },
    // grid item
    items: {
      type: Array
    },
    // grid 수정 여부
    editable: {
      type: Boolean,
      default: true
    },
    rowsPerPage: {
      type: Number,
      default: 10
    },
    pagingSize: {
      type: Number,
      default: 5
    },
    createUrl: {
      type: String,
      default: ''
    },
    popupCallback: {
      type: String,
      default: ''
    },
    // 그리드 타입(radio, checkbox)
    gridType: {
      type: String,
      default: ''
    },
    itemKey: {
      type: String,
      default: ''
    },
    flat: {
      type: Boolean,
      default: false
    },
    excelDown: {
      type: Boolean,
      default: false
    },
    print: {
      type: Boolean,
      default: false
    },
    // TODO : 신규 속성
    // 행 색상 구분 여부
    rowStripe: {
      type: Boolean,
      default: false
    },
    // header text align 속성
    headerAlign: {
      type: String,
      default: 'center'
    },
    // 테이블 라벨
    label: {
      type: String
    },
    isShowBtn: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    // 그리드 높이
    height: {
      type: [String, Number],
      default: '300'
    },
    // 표시 되는 행 개수
    rows: {
      type: Number,
      default: 20
    },
    // 페이징 표시 여부
    usePaging: {
      type: Boolean,
      default: false
    },
    useRownum: {
      type: Boolean,
      default: true
    },
    // el-table-column selection 관련 데이터 체크
    checkItemData: {
      type: Array
    },
    checkKey: {
      type: String,
      default: ''
    },
    spanOptions: {
      type: Array
    },
    // merge 관련
    mergeColumns: {
      type: Array,
      default: () => []
      // { colName: 'col3', key: ['col1', 'col2'...]}, key 를 기준으로 colName 의 내용이 같으면 병합 함.
    },    
    // 테이블 라벨 이후 추가 메세지 여부
    messageCheck: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: ''
    },
    // TODO : 페이징 사이즈를 설정할 필요가 있을지 몰라서 일단 주석처리
    // pageSizes: {
    //   type: Array,
    //   default: () => [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    // }
  },
  data () {
    return {
      search: '',
      selected: [],
      loading: true,
      pagination: {
        // rowsPerPage: this.rowsPerPage
        sortBy: 'name',
        page: 1
      },
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      check: true,
      radioGroup: 1,
      itemData: [],
      multipleSelection: [],
      singleSelection: null,
      page: 1,
      datatableItems: null,
      mergeData: []
    };
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
    isMetroUi () {
      return this.ui === 'metroUi';
    },
    labelWidth () {
      var width = 12 - this.width;
      return width <= 0 ? 12 : width;
    },
    // height () {
    //   var headerHeight = 55;
    //   var rowHeight = 44;
    //   var border = 1;
    //   return headerHeight + (rowHeight * this.rows) + border;
    // },
    itemsString () {
      return JSON.stringify(this.items);
    },
    // 전체 데이터 수
    total () {
      return this.items ? this.items.length : 0;
    }
  },
  watch: {
    items (val, oldval) {
      // TODO : totalItems가 업데이트 되지 않는데 bug인지 이유는 잘 모르겠음
      // [bug fix] : 페이지가 처음 로딩시 그리드 데이터가 바인딩되었는데도, pagination이 표현 안되는 현상 발생했으나
      //                  우연히 totalItems를 강제로 할당해주니 표시가 됨(이유는 모름)
      // TODO : vuetify 소스
      // this.pagination.totalItems = this.items.length;
      // this.itemData = [this.items.length];
      // this.hideLoading();
      this.getList();
    },
    checkItemData () {
      if (this.checkItemData !== undefined){
        this.datatableItems.forEach(row => {
          this.checkItemData.forEach(selectRow => {
            if (row[this.checkKey] === selectRow[this.checkKey]) {
              this.$refs.datatable.toggleRowSelection(row);
            }
          })
        });
      }
    },
    datatableItems () {
      this.createMergeData();
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount () {
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    Object.assign(this.$data, this.$options.data());
    this.getList();
  },
  mounted () {
    // Selection - 초기 데이터가 셋팅 되어 있는 상황에서 화면 띄워줄시 체크 박스 셋팅
    if (this.checkItemData !== undefined){
      this.datatableItems.forEach(row => {
        this.checkItemData.forEach(selectRow => {
          if (row[this.checkKey] === selectRow[this.checkKey]) {
            this.$refs.datatable.toggleRowSelection(row);
          }
        })
      });
    }
    this.createMergeData();
  },
  beforeDestroy () {
  },
  /* methods */
  methods: {
    editItem (_prop) {
      this.$emit('editItem', _prop.item);
      _prop.selected = !_prop.selected;
      setTimeout(() => { _prop.selected = false }, 1000);
    },
    deleteItem (_prop) {
      // this.$emit('APP_ON_READY');
    },
    moveCreatePage () {
      if (this.createUrl) this.$comm.movePageReplace(this.$router, this.createUrl);
      else {
        if (this.popupCallback) this.$emit(this.popupCallback);
      }
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    /**
     * datatable에서 선택된 정보를 eventBus로 부모로 넘긴다.
     *  - datatable.vue > list.vue > popup.vue > create.vue
     */
    selectedData (_item) {
      // var $obj = $(_obj)
      // if ($obj.is(':checked')) this.$emit('selectedData', _item)
      this.$emit('selectedData', _item);
    },
    /**
     * datatable에서 선택된 정보를 부모에 넘긴다.
     */
    getCheckedData () {
      return this.selected.slice();
    },
    toggleAll () {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    clearSelected () {
      this.selected = [];
    },
    selectedRow (row, event, column) {
      var clickTarget = event.target;
      var table = null;
      var tr = null;
      var elements = [];
      if (clickTarget.tagName === 'DIV')
      {
        table = clickTarget.parentElement.parentElement.parentElement.parentElement;
        tr = clickTarget.parentElement.parentElement.parentElement;
        if (tr.nodeName !== 'TR') return;


        elements = table.getElementsByClassName("selected-row");
        this.$_.forEach(elements, (element) => {
          element.classList.remove("selected-row");
        });

        tr.classList.add("selected-row");
      }
      else if (clickTarget.tagName === 'TD') // 간혹 td로 잡히는 경우가 발생
      {
        table = clickTarget.parentElement.parentElement;
        tr = clickTarget.parentElement;
        if (tr.nodeName !== 'TR') return;

        elements = table.getElementsByClassName("selected-row");
        this.$_.forEach(elements, (element) => {
          element.classList.remove("selected-row");
        });

        tr.classList.add("selected-row");
      }
      this.$emit('selectedRow', this.singleSelection); 
    },
    rowDoubleClicked () {
      this.$emit('rowDoubleClicked', this.singleSelection); 
    },
    expandChange (row, expandedRows) {
      this.$emit('expandChange', row, expandedRows);
    },
    tableRowClassName ({row, rowIndex}) {
      var returnText = '';
      if (rowIndex%2 === 1) { 
        returnText = 'odd-row';
      } else if (rowIndex%2 === 0) {
        returnText = 'even-row';
      }

      return returnText;
    },
    selectionChanged (val) {
      this.multipleSelection = val;
      this.$emit('input', this.multipleSelection);
      this.$emit('selectionChanged', this.multipleSelection);
    },
    currentChanged (val) {      
      this.singleSelection = val;
      this.$emit('currentChanged', this.singleSelection); 
    },
    getDatatableItems () {
      return this.items;
    },
    /**
     * 링크 정보를 클릭했을 때
     */
    linkClicked (_header, _row) {
      this.$emit('tableLinkClicked', _header, _row);
      // TODO : 페이지 이동은 준비중
    },
    /**
     * 페이징 크기 변경
     */
    handleSizeChange (val) {
      console.log(`${val} items per page`);
    },
    /**
     * 현재 페이지 변경
     */
    handleCurrentChange (val) {
      console.log(`current page: ${val}`);
    },
    getList () {
      if (this.usePaging) {
        setTimeout(() => {
          var page = this.listQuery.page || 1;
          var perPage = this.listQuery.limit;
          var offset = (page - 1) * perPage;
          this.datatableItems = this.$_.drop(this.items, offset).slice(0, perPage);
        }, 100);
      }
      else this.datatableItems = this.items;
    },
    onSpanMethod ({ row, column, rowIndex, columnIndex }) {
      // console.log(':::::::::::::::::: onSpanMethod :::::::::::::::::::::');
      if (!this.spanOptions) return;
      var options = { row, column, rowIndex, columnIndex }
      // return spanRow({ row, column, rowIndex, columnIndex }, this.datatableItems, this.spanOptions)
      return spanRow(options, this.datatableItems, this.spanOptions)
    },    
    mergeMethod ({ row, column, rowIndex, columnIndex }) {
      var ret = null;
      this.$_.forEach(this.mergeColumns, (mergeItem) => {
        var findData = this.$_.find(this.mergeData, { 'colName': column['property'], 'rowIndex': rowIndex });
        if (findData) {
          // console.log('------------>log' + JSON.stringify(findData));
          ret ={ rowspan: findData.span, colspan: 1 };
        }
      });

      if (ret != null) return ret;
    },
    createMergeData () {
      this.mergeData = [];      
      var def = { 'colName': '', 'key': [] };
      var data ={ 'colName': '', 'rowIndex': 0, 'span': 0 };       
      if (this.mergeColumns.length === 0) return;
      else {
        // loop 를 통한 병합 데이터 생성
        this.$_.forEach(this.mergeColumns, (mergeItem) =>{
          var mergeColumn = this.$_.assign(def, mergeItem);
          var selIndex = -1;
          var selData = null;
          for (var i = 0; i < this.datatableItems.length; i++) {
            this.mergeData.push(this.$_.clone(data));
            this.mergeData[this.mergeData.length - 1].colName = mergeColumn.colName;
            this.mergeData[this.mergeData.length - 1].rowIndex = i;

            var isLike = false;
            var item = this.datatableItems[i];
            var nextItem = {};
            if (this.datatableItems.length - 1 === i) nextItem[mergeColumn.colName] = '#{NONE}';
            else nextItem = this.datatableItems[i + 1];
            
            if (item[mergeColumn.colName] === nextItem[mergeColumn.colName]) {
              isLike = true;              
              this.$_.forEach(mergeColumn.key, (keyItem) => {
                if (item[keyItem] !== nextItem[keyItem]) isLike = false;
              });              
            }
            if (isLike) {
              selIndex = selIndex > -1 ? selIndex : i;
              selData = this.$_.find(this.mergeData, { 'colName': mergeColumn.colName, 'rowIndex': selIndex });
              selData.span++;
            }
            else if (selIndex === -1) {
              this.mergeData[this.mergeData.length - 1].span = 1;
            }
            else {
              selData = this.$_.find(this.mergeData, { 'colName': mergeColumn.colName, 'rowIndex': selIndex });
              selData.span++;
              selIndex = -1;
            }
          }
        });
      }
      // console.log('last===>' + JSON.stringify(this.mergeData));
    }
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
  max-height:100px !important;overflow-y: auto; overflow-x: hidden;
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
.el-tooltip__popper {
  /* 테이블의 child 구성시 tooltip 가 무조건 보이는 현상을 제거하기 위해 작성함. */
  display: none;
}
</style>
