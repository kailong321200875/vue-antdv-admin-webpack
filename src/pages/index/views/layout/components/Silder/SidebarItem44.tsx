import { defineComponent } from 'vue'
import { Menu } from 'ant-design-vue'

export default defineComponent({
  name: 'SidebarItem',
  setup() {
    return () => (
        <Menu.Item key="3">
          <span>nav 1</span>
        </Menu.Item>
    )
  }
})
