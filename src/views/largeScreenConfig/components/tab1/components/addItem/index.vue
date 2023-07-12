
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
import Service from '@/views/largeScreenConfig/api/index'
let detailInfo = reactive({
  allList: [],
  temList: [],
  isShow: false
})
const emit = defineEmits(["sucess"])
const props = defineProps<{ info: object }>()
let dialogTableVisible = ref(false)
const handleClose = () => {
  dialogTableVisible.value = false
  detailInfo.allList = []
  detailInfo.temList = []

}
const getSliderBroad = async () => {
  let res = await Service.getSliderBroad()

  if (res != undefined) {
    state.list = res.rollList

  }
}
const delItem = (val) => {
  state.list = state.list.filter((item) => item != val)
}
//设置轮播项目
const setSliderItem = async (val) => {
  let res = await Service.setSliderBroad({
    rollList: val,

  })
  if (res != undefined) {

    state.isShow = val == 0 ? true : false
  }
}
const confirm = () => {

  emit('sucess', JSON.parse(JSON.stringify(detailInfo.temList)))
  handleClose()
}
watch(
  () => dialogTableVisible.value,
  (newVal) => {
    if (newVal) {
      console.log(props.info)
      detailInfo.allList = props.info.allList?.map(item => {
        item.key = item.id,
          item.label = item.name
        return item
      })
      detailInfo.temList = props.info.list?.map(item => {

        return item.id
      })
      detailInfo.isShow = props.info.isShow
      console.log(detailInfo.temList)
    }
    // if ((newVal ?? '') != '') {
    //   console.log(newVal)
    //   detailInfo.allList = newVal.allList?.map(item => {
    //     item.key = item.id,
    //       item.label = item.name
    //     return item
    //   })
    //   detailInfo.temList = newVal.list?.map(item => {
    //     item.key = item.id,
    //       item.label = item.name
    //     return item
    //   })
    //   detailInfo.isShow = newVal.isShow
    //   console.log(detailInfo)
    // }
  },
  { deep: true, immediate: true },

)

watch(
  () => props.info,
  (newVal) => {

    if ((newVal ?? '') != '') {
      console.log(newVal)
      detailInfo.allList = newVal.allList?.map(item => {
        item.key = item.id,
          item.label = item.name
        return item
      })
      detailInfo.temList = newVal.list?.map(item => {
        item.key = item.id,
          item.label = item.name
        return item
      })
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
  margin-bottom: 20px;

}

:deep .el-transfer-panel {
  width: 250px;
}
</style>
