<template>
  <div class="box">
    <el-form ref="formRef" :label-position="labelPosition" :model="infoDetail.data" style="max-width: 80%" :inline="true"
      :label-width="'100px'">
      <el-form-item label="类型" :prop="infoDetail.data.type" :rules="[{
        required: true,
        message: '请选择类型',
        trigger: 'blur',
      }]">
        <el-select v-model="infoDetail.data.type" style="width: 300px" @change="change('type')">
          <el-option v-for="item in gameType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" :prop="infoDetail.data.gender" :rules="[{
        required: true,
        message: '请选择性别',
        trigger: 'blur',
      }]">
        <el-select v-model="infoDetail.data.gender" style="width: 300px" @change="change('gender')">
          <el-option v-for="item in genderList" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-select v-model="infoDetail.data.age" style="width: 300px" @change="change('age')">
          <el-option v-for="item in ageList()" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回合">
        <el-select v-if="infoDetail.data.type == 'S'" v-model="infoDetail.data.round" style="width: 300px"
          @change="change('round')">
          <el-option v-for="item in sround" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-else v-model="infoDetail.data.round" style="width: 300px" @change="change('round')">
          <el-option v-for="item in round" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="赛事名称" :prop="infoDetail.data.name" :rules="[{
        required: true,
        message: '请输入赛事名称',
        trigger: 'blur',
      }]">
        <el-input v-model="infoDetail.data.name" style="width: 300px" />
      </el-form-item>
      <el-form-item label="时间" :prop="infoDetail.data.time" :rules="[{
        required: true,
        message: '请选择时间',
        trigger: 'blur',
      }]">
        <el-date-picker v-model="infoDetail.data.time" type="date" placeholder="选择时间" style="width: 300px" />

      </el-form-item>
      <el-form-item label="地点" :prop="infoDetail.data.address" :rules="{
        required: true,
        message: '请输入地点',
        trigger: 'blur',
      }">
        <el-input v-model="infoDetail.data.address" style="width: 300px" />

      </el-form-item>
      <el-form-item label="项目" :prop="infoDetail.data.project" :rules="{
        required: true,
        message: '请输入项目',
        trigger: 'blur',
      }">
        <el-input v-model="infoDetail.data.project" style="width: 300px" />

      </el-form-item>
      <el-form-item label="logo" style="width:100%">
        <div v-for="item in infoDetail.data.logo">
          <el-image style="width: 100px; height: 100px;margin-right: 20px;" :src="item" fit="cover" />
        </div>

      </el-form-item>
      <el-form-item label="裁判长">
        <el-input v-model="infoDetail.data.chiefJudge" style="width: 300px" />

      </el-form-item>
      <el-form-item label="副裁判长">
        <el-input v-model="infoDetail.data.deputyReferee" style="width: 300px" />

      </el-form-item>
      <el-form-item label="路线裁判">
        <el-input v-model="infoDetail.data.routejudge" style="width: 300px" />

      </el-form-item>
      <el-form-item label="成绩处理裁判">
        <el-input v-model="infoDetail.data.gradeHandlingJudge" style="width: 300px" />

      </el-form-item>
      <el-form-item label="公布时间">
        <el-date-picker v-model="infoDetail.data.announcementTime" type="datetime" placeholder="选择公布时间"
          style="width: 300px" format="YYYY年MM月DD日 HH时mm分ss秒" />

      </el-form-item>
      <el-button type="primary" style="display: block;  margin: 0 auto" @click="exportInfo(formRef)">导出名单</el-button>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ageList, gender, gameType, speedRound } from '@/constant/index'
import dayjs from 'dayjs'
import { Service, exportList } from '../../api/index.ts'
import { FormInstance } from 'element-plus'
const props = defineProps<{ info: number }>()
const infoDetail = reactive({
  data: <exportList>{
    type: 'B',
    gender: 'M',
    round: 'Q0',
    age: '',
    name: '',
    time: dayjs(new Date()).format('YYYY-MM-DD'),
    address: '',
    project: '',
    logo: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'],
    chiefJudge: '',
    deputyReferee: '',
    routejudge: '',
    gradeHandlingJudge: '',
    announcementTime: dayjs(new Date())
  }
})
const labelPosition = ref('left')
const round = [
  {
    value: 'Q0',
    label: '预赛'
  },
  {
    value: 'F2',
    label: '半决赛'
  },
  {
    value: 'F0',
    label: '决赛'
  }
]
const genderList = [
  {
    value: 'M',
    label: '男'
  },
  {
    value: 'W',
    label: '女'
  }
]
const sround = [
  {
    value: 'Q0',
    label: '预赛'
  },
  {
    value: 'F8',
    label: '八分之一'
  },
  {
    value: 'F4',
    label: '四分之一'
  },
  {
    value: 'F2',
    label: '二分之一'
  },
  {
    value: 'F0',
    label: '决赛'
  }
]
const formRef = ref<FormInstance>()
const toDownloadFile = (response) => {
  const blob = new Blob([response.data]);
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  let name = 'scoresList-' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
  link.download = name;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}
const change = async (val) => {
  if (infoDetail.data.type != 'S' && ['F8', 'F4'].includes(infoDetail.data.round)) {
    infoDetail.data.round = 'Q0'
  }

}
const exportInfo = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let obj = {
        type: infoDetail.data.type,
        gender: infoDetail.data.gender,
        age: infoDetail.data.age,
        round: infoDetail.data.round,
        gameName: infoDetail.data.name,
        startTime: infoDetail.data.time,
        location: infoDetail.data.address,
        term: infoDetail.data.project,
        logos: infoDetail.data.logo,
        headReferee: infoDetail.data.chiefJudge,
        deputyReferee: infoDetail.data.deputyReferee,
        routeReferee: infoDetail.data.routejudge,
        scoreReferee: infoDetail.data.gradeHandlingJudge,
        announcementTime: infoDetail.data.announcementTime
      }
      let url = props.info == 1 ? exportList.exportScores : exportList.promotionList
      const res = await Service.postExport(url, obj)
      if (res) {
        toDownloadFile(response);
      }
    } else {
      console.log('error submit!')
      return false
    }
  })


}
onMounted(() => {
  console.log(
    props.info

  )

})
watch(
  () => props.info,
  (newVal) => {
    console.log(newVal)
    if ((newVal ?? '') != '') {
      console.log(newVal)
    }
  },
  { deep: true },
  { immediate: true }

)
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  margin-left: 5rem;
  // margin-top: 10rem;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}


// 表格
</style>
