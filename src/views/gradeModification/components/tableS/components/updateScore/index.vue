<template>
  <div>
    <el-table :data="infoDetail.data" border style="margin-bottom: 2rem; min-width: 1440px; width: 100%">
      <el-table-column prop="serialNo" label="出场序号" min-width="120"></el-table-column>
      <el-table-column prop="number" label="选手编号" min-width="120" />
      <el-table-column prop="country" label="国家" min-width="120" />
      <el-table-column prop="name" label="姓名" min-width="120" />
      <el-table-column prop="gender" label="性别" min-width="120">
        <template #default="scope">
          <span>{{
            gender.filter((item) => {
              return (item.value = scope.row.gender)
            })[0].label
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="round" label="比赛轮次" min-width="120">
        <template #default="scope">
          <span>{{
            speedRound.filter((item) => {
              return (item.value = scope.row.round)
            })[0].label
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="group" label="组别" min-width="120" />
      <el-table-column prop="scoreA" label="A道成绩" min-width="120" />
      <el-table-column prop="scoreB" label="B道成绩" min-width="120" />

      <el-table-column prop="score" label="有效成绩" min-width="120" />
      <el-table-column prop="ranking" label="排名" min-width="120" />
      <el-table-column label="操作" min-width="120">
        <template #default="scope">
          <el-button type="text" @click="modifyGrade(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ageList, gender, genderObj, gameType, round, speedRound } from '@/constant/index'
import { Service, loginApi } from '@/views/gradeModification/api/index.ts'
import { ElMessage } from 'element-plus'
const props = defineProps<{ info: object }>()
let infoDetail = reactive({
  data: []
})
let backupData = ref({})
const modifyGrade = async (item) => {
  let obj

  let url = loginApi.speedModify

  obj = {
    id: '',
    scoreA: item.scoreA,
    scoreB: item.scoreB
  }

  let res = await Service.postModify(url, obj)
  if (res) {
    ElMessage({
      type: 'success',
      message: '成绩修改成功'
    })
  }
}
watch(
  () => props.info,
  (newVal) => {
    console.log(newVal)
    if ((newVal ?? '') != '' || newVal.length == 0) {
      backupData = JSON.parse(JSON.stringify(newVal))
      infoDetail.data = JSON.parse(JSON.stringify(newVal))
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
