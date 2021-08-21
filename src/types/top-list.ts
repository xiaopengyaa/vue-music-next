export interface TopSong {
  id: number
  singerName: string
  songName: string
}

export interface Top {
  id: number
  name: string
  period: string
  pic: string
  songList: TopSong[]
}

export interface TopRes {
  topList: Top[]
}
