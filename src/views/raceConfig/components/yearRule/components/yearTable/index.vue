<template>
  <div style="display: flex; align-items: start" class="box">
    <span class="txt" style="width: 10%"> {{ title }}</span>
    <el-table ref="table" :data="info.tableData" border style="width: 50%">
      <el-table-column v-for="(item, index) in info.tableHead" :key="index" :prop="item.inventoryQtyByTon" :label="item.lspzName"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'

const title = ref('')
const props = defineProps<{ info: object }>()
const info = reactive({
  tableData: [],
  tableHead: []
})

const list = [
  {
    inventoryQtyByTon: '排名',
    lspzName: '积分'
  },
  {
    inventoryQtyByTon: 100,
    lspzName: '第一名'
  },
  {
    inventoryQtyByTon: 200,
    lspzName: '第二名'
  },
  {
    inventoryQtyByTon: '',
    lspzName: '...'
  },
  {
    inventoryQtyByTon: 400,
    lspzName: '第三十名'
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
watch(
  () => props.info,
  (newVal) => {
    if ((newVal ?? '') != '') {
      title.value = newVal.title
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  margin-left: 5rem;
  .txt {
    font-weight: 700;
  }
}
:deep .el-table__body {
  -webkit-border-vertical-spacing: 0px !important;
}
:deep .el-scrollbar__view {
  height: 40px;
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
