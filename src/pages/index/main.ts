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

import './permission' // 路由守卫

import { setupAntd } from '@/libs/antdv' // antdv UI

import { setupSvgIcon } from '@/assets/icons' // svg图标

import Scrollbar from '_c/Scrollbar/index.vue'

import '@/styles/reset.css' // 重置不同浏览器之间的标签默认样式

const app = createApp(App)

app.component('Scrollbar', Scrollbar)

setupRouter(app) // 引入路由

setupStore(app) // 引入状态管理

setupAntd(app) // 引入antdv组件

setupSvgIcon(app) // 全局注册svgIcon组件

app.mount('#app')
