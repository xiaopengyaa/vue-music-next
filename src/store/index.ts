import { InjectionKey } from 'vue'
import {
  createStore,
  createLogger,
  Store,
  useStore as baseUseStore,
} from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import { RootState } from '@/types/store'

const debug = process.env.NODE_ENV !== 'production'

export const key: InjectionKey<Store<RootState>> = Symbol('vue-store')

export function useStore() {
  return baseUseStore<RootState>(key)
}

export default createStore<RootState>({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
