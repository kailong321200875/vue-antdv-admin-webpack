import { emptyObj } from '@/types/glob'

const modulesFiles: any = require.context('./modules', true, /\.ts$/)

const modules: emptyObj = modulesFiles.keys().reduce((modules: emptyObj, modulePath: string): Object => {
  const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value: emptyObj = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default {
  ...modules
}
