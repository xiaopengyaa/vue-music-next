import { PLAY_MODE } from '@/utils/constant'
import { Song } from '@/types/singer'

export interface RootState {
  sequenceList: Song[]
  playlist: Song[]
  playing: boolean
  playMode: PLAY_MODE
  currentIndex: number
  fullScreen: boolean
  favoriteList: Song[]
  searchHistory: string[]
}
