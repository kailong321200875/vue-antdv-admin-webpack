import { ref, defineComponent, PropType, computed, watch } from 'vue'
import { Menu } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import Scrollbar from '_c/Scrollbar/index.vue'
import Item from './Item.vue'
import { permissionStore } from '_p/index/store/modules/permission'
import { setSidebarItem } from './hooks/setSidebarItem'
import { isExternal } from '@/utils/validate'
import config from '_p/index/config'
const { show_logo } = config

import './index.less'

export default defineComponent({
  name: 'Silder',
  components: {
    Scrollbar,
    Item
  },
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    inlineIndent: {
      type: Number as PropType<number>,
      default: 24
    },
    forceSubMenuRender: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    mode: {
      type: String as PropType<'vertical' | 'horizontal' | 'vertical-right' | 'inline'>,
      default: 'inline'
    },
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'dark'
    }
  },
  setup(props) {
    const { currentRoute, push } = useRouter()
    const { onlyOneChild, hasOneShowingChild, resolvePath, treeFindRouter, getFullPath } = setSidebarItem()
    const routers = computed((): RouteRecordRaw[] => {
      return permissionStore.routers
    })
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const activeMenuName = ref<string>('')
    
    watch(
      () => currentRoute.value,
      (route: RouteLocationNormalizedLoaded) => {
        setSelectedKeys(route)
      },
      {
        immediate: true
      }
    )
    
    watch(
      () => props.collapsed,
      (collapsed: boolean) => {
        setOpenKeys(currentRoute.value, collapsed)
      },
      {
        immediate: true
      }
    )
    
    function setOpenKeys(route: RouteLocationNormalizedLoaded, collapsed: boolean) {
      const parentRoute: RouteRecordRaw[] = treeFindRouter(permissionStore.routers, (data: any) => data.name === route.name && data.path !== route.path)
      openKeys.value = collapsed ? [] : getFullPath(parentRoute.map((v: RouteRecordRaw) => v.path))
      console.log(openKeys.value)
    }
    
    function setSelectedKeys(route: RouteLocationNormalizedLoaded) {
      const { meta, path, name } = route
      activeMenuName.value = name as string
      if (meta.activeMenu) {
        selectedKeys.value = [meta.activeMenu]
        return
      }
      selectedKeys.value = [path]
    }
    
    function filterPath(route: RouteRecordRaw): string {
      let onlyOneChild: any = null
      let hasOneShowingChild = false
      if (route.children) {
        const showingChildren: RouteRecordRaw[] = route.children.filter((item: RouteRecordRaw) => {
          if (item.meta && item.meta.hidden) {
            hasOneShowingChild = false
            return false
          } else {
            onlyOneChild = item
            hasOneShowingChild = true
            return true
          }
        })
        if (showingChildren.length === 1) {
          hasOneShowingChild = true
        }
        if (showingChildren.length === 0) {
          onlyOneChild = { ...route, path: '', noShowingChildren: true }
          hasOneShowingChild = true
        }
      }
      if (hasOneShowingChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && route.meta && !route.meta.alwaysShow) {
        return resolvePath(route.path, onlyOneChild.path)
      } else {
        return resolvePath('/', route.path)
      }
    }
    
    function handleMenuClick({ key }: any) {
      console.log(key)
      if (isExternal(key)) {
        window.open(key)
      } else {
        push({ path: key })
      }
    }
    
    function renderMenu(routers) {
      return routers.map((item: RouteRecordRaw) => {
        if (!item.meta.hidden) {
          if (hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.meta.alwaysShow) {
            return (
              <Menu.Item key={item.path}>
                {() => [
                  <Item
                    icon={item.meta && item.meta.icon}
                    title={item.meta.title}
                  />
                ]}
              </Menu.Item>
            )
          } else {
            return (
              <Menu.SubMenu key={item.path} v-slots={{
                title: () => [
                  <Item
                    icon={item.meta && item.meta.icon}
                    title={item.meta.title}
                  />
                ],
                default: () => renderMenu(item.children)
              }}>
              </Menu.SubMenu>
            )
          }
        }
      })
    }
    
    return () => {
      return (
        <div class={'has-logo':show_logo} class="sidebar-container">
          <scrollbar class="menu-wrap">
            <Menu
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              theme={props.theme}
              mode={props.mode}
              onClick={handleMenuClick}
            >
              {renderMenu(routers)}
            </Menu>
          </scrollbar>
        </div>
      )
    }
  }
})