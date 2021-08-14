import { Song } from '@/types/singer'
import { LyricRes, SongsUrlRes } from '@/types/song'
import { get } from './base'

export function processSongs(songs: Song[]) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get<SongsUrlRes>('/api/getSongsUrl', {
    mid: songs.map((song) => {
      return song.mid
    }),
  }).then((result) => {
    if (result) {
      const map = result.map
      return songs
        .map((song) => {
          song.url = map[song.mid]
          return song
        })
        .filter((song) => {
          return song.url && song.url.includes('vkey')
        })
    } else {
      return []
    }
  })
}

const lyricMap: Record<string, string> = {}

export function getLyric(song: Song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get<LyricRes>('/api/getLyric', {
    mid,
  }).then((result) => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric
    return lyric
  })
}
