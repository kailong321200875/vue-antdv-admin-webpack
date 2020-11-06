/**
 * 全局配置
 */
export interface ConfigOptions {
  title?: string
  affix_header: boolean
  has_tags: boolean
  show_logo: boolean
  logo_title: string,
  base_url: object
  result_code: number | string
  default_headers: string
  request_timeout: number
  user_info: string
}
