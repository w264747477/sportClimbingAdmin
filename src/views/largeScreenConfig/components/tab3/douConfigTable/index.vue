<template>
  <div>
    <div class="box_item">
      <div class="title">
        <span>{{ detailInfo.info.title }}</span>
        <span style="color: rgb(221, 219, 215);">(横众坐标为百分比)</span>
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
        <span style="color: rgb(221, 219, 215);"> (横众坐标为表格每列的宽度)</span>
        <el-form :inline="true" :label-width="'50px'" :model="detailInfo.projectInfo.selInfo">
          <el-form-item label="类型">
            <el-select v-model="detailInfo.projectInfo.selInfo.type" style="width: 190px" @change="change('type')">
              <el-option v-for="item in gameTypeAll" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="性别">
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
          </el-form-item> -->

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

            <span v-else>
              {{ getWarnTxt(scope.row) }}
            </span>

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
  // {
  //   value: 'F8',
  //   label: '八分之一'
  // },
  // {
  //   value: 'F4',
  //   label: '四分之一'
  // },
  // {
  //   value: 'F2',
  //   label: '二分之一'
  // },
  // {
  //   value: 'F0',
  //   label: '决赛'
  // }
]
let allProjectInfo = reactive({
  data: {
    B: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 210,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },

      {
        title: '赛道',
        family: '0',
        color: '1',
        x: 25,
      },
      {
        title: '成绩',
        family: '0',
        color: '1',
        size: 4,
        x: 90,
      },
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 96,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '1',
        size: 2,
        x: 5,
        y: 6,
      },
    ],
    S: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 260,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },

      {
        title: '赛道A',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '赛道B',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '成绩',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '0',
        size: 2,
        x: 5,
        y: 6,
      },
    ],
    L: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 180,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      //预赛 Q0
      {
        title: '高度1',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      //预赛 Q0
      {
        title: '高度2',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      //非预赛 !Q0
      {
        title: '高度',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },

      {
        title: '时间',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      //预赛 Q0
      {
        title: 'QP',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      //非预赛 !Q0
      {
        title: '成绩',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      //决赛，半决赛'F4', 'F0'
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '1',
        size: 4,
        x: 5,
        y: 4,
      },
    ],
    A: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 30,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 30,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },

      {
        title: '赛道',
        family: '0',
        color: '1',
        x: 22,
      },
      {
        title: '线路得分',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      {
        title: '攀石得分',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '高度',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '难度得分',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: 'TP',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      //非预赛!q0
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 73,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '0',
        size: 4,
        x: 5,
        y: 6,
      },
    ],
    AU: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 200,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '难度',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '攀石',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '总分',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      //非预赛!q0
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '0',
        size: 2,
        x: 5,
        y: 6,
      },
    ],
  }
})
let backupllProjectInfo = reactive({
  data: {
    B: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 210,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },

      {
        title: '赛道',
        family: '0',
        color: '1',
        x: 25,
      },
      {
        title: '成绩',
        family: '0',
        color: '1',
        size: 4,
        x: 90,
      },
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 96,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '1',
        size: 2,
        x: 5,
        y: 6,
      },
    ],
    S: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 260,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },

      {
        title: '赛道A',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '赛道B',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '成绩',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '0',
        size: 2,
        x: 5,
        y: 6,
      },
    ],
    L: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 180,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      //预赛 Q0
      {
        title: '高度1',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      //预赛 Q0
      {
        title: '高度2',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      //非预赛 !Q0
      {
        title: '高度',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },

      {
        title: '时间',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      //预赛 Q0
      {
        title: 'QP',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      //非预赛 !Q0
      {
        title: '成绩',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      //决赛，半决赛'F4', 'F0'
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '1',
        size: 4,
        x: 5,
        y: 4,
      },
    ],
    A: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 30,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 30,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },

      {
        title: '赛道',
        family: '0',
        color: '1',
        x: 22,
      },
      {
        title: '线路得分',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      {
        title: '攀石得分',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '高度',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '难度得分',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: 'TP',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      //非预赛!q0
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 73,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '0',
        size: 4,
        x: 5,
        y: 6,
      },
    ],
    AU: [
      {
        title: '排名',
        family: '0',
        color: '1',
        size: 4,
        x: 50,
      },
      {
        title: '号码',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '代表队',
        family: '0',
        color: '1',
        size: 4,
        x: 200,
      },
      {
        title: '运动员姓名',
        family: '0',
        color: '1',
        size: 4,
        x: 80,
      },
      {
        title: '难度',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '攀石',
        family: '0',
        color: '1',
        size: 4,
        x: 60,
      },
      {
        title: '总分',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      //非预赛!q0
      {
        title: '上一轮名次',
        family: '0',
        color: '1',
        size: 4,
        x: 100,
      },
      {
        title: '年度积分',
        switch: true,
        family: '0',
        color: '0',
        size: 2,
        x: 5,
        y: 6,
      },
    ],
  }
})

const detailInfo = reactive({
  info: {
    tableData: [
      {
        title: '赛事名称',
        family: '0',
        color: '0',
        size: 8,
        x: 5,
        y: 6,
      },
      {
        title: '赛事项目',
        family: '0',
        color: '0',
        size: 5,
        x: 5,
        y: 6,
      },
    ],
    title: '共性',
    familyOptions,
    colorOptions
  },
  projectInfo: {
    tableData: allProjectInfo.data['L'],
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
  detailInfo.projectInfo.tableData = allProjectInfo.data[detailInfo.projectInfo.selInfo.type]
}
const getWarnTxt = (val) => {
  if (detailInfo.projectInfo.selInfo.type == 'L') {
    if (val.title == '时间') {
      return '不支持纵坐标修改。横坐标,在不显示时间的情况下，增加到代表队横坐标'
    } else if (val.title == '上一轮名次') {
      return '不支持纵坐标修改。横坐标，预赛,增加到QP横坐标'
    }

    else {
      return '不支持纵坐标修改'
    }
  } else if (detailInfo.projectInfo.selInfo.type == 'B') {
    if (val.title == '上一轮名次') {
      return '不支持纵坐标修改。横坐标，预赛,增加到成绩横坐标'
    } else {
      return '不支持纵坐标修改'
    }
  } else if (detailInfo.projectInfo.selInfo.type == 'A') {
    if (val.title == '上一轮名次') {
      return '不支持纵坐标修改。横坐标，预赛,增加到TP横坐标'
    } else {
      return '不支持纵坐标修改'
    }
  } else if (detailInfo.projectInfo.selInfo.type == 'AU') {
    if (val.title == '上一轮名次') {
      return '不支持纵坐标修改。横坐标，预赛,增加到总分横坐标'
    } else {
      return '不支持纵坐标修改'
    }
  }
  else {
    return '不支持纵坐标修改'
  }
}
const init = () => {
  allProjectInfo.data = JSON.parse(JSON.stringify(backupllProjectInfo.data))
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
    tableData: allProjectInfo.data['L'],
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

  let res = await Service.getFontStyleCom()
  // getInfoData.val = JSON.parse(JSON.stringify(res))
  console.log(res)
  if (res != undefined) {
    detailInfo.info = res.info
    let tem = {
      A: res.projectInfo.a,
      B: res.projectInfo.b,
      L: res.projectInfo.l,
      S: res.projectInfo.s,
      AU: res.projectInfo.au
    }
    allProjectInfo = tem

    backupllProjectInfo = JSON.parse(JSON.stringify(tem))

  }
}
const confirm = async () => {

  let res = await Service.setFontStyleCom(
    {

      info: detailInfo.info.tableData,
      projectInfo: {
        b: allProjectInfo.data.B,
        s: allProjectInfo.data.S,
        l: allProjectInfo.data.L,
        a: allProjectInfo.data.A,
        au: allProjectInfo.data.AU
      }
    }

  )
  // getInfoData.val = JSON.parse(JSON.stringify(res))
  if (res != undefined) {
    ElMessage.success('字体配置成功')

  }
}
onMounted(() => {
  getInfo()
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
