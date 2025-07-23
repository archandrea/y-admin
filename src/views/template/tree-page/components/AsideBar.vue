<template>
  <div class="aside-bar">
    <div class="y-header">
      <h2 class="y-title">组织机构</h2>
    </div>
    <class-tree
      ref="tree"
      :tree="menuList"
      :active-item="activeItem"
      id-prop="deptId"
      :filter-node-method="filterNode"
      @set-current="setCurrent($event)"
      :loading="loading">
      <template #default="{ node, data }">
        <svg-icon
          v-show="getNodeIcon(node, 'icon')"
          :class="['node-icon', getNodeIcon(node, 'icon') ? 'fill' : '']"
          :icon="getNodeIcon(node, 'icon')"></svg-icon>
        <span class="node-name">{{ data.deptName }}</span>
      </template>
    </class-tree>
  </div>
</template>

<script>
import ClassTree from '@/components/ClassTree'
// import { getDeptTree } from '@/api/org'

export default {
  components: {
    ClassTree,
  },
  data() {
    return {
      loading: false,
      activeItem: null,
      keyword: '',
      menuList: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true

      // const [err, res] = await getDeptTree()
      // if (res) {
      //   this.menuList = res.data || []
      //   this.setCurrent(this.menuList[0])
      // }
      this.loading = false
    },
    setCurrent(item) {
      if (!item) return
      if (this.activeItem !== item.deptId) {
        this.activeItem = item.deptId
        this.$emit('set-current', item.deptId)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.deptName.indexOf(value) !== -1
    },
    getNodeIcon(node, type) {
      const map = {
        icon: ['minus-round', 'plus-round'],
      }
      if (node.childNodes.length > 0) {
        if (node.expanded) {
          return map[type][0]
        } else {
          return map[type][1]
        }
      } else {
        return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-bar {
  @include flex-col;
  flex-shrink: 0;
  width: 240px;
  height: 100%;

  :deep(.y-header) {
    .svg-icon {
      font-size: 16px;
      color: $txtColor-light;
      cursor: pointer;

      &:hover {
        color: $themeColor;
      }
    }
  }
}
</style>
