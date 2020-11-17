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
import { defineComponent, computed, unref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { tagsViewStore } from '_p/index/store/modules/tagsView'
export default defineComponent({
  name: 'AppMain',
  setup() {
    const { currentRoute } = useRouter()
    const cachedViews = computed(() => {
      return tagsViewStore.cachedViews
    })
    const key = computed(() => {
      console.log(tagsViewStore.cachedViews)
      console.log(tagsViewStore.visitedViews)
      return currentRoute.value.fullPath
    })
    return {
      cachedViews,
      key
    }
  }
})
</script>

<style lang="less" scoped>
.app-main {
  // min-height: calc(100vh - 50px);
  // position: relative;
  overflow: hidden;
  background-color: #f5f7f9;

  .view-main {
    padding: 20px;
    // position: relative;
  }
}
</style>
