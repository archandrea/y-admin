export default {
  namespaced: true,
  state: () => ({
    visitedViews: [], //元素为route对象
    cachedViews: [], //元素为route.name
  }),
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || '未命名'
        })
      )
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEW: (state, view) => {
      const idx = state.visitedViews.findIndex(v => v.path === view.path)
      if (idx !== -1) {
        state.visitedViews.splice(idx, 1)
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      const idx = state.cachedViews.indexOf(view.name)
      if (idx !== -1) {
        state.cachedViews.splice(idx, 1)
      }
    },
    DEL_OTHER_VISITED_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.path === view.path || v.meta.affix
      })
    },
    DEL_OTHER_CACHED_VIEWS: (state, view) => {
      const index = state.cachedViews.indexOf(view.name)
      if (index !== -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1)
      } else {
        state.cachedViews = []
      }
    },
    DEL_ALL_VISITED_VIEWS: state => {
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = []
    },
    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    delView({ commit }, view) {
      commit('DEL_VISITED_VIEW', view)
      commit('DEL_CACHED_VIEW', view)
    },
    delCachedView({ commit }, view) {
      commit('DEL_CACHED_VIEW', view)
    },
    delOtherViews({ commit }, view) {
      commit('DEL_OTHER_VISITED_VIEWS', view)
      commit('DEL_OTHER_CACHED_VIEWS', view)
    },
    delAllViews({ commit }) {
      commit('DEL_ALL_VISITED_VIEWS')
      commit('DEL_ALL_CACHED_VIEWS')
    },
    updateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view)
    }
  },
}