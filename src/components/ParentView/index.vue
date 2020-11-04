<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'ParentView',
  setup() {
    
  },
  // computed: {
  //   tagNavList() {
  //     return this.$store.state.tagsView.visitedViews
  //   },
  //   notCacheName() {
  //     return [(this.$route.meta && this.$route.meta.noCache) ? this.$route.name : '']
  //   },
  //   cacheList() {
  //     return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.noCache)).map(item => item.name) : []]
  //   }
  // }
})
</script>
