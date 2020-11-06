/**
 * 为了保持多页antdv组件的样式统一，提供全局配置的方法。
 */
import { ConfigAntdv } from './types'

const antdvConfig: ConfigAntdv = {
  /**
   * message 顶部距离
   */
  message_top: '100px',

  /**
   * message 多久消失
   */
  message_duration: 2,

  /**
   * message 最大显示数
   */
  message_maxCount: 1
}

export default antdvConfig
