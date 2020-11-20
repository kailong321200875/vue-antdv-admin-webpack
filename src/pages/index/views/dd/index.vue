<template>
  <div>
    <count-to :start-val="0" :end-val="2000" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CountTo from '_c/CountTo/index.vue'
export default defineComponent({
  name: 'Dd',
  components: {
    CountTo
  }
})
</script>

<style lang="less" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
  background: #fff;
}
</style>
