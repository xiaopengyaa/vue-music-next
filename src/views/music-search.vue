<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query" />
    </div>
    <scroll v-show="!query" ref="scrollRef" class="search-content">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              v-for="item in hotKeys"
              :key="item.id"
              class="item"
              @click="addQuery(item.key)"
            >
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div v-show="searchHistory.length" class="search-history">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear" />
            </span>
          </h1>
          <confirm
            ref="confirmRef"
            text="是否清空所有搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          />
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          />
        </div>
      </div>
    </scroll>
    <div v-show="query" class="search-result">
      <suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      />
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
  import { ref, computed, watch, nextTick, defineComponent } from 'vue'
  import SearchInput from '@/components/search/search-input.vue'
  import Suggest from '@/components/search/suggest.vue'
  import SearchList from '@/components/base/search-list/search-list.vue'
  import Scroll from '@/components/wrap-scroll/index'
  import Confirm from '@/components/base/confirm/confirm.vue'
  import { getHotKeys } from '@/service/search'
  import { useStore } from '@/store'
  import { useRouter } from 'vue-router'
  import storage from 'good-storage'
  import { SINGER_KEY } from '@/utils/constant'
  import useSearchHistory from '@/components/search/use-search-history'
  import { HotKey } from '@/types/search'
  import { Song } from '@/types/singer'
  import { SingerInfo } from '@/types/base'

  export default defineComponent({
    name: 'Search',
    components: {
      Confirm,
      Scroll,
      SearchList,
      SearchInput,
      Suggest,
    },
    setup() {
      const query = ref('')
      const hotKeys = ref<HotKey[]>([])
      const selectedSinger = ref<SingerInfo | null>(null)
      const scrollRef = ref<InstanceType<typeof Scroll> | null>(null)
      const confirmRef = ref<InstanceType<typeof Confirm> | null>(null)

      const store = useStore()
      const searchHistory = computed(() => store.state.searchHistory)

      const router = useRouter()

      const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

      getHotKeys().then((result) => {
        if (result) {
          hotKeys.value = result.hotKeys
        }
      })

      watch(query, async (newQuery) => {
        if (!newQuery) {
          await nextTick()
          refreshScroll()
        }
      })

      function refreshScroll() {
        scrollRef.value?.scroll?.refresh()
      }

      function addQuery(s: string) {
        query.value = s.trim()
      }

      function selectSong(song: Song) {
        saveSearch(query.value)
        store.dispatch('addSong', song)
      }

      function selectSinger(singer: SingerInfo) {
        saveSearch(query.value)
        selectedSinger.value = singer
        cacheSinger(singer)

        router.push({
          path: `/search/${singer.mid}`,
        })
      }

      function cacheSinger(singer: SingerInfo) {
        storage.session.set(SINGER_KEY, singer)
      }

      function showConfirm() {
        confirmRef.value?.show()
      }

      return {
        scrollRef,
        confirmRef,
        query,
        hotKeys,
        selectedSinger,
        searchHistory,
        addQuery,
        selectSong,
        selectSinger,
        showConfirm,
        // searchHistory
        deleteSearch,
        clearSearch,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
      margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
