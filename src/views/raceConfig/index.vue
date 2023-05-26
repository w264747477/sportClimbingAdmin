<template>
  <div>
    <div style="margin-bottom: 20px; margin-left: 10px">
      <h2>成年组</h2>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="男子" name="first">
          <ConfigTable :info="grownTableData.val" style="margin-bottom: 70px"></ConfigTable>
          <ConfigTable :info="allRoundTableData.val" style="margin-bottom: 20px"></ConfigTable>
          <YearRule></YearRule>
          <el-button type="primary" @click="saveGrown">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="女子" name="second">女子</el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-left: 10px">
      <h2>U系列</h2>
      <el-tabs v-model="uActiveName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in uList" :label="`U${item}`" :name="item">
          <ConfigTable :info="uGrownTableDataMen.val" style="margin-bottom: 70px"></ConfigTable>
          <ConfigTable :info="uGrownTableDataWomen.val" style="margin-bottom: 20px"></ConfigTable>
          <el-button type="primary" @click="saveU">保存</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, TabsPaneContext } from 'element-plus'
import { color } from 'echarts/core'
import ConfigTable from './components/configTable/index'
import Service from './api/index'
import YearRule from './components/yearRule/index.vue'

const activeName = ref('first')
const uActiveName = ref(5)
const grownTableData = reactive({
  val: {
    title: '单项',
    tableData: [
      {
        type: '难度赛',
        numOfCt: '',
        hasSemifinals: true,
        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: '',
        hasSemifinals: true,
        semifinalsNum: 20,
        finalNum: 6
      }
    ]
  }
})
const uGrownTableDataMen = reactive({
  val: {
    title: '男子',
    tableData: [
      {
        type: '难度赛',
        numOfCt: '',
        hasSemifinals: true,

        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: '',
        hasSemifinals: true,
        semifinalsNum: 20,
        finalNum: 6
      }
    ]
  }
})
const uGrownTableDataWomen = reactive({
  val: {
    title: '女子',
    tableData: [
      {
        type: '难度赛',
        numOfCt: '',
        hasSemifinals: true,

        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: '',
        hasSemifinals: true,
        semifinalsNum: 20,
        finalNum: 6
      }
    ]
  }
})

const allRoundTableData = reactive({
  val: {
    title: '全能',
    iptSec: {
      hasSemifinals: true,
      semifinalsNum: 0,
      finalNum: 0
    },
    tableData: [
      {
        type: '难度赛',
        preliminariesCount: 0,
        semifinalsCount: 0,
        finalCount: 0
      }
    ]
  }
})
const uList = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const changeCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    borderTop: '1px solid #eaeef5',
    borderBottom: '1px solid #eaeef5'
  }
  if (columnIndex == 0) {
    obj.borderLeft = '1px solid #eaeef5'
  }
  if (columnIndex == 4) {
    obj.borderRight = '1px solid #eaeef5'
  }
  return obj
}
const headerRowStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    border: 'none',
    color: '#2c3e50'
  }

  return obj
}
const saveGrown = async () => {
  const res = await Service.setGrown(Object.assign(grownTableData.val, allRoundTableData.val))
  if (res) {
    ElMessage({
      type: 'success',
      message: '配置成功'
    })
  } else {
    ElMessage({
      type: 'warning',
      message: res.message
    })
  }
}
const saveU = async () => {
  const res = await Service.setU(Object.assign(uGrownTableDataMen.val, uGrownTableDataWomen.val))
  if (res) {
    ElMessage({
      type: 'success',
      message: '配置成功'
    })
  } else {
    ElMessage({
      type: 'warning',
      message: res.message
    })
  }
}
const options = [
  {
    value: true,
    label: '有'
  },
  {
    value: false,
    label: '无'
  }
]
const tableData = [
  {
    type: '难度赛',
    numOfCt: '',
    hasSemifinals: true,

    semifinalsNum: 0,
    finalNum: 0
  },
  {
    type: '攀石赛',
    numOfCt: '',
    hasSemifinals: true,
    semifinalsNum: 0,
    finalNum: 0
  }
]
</script>
<style scoped lang="scss">
:deep .el-table__body {
  //-webkit-border-horizontal-spacing: 13px;  // 水平间距
  -webkit-border-vertical-spacing: 10px; // 垂直间距
  border: none;
}
</style>
