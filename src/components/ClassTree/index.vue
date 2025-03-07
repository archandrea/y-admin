<template>
  <div class="class-tree y-container--tight no-padding">
    <el-tree
      ref="elTree"
      :data="tree"
      :current-node-key="activeItem"
      default-expand-all
      v-bind="$attrs">
      <div
        :class="['tree-item', isActive(data) ? 'is-active' : '']"
        :style="{ 'padding-left': `${(node.level - 1) * 18 + 24}px` }"
        @click="$emit('set-current', data)"
        slot-scope="{ node, data }">
        <slot v-bind="{ node, data }"></slot>
      </div>
    </el-tree>
  </div>
</template>

<script setup>
const props = defineProps({
  tree: {
    type: Array,
    default: () => [],
  },
  activeItem: {
    type: String,
    default: '',
  },
  idProp: {
    type: String,
    default: () => 'id',
  },
})

const isActive = (data) => {
  return data[props.idProp] === props.activeItem
}
</script>

<style lang="scss" scoped>
.class-tree::v-deep {
  .el-tree {
    width: 100%;

    .tree-item-name {
      @include text-overflow(2);
      padding-left: 8px;
      font-size: 16px;
      font-weight: normal;
      color: $txtColor;

      &.secondary {
        font-size: 14px;
        color: $txtColor-light;
      }
    }

    .el-tree-node {
      &:focus {
        > .el-tree-node__content {
          background-color: unset;
        }
      }

      .el-tree-node__expand-icon {
        // 展开图标不要
        display: none;
      }
    }

    .el-tree-node__content {
      padding: 0 !important;
      height: max-content;

      &:hover {
        background-color: transparentize($themeColor, 0.95);

        * {
          color: $themeColor;
        }
      }
    }

    .tree-item {
      @include flex-row;
      padding: 0 24px;
      width: 100%;
      height: 48px;

      &.is-active {
        border-left: 3px solid $themeColor;
        background-color: transparentize($themeColor, 0.95);

        * {
          color: $themeColor;
        }
      }
    }
  }

  i,
  .svg-icon {
    font-size: 16px;
    color: $txtColor-light;
  }
}
</style>
