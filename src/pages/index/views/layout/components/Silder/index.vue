<template>
  <div :class="{'has-logo':show_logo}">
    <div class="logo">
      <logo :collapsed="collapsed" />
    </div>
    <!-- <silder-menu /> -->
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :defaultOpenKeys="defaultOpenKeys"
      theme="dark"
      mode="inline"
      @click="menuClick"
      @select="menuSelect"
    >
      <sidebar-item
        v-for="route in routers"
        :key="resolvePath('/', route.path)"
        :item="route"
        :base-path="route.path"
      />
    </a-menu>
  </div>
</template>

<script lang="ts">
import Logo from '../../components/Logo.vue'
import { ref, unref, defineComponent, PropType, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Scrollbar from '_c/Scrollbar/index.vue'
import SidebarItem from './SidebarItem.vue'
import SilderMenu from './Menu'
import { permissionStore } from '_p/index/store/modules/permission'
import { appStore } from '_p/index/store/modules/app'
import { setSidebarItem } from './hooks/setSidebarItem'
import config from '_p/index/config'
const { show_logo } = config

export default defineComponent({
  name: 'Slider',
  components: {
    Logo,
    Scrollbar,
    SilderMenu,
    SidebarItem
  },
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup() {
    const { meta, path } = useRoute()
    const { currentRoute } = useRouter()
    const { onlyOneChild, hasOneShowingChild, resolvePath, treeFindPath, getFullPath } = setSidebarItem()
    const parentName: string[] = treeFindPath(permissionStore.routers, (data: any) => data.name === currentRoute.value.name)
    const defaultOpenKeys = ref<string[]>(getFullPath(parentName))
    const selectedKeys = ref<string[]>(meta.activeMenu ? [meta.activeMenu] : [path])

    const routers = computed((): RouteRecordRaw[] => {
      return permissionStore.routers
    })

    function menuClick(item: any) {
      console.log(item)
    }
    function menuSelect(item: any) {
      console.log(item)
    }

    return {
      defaultOpenKeys, selectedKeys, routers, menuClick, menuSelect,
      show_logo,
      onlyOneChild, hasOneShowingChild, resolvePath
    }
  }
})
</script>

<style>
</style>
