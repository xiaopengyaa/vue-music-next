import { useStore } from '@/store'
import { PLAY_KEY } from '@/utils/constant'
import { save } from '@/utils/array-store'
import { Song } from '@/types/singer'

export default function usePlayHistory() {
  const store = useStore()

  const maxLen = 200

  function savePlay(song: Song) {
    const songs = save(
      song,
      PLAY_KEY,
      (item) => {
        return item.id === song.id
      },
      maxLen
    )

    store.commit('setPlayHistory', songs)
  }

  return {
    savePlay,
  }
}
