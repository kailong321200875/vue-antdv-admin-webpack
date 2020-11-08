<template>
  <template v-if="!item.meta.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.meta.alwaysShow">
      <!-- <app-link :to="resolvePath(basePath, onlyOneChild.path)"> -->
      <a-menu-item :key="resolvePath(basePath, onlyOneChild.path)" v-bind="$attrs">
        <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
      </a-menu-item>
      <!-- </app-link> -->
    </template>

    <a-sub-menu v-else ref="subMenu" :key="resolvePath(basePath, item.path)">
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="resolvePath(basePath, child.path)"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(basePath, child.path)"
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
import { setSidebarItem } from './hooks/setSidebarItem'

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
    const { onlyOneChild, hasOneShowingChild, resolvePath } = setSidebarItem()
    return {
      onlyOneChild, hasOneShowingChild, resolvePath
    }
  }
})
</script>
