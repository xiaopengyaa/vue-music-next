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
  import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
  import SongList from '@/components/base/song-list/song-list.vue'
  import Scroll from '@/components/base/scroll/scroll.vue'
  import { Song } from '@/types/singer'
  import router from '@/router'
  import { Position } from '@better-scroll/slide/dist/types/SlidePages'

  const RESERVED_HEIGHT = 40

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
    },
    setup(props) {
      const imageHeight = ref(0)
      const scrollY = ref(0)
      const maxTranslateY = ref(0)
      const bgImage = ref<HTMLElement | null>(null)

      const playBtnStyle = computed(() => {
        let display = ''
        if (scrollY.value >= maxTranslateY.value) {
          display = 'none'
        }
        return {
          display,
        }
      })

      const bgImageStyle = computed(() => {
        let zIndex = 0
        let paddingTop: string | number = '70%'
        let height: string | number = 0
        let translateZ = 0

        if (scrollY.value > maxTranslateY.value) {
          zIndex = 10
          paddingTop = 0
          height = `${RESERVED_HEIGHT}px`
          translateZ = 1
        }

        let scale = 1
        if (scrollY.value < 0) {
          scale = 1 + Math.abs(scrollY.value / imageHeight.value)
        }

        return {
          zIndex,
          paddingTop,
          height,
          backgroundImage: `url(${props.pic})`,
          transform: `scale(${scale})translateZ(${translateZ}px)`,
        }
      })

      const scrollStyle = computed(() => {
        const bottom = '0'
        return {
          top: `${imageHeight.value}px`,
          bottom,
        }
      })

      const filterStyle = computed(() => {
        let blur = 0
        const scrollYVal = scrollY.value
        const imageHeightVal = imageHeight.value
        if (scrollYVal >= 0) {
          blur =
            Math.min(
              maxTranslateY.value / imageHeightVal,
              scrollYVal / imageHeightVal
            ) * 20
        }
        return {
          backdropFilter: `blur(${blur}px)`,
        }
      })

      onMounted(() => {
        imageHeight.value = bgImage.value?.clientHeight || 0
        maxTranslateY.value = imageHeight.value - RESERVED_HEIGHT
      })

      function goBack() {
        router.back()
      }
      function onScroll(pos: Position) {
        scrollY.value = -pos.y
      }
      function selectItem() {
        // selectPlay({
        //   list: songs,
        //   index,
        // })
      }
      function random() {
        // randomPlay(songs)
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
