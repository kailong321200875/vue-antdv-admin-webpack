// 按需加载antdv
import type { App } from 'vue'

import {
  Form,
  Input,
  Button
} from 'ant-design-vue'

export function setupAntd(app: App<Element>): void {
  app.use(Button)
  app.use(Form)
  app.use(Input)
}
