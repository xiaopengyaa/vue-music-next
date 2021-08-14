import { useStore } from '@/store'
import { computed, watch, ref, Ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'
import Scroll from '@/components/base/scroll/scroll.vue'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import { Song } from '@/types/singer'

interface UseLyricParams {
  songReady: Ref<boolean>
  currentTime: Ref<number>
}

interface LyricHandleParams {
  lineNum: number
  txt: string
}

export default function useLyric({ songReady, currentTime }: UseLyricParams) {
  const currentLyric = ref<Lyric | null>(null)
  const currentLineNum = ref(0)
  const pureMusicLyric = ref('')
  const playingLyric = ref('')
  const lyricScrollRef = ref<InstanceType<typeof Scroll> | null>(null)
  const lyricListRef = ref<HTMLElement | null>(null)

  const store = useStore()
  const currentSong = computed<Song>(() => store.getters.currentSong)

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''

    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', {
      song: newSong,
      lyric,
    })
    if (currentSong.value.lyric !== lyric) {
      return
    }

    currentLyric.value = new Lyric(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      if (songReady.value) {
        playLyric()
      }
    } else {
      playingLyric.value = pureMusicLyric.value = lyric.replace(
        /\[(\d{2}):(\d{2}):(\d{2})\]/g,
        ''
      )
    }
  })

  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  function handleLyric({ lineNum, txt }: LyricHandleParams) {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl || !scrollComp) {
      return
    }

    const scroll = scrollComp.scroll as BScrollConstructor

    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scroll.scrollToElement(lineEl as HTMLElement, 1000, 0, 0)
    } else {
      scroll.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric,
  }
}
