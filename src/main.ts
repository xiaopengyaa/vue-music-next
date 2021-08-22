import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'
import lazyPlugin from 'vue3-lazy'
import defaultImg from '@/assets/images/default.png'
import { load, saveAll } from '@/utils/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/utils/constant'
import { processSongs } from '@/service/song'

// 引入全局样式文件
import '@/assets/scss/index.scss'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then((songs) => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}

createApp(App)
  .use(router)
  .use(store, key)
  .use(lazyPlugin, {
    loading: defaultImg,
  })
  .directive('loading', loadingDirective)
  .directive('no-result', noResultDirective)
  .mount('#app')
