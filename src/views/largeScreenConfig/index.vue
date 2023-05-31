<template>
  <div class="box">
    <div style="margin-bottom: 20px; margin-left: 10px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="轮播任务" name="first">
          <tab1></tab1>
        </el-tab-pane>
        <el-tab-pane label="背景设置" name="second">
          <tab2></tab2>
        </el-tab-pane>
        <el-tab-pane label="字体设置" name="thrid">
          <tab3></tab3>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog v-model="dialogTableVisible" title="添加项目" :close-on-click-modal="false" custom-class="my-dialog" :before-close="handleClose">
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
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage, TabsPaneContext } from 'element-plus'

import Service from './api/index'
import tab1 from './components/tab1/index.vue'
import tab2 from './components/tab2/index.vue'
import tab3 from './components/tab3/index.vue'

interface Option {
  key: number
  label: string
  disabled: boolean
}
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
