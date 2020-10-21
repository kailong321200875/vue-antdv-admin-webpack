// 多页入口接口
export interface pageItemModule {
  template: string,
  entry?: string,
  chunks?: string[]
}

// 多页模版接口
export interface pagesModule {
  [propName: string]: pageItemModule
}