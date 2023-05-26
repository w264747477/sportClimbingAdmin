<template>
  <div class="yearConfig">
    <span class="title"> 年度积分规则配置</span>
    <div style="">
      <YearRule :info="{ title: '速度赛' }" style="margin-bottom: 2rem"></YearRule>
      <el-button type="primary" style="display: block; width: 10rem; margin: 0 auto">{{ info.btnTxt }}</el-button>
    </div>
    <YearRule :info="{ title: '攀石赛' }" style="margin-bottom: 2rem; margin-top: 2rem"></YearRule>
    <YearRule :info="{ title: '难度赛' }" style="margin-bottom: 2rem"></YearRule>
    <YearRule :info="{ title: '全能赛' }" style="margin-bottom: 2rem"></YearRule>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import YearRule from '../yearRule/index.vue'

const props = defineProps<{ info: object }>()
const info = {
  btnTxt: '',
  data: {}
}
watch(
  () => props.info,
  (newVal) => {
    if ((newVal ?? '') != '') {
      ;(info.btnTxt = newVal.btnTxt), (info.data = newVal.data)
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  margin-left: 5rem;
  .txt {
    font-weight: 700;
  }
}
.title {
  font-weight: 700;
  margin-bottom: 2rem;
}
:deep .el-table__body {
  -webkit-border-vertical-spacing: 0px !important;
}
:deep .el-scrollbar__view {
  height: 40px;
}
// 表格
</style>
