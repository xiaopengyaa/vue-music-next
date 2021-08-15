import { get } from './base'
import { BaseReq } from '@/types/base'
import { RecommendRes } from '@/types/recommend'
import { SingerDetailRes } from '@/types/singer'

export function getRecommend() {
  return get<RecommendRes>('/api/getRecommend')
}

export function getAlbum(album: BaseReq) {
  return get<SingerDetailRes>('/api/getAlbum', {
    id: album.id,
  })
}
