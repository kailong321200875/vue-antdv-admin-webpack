<template>
  <div>
    <div class="logo">
      <logo :collapsed="collapsed" />
    </div>
    <!-- <template>
      <sidebar-item
        v-for="route in routers"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </template> -->
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <!-- <user-outlined /> -->
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <!-- <video-camera-outlined /> -->
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <!-- <upload-outlined /> -->
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts">
import Logo from '../../components/Logo.vue'
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Slider',
  components: {
    Logo
  },
  props: {
    collapsed: {
      type: Boolean,
      default: () => true
    }
  },
  setup() {
    const selectedKeys = ref<string[]>(['1'])

    return {
      selectedKeys
    }
  }
})
</script>

<style>
</style>
