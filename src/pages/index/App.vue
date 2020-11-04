<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
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
