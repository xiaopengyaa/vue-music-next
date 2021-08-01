import { Singer } from '@/types/base'

export interface SingerRes {
  singers: Singer[]
}

export interface Song {
  album: string
  duration: number
  id: number
  mid: string
  name: string
  pic: string
  singer: string
  url: string
}

export interface SingerDetailRes {
  songs: Song[]
}
