<template>
  <div v-no-result:[noResultText]="noResult" class="user-center">
    <div class="back" @click="back">
      <i class="icon-back" />
    </div>
    <div class="switches-wrapper">
      <switches v-model="currentIndex" :items="['我喜欢的', '最近播放']" />
    </div>
    <div v-if="currentList.length" class="play-btn" @click="random">
      <i class="icon-play" />
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper">
      <scroll v-if="currentIndex === 0" class="list-scroll">
        <div class="list-inner">
          <song-list :songs="favoriteList" @select="selectSong" />
        </div>
      </scroll>
      <scroll v-if="currentIndex === 1" class="list-scroll">
        <div class="list-inner">
          <song-list :songs="playHistory" @select="selectSong" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { useStore } from '@/store'
  import router from '@/router'
  import Switches from '@/components/base/switches/switches.vue'
  import Scroll from '@/components/wrap-scroll/index'
  import SongList from '@/components/base/song-list/song-list.vue'
  import { Song } from '@/types/singer'

  interface SelectItem {
    song: Song
    index: number
  }

  export default defineComponent({
    name: 'UserCenter',
    components: {
      Switches,
      Scroll,
      SongList,
    },
    setup() {
      const currentIndex = ref(0)

      const store = useStore()
      const favoriteList = computed(() => store.state.favoriteList)
      const playHistory = computed(() => store.state.playHistory)

      const noResult = computed(() => {
        return currentIndex.value === 0
          ? !favoriteList.value.length
          : !playHistory.value.length
      })

      const noResultText = computed(() => {
        return currentIndex.value === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
      })

      const currentList = computed(() => {
        return currentIndex.value === 0 ? favoriteList.value : playHistory.value
      })

      function back() {
        router.back()
      }

      function selectSong({ song }: SelectItem) {
        store.dispatch('addSong', song)
      }

      function random() {
        store.dispatch('randomPlay', currentList.value)
      }

      return {
        currentIndex,
        noResult,
        noResultText,
        currentList,
        favoriteList,
        playHistory,
        back,
        selectSong,
        random,
      }
    },
  })
</script>

<style scoped lang="scss">
  .user-center {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: $color-background;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .switches-wrapper {
      margin: 10px 0 30px 0;
    }
    .play-btn {
      box-sizing: border-box;
      width: 135px;
      padding: 7px 0;
      margin: 0 auto;
      text-align: center;
      border: 1px solid $color-text-l;
      color: $color-text-l;
      border-radius: 100px;
      font-size: 0;
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .list-wrapper {
      position: absolute;
      top: 110px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }
</style>
