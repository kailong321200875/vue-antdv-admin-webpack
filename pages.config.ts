/**
 * 多页应用配置，只需要配置基础路径即可。
 * 因为是在编译时运行的文件，所以无法使用路径别名来进行引入，只能使用相对路径
 */
import { PagesModule } from './src/types/vue.config'

const pagesConfig: PagesModule = {
  index: {
    template: 'public/index.html',
    title: 'vue-antdv-admin-webpack'
  }
}

export default pagesConfig
