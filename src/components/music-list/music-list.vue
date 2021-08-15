<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back" />
    </div>
    <h1 class="title">{{ title }}</h1>
    <div ref="bgImage" class="bg-image" :style="bgImageStyle">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play" />
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle" />
    </div>
    <scroll
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" :rank="rank" @select="selectItem" />
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue'
  import { useStore } from '@/store'
  import SongList from '@/components/base/song-list/song-list.vue'
  import Scroll from '@/components/wrap-scroll'
  import { Song } from '@/types/singer'
  import router from '@/router'
  import { Position } from '@better-scroll/slide/dist/types/SlidePages'
  import useStyle from './use-style'

  interface SelectItem {
    song: Song
    index: number
  }

  export default defineComponent({
    name: 'MusicList',
    components: {
      SongList,
      Scroll,
    },
    props: {
      songs: {
        type: Array as PropType<Song[]>,
        default: () => {
          return []
        },
      },
      title: {
        type: String,
        default: '',
      },
      pic: {
        type: String,
        default: '',
      },
      rank: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      noResultText: {
        type: String,
        default: '抱歉，没有找到可播放的歌曲',
      },
    },
    setup(props) {
      const {
        imageHeight,
        scrollY,
        maxTranslateY,
        playBtnStyle,
        bgImageStyle,
        scrollStyle,
        filterStyle,
        bgImage,
      } = useStyle(props)

      const store = useStore()

      const noResult = computed(() => {
        return !props.loading && !props.songs.length
      })

      function goBack() {
        router.back()
      }

      function onScroll(pos: Position) {
        scrollY.value = -pos.y
      }

      function selectItem({ index }: SelectItem) {
        store.dispatch('selectPlay', {
          list: props.songs,
          index,
        })
      }

      function random() {
        store.dispatch('randomPlay', props.songs)
      }

      return {
        imageHeight,
        scrollY,
        maxTranslateY,
        playBtnStyle,
        bgImageStyle,
        scrollStyle,
        filterStyle,
        bgImage,
        noResult,
        goBack,
        onScroll,
        selectItem,
        random,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
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
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>
