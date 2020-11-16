import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from './types'
import type { App } from 'vue'

/* Layout */
const Layout = () => import('../views/layout/index.vue')
/* ParentView */
// import ParentView from '_c/ParentView/index.vue'

/**
* redirect: noredirect        当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    hidden: true              当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
    alwaysShow: true          当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
                              只有一个时，会将那个子路由当做根路由显示在侧边栏，
                              若你想不管路由下面的 children 声明的个数都显示你的根路由，
                              你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
                              一直显示根路由(默认 false)
    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'          设置该路由的图标
    noCache: true             如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true               如果设置为true，则会一直固定在tag项中(默认 false)
    activeMenu: '/dashboard'  显示高亮的路由路径
  }
**/

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    name: 'RedirectRoot',
    children: [
      {
        path: '/redirect/:path*',
        name: 'Redirect',
        component: () => import('_c/Redirect/index.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    component: () => import('_p/index/views/login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Root',
    meta: {
      // alwaysShow: true,
      // title: '首页管理',
      // icon: 'dashboard',
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('_p/index/views/test/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          // noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'http://192.168.169.57/ue/2019/doc/vue-standard/dist/',
        meta: { title: '文档', icon: 'documentation' }
      }
    ]
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    name: 'Test',
    meta: {
      alwaysShow: true,
      title: '测试管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'index',
        // component: () => import('_p/index/views/dd/index.vue'),
        name: 'TestIndex',
        redirect: '/test/index/index2',
        meta: {
          // alwaysShow: true,
          title: '测试'
        },
        children: [
          {
            path: 'index2',
            component: () => import('_p/index/views/dd/index.vue'),
            name: 'TestIndex2',
            meta: {
              title: '测试2'
              // activeMenu: '/test/index/index3'
            }
          },
          {
            path: 'index3',
            component: () => import('_p/index/views/dd/index.vue'),
            name: 'TestIndex3',
            meta: {
              title: '测试3'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/components-demo',
    component: Layout,
    redirect: 'noredirect',
    name: 'ComponentsDemo',
    meta: {
      title: '功能组件',
      icon: 'component'
    },
    children: [
      {
        path: 'echarts',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'EchartsDemo',
        meta: {
          title: '图表'
        }
      },
      {
        path: 'table',
        redirect: 'noredirect',
        name: 'TableDemo',
        // component: ParentView,
        meta: {
          title: '表格'
        },
        children: [
          {
            path: 'table-default',
            component: () => import('_p/index/views/dd/index.vue'),
            name: 'TableDefault',
            meta: {
              title: '普通表格'
            }
          },
          {
            path: 'table-edit',
            component: () => import('_p/index/views/dd/index.vue'),
            name: 'TableEdit',
            meta: {
              title: '表格内编辑',
              noCache: true
            }
          },
          {
            path: 'table-drag',
            component: () => import('_p/index/views/dd/index.vue'),
            name: 'TableDrag',
            meta: {
              title: '表格拖拽'
            }
          },
          {
            path: 'table-slot',
            component: () => import('_p/index/views/dd/index.vue'),
            name: 'TableSlot',
            meta: {
              title: '表格插槽'
            }
          },
          {
            path: 'table-multi',
            component: () => import('_p/index/views/dd/index.vue'),
            name: 'TableMulti',
            meta: {
              title: '多级表头'
            }
          }
        ]
      },
      {
        path: 'search',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'SearchDemo',
        meta: {
          title: '查询'
        }
      },
      {
        path: 'drag-dialog',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'DragDialogDemo',
        meta: {
          title: '拖拽弹窗'
        }
      },
      {
        path: 'drag-element',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'DragElement',
        meta: {
          title: '拖拽元素'
        }
      },
      {
        path: 'cropper',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'CropperDemo',
        meta: {
          title: '图片裁剪'
        }
      },
      {
        path: 'rich-text',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'EditorDemo',
        meta: {
          title: '富文本'
        }
      },
      {
        path: 'select-tree',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'SelectTreeDemo',
        meta: {
          title: '下拉树形'
        }
      },
      {
        path: 'preview-img',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'PreviewImg',
        meta: {
          title: '图片预览'
        }
      },
      {
        path: 'markdown-demo',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'MarkdownDemo',
        meta: {
          title: 'markDown编辑器'
        }
      }
    ]
  },
  {
    path: '/components-ui',
    component: Layout,
    redirect: 'noredirect',
    name: 'ComponentsUi',
    meta: {
      title: 'UI组件',
      icon: 'UI'
    },
    children: [
      {
        path: 'waves',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'WavesDemo',
        meta: {
          title: '水波纹'
        }
      },
      {
        path: 'ripples',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'RipplesDemo',
        meta: {
          title: '涟漪'
        }
      },
      {
        path: 'streamer',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'StreamerDemo',
        meta: {
          title: '流光'
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    name: 'Icon',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'ExampleManage',
    meta: {
      title: '综合实例',
      icon: 'example'
    },
    children: [
      {
        path: 'dialog',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'ExampDialog',
        meta: {
          title: '综合实例-弹窗'
        }
      },
      {
        path: 'page',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'ExampPage',
        meta: {
          title: '综合实例-页面'
        }
      }
    ]
  },
  {
    path: '/other',
    component: Layout,
    redirect: 'noredirect',
    name: 'Other',
    meta: {
      title: '其他',
      icon: 'international',
      alwaysShow: true
    },
    children: [
      {
        path: 'external-link',
        component: () => import('_p/index/views/dd/index.vue'),
        name: 'ExternalLink',
        meta: {
          title: '按需引入JS'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as RouteRecordRaw[]
})

export function resetRouter(): void {
  const resetWhiteNameList = [
    'RedirectRoot',
    'Redirect',
    'Login',
    'Root',
    'Dashboard'
  ]
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
