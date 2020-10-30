<template>
  <div class="app-wrapper">
    <classic-module />
  </div>
</template>

<script lang="ts">
import ClassicModule from './modules/Classic.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Classic',
  components: {
    ClassicModule
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
