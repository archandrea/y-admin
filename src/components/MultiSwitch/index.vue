<template>
  <div class="multi-switch">
    <div
      :class="['multi-switch_item', value == key ? 'is-active' : '']"
      v-for="(item, key) in items"
      :style="[cursorStyle]"
      @click="onSwitch(String(key))">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiSwitch',
  components: {},
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      required: true,
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    cursorStyle() {
      if (this.fixed) {
        return {
          cursor: 'not-allowed',
        }
      } else {
        return {
          cursor: 'pointer',
        }
      }
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSwitch(key) {
      if (this.fixed) {
        return false
      }
      this.$emit('change', key)
    },
  },
}
</script>

<style lang="scss">
.multi-switch {
  @include full;
  display: flex;
  flex-wrap: wrap;

  .multi-switch_item {
    padding: 8px 16px;
    color: $txtColor;
    line-height: 22px;
    border: 1px solid $bgColor-dark;
    border-radius: 4px;
    background-color: $bgColor-dark;

    &.is-active {
      color: $themeColor;
      border-color: $themeColor;
    }

    & + .multi-switch_item {
      margin-left: 16px;
    }
  }
}
</style>
