import { computed, defineComponent, onBeforeMount, PropType, ref } from 'vue'
import MusicList from '@/components/music-list/music-list.vue'
import storage from 'good-storage'
import router from '@/router'
import { processSongs } from '@/service/song'
import { SingerInfo } from '@/types/base'
import { Song } from '@/types/singer'

export default function createDetailComponent(
  name: string,
  key: string,
  fetch: any
) {
  return defineComponent({
    name,
    components: {
      MusicList,
    },
    props: {
      data: {
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
        const data = props.data
        if (data) {
          ret = data
        } else {
          const cached = storage.session.get(key)
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
        const result = await fetch(computedData.value)
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
}
