<template>
  <div class="singer-detail">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, PropType, ref } from 'vue'
  import MusicList from '@/components/music-list/music-list.vue'
  import { getSingerDetail } from '@/service/singer'
  import { SingerInfo } from '@/types/base'
  import { processSongs } from '@/service/song'
  import { Song } from '@/types/singer'
  import storage from 'good-storage'
  import { SINGER_KEY } from '@/utils/constant'
  import router from '@/router'

  export default defineComponent({
    name: 'SingerDetail',
    components: {
      MusicList,
    },
    props: {
      singer: {
        type: Object as PropType<SingerInfo | null>,
        default: () => {
          return null
        },
      },
    },
    setup(props) {
      const songs = ref<Song[]>([])
      const loading = ref(true)

      const computedData = computed(() => {
        let ret: SingerInfo | null = null
        const data = props.singer
        if (data) {
          ret = data
        } else {
          const cached = storage.session.get(SINGER_KEY)
          if (
            cached &&
            (cached.mid || cached.id + '') ===
              router.currentRoute.value.params.id
          ) {
            ret = cached
          }
        }
        return ret
      })

      const title = computed(() => {
        return computedData.value?.name
      })

      const pic = computed(() => {
        return computedData.value?.pic
      })

      onBeforeMount(async () => {
        if (!computedData.value) {
          const path = router.currentRoute.value.matched[0].path
          router.push({
            path,
          })
          return
        }
        const result = await getSingerDetail(computedData.value)
        loading.value = false
        if (result) {
          songs.value = await processSongs(result.songs)
        }
      })

      return {
        computedData,
        songs,
        title,
        pic,
        loading,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
