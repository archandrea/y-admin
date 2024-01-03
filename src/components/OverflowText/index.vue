<template>
  <div class="overflow-text">
    <el-tooltip
      v-if="content.length > max"
      v-bind="$attrs"
      effect="dark"
      placement="top">
      <span>{{ content.slice(0, max - 2) + '...' }}</span>
      <span slot="content">{{ content }}</span>
    </el-tooltip>
    <span v-else>{{ content }}</span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    max: {
      type: Number,
      default: 6,
    },
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.overflow-text {
}
</style>
