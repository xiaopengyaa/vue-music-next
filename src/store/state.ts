import { PLAY_MODE, SEARCH_KEY } from '@/utils/constant'
import { RootState } from '@/types/store'
import { load } from '@/utils/array-store'

const state: RootState = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: [],
  searchHistory: load(SEARCH_KEY),
  playHistory: [],
}

export default state
