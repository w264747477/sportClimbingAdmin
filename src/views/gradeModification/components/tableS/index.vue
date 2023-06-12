<template>
  <div style="overflow-x: scroll;">
    <el-table :data="infoDetail.data" border style="margin-bottom: 2rem; min-width: 1440px;  width: 100%;">
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
          <updateGrate :info="scope.row" @sucess="updateInfo"></updateGrate>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ageList, gender, genderObj, gameType, round, speedRound } from '@/constant/index'
import Service from '../../api/index'
import { ElMessage } from 'element-plus'
import updateGrate from "./components/updateGrate/index.vue"
import { defineEmits } from 'vue'

const emit = defineEmits(["sucess"])
const props = defineProps<{ info: object }>()
let infoDetail = reactive({
  data: []
})
const modifyGrade = async (item) => {
  let obj

  let url = Service.api.speedModify

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
const updateInfo = async () => {
  emit("sucess")
}
watch(
  () => props.info,
  (newVal) => {
    console.log(newVal)
    if ((newVal ?? '') != '' || newVal.length == 0) {
      infoDetail.data = newVal
      console.log(newVal)
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
