import router from './router'

import NProgress from 'nprogress' // 引入进度条

import 'nprogress/nprogress.css' // 进度条样式

import config from './config'

const { user_info, title } = config

import wsCache from '@/cache'

import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList: string[] = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (wsCache.get(user_info)) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title, title)
  NProgress.done() // 结束进度条
})
