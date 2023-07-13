<template>
  <div class="box">
    <div style="margin-bottom: 20px; margin-left: 10px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="轮播任务" name="0">
          <tab1 v-if="activeName == '0'"></tab1>
        </el-tab-pane>
        <el-tab-pane label="背景设置" name="1" :disabled="state != 0">
          <tab2 v-if="activeName == '1'"></tab2>
        </el-tab-pane>
        <el-tab-pane label="字体设置" name="2" :disabled="state != 0">
          <tab3 v-if="activeName == '2'"></tab3>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, watch } from 'vue'
import { ElMessage, TabsPaneContext } from 'element-plus'

import Service from './api/index.ts'
import tab1 from './components/tab1/index.vue'
import tab2 from './components/tab2/index.vue'
import tab3 from './components/tab3/index.vue'
import { useStore } from '@/store/index'
interface Option {
  key: number
  label: string
  disabled: boolean
}
const activeName = ref('0')
let store = useStore()
let state = ref(0)
watch(
  () => store.state.dataModule.isRunning,
  (newVal) => {
    state.value = newVal
    console.log(state.value)
  },
  { deep: true, immediate: true },

)
</script>
<style scoped lang="scss">
:deep .el-table__body {
  //-webkit-border-horizontal-spacing: 13px;  // 水平间距
  -webkit-border-vertical-spacing: 10px; // 垂直间距
  border: none;
}

.box {
  font-size: 14px;
}
</style>
