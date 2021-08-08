import { PLAY_MODE, FAVORITE_KEY } from '@/utils/constant'
import { RootState } from '@/types/store'
import { load } from '@/utils/array-store'

const state: RootState = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: load(FAVORITE_KEY),
}

export default state
