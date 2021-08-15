import {
  h,
  mergeProps,
  withCtx,
  renderSlot,
  ref,
  computed,
  watch,
  nextTick,
  defineComponent,
  ComponentPublicInstance,
} from 'vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import { useStore } from '@/store'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

export default defineComponent({
  name: 'WrapScroll',
  props: Scroll.props,
  emits: Scroll.emits,
  setup() {
    const scrollRef = ref<InstanceType<typeof Scroll> | null>(null)
    const scroll = computed<BScrollConstructor | null>(() => {
      let scroll = null
      if (scrollRef.value) {
        scroll = scrollRef.value.scroll as BScrollConstructor
      }
      return scroll
    })

    const store = useStore()
    const playlist = computed(() => store.state.playlist)

    watch(playlist, async () => {
      await nextTick()
      scroll.value?.refresh()
    })

    return {
      scrollRef,
      scroll,
    }
  },
  render(ctx: ComponentPublicInstance) {
    return h(
      Scroll,
      mergeProps(
        {
          ref: 'scrollRef',
        },
        ctx.$props,
        {
          onScroll: (e: any) => {
            ctx.$emit('scroll', e)
          },
        }
      ),
      {
        default: withCtx(() => {
          return [renderSlot(ctx.$slots, 'default')]
        }),
      }
    )
  },
})
