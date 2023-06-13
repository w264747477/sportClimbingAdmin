
<template>
  <div class="box">
    <el-button type="primary" @click="dialogTableVisible = true" :disabled="detailInfo.isShow == false">添加项目</el-button>
    <el-dialog v-model="dialogTableVisible" append-to-body title="添加项目" :close-on-click-modal="false" class="my-dialog"
      :before-close="handleClose">
      <el-transfer v-model="detailInfo.temList" :titles="['可选择项', '已选择项']" :data="detailInfo.allList" class="tsv" />
      <div class="dialog-footer">
        <!-- <PromiseButton type="primary" @click="confirm">确 认</PromiseButton> -->
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { defineEmits } from 'vue'
let detailInfo = reactive({
  allList: [],
  temList: [],
  isShow: false
})
const emit = defineEmits(["sucess"])
const props = defineProps<{ info: object }>()
const dialogTableVisible = ref(false)
const handleClose = () => {
  dialogTableVisible.value = false
  detailInfo.allList = []
  detailInfo.temList = []
  detailInfo.isShow = true
}
const delItem = (val) => {
  state.list = state.list.filter((item) => item != val)
}
const confirm = () => {
  emit('sucess', JSON.parse(JSON.stringify(detailInfo)))
  handleClose()
}
watch(
  () => props.info,
  (newVal) => {
    if ((newVal ?? '') != '') {
      detailInfo.allList = newVal.allList.map(item => {
        return {
          key: item,
          label: item
        }
      })
      detailInfo.temList = newVal.list
      detailInfo.isShow = newVal.isShow
      console.log(detailInfo)
    }
  },
  { deep: true, immediate: true },

)
</script>

<style lang="scss" scoped>
// .my-dialog {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;

// }
.tsv {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
