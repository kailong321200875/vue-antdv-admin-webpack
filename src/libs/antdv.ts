// 按需加载antdv
import type { App } from 'vue'

import antdvConfig from './antdv.config'

// antdv全局配置项
const { message_top, message_duration, message_maxCount } = antdvConfig

import {
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  // Button,
  Card,
  Layout,
  Menu,
  message,
  Dropdown,
  Tooltip,
  Row,
  Col,
  Alert,
  Switch,
  Select,
  Radio,
  TreeSelect,
  DatePicker
} from 'ant-design-vue'

message.config({
  top: message_top,
  duration: message_duration,
  maxCount: message_maxCount
})

export function setupAntd(app: App<Element>): void {
  app.use(ConfigProvider)
  // app.use(Button)
  app.use(Form)
  app.use(Input)
  app.use(InputNumber)
  app.use(Card)
  app.use(Layout)
  app.use(Menu)
  app.use(Dropdown)
  app.use(Tooltip)
  app.use(Row)
  app.use(Col)
  app.use(Alert)
  app.use(Switch)
  app.use(Select)
  app.use(Radio)
  app.use(TreeSelect)
  app.use(DatePicker)

  app.config.globalProperties.$message = message
}
