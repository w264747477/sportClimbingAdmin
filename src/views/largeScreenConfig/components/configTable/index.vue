<template>
  <div style="display: flex; align-items: start">
    <span class="txt" style="width: 10%; margin-top: 10px"> {{ title }}</span>
    <div style="width: 85%">
      <div v-if="iptSec.val != undefined">
        <div class="iptS">
          <div>
            <span class="txt" style="margin-right: 15px; color: #666">有无半决赛</span>
            <el-select v-model="iptSec.val.hasSemifinals">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div>
            <span class="txt" style="margin-right: 15px; color: #666">半决赛晋级人数</span>
            <el-select v-model="iptSec.val.semifinalsNum">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div>
            <span class="txt" style="margin-right: 15px; color: #666">决赛晋级人数</span>
            <el-select v-model="iptSec.val.finalNum">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <el-table :data="tableData.val" style="width: 100%; --el-table-border-color: none" :cell-style="changeCellStyle" :header-cell-style="headerRowStyle">
          <el-table-column prop="type" label="" align="center" />
          <el-table-column prop="preliminariesCount" label="预赛手点数" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.preliminariesCount" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="semifinalsCount" label="半决赛手点数" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.semifinalsCount" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="finalCount" label="决赛手点数" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.finalCount" clearable />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-else>
        <el-table :data="tableData.val" style="width: 100%; --el-table-border-color: none" :cell-style="changeCellStyle" :header-cell-style="headerRowStyle">
          <el-table-column prop="type" label="" align="center" />
          <el-table-column prop="numOfCt" label="预赛攀爬道路数量" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.numOfCt" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="hasSemifinals" label="有无半决赛" align="center">
            <template #default="scope">
              <el-select v-model="scope.row.hasSemifinals">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="semifinalsNum" label="半决赛晋级人数" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.semifinalsNum" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="finalNum" label="决赛晋级人数" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.finalNum" clearable />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const props = defineProps<{ info: object }>()
const title = ref('')
const tableData = reactive({
  val: []
})
const iptSec = reactive({
  val: undefined
})

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
// const tableData = [
//   {
//     type: '难度赛',
//     numOfCt: '',
//     hasSemifinals: true,

//     semifinalsNum: 0,
//     finalNum: 0
//   },
//   {
//     type: '攀石赛',
//     numOfCt: '',
//     hasSemifinals: true,
//     semifinalsNum: 0,
//     finalNum: 0
//   }
// ]
watch(
  () => props.info,
  (newVal) => {
    if ((newVal ?? '') != '') {
      title.value = newVal.title
      tableData.val = newVal.tableData
      if ((newVal.iptSec ?? '') != '') {
        iptSec.val = newVal.iptSec
      }
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.txt {
  color: #2c3e50;
  font-size: 15px;
  font-weight: 700;
}
.iptS {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
:deep .el-table__body {
  //-webkit-border-horizontal-spacing: 13px;  // 水平间距
  -webkit-border-vertical-spacing: 10px; // 垂直间距
  border: none;
}
</style>
