import { computed, defineComponent, unref, reactive, ref } from 'vue'
import type { MenuState } from './types'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Scrollbar from '_c/Scrollbar/index.vue'
import Item from './Item.vue'
import { permissionStore } from '_p/index/store/modules/permission'
import { appStore } from '_p/index/store/modules/app'
import { setSidebarItem } from './hooks/setSidebarItem'
import { Menu } from 'ant-design-vue'

export default defineComponent({
  name: 'Menu',
  components: {
    Scrollbar,
    Item
  },
  setup(props, { slots }) {
    const menuState = reactive<MenuState>({
      defaultSelectedKeys: [],
      mode: 'inline',
      theme: 'dark',
      openKeys: [],
      selectedKeys: [],
      collapsedOpenKeys: []
    })
    const { meta, path } = useRoute()
    const { currentRoute } = useRouter()
    const { onlyOneChild, hasOneShowingChild, resolvePath, treeFindPath, getFullPath } = setSidebarItem()
    const parentName: string[] = treeFindPath(permissionStore.routers, (data: any) => data.name === currentRoute.value.name)
    menuState.openKeys = getFullPath(parentName)
    menuState.selectedKeys = meta.activeMenu ? [meta.activeMenu] : [path]

    const routers = computed((): RouteRecordRaw[] => {
      return permissionStore.routers
    })

    const getOpenKeys = computed((): string[] => {
      return appStore.collapsed ? menuState.collapsedOpenKeys : menuState.openKeys
    })
    
    function renderMenu() {
      const { selectedKeys, mode, theme } = menuState
      // console.log(renderMenuItem(routers.value))
      return(
        <Menu
          selectedKeys={selectedKeys}
          mode={mode}
          openKeys={unref(getOpenKeys)}
          theme={theme}
        >
          {renderMenuItem3(routers.value)}
        </Menu>
      )
    }
    
    function renderMenuItem3(routers: RouteRecordRaw[], basePath: string = '/') {
      return (
        <Menu.Item key="1">
        <span>`Navigation One`</span>
          
        </Menu.Item>
      )
    }
    
    // renderMenuItem2(routers.value)
    
    // function renderMenuItem2(routers: RouteRecordRaw[], basePath: string = '/') {
    //   routers.map((item: RouteRecordRaw) => {
    //     if (item.meta && !item.meta.hidden) {
    //       console.log(item)
    //       console.log('隐藏')
    //       if (hasOneShowingChild(item.children, item) && ((onlyOneChild && !onlyOneChild.children) || (onlyOneChild && onlyOneChild.noShowingChildren)) && item.meta && !item.meta.alwaysShow) {
    //         console.log(onlyOneChild)
    //         console.log('basePath: ' + basePath)
    //         console.log('path: ' + onlyOneChild.path)
    //         console.log(resolvePath(basePath, onlyOneChild.path))
    //       } else {
    //         console.log('basePath: ' + basePath)
    //         console.log('path: ' + item.path)
    //         console.log(resolvePath(basePath, item.path))
    //         renderMenuItem2(item.children as RouteRecordRaw[], resolvePath(basePath, item.path))
    //       }
    //     }
    //   })
    // }
    
    function renderMenuItem(routers: RouteRecordRaw[], basePath: string = '/') {
      return routers.filter((item: RouteRecordRaw) => {
        if (item.meta && !item.meta.hidden) {
          if (hasOneShowingChild(item.children, item) && ((onlyOneChild && !onlyOneChild.children) || (onlyOneChild && onlyOneChild.noShowingChildren)) && item.meta && !item.meta.alwaysShow) {
            return (
              <Menu.Item
                key={resolvePath(basePath, onlyOneChild.path)}
              >
                {() => [
                  onlyOneChild.meta
                  ? <Item
                      icon={onlyOneChild.meta.icon || (item.meta && item.meta.icon)}
                      title={onlyOneChild.meta.title}
                    /> : null
                ]}
              </Menu.Item>
            )
          } else {
            return (
              <Menu.SubMenu key={resolvePath(basePath, item.path)}>
                {{
                  title: () => [
                    item.meta
                    ? <Item
                        icon={item.meta && item.meta.icon}
                        title={item.meta.title}
                      /> : null
                  ],
                  default: () => renderMenuItem(item.children as RouteRecordRaw[], resolvePath(basePath, item.path))
                }}
              </Menu.SubMenu>
            )
          }
        }
      })
    }
    
    function menuClick(item: any) {
      console.log(item)
    }
    function menuSelect(item: any) {
      console.log(item)
    }

    return () => {
      return (
        <section class={`basic-menu-wrap`}>
          {renderMenu()}
        </section>
      )
    }
  }
})