import { get } from './base'
import { BaseReq } from '@/types/base'
export function getRecommend() {
  return get('/api/getRecommend')
}

export function getAlbum(album: BaseReq) {
  return get('/api/getAlbum', {
    id: album.id,
  })
}
