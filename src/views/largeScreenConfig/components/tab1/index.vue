<template>
  <div>
    <el-button type="primary" style="float: right; margin-bottom: 30px; margin-right: 30px" @click="dialogTableVisible = true">添加项目</el-button>
    <div>
      <h2>轮播项目</h2>

      <draggable v-model="state.list" class="wrapper" item-key="index" animation="300" @start="state.drag = true" @end="state.drag = false">
        <template #item="{ element }">
          <div class="item">
            <p>{{ element }}</p>
            <el-icon color="#fff" class="icn" size="14" @click="delItem(element)"><CircleCloseFilled /></el-icon>
          </div>
        </template>
      </draggable>
      <div style="display: flex; margin-top: 30px; align-items: center; margin-bottom: 50px">
        <span style="margin-right: 20px; white-space: nowrap">轮播间隔(秒)</span>
        <el-input v-model="state.sliderTime" placeholder="Please input" clearable style="width: 180px" />
      </div>
      <div class="middleBtn">
        <el-button type="primary">开始播放</el-button>
        <el-button type="primary">停止播放</el-button>
      </div>
    </div>
    <el-dialog v-model="dialogTableVisible" title="添加项目" :close-on-click-modal="false" class="my-dialog" :before-close="handleClose">
      <el-transfer v-model="value" :titles="['可选择项', '已选择项']" :data="data" class="tsv" />
      <div class="dialog-footer">
        <!-- <PromiseButton type="primary" @click="confirm">确 认</PromiseButton> -->
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const props = defineProps<{ info: object }>()
const state = reactive({
  drag: false,
  list: [1, 2, 3, 4, 5, 6],
  sliderTime: 0
})
const delItem = (val) => {
  state.list = state.list.filter((item) => item != val)
}
const dialogTableVisible = ref(false)
const handleClose = () => {
  dialogTableVisible.value = false
}
const confirm = () => {
  handleClose()
}
watch(
  () => props.info,
  (newVal) => {
    if ((newVal ?? '') != '') {
      title.value = newVal.title
      tableData.val = newVal.tableData
      if ((newVal.iptSec ?? '') != '') {
        iptSec.val = newVal.iptSec
      }
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #b7b4b4;
}

.tsv {
  display: flex;
  justify-content: center;
  align-items: center;
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
