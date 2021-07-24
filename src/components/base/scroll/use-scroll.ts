import BScroll, { Options } from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref, Ref } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(
  wrapperRef: Ref<HTMLElement | null>,
  options?: Options
) {
  const scroll = ref<BScrollConstructor | null>(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value as HTMLElement, {
      observeDOM: true,
      ...options,
    })
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })
}
