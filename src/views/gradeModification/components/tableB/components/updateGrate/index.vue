
<template>
  <div class="boss">
    <el-button type="text" @click="updateViseible = true">成绩修改</el-button>
    <el-dialog v-model="updateViseible" title="成绩修改" width="550px" :before-close="handleClose" append-to-body>
      <el-form ref="ruleFormRef" :model="infoDetail.data" :rules="rules" label-width="150px" :inline="true">
        <el-form-item label="赛道1成绩:" prop="point1">
          <el-input v-model="infoDetail.data.point1" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label="赛道2成绩:" prop="point2">
          <el-input v-model="infoDetail.data.point2" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="赛道3成绩:" prop="point3">
          <el-input v-model="infoDetail.data.point3" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label="赛道4成绩:" prop="point4">
          <el-input v-model="infoDetail.data.point4" style="width: 300px" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="赛道5成绩:" prop="point5">
          <el-input v-model="infoDetail.data.point5" style="width: 300px" maxlength="50"></el-input>
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
import Service from '../../../../api/index'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { defineEmits } from 'vue'

const emit = defineEmits(["sucess"])
const props = defineProps<{ info: object }>()
let infoDetail = reactive({
  data: {}
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  point1: [
    { required: true, message: '请输入赛道1成绩', trigger: 'blur' },

  ],
  point2: [
    { required: true, message: '请输入赛道2成绩', trigger: 'blur' },

  ],
  point3: [
    { required: true, message: '请输入赛道3成绩', trigger: 'blur' },

  ],
  point4: [
    { required: true, message: '请输入赛道4成绩', trigger: 'blur' },

  ],
  point5: [
    { required: true, message: '请输入赛道5成绩', trigger: 'blur' },

  ],

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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  updateViseible.value = false;


}
const modifyGrade = async (item) => {
  let obj

  let url = Service.api.boulderingModify

  obj = {
    id: item.id,
    point1: item.point1,
    point2: item.point2,
    point3: item.point3,
    point4: item.point4,
    point5: item.point5,
  }

  let res = await Service.postModify(url, obj)
  if (res) {
    ElMessage({
      type: 'success',
      message: '成绩修改成功'
    })
    emit("sucess")
    handleClose()
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
      infoDetail.data = newVal

    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
