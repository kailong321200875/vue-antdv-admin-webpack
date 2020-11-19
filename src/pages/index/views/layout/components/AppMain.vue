<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { tagsViewStore } from '_p/index/store/modules/tagsView'
export default defineComponent({
  name: 'AppMain',
  setup() {
    const cachedViews = computed(() => tagsViewStore.cachedViews)
    return {
      cachedViews
    }
  }
})
</script>

<style lang="less" scoped>
.app-main {
  overflow: hidden;
  padding: 20px;
}
</style>
