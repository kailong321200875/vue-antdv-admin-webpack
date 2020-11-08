<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapsed}">
    <router-link key="collapsed" class="sidebar-logo-link" to="/">
      <img :src="require('@/assets/img/logo.png')" class="sidebar-logo">
      <span v-if="!collapsed" class="sidebar-title">{{ title }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import config from '_p/index/config'

export default defineComponent({
  name: 'Logo',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {
      title: config.title
    }
  }
})
</script>

<style lang="less" scoped>

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 70px;
  line-height: 70px;
  // background: @menuBg;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 70px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      padding-left: 12px;
    }
  }
}
</style>
