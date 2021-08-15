<template>
  <m-header />
  <tab />
  <router-view :style="viewStyle" />
  <player />
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from '@/store'
  import MHeader from '@/components/header/header.vue'
  import Player from '@/components/player/player.vue'
  import Tab from '@/components/tab/tab.vue'

  export default defineComponent({
    name: 'App',
    components: {
      MHeader,
      Tab,
      Player,
    },
    setup() {
      const store = useStore()

      const playlist = computed(() => store.state.playlist)

      const viewStyle = computed(() => {
        const bottom = playlist.value.length ? '60px' : '0'
        return {
          bottom,
        }
      })

      return {
        viewStyle,
      }
    },
  })
</script>
