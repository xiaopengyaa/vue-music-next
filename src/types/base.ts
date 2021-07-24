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
