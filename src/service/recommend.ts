import { get } from './base'
import { BaseReq } from '@/types/base'
import { RecommendRes } from '@/types/recommend'
export function getRecommend() {
  return get<RecommendRes>('/api/getRecommend')
}

export function getAlbum(album: BaseReq) {
  return get('/api/getAlbum', {
    id: album.id,
  })
}
