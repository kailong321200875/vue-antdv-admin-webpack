/**
 * 全局配置
 */
import { ConfigOptions } from '@/types/config'

const config: ConfigOptions = {
  /**
   * 配置显示在浏览器标签的title
   */
  title: 'vue-ele-admin',

  /**
   * 设置ele组件默认尺寸
   */
  el_size: 'medium',

  /**
   * 设置ele组件默认zIndex
   */
  el_zIndex: 2000,

  /**
   * 是否固定头部
   */
  affix_header: true,

  /**
   * 是否显示标签页
   */
  has_tags: true,

  /**
   * 是否显示logo
   */
  show_logo: true,

  /**
   * 是否每次只显示一个并且是最新的message提示
   */
  one_message: true,

  /**
   * 横纵布局 horizontal(水平) vertical(垂直)
   */
  // layout: 'vertical',

  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    dev: 'https://api.apiopen.top',
    // 生产环境接口前缀
    pro: 'http://mockjs.test.cn',
    // 测试环境接口前缀
    test: 'http://mockjs.test.cn'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: 200,

  /**
   * 接口请求超时时间
   */
  request_timeout: 5000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json',

  /**
   * 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
   */
  user_info: 'userInfo'
}

export default config
