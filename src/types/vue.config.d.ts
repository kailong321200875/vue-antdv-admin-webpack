// 多页模版子接口
export interface pageItemModule {
  template: string
}

// 多页模版接口
export interface pagesModule {
  [key: string]: pageItemModule
}

// 多页入口模版子接口
export interface entryItemModule extends pageItemModule {
  entry: string,
  chunks: string[]
}