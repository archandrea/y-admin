<template>
  <div
    class="search-form"
    :class="{ expand }">
    <el-form
      ref="searchForm"
      :inline="true"
      v-bind="$attrs">
      <slot></slot>
      <slot
        v-if="expand"
        name="extra"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    expand: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.search-form::v-deep {
  @include full;
  position: relative;
  // TODO: 改为根据实际渲染高度
  min-height: 72px;

  .el-form {
    padding: 16px 8px 0 24px;

    .el-form-item {
      &.btn-item {
        float: right;
      }
    }

    .el-select {
      width: 160px;
    }
  }

  &.expand {
    .el-form {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: max-content;
      background-color: $bgColor;
      border-radius: 4px;
      box-shadow: 0px 4px 16px 0px rgba(38, 38, 38, 0.2);
      z-index: 99;
    }

    // .expand-btn.el-button:not(:hover, :active, :focus) {
    //   background: transparent;
    //   border: 1px solid $themeColor;
    // }
  }
}
</style>
