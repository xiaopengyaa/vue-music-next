<template>
  <m-header />
  <tab />
  <router-view v-slot="{ Component }" :style="viewStyle">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-slot="{ Component }" :style="viewStyle" name="user">
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <player />
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from '@/store'
  import MHeader from '@/components/header/header.vue'
  import Player from '@/components/player/music-player.vue'
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
