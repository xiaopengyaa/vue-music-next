<template>
  <m-header />
  <tab />
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MHeader from '@/components/header/header.vue'
  import Tab from '@/components/tab/tab.vue'

  export default defineComponent({
    name: 'App',
    components: {
      MHeader,
      Tab,
    },
  })
</script>
