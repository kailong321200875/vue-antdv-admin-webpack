<template>
  <div>
    <scrollbar wrap-class="scrollbar-wrapper" style="height:200px;width: 100px">
      <div v-for="index in 20" :key="index" style="border: 1px solid red;height: 50px;background-color: #0000FF;width:200px">
        {{ index }}
      </div>
    </scrollbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Dd'
})
</script>

<style>
</style>
