<template>
  <div class="class-menu y-container--tight">
    <div
      :class="['class-menu_item', isActive(item) ? 'is-active' : '']"
      v-for="item in list"
      :key="generateId()"
      @click="$emit('set-current', item)">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
import { generateId } from '@/utils'

export default {
  name: 'ClassMenu',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    activeMenu: {
      type: [String, Array, Object],
      default: () => null,
    },
    idProp: {
      type: String,
      default: () => 'id',
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    isActive(item) {
      if(!this.idProp) {
        return item === this.activeMenu
      }
      return item[this.idProp] === this.activeMenu
    },
    generateId,
  },
}
</script>

<style lang="scss">
.class-menu {
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
