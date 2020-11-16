<template>
  <div ref="wrap" class="tags-nav">
    <div class="close-con">
      <a-dropdown>
        <a-button type="primary" size="small">
          <template #icon>
            <CloseCircleOutlined />
          </template>
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item>刷新</a-menu-item>
            <a-menu-item>关闭</a-menu-item>
            <a-menu-item>关闭其他</a-menu-item>
            <a-menu-item>关闭全部</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <ul v-show="visible" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu">
      <li>
        刷新
      </li>
      <!-- <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)">
        关闭
      </li> -->
      <li>
        关闭其他
      </li>
      <li>
        关闭全部
      </li>
    </ul>
    <div class="btn-con left-btn">
      <a-button type="text" size="small" @click="handleScroll(240)">
        <LeftOutlined />
      </a-button>
    </div>
    <div class="btn-con right-btn">
      <a-button type="text" size="small" @click="handleScroll(-240)">
        <RightOutlined />
      </a-button>
    </div>
    <div ref="scrollOuter" class="scroll-outer" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <router-link
            v-for="tag in visitedViews"
            :ref="setTagRef"
            :key="tag.path"
            :class="isActive(tag)?'active':''"
            :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
            tag="span"
            class="tags-view-item"
            @contextmenu.prevent="contextMenu(tag, $event)"
          >
            {{ tag.meta && tag.meta.title }}
            <CloseOutlined
              v-if="tag.meta && !tag.meta.affix"
              class="el-icon-close"
            />
          </router-link>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onMounted, nextTick, unref, onBeforeUpdate } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { tagsViewStore } from '_p/index/store/modules/tagsView'
import { permissionStore } from '_p/index/store/modules/permission'
import { CloseCircleOutlined, LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons-vue'
import path from 'path'
export default defineComponent({
  name: 'TagsNav',
  components: {
    CloseCircleOutlined,
    LeftOutlined,
    RightOutlined,
    CloseOutlined
  },
  setup() {
    const { currentRoute } = useRouter()
    const visible = ref<boolean>(false)
    const tagBodyLeft = ref<number>(0)
    const rightOffset = ref<number>(40)
    const outerPadding = ref<number>(4)
    const contextMenuLeft = ref<number>(0)
    const contextMenuTop = ref<number>(0)
    const affixTags = ref<RouteLocationNormalizedLoaded[]>([])
    let selectedTag = reactive<any>({})
    const visitedViews = computed(() => tagsViewStore.visitedViews)
    const routers = computed(() => permissionStore.routers)

    const wrap = ref<HTMLElement | null>(null)
    const tagRefs = ref<any[]>([])
    const scrollOuter = ref<HTMLElement | null>(null)
    const scrollBody = ref<HTMLElement | null>(null)

    onMounted(() => {
      initTags()
      addTags()
    })

    onBeforeUpdate(() => {
      tagRefs.value = []
    })

    function setTagRef(el: any): void {
      tagRefs.value.push(el)
    }

    function closeMenu(): void {
      visible.value = false
    }

    function isActive(route: RouteLocationNormalizedLoaded): boolean {
      return route.path === currentRoute.value.path
    }

    function initTags(): void {
      affixTags.value = filterAffixTags(routers.value)
      const affixTagArr: any[] = affixTags.value
      for (const tag of affixTagArr) {
        // Must have tag name
        if (tag.name) {
          tagsViewStore.addVisitedView(tag)
        }
      }
    }

    function filterAffixTags(routes: RouteLocationNormalizedLoaded[], basePath = '/'): any[] {
      let tags: any = []
      routes.forEach((route: any) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })

      return tags
    }

    function addTags(): void | boolean {
      const { name } = currentRoute.value
      if (name) {
        tagsViewStore.addView(currentRoute.value)
      }
      return false
    }

    // function moveToCurrentTag(): void {
    //   const tags = unref(tag) as any
    //   nextTick(() => {
    //     for (const tag of tags) {
    //       if (tag.to.path === currentRoute.value.path) {
    //         this.$refs.scrollPane.moveToTarget(tag)

    //         // when query is different then update
    //         if (tag.to.fullPath !== this.$route.fullPath) {
    //           this.$store.dispatch('updateVisitedView', this.$route)
    //         }

    //         break
    //       }
    //     }
    //   })
    // }
    function handlescroll(e: any): void {
      const type: string = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      handleScroll(delta)
    }

    function handleScroll(offset: number): void {
      const outerWidth: number = (unref(scrollOuter) as any).offsetWidth
      const bodyWidth: number = (unref(scrollBody) as any).offsetWidth
      if (offset > 0) {
        tagBodyLeft.value = Math.min(0, tagBodyLeft.value + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (tagBodyLeft.value < -(bodyWidth - outerWidth)) {
            const value = tagBodyLeft.value
            tagBodyLeft.value = value
          } else {
            tagBodyLeft.value = Math.max(tagBodyLeft.value + offset, outerWidth - bodyWidth)
          }
        } else {
          tagBodyLeft.value = 0
        }
      }
    }

    function contextMenu(item: RouteLocationNormalizedLoaded, e: any) {
      const menuMinWidth = 105
      const offsetLeft: number = (unref(wrap) as any).getBoundingClientRect().left // container margin left
      const offsetWidth: number = (unref(wrap) as any).offsetWidth // container width
      const maxLeft: number = offsetWidth - menuMinWidth // left boundary
      const left: number = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        contextMenuLeft.value = maxLeft
      } else {
        contextMenuLeft.value = left
      }
      contextMenuTop.value = e.clientY
      visible.value = true
      selectedTag = item
    }

    function moveToView() {
      const tags = unref(tagRefs)
      console.log(tags.length)
      nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === currentRoute.value.path) {
            const outerWidth = (unref(scrollOuter) as any).offsetWidth
            const bodyWidth = (unref(scrollOuter) as any).offsetWidth
            if (bodyWidth < outerWidth) {
              tagBodyLeft.value = 0
            } else if (tag.offsetLeft < tagBodyLeft.value) {
              // 标签在可视区域左侧
              tagBodyLeft.value = -tag.offsetLeft + outerPadding.value
            } else if (tag.offsetLeft > -tagBodyLeft.value && tag.offsetLeft + tag.offsetWidth < -tagBodyLeft.value + outerWidth) {
              // 标签在可视区域
              tagBodyLeft.value = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - outerPadding.value)
            } else {
              // 标签在可视区域右侧
              tagBodyLeft.value = -(tag.offsetLeft - (outerWidth - outerPadding.value - tag.offsetWidth))
            }

            // when query is different then update
            if (tag.to.fullPath !== currentRoute.value.fullPath) {
              tagsViewStore.updateVisitedView(currentRoute.value)
            }

            break
          }
        }
      })
    }

    watch(
      () => currentRoute.value,
      () => {
        addTags()
        moveToView()
      }
    )

    watch(
      () => visible.value,
      (visible: boolean) => {
        if (visible) {
          document.body.addEventListener('click', closeMenu)
        } else {
          document.body.removeEventListener('click', closeMenu)
        }
      }
    )

    return {
      visible,
      selectedTag,
      tagBodyLeft, rightOffset, outerPadding, contextMenuLeft, contextMenuTop,
      contextMenu,
      isActive,
      affixTags, visitedViews, routers,
      wrap, setTagRef, scrollOuter, scrollBody,
      handleScroll, handlescroll
    }
  }
})
</script>

<style lang="less" scoped>
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.size {
  width: 100%;
  height: 100%;
}
.tags-nav {
  position: relative;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
  .no-select;
  .size;
  .close-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn {
      left: 0px;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #F0F0F0;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 2px rgba(100,100,100,.1) inset;
    .scroll-body {
      height: ~"calc(100% - 1px)";
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &.active {
          background-color: #304156;
          color: #fff;
          border-color: #304156;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
  }
  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .1);
    li {
      margin: 0;
      padding: 5px 15px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

</style>
