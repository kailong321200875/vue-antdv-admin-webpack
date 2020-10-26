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

import router from './router' // 路由

import store from './store' // z状态管理

import wsCache from '@/cache' // web缓存

import './permission'

import api from '_pi/api' // 接口api

import { setupAntd } from '@/libs/antdv'

import { setupSvgIcon } from '@/assets/icons'

const app = createApp(App)

setupAntd(app) // 引入antdv组件

setupSvgIcon(app) // 全局注册svgIcon组件

app.config.globalProperties.$api = api

app.config.globalProperties.$wsCache = wsCache

app.use(store).use(router).mount('#app')
