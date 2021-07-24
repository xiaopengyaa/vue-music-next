import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Recommend = () =>
  import('@/views/recommend.vue' /* webpackChunkName: "recommend" */)
const Singer = () =>
  import('@/views/singer.vue' /* webpackChunkName: "singer" */)
const TopList = () =>
  import('@/views/top-list.vue' /* webpackChunkName: "top-list" */)
const Search = () =>
  import('@/views/search.vue' /* webpackChunkName: "search" */)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    component: Recommend,
  },
  {
    path: '/singer',
    component: Singer,
  },
  {
    path: '/top-list',
    component: TopList,
  },
  {
    path: '/search',
    component: Search,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
