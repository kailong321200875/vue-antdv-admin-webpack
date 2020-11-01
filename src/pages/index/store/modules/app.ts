import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

export interface AppState {
  collapsed: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  public collapsed = false

  @Mutation
  private SET_COLLAPSED(collapsed: boolean): void {
    this.collapsed = collapsed
  }

  @Action
  public SetCollapsed(collapsed: boolean): void {
    this.SET_COLLAPSED(collapsed)
  }
}

export const appStore = getModule<App>(App)
