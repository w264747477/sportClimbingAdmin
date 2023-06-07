<template>
  <div class="box">
    <div class="slt">
      <span>类别</span>
      <!-- <el-select v-model="gameType" class="m-2" placeholder="请选择" size="mini">
        <el-option v-for="item in gameTypeList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> -->
      <el-select v-model="value" class="m-2" placeholder="请选择" size="mini" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <el-table v-if="['0', '1', '2'].includes(value)" ref="table" :data="tableData.L" border style="width: 50%; margin-bottom: 2rem; min-width: 1440px; width: 100%">
      <el-table-column prop="idx" label="出场序号" min-width="120" />
      <el-table-column prop="number" label="选手编号" min-width="120" />
      <el-table-column prop="country" label="国家" min-width="120" />
      <el-table-column prop="name" label="姓名" min-width="120" />
      <el-table-column prop="sex" label="性别" min-width="120" />
      <el-table-column prop="round" label="比赛轮次" min-width="120" />
      <el-table-column prop="group" label="组别" min-width="120" />
      <el-table-column prop="scoreA" label="A道成绩" min-width="120" />
      <el-table-column prop="scoreB" label="B道成绩" min-width="120" />
      <el-table-column prop="timeA" label="A道时间" min-width="120" />
      <el-table-column prop="timeB" label="B道时间" min-width="120" />
      <el-table-column prop="score" label="排名得分" min-width="120" />
      <el-table-column prop="ranking" label="排名" min-width="120" />
    </el-table>
    <el-table v-if="['3', '4', '5'].includes(value)" ref="table" :data="tableData.B" border style="width: 50%; margin-bottom: 2rem; min-width: 1440px; width: 100%">
      <el-table-column prop="idx" label="出场序号" min-width="120" />
      <el-table-column prop="number" label="选手编号" min-width="120" />
      <el-table-column prop="country" label="国家" min-width="120" />
      <el-table-column prop="name" label="姓名" min-width="120" />
      <el-table-column prop="sex" label="性别" min-width="120" />
      <el-table-column prop="round" label="比赛轮次" min-width="120" />
      <el-table-column prop="group" label="组别" min-width="120" />
      <el-table-column prop="point1" label="一线路  分1&分2&成绩" min-width="120" />
      <el-table-column prop="point2" label="二线路  分1&分2&成绩" min-width="120" />
      <el-table-column prop="point3" label="三线路  分1&分2&成绩" min-width="120" />
      <el-table-column prop="point4" label="四线路  分1&分2&成绩" min-width="120" />
      <el-table-column prop="point5" label="五线路  分1&分2&成绩" min-width="120" />
      <el-table-column prop="score" label="成绩" min-width="120" />
      <el-table-column prop="attz" label="attz" min-width="120" />
      <el-table-column prop="attT" label="attT" min-width="120" />
      <el-table-column prop="ranking" label="排名" min-width="120" />
    </el-table>
    <el-table v-if="['6', '7', '8'].includes(value)" ref="table" :data="tableData.S" border style="width: 50%; margin-bottom: 2rem; min-width: 1440px; width: 100%">
      <el-table-column prop="idx" label="出场序号" min-width="120" />
      <el-table-column prop="number" label="选手编号" min-width="120" />
      <el-table-column prop="country" label="国家" min-width="120" />
      <el-table-column prop="name" label="姓名" min-width="120" />
      <el-table-column prop="sex" label="性别" min-width="120" />
      <el-table-column prop="round" label="比赛轮次" min-width="120" />
      <el-table-column prop="group" label="组别" min-width="120" />
      <el-table-column prop="scoreA" label="A道成绩" min-width="120" />
      <el-table-column prop="scoreB" label="B道成绩" min-width="120" />

      <el-table-column prop="score" label="有效成绩" min-width="120" />
      <el-table-column prop="ranking" label="排名" min-width="120" />
    </el-table>
    <el-button type="primary" style="margin: 0 auto" @click="modifyGrade()">修改</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import Service from './api/index'
import { ElMessage } from 'element-plus'
const value = ref('0')
// const gameType = ref('')
// const gameTypeList = [
//   {
//     value: '0',
//     label: '难度赛'
//   },
//   {
//     value: '1',
//     label: '攀石赛'
//   },
//   {
//     value: '2',
//     label: '速度赛'
//   }
// ]
const options = [
  {
    value: '0',
    label: '成年组_男子_难度赛_预赛'
  },
  {
    value: '1',
    label: '成年组_男子_难度赛_半决赛'
  },
  {
    value: '2',
    label: '成年组_男子_难度赛_决赛'
  },
  {
    value: '3',
    label: '成年组_男子_攀石赛_预赛'
  },
  {
    value: '4',
    label: '成年组_男子_攀石赛_半决赛'
  },
  {
    value: '5',
    label: '成年组_男子_攀石赛_决赛'
  },
  {
    value: '6',
    label: '成年组_男子_速度赛_预赛'
  },
  {
    value: '7',
    label: '成年组_男子_速度赛_半决赛'
  },
  {
    value: '8',
    label: '成年组_男子_速度赛_决赛'
  }
]
const props = defineProps<{ info: object }>()
const tableData = reactive({
  L: [
    {
      idx: 1,
      number: 1,
      country: '中国',
      name: '章三',
      sex: '女',
      round: 'Q0',
      group: 'A',
      scoreA: 78,
      scoreB: 34,
      timeA: '2018-12-23',
      timeB: '2018-12-23',
      score: 88,
      ranking: 1
    }
  ],
  B: [
    {
      idx: 1,
      number: 1,
      country: '中国',
      name: '章三',
      sex: '女',
      round: 'Q0',
      group: 'A',
      point1: 78,
      point2: 78,
      point3: 78,
      point4: 78,
      point5: 78,
      score: 55,
      attz: 1,
      attT: 2,
      ranking: 1
    }
  ],
  S: [
    {
      idx: 1,
      number: 1,
      country: '中国',
      name: '章三',
      sex: '女',
      round: 'Q0',
      group: 'A',
      scoreA: 78,
      scoreB: 34,
      score: 88,
      ranking: 1
    }
  ]
})

const changeCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    borderTop: '1px solid #eaeef5',
    borderBottom: '1px solid #eaeef5'
  }
  if (columnIndex == 0) {
    obj.borderLeft = '1px solid #eaeef5'
  }
  if (columnIndex == 4) {
    obj.borderRight = '1px solid #eaeef5'
  }
  return obj
}
const headerRowStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    border: 'none',
    color: '#2c3e50'
  }

  return obj
}
const getInfo = async () => {
  let data = {
    type: 'S',
    gender: 'M',
    round: 'Q0',
    age: 'U16'
  }
  let res = await Service.getScoreInfo(data)
  console.log(res)
}
const modifyGrade = async () => {
  console.log('11')
  let url
  let data
  console.log()
  if (['0', '1', '2'].includes(value.value)) {
    url = Service.api.difficultyModify
    data = {}
  } else if (['3', '4', '5'].includes(value.value)) {
    url = Service.api.boulderingModify
    let obj
    tableData.B.map((item) => {
      obj = {
        id: '',
        point1: item.point1, //单项和攀石 z,T
        point2: item.point2, // 全能三位 z,Z,t
        point3: item.point3,
        point4: item.point4,
        point5: item.point5
      }
      data.push(obj)
    })
  } else if (['6', '7', '8'].includes(value.value)) {
    console.log('2')
    url = Service.api.speedModify
    console.log('3')
    let obj
    tableData.S.map((item) => {
      obj = {
        id: '',
        scoreA: tableData.S.scoreA,
        scoreB: tableData.S.scoreB
      }
      data.push(obj)
    })
  } else {
    url = ''
    return
  }
  console.log(data)
  let res = await Service.postModify(url, data)
  if (res) {
    ElMessage({
      type: 'success',
      message: '成绩修改成功'
    })
  }
}
onMounted(() => {
  getInfo()
})
</script>
<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  align-items: flex-start;
  width: 95%;
  height: 100%;
  margin: 0 auto;
  .slt {
    margin-bottom: 2rem;
    span {
      font-size: 1rem;
      font-weight: 700;
      margin-right: 2rem;
    }
  }
}
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
:deep .el-table__body {
  -webkit-border-vertical-spacing: 0px !important;
}
:deep .el-scrollbar__view {
  height: 40px;
}
</style>
