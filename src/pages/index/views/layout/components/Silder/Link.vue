<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'Link',
  props: {
    to: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup() {
    function linkProps(url: string) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
    return {
      linkProps
    }
  }
})
</script>
