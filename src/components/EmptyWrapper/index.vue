<template>
  <div class="empty-wrapper y-container no-padding">
    <el-empty
      v-if="toggle"
      v-bind="attrs">
      <slot name="empty"></slot>
    </el-empty>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'EmptyWrapper',
  components: {},
  props: {
    // 开关
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    attrs() {
      return {
        // 默认值
        image: require('@/assets/images/no-info.svg'),
        description: '暂无信息',
        ...this.$attrs,
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.empty-wrapper {
}
</style>
