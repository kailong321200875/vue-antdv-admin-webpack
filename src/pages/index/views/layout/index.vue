<template>
  <div class="app-wrapper">
    <component :is="component" />
  </div>
</template>

<script lang="ts">
import ClassicModule from './modules/Classic.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Layout',
  components: {
    ClassicModule
  },
  setup() {
    const component = ref<string>('ClassicModule')
    return {
      component
    }
  }
})
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
