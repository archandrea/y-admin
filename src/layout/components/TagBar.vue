<template>
  <div
    class="y-tagBar"
    v-scroll-horizontal
    v-if="visitedViews.length > 0">
    <router-link
      class="y-tagBar-item flex-row"
      :class="isActive(tag) ? 'is-active' : ''"
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
      class="y-tagBar-contextmenu">
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
</template>

<script>
import path from 'path'

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
  },
  methods: {
    initTags() {
      this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of this.affixTags) {
        if (tag.name) {
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
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
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
  },
}
</script>

<style lang="scss">
.y-tagBar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 16px 0 0 16px;
  padding-right: 16px;
  width: 100%;
  height: max-content;
  background-color: $bgColor-dark;
  overflow: auto;
}

.y-tagBar-item {
  flex: 0;
  padding: 8px;
  font-size: 14px;
  line-height: 14px;
  color: $txtColor;
  border-radius: 4px;
  background-color: $bgColor;

  & + .y-tagBar-item {
    margin-left: 8px;
  }

  &.is-active {
    color: $txtColor-reverse;
    background-color: $themeColor;

    i {
      color: $txtColor-reverse;
    }
  }

  span {
    white-space: nowrap;
    margin-right: 8px;
  }

  i {
    color: $txtColor-light;
  }
}

.y-tagBar-contextmenu {
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
