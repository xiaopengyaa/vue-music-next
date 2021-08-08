<template>
  <div ref="rootRef" class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div ref="progressRef" class="progress" :style="progressStyle" />
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue'

  interface Touch {
    x1: number
    beginWidth: number
  }

  const progressBtnWidth = 16

  export default defineComponent({
    name: 'ProgressBar',
    props: {
      progress: {
        type: Number,
        default: 0,
      },
    },
    emits: ['progress-changing', 'progress-changed'],
    setup(props, { emit }) {
      const touch: Touch = {
        x1: 0,
        beginWidth: 0,
      }

      const offset = ref(0)
      const progressRef = ref<HTMLElement | null>(null)
      const rootRef = ref<HTMLElement | null>(null)

      const progressStyle = computed(() => {
        return `width:${offset.value}px`
      })

      const btnStyle = computed(() => {
        return `transform:translate3d(${offset.value}px,0,0)`
      })

      watch(
        () => props.progress,
        (newProgress) => {
          setOffset(newProgress)
        }
      )

      function onTouchStart(e: TouchEvent) {
        touch.x1 = e.touches[0].pageX
        if (progressRef.value) {
          touch.beginWidth = progressRef.value.clientWidth
        }
      }

      function onTouchMove(e: TouchEvent) {
        const delta = e.touches[0].pageX - touch.x1
        const tempWidth = touch.beginWidth + delta
        if (rootRef.value) {
          const barWidth = rootRef.value.clientWidth - progressBtnWidth
          const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
          offset.value = barWidth * progress
          emit('progress-changing', progress)
        }
      }

      function onTouchEnd() {
        if (rootRef.value && progressRef.value) {
          const barWidth = rootRef.value.clientWidth - progressBtnWidth
          const progress = progressRef.value.clientWidth / barWidth
          emit('progress-changed', progress)
        }
      }

      function onClick(e: MouseEvent) {
        if (rootRef.value) {
          const rect = rootRef.value.getBoundingClientRect()
          const offsetWidth = e.pageX - rect.left
          const barWidth = rootRef.value.clientWidth - progressBtnWidth
          const progress = offsetWidth / barWidth
          emit('progress-changed', progress)
        }
      }

      function setOffset(progress: number) {
        if (rootRef.value) {
          const barWidth = rootRef.value.clientWidth - progressBtnWidth
          offset.value = barWidth * progress
        }
      }

      return {
        offset,
        progressRef,
        rootRef,
        progressStyle,
        btnStyle,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>
