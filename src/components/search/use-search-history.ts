import { save, remove, clear } from '@/utils/array-store'
import { SEARCH_KEY } from '@/utils/constant'
import { useStore } from '@/store'

export default function useSearchHistory() {
  const maxLen = 200

  const store = useStore()

  function saveSearch(query: string) {
    const searches = save(
      query,
      SEARCH_KEY,
      (item) => {
        return item === query
      },
      maxLen
    )
    store.commit('setSearchHistory', searches)
  }

  function deleteSearch(query: string) {
    const searches = remove(SEARCH_KEY, (item) => {
      return item === query
    })
    store.commit('setSearchHistory', searches)
  }

  function clearSearch() {
    const searches = clear(SEARCH_KEY)
    store.commit('setSearchHistory', searches)
  }

  return {
    saveSearch,
    deleteSearch,
    clearSearch,
  }
}
