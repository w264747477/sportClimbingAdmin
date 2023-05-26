<template>
  <div style="display: flex; align-items: start">
    <YearTable :info="{ title: '速度赛' }"></YearTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import YearTable from './components/yearTable/index.vue'

const props = defineProps<{ info: object }>()
const info = ref({})
watch(
  () => props.info,
  (newVal) => {
    if ((newVal ?? '') != '') {
      info.value = props.info
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
</style>
