<template>
  <keep-alive :include="cacheList" :exclude="notCacheName">
    <router-view />
  </keep-alive>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { tagsViewStore } from '_p/index/store/modules/tagsView'
export default defineComponent({
  name: 'ParentView',
  setup() {
    const { currentRoute } = useRouter()
    const tagNavList = computed(() => tagsView.visitedViews)
    const notCacheName = computed(() => [(currentRoute.value.meta && currentRoute.value.meta.noCache) ? currentRoute.value.name : ''])
    const cacheList = computed(() => ['ParentView', ...tagNavList.value.length ? tagNavList.value.filter(item => !(item.meta && item.meta.noCache)).map(item => item.name) : []])
  }
})
</script>
