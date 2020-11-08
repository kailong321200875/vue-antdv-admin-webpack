export default {
  name: 'SidebarItem',
  template: `
    <template>
      <div v-bind="$attrs">
        <a-menu-item key="1">
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span>nav 3</span>
        </a-menu-item>
      </div>
    </template>
  `
}
