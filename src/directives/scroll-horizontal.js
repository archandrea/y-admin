function scrollHorizontal(e) {
  e.preventDefault()
  this.scrollLeft += e.deltaY
}

export default {
  bind(el, binding, vnode) {
    el.addEventListener('mousewheel', scrollHorizontal)
  },
  unbind(el) {
    el.removeEventListener('mousewheel', scrollHorizontal)
  }
}