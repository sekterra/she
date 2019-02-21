<template>
  <div class="app-container">

    <el-tag style="margin-bottom:20px;">
      <a href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable" target="_blank">Documentation</a>
    </el-tag>

    <tree-table 
      :data="data" 
      :eval-func="func" 
      :eval-args="args" 
      :expand-all="expandAll" 
      border>
      <!-- 
      <el-table-column label="이벤트">
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.event }}</span>
          <el-tag>{{ scope.row.timeLine+'ms' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="타임 라인">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.timeLine+'ms'" effect="dark" placement="left">
            <div class="processContainer">
              <div
                :style="{ width:scope.row._width * 500+'px',
                          background:scope.row._width > 0.5 ? 'rgba(233,0,0,.5)':'rgba(0,0,233,0.5)',
                          marginLeft:scope.row._marginLeft * 500+'px' }"
                class="process">
                <span style="display:inline-block"/>
              </div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <!--
      <el-table-column label="체크" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="checkboxClicked(scope.row)">点击</el-button>
          <el-checkbox v-model="scope.row.comment" @input="changeCheckbox(scope.row, scope.row.comment)"></el-checkbox>
          {{scope.row.comment}}
        </template>
      </el-table-column>
      -->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="option in columnOptions"
        :key="option"
        :label="option.text"
      >
        <template slot-scope="scope";>
          <el-checkbox 
            v-if="option.type==='checkbox'"
            v-model="scope.row[option.name]"
            @input="changeCheckbox(scope.row, scope.row[option.name])"
          >
          </el-checkbox>
          <div
            v-else 
            >
            {{scope.row[option.name]}}
          </div>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
/* eslint-disable */
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'

export default {
  name: 'CustomTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: true,
      columnOptions: [
        { text: '검진기관', name: 'comment', width: '25%', align: 'center', type: 'checkbox' },
        { text: '타임라인', name: 'timeLine', width: '25%', align: 'right' },
      ],
      data:
        {
          id: 1,
          event: '이벤트1',
          timeLine: 100,
          comment: true,
          children: [
            {
              id: 2,
              event: '이벤트2',
              timeLine: 10,
              comment: true
            },
            {
              id: 3,
              event: '이벤트3',
              timeLine: 90,
              comment: true,
              children: [
                {
                  id: 4,
                  event: '이벤트4',
                  timeLine: 5,
                  comment: true
                },
                {
                  id: 5,
                  event: '이벤트5',
                  timeLine: 10,
                  comment: true
                },
                {
                  id: 6,
                  event: '이벤트6',
                  timeLine: 75,
                  comment: true,
                  children: [
                    {
                      id: 7,
                      event: '이벤트7',
                      timeLine: 50,
                      comment: true,
                      children: [
                        {
                          id: 71,
                          event: '이벤트71',
                          timeLine: 25,
                          comment: false
                        },
                        {
                          id: 72,
                          event: '이벤트72',
                          timeLine: 5,
                          comment: false
                        },
                        {
                          id: 73,
                          event: '이벤트73',
                          timeLine: 20,
                          comment: false
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: '이벤트8',
                      timeLine: 25,
                      comment: true
                    }
                  ]
                }
              ]
            }
          ]
        },
      args: [null, null, 'timeLine']
    }
  },
  methods: {
    message(row) {
      this.$message.info(row.event)
    },
    changeCheckbox(_row, _isChecked) {
      // console.log(JSON.stringify(_row));
      if (this.$_.isArray(_row)){
        this.$_.forEach(_row, (_item) => {
          _item.comment = _isChecked;
          if (_item.hasOwnProperty('children')) this.changeCheckbox(_item.children, _isChecked);
        });
      } else {
      _row.comment = _isChecked;
      if (_row.hasOwnProperty('children')) this.changeCheckbox(_row.children, _isChecked);
      }
    }
  }
}
</script>
