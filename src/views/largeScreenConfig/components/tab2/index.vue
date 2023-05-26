<template>
  <div>
    <el-table :data="tableData.val" border>
      <el-table-column prop="type" label="类别" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="img" label="当前图片" align="center" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="" label="操作" align="center" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <!-- <el-button
            v-if="showInfo(scope.row)"
            type="text"
            @click="orderInfo(scope.row)"
            >备货信息</el-button
          > -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :file-list="fileList"
            accept=".jpg"
            :on-success="commercialContractSucess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleImageError"
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="text">更新</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="tableData.val" border>
      <el-table-column prop="type" label="类别" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="img" label="当前图片" align="center" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="" label="操作" align="center" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <!-- <el-button
            v-if="showInfo(scope.row)"
            type="text"
            @click="orderInfo(scope.row)"
            >备货信息</el-button
          > -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :file-list="fileList"
            accept=".jpg"
            :on-success="commercialContractSucess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleImageError"
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="text">更新</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ReadJPG, ReadJPGBase64 } from '@/utils/imageDimension.js'

const props = defineProps<{ info: object }>()
const tableData = reactive({
  val: [
    {
      type: '赛事名称条',
      img: 'https://fc1tn.baidu.com/it/u=2676575347,2964745498&fm=202&mola=new&crop=v1',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      type: '赛事项目条',
      img: 'https://fc1tn.baidu.com/it/u=2676575347,2964745498&fm=202&mola=new&crop=v1',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      type: '滚动条',
      img: 'https://fc1tn.baidu.com/it/u=2676575347,2964745498&fm=202&mola=new&crop=v1',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      type: 'logo',
      img: 'https://fc1tn.baidu.com/it/u=2676575347,2964745498&fm=202&mola=new&crop=v1',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    }
  ]
})
const beforeAvatarUpload = (file) => {
  const extension = file.size / 1024 / 1024 <= 20
  const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
  if (!extension) {
    ElMessage.error('文件大小超过20M!')
    return false
  }
  const img = new Image()
  const _URL = window.URL || window.webkitURL
  img.src = _URL.createObjectURL(file)
  img.onload = function () {
    console.log(img.width, img.height)

    return extension
  }
  // 判断图片的大小
}
const commercialContractSucess = (response, file, fileList) => {
  console.log(response)
  if (response.stateCode == '00000') {
    this.businessList.commercialContract = response.data
    const arr = this.deepClone(this.$store.state.osModule.fileList)
    arr.push(response.data.fileKey)
    this.$store.commit('osModule/setFileList', arr)
  } else {
    this.$message.error(response.message)
  }
}
const handleImageError = () => {
  this.$message.error('上传文件失败')
}
const fileList = []
const pageInfo = {
  page: 1,
  size: 5,
  sizes: [5, 15, 20],
  total: 100,
  layout: 'total, prev, pager, next, jumper, sizes'
}
const generateData = () => {
  const data: Option[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0
    })
  }
  return data
}

const data = ref<Option[]>(generateData())
const value = ref([])
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const handleClose = () => {
  dialogTableVisible.value = false
}
const confirm = () => {
  dialogTableVisible = false
}
const handleSizeChange = (val) => {
  pageInfo.size = val
}
const handlePageChange = (val) => {
  pageInfo.page = val
}
const handleRemove = (file, fileList) => {
  console.log(file, fileList)
}
const handlePreview = (file) => {
  console.log(file)
}
const handleExceed = (files, fileList) => {
  ElMessage.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
}
const beforeRemove = (file, fileList) => ElMessage.warning(`确定移除 ${file.name}？`)
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
.tsv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>
