<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
    </template>
    <div style="height: 100%;">
      <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
    </div>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import screenfull from 'screenfull'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'Screenfull',
  setup() {
    const isFullscreen = ref<boolean>(false)
    const sf = screenfull

    function init(): void {
      if (sf.isEnabled) {
        sf.on('change', () => {
          isFullscreen.value = sf.isFullscreen
        })
      }
    }

    function click(): void | Boolean {
      if (!sf.isEnabled) {
        message.warning('you browser can not work')
        return false
      }
      sf.toggle()
    }

    onMounted(() => {
      init()
    })

    return {
      isFullscreen,
      click
    }
  }
})
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
