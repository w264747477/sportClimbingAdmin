<template>
  <div class="box">
    <div class="formbox">
      <el-form :inline="true" :label-width="'160px'" :model="searchForm">
        <el-form-item label="类型">
          <el-select v-model="info.type" style="width: 190px" @change="change('type')">
            <el-option v-for="item in gameType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="info.gender" style="width: 190px" @change="change('gender')">
            <el-option v-for="item in genderList" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-select v-model="info.age" style="width: 190px" @change="change('age')">
            <el-option v-for="item in ageList()" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回合">
          <el-select v-if="info.type == 'S'" v-model="info.round" style="width: 190px" @change="change('round')">
            <el-option v-for="item in sround" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-else v-model="info.round" style="width: 190px" @change="change('round')">
            <el-option v-for="item in round" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <tableB :info="tableData.B" v-if="info.type == 'B'"></tableB>
    <tableL :info="tableData.L" v-if="info.type == 'L'"></tableL>
    <tableS :info="tableData.S" v-if="info.type == 'S'" @sucess="getInfo"></tableS>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ageList, gender, gameType, speedRound } from '@/constant/index'
import Service from './api/index'
import { ElMessage } from 'element-plus'
import tableS from './components/tableS/index.vue'
import tableB from './components/tableB/index.vue'
import tableL from './components/tableL/index.vue'
const value = ref('0')
let info = reactive({
  type: 'B',
  gender: 'M',
  round: 'Q0',
  age: ''
})
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
const props = defineProps<{ info: object }>()
const tableData = reactive({
  L: [
    {
      idx: 1,
      number: 1,
      country: '中国',
      name: '章三',
      gender: '女',
      round: 'Q0',
      group: 'A',
      scoreA: 78,
      scoreB: 34,
      timeA: '2:21',
      timeB: '4:11',
      score: 88,
      ranking: 1,
      raceType: '1'
    }
  ],
  B: [
    {
      id: 1,
      number: 1,
      country: '中国',
      name: '章三',
      gender: '女',
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
  S: []
})
const change = async (val) => {
  if (info.type != 'S' && ['F8', 'F4'].includes(info.round)) {
    info.round = 'Q0'
  }
  getInfo()
}
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
  console.log(info)
  let res = await Service.getScoreInfo(info)

  if (res != undefined) {
    tableData[info.type] = res == 1 ? [] : JSON.parse(JSON.stringify(res))
    // tableData[info.type] = JSON.parse(JSON.stringify(res))
    console.log(tableData.S)
  } else {
    ElMessage({ type: 'error', message: res.msg })
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
  justify-content: flex-start;
  width: 95%;
  height: 100%;
  margin: 0 auto;
  overflow: scroll;

  .formbox {
    height: 100%;
    width: 100%;
  }

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

// :deep .el-table__body {
//   //-webkit-border-horizontal-spacing: 13px;  // 水平间距
//   -webkit-border-vertical-spacing: 10px; // 垂直间距
//   border: none;
// }
// :deep .el-table__body {
//   -webkit-border-vertical-spacing: 0px !important;
// }
// :deep .el-scrollbar__view {
//   height: 40px;
// }
</style>
