<template>
  <div ref="rootRef">
    <slot />
  </div>
</template>

<script lang="ts">
  import useScroll from './use-scroll'
  import { ref } from 'vue'

  export default {
    name: 'Scroll',
    props: {
      click: {
        type: Boolean,
        default: true,
      },
      probeType: {
        type: Number,
        default: 0,
      },
    },
    setup(props) {
      const rootRef = ref<HTMLElement | null>(null)
      const scroll = useScroll(rootRef, props)

      return {
        rootRef,
        scroll,
      }
    },
  }
</script>
