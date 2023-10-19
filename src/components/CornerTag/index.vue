<template>
  <span :class="['corner-tag', type]"><slot></slot></span>
</template>

<script>
export default {
  name: 'CornerTag',
  components: {},
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const parent = this.$parent.$el
    const position = parent.style.position
    if (!position || position === 'static') {
      parent.style.position = 'relative'
    }
    parent.style.overflow = 'hidden'
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.corner-tag {
  position: absolute;
  top: 13px;
  right: -32px;
  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  transform: rotate(45deg);
  color: $themeColor;
  background: transparentize($themeColor, 0.95);

  &.success {
    color: $color-success;
    background: transparentize($color-success, 0.95);
  }

  &.warning {
    color: $color-warning;
    background: transparentize($color-warning, 0.95);
  }

  &.danger {
    color: $color-danger;
    background: transparentize($color-danger, 0.95);
  }

  &.info {
    color: $color-info;
    background: transparentize($color-info, 0.95);
  }
}
</style>
