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
        <section class="app-main">
          <router-view v-slot="{ Component }" class="view-main">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </section>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '_p/index/store/modules/app'
import Silder from '../components/Silder/index.vue'
import Navbar from '../components/Navbar.vue'
export default defineComponent({
  name: 'Classic',
  components: {
    Silder,
    Navbar
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
.app-main {
  // min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  background-color: #f5f7f9;

  .view-main {
    padding: 20px;
    position: relative;
  }
}
::v-deep .ant-layout-header {
  line-height: @navbarHeight;
  height: @navbarHeight;
}
</style>
