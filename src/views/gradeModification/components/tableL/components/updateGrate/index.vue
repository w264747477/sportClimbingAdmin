
<template>
  <div class="boss">
    <el-button type="text" @click="updateViseible = true">成绩修改</el-button>
    <el-dialog v-model="updateViseible" title="成绩修改" width="550px" :before-close="handleClose" append-to-body>
      <el-form ref="ruleFormRef" :model="infoDetail.data" :rules="rules" label-width="150px" :inline="true">
        <el-form-item label="A道成绩:" prop="scoreA">
          <el-input v-model="infoDetail.data.scoreA" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label="A道时间:" prop="timeA">
          <el-input v-model="infoDetail.data.timeA" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="B道成绩:" prop="scoreB">
          <el-input v-model="infoDetail.data.scoreB" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label="B道时间:" prop="timeB">
          <el-input v-model="infoDetail.data.timeB" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="比赛类型:" prop="raceType">
          <el-select v-model="infoDetail.data.raceType" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
              :disabled="item.disabled" />
          </el-select>

        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button type="primary" @click="submitForm(ruleFormRef)">确 认</el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </div>

    </el-dialog>
    <!-- <el-dialog title="成绩修改" :visible.sync="updateViseible" width="1200px" :before-close="handleClose">
            <el-form ref="ruleFormRef" :model="infoDetail.data" :rules="rules" label-width="150px" :inline="true">
                <el-form-item label="scoreA:">
                    <el-input v-model="infoDetail.data.scoreA" style="width: 300px" maxlength="50"></el-input>
                </el-form-item>

                <el-form-item label="scoreB:">
                    <el-input v-model="infoDetail.data.scoreB" style="width: 300px" maxlength="50"></el-input>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">

                <el-button type="primary" @click="submitForm(ruleFormRef)">确 认</el-button>
                <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </div>
        </el-dialog> -->
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ageList, gender, gameType, round, speedRound } from '@/constant/index'
import { Service, loginApi } from '../../../../api/index'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { defineEmits } from 'vue'

const emit = defineEmits(["sucess"])
const props = defineProps<{ info: object }>()
let infoDetail = reactive({
  data: {}
})
const options = [
  {
    value: '0',
    label: '单项赛'
  },
  {
    value: '1',
    label: '全能赛'
  },
]
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  // scoreA: [
  //   { required: true, message: '请输入A道成绩', trigger: 'blur' },

  // ],
  // timeA: [
  //   { required: true, message: '请输入A道时间', trigger: 'blur' },

  // ],
  // scoreB: [
  //   { required: true, message: '请输入B道成绩', trigger: 'blur' },

  // ],
  // timeB: [
  //   { required: true, message: '请输入B道时间', trigger: 'blur' },

  // ],
  // raceType: [
  //   { required: true, message: '请输入比赛类型', trigger: 'blur' },

  // ],

})
let updateViseible = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      modifyGrade(infoDetail.data)
    } else {
      console.log('error submit!', fields)
    }
  })
}
let backupData = ref({})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  updateViseible.value = false;


}
const modifyGrade = async (item) => {
  let obj

  let url = loginApi.difficultyModify
  console.log(item)
  obj = {
    id: item.id,
    scoreA: item.scoreA,
    timeA: item.timeA,
    scoreB: item.scoreB,
    timeB: item.timeB,
    raceType: item.raceType,
  }

  let res = await Service.postModify(url, obj)
  if (res) {
    ElMessage({
      type: 'success',
      message: '成绩修改成功'
    })
    emit("sucess")
    handleClose()
  } else {
    infoDetail.data = backupData
  }
}
const handleClose = () => {
  resetForm(ruleFormRef.value)

  // this.$emit('closeDialog');
  //   this.$emit('update:visible', false);
}
watch(
  () => props.info,
  (newVal) => {
    console.log(newVal)
    if ((newVal ?? '') != '') {
      backupData = JSON.parse(JSON.stringify(newVal))
      infoDetail.data = JSON.parse(JSON.stringify(newVal))

    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
