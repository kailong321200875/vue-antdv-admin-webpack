/**
 * 全局配置
 */
export interface ConfigOptions {
  title: string
  el_size: string
  el_zIndex: number
  affix_header: boolean
  has_tags: boolean
  show_logo: boolean
  one_message: boolean
  base_url: object
  result_code: number | string
  request_timeout: number
  default_headers: string
  user_info: string
}
