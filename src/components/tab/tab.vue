<template>
  <div class="tab">
    <router-link
      v-for="tab in tabs"
      :key="tab.path"
      class="tab-item"
      :to="tab.path"
    >
      <span class="tab-link">
        {{ tab.name }}
      </span>
    </router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'

  export default defineComponent({
    name: 'Tab',
    setup() {
      const tabs = reactive([
        {
          name: '推荐',
          path: '/recommend',
        },
        {
          name: '歌手',
          path: '/singer',
        },
        {
          name: '排行',
          path: '/top-list',
        },
        {
          name: '搜索',
          path: '/search',
        },
      ])
      return {
        tabs,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;

    .tab-item {
      flex: 1;
      text-align: center;

      .tab-link {
        padding-bottom: 5px;
        color: $color-text-l;
      }

      &.router-link-active {
        .tab-link {
          color: $color-theme;
          border-bottom: 2px solid $color-theme;
        }
      }
    }
  }
</style>
