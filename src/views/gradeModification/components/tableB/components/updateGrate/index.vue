
<template>
  <div class="boss">
    <el-button type="text" @click="updateViseible = true">成绩修改</el-button>
    <el-dialog v-model="updateViseible" title="成绩修改" width="550px" :before-close="handleClose" append-to-body>
      <el-form ref="ruleFormRef" :model="infoDetail.data" :rules="rules" label-width="150px" :inline="true"
        v-if="props.age != null">
        <el-form-item label="赛道1成绩:" prop="point1">
          <el-input v-model="infoDetail.data.point1.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point1.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>

        <el-form-item label="赛道2成绩:" prop="point2">
          <el-input v-model="infoDetail.data.point2.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point2.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>
        <el-form-item label="赛道3成绩:" prop="point3">
          <el-input v-model="infoDetail.data.point3.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point3.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>

        <el-form-item label="赛道4成绩:" prop="point4">
          <el-input v-model="infoDetail.data.point4.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point4.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>
        <el-form-item label="赛道5成绩:" prop="point5" v-if="infoDetail.data.point5 && infoDetail.data.point5 != null">
          <el-input v-model="infoDetail.data.point5.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point5.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>



      </el-form>
      <el-form ref="ruleFormRef" :model="infoDetail.data" :rules="rules" label-width="150px" :inline="true" v-else>
        <el-form-item label="赛道1成绩:" prop="point1">
          <el-input v-model="infoDetail.data.point1.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point1.Z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">Z</span>
          <el-input v-model="infoDetail.data.point1.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>

        <el-form-item label="赛道2成绩:" prop="point2">
          <el-input v-model="infoDetail.data.point2.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point2.Z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">Z</span>
          <el-input v-model="infoDetail.data.point2.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>
        <el-form-item label="赛道3成绩:" prop="point3">
          <el-input v-model="infoDetail.data.point3.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point3.Z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">Z</span>
          <el-input v-model="infoDetail.data.point3.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>

        <el-form-item label="赛道4成绩:" prop="point4">
          <el-input v-model="infoDetail.data.point4.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point4.Z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">Z</span>
          <el-input v-model="infoDetail.data.point4.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
        </el-form-item>
        <el-form-item label="赛道5成绩:" prop="point5" v-if="infoDetail.data.point5 && infoDetail.data.point5 != null">
          <el-input v-model="infoDetail.data.point5.z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">z</span>
          <el-input v-model="infoDetail.data.point5.Z" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-right: 50px;margin-left: 10px;">Z</span>
          <el-input v-model="infoDetail.data.point5.T" style="width: 50px" maxlength="50"></el-input>
          <span style="margin-left: 10px;">T</span>
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
let props = defineProps<{ info: object, age: number }>()
let infoDetail = reactive({
  data: {},
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  // point1: [
  //   { required: true, message: '请输入赛道1成绩', trigger: 'blur' },

  // ],
  // point2: [
  //   { required: true, message: '请输入赛道2成绩', trigger: 'blur' },

  // ],
  // point3: [
  //   { required: true, message: '请输入赛道3成绩', trigger: 'blur' },

  // ],
  // point4: [
  //   { required: true, message: '请输入赛道4成绩', trigger: 'blur' },

  // ],
  // point5: [
  //   { required: true, message: '请输入赛道5成绩', trigger: 'blur' },

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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  updateViseible.value = false;


}
let backupData = ref({})
const modifyGrade = async (item) => {
  let obj

  let url = loginApi.boulderingModify

  obj = {
    id: props.info.id,
    point1: `${item.point1.z},${item.point1.Z},${item.point1.T}`,
    point2: `${item.point2.z},${item.point2.Z},${item.point2.T}`,
    point3: `${item.point3.z},${item.point3.Z},${item.point3.T}`,
    point4: `${item.point4.z},${item.point4.Z},${item.point4.T}`,
    point5: item.point5 == null ? null : `${item.point5.z},${item.point5.Z},${item.point5.T}`,
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
    infoDetail.data = translateData(backupData)
  }
}
const handleClose = () => {
  resetForm(ruleFormRef.value)

  // this.$emit('closeDialog');
  //   this.$emit('update:visible', false);
}
const translateData = (val) => {
  console.log(val)
  let obj = {}
  for (let i = 1; i < 6; i++) {

    if (val[`point${i}`] == null) {
      if (i == 5) {
        obj[`point${i}`] = null
      } else {
        if (props.age == null) {
          obj[`point${i}`] = {
            z: 0,
            Z: 0,
            T: 0
          }
        } else {
          obj[`point${i}`] = {
            z: 0,

            T: 0
          }
        }

      }

    } else {
      let l = val[`point${i}`].split(',')
      if (props.age == null) {
        obj[`point${i}`] = {
          z: l[0],
          Z: l[1],
          T: l[2]
        }
      } else {
        obj[`point${i}`] = {
          z: l[0],
          T: l[1]
        }
      }

    }



  }
  console.log(obj)
  return obj

}
watch(
  () => updateViseible.value,
  (newVal) => {

    console.log(newVal)
    if (newVal) {
      console.log(props.info)
      backupData = JSON.parse(JSON.stringify(props.info))
      infoDetail.data = translateData(JSON.parse(JSON.stringify(props.info)))
      console.log(infoDetail.data)
      // infoDetail.data = translateData({
      //   point1: '1,1',
      //   point2: '1,1',
      //   point3: '1,1',
      //   point4: '1,1',
      //   point5: null,
      // })
      // infoDetail.data.id = newVal.id
    }
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped></style>
