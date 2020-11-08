<template>
  <template v-if="!item?.meta.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item?.meta.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <a-menu-item :key="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </a-menu-item>
      </app-link>
    </template>

    <a-sub-menu v-else ref="subMenu" :key="resolvePath(item.path)" v-bind="$attrs">
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'

export default defineComponent({
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object as PropType<object>,
      required: true
    },
    isNest: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    basePath: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    const onlyOneChild = ref<any>(null)
    function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw): boolean {
      const showingChildren: RouteRecordRaw[] = children.filter((item: RouteRecordRaw) => {
        if (item?.meta?.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          console.log(item)
          onlyOneChild.value = item
          console.log(onlyOneChild)
          return true
        }
      })
      console.log(showingChildren)

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        console.log('@@@@@@')
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      console.log(onlyOneChild)
      return false
    }

    function resolvePath(routePath: string) {
      console.log(routePath)
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(props.basePath, routePath)
    }
    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath
    }
  }
})
</script>
