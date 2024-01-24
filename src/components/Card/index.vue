<template>
  <div
    class="base-card"
    :style="[borderStyle]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    border: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    borderStyle() {
      if (this.border) {
        return {
          'border-style': 'solid',
          'border-width': '1px',
        }
      } else {
        return {}
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.base-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background: $bgColor;
  border-radius: 4px;
  border-color: $borderColor;
  

  .active {
    border-color: $themeColor;
  }
}
</style>
