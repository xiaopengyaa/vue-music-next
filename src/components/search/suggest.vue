<template>
  <div
    ref="rootRef"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
    class="suggest"
  >
    <ul class="suggest-list">
      <li v-if="singer" class="suggest-item" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine" />
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        v-for="song in songs"
        :key="song.id"
        class="suggest-item"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music" />
        </div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
      <div v-loading:[loadingText]="pullUpLoading" class="suggest-item" />
    </ul>
  </div>
</template>

<script lang="ts">
  import { ref, watch, computed, nextTick, defineComponent } from 'vue'
  import { search } from '@/service/search'
  import { processSongs } from '@/service/song'
  import usePullUpLoad from './use-pull-up-load'
  import { Song } from '@/types/singer'
  import { SingerInfo } from '@/types/base'

  export default defineComponent({
    name: 'Suggest',
    props: {
      query: {
        type: String,
        default: '',
      },
      showSinger: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['select-song', 'select-singer'],
    setup(props, { emit }) {
      const singer = ref<SingerInfo | null>(null)
      const songs = ref<Song[]>([])
      const hasMore = ref(true)
      const page = ref(1)
      const loadingText = ref('')
      const noResultText = ref('抱歉，暂无搜索结果')
      const manualLoading = ref(false)

      const loading = computed(() => {
        return !singer.value && !songs.value.length
      })

      const noResult = computed(() => {
        return !singer.value && !songs.value.length && !hasMore.value
      })

      const pullUpLoading = computed(() => {
        return isPullUpLoad.value && hasMore.value
      })

      const preventPullUpLoad = computed(() => {
        return loading.value || manualLoading.value
      })

      const { isPullUpLoad, rootRef, scroll } = usePullUpLoad(
        searchMore,
        preventPullUpLoad
      )

      watch(
        () => props.query,
        async (newQuery) => {
          if (!newQuery) {
            return
          }
          await searchFirst()
        }
      )

      async function searchFirst() {
        if (!props.query) {
          return
        }
        page.value = 1
        songs.value = []
        singer.value = null
        hasMore.value = true

        const result = await search(props.query, page.value, props.showSinger)
        if (result) {
          songs.value = await processSongs(result.songs)
          singer.value = result.singer
          hasMore.value = result.hasMore
        }
        await nextTick()
        await makeItScrollable()
      }

      async function searchMore() {
        if (!hasMore.value || !props.query) {
          return
        }
        page.value++
        const result = await search(props.query, page.value, props.showSinger)
        if (result) {
          songs.value = songs.value.concat(await processSongs(result.songs))
          hasMore.value = result.hasMore
        }
        await nextTick()
        await makeItScrollable()
      }

      async function makeItScrollable() {
        if (scroll.value?.maxScrollY && scroll.value?.maxScrollY >= -1) {
          manualLoading.value = true
          await searchMore()
          manualLoading.value = false
        }
      }

      function selectSong(song: Song) {
        emit('select-song', song)
      }

      function selectSinger(singer: SingerInfo | null) {
        emit('select-singer', singer)
      }

      return {
        singer,
        songs,
        loadingText,
        noResultText,
        loading,
        noResult,
        pullUpLoading,
        selectSong,
        selectSinger,
        // pullUpLoad
        rootRef,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^='icon-'] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
