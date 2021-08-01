import BScroll, { Options } from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import ObserveDOM from '@better-scroll/observe-dom'
import { Position } from '@better-scroll/slide/dist/types/SlidePages'
import { onMounted, onUnmounted, ref, Ref } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(
  wrapperRef: Ref<HTMLElement | null>,
  options: Options,
  emit: (event: 'scroll', ...args: any[]) => void
) {
  const scroll = ref<BScrollConstructor | null>(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value as HTMLElement, {
      observeDOM: true,
      ...options,
    })

    const scrollVal: BScrollConstructor = scroll.value

    if (Number(options.probeType) > 0) {
      scrollVal.on('scroll', (pos: Position) => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })

  return scroll
}
