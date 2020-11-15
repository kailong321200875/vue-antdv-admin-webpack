<template>
  <div class="navbar">
    <hamburger :collapsed="collapsed" class="hamburger-container" @toggleClick="setCollapsed" />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <screenfull class="right-menu-item hover-effect" /> -->

      <a-dropdown class="avatar-container right-menu-item hover-effect" :trigger="['hover']">
        <div>
          <div class="avatar-wrapper">
            <img :src="require('@/assets/img/avatar.gif')" class="user-avatar">
            <span class="name-item">管理员</span>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <router-link to="/">
                首页
              </router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <span style="display: block;" @click="loginOut">退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Hamburger from '_c/Hamburger/index.vue'
import Breadcrumb from '_c/Breadcrumb/index.vue'
import { appStore } from '_p/index/store/modules/app'
import { resetRouter } from '_p/index/router'
import { useRouter } from 'vue-router'
import wsCache from '@/cache'
export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb
  },
  setup() {
    const { replace } = useRouter()
    const collapsed = computed(() => appStore.collapsed)

    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }

    async function loginOut(): Promise<void> {
      wsCache.clear()
      await resetRouter() // 重置静态路由表
      // this.$store.dispatch('delAllViews') // 删除所有的tags标签页
      replace('/login')
    }

    return {
      collapsed,
      setCollapsed,
      loginOut
    }
  }
})
</script>

<style lang="less" scoped>
.navbar {
  .hamburger-container {
    line-height: @navbarHeight;
    float: left;
    padding: 0 10px;
    cursor: pointer;
    margin-left: 15px;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: @navbarHeight;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    ::v-deep .avatar-container {
      margin-right: 30px;
      padding: 0 10px;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
        .name-item {
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
