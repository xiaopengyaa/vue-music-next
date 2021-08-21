import { SingerInfo } from './base'
import { Song } from './singer'

export interface HotKey {
  id: number
  key: string
}

export interface HotKeyRes {
  hotKeys: HotKey[]
}

export interface Search {
  songs: Song[]
  singer: SingerInfo
  hasMore: boolean
}
