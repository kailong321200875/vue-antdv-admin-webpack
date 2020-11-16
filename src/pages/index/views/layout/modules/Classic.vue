<template>
  <a-layout class="app-wrapper">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <silder :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <navbar />
      </a-layout-header>
      <a-layout-content>
        <tags-nav style="height: 40px;" />
        <app-main />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '_p/index/store/modules/app'
import Silder from '../components/Silder/index.vue'
import Navbar from '../components/Navbar.vue'
import AppMain from '../components/AppMain.vue'
import TagsNav from '_c/TagsNav/index.vue'
export default defineComponent({
  name: 'Classic',
  components: {
    Silder,
    Navbar,
    AppMain,
    TagsNav
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)

    return {
      collapsed
    }
  }
})
</script>

<style lang="less" scoped>
::v-deep .ant-layout-header {
  line-height: @navbarHeight;
  height: @navbarHeight;
}
</style>
