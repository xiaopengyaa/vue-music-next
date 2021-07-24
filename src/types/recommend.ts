import { SliderParams } from './base'
export interface Album {
  id: number
  pic: string
  title: string
  username: string
}

export interface RecommendRes {
  albums: Album[]
  sliders: SliderParams[]
}
