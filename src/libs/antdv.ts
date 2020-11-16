// 按需加载antdv
import type { App } from 'vue'

import antdvConfig from './antdv.config'

// antdv全局配置项
const { message_top, message_duration, message_maxCount } = antdvConfig

import {
  Form,
  Input,
  Button,
  Card,
  Layout,
  Menu,
  message,
  Dropdown,
  Tooltip
} from 'ant-design-vue'

message.config({
  top: message_top,
  duration: message_duration,
  maxCount: message_maxCount
})

export function setupAntd(app: App<Element>): void {
  app.use(Button)
  app.use(Form)
  app.use(Input)
  app.use(Card)
  app.use(Layout)
  app.use(Menu)
  app.use(Dropdown)
  app.use(Tooltip)

  app.config.globalProperties.$message = message
}
