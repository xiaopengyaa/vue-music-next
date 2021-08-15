import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/store'

const RESERVED_HEIGHT = 40

export default function useStyle(props: any) {
  const imageHeight = ref(0)
  const scrollY = ref(0)
  const maxTranslateY = ref(0)
  const bgImage = ref<HTMLElement | null>(null)

  const store = useStore()

  const playlist = computed(() => store.state.playlist)

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
    const bottom = playlist.value.length ? '60px' : '0'
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

  return {
    imageHeight,
    scrollY,
    maxTranslateY,
    playBtnStyle,
    bgImageStyle,
    scrollStyle,
    filterStyle,
    bgImage,
  }
}
