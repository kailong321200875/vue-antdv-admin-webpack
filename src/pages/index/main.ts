/**
 * Options API形式的组件生命周期钩子和Composition API之间的实际对应关系
 * beforeCreate -> setup()
 * created -> setup()
 * beforeMount -> onBeforeMount
 * mounted -> onMounted
 * beforeUpdate -> onBeforeUpdate
 * updated -> onUpdated
 * beforeDestroy -> onBeforeUnmount
 * destroyed -> onUnmounted
 * errorCaptured -> onErrorCaptured
 */

import { createApp } from 'vue'

import App from './App.vue' // 入口组件

import { setupRouter } from './router' // 路由

import { setupStore } from './store' // 状态管理

import wsCache from '@/cache' // web缓存

import config from './config' // 全局配置

import './permission' // 路由守卫

import api from './api' // 接口api

import { setupAntd } from '@/libs/antdv' // antdv UI

import { setupSvgIcon } from '@/assets/icons' // svg图标

import Scrollbar from '_c/Scrollbar/index.vue'

const app = createApp(App)

app.component('Scrollbar', Scrollbar)

setupRouter(app) // 引入路由

setupStore(app) // 引入状态管理

setupAntd(app) // 引入antdv组件

setupSvgIcon(app) // 全局注册svgIcon组件

app.config.globalProperties.$api = api

app.config.globalProperties.$wsCache = wsCache

app.config.globalProperties.$config = config

app.mount('#app')
