<template>
  <div class="album">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading" />
  </div>
</template>

<script lang="ts">
  import createDetailComponent from '@/utils/create-detail-component'
  import { getAlbum } from '@/service/recommend'
  import { ALBUM_KEY } from '@/utils/constant'

  export default createDetailComponent('Album', ALBUM_KEY, getAlbum)
</script>

<style lang="scss" scoped>
  .album {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
