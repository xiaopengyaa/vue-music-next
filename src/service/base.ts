import axios from 'axios'
import { ResData } from '@/types/base'
import { Code } from '@/types/enum'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://ustbhuangyi.com/music-next/'
    : '/'

axios.defaults.baseURL = baseURL

export function get<T = unknown>(url: string, params?: unknown) {
  return axios
    .get<ResData<T>>(url, {
      params,
    })
    .then((res) => {
      const serverData = res.data
      if (serverData.code === Code.ERR_OK) {
        return serverData.result
      }
    })
    .catch((e) => {
      console.log(e)
    })
}
