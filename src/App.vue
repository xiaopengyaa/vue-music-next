<template>
  <m-header />
  <tab />
  <router-view />
  <player />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
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
  })
</script>
