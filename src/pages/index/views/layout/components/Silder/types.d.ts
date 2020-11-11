export interface MenuState {
  // 默认选中的列表
  defaultSelectedKeys: string[]
  // 模式
  mode: 'vertical' | 'horizontal' | 'inline' | 'vertical-left' | 'vertical-right' | undefined
  // 主题
  theme: 'dark' | 'light' | undefined
  // 展开数组
  openKeys: string[]
  // 当前选中的菜单项 key 数组
  selectedKeys: string[]
  // 收缩状态下展开的数组
  collapsedOpenKeys: string[]
}