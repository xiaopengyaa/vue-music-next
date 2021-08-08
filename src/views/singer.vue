<template>
  <div v-loading="!singers.length" class="singer">
    <index-list :data="singers" @select="selectSinger" />
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue'
  import IndexList from '@/components/index-list/index-list.vue'
  import { getSingerList } from '@/service/singer'
  import { Singer, SingerInfo } from '@/types/base'
  import router from '@/router'
  import storage from 'good-storage'
  import { SINGER_KEY } from '@/utils/constant'

  export default defineComponent({
    name: 'Singer',
    components: {
      IndexList,
    },
    setup() {
      const singers = ref<Singer[]>([])
      const selectedSinger = ref<SingerInfo | null>(null)

      onBeforeMount(async () => {
        const result = await getSingerList()
        singers.value = result?.singers || []
      })

      function selectSinger(singer: SingerInfo) {
        selectedSinger.value = singer
        cacheSinger(singer)
        router.push({
          path: `/singer/${singer.mid}`,
        })
      }

      function cacheSinger(singer: SingerInfo) {
        storage.session.set(SINGER_KEY, singer)
      }

      return {
        singers,
        selectSinger,
        selectedSinger,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
