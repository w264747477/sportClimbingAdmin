<template>
  <div>
    <div style="margin-bottom: 20px; margin-left: 10px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="成绩名单" name="first">
          <el-button type="primary" style="display: block; width: 5rem; margin: 0 auto" @click="saveGrown">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="晋级名单" name="second">紧急</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const activeName = ref('first')
</script>
<style scoped lang="scss">
</style>
