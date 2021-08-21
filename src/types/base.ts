import { Code } from '@/types/enum'

export interface ResData<T> {
  code: Code
  result: T
}

export interface BaseReq {
  id: string
}

export interface SliderParams {
  id: string
  link: string
  pic: string
}

export interface SingerInfo {
  id: number
  mid: string
  pic: string
  name?: string
  title?: string
}

export interface Singer {
  title: string
  list: SingerInfo[]
}
