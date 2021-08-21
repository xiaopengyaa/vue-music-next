import { createApp, Component, Directive } from 'vue'
import { addClass, removeClass } from '@/utils/dom'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective(
  Comp: Component
): Directive<any, boolean> {
  return {
    mounted(el, binding) {
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div')) as any
      const name = Comp.name || Symbol('default')
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }

      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      const title = binding.arg
      const name = Comp.name || Symbol('default')
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    },
  }

  function append(el: any) {
    const name = Comp.name || Symbol('default')
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el: any) {
    const name = Comp.name || Symbol('default')
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
