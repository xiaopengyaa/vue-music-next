<template>
  <teleport to="body">
    <transition name="slide-down">
      <div v-show="visible" class="message" @click="hide">
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Message',
    props: {
      delay: {
        type: Number,
        default: 2000,
      },
    },
    setup(props) {
      const visible = ref(false)
      let timer: NodeJS.Timeout

      function show() {
        visible.value = true
        clearTimeout(timer)
        timer = setTimeout(() => {
          hide()
        }, props.delay)
      }

      function hide() {
        clearTimeout(timer)
        visible.value = false
      }

      return {
        visible,
        show,
        hide,
      }
    },
  })
</script>

<style scoped lang="scss">
  .message {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 400;
    background: $color-dialog-background;

    &.slide-down-enter-active,
    &.slide-down-leave-active {
      transition: all 0.3s;
    }

    &.slide-down-enter-from,
    &.slide-down-leave-to {
      transform: translate3d(0, -100%, 0);
    }
  }
</style>
