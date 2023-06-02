<template>
  <div>
    <div class="box">
      <ConfigTable :info="geInfo"></ConfigTable>
      <ConfigTable :info="projectInfo"></ConfigTable>
      <div class="middleBtn">
        <!-- <PromiseButton type="primary" @click="confirm">确 认</PromiseButton> -->
        <el-button @click="handleClose">重置</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </div>
    <div class="box">
      <ConfigTable :info="speedInfo"></ConfigTable>
      <div class="middleBtn">
        <!-- <PromiseButton type="primary" @click="confirm">确 认</PromiseButton> -->
        <el-button @click="handleClose">重置</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import ConfigTable from './configTable/index.vue'

const props = defineProps<{ info: object }>()

const familyOptions = [
  {
    value: '0',
    label: '宋体'
  },
  {
    value: '1',
    label: '微软雅黑'
  },
  {
    value: '2',
    label: '黑体'
  }
]
const colorOptions = [
  {
    value: '0',
    label: '黑'
  },
  {
    value: '1',
    label: '白'
  }
]
// 共性
const geInfo = reactive({
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
})
// 项目
const projectInfo = reactive({
  tableData: [
    {
      title: '排名',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    },
    {
      title: '运动员号码',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    },
    {
      title: '代表队',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    },
    {
      title: '年度积分',
      switch: true,
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    }
  ],
  title: '项目',
  selInfo: {
    value: '0',
    selOptions: [
      {
        value: '0',
        label: '攀石赛'
      },
      {
        value: '1',
        label: '速度赛'
      }
    ]
  },

  familyOptions,
  colorOptions
})
// 速度赛对阵图
const speedInfo = reactive({
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
    },
    {
      title: '运动员号码',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    },
    {
      title: '代表队',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    },
    {
      title: '姓名',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    },
    {
      title: '成绩',
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6
    }
  ],
  title: '速度赛对阵图',
  familyOptions,
  colorOptions
})

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
</script>
<style scoped lang="scss">
.box {
  width: 95%;
  margin: 0 auto;
  height: 100%;
  border: 1px solid #f1f4f8;
  padding: 1rem;
}

:deep .el-table__body {
  //-webkit-border-horizontal-spacing: 13px;  // 水平间距
  -webkit-border-vertical-spacing: 10px; // 垂直间距
  border: none;
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
