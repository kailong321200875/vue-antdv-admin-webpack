<template>
  <template v-if="!item.meta.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.meta.alwaysShow">
      <a-menu-item
        :key="resolvePath(basePath, onlyOneChild.path)"
        v-bind="$attrs"
      >
        <item
          v-if="onlyOneChild.meta"
          :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          :title="onlyOneChild.meta.title"
        />
      </a-menu-item>
    </template>

    <a-sub-menu
      v-else
      :key="resolvePath(basePath, item.path)"
      v-bind="$attrs"
      :class="highlightMenu(theme + '-active-item')"
      :popup-class-name="highlightMenu(theme + '-popup-active-item')"
    >
      <template #title>
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="resolvePath(basePath, child.path)"
        :item="child"
        :active-menu-name="activeMenuName"
        :base-path="resolvePath(basePath, child.path)"
      />
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import Item from './Item.vue'
import { setSidebarItem } from './hooks/setSidebarItem'
import { findIndex } from '@/utils'
import { permissionStore } from '_p/index/store/modules/permission'

export default defineComponent({
  name: 'SidebarItem',
  components: { Item },
  props: {
    item: {
      type: Object as PropType<object>,
      required: true
    },
    basePath: {
      type: String as PropType<string>,
      default: ''
    },
    activeMenuName: {
      type: String as PropType<string>,
      default: ''
    },
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light'
    }
  },
  setup(props) {
    const { onlyOneChild, hasOneShowingChild, resolvePath, treeFindRouter, getFullPath } = setSidebarItem()
    const highlightMenu = computed(() => {
      return function(className: string): string {
        const parentRoute: RouteRecordRaw[] = treeFindRouter(permissionStore.routers, (data: any) => data.name === props.activeMenuName)
        const parentFullPath: string[] = getFullPath(parentRoute.map((v: RouteRecordRaw) => v.path))
        return findIndex(parentFullPath, (item: string) => item === props.basePath) === parentFullPath.length - 1 ? className : ''
      }
    })

    return {
      highlightMenu,
      onlyOneChild, hasOneShowingChild, resolvePath
    }
  }
})
</script>
