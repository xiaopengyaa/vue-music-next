import { get } from './base'
import { SingerInfo } from '@/types/base'
import { SingerDetailRes, SingerRes } from '@/types/singer'

export function getSingerList() {
  return get<SingerRes>('/api/getSingerList')
}

export function getSingerDetail(singer: SingerInfo) {
  return get<SingerDetailRes>('/api/getSingerDetail', {
    mid: singer.mid,
  })
}
