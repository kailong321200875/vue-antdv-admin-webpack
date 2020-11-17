<template>
  <scrollbar
    ref="scrollContainer"
    :show-x="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import Scrollbar from '_c/Scrollbar/index.vue'
const tagAndTagSpacing = 4 // tagAndTagSpacing

export default defineComponent({
  name: 'ScrollPane',
  components: {
    Scrollbar
  },
  setup() {
    const left = ref<number>(0)
    const scrollContainer = ref<HTMLElement | null>(null)

    function handleScroll(e: any): void {
      const eventDelta: number = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper: any = (unref(scrollContainer) as any).$.wrap
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }

    function moveToTarget(currentTag: any) {
      const $container: any = (unref(scrollContainer) as any).$el
      const $containerWidth: number = $container.offsetWidth
      const $scrollWrapper: any = (unref(scrollContainer) as any).$.wrap
      const tagList = (unref(scrollContainer) as any).$parent.$parent.tagRefs

      let firstTag: any = null
      let lastTag: any = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex: number = tagList.findIndex((item: any) => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]
        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
    return {
      left,
      scrollContainer,
      handleScroll,
      moveToTarget
    }
  }
})
</script>

<style lang="less">
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
}
</style>
