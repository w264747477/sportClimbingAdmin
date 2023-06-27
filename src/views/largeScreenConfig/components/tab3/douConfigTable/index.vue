<template>
  <div>
    <div class="box_item">
      <div class="title">
        <span>{{ detailInfo.info.title }}</span>
        <el-select v-if="(detailInfo.info.selInfo ?? '') != ''" v-model="detailInfo.info.selInfo.value"
          style="margin-left: 2rem">
          <el-option v-for="item in detailInfo.info.selInfo.selOptions" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </div>

      <el-table class="table" :data="detailInfo.info.tableData" style="width: 100%; --el-table-border-color: none"
        :cell-style="changeCellStyle" :header-cell-style="headerRowStyle">
        <el-table-column prop="title" label="" align="center" width="240" />
        <el-table-column prop="family" label="字体" align="center" width="240">
          <template #default="scope">
            <el-switch v-if="scope.row.title == '年度积分'" v-model="scope.row.switch" width="20" />
            <el-select v-model="scope.row.family" min-width="150">
              <el-option v-for="item in detailInfo.info.familyOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" align="center" width="240">
          <template #default="scope">
            <el-select v-model="scope.row.color">
              <el-option v-for="item in detailInfo.info.colorOptions" :key="item.value" :label="item.label"
                :value="item.value" />
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



    </div>
    <div class="box_item">
      <div class="formbox">
        <span>{{ detailInfo.projectInfo.title }}</span>
        <el-form :inline="true" :label-width="'50px'" :model="detailInfo.projectInfo.selInfo">
          <el-form-item label="类型">
            <el-select v-model="detailInfo.projectInfo.selInfo.type" style="width: 190px" @change="change('type')">
              <el-option v-for="item in gameTypeAll" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="detailInfo.projectInfo.selInfo.gender" style="width: 190px">
              <el-option v-for="item in genderList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-select v-model="detailInfo.projectInfo.selInfo.age" style="width: 190px">
              <el-option v-for="item in ageList()" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回合">
            <el-select v-if="detailInfo.projectInfo.selInfo.type == 'S'" v-model="detailInfo.projectInfo.selInfo.round"
              style="width: 190px">
              <el-option v-for="item in sround" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-else v-model="detailInfo.projectInfo.selInfo.round" style="width: 190px">
              <el-option v-for="item in round" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>

      <el-table class="table" :data="detailInfo.projectInfo.tableData" style="width: 100%; --el-table-border-color: none"
        :cell-style="changeCellStyle" :header-cell-style="headerRowStyle">
        <el-table-column prop="title" label="" align="center" width="240" />
        <el-table-column prop="family" label="字体" align="center" width="240">
          <template #default="scope">
            <div v-if="scope.row.title == '年度积分'" style="display: flex;">
              <el-switch v-model="scope.row.switch" style="margin-right: 10px;" />
              <el-select v-model="scope.row.family">
                <el-option v-for="item in detailInfo.projectInfo.familyOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
            <div v-else>
              <el-select v-model="scope.row.family">
                <el-option v-for="item in detailInfo.projectInfo.familyOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" align="center" width="240">
          <template #default="scope">
            <el-select v-model="scope.row.color">
              <el-option v-for="item in detailInfo.projectInfo.colorOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="大小" align="center" width="240">
          <template #default="scope">

            <el-input-number v-model="scope.row.size" :min="1" :max="20" v-if="scope.row.size != undefined" />
            <span v-else> 不支持字体大小修改</span>
          </template>
        </el-table-column>
        <el-table-column prop="x" label="横坐标" align="center" width="240">
          <template #default="scope">
            <!-- <el-input style="width: 160px;" v-model="scope.row.x" clearable
              v-if="scope.row.x != undefined && scope.row.title == '年度积分'" />
            <span v-if="scope.row.title == '赛道'"> 不支持横坐标修改</span>
            <el-select style="width: 160px;" v-model="scope.row.x" v-if="!['年度积分', '赛道'].includes(scope.row.title)">
              <el-option v-for="item in tableColoumOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select> -->
            <el-input v-model="scope.row.x" clearable />

          </template>
        </el-table-column>
        <el-table-column prop="y" label="纵坐标" align="center" width="240">
          <template #default="scope">

            <el-input v-model="scope.row.y" clearable v-if="scope.row.y != undefined" />
            <span v-else> 不支持纵坐标修改</span>

          </template>
        </el-table-column>

      </el-table>



    </div>
    <div class="middleBtn" style="margin-top: 2rem;">
      <el-button @click="init">重置</el-button>
      <el-button type="primary" @click="confirm">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ageList, gender, gameTypeAll, speedRound, projectData } from '@/constant/index'
import { onMounted, reactive, ref, watch } from 'vue'
import { familyOptions, colorOptions } from '@/constant/index'
import Service from '@/views/largeScreenConfig/api'
import { ElMessage } from 'element-plus'

// const props = defineProps<{ info: object }>()
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
const detailInfo = reactive({
  info: {
    tableData: [
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
    ],
    title: '共性',
    familyOptions,
    colorOptions
  },
  projectInfo: {
    tableData: JSON.parse(JSON.stringify(projectData['B'])),
    title: '项目',
    selInfo: {
      type: 'L',
      gender: 'M',
      round: 'Q0',
      age: null

    },

    familyOptions,
    colorOptions
  }
})
const change = async (val) => {
  if (detailInfo.projectInfo.selInfo.type != 'S' && ['F8', 'F4'].includes(detailInfo.projectInfo.selInfo.round)) {
    detailInfo.projectInfo.selInfo.round = 'Q0'
  }
  detailInfo.projectInfo.tableData = projectData[detailInfo.projectInfo.selInfo.type]
}
const init = () => {
  detailInfo.info = {
    tableData: [
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
    ],
    title: '共性',
    familyOptions,
    colorOptions
  }
  detailInfo.projectInfo = {
    tableData: JSON.parse(JSON.stringify(projectData['B'])),
    title: '项目',
    selInfo: {
      type: 'L',
      gender: 'M',
      round: 'Q0',
      age: null

    },

    familyOptions,
    colorOptions
  }
}
const changeCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  // const obj = {
  //   borderTop: '1px solid #eaeef5',
  //   borderBottom: '1px solid #eaeef5'
  // }
  // return obj
}
const headerRowStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    border: 'none',
    color: '#2c3e50'
  }
}
const getInfo = async () => {

  let res = await Service.getFontStyle()
  // getInfoData.val = JSON.parse(JSON.stringify(res))
  if (res != undefined) {
    detailInfo.info = res.info
    detailInfo.projectInfo = res.projectInfo

  }
}
const confirm = async () => {

  let res = await Service.setFontStyle(detailInfo)
  // getInfoData.val = JSON.parse(JSON.stringify(res))
  if (res != undefined) {
    ElMessage.success('字体配置成功')

  }
}
onMounted(() => {
  // getInfo()
})
</script>
<style scoped lang="scss">
.table {
  border: 1px solid #eaeef5;
}

.formbox {
  height: 100%;
  width: 100%;
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
