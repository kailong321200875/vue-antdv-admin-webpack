import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagsViewState {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: string[]
}

@Module({ dynamic: true, namespaced: true, store, name: 'tagsView' })
class App extends VuexModule implements TagsViewState {
  public visitedViews = [] as any[]
  public cachedViews = [] as any[]

  @Mutation
  private ADD_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
    if (this.visitedViews.some((v: RouteLocationNormalizedLoaded) => v.path === view.path)) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  }

  @Mutation
  private ADD_CACHED_VIEW(view: RouteLocationNormalizedLoaded | any): void {
    if (this.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name)
    }
  }

  @Mutation
  private DEL_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(view: RouteLocationNormalizedLoaded): void {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i)
        this.cachedViews.splice(index, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: RouteLocationNormalizedLoaded): void {
    this.visitedViews = this.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(view: RouteLocationNormalizedLoaded): void {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i)
        this.cachedViews = this.cachedViews.slice(index, index + 1)
        break
      }
    }
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS():void {
    // keep affix tags
    const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
    this.visitedViews = affixTags
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS():void {
    this.cachedViews = []
  }

  @Mutation
  private UPDATE_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  @Action
  public addView(view: RouteLocationNormalizedLoaded): void {
    this.addVisitedView(view)
    this.addCachedView(view)
  }

  @Action
  public addVisitedView(view: RouteLocationNormalizedLoaded): void {
    this.ADD_VISITED_VIEW(view)
  }

  @Action
  public addCachedView(view: RouteLocationNormalizedLoaded): void {
    this.ADD_CACHED_VIEW(view)
  }

  @Action
  public delView(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.delVisitedView(view)
      this.delCachedView(view)
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delVisitedView(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_VISITED_VIEW(view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delCachedView(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_CACHED_VIEW(view)
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delOthersViews(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.delOthersVisitedViews(view)
      this.delOthersCachedViews(view)
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delOthersVisitedViews(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_OTHERS_VISITED_VIEWS(view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delOthersCachedViews(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_OTHERS_CACHED_VIEWS(view)
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delAllViews(): Promise<unknown> {
    return new Promise(resolve => {
      this.delAllVisitedViews()
      this.delAllCachedViews()
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delAllVisitedViews(): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_ALL_VISITED_VIEWS()
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delAllCachedViews(): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_ALL_CACHED_VIEWS()
      resolve([...this.cachedViews])
    })
  }

  @Action
  public updateVisitedView(view: RouteLocationNormalizedLoaded): void {
    this.UPDATE_VISITED_VIEW(view)
  }
}

export const tagsViewStore = getModule<App>(App)
