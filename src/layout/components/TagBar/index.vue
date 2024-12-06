<template>
  <div :class="`${namespace}-tagBar`">
    <div
      :class="`${namespace}-tagBar-btn`"
      @click="scrollLeft">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div
      :class="`${namespace}-tagBar-wrapper`"
      ref="tagBarWrapper"
      v-scroll-horizontal>
      <router-link
        :class="[`${namespace}-tagBar-item`, 'layout-flex-row', isActive(tag) ? 'is-active' : '']"
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="tag"
        @contextmenu.native.prevent="openMenu(tag, $event)">
        <span v-if="!tag.meta.tagIcon">{{ tag.title }}</span>
        <svg-icon
          v-else
          :icon="tag.meta.tagIcon"></svg-icon>
        <i
          v-if="!isAffix(tag) && visitedViews.length > 1"
          class="el-icon-close"
          @click.prevent.stop="delSelectedTag(tag)"></i>
      </router-link>
      <ul
        v-show="contextMenuShow"
        :style="menuPosStyle"
        :class="`${namespace}-tagBar-contextmenu`">
        <li @click="refreshSelectedTag(selectedTag)">刷新</li>
        <li
          v-if="!isAffix(selectedTag) && visitedViews.length > 1"
          @click="delSelectedTag(selectedTag)">
          关闭
        </li>
        <li
          v-if="visitedViews.length > 1"
          @click="delOtherTags(selectedTag)">
          关闭其他
        </li>
        <li
          v-if="visitedViews.length > 1"
          @click="delAllTags(selectedTag)">
          关闭全部
        </li>
      </ul>
    </div>
    <div
      :class="`${namespace}-tagBar-btn`"
      @click="scrollRight">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { formatRoutes } from '@/utils/formatter'
const localViews = JSON.parse(sessionStorage.getItem(process.env.VUE_APP_TITLE + '-VISITED-VIEWS') || '[]')

export default {
  components: {},
  data() {
    return {
      contextMenuShow: false,
      menuPos: { left: 0, top: 0 },
      selectedTag: null,
      affixTags: [],
    }
  },
  computed: {
    visitedViews() {
      return this.$store.getters.visitedViews
    },
    routes() {
      return this.$store.getters.permissionRoutes
    },
    menuPosStyle() {
      return {
        left: this.menuPos.left + 'px',
        top: this.menuPos.top + 'px',
      }
    },
    namespace() {
      return this.$store.state.setting.namespace
    },
  },
  watch: {
    $route() {
      this.addTag()
      this.toCurrentTag()
    },
    contextMenuShow(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
  },
  created() {
    this.initTags()
    this.addTag()

    this.eventBusRegister()
    window.addEventListener('beforeunload', this.saveViews)
  },
  beforeDestroy() {
    this.eventBusUnregister()
    window.removeEventListener('beforeunload', this.saveViews)
  },
  methods: {
    initTags() {
      // 固定标签
      this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of this.affixTags) {
        if (tag.name) {
          this.$store.dispatch('tagBar/addVisitedView', tag)
        }
      }

      // 本地存储
      for (const view of localViews) {
        let find = this.findRoute(view)
        if (!find) {
          // 临时页面无需权限，直接添加，否则不添加
          if (view.meta.temporary) {
            this.$router.addRoute('Home', view)
          } else {
            continue
          }
        }
        if (!view.meta.affix) {
          const tagPath = path.resolve('/', view.path)
          const tag = {
            fullPath: tagPath,
            path: tagPath,
            name: view.name,
            meta: { ...view.meta },
            query: view.query,
            params: view.params,
          }
          this.$store.dispatch('tagBar/addVisitedView', tag)
        }
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag?.meta && tag.meta.affix
    },
    addTag() {
      if (this.$route.name) {
        this.$store.dispatch('tagBar/addView', this.$route)
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagBar/delCachedView', view)
      const { fullPath } = view
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        })
      })
    },
    delSelectedTag(view) {
      this.$store.dispatch('tagBar/delView', view)
      if (this.isActive(view)) {
        this.toLastTag()
      }
    },
    delOtherTags(view) {
      this.$store.dispatch('tagBar/delOtherViews', view)
      if (!this.isActive(view)) {
        this.toLastTag()
      }
    },
    delAllTags() {
      this.$store.dispatch('tagBar/delAllViews')
      this.toLastTag()
    },
    toCurrentTag() {
      for (const tag of this.visitedViews) {
        if (tag && tag.path === this.$route.path) {
          // when query is different then update
          if (tag.fullPath !== this.$route.fullPath) {
            this.$store.dispatch('tagBar/updateVisitedView', this.$route)
          }
          break
        }
      }
    },
    toLastTag() {
      const lastIdx = this.visitedViews.length - 1
      if (lastIdx !== -1) {
        this.$router.push(this.visitedViews[lastIdx])
      } else {
        this.$router.push('/')
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const asideBarWidth = 200
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth + asideBarWidth // left boundary
      const left = e.clientX
      if (left > maxLeft) {
        this.menuPos.left = maxLeft
      } else {
        this.menuPos.left = left
      }

      this.menuPos.top = e.clientY
      this.contextMenuShow = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.contextMenuShow = false
    },
    saveViews() {
      sessionStorage.setItem(
        process.env.VUE_APP_TITLE + '-VISITED-VIEWS',
        JSON.stringify(
          this.visitedViews
            .map((view) => {
              const copy = { ...view }
              delete copy.matched
              return copy
            })
            .filter((view) => !view.meta.affix) || []
        )
      )
    },
    scrollLeft() {
      this.$refs.tagBarWrapper.scrollLeft = 0
    },
    scrollRight() {
      this.$refs.tagBarWrapper.scrollLeft = this.$refs.tagBarWrapper.scrollWidth
    },
    openTab(option) {
      const args = {
        ...option,
        name: option.name || Date.now(),
      }
      args.meta = {
        ...option.meta,
        temporary: true,
      }
      let find = this.findRoute(args)
      !find && this.$router.addRoute('Home', formatRoutes(args))
      this.$router.push({ name: option.name, query: option.query })
    },
    closeTab() {
      this.delSelectedTag(this.$route)
    },
    refreshTab() {
      this.refreshSelectedTag(this.$route)
    },
    findRoute(route) {
      let find = null
      const search = (routes) => {
        for (const r of routes) {
          if (r.name === route.name) {
            find = r
            break
          } else if (r.children) {
            search(r.children)
          }
        }
      }
      search(this.routes)
      return find
    },
    eventBusRegister() {
      this.$root.$on('openTab', this.openTab)
      this.$root.$on('closeTab', this.closeTab)
      this.$root.$on('refreshTab', this.refreshTab)
      window.addEventListener('message', this.handleMessage)
    },
    eventBusUnregister() {
      this.$root.$off('openTab', this.openTab)
      this.$root.$off('closeTab', this.closeTab)
      this.$root.$off('refreshTab', this.refreshTab)
      window.removeEventListener('message', this.handleMessage)
    },
    handleMessage(e) {
      if (e.data.type === 'eventBus') {
        const { type, handler, payload } = e.data
        this.$root.$emit(handler, payload)
      }
    },
  },
}
</script>

<style lang="scss">
.#{$namespace}-tagBar {
  display: flex;
  height: 48px;
  background-color: $bgColor;
  overflow: hidden;
}

.#{$namespace}-tagBar-btn {
  padding: 13px 16px;
  color: $txtColor-light;
  font-size: 16px;

  &:hover {
    color: $txtColor;
    cursor: pointer;
  }

  &:first-child {
    border-right: 1px solid $borderColor;
  }

  &:last-child {
    border-left: 1px solid $borderColor;
  }
}

.#{$namespace}-tagBar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 8px 4px 0 4px;
  padding-right: 16px;
  height: max-content;
  overflow: auto;
}

.#{$namespace}-tagBar-item {
  flex: 0;
  align-items: center;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 22px;
  color: $txtColor;
  border-radius: 8px 8px 0px 0px;
  background-color: $bgColor;

  & + .#{$namespace}-tagBar-item {
  }

  &.is-active {
    color: $themeColor;
    background-color: $bgColor-dark; /*  */

    i {
      color: $themeColor;
    }
  }

  span {
    white-space: nowrap;
  }

  i {
    margin-left: 8px;
    color: $txtColor-light;
  }
}

.#{$namespace}-tagBar-contextmenu {
  position: absolute;
  margin: 0;
  padding: 5px 0;
  z-index: 3000;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  border-radius: 4px;
  background: #fff;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: transparentize($themeColor, 0.95);
    }
  }
}
</style>
