<template>
  <div>
    <div style="margin-bottom: 20px; margin-left: 10px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="成绩名单" name="first">
          <all :info="1"></all>

        </el-tab-pane>
        <el-tab-pane label="晋级名单" name="second">
          <all :info="2"></all>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import all from './components/all/index.vue'

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
let info = reactive({
  gradeList: {
    type: 'B',
    gender: 'M',
    round: 'Q0',
    age: ''
  }
})
const activeName = ref('first')
</script>
<style scoped lang="scss"></style>
