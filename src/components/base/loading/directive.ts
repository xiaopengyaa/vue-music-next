import { Directive, createApp } from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass } from '@/utils/dom'

const relativeCls = 'g-relative'

const loadingDirective: Directive<any, boolean> = {
  mounted(el, binding) {
    const instance = createApp(Loading).mount(document.createElement('div'))
    el.instance = instance

    const title = binding.arg
    if (typeof title !== 'undefined') {
      el.instance.setTitle(title)
    }

    if (binding.value !== binding.oldValue) {
      append(el)
    }
  },
  updated(el, binding) {
    const title = binding.arg
    if (typeof title !== 'undefined') {
      el.instance.setTitle(title)
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
  el.appendChild(el.instance.$el)
}

function remove(el: any) {
  removeClass(el, relativeCls)
  el.removeChild(el.instance.$el)
}

export default loadingDirective
