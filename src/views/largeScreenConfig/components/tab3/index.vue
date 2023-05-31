<template>
  <div class="box">
    <div class="box_item">
      <span>常规</span>
      <el-table class="table" :data="tableData.val" style="width: 100%; --el-table-border-color: none" :cell-style="changeCellStyle" :header-cell-style="headerRowStyle">
        <el-table-column prop="title" label="" align="center" />
        <el-table-column prop="family" label="字体" align="center">
          <template #default="scope">
            <el-select v-model="scope.row.hasSemifinals">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" align="center">
          <template #default="scope">
            <el-select v-model="scope.row.hasSemifinals">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="大小" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.semifinalsNum" clearable />
          </template>
        </el-table-column>
        <el-table-column prop="x" label="横坐标" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.semifinalsNum" clearable />
          </template>
        </el-table-column>
        <el-table-column prop="y" label="纵坐标" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.semifinalsNum" clearable />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps<{ info: object }>()

const tableData = reactive({
  val: [
    {
      title: '赛事名称',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    },
    {
      title: '赛事项目',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    }
  ]
})
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
const changeCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    borderTop: '1px solid #eaeef5',
    borderBottom: '1px solid #eaeef5'
  }
  return obj
}
const headerRowStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    border: 'none',
    color: '#2c3e50'
  }
}
</script>
<style scoped lang="scss">
.box {
  width: 95%;
  margin: 0 auto;
  height: 100%;
  .box_item {
    margin-bottom: 2rem;
    & > span {
      white-space: nowrap;
      display: block;
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1rem;
    }
  }
}

:deep .el-table__body {
  //-webkit-border-horizontal-spacing: 13px;  // 水平间距
  -webkit-border-vertical-spacing: 10px; // 垂直间距
  border: none;
}
.table {
  border: 1px solid #eaeef5;
}
.tsv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>
