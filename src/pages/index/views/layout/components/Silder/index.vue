<template>
  <div :class="{'has-logo':show_logo}">
    <logo :collapsed="collapsed" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      theme="dark"
      mode="inline"
    >
      <sidebar-item
        v-for="route in routers"
        :key="filterPath(route)"
        :item="route"
        :base-path="route.path"
        :active-menu-name="activeMenuName"
      />
    </a-menu>
  </div>
</template>

<script lang="ts">
import Logo from '../../components/Logo.vue'
import { ref, defineComponent, PropType, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
// import Scrollbar from '_c/Scrollbar/index.vue'
import SidebarItem from './SidebarItem.vue'
import { permissionStore } from '_p/index/store/modules/permission'
import { setSidebarItem } from './hooks/setSidebarItem'
import config from '_p/index/config'
const { show_logo } = config

export default defineComponent({
  name: 'Slider',
  components: {
    Logo,
    // Scrollbar,
    SidebarItem
  },
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props) {
    const { currentRoute } = useRouter()
    const { onlyOneChild, hasOneShowingChild, resolvePath, treeFindRouter, getFullPath } = setSidebarItem()
    const routers = computed((): RouteRecordRaw[] => {
      return permissionStore.routers
    })
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const activeMenuName = ref<string>('')

    watch(
      () => currentRoute.value,
      (route: RouteLocationNormalizedLoaded) => {
        // setOpenKeys(route, false)
        setSelectedKeys(route)
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.collapsed,
      (collapsed: boolean) => {
        setOpenKeys(currentRoute.value, collapsed)
      },
      {
        immediate: true
      }
    )

    function setOpenKeys(route: RouteLocationNormalizedLoaded, collapsed: boolean) {
      const parentRoute: RouteRecordRaw[] = treeFindRouter(permissionStore.routers, (data: any) => data.name === route.name && data.path !== route.path)
      openKeys.value = collapsed ? [] : getFullPath(parentRoute.map((v: RouteRecordRaw) => v.path))
    }

    function setSelectedKeys(route: RouteLocationNormalizedLoaded) {
      const { meta, path, name } = route
      activeMenuName.value = name as string
      if (meta.activeMenu) {
        selectedKeys.value = [meta.activeMenu]
        return
      }
      selectedKeys.value = [path]
    }

    function filterPath(route: RouteRecordRaw): string {
      let onlyOneChild: any = null
      let hasOneShowingChild = false
      if (route.children) {
        const showingChildren: RouteRecordRaw[] = route.children.filter((item: RouteRecordRaw) => {
          if (item.meta && item.meta.hidden) {
            hasOneShowingChild = false
            return false
          } else {
            onlyOneChild = item
            hasOneShowingChild = true
            return true
          }
        })
        if (showingChildren.length === 1) {
          hasOneShowingChild = true
        }
        if (showingChildren.length === 0) {
          onlyOneChild = { ...route, path: '', noShowingChildren: true }
          hasOneShowingChild = true
        }
      }
      if (hasOneShowingChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && route.meta && !route.meta.alwaysShow) {
        return resolvePath('/', onlyOneChild.path)
      } else {
        return resolvePath('/', route.path)
      }
    }

    return {
      activeMenuName,
      selectedKeys, openKeys, routers,
      show_logo,
      onlyOneChild, hasOneShowingChild, resolvePath,
      filterPath
    }
  }
})
</script>

<style>
</style>
