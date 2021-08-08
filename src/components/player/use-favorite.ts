import { computed } from 'vue'
import { useStore } from '@/store'
import { save, remove } from '@/utils/array-store'
import { FAVORITE_KEY } from '@/utils/constant'
import { Song } from '@/types/singer'

export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)
  const maxLen = 100

  function getFavoriteIcon(song: Song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  function toggleFavorite(song: Song) {
    let list
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare)
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    store.commit('setFavoriteList', list)

    function compare(item: Song) {
      return item.id === song.id
    }
  }

  function isFavorite(song: Song) {
    return (
      favoriteList.value.findIndex((item) => {
        return item.id === song.id
      }) > -1
    )
  }

  return {
    getFavoriteIcon,
    toggleFavorite,
  }
}
