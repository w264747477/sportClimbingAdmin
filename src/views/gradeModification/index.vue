<template>
  <div class="box">
    <div class="formbox">
      <el-form :inline="true" :label-width="'160px'" :model="searchForm">
        <el-form-item label="类型">
          <el-select v-model="info.type" style="width: 190px">
            <el-option v-for="item in gameType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="info.gender" style="width: 190px">
            <el-option v-for="item in gender" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-select v-model="info.age" style="width: 190px">
            <el-option v-for="item in ageList()" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回合">
          <el-select v-model="info.round" style="width: 190px">
            <el-option v-for="item in gameType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

       
      </el-form>
    </div>
    <el-table v-if="info.type=='L'" ref="table" :data="tableData.L" border style="width: 50%; margin-bottom: 2rem; min-width: 1440px; width: 100%">
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
      <el-table-column  label="操作" min-width="120" >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="modifyGrade(scope.row)"
            >修改</el-button
          >
          </template>
        </el-table-column>
    </el-table>
    <el-table v-if="info.type=='B'" ref="table" :data="tableData.B" border style="width: 50%; margin-bottom: 2rem; min-width: 1440px; width: 100%">
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
      <el-table-column  label="操作" min-width="120" >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="modifyGrade(scope.row)"
            >修改</el-button
          >
        </template>
        </el-table-column>
    </el-table>
    <el-table v-if="info.type=='S'" ref="table" :data="tableData.S" border style="width: 50%; margin-bottom: 2rem; min-width: 1440px; width: 100%">
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
      <el-table-column  label="操作" min-width="120" >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="modifyGrade(scope.row)"
            >修改</el-button
          >
        </template>
        </el-table-column>
    </el-table>
  
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ageList, gender, gameType, round, speedRound } from '@/constant/index'
import Service from './api/index'
import { ElMessage } from 'element-plus'
const value = ref('0')
let info = reactive({
  type: 'S',
  gender: 'W',
  round: 'Q0',
  age: ''
})
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
const modifyGrade = async (item) => {
  let obj
  if (info.type=='L') {
    url = Service.api.difficultyModify
  
  } else if (info.type=='B') {
    url = Service.api.boulderingModify
    obj = {
        id: '',
        point1: item.point1, //单项和攀石 z,T
        point2: item.point2, // 全能三位 z,Z,t
        point3: item.point3,
        point4: item.point4,
        point5: item.point5
      }
  
  } else if( info.type=='S') {

    url = Service.api.speedModify

    obj = {
        id: '',
        scoreA: item.scoreA,
        scoreB: item.scoreB
      }
 
  } else {
    url = ''
    obj={}
    return
  }

  let res = await Service.postModify(url, obj)
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
