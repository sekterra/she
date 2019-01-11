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
            v-if="createUrl || popupCallback"
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
          ref="dataTable"
          :headers="headers"
          :items="items"
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
          <y-label 
            :label="label" icon="list-alt" color-class="cutstom-title-color"
          />
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
        :data="items"
        :stripe="rowStripe"
        :border="true"
        header-cell-class-name="default-th"
        cell-class-name="default-td"
        style="width: 100%;"
        :height="height"
        :rows="rows"
        @selection-change="handleSelectionChange">
        <!-- check box 등 컨트롤이 추가되는 영역 -->
        <slot name="selection"></slot>
        <el-table-column
          v-for="(header, index) in headers"
          :key="header.name"
          :prop="header.name"
          :label="header.text"
          :min-width="header.width"
          :align="header.align"
          :sortable="!header.hasOwnProperty('sortable') || header.sortable "
          :fixed="header.fixed"
          :header-align	="header.hasOwnProperty('headerAlign') ? header.headerAlign : headerAlign"
        >   
            <template 
              v-if="header.type"
              slot-scope="scope"
              >
              <y-text
                v-if="header.type.toLowerCase() === 'text'"
                :editable="editable"
                ui="bootstrap"
                v-model="scope.row.name"
                class="mt-1"
              />
              <y-number
                v-else-if="header.type.toLowerCase() === 'number'"
                :editable="editable"
                name="test"
                ui="bootstrap"
                v-model="scope.row.name"
              />
              <y-datepicker
                v-else-if="header.type.toLowerCase() === 'datepicker'"
                :editable="editable"
                name="test"
                ui="bootstrap"
                v-model="scope.row.name"
              />
            </template>
            <el-table-column
              v-for="_header in header.child"
              :key="_header.name"
              :prop="_header.name"
              :label="_header.text"
              :min-width="_header.width"
              :align="header.align"
              :sortable="!_header.hasOwnProperty('sortable') || _header.sortable"
              show-overflow-tooltip
              :header-align	="header.hasOwnProperty('headerAlign') ? header.headerAlign : headerAlign"
            >
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
    </template>
  </div>
</template>

<script>
export default {
  /* attributes: name, components, props, data, computed */
  name: 'y-data-table',
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
      default: true
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
    rows: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      search: '',
      selected: [],
      loading: true,
      pagination: {
        // rowsPerPage: this.rowsPerPage
        sortBy: 'name'
      },
      check: true,
      radioGroup: 1,
      itemData: [],
      multipleSelection: [],
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
    height () {
      var headerHeight = 55;
      var rowHeight = 44;
      var border = 1;
      return headerHeight + (rowHeight * this.rows) + border;
    }
  },
  watch: {
    items () {
      // TODO : totalItems가 업데이트 되지 않는데 bug인지 이유는 잘 모르겠음
      // [bug fix] : 페이지가 처음 로딩시 그리드 데이터가 바인딩되었는데도, pagination이 표현 안되는 현상 발생했으나
      //                  우연히 totalItems를 강제로 할당해주니 표시가 됨(이유는 모름)
      this.pagination.totalItems = this.items.length;
      this.itemData = [this.items.length];
      this.hideLoading();
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted () {
  },
  activated () {
  },
  /* methods */
  methods: {
    editItem (_prop) {
      this.$emit('editItem', _prop.item);
      _prop.selected = !_prop.selected;
      setTimeout(() => { _prop.selected = false }, 1000);
    },
    deleteItem (_prop) {
      this.$emit('APP_ON_READY');
    },
    hideLoading () {
      var self = this;
      // TODO : 1초 후 로딩표시 제거
      setTimeout(() => { self.loading = false }, 1000);
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
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('selectedData', this.multipleSelection);
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
  font-size:12px;color:#212529; height:35px !important;
}
</style>
