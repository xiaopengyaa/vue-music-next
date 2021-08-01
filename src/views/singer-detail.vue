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

  export default defineComponent({
    name: 'SingerDetail',
    components: {
      MusicList,
    },
    props: {
      singer: {
        type: Object as PropType<SingerInfo>,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const songs = ref<Song[]>([])
      const loading = ref(true)

      const title = computed(() => {
        return props.singer.name
      })

      const pic = computed(() => {
        return props.singer.pic
      })

      onBeforeMount(async () => {
        const result = await getSingerDetail(props.singer)
        loading.value = false
        if (result) {
          songs.value = await processSongs(result.songs)
        }
      })

      return {
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
