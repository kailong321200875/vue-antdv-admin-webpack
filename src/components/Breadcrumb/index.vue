<template>
  <Breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <BreadcrumbItem
        v-for="(item,index) in levelList"
        :key="item.path"
      >
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" class="icon-breadcrumb" />
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </BreadcrumbItem>
    </transition-group>
  </Breadcrumb>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
import { useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import { permissionStore } from '_p/index/store/modules/permission'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'
export default defineComponent({
  name: 'BreadcrumbWrap',
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  setup() {
    const { currentRoute, push } = useRouter()

    const levelList = ref<RouteRecordRaw[]>([])

    const addRouters = permissionStore.addRouters

    function getBreadcrumbRoutes(route: any): RouteRecordRaw[] {
      let currentRoutes: RouteRecordRaw[] = []
      const first: RouteLocationMatched = route.matched[0]
      let last: RouteLocationMatched = route.matched[route.matched.length - 1]
      const matched: RouteLocationMatched[] = []

      // 倒序遍历有meta.parent标识的路由
      for (let i = route.matched.length - 1; i >= 0; i--) {
        const match: RouteLocationMatched = route.matched[i]
        const meta: any = match.meta || {}
        matched.unshift(match)
        if (meta.parent) {
          last = match
          break
        }
      }

      // 填充降级后缺失的各级路由
      addRouters.some((item: RouteRecordRaw) => {
        if (item.path === first.path) {
          currentRoutes = item.children || []
          getParentRoute(currentRoutes, last, matched)
          return true
        }
      })
      matched.unshift(first)
      return matched
    }

    function getParentRoute(currentRoutes: RouteRecordRaw[], last: RouteRecordRaw, matched: RouteRecordRaw[] = []): RouteRecordRaw[] {
      const meta: any = last.meta || {}
      currentRoutes.forEach((item: RouteRecordRaw) => {
        if (item.path === meta.parent) {
          matched.unshift(item)
          getParentRoute(currentRoutes, item, matched)
        }
      })
      return matched
    }

    function getBreadcrumb(): void {
      const matched: RouteRecordRaw[] = getBreadcrumbRoutes(currentRoute.value).filter((item: RouteRecordRaw) => item.meta && item.meta.title)
      // const first: RouteRecordRaw = matched[0]
      // if (first && first.name !== 'Dashboard') {
      //   matched = [
      //     {
      //       path: '/dashboard',
      //       meta: { title: '首页', icon: 'dashboard' }
      //     }
      //   ].concat(matched)
      // }
      levelList.value = matched.filter((item: RouteRecordRaw) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    function pathCompile(path: string): string {
      const { params } = currentRoute.value
      const toPath = compile(path)
      return toPath(params)
    }

    function handleLink(item: RouteRecordRaw): void {
      const { redirect, path } = item
      if (redirect) {
        push(redirect as string)
        return
      }
      push(pathCompile(path))
    }

    watch(
      () => currentRoute.value,
      () => {
        getBreadcrumb()
      },
      {
        immediate: true
      }
    )

    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="less" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .icon-breadcrumb {
    color: #97a8be;
    margin-right: 8px;
  }
}
</style>
