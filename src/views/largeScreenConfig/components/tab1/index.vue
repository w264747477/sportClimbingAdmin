<template>
  <div>
    <!-- <el-button type="primary" style="float: right; margin-bottom: 30px; margin-right: 30px"
      @click="dialogTableVisible = true">添加项目</el-button> -->
    <addItem :info="state" @sucess="addSucess" style="float: right; margin-bottom: 30px; margin-right: 30px"></addItem>
    <div>
      <h2>轮播项目</h2>

      <draggable v-model="state.list" class="wrapper" :disabled="state.isShow == false" item-key="index" animation="300"
        @start="state.drag = true" @end="state.drag = false">
        <template #item="{ element }">
          <div class="item">
            <p>{{ element }}</p>
            <el-icon color="#fff" class="icn" size="14" @click="delItem(element)">
              <CircleCloseFilled />
            </el-icon>
          </div>
        </template>
      </draggable>
      <div style="display: flex; margin-top: 30px; align-items: center; margin-bottom: 50px">
        <span style="margin-right: 20px; white-space: nowrap">轮播间隔(秒)</span>
        <el-input v-model="state.sliderTime" placeholder="Please input" clearable style="width: 180px" />
      </div>
      <div class="middleBtn">
        <el-button type="primary" :disabled="state.isShow == false" @click="updateConfig(false)">开始播放</el-button>
        <el-button type="primary" :disabled="state.isShow == true" @click="updateConfig(true)">停止播放</el-button>
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
  list: [1, 2, 3],
  allList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  sliderTime: 0,
  isShow: false
})

const delItem = (val) => {
  state.list = state.list.filter((item) => item != val)
}

const addSucess = (val) => {
  state.list = val.temList
  state.allList = val.allList.map(item => {
    return item.key
  })
  console.log(val)
}
const confirm = () => {
  handleClose()
}
const updateConfig = async (val) => {
  state.isShow = val

  let res = await Service.setSliderConfig({
    isShow: val,
    list: state.list,
    time: state.sliderTime
  })
  if (res != undefined) {

    state.isShow = val
  } else {
    state.isShow = !val
  }
}
const getInfo = async () => {
  let res = await Service.getSliderConfig()
  if (res != undefined) {
    let tem = JSON.parse(JSON.stringify(res))
    state.list = tem.list
    state.sliderTime = tem.sliderTime
    state.allList = tem.allList,
      state.isShow = tem.isShow
  }
}
onMounted(() => {
  // getInfo()
})
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #b7b4b4;
  min-height: 4rem;
}


.item {
  width: 120px;
  height: 30px;
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
  width: 140px;
  height: 38px;
  font-size: 20px;
  line-height: 38px;
}
</style>
