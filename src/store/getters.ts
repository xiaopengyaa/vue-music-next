import { GetterTree } from 'vuex'
import { RootState } from '@/types/store'

const getters: GetterTree<RootState, RootState> = {
  currentSong: (state) => {
    return state.playlist[state.currentIndex] || {}
  },
}

export default getters
