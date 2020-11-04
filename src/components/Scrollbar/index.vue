<template>
  <div class="scrollbar">
    <template v-if="!native">
      <div
        :ref="wrapElRef"
        :style="style"
        @scroll="handleScroll"
        :class="[wrapClass, 'scrollbar__wrap', gutter ? '' : 'scrollbar__wrap--hidden-default']"
      >
        <div
          :class="['scrollbar__view', viewClass]"
          :style="viewStyle"
          :ref="resizeRef"
        >
          <slot />
          <bar :move="state.moveX" :size="state.sizeWidth" />
          <bar vertical :move="state.moveY" :size="state.sizeHeight" />
        </div>
      </div>
    </template>
    <template v-else>
      <div
        ref="wrap"
        :class="[wrapClass, 'scrollbar__wrap']"
        :style="style"
      >
        <div
          :class="['scrollbar__view', viewClass]"
          :style="viewStyle"
          :ref="resizeRef"
        >
          <slot />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  unref,
  reactive,
  ref,
  toRef,
  provide,
  onMounted,
  nextTick,
  onBeforeUnmount,
  getCurrentInstance
} from 'vue'
import { addResizeListener, removeResizeListener } from '@/utils/event/resizeEvent'
import scrollbarWidth from '@/utils/scrollbarWidth'
import { isString } from '@/utils/is'
import { toObject } from './util'
import Bar from './Bar.vue'
export default defineComponent({
  name: 'Scrollbar',
  components: {
    Bar
  },
  props: {
    native: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    wrapStyle: {
      type: Object as PropType<any>
    },
    wrapClass: { type: String as PropType<string>, required: false },
    viewClass: { type: String as PropType<string> },
    viewStyle: { type: Object as PropType<any> },
    noresize: Boolean as PropType<boolean>,
    tag: {
      type: String as PropType<string>,
      default: 'div'
    }
  },
  setup(props) {
    const resizeRef = ref<HTMLElement | null>(null)
    const wrapElRef = ref<HTMLElement | null>(null)
    provide('scroll-bar-wrap', wrapElRef)
    const state = reactive({
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    })
    let style: any = toRef(props, 'wrapStyle')
    const gutter = scrollbarWidth()
    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`

      if (Array.isArray(props.wrapStyle)) {
        style = toObject(props.wrapStyle)
        style.value.marginRight = style.value.marginBottom = gutterWith
      } else if (isString(props.wrapStyle)) {
        style.value += gutterStyle
      } else {
        style = gutterStyle
      }
    }
    // const Tag = props.tag as any

    function handleScroll() {
      const warpEl = unref(wrapElRef)
      console.log(warpEl)
      if (!warpEl) return
      const { scrollTop, scrollLeft, clientHeight, clientWidth } = warpEl

      state.moveY = (scrollTop * 100) / clientHeight
      state.moveX = (scrollLeft * 100) / clientWidth
    }
    function update() {
      const warpEl = unref(wrapElRef)
      if (!warpEl) return
      const { scrollHeight, scrollWidth, clientHeight, clientWidth } = warpEl
      const heightPercentage = (clientHeight * 100) / scrollHeight
      const widthPercentage = (clientWidth * 100) / scrollWidth

      state.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
      state.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
    }

    onMounted(() => {
      const instance = getCurrentInstance() as any
      if (instance) {
        instance.wrap = unref(wrapElRef)
      }

      const { native, noresize } = props
      const resizeEl = unref(resizeRef)
      const warpEl = unref(wrapElRef)
      if (native || !resizeEl || !warpEl) return
      nextTick(update)
      if (!noresize) {
        addResizeListener(resizeEl, update)
        addResizeListener(warpEl, update)
      }
    })
    onBeforeUnmount(() => {
      const { native, noresize } = props
      const resizeEl = unref(resizeRef)
      const warpEl = unref(wrapElRef)
      if (native || !resizeEl || !warpEl) return
      if (!noresize) {
        removeResizeListener(resizeEl, update)
        removeResizeListener(warpEl, update)
      }
    })

    return {
      wrapElRef,
      style,
      handleScroll,
      resizeRef,
      state,
      gutter,
      update
    }
  }
})
</script>

<style lang="less" scoped>
.scrollbar {
  position: relative;
  overflow: hidden;

  &__wrap {
    height: 100%;
    overflow: scroll;

    &--hidden-default {
      scrollbar-width: none;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  }

  &__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: inherit;
    transition: 0.3s background-color;

    &:hover {
      background-color: rgba(144, 147, 153, 0.5);
    }
  }

  &__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    -webkit-transition: opacity 120ms ease-out;
    transition: opacity 120ms ease-out;

    &.is-vertical {
      top: 2px;
      width: 6px;

      & > div {
        width: 100%;
      }
    }

    &.is-horizontal {
      left: 2px;
      height: 6px;

      & > div {
        height: 100%;
      }
    }
  }
}

.scrollbar:active > .scrollbar__bar,
.scrollbar:focus > .scrollbar__bar,
.scrollbar:hover > .scrollbar__bar {
  opacity: 1;
  transition: opacity 280ms ease-out;
}
</style>
