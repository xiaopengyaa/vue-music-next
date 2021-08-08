import { Component, Directive, createApp } from 'vue'
import { addClass, removeClass } from '@/utils/dom'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective(
  comp: Component
): Directive<any, boolean> {
  const name = comp.name || Symbol('default')

  return {
    mounted(el, binding) {
      const instance = createApp(comp).mount(document.createElement('div'))

      if (!el[name]) {
        el[name] = {}
      }

      el[name].instance = instance

      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }

      if (binding.value !== binding.oldValue) {
        append(el)
      }
    },
    updated(el, binding) {
      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }

      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    },
  }

  function append(el: any) {
    const style = getComputedStyle(el)
    if (['fixed', 'relative', 'absolute'].includes(style.position)) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el: any) {
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
