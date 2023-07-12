<template>
  <div>
    <!-- <el-button type="primary" style="float: right; margin-bottom: 30px; margin-right: 30px"
      @click="dialogTableVisible = true">添加项目</el-button> -->
    <addItem :info="state" @sucess="addSucess" style="float: right; margin-bottom: 30px; margin-right: 30px"></addItem>
    <div>
      <h2>轮播项目</h2>

      <draggable v-model="state.list" class="wrapper" :disabled="state.isShow == false" animation="300"
        @start="state.drag = true" @end="state.drag = false">

        <!-- <div v-for="element in state.list" :key="element.id" class="item">
          <p> {{ element.name }}</p>
          <el-icon color="#fff" class="icn" size="14" @click="delItem(element.id)">
            <CircleCloseFilled />
          </el-icon>

        </div> -->

        <template #item="{ element }">
          <div class="item">
            <p>{{ element.name }}</p>
            <el-icon color="#fff" class="icn" size="14" @click="delItem(element.id)">
              <CircleCloseFilled />
            </el-icon>
          </div>
        </template>
      </draggable>
      <div style="display: flex; margin-top: 30px; align-items: center; margin-bottom: 50px">
        <span style="margin-right: 20px; white-space: nowrap">轮播间隔(秒)</span>
        <el-input v-model="state.sliderTime" placeholder="请输入轮播时间" clearable style="width: 180px" />
      </div>
      <div class="middleBtn">
        <el-button type="primary" :disabled="state.isShow == false" @click="updateConfig(1)">开始播放</el-button>
        <el-button type="primary" :disabled="state.isShow == true" @click="updateConfig(0)">停止播放</el-button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import Service from '../../api'
import addItem from './components/addItem/index.vue'
const props = defineProps<{ info: object }>()
const state = reactive({
  drag: false,
  list: [],
  allList: [],
  sliderTime: 10,
  isShow: false
})

const delItem = (val) => {
  state.list = state.list.filter((item) => item.id != val)
}

const addSucess = (val) => {
  console.log(val)
  state.list = state.allList.filter(item => {
    return val.includes(item.id)
  })



}
const confirm = () => {
  handleClose()
}
//获取轮播状态
const getSliderStatus = async () => {
  let res = await Service.getSliderStatus()

  if (res != undefined) {

    state.isShow = res.rollStatus == 0 ? true : false
    state.sliderTime = res.rollInterval == null ? 10 : res.rollInterval
  }
}
//设置轮播状态
const updateConfig = async (val) => {
  let res;
  if (val == 0) {
    res = await Service.setSliderStatusStop()
  } else {
    res = await Service.setSliderStatusStart({
      data: state.list,
      time: state.sliderTime
    })
  }
  // let res = await Service.setSliderStatus({
  //   data: state.list
  // })
  if (res != undefined) {

    state.isShow = val == 0 ? true : false
  }
}
//获取正在轮播的项目
const getSliderBroad = async () => {
  let res = await Service.getSliderBroad()

  if (res != undefined) {
    state.list = res

  }
}
//获取所有轮播的项目
const getSliderAll = async () => {
  let res = await Service.getSliderAll()

  if (res != undefined) {
    state.allList = res

  }
}

onMounted(() => {

  getSliderStatus()
  getSliderBroad()
  getSliderAll()
})
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  background-color: #b7b4b4;
  min-height: 4rem;
}


.item {
  width: 250px;
  height: 35px;
  font-size: 16px;
  text-align: center;
  padding: 4px;
  line-height: 30px;
  margin: 10px;
  background-color: #05aef6;
  color: #f3f4f5;
  position: relative;

  .icn {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(40%, -40%);
  }
}

.item:hover {
  // width: 140px;
  // height: 38px;
  // font-size: 20px;
  // line-height: 38px;
  cursor: pointer;
}
</style>
