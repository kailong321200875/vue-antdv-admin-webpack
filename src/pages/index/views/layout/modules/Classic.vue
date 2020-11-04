<template>
  <a-layout class="app-wrapper">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <silder :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="setCollapsed(!collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="setCollapsed(!collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '20px', background: '#fff' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { appStore } from '_pi/store/modules/app'
import Silder from '../components/Silder/index.vue'
export default defineComponent({
  name: 'Classic',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Silder
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)

    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }

    return {
      collapsed,
      setCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

// #components-layout-demo-custom-trigger .logo {
//   height: 32px;
//   background: rgba(255, 255, 255, 0.2);
//   margin: 16px;
// }
</style>
