<template>
  <span>
    <!-- <i v-if="icon.includes('el-icon')" :class="[icon, 'sub-el-icon']" />
    <svg-icon v-else :icon-class="icon" /> -->
    <slot name="title">
      <span>{{ title }}</span>
    </slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Item',
  props: {
    icon: {
      type: String as PropType<string>,
      default: ''
    },
    title: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
</script>

<style>
</style>
