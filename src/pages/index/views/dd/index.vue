<template>
  <div>
    <input type="text">
    <div class="scroll-wrap">
      <scrollbar class="mt-4">
        <ul class="p-3" style="width: 1200px;">
          <template v-for="index in 100" :key="index">
            <li class="p-2" :style="{ border: '1px solid #eee' }">{{ index }}</li>
          </template>
        </ul>
      </scrollbar>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Dd'
})
</script>

<style lang="less" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
  background: #fff;
}
</style>
