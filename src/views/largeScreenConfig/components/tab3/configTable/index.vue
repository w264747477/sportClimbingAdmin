<template>
  <div class="box_item">
    <div class="title">
      <span>{{ info.title }}</span>
      <el-select v-if="(info.selInfo ?? '') != ''" v-model="info.selInfo.value" style="margin-left: 2rem">
        <el-option v-for="item in info.selInfo.selOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <el-table class="table" :data="info.tableData" style="width: 100%; --el-table-border-color: none"
      :cell-style="changeCellStyle" :header-cell-style="headerRowStyle">
      <el-table-column prop="title" label="" align="center" width="240" />
      <el-table-column prop="family" label="字体" align="center" width="240">
        <template #default="scope">
          <div v-if="scope.row.title == '年度积分'" style="display: flex;">
            <el-switch v-model="scope.row.switch" style="margin-right: 10px;" />
            <el-select v-model="scope.row.family">
              <el-option v-for="item in info.familyOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div v-else>
            <el-select v-model="scope.row.family">
              <el-option v-for="item in info.familyOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="color" label="颜色" align="center" width="240">
        <template #default="scope">
          <el-select v-model="scope.row.color">
            <el-option v-for="item in info.colorOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" align="center" width="240">
        <template #default="scope">
          <el-input-number v-model="scope.row.size" :min="1" :max="20" />
        </template>
      </el-table-column>
      <el-table-column prop="x" label="横坐标" align="center" width="240">
        <template #default="scope">
          <el-input v-model="scope.row.x" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="y" label="纵坐标" align="center" width="240">
        <template #default="scope">
          <el-input v-model="scope.row.y" clearable />
        </template>
      </el-table-column>

    </el-table>
    <div class="middleBtn" style="margin-top: 2rem;">
      <el-button @click="init">重置</el-button>
      <el-button type="primary" @click="confirm">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import Service from '@/views/largeScreenConfig/api'
import { ElMessage } from 'element-plus'
const props = defineProps<{ info: object }>()
const info = reactive({
  tableData: [],
  familyOptions: [],
  colorOptions: [],
  title: '',
  selInfo: {}
})
let backupData = ref({})
const init = () => {
  resetData(backupData.value)
}
const changeCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  // const obj = {
  //   borderTop: '1px solid #eaeef5',
  //   borderBottom: '1px solid #eaeef5'
  // }
  // return obj
}
const resetData = (newVal) => {
  info.tableData = newVal.tableData
  info.familyOptions = newVal.familyOptions
  info.colorOptions = newVal.colorOptions
  info.selInfo = newVal.selInfo
  info.title = newVal.title
}
const confirm = async () => {

  let res = await Service.setFontStyle(info)
  // getInfoData.val = JSON.parse(JSON.stringify(res))
  if (res != undefined) {
    ElMessage.success('字体配置成功')

  }
}
const headerRowStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    border: 'none',
    color: '#2c3e50'
  }
}

watch(
  () => props.info,
  (newVal) => {
    if ((newVal ?? '') != '') {
      backupData.value = JSON.parse(JSON.stringify(newVal))
      resetData(newVal)
      // info.tableData = newVal.tableData
      // info.familyOptions = newVal.familyOptions
      // info.colorOptions = newVal.colorOptions
      // info.selInfo = newVal.selInfo
      // info.title = newVal.title
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.table {
  border: 1px solid #eaeef5;
}

.box_item {
  margin-bottom: 2rem;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  &>span {
    white-space: nowrap;
    display: block;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1rem;
  }
}
</style>
