import {
  ref,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  Ref,
} from 'vue'
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

BScroll.use(PullUp)
BScroll.use(ObserveDOM)

export default function usePullUpLoad(
  requestData: () => void,
  preventPullUpLoad: Ref<boolean>
) {
  const scroll = ref<BScrollConstructor | null>(null)
  const rootRef = ref<HTMLElement | null>(null)
  const isPullUpLoad = ref(false)

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(
      rootRef.value as HTMLElement,
      {
        pullUpLoad: true,
        observeDOM: true,
        click: true,
      }
    ))

    scrollVal.on('pullingUp', pullingUpHandler)

    async function pullingUpHandler() {
      if (preventPullUpLoad.value) {
        scrollVal.finishPullUp()
        return
      }
      isPullUpLoad.value = true
      await requestData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })

  onActivated(() => {
    scroll.value?.enable()
    scroll.value?.refresh()
  })

  onDeactivated(() => {
    scroll.value?.disable()
  })

  return {
    scroll,
    rootRef,
    isPullUpLoad,
  }
}
