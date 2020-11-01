<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
export default defineComponent({
  name: 'App',
  setup() {
    const { proxy } = getCurrentInstance() as any
    const { addRoute } = useRouter()
    if (proxy.$wsCache.get('addRouters')) {
      proxy.$wsCache.get('addRouters').forEach(async(route: RouteRecordRaw) => {
        await addRoute(route.path, route) // 动态添加可访问路由表
      })
    }
  }
})
</script>

<style lang="less">
.size {
  width: 100;
  height: 100%;
}
html,body {
  .size;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
