import { Song } from '@/types/singer'
import { SongsUrlRes } from '@/types/song'
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
