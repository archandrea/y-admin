<template>
  <div
    class="class-tree y-container--tight no-padding"
    :class="[leadLine ? 'lead-line' : '']">
    <el-tree
      ref="elTree"
      :data="tree"
      :current-node-key="activeItem"
      :default-expand-all="!lazy"
      :lazy="lazy"
      :load="lazy ? loadNode : null"
      v-bind="$attrs"
      v-loading="loading"
      @node-expand="handleNodeExpand">
      <template v-slot="{ node, data }">
        <div
          :class="['tree-item', isActive(data) ? 'is-active' : '']"
          @click="handleClick(data, node)"
          :key="data[idProp]">
          <slot v-bind="{ node, data }"></slot>
        </div>
      </template>
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
    type: [String, Number],
    default: '',
  },
  idProp: {
    type: String,
    default: () => 'id',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // 引线开关
  leadLine: {
    type: Boolean,
    default: true,
  },
  // 懒加载开关
  lazy: {
    type: Boolean,
    default: false,
  },
  // 懒加载方法
  loadNode: {
    type: Function,
    default: null,
  },
})

const emit = defineEmits(['set-current', 'node-expand'])

const isActive = (data) => {
  return data[props.idProp] === props.activeItem
}

const handleClick = (data, node) => {
  emit('set-current', data, node)
}

const handleNodeExpand = (data, node) => {
  emit('node-expand', data, node)
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
      justify-content: flex-start;
      padding: 0 24px;
      width: 100%;
      height: 48px;

      &.is-active {
        // border-left: 3px solid $themeColor;
        background-color: transparentize($themeColor, 0.95);

        * {
          color: $themeColor;
        }
      }

      .node-name {
        @include text-overflow(1);
        margin-left: 4px;
        flex: 1;
      }
    }
  }

  // ======================虚线样式======================
  &.lead-line {
    .el-tree {
      .el-tree-node {
        position: relative;
        // padding-left: 16px; // 缩进量

        // 竖线
        &::before {
          content: '';
          height: 100%;
          width: 1px;
          position: absolute;
          left: 7px;
          top: -16px;
          border-width: 1px;
          border-left: 1px dashed $txtColor-slight;
        }

        // 当前层最后一个节点的竖线高度固定
        &:last-child::before {
          height: 40px; // 可以自己调节到合适数值
        }

        // 横线
        &::after {
          content: '';
          width: 17px;
          height: 20px;
          position: absolute;
          left: 9px;
          top: 24px;
          border-width: 1px;
          border-top: 1px dashed $txtColor-slight;
        }
      }

      .el-tree-node__children {
        padding-left: 24px; // 缩进量
        overflow: visible;
      }

      // 去掉最顶层的虚线
      & > .el-tree-node::after {
        border-top: none;
      }

      & > .el-tree-node::before {
        border-left: none;
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
