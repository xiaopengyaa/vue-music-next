<template>
  <div class="recommend">推荐页面</div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount } from 'vue'
  import { getRecommend } from '@/service/recommend'

  export default defineComponent({
    name: 'Recommend',
    setup() {
      onBeforeMount(async () => {
        const result = await getRecommend()
        console.log(result)
      })
    },
  })
</script>

<style lang="scss" scoped></style>
