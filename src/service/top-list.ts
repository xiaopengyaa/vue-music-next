import { Top, TopRes } from '@/types/top-list'
import { get } from './base'

export function getTopList() {
  return get<TopRes>('/api/getTopList')
}

export function getTopDetail(top: Top) {
  return get('/api/getTopDetail', {
    id: top.id,
    period: top.period,
  })
}
