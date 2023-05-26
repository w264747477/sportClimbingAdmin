<template>
  <div style="display: flex; align-items: start">
    <YearTable></YearTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import YearTable from './components/yearTable/index.vue'

const props = defineProps<{ info: object }>()

// watch(
//   () => props.info,
//   (newVal) => {
//     if ((newVal ?? '') != '') {
//       title.value = newVal.title
//       tableData.val = newVal.tableData
//       if ((newVal.iptSec ?? '') != '') {
//         iptSec.val = newVal.iptSec
//       }
//     }
//   },
//   { immediate: true }
// )
</script>
<style scoped lang="scss">
</style>
