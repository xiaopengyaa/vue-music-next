import { onMounted, onUnmounted, ref, Ref } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import { Page } from '@better-scroll/slide/dist/types/SlidePages'

BScroll.use(Slide)

export default function useSlider(wrapperRef: Ref<HTMLElement | null>) {
  const slider = ref<BScrollConstructor | null>(null)
  const currentPageIndex = ref<number>(0)

  onMounted(() => {
    slider.value = new BScroll(wrapperRef.value as HTMLElement, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    })
    slider.value.on('slideWillChange', (page: Page) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value?.destroy()
  })

  return {
    slider,
    currentPageIndex,
  }
}
