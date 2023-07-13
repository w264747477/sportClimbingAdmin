<template>
  <div class="box">
    <div class="box_item">
      <span>常规</span>
      <!-- <el-button @click="updateInit">更新</el-button> -->
      <el-table :data="tableData.val" border>
        <el-table-column prop="type" label="类别" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="img" label="当前图片" align="center" min-width="120" show-overflow-tooltip>
          <template #default="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="" label="操作" align="center" min-width="120" show-overflow-tooltip>
          <template #default="scope">

            <el-upload class="upload-demo" action="/sportClimbingAdmin/api/static/uploadImage"
              :before-remove="beforeRemove" :limit="3" :file-list="info.fileList" accept=".jpg" :on-success="uploadSucess"
              :before-upload="beforeAvatarUpload" :on-error="handleImageError" :on-exceed="handleExceed">
              <el-button size="small" type="text" @click="updateTag(scope.row.value)">更新</el-button>

            </el-upload>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="box_item">
      <span>速度赛对阵图</span>
      <el-table :data="tableData.speedVal" border>
        <el-table-column prop="type" label="类别" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="img" label="当前图片" align="center" min-width="120" show-overflow-tooltip>
          <template #default="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="" label="操作" align="center" min-width="120" show-overflow-tooltip>
          <template #default="scope">

            <el-upload class="upload-demo" action="/sportClimbingAdmin/api/static/uploadImage"
              :before-remove="beforeRemove" :limit="3" :file-list="info.fileList" accept=".jpg" :on-success="uploadSucess"
              :before-upload="beforeAvatarUpload" :on-error="handleImageError" :on-exceed="handleExceed">
              <el-button size="small" type="text" @click="updateTag(scope.row.value)">更新</el-button>

            </el-upload>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ReadJPG, ReadJPGBase64 } from '@/utils/imageDimension.js'
import Service from '../../api'
const props = defineProps<{ info: object }>()
const tableData = reactive({
  val: [
    {
      value: 0,
      type: '赛事名称条',
      img: 'https://s1.ax1x.com/2023/06/14/pCnaOkF.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      value: 1,
      type: '赛事项目条',
      img: 'https://s1.ax1x.com/2023/06/14/pCnrVy9.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      value: 2,
      type: '滚动条',
      img: 'https://s1.ax1x.com/2023/06/14/pCnDlKs.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      value: 3,
      type: 'logo',
      img: 'https://s1.ax1x.com/2023/06/14/pCnEVzR.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    }
  ],
  speedVal: [
    {
      value: 4,
      type: '赛事名称条',
      img: 'https://s1.ax1x.com/2023/06/15/pCutTDf.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      value: 5,
      type: '赛事项目条',
      img: 'https://s1.ax1x.com/2023/06/15/pCut7b8.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      value: 6,
      type: '滚动条',
      img: 'https://s1.ax1x.com/2023/06/15/pCuNGRA.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    },
    {
      value: 7,
      type: '背景图',
      img: 'https://s1.ax1x.com/2023/06/15/pCuNDiQ.png',
      remark: '仅支持xxx*xxx像素，不超过xxx大小的jpg格式'
    }
  ]
})
let state = reactive({
  currentItem: ''
})
const updateTag = (val) => {
  state.currentItem = val
}
const beforeAvatarUpload = (file) => {
  const extension = file.size / 1024 / 1024 <= 20
  const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
  if (!extension) {
    ElMessage.error('图片大小超过20M!')
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
const uploadSucess = async (response, file, fileList) => {

  if (response.code == 200) {

    if (state.currentItem > 3) {
      // let tem = JSON.parse(JSON.stringify(tableData.speedVal))
      // tem[state.currentItem - 4].img = response.data.url
      tableData.speedVal[state.currentItem - 4].img = response.data.url
      let res = await setImg({
        com: {
          nameStrip: tableData.val[0].img,
          entryBar: tableData.val[1].img,
          scrollBar: tableData.val[2].img,
          logo: tableData.val[3].img,
        },
        speed: {
          nameStrip: tableData.speedVal[0].img,
          entryBar: tableData.speedVal[1].img,
          scrollBar: tableData.speedVal[2].img,
          backImg: tableData.speedVal[3].img

        }
      })
      if (res) {
        tableData.speedVal[state.currentItem - 4].img = response.data.url
        info.fileList = []
        ElMessage.success('图片更新成功')
      }
    } else {
      // let tem = JSON.parse(JSON.stringify(tableData.val))
      // tem[state.currentItem].img = response.data.url
      tableData.val[state.currentItem].img = response.data.url
      let res = await setImg({
        com: {
          nameStrip: tableData.val[0].img,
          entryBar: tableData.val[1].img,
          scrollBar: tableData.val[2].img,
          logo: tableData.val[3].img,
        },
        speed: {
          nameStrip: tableData.speedVal[0].img,
          entryBar: tableData.speedVal[1].img,
          scrollBar: tableData.speedVal[2].img,
          backImg: tableData.speedVal[3].img

        }
      })
      if (res) {
        tableData.val[state.currentItem].img = response.data.url
        info.fileList = []
        ElMessage.success('图片更新成功')
      }
    }


  }
}
const handleImageError = () => {
  ElMessage.error('图片更新失败!')
}
let info = reactive({
  fileList: []
})

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
const updateInit = async () => {
  let res = await setImg({
    com: {
      nameStrip: tableData.val[0].img,
      entryBar: tableData.val[1].img,
      scrollBar: tableData.val[2].img,
      logo: tableData.val[3].img,
    },
    speed: {
      nameStrip: tableData.speedVal[0].img,
      entryBar: tableData.speedVal[1].img,
      scrollBar: tableData.speedVal[2].img,
      backImg: tableData.speedVal[3].img

    }
  })
  if (res) {

    ElMessage.success('图片更新成功')
  }

}
const getInfo = async () => {

  let res = await Service.getBackgroundImgConfig()
  if (res) {
    tableData.val[0].img = res.com.nameStrip
    tableData.val[1].img = res.com.entryBar
    tableData.val[2].img = res.com.scrollBar
    tableData.val[3].img = res.com.logo
    tableData.speedVal[0].img = res.speed.nameStrip
    tableData.speedVal[1].img = res.speed.entryBar
    tableData.speedVal[2].img = res.speed.scrollBar
    tableData.speedVal[3].img = res.speed.backImg

  }

}
const setImg = async (data) => {

  let res = await Service.setBackgroundImg(data)
  return res

}
onMounted(() => {
  //getInfo()
})
</script>
<style scoped lang="scss">
.box {
  width: 95%;
  margin: 0 auto;
  height: 100%;

  .box_item {
    margin-bottom: 2rem;

    &>span {
      white-space: nowrap;
      display: block;
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1rem;
    }
  }
}

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
