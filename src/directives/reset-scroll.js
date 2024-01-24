export default {
  componentUpdated(el, binding, vnode) {
    let flag = true
    let loading = vnode.data.directives.find(d => d.name === 'loading')
    if (loading) {
      // 排除非数据更新的组件更新
      flag = loading.value
    }

    if (!flag) {
      return false
    }
    const selector = binding.value
    if (selector && el.querySelector(selector)) {
      el = el.querySelector(selector)
    }
    el.scrollTop = 0
    el.scrollLeft = 0
  },
}