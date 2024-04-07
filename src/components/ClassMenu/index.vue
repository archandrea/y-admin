<template>
  <empty-wrapper
    class="class-menu y-container--tight"
    :toggle="!list || list?.length === 0">
    <div
      :class="['class-menu_item', isActive(item) ? 'is-active' : '']"
      v-for="item in list"
      :key="generateId()"
      @click="$emit('set-current', item)">
      <slot :item="item"></slot>
    </div>
  </empty-wrapper>
</template>

<script setup>
import { generateId } from '@/utils'
import EmptyWrapper from '@/components/EmptyWrapper'

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  activeMenu: {
    type: String,
    default: '',
  },
  idProp: {
    type: String,
    default: () => 'id',
  },
})

const isActive = (item) => {
  if (!props.idProp) {
    return item === props.activeMenu
  }
  return item[props.idProp] === props.activeMenu
}
</script>

<style lang="scss" scoped>
.class-menu::v-deep {
  .el-empty {
    padding: 0;
    height: max-content;

    .el-empty__image {
      display: none;
    } 
  }

  > .class-menu_item {
    @include flex-row;
    padding: 12px 16px;
    width: 100%;
    border-radius: 4px;
    cursor: pointer;

    span {
      @include text-overflow(2);
      flex: 1;
    }

    .svg-icon {
      flex: 0 0 16px;
      margin-left: 8px;
      font-size: 16px;

      &:hover {
        color: $themeColor;
      }
    }

    &.is-active,
    &:hover {
      color: $themeColor;
      background-color: transparentize($themeColor, 0.95);

      .svg-icon {
        color: $themeColor;
      }
    }

    + .class-menu_item {
      margin-top: 4px;
    }
  }
}
</style>
