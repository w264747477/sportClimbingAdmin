<!--
 * @Author: GeekQiaQia
 * @Date: 2022-02-18 16:13:43
 * @LastEditTime: 2022-04-28 11:14:35
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /github/vue3.0-template-admin/src/App.vue
-->
<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
import { computed, onMounted } from 'vue'
import { useStore } from '@/store/index'

const store = useStore()
const resizeHeight = () => {
  const { clientHeight } = document.body // 获取文档可视区域的宽度
  const height = Math.max(600, clientHeight - 170) // 保证最小值大于600
  store.commit('settingsModule/setTableHeight', height) // 设置tableHeight
}
onMounted(() => {
  // store.dispatch('permissionModule/getPermissions')
})
resizeHeight()
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.element-plus-logo {
  width: 50%;
}
//对话框按钮靠右显示
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}
//按钮居中显示
.middleBtn {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
</style>
