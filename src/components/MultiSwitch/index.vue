<template>
  <div class="multi-switch">
    <div
      :class="['multi-switch_item', isActive(key) ? 'is-active' : '', mode]"
      v-for="(item, key) in options"
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
    options: {
      type: [Array, Object],
      default: () => {
        return []
      },
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'button', //tab|button
    },
    multiple: {
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
    isActive(key) {
      return this.value == key || this.value.includes(key)
    },
    onSwitch(key) {
      if (this.fixed) {
        return false
      }
      if (!this.multiple) {
        this.$emit('change', key)
      } else {
        const result = [...this.value]
        const idx = result.indexOf(key)
        if (idx !== -1) {
          result.splice(idx, 1)
        } else {
          result.push(key)
        }
        this.$emit('change', result)
      }
    },
  },
}
</script>

<style lang="scss">
.multi-switch {
  display: flex;
  flex-wrap: wrap;

  .multi-switch_item {
    &.button {
      padding: 8px 16px;
      color: $txtColor;
      line-height: 22px;
      border: 1px solid $bgColor-dark;
      border-radius: 4px;
      background-color: $bgColor-dark;
    }

    &.tab {
      color: $txtColor;
      line-height: 24px;

      &.is-active {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 4px;
          background-color: $themeColor;
        }
      }
    }

    &.is-active {
      color: $themeColor;
      border-color: $themeColor;

      &.tab {
        font-weight: 600;
      }

      &.button {
        background-color: transparentize($themeColor, 0.95);
      }
    }

    & + .multi-switch_item {
      margin-left: 16px;
    }
  }
}
</style>
