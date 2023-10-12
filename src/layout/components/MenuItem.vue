<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }">
        <item
          :icon="onlyOneChild?.meta?.icon || (item?.meta && item?.meta?.icon) || (defaultIcon ? 'el-icon-menu' : '')"
          :title="onlyOneChild?.meta?.title" />
      </el-menu-item>
    </template>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body>
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="(item.meta && item.meta.icon) || (defaultIcon ? 'el-icon-menu' : '')"
          :title="item.meta.title" />
      </template>
      <MenuItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu">
      </MenuItem>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'

export default {
  name: 'MenuItem',
  components: {
    Item: () => import('./Item.vue'),
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
    defaultIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  computed: {},
  methods: {
    hasOneShowingChild(parent) {
      if (!parent.children) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      const showingChildren = parent.children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
  },
}
</script>

<style lang="scss"></style>
