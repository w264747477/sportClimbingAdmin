<template>
  <div style="display: flex; align-items: start" class="box">
    <span class="txt" style="width: 10%; margin-top: 10px"> {{ '速度赛' }}</span>
    <el-table ref="table" :data="info.tableData" height="100px" border>
      <el-table-column v-for="(item, index) in info.tableHead" :key="index" :prop="item.inventoryQtyByTon" :label="item.lspzName"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'

// const props = defineProps<{ info: object }>()
const info = reactive({
  tableData: [],
  tableHead: []
})

const list = [
  {
    inventoryQtyByTon: 100,
    lspzName: '物料1'
  },
  {
    inventoryQtyByTon: 200,
    lspzName: '物料2'
  },
  {
    inventoryQtyByTon: 300,
    lspzName: '物料3'
  },
  {
    inventoryQtyByTon: 400,
    lspzName: '物料4'
  },
  {
    inventoryQtyByTon: 500,
    lspzName: '物料5'
  },
  {
    inventoryQtyByTon: 600,
    lspzName: '物料6'
  }
]

// 横向表格数据
const getCrosswise = (list) => {
  const dataObj = {}
  list.map((e, index) => {
    dataObj[`inventoryQtyByTon${index}`] = e.inventoryQtyByTon
    info.tableHead.push({
      lspzName: e.lspzName,
      inventoryQtyByTon: `inventoryQtyByTon${index}`
    })
  })
  info.tableData.push(dataObj)
}
onMounted(() => {
  getCrosswise(list)
})
// watch(
//   () => props.info,
//   (newVal) => {
//     if ((newVal ?? '') != '') {
//       title.value = newVal.title
//       tableData.val = newVal.tableData
//       if ((newVal.iptSec ?? '') != '') {
//         iptSec.val = newVal.iptSec
//       }
//     }
//   },
//   { immediate: true }
// )
</script>
<style scoped lang="scss">
.box {
  width: 100%;
}

// 表格

// 表格最外边框
// :deep .el-table::before {
//   height: 0px;
// }
// :deep .el-table--border::after {
//   width: 0px;
// }
// :deep .el-table--border {
//   border: none;
// }
// :deep .el-table__inner-wrapper::before {
//   height: 0px;
// }
// :deep .el-table--border .el-table__inner-wrapper::after {
//   height: 1;
// }
</style>
