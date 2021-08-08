import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'
import lazyPlugin from 'vue3-lazy'
import defaultImg from '@/assets/images/default.png'

// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App)
  .use(router)
  .use(store, key)
  .use(lazyPlugin, {
    loading: defaultImg,
  })
  .directive('loading', loadingDirective)
  .directive('no-result', noResultDirective)
  .mount('#app')
