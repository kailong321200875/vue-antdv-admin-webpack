<template>
  <section class="app-main">
    <router-view v-slot="{ Component }" :key="key" class="view-main">
      <transition name="fade" mode="out-in" appear>
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { tagsViewStore } from '_p/index/store/modules/tagsView'
export default defineComponent({
  name: 'AppMain',
  setup() {
    const { currentRoute } = useRouter()
    const cachedViews = computed(() => {
      console.log(tagsViewStore.cachedViews)
      return tagsViewStore.cachedViews
    })
    const key = computed(() => currentRoute.value.fullPath)
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
