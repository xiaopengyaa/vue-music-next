import { useStore } from '@/store'
import { computed, ref, watch } from 'vue'

export default function useCd() {
  const cdRef = ref<HTMLElement | null>(null)
  const cdImageRef = ref<HTMLElement | null>(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)

  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  watch(playing, (newPlaying) => {
    if (!newPlaying && cdRef.value && cdImageRef.value) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform(wrapper: HTMLElement, inner: HTMLElement) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform =
      wrapperTransform === 'none'
        ? innerTransform
        : innerTransform.concat(' ', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef,
  }
}
