import { HotKeyRes, Search } from '@/types/search'
import { get } from './base'

export function getHotKeys() {
  return get<HotKeyRes>('/api/getHotKeys')
}

export function search(query: string, page: number, showSinger: boolean) {
  return get<Search>('/api/search', {
    query,
    page,
    showSinger,
  })
}
