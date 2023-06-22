<template>
  <div class="navbar">
    <span class="title">壁虎王赛事配置系统</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'Navbar',
  components: {},
  props: {},
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.navbar {
  height: 3rem;
  overflow: hidden;
  text-align: center;
  background: #494747;
  font-size: 2rem;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.28);
}

.title {
  font-family: 黑体 !important;

}
</style>
