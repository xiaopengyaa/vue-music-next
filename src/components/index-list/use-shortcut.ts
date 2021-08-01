import { computed, Ref, ref } from 'vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

interface Touches {
  y1: number
  y2: number
  anchorIdx: number
}

export default function useShortcut(
  props: any,
  groupRef: Ref<HTMLElement | null>
) {
  const scrollRef = ref<InstanceType<typeof Scroll> | null>(null)

  const ANCHOR_HEIGHT = 18

  const shortcutList = computed<string[]>(() => {
    return props.data.map((group: any) => {
      return group.title
    })
  })

  const touches: Touches = {
    y1: 0,
    y2: 0,
    anchorIdx: 0,
  }

  function onShortcutTouchStart(e: TouchEvent) {
    const anchorIdx = parseInt((e.target as HTMLElement).dataset.index || '')

    touches.y1 = e.touches[0].pageY
    touches.anchorIdx = anchorIdx

    scrollTo(anchorIdx)
  }

  function onShortcutTouchMove(e: TouchEvent) {
    touches.y2 = e.touches[0].pageY
    const delta = ((touches.y2 - touches.y1) / ANCHOR_HEIGHT) | 0
    const anchorIdx = delta + touches.anchorIdx

    scrollTo(anchorIdx)
  }

  function scrollTo(index: number) {
    if (isNaN(index)) {
      return
    }

    index = Math.max(0, Math.min(index, shortcutList.value.length - 1))

    const targetEl = groupRef.value?.children[index]
    if (scrollRef.value) {
      const scroll = scrollRef.value.scroll as BScrollConstructor
      scroll.scrollToElement(targetEl as HTMLElement, 0, 0, 0)
    }
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove,
  }
}
